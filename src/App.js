import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginTest from './components/loginTest';
import Register from './components/Register';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Sports from './components/Categories/Sports';
import Football from './components/Categories/Sports/Football';
import QuestionForm from './components/QuestionForm';
import Cinema from './components/Categories/Cinema';
import Histoire from './components/Categories/Histoire'; // Ajoutez cette ligne pour importer le composant Histoire
import Sciences from './components/Categories/Sciences'; // Ajoutez cette ligne pour importer le composant Sciences
import Arts from './components/Categories/Arts';
import './App.css';
import logo from './logo.png';
import CultureGenerale from './components/Categories/CultureGenerale';
import Tennis from './components/Categories/Sports/Tennis';
import Basketball from './components/Categories/Sports/Basketball';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('user') ? true : false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <Router>
      <div className="font-varela bg-white text-black min-h-screen flex flex-col">
        <header className="bg-primary py-4 px-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src={logo} alt="Logo" className="h-8 mr-4" />
          </div>
          <div className="flex justify-center flex-grow sm:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? (
                <span>&#9650;</span>
              ) : (
                <span>&#9660;</span>
              )}
            </button>
          </div>
          <div className={`sm:flex sm:justify-center sm:flex-grow ${isMenuOpen ? 'block' : 'hidden'}`}>
            <ul className={`nav-bar flex flex-col sm:flex-row gap-4 list-none ${isLargeScreen ? 'text-xl' : 'text-lg'}`}>
              <li className="text-center">
                <Link to="/" className="text-accent font-bold hover:text-tertiary no-underline" onClick={toggleMenu}>Home</Link>
              </li>
              <li className="text-center">
                <Link to="/quiz" className="text-accent font-bold hover:text-tertiary no-underline" onClick={toggleMenu}>Quiz</Link>
              </li>
              {isLoggedIn && (
                <li className="text-center">
                  <Link to="/quoizer" className="text-accent font-bold hover:text-tertiary no-underline" onClick={toggleMenu}>Quoizer</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex items-center">
            <ul className="nav-bar flex gap-4 list-none">
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/login" className={`text-primary font-bold rounded-full bg-white px-6 py-3 hover:bg-tertiary transition duration-200 inline-block ${isLargeScreen ? 'text-xl' : 'text-lg'}`} onClick={toggleMenu}>
                      Mon compte
                    </Link>
                  </li>
                  <li className="mr-4">
                    <button onClick={handleLogout} className={`text-white font-bold rounded-full bg-red-600 px-6 py-3 hover:bg-red-700 transition duration-200 inline-block ${isLargeScreen ? 'text-xl' : 'text-lg'}`}>
                      Déconnexion
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className={`text-primary font-bold rounded-full bg-white px-6 py-3 hover:bg-tertiary transition duration-200 inline-block ${isLargeScreen ? 'text-xl' : 'text-lg'}`} onClick={toggleMenu}>
                    Login
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link to="/register" className={`text-accent font-bold rounded-full bg-secondary px-6 py-3 hover:bg-tertiary transition duration-200 inline-block ${isLargeScreen ? 'text-xl' : 'text-lg'}`} onClick={toggleMenu}>
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </header>
        <main className="flex-grow flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginTest setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            {isLoggedIn && (
              <Route path="/quiz" element={<Quiz />} />
            )}
            <Route path="/categories/sports" element={<Sports />} />
            <Route path="/categories/football" element={<Football />} />
            <Route path="/categories/tennis" element={<Tennis />} />
            <Route path="/categories/basketball" element={<Basketball />} />
            <Route path="/categories/cinema" element={<Cinema />} />
            <Route path="/categories/histoire" element={<Histoire />} /> {/* Ajoutez cette ligne pour la route d'histoire */}
            <Route path="/categories/sciences" element={<Sciences />} /> {/* Ajoutez cette ligne pour la route de sciences */}
            <Route path="/categories/arts" element={<Arts />} /> {/* Ajoutez cette ligne pour la route d'arts */}
            <Route path="/categories/culture générale" element={<CultureGenerale />} /> {/* Ajoutez cette ligne pour la route d'arts */}

            {!isLoggedIn && (
              <Route path="/quiz" element={<Navigate to="/login" />} />
            )}
            {isLoggedIn && (
              <Route path="/quoizer" element={<QuestionForm />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
