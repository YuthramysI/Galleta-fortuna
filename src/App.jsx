// Lumière Aesthetics — Plataforma de Formación Estética Profesional
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './App.css';

const WA_NUMBER = '573000000000';
const WA_MSG = encodeURIComponent('Hola, me interesa recibir información sobre los cursos y servicios profesionales.');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────
function WhatsAppFAB() {
  return (
    <a
      href={WA_LINK}
      className="wa-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const links = [
    { id: 'academia',       label: 'Academia' },
    { id: 'modalidades',    label: 'Modalidades' },
    { id: 'servicios',      label: 'Servicios' },
    { id: 'la-guaira',      label: 'La Guaira' },
    { id: 'contacto',       label: 'Contacto' },
  ];

  return (
    <motion.nav
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => go('inicio')}>
          <span className="navbar__logo-main">LUMIÈRE</span>
          <span className="navbar__logo-sub">AESTHETICS</span>
        </button>

        <ul className={`navbar__links${open ? ' navbar__links--open' : ''}`}>
          {links.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`navbar__link${active === id ? ' navbar__link--active' : ''}`}
                onClick={() => go(id)}
              >{label}</button>
            </li>
          ))}
          <li>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
               className="btn-primary navbar__cta">
              Reservar por WhatsApp
            </a>
          </li>
        </ul>

        <button className="navbar__hamburger" onClick={() => setOpen(!open)} aria-label="Menú">
          <span /><span /><span />
        </button>
      </div>
      {open && <div className="navbar__overlay" onClick={() => setOpen(false)} />}
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="inicio" className="hero">
      <div className="hero__bg">
        <div className="hero__bg-gradient" />
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
      </div>

      <div className="hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        >
          <p className="hero__eyebrow">Academia & Clínica Estética Profesional</p>
          <h1 className="hero__headline">
            Transformando Vidas<br />
            <em>a través del Arte</em><br />
            y la Estética Profesional.
          </h1>
          <p className="hero__body">
            Formación especializada en micropigmentación paramédica, servicios clínicos de alta gama
            y acompañamiento para emprender en Venezuela. Certifícate con aval internacional.
          </p>
          <div className="hero__actions">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Reservar Cita por WhatsApp
            </a>
            <button className="btn-ghost" onClick={() => go('academia')}>
              Ver Cursos
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
        >
          <div className="hero__card">
            <div className="hero__card-badge">
              <span className="hero__card-badge-num">+500</span>
              <span className="hero__card-badge-text">alumnas certificadas</span>
            </div>
            <div className="hero__card-circles">
              <div className="hero__circle hero__circle--1" />
              <div className="hero__circle hero__circle--2" />
              <div className="hero__circle hero__circle--3" />
            </div>
            <div className="hero__card-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Certificación Internacional
            </div>
          </div>
          <div className="hero__mini-stats">
            {[{ n: '12+', l: 'Años' }, { n: '98%', l: 'Satisfacción' }].map(({ n, l }) => (
              <div key={n} className="hero__mini-stat">
                <span className="hero__mini-stat-num">{n}</span>
                <span className="hero__mini-stat-label">{l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.button
        className="hero__scroll-cue"
        onClick={() => go('academia')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.6, duration: 0.6 },
          y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 1.6 },
        }}
      >
        <div className="hero__scroll-line" />
        <span>Explora</span>
      </motion.button>
    </section>
  );
}

// ─── SectionHeader ─────────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className="section-header"
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-divider">
        <span />
        <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="var(--gold-400)" /></svg>
        <span />
      </div>
    </motion.div>
  );
}

