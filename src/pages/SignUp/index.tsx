import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiSmile } from 'react-icons/fi';
import { Header, Forms } from 'components';
import { addUser, validateUser } from 'services';

function SignUp() {
    const { register, handleSubmit, errors, reset } = useForm();

    const handleSubmitUser = async (data: any, event: any) => {
        event.preventDefault();
        const { user, password } = data;
        try {
            const newUser = { user, password };
            const responseValidate = await validateUser(user);
            if (responseValidate.data.length)
                alert('This user already has registration');
            else {
                const response = await addUser(newUser);
                if (response.data)
                    reset();
                else
                    alert(`Unable to register: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            alert(`Unable to register: ${error}`);
        }
    }

    return (
        <div >
            <Header />
            <Forms>
                <form id='formuser' onSubmit={handleSubmit(handleSubmitUser)}>
                    <header>
                        <h1>Create account</h1>
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
                            <FiSmile />
                        </span>
                        <strong>register</strong>
                    </button>
                    <div id='page-login-criar'>Already registered?
                        <Link to='/login'> Login</Link>
                    </div>
                </form>
            </Forms>
        </div>
    )
}

export default SignUp;
