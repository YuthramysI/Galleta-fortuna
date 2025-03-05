import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Menu.css";

const Menu = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "inicio", label: "Inicio", icon: "🏠" },
    { id: "blog", label: "Blog Esotérico", icon: "📝" },
    { id: "bola-fortuna", label: "Bola de la Fortuna", icon: "🔮" },
    { id: "galleta-fortuna", label: "Galleta de la Fortuna", icon: "🥠" },
  ];

  // El menú se muestra por defecto en pantallas grandes
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 769) {
      setIsMenuOpen(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Variantes para el contenedor del menú
  const menuVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40,
      },
    },
    closed: {
      y: -100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40,
      },
    },
  };

  return (
    <>
      {/* Botón toggle visible solo en pantallas pequeñas */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <motion.div
        className="horizontal-menu"
        variants={menuVariants}
        initial={isMenuOpen ? "open" : "closed"}
        animate={isMenuOpen ? "open" : "closed"}
      >
        <div className="menu-items">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              className={`menu-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => {
                setActiveSection(item.id);
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                if (window.innerWidth < 769) {
                  setIsMenuOpen(false);
                }
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                textShadow: "0 0 8px rgb(255,255,255)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Menu;

