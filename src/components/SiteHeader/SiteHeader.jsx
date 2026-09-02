import { motion, useScroll } from "framer-motion";
import styles from "./SiteHeader.module.css";

function SiteHeader({ muted, onToggleAudio }) {
  const { scrollYProgress } = useScroll();

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <a href="#inicio" className={styles.mark} aria-label="Portal Místico, ir al inicio">
          <span className={styles.markGlyph} aria-hidden="true">✦</span>
          <span>Portal Místico</span>
        </a>
        <nav className={styles.nav} aria-label="Navegación principal">
          <a href="#blog">Blog</a>
          <a href="#bola-fortuna">Bola</a>
          <a href="#galleta-fortuna">Galleta</a>
        </nav>
        <button
          type="button"
          className={styles.soundToggle}
          onClick={onToggleAudio}
          aria-pressed={!muted}
        >
          <span className={styles.soundDot} data-active={!muted} aria-hidden="true" />
          <span>{muted ? "Silencio" : "Sonido"}</span>
        </button>
      </div>
      <div className={styles.progressTrack}>
        <motion.div className={styles.progressFill} style={{ scaleX: scrollYProgress }} />
      </div>
    </header>
  );
}

export default SiteHeader;
