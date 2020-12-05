import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';
import { Header, SnackBar, Forms } from 'components';
import { login, getLogin } from 'services';
import './styles.css';

function Login() {
    const { push } = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const [snack, setSnack] = useState({ open: false, type: '', message: '' });

    const handleSubmitUser = async (data: any, event: any) => {
        event.preventDefault();
        const { user, password } = data;
        try {
            const response = await getLogin(user, password);
            if (response.data.length) {
                const result = Object.assign({}, ...response.data);
                login(String(result.id));

                push('/');
            } else
                setSnack({ open: true, type: 'error', message: 'Usuário ou senha incorretos' });
        } catch (error) {
            setSnack({ open: true, type: 'error', message: `Não foi possível realizar o login ${error}` });
        }
    }

    return (
        <div >
            <Header />
          <Forms>
                <form onSubmit={handleSubmit(handleSubmitUser)}>
                    <header>
                        <h1>Login</h1>
                    </header>
                    <fieldset>
                        <div className='field'>
                            <label htmlFor='user'>User</label>
                            <input
                                type='text'
                                name='user'
                                id='user'
                                ref={register({ required: 'Enter the username' })}
                            />
                            {errors.user && <span role="alert">{errors.user.message}</span>}
                        </div>
                        <div className='field'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                ref={register({ required: 'Enter the password' })}
                            />
                            {errors.password && <span role="alert">{errors.password.message}</span>}
                        </div>
                    </fieldset>
                    <button type='submit'>
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Sign In</strong>
                    </button>
                    <div id='page-login-criar'>Don't have an account?
                        <Link to='/signup'> Register</Link>
                    </div>
                </form>
                {
                    snack.open &&
                    < SnackBar
                        open={snack.open}
                        type={snack.type}
                        message={snack.message}
                        onClose={setSnack}
                    />
                }
            </Forms>
        </div>
    )
}

export default Login;
