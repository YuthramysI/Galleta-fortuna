import React from "react";

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button 
      onClick={toggleDarkMode}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        padding: "10px 15px",
        borderRadius: "25px",
        border: "none",
        background: darkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
        color: darkMode ? "#fff" : "#000",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backdropFilter: "blur(5px)",
        fontSize: "1.2em"
      }}
    >
      {darkMode ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  );
};

export default ThemeToggle;