// ─── Academia ─────────────────────────────────────────────────────────────────
const COURSES = [
  {
    num: '01',
    title: 'Micropigmentación de Cejas',
    sub: 'Técnicas Avanzadas',
    desc: 'Domina las técnicas de Microblading, Ombré, Powder Brow y combinadas. Aprende diseño de cejas según morfología facial, mezcla de pigmentos y protocolos de bioseguridad internacionales.',
    tags: ['Microblading', 'Ombré Brow', 'Powder Brow', 'Diseño facial'],
    duration: '40 h',
    level: 'Básico → Avanzado',
  },
  {
    num: '02',
    title: 'Remoción de Verrugas',
    sub: 'Protocolos de Bioseguridad',
    desc: 'Técnicas de electrocauterización y remoción con plasma pen. Diagnóstico diferencial, cuidados post-procedimiento, manejo de equipos de alta frecuencia y normativas de bioseguridad vigentes.',
    tags: ['Electrocauterización', 'Plasma Pen', 'Bioseguridad', 'Post-procedimiento'],
    duration: '20 h',
    level: 'Intermedio',
  },
  {
    num: '03',
    title: 'Reconstrucción de Areola / Pezón',
    sub: 'Especialización Oncológica & Post-Cirugía',
    desc: 'Micropigmentación paramédica para la restauración de la areola y el pezón en pacientes post-mastectomía. Un procedimiento que devuelve la autoestima y completa el proceso de recuperación oncológica.',
    tags: ['Paramédica', 'Post-mastectomía', 'Oncológica', 'Restauración'],
    duration: '30 h',
    level: 'Avanzado',
    featured: true,
  },
];

