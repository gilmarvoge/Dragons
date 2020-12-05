import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { FiBook, FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { SnackBar, Header } from 'components';
import { IDragons, IDragon } from 'models';
import { addDragon, editDragon } from 'services';
import { setDragon, setEditedDragon } from 'redux/actions';
import './styles.css';

interface ParamTypes {
    dragonId: string
}

interface CreateEditBookProps {
    dragons: IDragons;
}

function CreateEditDragon(props: CreateEditBookProps) {
    const dispatch = useDispatch();
    const { dragonId } = useParams<ParamTypes>();
    const { dragons } = props;
    const [snack, setSnack] = useState({ open: false, type: '', message: '' });
    const [bookToEdit, setBookToEdit] = useState<IDragon>();
    const { register, handleSubmit, reset, errors } = useForm();

    useEffect(() => {
        if (dragonId !== '') {
            const dragon = dragons.filter((dragon: IDragon) => dragon.id === dragonId);
            setBookToEdit(dragon[0]);
        }
    }, [dragonId, dragons]);

    const handleSubmitBook = async (data: any, event: any) => {
        event.preventDefault();

        let { name, type,  } = data;       
        const dragon = { id: dragonId, type, name,  createdAt: Date.now() };
        if (name && type ) {
            if (dragonId) {
                let response = await editDragon(dragonId, dragon);
                if (response.data) {
                    dispatch(setEditedDragon(dragonId, dragon));
                    setSnack({ open: true, type: 'success', message: 'Livo editado com sucesso' });
                }
            } else {
                let response = await addDragon(dragon);
                if (response.data){
                    dispatch(setDragon(response.data));
                    setSnack({ open: true, type: 'success', message: 'Livo cadastrado com sucesso' });
                }
            }
            reset();            
        }
        else
            setSnack({ open: true, type: 'error', message: 'Campos não preenchidos' });
    }

    return (
        <div id='page-createedit-dragon' data-testid='create-dragon'>
            <Header left right />
            < div id='page-createedit-dragon-content'>
                <form onSubmit={handleSubmit(handleSubmitBook)}>
                    <h1>{dragonId && dragonId !== '' ? 'Editar livro' : 'Cadastro do livro'}</h1>
                    <fieldset>
                        <div className='field'>
                            <label htmlFor='name'>Título</label>
                            <input
                                defaultValue={bookToEdit?.name}
                                type='text'
                                name='name'
                                id='name'
                                ref={register({ required: 'Digite o nome do livro' })}
                            />
                            {errors.name && <span role='alert'> {errors.name.message}</span>}

                        </div>
                        <div className='field'>
                            <label htmlFor='type'>Autor</label>
                            <input
                                defaultValue={bookToEdit?.type}
                                type='text'
                                name='type'
                                id='type'
                                ref={register({ required: 'Digite o nome do autor' })}
                            />
                            {errors.type && <span role='alert'> {errors.type.message}</span>}
                        </div>                       
                    </fieldset>
                    <button type='submit' data-testid='submit-button'>
                        <span>
                            {dragonId ? <FiSave /> : <FiBook />}
                        </span>
                        <strong>  {dragonId ? 'Salvar livro' : 'Cadastrar livro'}</strong>
                    </button>
                </form>
                {
                    snack.open &&
                    <SnackBar
                        open={snack.open}
                        type={snack.type}
                        message={snack.message}
                        onClose={setSnack}
                    />
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({ dragons }: { dragons: IDragons }) => ({
    dragons: dragons
});

export default connect(mapStateToProps)(CreateEditDragon);
