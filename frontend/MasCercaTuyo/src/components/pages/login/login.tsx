/* eslint-disable @typescript-eslint/no-unused-vars */

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import '../../../App.css';
import { auth } from '../../../firebase/firebase';
function Login() {

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[@._-]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include one uppercase letter, and contain @, ., _, or - symbols.');
    } else {
      setError('');
      // Handle successful login
    }
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError('Error al registrarse con Google.');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Handle successful Google sign-in
    } catch (error) {
      setError('Error al registrarse con Google.');
    }
  };

  return (
    <>
      <div className="
      items-center
      justify-center
      flex
      mt-10">
        <img src="/svg/logo.svg" alt="logo" />
      </div>
      <div className="flex items-center justify-center">
        <h3 className="text-3xl font-bold text-center mt-5 ">¡Bienvenido(a)!</h3>
        <img src="/img/ola.png" className="w-10 h-10 ml-2"></img>
      </div>
      <h3 className="text-3xl text-center">Inicia sesión</h3>
      <form className='flex flex-col mt-5 card p-10 shadow-lg' name="login" id="login">
        <label htmlFor="Email" className='place-items-start' >Correo Electrónico</label>
        <br />
        <input type='email' id='Email' placeholder='Ingresa tu Correo' required className='w-1/2 p-2 border border-gray-300 rounded mb-4 bg-white' style={{ width: '100%' }} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor='Password'>Contraseña</label>
        <br />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id='Password'
            placeholder='Contraseña'
            required
            className='w-1/2 p-2 border border-gray-300 rounded mb-4 bg-white'
            style={{ width: '100%' }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2"
          >
            {showPassword ? <img className="w-6 h-6" src="/img/visible.png" alt="Show" /> : <img className="w-6 h-6" src="/img/esconder.png" alt="Hide" />}
          </button>
        </div>
        <br />
        <a href="#" className="text-blue-500" style={{ textAlign: 'end' }}>¿Olvidaste tu contraseña?</a>
        <br />
        <button style={{ borderRadius: '20px', backgroundColor: '#FDF2CF' }} type='submit' id='submit' onClick={handleSubmit} >Iniciar Sesíon</button>
      </form>
      <div className="flex items-center justify-center">
        <h3 className="text-3xl text-center mt-5">O Inicia Sesíon con</h3>
      </div>
      <form className="flex flex-col items-center justify-center mt-5 card p-6 shadow-lg">
        {error && <p className="error">{error}</p>}
        {/* <button type="submit" className="btn">Login</button> */}
        {/* <div className="divider">O</div> */}
        <div className="flex items-center justify-center space-x-4">
          <button
            type="button"
            className="google"
            onClick={handleGoogleSignIn}
          >
            <img src="/svg/google.svg" alt="google" />
          </button>
        </div>
      </form>
      <div
        //  className='flex flex-col items-center justify-center'
        id='createAccount'>
        <label
        // className="text-center"
        >
          ¿No tienes cuenta?
        </label>
        <br />
        <br />
        <a
          href='#'
          id='create'
          style={{ borderRadius: '15px', backgroundColor: '#EBFFE1' }}
        >
          Crear Cuenta
        </a>
      </div >
    </>
  );
}

export default Login;