function Academia() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="academia" className="section section--ivory">
      <SectionHeader
        eyebrow="Academia de Formación"
        title="Cursos Especializados"
        subtitle="Programas diseñados para profesionales que buscan la excelencia técnica con certificación internacional."
      />
      <div ref={ref} className="academy-grid">
        {COURSES.map(({ num, title, sub, desc, tags, duration, level, featured }, i) => (
          <motion.article
            key={num}
            className={`course-card${featured ? ' course-card--featured' : ''}`}
            initial={{ opacity: 0, y: 52 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.13, ease: 'easeOut' }}
          >
            <div className="course-card__num">{num}</div>
            <div className="course-card__head">
              <h3 className="course-card__title">{title}</h3>
              <p className="course-card__sub">{sub}</p>
            </div>
            <p className="course-card__desc">{desc}</p>
            <div className="course-card__tags">
              {tags.map(t => <span key={t} className="course-card__tag">{t}</span>)}
            </div>
            <div className="course-card__meta">
              <span>⏱ {duration}</span>
              <span>◈ {level}</span>
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
               className={featured ? 'btn-primary btn-full' : 'btn-outline btn-full'}>
              Solicitar Información
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ─── Modalidades ──────────────────────────────────────────────────────────────
function Modalidades() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="modalidades" className="section section--pearl">
      <SectionHeader
        eyebrow="Modalidades de Estudio"
        title="Aprende a tu ritmo,<br/><em>donde estés.</em>"
        subtitle="Dos formatos diseñados para adaptarse a tu estilo de vida sin sacrificar la calidad del aprendizaje."
      />
      <div ref={ref} className="modalities-grid">
        {[
          {
            icon: '▶',
            title: 'Cursos Pre-grabados',
            badge: 'Acceso Inmediato',
            desc: 'Contenido de alta calidad disponible 24/7. Accede desde cualquier dispositivo, a tu propio ritmo, con soporte y material descargable incluido.',
            perks: [
              'Acceso de por vida al contenido',
              'Material descargable en PDF',
              'Comunidad privada de alumnas',
              'Certificado digital al finalizar',
              'Actualizaciones sin costo adicional',
            ],
            cta: 'Ver Cursos Disponibles',
          },
          {
            icon: '◉',
            title: 'Mentorías en Vivo',
            badge: 'Vía Streaming',
            desc: 'Sesiones personalizadas en tiempo real con feedback directo. Ideal para resolver dudas técnicas, practicar casos clínicos y acelerar tu aprendizaje.',
            perks: [
              'Sesiones grupales e individuales',
              'Transmisión en vivo vía streaming',
              'Práctica con modelos reales',
              'Corrección de técnica en directo',
              'Grabación de cada sesión',
            ],
            cta: 'Reservar Mentoría',
            featured: true,
          },
        ].map(({ icon, title, badge, desc, perks, cta, featured }, i) => (
          <motion.div
            key={title}
            className={`modality-card${featured ? ' modality-card--featured' : ''}`}
            initial={{ opacity: 0, y: 44 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15 }}
          >
            <div className="modality-card__top">
              <span className="modality-card__icon">{icon}</span>
              <span className="modality-card__badge">{badge}</span>
            </div>
            <h3 className="modality-card__title">{title}</h3>
            <p className="modality-card__desc">{desc}</p>
            <ul className="modality-card__perks">
              {perks.map(p => (
                <li key={p}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
               className={featured ? 'btn-primary btn-full' : 'btn-outline btn-full'}>
              {cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Lead Magnet Banner ───────────────────────────────────────────────────────
function LeadMagnet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.section
      ref={ref}
      className="lead-magnet"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="lead-magnet__inner">
        <div className="lead-magnet__badge">GRATIS</div>
        <div className="lead-magnet__text">
          <p className="lead-magnet__eyebrow">Masterclass de Regalo al Inscribirte</p>
          <h2 className="lead-magnet__title">De Artista a Empresaria</h2>
          <p className="lead-magnet__desc">
            Marketing y Marca Personal para Esteticistas: cómo crear contenido para Instagram
            y TikTok que convierta seguidores en pacientes. Acceso inmediato al inscribirte
            en cualquier curso.
          </p>
        </div>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
           className="btn-primary lead-magnet__cta">
          Quiero mi Masterclass Gratis
        </a>
      </div>
    </motion.section>
  );
}

// ─── Servicios Clínicos ───────────────────────────────────────────────────────
const CLINICAL = [
  { title: 'Micropigmentación de Cejas', cat: 'Paramédica' },
  { title: 'Diseño y Perfilado de Labios', cat: 'Facial' },
  { title: 'Remoción de Verrugas', cat: 'Clínico' },
  { title: 'Reconstrucción de Areola / Pezón', cat: 'Oncológica' },
  { title: 'Limpieza Facial Profunda', cat: 'Facial' },
  { title: 'Hidratación y Revitalización', cat: 'Facial' },
];

const PALETTE_BEFORE = [
  'linear-gradient(135deg,#E2CABB 0%,#BFA08A 100%)',
  'linear-gradient(135deg,#EFE3D8 0%,#D4B5A0 100%)',
  'linear-gradient(135deg,#F2EDE7 0%,#DEB9A8 100%)',
  'linear-gradient(135deg,#D4B5A0 0%,#C9A48A 100%)',
  'linear-gradient(135deg,#EFE3D8 0%,#D4B5A0 100%)',
  'linear-gradient(135deg,#E2CABB 0%,#BFA08A 100%)',
];
const PALETTE_AFTER = [
  'linear-gradient(135deg,#C9A96E 0%,#B8965A 100%)',
  'linear-gradient(135deg,#D4AF74 0%,#C9A96E 100%)',
  'linear-gradient(135deg,#E8D5A3 0%,#D4AF74 100%)',
  'linear-gradient(135deg,#C9A96E 0%,#A68B5B 100%)',
  'linear-gradient(135deg,#D4AF74 0%,#C9A96E 100%)',
  'linear-gradient(135deg,#C9A96E 0%,#B8965A 100%)',
];

function Servicios() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="servicios" className="section section--ivory">
      <SectionHeader
        eyebrow="Servicios Clínicos"
        title="Tratamientos en Cabina"
        subtitle="Procedimientos profesionales realizados con los más altos estándares de bioseguridad y técnica."
      />
      <div ref={ref} className="clinical-grid">
        {CLINICAL.map(({ title, cat }, i) => (
          <motion.article
            key={title}
            className="clinical-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.09 }}
          >
            <span className="clinical-card__cat">{cat}</span>
            <div className="before-after">
              <div className="before-after__col">
                <div className="before-after__img" style={{ background: PALETTE_BEFORE[i] }} />
                <span>Antes</span>
              </div>
              <div className="before-after__divider">→</div>
              <div className="before-after__col">
                <div className="before-after__img" style={{ background: PALETTE_AFTER[i] }} />
                <span>Después</span>
              </div>
            </div>
            <h3 className="clinical-card__title">{title}</h3>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
               className="clinical-card__link">Agendar Valoración →</a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ─── La Guaira ────────────────────────────────────────────────────────────────
function LaGuaira() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const pillars = [
    {
      icon: '◈',
      title: 'Permisología Local',
      desc: 'Guía paso a paso para registrar tu estudio ante el SENIAT, INCES y organismos de salud del estado La Guaira. Documentos y requisitos actualizados.',
    },
    {
      icon: '◇',
      title: 'Networking Regional',
      desc: 'Conecta con proveedores locales de insumos, pigmentos y equipos. Alianzas estratégicas con distribuidores en Vargas y Caracas.',
    },
    {
      icon: '◈',
      title: 'Logística Resiliente',
      desc: 'Planifica tu negocio ante la realidad venezolana: gestión de planta eléctrica, reservorios de agua, pagos digitales y atención con y sin conectividad.',
    },
    {
      icon: '◇',
      title: 'Plan de Negocios Regional',
      desc: 'Estrategia financiera adaptada al mercado de La Guaira: fijación de precios, análisis de competencia local y proyección de ingresos en divisas.',
    },
  ];
  return (
    <section id="la-guaira" className="section section--guaira">
      <div className="la-guaira" ref={ref}>
        <motion.div
          className="la-guaira__text"
          initial={{ opacity: 0, x: -44 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <p className="section-eyebrow" style={{ color: 'var(--gold-300)' }}>Emprendimiento Local</p>
          <h2 className="section-title section-title--left" style={{ color: 'var(--pearl)' }}>
            Emprende en<br /><em style={{ color: 'var(--gold-300)' }}>La Guaira</em>
          </h2>
          <p className="la-guaira__body">
            Sabemos cómo funciona Venezuela. Por eso este módulo está diseñado específicamente
            para quien quiere abrir su propio estudio en el estado La Guaira con información
            real, práctica y actualizada.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
             className="btn-primary" style={{ background: 'var(--gold-400)', color: 'var(--text-900)' }}>
            Quiero Emprender
          </a>
        </motion.div>
        <motion.div
          className="la-guaira__pillars"
          initial={{ opacity: 0, x: 44 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          {pillars.map(({ icon, title, desc }) => (
            <div key={title} className="guaira-pillar">
              <span className="guaira-pillar__icon">{icon}</span>
              <div>
                <h4 className="guaira-pillar__title">{title}</h4>
                <p className="guaira-pillar__desc">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Certificaciones ──────────────────────────────────────────────────────────
const CERTS = [
  { icon: '🏅', title: 'Aval Internacional', sub: 'Reconocimiento en 12 países' },
  { icon: '📋', title: 'ISO 9001', sub: 'Calidad en procesos clínicos' },
  { icon: '🎓', title: 'INCES Avalado', sub: 'Formación técnica reconocida' },
  { icon: '🔬', title: 'Bioseguridad Nivel III', sub: 'Protocolos internacionales' },
];

function Certificaciones() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section className="section section--pearl">
      <SectionHeader
        eyebrow="Confianza & Respaldo"
        title="Certificaciones y Avales"
        subtitle="Nuestra formación está respaldada por organismos internacionales que garantizan la calidad y el reconocimiento de tu certificado."
      />
      <div ref={ref} className="certs-grid">
        {CERTS.map(({ icon, title, sub }, i) => (
          <motion.div
            key={title}
            className="cert-card"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            <span className="cert-card__icon">{icon}</span>
            <h4 className="cert-card__title">{title}</h4>
            <p className="cert-card__sub">{sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="contacto" className="section section--ivory">
      <div className="contact" ref={ref}>
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow">Estamos aquí</p>
          <h2 className="section-title section-title--left">
            Tu transformación<br /><em>comienza aquí.</em>
          </h2>
          <p className="contact__body">
            Escríbenos por WhatsApp y recibe una valoración gratuita. Un experto de
            nuestro equipo te asesorará de forma completamente personalizada.
          </p>
          <div className="contact__details">
            {[
              { icon: '✆', label: '+57 300 000 0000' },
              { icon: '✉', label: 'hola@lumiereesthetics.com' },
              { icon: '◎', label: 'La Guaira · Caracas · Online' },
              { icon: '◷', label: 'Lun – Sáb, 8:00 – 18:00' },
            ].map(({ icon, label }) => (
              <div key={label} className="contact__detail">
                <span className="contact__detail-icon">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: '28px', width: 'fit-content', display: 'inline-flex' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Agendar Valoración Gratuita vía WhatsApp
          </a>
        </motion.div>

        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.14 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', interest: '', message: '' });
  const [sent, setSent] = useState(false);
  const change = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <AnimatePresence mode="wait">
      {!sent ? (
        <motion.form key="form" className="contact__form" onSubmit={submit} exit={{ opacity: 0 }}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="c-name">Nombre</label>
              <input id="c-name" name="name" type="text" required value={form.name} onChange={change} placeholder="Tu nombre" />
            </div>
            <div className="form-group">
              <label htmlFor="c-email">Correo</label>
              <input id="c-email" name="email" type="email" required value={form.email} onChange={change} placeholder="tu@correo.com" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="c-interest">¿Qué te interesa?</label>
            <select id="c-interest" name="interest" value={form.interest} onChange={change}>
              <option value="">Selecciona una opción</option>
              <option>Curso de Micropigmentación de Cejas</option>
              <option>Curso de Remoción de Verrugas</option>
              <option>Curso de Reconstrucción de Areola/Pezón</option>
              <option>Mentoría Personalizada en Vivo</option>
              <option>Servicio Clínico en Cabina</option>
              <option>Módulo Emprendimiento La Guaira</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="c-message">Mensaje</label>
            <textarea id="c-message" name="message" rows={4} value={form.message} onChange={change} placeholder="¿En qué podemos ayudarte?" />
          </div>
          <button type="submit" className="btn-primary btn-full">Enviar Mensaje</button>
        </motion.form>
      ) : (
        <motion.div key="thanks" className="contact__thanks"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="contact__thanks-icon">✓</div>
          <h3>¡Mensaje enviado!</h3>
          <p>Te respondemos dentro de las próximas 24 horas. También puedes escribirnos directamente por WhatsApp para atención inmediata.</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Ir a WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo-main">LUMIÈRE</span>
          <span className="footer__logo-sub">AESTHETICS</span>
          <p className="footer__tagline">Transformando vidas a través del arte y la estética profesional.</p>
        </div>
        <div className="footer__links">
          <div className="footer__col">
            <h4>Cursos</h4>
            <ul>
              {['Micropigmentación de Cejas','Remoción de Verrugas','Reconstrucción de Areola','Mentorías en Vivo','Masterclass Gratis'].map(s => (
                <li key={s}><a href="#academia">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Servicios</h4>
            <ul>
              {['Diseño de Cejas','Micropigmentación Paramédica','Remoción de Verrugas','Limpieza Facial','Hidratación'].map(s => (
                <li key={s}><a href="#servicios">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contacto</h4>
            <ul>
              <li>hola@lumiereesthetics.com</li>
              <li>+57 300 000 0000</li>
              <li>La Guaira · Caracas · Online</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Lumière Aesthetics. Todos los derechos reservados.</p>
        <div className="footer__legal">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const ids = ['inicio','academia','modalidades','servicios','la-guaira','contacto'];
    const fn = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 120 && bottom >= 120) { setActive(id); break; }
        }
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="app">
      <WhatsAppFAB />
      <Navbar active={active} />
      <main>
        <Hero />
        <Academia />
        <Modalidades />
        <LeadMagnet />
        <Servicios />
        <LaGuaira />
        <Certificaciones />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
