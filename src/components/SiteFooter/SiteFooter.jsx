import { useState } from "react";
import Reveal from "../Reveal/Reveal";
import styles from "./SiteFooter.module.css";

function SiteFooter() {
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <Reveal>
        <div className={styles.row}>
          <span>Portal Místico</span>
          <span className={styles.glyphs} aria-hidden="true">✦ ☾ ♆ ✧</span>
          <span className={styles.meta}>Yuthramys · Portafolio</span>
        </div>
      </Reveal>
      <div className={styles.note}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={notesOpen}
          onClick={() => setNotesOpen((value) => !value)}
        >
          {notesOpen ? "Ocultar notas" : "¿Cómo se hizo esto?"}
        </button>
        {notesOpen && (
          <p className={styles.noteText}>
            Retícula editorial asimétrica con Fraunces + Manrope. Las revelaciones al
            hacer scroll y las microinteracciones corren con Framer Motion sobre{" "}
            <code>transform</code>/<code>opacity</code>. La bola de la fortuna monta una
            animación Rive cargada de forma diferida. Construido con React + Vite y CSS
            Modules.
          </p>
        )}
      </div>
    </footer>
  );
}

export default SiteFooter;
