// App.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import "./App.css";
import Preloader from "./Preloader";
import Menu from "./Menu.jsx";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function CandleCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <div
      className="candle-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: position.x - 16,
          top: position.y - 32,
          width: "32px",
          height: "64px",
          backgroundImage: "url('/candle.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: position.x - 48,
          top: position.y - 48,
          width: "96px",
          height: "96px",
          backgroundColor: "rgba(255,200,0,0.5)",
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}

const MysticBackground = () => (
  <div className="mystic-background">
    {[...Array(3)].map((_, i) => (
      <div
        key={`sphere-${i}`}
        className="cosmic-sphere"
        style={{
          background: `radial-gradient(circle, rgba(${Math.random() * 100 + 156}, ${
            Math.random() * 50 + 100
          }, 175, 0.2), transparent 70%)`,
          width: `${Math.random() * 300 + 100}px`,
          height: `${Math.random() * 300 + 100}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`,
        }}
      />
    ))}
    {[...Array(150)].map((_, i) => (
      <div
        key={`particle-${i}`}
        className="star-particle"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ))}
    {["✦", "✧", "✶", "♆", "♇", "☾", "☽", "☯"].map((symbol, i) => (
      <div
        key={`symbol-${i}`}
        className="tarot-symbol"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 15 + 10}s`,
          fontSize: `${Math.random() * 2 + 1.5}rem`,
        }}
      >
        {symbol}
      </div>
    ))}
    <div className="cosmic-glow" />
  </div>
);

const SmoothScroll = ({ children }) => {
  const ref = useRef(null);
  useScroll({ target: ref, offset: ["start start", "end end"] });
  return <div ref={ref} className="smooth-scroll-container">{children}</div>;
};

// Ajusta el marginTop según lo necesites, sin comentar dentro del objeto
const InicioSection = () => (
  <motion.div
    id="inicio"
    className="content-section inicio-section"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <motion.div
      className="text-content"
      variants={textContainerVariants}
      initial="hidden"
      animate="visible"
      style={{ marginTop: "100px" }}
    >
      <motion.h1
        variants={textItemVariants}
        style={{
          fontSize: "3.5rem",
          marginBottom: "20px",
          textShadow: "0 0 15px rgba(255,255,255,0.6)",
          transition: "none",
        }}
      >
        Bienvenido al Portal Místico
      </motion.h1>
      <motion.p
        variants={textItemVariants}
        style={{ fontSize: "1.5rem", marginBottom: "40px", transition: "none" }}
      >
        Sumérgete en un viaje donde los secretos del universo se revelan en cada destello y susurro de la eternidad.
      </motion.p>
    </motion.div>
  </motion.div>
);

const BlogSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const articles = [
    {
      id: 1,
      title: "El Secreto de la Sincronicidad Cósmica",
      subtitle: "Mensajes del destino",
      content:
        "Aunque muchos lo atribuyen al azar, la sincronicidad es vista en la tradición esotérica como la forma en que el universo se comunica contigo. Pequeños eventos y coincidencias se entrelazan para revelarte un mensaje oculto.",
      moreContent:
        "Si observas símbolos o patrones recurrentes en momentos clave, estos pueden ser indicios para que tomes decisiones alineadas con el flujo del destino. Conectar con estas señales te permite transformar cada coincidencia en una oportunidad consciente para crecer.",
    },
    {
      id: 2,
      title: "Las Constelaciones y su Influencia en tu Destino",
      subtitle: "El mapa de las estrellas",
      content:
        "Las estrellas han sido guías y presagios desde tiempos inmemoriales. La disposición de las constelaciones revela patrones energéticos que influyen en nuestro camino.",
      moreContent:
        "Tu carta natal, que interpreta la posición de los planetas al momento de tu nacimiento, es una herramienta poderosa para comprender tus desafíos y oportunidades. Conocer el significado de cada signo y su influencia te ayudará a navegar por los ciclos de la vida.",
    },
    {
      id: 3,
      title: "El Enigma de la Galleta de la Fortuna",
      subtitle: "Un mensaje celestial",
      content:
        "La galleta de la fortuna es mucho más que un postre; es un ritual simbólico que conecta lo cotidiano con la sabiduría ancestral.",
      moreContent:
        "Cada mensaje es una invitación a la introspección y a descubrir pistas sobre tu camino. Esta tradición milenaria nos recuerda que en lo simple se ocultan secretos poderosos que pueden transformar nuestra visión del destino.",
    },
    {
      id: 4,
      title: "Astrología y Energías Cósmicas",
      subtitle: "El latido del universo",
      content:
        "La astrología es un lenguaje que describe la conexión entre los movimientos celestes y nuestra existencia. Nos ayuda a entender la vibración energética que influye en cada experiencia.",
      moreContent:
        "Interpretar tránsitos, aspectos y casas revela cómo los ciclos del universo marcan nuestro crecimiento personal. Este conocimiento ancestral te permite sintonizarte con el ritmo cósmico para tomar decisiones más alineadas con tu ser.",
    },
  ];
  const BlogCard = ({ article }) => {
    const [expanded, setExpanded] = useState(false);
    return (
      <motion.article
        className="blog-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          y: -10,
          scale: 1.02,
          boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
        }}
      >
        <header className="blog-card-header">
          <h3>{article.title}</h3>
          <h4>{article.subtitle}</h4>
        </header>
        <section className="blog-card-content">
          <p>{article.content}</p>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p>{article.moreContent}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
        <footer className="blog-card-footer">
          <button className="read-more-button" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Leer menos" : "Leer más"}
          </button>
        </footer>
      </motion.article>
    );
  };
  return (
    <motion.div
      id="blog"
      className="content-section blog-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="text-content blog-header" style={{ y }}>
        <h2>Blog Esotérico</h2>
        <p>
          Descubre cómo las energías cósmicas, la astrología y la sabiduría ancestral se entrelazan para revelar secretos profundos sobre nuestro destino.
        </p>
      </motion.div>
      <motion.div className="blog-cards">
        {articles.map((article) => (
          <BlogCard key={article.id} article={article} />
        ))}
      </motion.div>
    </motion.div>
  );
};

const FortuneCookieSection = () => {
  const [cookieOpened, setCookieOpened] = useState(false);
  const [fortune, setFortune] = useState("");
  const fortunes = [
    "El universo conspira a tu favor; tu número de la suerte es el 7. ॐ Conecta con la energía divina y permite que la luz del destino ilumine tu camino.",
    "Las estrellas te guían en un viaje de transformación; hoy, el 3 te invita a abrir tu mente y recibir sabiduría ancestral. ॐ",
    "Recibe la vibración cósmica: el 9 se manifiesta como tu número, invitándote a renacer y a sintonizarte con el flujo universal. ॐ",
    "El destino se revela en cada señal; el 5 te conecta con el equilibrio interior. ॐ Deja que la fuerza del Om transforme tu realidad.",
    "Las energías del cosmos se alinean: el 8 simboliza poder y renovación. ॐ Siente la resonancia del Om y abraza la transformación.",
  ];
  const handleOpenCookie = () => {
    if (!cookieOpened) {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(randomFortune);
      setCookieOpened(true);
    }
  };
  return (
    <motion.div
      id="galleta-fortuna"
      className="content-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Galleta de la Fortuna</h2>
        <p>
          Rompe esta galleta sagrada y recibe un mensaje del universo que te invita a descubrir tu destino.
        </p>
      </motion.div>
      <motion.div
        className="fortune-cookie-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
      >
        <motion.div
          className={`fortune-cookie ${cookieOpened ? "opened" : ""}`}
          onClick={handleOpenCookie}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {!cookieOpened ? (
            <img src="/galleta2.png" alt="Galleta de la Fortuna" className="fortune-cookie-image" />
          ) : (
            "✨"
          )}
        </motion.div>
        <AnimatePresence>
          {cookieOpened && (
            <motion.div
              className="fortune-prediction"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p>{fortune}</p>
              <div className="prediction-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard
                      .writeText(fortune)
                      .then(() => alert("¡Mensaje copiado al portapapeles!"))
                      .catch((err) => alert("Error al copiar: " + err));
                  }}
                  className="copy-button"
                >
                  📋 Copiar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (navigator.share) {
                      navigator
                        .share({ text: fortune })
                        .catch((err) => console.error("Error al compartir:", err));
                    } else {
                      alert("La API de compartir no está disponible en tu navegador.");
                    }
                  }}
                  className="share-button"
                >
                  🔗 Compartir
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCookieOpened(false);
                  }}
                  className="close-button"
                >
                  ❌ Cerrar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const generarPrediccionBola = () => {
  const index = Math.floor(Math.random() * 20);
  switch (index) {
    case 0:
      return "El universo te susurra en cada respiro; siente el poder del infinito (∞) y déjate envolver por su misterio.";
    case 1:
      return "Permite que el Om (ॐ) resuene en tu interior, abriendo un camino de luz y conexión divina.";
    case 2:
      return "La espiral de la existencia te invita a soltar el pasado y a fluir hacia la transformación eterna.";
    case 3:
      return "La rueda del dharma gira en silencio, recordándote que cada final abre paso a un nuevo comienzo.";
    case 4:
      return "Siente la pureza de la flor de loto; en su apertura se esconde la promesa de un renacer interior.";
    case 5:
      return "El murmullo del universo revela que cada instante es un portal hacia lo divino.";
    case 6:
      return "Deja que la energía del cosmos te envuelva y te guíe hacia un destino de paz y armonía.";
    case 7:
      return "El infinito (∞) se refleja en tu alma; abraza su misterio y fluye con la eternidad.";
    case 8:
      return "Om (ॐ) vibra en el silencio, invitándote a descubrir la esencia de tu ser.";
    case 9:
      return "La espiral de la vida te eleva, acercándote a la verdad oculta en el cosmos.";
    case 10:
      return "La rueda del dharma marca el ritmo de tu existencia; sigue su compás y renueva tu espíritu.";
    case 11:
      return "La flor de loto se abre en medio de la oscuridad, revelando la luz que habita en ti.";
    case 12:
      return "El universo conspira en cada latido; siente su vibración sagrada y déjate transformar.";
    case 13:
      return "Una danza cósmica se despliega ante ti; fluye con la energía del Om (ॐ) y descubre tu camino.";
    case 14:
      return "El misterio del infinito (∞) te envuelve, invitándote a explorar la profundidad de tu alma.";
    case 15:
      return "Las energías celestiales se entrelazan para guiarte; abraza el cambio y renueva tu esencia.";
    case 16:
      return "El murmullo del cosmos te susurra secretos; permite que su luz ilumine tu sendero.";
    case 17:
      return "Cada respiro es un eco del universo; sintonízate con la vibración infinita y déjate llevar.";
    case 18:
      return "El Om (ॐ) resuena en tu interior, despertando la sabiduría ancestral que impulsa tu evolución.";
    case 19:
      return "La rueda del dharma gira para recordarte que cada ciclo es una oportunidad para renacer.";
    default:
      return "El universo te habla; escucha con el corazón.";
  }
};

const FortuneBallSection = ({ handleClick, RiveComponent }) => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [prediction, setPrediction] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);
  const handleFortuneBallClick = () => {
    handleClick();
    const randomPrediction = generarPrediccionBola();
    setPrediction(randomPrediction);
    setShowPrediction(true);
  };
  const handleCopy = () => {
    if (prediction) {
      navigator.clipboard
        .writeText(prediction)
        .then(() => alert("¡Mensaje copiado al portapapeles!"))
        .catch((err) => alert("Error al copiar: " + err));
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({ text: prediction })
        .catch((err) => console.error("Error al compartir:", err));
    } else {
      alert("La API de compartir no está disponible en tu navegador.");
    }
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setShowPrediction(false);
  };
  return (
    <motion.div
      id="bola-fortuna"
      className="fortune-ball-section content-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ backgroundPositionY: backgroundY }}
    >
      <motion.div
        className="text-content"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <h2>Bola de la Fortuna</h2>
        <p>
          Toca la esfera mística para revelar un mensaje del universo y descubrir las energías que te envuelven.
        </p>
      </motion.div>
      <motion.div
        className="animation-wrapper"
        onClick={handleFortuneBallClick}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ position: "relative" }}
      >
        <motion.div
          className="fortune-border-effect"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
        >
          {RiveComponent ? (
            <RiveComponent
              tabIndex={-1}
              className="rive-animation"
              style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
            />
          ) : (
            <p>Cargando animación...</p>
          )}
        </motion.div>
        <AnimatePresence>
          {showPrediction && (
            <motion.div
              className="fortune-prediction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p>{prediction}</p>
              <div className="prediction-actions">
                <button onClick={handleCopy} className="copy-button">
                  📋 Copiar
                </button>
                <button onClick={handleShare} className="share-button">
                  🔗 Compartir
                </button>
                <button onClick={handleClose} className="close-button">
                  ❌ Cerrar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="mystical-elements">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`mystic-element-${i}`}
            className="mystic-element"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeSection, setActiveSection] = useState("inicio");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      lastScrollY.current = currentScrollY;
      const sections = ["inicio", "blog", "bola-fortuna", "galleta-fortuna"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Configuración de la animación de la bola de la fortuna
  const { rive: fortuneRive, RiveComponent: FortuneComponent } = useRive({
    src: "/fortuna-ah.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    canvas: { width: "100%", height: "100%", backgroundColor: "transparent" },
  });
  const clickInput = useStateMachineInput(fortuneRive, "State Machine 1", "click");

  useEffect(() => {
    if (fortuneRive) {
      fortuneRive.resizeDrawingSurfaceToCanvas();
      console.log("Fortune animation loaded");
      const canvas = document.querySelector(".fortune-border-effect canvas");
      if (canvas) {
        canvas.style.backgroundColor = "transparent";
      }
    }
  }, [fortuneRive]);

  const handleAnimationClick = () => {
    clickInput?.fire();
    const wrapper = document.querySelector(".animation-wrapper");
    if (wrapper) {
      wrapper.classList.add("fortune-clicked");
      setTimeout(() => wrapper.classList.remove("fortune-clicked"), 1000);
    }
  };

  const audioRef = useRef(null);
  const [audioMuted, setAudioMuted] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setAudioMuted(audioRef.current.muted);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Auto-play del audio bloqueado:", err);
      });
    }
  }, []);

  const handlePreloaderComplete = () => setShowPreloader(false);

  return (
    <div className="app-container">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <MysticBackground />
      <CandleCursor />
      <Menu activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Botón para silenciar o reproducir audio */}
      <button
        onClick={toggleAudio}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 110,
          background: "#4A00E0",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {audioMuted ? "Reproducir Audio" : "Silenciar Audio"}
      </button>

      <SmoothScroll>
        <InicioSection />
        <BlogSection />
        <FortuneBallSection handleClick={handleAnimationClick} RiveComponent={FortuneComponent} />
        <FortuneCookieSection />
      </SmoothScroll>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 0.5 }}
      >
        <span>Desplázate para explorar</span>
        <div className="scroll-arrow">↓</div>
      </motion.div>

      <audio ref={audioRef} loop style={{ display: "none" }}>
        <source src="/sonido-space.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
