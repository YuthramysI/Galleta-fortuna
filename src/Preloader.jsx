import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { RiveComponent, rive } = useRive({
    src: '/dark_energy.riv',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  // Limpieza de la animación al desmontar
  useEffect(() => {
    return () => {
      if (rive) rive.stop();
    };
  }, [rive]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onComplete, 800); 
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: 'easeInOut' }
          }}
        >
          <div className="rive-container">
            {RiveComponent && <RiveComponent />}
          </div>

          <motion.button
            className="enter-button"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Entrar al Portal Mistico 
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;