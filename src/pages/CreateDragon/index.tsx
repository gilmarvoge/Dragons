import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Header, Forms } from 'components';
import { IDragons, IDragon } from 'models';
import { addDragon, editDragon } from 'services';
import { setDragon, setEditedDragon } from 'redux/actions';

interface ParamTypes {
    dragonId: string
}

interface CreateEditBookProps {
    dragons: IDragons;
}

function CreateEditDragon(props: CreateEditBookProps) {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const { dragonId } = useParams<ParamTypes>();
    const { dragons } = props;
    const [dragonToEdit, setdragonToEdit] = useState<IDragon>();
    const { register, handleSubmit, reset, errors } = useForm();

    useEffect(() => {
        if (dragonId !== '') {
            const dragon = dragons.filter((dragon: IDragon) => dragon.id === dragonId);
            setdragonToEdit(dragon[0]);
        }
    }, [dragonId, dragons]);

    const handleSubmitBook = async (data: any, event: any) => {
        event.preventDefault();

        let { name, type, } = data;
        var date = new Date().toISOString().substring(0, 10);
        const dragon = { id: dragonId, type, name, createdAt: date, histories: [] };
        if (name && type) {
            if (dragonId) {
                let response = await editDragon(dragonId, dragon);
                if (response.data) {
                    dispatch(setEditedDragon(dragonId, dragon));
                    push('/');
                }
            } else {
                let response = await addDragon(dragon);
                if (response.data) {
                    dispatch(setDragon(response.data));
                    push('/');
                }
            }
            reset();
        }
    }

    return (
        <div data-testid='create-dragon'>
            <Header left right />
            <Forms>
                <form onSubmit={handleSubmit(handleSubmitBook)}>
                    <h1>{dragonId && dragonId !== '' ? 'Edit Dragon' : 'Register Dragon'}</h1>
                    <fieldset>
                        <div className='field'>
                            <label htmlFor='name'>Name</label>
                            <input
                                defaultValue={dragonToEdit?.name}
                                type='text'
                                name='name'
                                id='name'
                                ref={register({ required: 'Enter the name of the dragon' })}
                            />
                            {errors.name && <span role='alert'> {errors.name.message}</span>}

                        </div>
                        <div className='field'>
                            <label htmlFor='type'>Type</label>
                            <input
                                defaultValue={dragonToEdit?.type}
                                type='text'
                                name='type'
                                id='type'
                                ref={register({ required: 'Enter the type of the dragon' })}
                            />
                            {errors.type && <span role='alert'> {errors.type.message}</span>}
                        </div>
                        <div className='field'>
                            <label htmlFor='date'>Creation Date</label>
                            <input
                                disabled
                                defaultValue={new Date().toLocaleString()}
                                type='text'
                                name='date'
                                id='date'
                            />
                        </div>
                    </fieldset>
                    <button type='submit' data-testid='submit-button'>
                        <span>
                            <FiSave />
                        </span>
                        <strong>  {dragonId ? 'Save Dragon' : 'Register Dragon'}</strong>
                    </button>
                </form>
            </Forms>
        </div>
    )
}

const mapStateToProps = ({ dragons }: { dragons: IDragons }) => ({
    dragons: dragons
});

export default connect(mapStateToProps)(CreateEditDragon);
