import { AnimatePresence, motion } from "framer-motion";
import { shareFortuneImage } from "../../lib/fortuneCard";
import styles from "./MessageReveal.module.css";

// Tarjeta de mensaje compartida por la bola y la galleta. El texto se
// desvanece/enfoca cada vez que cambia, aunque la tarjeta siga montada.
function MessageReveal({ message, legendary, copied, onCopy, secondaryLabel, onSecondary }) {
  return (
    <motion.div
      className={`${styles.card}${legendary ? ` ${styles.legendary}` : ""}`}
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {legendary && (
        <p className={styles.legendaryKicker}>✦ Presagio legendario ✦</p>
      )}
      <blockquote className={styles.quote}>
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            className={styles.text}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </blockquote>
      <div className={styles.actions}>
        <button type="button" className={styles.ghostButton} onClick={onCopy}>
          {copied ? "Copiado" : "Copiar"}
        </button>
        <button
          type="button"
          className={styles.ghostButton}
          onClick={() => shareFortuneImage(message, { legendary })}
        >
          Guardar imagen
        </button>
        <button type="button" className={styles.textButton} onClick={onSecondary}>
          {secondaryLabel}
        </button>
      </div>
    </motion.div>
  );
}

export default MessageReveal;
