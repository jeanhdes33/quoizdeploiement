import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = (password) => {
    // Vérifie si le mot de passe a au moins 6 caractères, 1 chiffre et 1 caractère spécial
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    // Vérification des champs requis
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      setErrorMessage('Tous les champs sont requis');
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
      return;
    }
    // Vérification de la correspondance des mots de passe
    if (data.password !== data.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
      return;
    }
    // Validation du mot de passe
    if (!validatePassword(data.password)) {
      setErrorMessage('Le mot de passe doit comporter au moins 6 caractères, 1 chiffre et 1 caractère spécial');
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response.data.error) {
        // Gérer l'erreur
        setErrorMessage(response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 1000);
      } else {
        // Inscription réussie
        setData({});
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrorMessage('Erreur lors de l\'inscription');
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };

  return (
    <div className="register-container">
      <div className="bg-white py-6 sm:py-8 lg:py-12 font-varela">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Register</h2>

          <form className="mx-auto max-w-lg rounded-lg border" onSubmit={registerUser}>
            <div className="flex flex-col gap-4 p-4 md:p-8 bg-accent">
              <div className="w-full">
                <label htmlFor="name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Nom d'utilisateur</label>
                <input
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  placeholder="enter name..."
                />
              </div>

              <div className="w-full">
                <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  placeholder="enter email..."
                />
              </div>

              <div className="w-full">
                <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Mot de passe</label>
                <input
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  placeholder="enter password..."
                />
              </div>

              <div className="w-full">
                <label htmlFor="confirmPassword" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Confirmez le mot de passe</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={data.confirmPassword}
                  onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  placeholder="confirm password..."
                />
              </div>

              <button type="submit" className="block rounded-lg bg-secondary px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-primary focus-visible:ring active:bg-gray-600 md:text-base">Inscription</button>
              {errorMessage && (
                <div className="flex justify-center">
                  <p className="text-red-500 font-semibold">{errorMessage}</p>
                </div>
              )}
              {registrationSuccess && (
                <div className="flex justify-center">
                  <p className="text-green-500 font-semibold">Inscription réussie !</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}