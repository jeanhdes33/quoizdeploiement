import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import quizImage from './quiz.png'; // Importez l'image depuis le même dossier que votre composant Home

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFadeIn(true);
    }, 500); // Délai de 0.5 seconde pour l'effet de fondu

    return () => clearTimeout(timeoutId);
  }, []);

  const scaleVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5 } },
  };

  // Style pour masquer le défilement vertical
  const containerStyle = {
    overflowY: 'hidden',
    '@media (max-width: 1024px)': {
      overflowY: 'auto',
    },
  };

  return (
    <div className="home-container" style={containerStyle}>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <motion.div
                className="fade-in"
                style={{ opacity: 0 }}
                animate={{ opacity: fadeIn ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Utilisez la variable quizImage pour spécifier le chemin de l'image */}
                <img src={quizImage} loading="lazy" alt="Photo by Martin Sanchez" className="h-full w-full object-cover object-center" />
              </motion.div>
            </div>

            <div className="md:pt-4"> {/* Réduire la marge inférieure ici */}
              <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6 md:text-left">Bienvenue sur Quoiz ! </h1>

              <p className="mb-4 text-gray-500 sm:text-lg md:mb-6"> {/* Réduire la marge inférieure ici */}
                Bienvenue sur Quoiz, l'application ultime pour tester vos connaissances dans une variété de sujets passionnants ! Que vous soyez un amateur de sport, un cinéphile ou un passionné d'histoire, Quoiz a quelque chose pour vous ! Le but ? Être le meilleur et faire le meilleur score dans tous les domaines. Vous pouvez même ajouter des questions plus pointues pour garder votre avance et maintenir votre statut de champion !
              </p>

              <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4 md:text-left">À propos de nous</h2>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8"> {/* Réduire la marge inférieure ici */}
                Chez Quoiz, notre mission est de rendre l'apprentissage amusant et stimulant. Nous croyons que chaque question posée est une opportunité d'apprentissage et de découverte. Notre équipe travaille sans relâche pour créer des quiz divertissants et éducatifs qui vous permettront de tester vos connaissances et d'en apprendre davantage sur le monde qui vous entoure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
