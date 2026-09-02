import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

// Revelado orgánico al hacer scroll: opacidad + desplazamiento leve + desenfoque
// que se enfoca. Anima solo transform/opacity/filter (hilo de composición).
function Reveal({ delay = 0, side = false, className, children }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: side ? 0 : 20,
        x: side ? 26 : 0,
        filter: "blur(8px)",
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
