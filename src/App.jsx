import { useEffect, useRef, useState } from "react";
import Atmosphere from "./components/Atmosphere/Atmosphere";
import Cursor from "./components/Cursor/Cursor";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import Hero from "./components/Hero/Hero";
import BlogSection from "./components/BlogSection/BlogSection";
import FortuneBallRitual from "./components/FortuneRitual/FortuneBallRitual";
import FortuneCookieRitual from "./components/FortuneRitual/FortuneCookieRitual";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import { BALL, BALL_LEGENDARY, COOKIE, COOKIE_LEGENDARY } from "./data/content";
import { drawFortune } from "./lib/fortune";
import { playChime } from "./lib/sound";

const COPY_FEEDBACK_MS = 1800;

function App() {
  const [ball, setBall] = useState({ message: "", legendary: false });
  const [ballOpen, setBallOpen] = useState(false);
  const [cookie, setCookie] = useState({ message: "", legendary: false });
  const [cookieOpen, setCookieOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => () => clearTimeout(copyTimeoutRef.current), []);

  useEffect(() => {
    // Autoplay silenciado: los navegadores lo permiten sin gesto del usuario.
    audioRef.current?.play().catch(() => {});
  }, []);

  // El toggle real de sonido vive en el propio handler de clic (no en un
  // efecto) para que el .play() ocurra dentro del gesto del usuario — si el
  // autoplay muteado inicial nunca llegó a reproducir de verdad, esto lo
  // recupera; si ya estaba sonando, es un no-op inofensivo.
  const toggleAudio = () => {
    setMuted((current) => {
      const next = !current;
      if (audioRef.current) {
        audioRef.current.muted = next;
        audioRef.current.play().catch(() => {});
      }
      return next;
    });
  };

  const spinBall = () => {
    setBall((current) => drawFortune(BALL, BALL_LEGENDARY, current.message));
    setBallOpen(true);
    if (!muted) playChime();
  };

  const closeBall = () => setBallOpen(false);

  const breakCookie = () => {
    setCookie((current) => drawFortune(COOKIE, COOKIE_LEGENDARY, current.message));
    setCookieOpen(true);
    if (!muted) playChime();
  };

  const copyMessage = (text) => {
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
      })
      .catch(() => {});
  };

  return (
    <>
      <a className="skip-link" href="#inicio">
        Saltar al contenido
      </a>
      <Atmosphere />
      <Cursor />
      <SiteHeader muted={muted} onToggleAudio={toggleAudio} />
      <main>
        <Hero />
        <BlogSection />
        <FortuneBallRitual
          ball={ball.message}
          ballLegendary={ball.legendary}
          ballOpen={ballOpen}
          copied={copied}
          onSpin={spinBall}
          onClose={closeBall}
          onCopy={() => copyMessage(ball.message)}
        />
        <FortuneCookieRitual
          cookie={cookie.message}
          cookieLegendary={cookie.legendary}
          cookieOpen={cookieOpen}
          copied={copied}
          onBreak={breakCookie}
          onCopy={() => copyMessage(cookie.message)}
        />
      </main>
      <SiteFooter />
      <audio ref={audioRef} loop muted style={{ display: "none" }}>
        <source src="/sonido-space.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}

export default App;
