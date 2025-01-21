/* eslint-disable @typescript-eslint/no-unused-vars */

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth/web-extension';
import { useState } from 'react';
import './App.css';
import { auth } from './firebase/firebase';

function App() {
  // const [userName, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleFacebookSignIn = async () => {
    // Handle Facebook sign-in
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
      // Handle successful Facebook sign-in
    } catch (error) {
      setError('Error al registrarse con Facebook.');
    }
  }

  return (
    <>
      <div className=" items-center justify-center flex mt-10">
        <img src="/svg/logo.svg" alt="logo" />
      </div>
      <div className="flex items-center justify-center">
        <h3 className="text-3xl font-bold text-center mt-5 ">¡Bienvenido(a)!</h3>
        <img src="/img/ola.png" className="w-10 h-10 ml-2"></img>
      </div>
      <h3 className="text-3xl text-center">Inicia sesión</h3>
      <form className='flex flex-col items-center justify-center mt-5' name="login" id="login">
        <label htmlFor="Email" >Correo Electronico</label>
        <br />
        <input type='email' id='Email' placeholder='Correo Electronico' required className='w-1/2 p-2 border border-gray-300 rounded mb-4 bg-white' onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor='Password'>Contraseña</label>
        <br />
        <input type='password' id='Password' placeholder='Contraseña' required className='w-1/2 p-2 border border-gray-300 rounded mb-4 bg-white' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <a href="#" className="text-blue-500 ">¿Olvidaste tu contraseña?</a>
        <br />
        <button type='submit' id='submit' className='w-1/2 p-2 bg-blue-500 text-white rounded '>Iniciar Sesión</button>
      </form>
      <div className="flex items-center justify-center">
        <h3 className="text-3xl text-center mt-5">O</h3>
      </div>
      <form className="flex flex-col items-center justify-center mt-5 card p-6 shadow-lg">
        {error && <p className="error">{error}</p>}
        {/* <button type="submit" className="btn">Login</button> */}
        {/* <div className="divider">O</div> */}
        <div className="flex items-center justify-center space-x-4">
          {/* <button
            type="button"
            className="facebook"
            onClick={handleFacebookSignIn}
          >
            <img src="/svg/facebook.svg" alt="facebook" />
          </button> */}
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
        <a
          href='#'
          id='create'
        >
          Crear Cuenta
        </a>
      </div >
    </>
  );
}

export default App;
