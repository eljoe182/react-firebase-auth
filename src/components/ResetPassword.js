import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from './Alert';

function ResetPassword() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
  });

  const [error, setError] = useState();

  const { resetPassword } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await resetPassword(user.email);
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

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Send Email
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
