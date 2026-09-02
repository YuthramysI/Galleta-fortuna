import { AnimatePresence } from "framer-motion";
import Reveal from "../Reveal/Reveal";
import { useMagnetic } from "../../hooks/useMagnetic";
import MessageReveal from "./MessageReveal";
import styles from "./FortuneCookieRitual.module.css";

function FortuneCookieRitual({ cookie, cookieLegendary, cookieOpen, copied, onBreak, onCopy }) {
  const frameRef = useMagnetic(0.05);

  return (
    <section
      id="galleta-fortuna"
      className={styles.ritual}
      aria-labelledby="cookie-heading"
    >
      <Reveal side className={styles.visual}>
        <button ref={frameRef} type="button" className={styles.frame} onClick={onBreak}>
          <span className={styles.glow} aria-hidden="true" />
          <img src="/galleta2.png" alt="Galleta de la fortuna" className={styles.image} />
          <span className={styles.label}>Toca para romper</span>
        </button>
      </Reveal>
      <div>
        <Reveal>
          <p className={styles.kicker}>Ritual II</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="cookie-heading" className={styles.heading}>
            Galleta de la Fortuna
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className={styles.copy}>
            Rompe esta galleta sagrada y recibe un mensaje del universo que te invita a
            descubrir tu destino.
          </p>
        </Reveal>
        <AnimatePresence>
          {cookieOpen && (
            <MessageReveal
              message={cookie}
              legendary={cookieLegendary}
              copied={copied}
              onCopy={onCopy}
              secondaryLabel="Otra galleta"
              onSecondary={onBreak}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default FortuneCookieRitual;
