import { useEffect, useRef } from "react";

// Atrae sutilmente un elemento hacia el cursor. Anima solo `transform`
// (hilo de composición/GPU) y se desactiva en dispositivos táctiles.
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return undefined;

    const handleMove = (event) => {
      const bounds = node.getBoundingClientRect();
      const x = event.clientX - (bounds.left + bounds.width / 2);
      const y = event.clientY - (bounds.top + bounds.height / 2);
      node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const handleLeave = () => {
      node.style.transform = "translate(0, 0)";
    };

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}
