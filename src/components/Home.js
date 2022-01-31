import React from 'react';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user, logout, loading } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <div className='w-full max-w-xs m-auto text-black'>
      <div className='bg-white rounded shadow-md px-8 pt-6 pb-8 text-center'>
        <h1 className='text-xl mb-4'>{user.displayName || user.email}</h1>
        <button
          className='bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
