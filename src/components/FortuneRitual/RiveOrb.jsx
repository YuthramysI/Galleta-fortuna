import { useEffect } from "react";
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useMagnetic } from "../../hooks/useMagnetic";
import styles from "./FortuneBallRitual.module.css";

// Aislado en su propio archivo a propósito: es el punto de entrada de
// @rive-app/react-canvas, así Vite lo separa en un chunk que solo se
// descarga cuando React.lazy lo monta (ver FortuneBallRitual).
function RiveOrb({ pulsing, onActivate }) {
  const { rive, RiveComponent } = useRive({
    src: "/fortuna-ah.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  const clickInput = useStateMachineInput(rive, "State Machine 1", "click");
  const magneticRef = useMagnetic(0.06);

  useEffect(() => {
    rive?.resizeDrawingSurfaceToCanvas();
  }, [rive]);

  const handleClick = () => {
    clickInput?.fire();
    onActivate();
  };

  return (
    <button
      ref={magneticRef}
      type="button"
      className={`${styles.orb}${pulsing ? ` ${styles.orbPulsing}` : ""}`}
      onClick={handleClick}
    >
      <span className={styles.orbAura} aria-hidden="true" />
      <span className={styles.orbCanvas}>
        <RiveComponent />
      </span>
      <span className={styles.orbLabel}>Toca para consultar</span>
    </button>
  );
}

export default RiveOrb;
