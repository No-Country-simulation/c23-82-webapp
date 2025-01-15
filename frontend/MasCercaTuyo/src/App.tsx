import { useState } from 'react';
import './App.css';

function App() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className=' items-center justify-center flex mt-10'>
        <img src="logo.svg" alt="logo" />
      </div>
      <div className='flex items-center justify-center'>
        <h3 className=' text-3xl font-bold text-center mt-5 '>
          ¡Bienvenido(a)!
          <img src="ola.png" className='w-10 h-10 ml-2'></img>
        </h3>
      </div>
      <form className='flex flex-col items-center justify-center mt-5 card p-6 shadow-lg'>
        <div className='form-control w-full max-w-xs'>
          <label htmlFor="email" className='label'>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='input input-bordered'
          />
        </div>
        <div className='form-control w-full max-w-xs'>
          <label htmlFor="password" className='label'>
            Contraseña:
          </label>
          <div className='flex items-center'>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='input input-bordered'
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='btn btn-ghost'
            >
              ???
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
