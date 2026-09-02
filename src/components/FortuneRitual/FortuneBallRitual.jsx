import { lazy, Suspense, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Reveal from "../Reveal/Reveal";
import { useInView } from "../../hooks/useInView";
import MessageReveal from "./MessageReveal";
import styles from "./FortuneBallRitual.module.css";

const RiveOrb = lazy(() => import("./RiveOrb"));

function FortuneBallRitual({ ball, ballLegendary, ballOpen, copied, onSpin, onClose, onCopy }) {
  const [sectionRef, inView] = useInView({ rootMargin: "300px" });
  const [pulsing, setPulsing] = useState(false);

  const handleSpin = () => {
    onSpin();
    setPulsing(true);
    window.setTimeout(() => setPulsing(false), 900);
  };

  return (
    <section
      id="bola-fortuna"
      ref={sectionRef}
      className={styles.ritual}
      aria-labelledby="ball-heading"
    >
      <div>
        <Reveal>
          <p className={styles.kicker}>Ritual I</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="ball-heading" className={styles.heading}>
            Bola de la Fortuna
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className={styles.copy}>
            Toca la esfera mística para revelar un mensaje del universo y descubrir las
            energías que te envuelven.
          </p>
        </Reveal>
        <AnimatePresence>
          {ballOpen && (
            <MessageReveal
              message={ball}
              legendary={ballLegendary}
              copied={copied}
              onCopy={onCopy}
              secondaryLabel="Cerrar"
              onSecondary={onClose}
            />
          )}
        </AnimatePresence>
      </div>
      <Reveal side delay={0.1} className={styles.visual}>
        {inView ? (
          <Suspense fallback={<div className={styles.orbFallback} aria-hidden="true" />}>
            <RiveOrb pulsing={pulsing} onActivate={handleSpin} />
          </Suspense>
        ) : (
          <div className={styles.orbFallback} aria-hidden="true" />
        )}
      </Reveal>
    </section>
  );
}

export default FortuneBallRitual;
