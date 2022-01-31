import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from './Alert';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState();

  const { signIn, loginWithGoogle } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(user.email, user.password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='w-full max-w-xs m-auto'>
      {error && <Alert message={error} />}
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Email
          </label>
          <input
            type='email'
            name='email'
            placeholder='username@company.ltd'
            className='shadow appearance-none border rounded w-full px-2 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Password
          </label>
          <input
            type='password'
            name='password'
            placeholder='******'
            className='shadow appearance-none border rounded w-full px-2 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            onChange={handleChange}
          />
        </div>

        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Login
          </button>

          <a
            href='/forgot'
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
          >
            Forgot password?
          </a>
        </div>
      </form>
      <p className='my-4 text-sm flex justify-between px-3'>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
      <button
        type='button'
        className='bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full'
        onClick={handleGoogleSignIn}
      >
        Google Login
      </button>
    </div>
  );
}

export default Login;
