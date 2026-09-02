import { useMemo } from "react";
import styles from "./Atmosphere.module.css";

const TAROT_SYMBOLS = ["✦", "✧", "✶", "♆", "♇", "☾", "☽", "☯"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// El fondo original del proyecto: esferas cósmicas, un campo de 150
// estrellas y símbolos de tarot a la deriva. Los valores aleatorios se
// congelan al montar (useMemo) para que no salten al re-renderizar el
// resto de la app (p. ej. al abrir una tarjeta de mensaje).
function Atmosphere() {
  const spheres = useMemo(
    () =>
      Array.from({ length: 3 }, () => ({
        r: Math.round(randomBetween(156, 256)),
        g: Math.round(randomBetween(100, 150)),
        size: randomBetween(100, 400),
        top: randomBetween(0, 100),
        left: randomBetween(0, 100),
        delay: randomBetween(0, 15),
      })),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 150 }, () => ({
        size: randomBetween(1, 4),
        top: randomBetween(0, 100),
        left: randomBetween(0, 100),
        delay: randomBetween(0, 3),
      })),
    []
  );

  const symbols = useMemo(
    () =>
      TAROT_SYMBOLS.map((symbol) => ({
        symbol,
        left: randomBetween(0, 100),
        duration: randomBetween(10, 25),
        size: randomBetween(1.5, 3.5),
      })),
    []
  );

  return (
    <div className={styles.background} aria-hidden="true">
      {spheres.map((sphere, i) => (
        <div
          key={`sphere-${i}`}
          className={styles.sphere}
          style={{
            background: `radial-gradient(circle, rgba(${sphere.r}, ${sphere.g}, 175, 0.2), transparent 70%)`,
            width: `${sphere.size}px`,
            height: `${sphere.size}px`,
            top: `${sphere.top}%`,
            left: `${sphere.left}%`,
            animationDelay: `${sphere.delay}s`,
          }}
        />
      ))}
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className={styles.star}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {symbols.map((item, i) => (
        <div
          key={`symbol-${i}`}
          className={styles.symbol}
          style={{
            left: `${item.left}%`,
            animationDuration: `${item.duration}s`,
            fontSize: `${item.size}rem`,
          }}
        >
          {item.symbol}
        </div>
      ))}
      <div className={styles.glow} />
    </div>
  );
}

export default Atmosphere;
