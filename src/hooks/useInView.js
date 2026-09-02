import { useEffect, useRef, useState } from "react";

// Detecta cercanía al viewport para diferir el montaje de elementos pesados
// (p. ej. la animación Rive) hasta que realmente van a verse.
export function useInView({ rootMargin = "200px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return [ref, inView];
}
