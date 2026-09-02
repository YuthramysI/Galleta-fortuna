import Reveal from "../Reveal/Reveal";
import { useMagnetic } from "../../hooks/useMagnetic";
import styles from "./Hero.module.css";

function Hero() {
  const ctaRef = useMagnetic(0.25);

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-heading">
      <div>
        <Reveal>
          <span className={styles.glyphs} aria-hidden="true">✦ ☾ ♆ ✧</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 id="hero-heading" className={styles.heading}>
            Bienvenido al <em>Portal Místico</em>
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className={styles.lede}>
            Sumérgete en un viaje donde los secretos del universo se revelan en cada
            destello y susurro de la eternidad.
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <div className={styles.actions}>
            <a ref={ctaRef} href="#blog" className={styles.cta}>
              Leer el blog
            </a>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.36} side>
        <dl className={styles.stats}>
          <div>
            <dt>Rituales</dt>
            <dd>II</dd>
          </div>
          <div>
            <dt>Presagios</dt>
            <dd>XXV</dd>
          </div>
          <div>
            <dt>Lecturas</dt>
            <dd>IV</dd>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}

export default Hero;
