import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sport = () => {
  const sportCategories = [
    { name: 'Football', icon: '⚽', description: 'Description du football.', slug: 'football' },
    { name: 'Basketball', icon: '🏀', description: 'Description du basketball.', slug: 'basketball', disabled: false },
    { name: 'Tennis', icon: '🎾', description: 'Description du tennis.', slug: 'tennis', disabled: false },
  ];

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

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Choisissez votre catégorie</h1>
      <motion.div
        className="grid-container"
        style={{ backgroundColor: 'white', padding: '20px', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}
        variants={scaleVariants}
        initial="hidden"
        animate={fadeIn ? "visible" : "hidden"}
      >
        {sportCategories.map((category, index) => (
          <motion.div
            key={index}
            className="grid-item bg-accent"
            style={{ 
              backgroundColor: category.disabled ? '#D3D3D3' : '#DFF5FF', // Changer la couleur en gris si la catégorie est désactivée
              border: 'none', 
              marginBottom: '20px', 
              textAlign: 'center', 
              padding: '10px', 
              width: '300px',
              pointerEvents: category.disabled ? 'none' : 'auto' // Désactiver les événements de pointage si la catégorie est désactivée
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to={`/categories/${category.slug}`} className="no-underline text-black">
              <span role="img" aria-label={category.name} style={{ fontSize: '40px' }}>{category.icon}</span>
              <div className="category-info">
                <span className="category-name">{category.name}</span>
                <div className="category-description bg-tertiary px-4 py-2 rounded-md opacity-0 hidden">
                  {category.description}
                </div>
              </div>
            </Link>
            {category.disabled && (
              <p style={{ margin: '5px auto 0', color: '#333', fontSize: '14px', textAlign: 'center' }}>Bientôt !</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Sport;
