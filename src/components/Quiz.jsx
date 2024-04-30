import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Sports', icon: '🏀', disabled: false },
  { name: 'Cinema', icon: '🎬', disabled: false },
  { name: 'Histoire', icon: '📜', disabled: false },
  { name: 'Sciences', icon: '🔬', disabled: false },
  { name: 'Arts', icon: '🎨', disabled: false },
  { name: 'Culture Générale', icon: '🌍', disabled: false },
];

const Quiz = () => {
  const [hovered, setHovered] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const scaleVariants = {
    hover: {
      scale: 1.01,
      transition: {
        duration: 0.2
      }
    },
    initial: {
      scale: 1,
    },
  };

  return (
    <motion.div
      className="quiz-container"
      style={{ backgroundColor: 'white', marginTop: '20px', padding: '20px', display: isLargeScreen ? 'grid' : 'block', gridTemplateColumns: 'repeat(3, 300px)', gridGap: isLargeScreen ? '20px' : '0' }}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className={`category-item bg-accent ${isLargeScreen ? 'grid-item' : ''}`}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          whileHover={category.disabled ? null : "hover"}
          animate={hovered === index && !category.disabled ? 'hover' : 'initial'}
          variants={scaleVariants}
          style={{ 
            backgroundColor: category.disabled ? '#D3D3D3' : (hovered === index ? '#67C6E3' : '#DFF5FF'), 
            border: 'none', 
            textAlign: 'center',
            pointerEvents: category.disabled ? 'none' : 'auto',
            marginBottom: isLargeScreen ? '0' : '20px' // Ajout de la marge basse uniquement si l'écran est petit
          }}
        >
          <Link to={`/categories/${category.name.toLowerCase()}`} className="no-underline text-black">
            <span role="img" aria-label={category.name} style={{ fontSize: '40px', display: 'inline-block' }}>{category.icon}</span>
            <div className="category-info" style={{ display: 'inline-block', marginLeft: '10px' }}>
              <span className="category-name">{category.name}</span>
              {category.disabled && (
                <p style={{ margin: '5px auto 0', color: '#333', fontSize: '14px', textAlign: 'center' }}>Bientôt !</p>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Quiz;
