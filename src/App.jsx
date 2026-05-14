// Lumière Aesthetics — Plataforma UI
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './App.css';

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const links = [
    { id: 'servicios', label: 'Servicios' },
    { id: 'formacion', label: 'Formación' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <motion.nav
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => scrollTo('inicio')}>
          <span className="navbar__logo-main">LUMIÈRE</span>
          <span className="navbar__logo-sub">AESTHETICS</span>
        </button>

        <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          {links.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`navbar__link${activeSection === id ? ' navbar__link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <button className="btn-primary navbar__cta" onClick={() => scrollTo('contacto')}>
              Reservar Cita
            </button>
          </li>
        </ul>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />
      )}
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="inicio" className="hero">
      <div className="hero__bg">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-blobs">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
        </div>
      </div>

      <div className="hero__content">
        {/* Left column — copy */}
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        >
          <p className="hero__eyebrow">Clínica &amp; Academia</p>
          <h1 className="hero__headline">
            Arte y Ciencia<br />
            <em>al servicio</em><br />
            de tu belleza.
          </h1>
          <p className="hero__body">
            Formación estética de alta gama y tratamientos clínicos con estándares
            internacionales. Confianza, excelencia y resultados que perduran.
          </p>
          <div className="hero__actions">
            <button className="btn-primary" onClick={() => scrollTo('servicios')}>
              Explorar Servicios
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('formacion')}>
              Ver Programas
            </button>
          </div>
        </motion.div>

        {/* Right column — visual card */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
        >
          <div className="hero__card">
            <div className="hero__card-badge">
              <span className="hero__card-badge-num">12+</span>
              <span className="hero__card-badge-text">años de experiencia</span>
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
            {[{ n: '3.000+', l: 'Pacientes' }, { n: '98%', l: 'Satisfacción' }].map(({ n, l }) => (
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
        onClick={() => scrollTo('servicios')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.6, duration: 0.6 },
          y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 1.6 },
        }}
      >
        <div className="hero__scroll-line" />
        <span>Desplázate</span>
      </motion.button>
    </section>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className="section-header"
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

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: '◈',
    title: 'Toxina Botulínica',
    desc: 'Suavizado de líneas de expresión con resultados naturales y duraderos. Protocolo premium con productos certificados por la FDA.',
    tag: 'Clínico',
  },
  {
    icon: '◇',
    title: 'Rellenos Dérmicos',
    desc: 'Restauración del volumen facial con ácido hialurónico de última generación, adaptado a la anatomía única de cada paciente.',
    tag: 'Clínico',
  },
  {
    icon: '◈',
    title: 'Bioestimuladores',
    desc: 'Estimulación de colágeno para una piel más firme y luminosa desde el interior, con resultados progresivos y duraderos.',
    tag: 'Clínico',
  },
  {
    icon: '◇',
    title: 'Peelings Médicos',
    desc: 'Renovación celular profunda con ácidos controlados. Protocolos personalizados para cada biotipo y necesidad cutánea.',
    tag: 'Clínico',
  },
  {
    icon: '◈',
    title: 'Hilos Tensores PDO',
    desc: 'Lifting sin cirugía para redefinir el contorno facial. Técnica mínimamente invasiva, sin tiempo de recuperación significativo.',
    tag: 'Avanzado',
  },
  {
    icon: '◇',
    title: 'Láser & Radiofrecuencia',
    desc: 'Tecnología de última generación para rejuvenecimiento, corrección de manchas y remodelación corporal no invasiva.',
    tag: 'Tecnología',
  },
];

function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="servicios" className="section section--pearl">
      <SectionHeader
        eyebrow="Medicina Estética"
        title="Servicios Clínicos"
        subtitle="Cada tratamiento es diseñado a medida, con los más altos estándares médicos y resultados que hablan por sí solos."
      />
      <div ref={ref} className="services-grid">
        {SERVICES.map(({ icon, title, desc, tag }, i) => (
          <motion.article
            key={title}
            className="service-card"
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.09, ease: 'easeOut' }}
          >
            <div className="service-card__top">
              <span className="service-card__icon">{icon}</span>
              <span className="service-card__tag">{tag}</span>
            </div>
            <h3 className="service-card__title">{title}</h3>
            <p className="service-card__desc">{desc}</p>
            <button className="service-card__link">Más información →</button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ─── Stats Strip ──────────────────────────────────────────────────────────────
const STATS = [
  { num: '12+', label: 'Años de Experiencia' },
  { num: '3.000+', label: 'Pacientes Atendidos' },
  { num: '98%', label: 'Índice de Satisfacción' },
  { num: '500+', label: 'Profesionales Formados' },
];

function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div className="stats-strip" ref={ref}>
      {STATS.map(({ num, label }, i) => (
        <motion.div
          key={label}
          className="stats-strip__item"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: i * 0.1 }}
        >
          <span className="stats-strip__num">{num}</span>
          <span className="stats-strip__label">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Training ─────────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    level: 'Esencial',
    title: 'Fundamentos en Estética Clínica',
    hours: '80 h',
    modules: 6,
    desc: 'Base sólida en anatomía, fisiología de la piel y técnicas esenciales. Ideal para profesionales que inician su carrera en medicina estética.',
    highlights: ['Anatomía facial aplicada', 'Introducción a la toxina botulínica', 'Gestión y comunicación con pacientes', 'Protocolo de seguridad clínica'],
  },
  {
    level: 'Avanzado',
    title: 'Especialización en Medicina Regenerativa',
    hours: '160 h',
    modules: 12,
    desc: 'Profundización en bioestimuladores, mesoterapia y técnicas regenerativas, con práctica supervisada en pacientes reales.',
    highlights: ['Bioestimuladores avanzados', 'Hilos tensores PDO', 'Mesoterapia facial y corporal', 'Casos clínicos en vivo'],
    featured: true,
  },
  {
    level: 'Máster',
    title: 'Máster en Estética Integral de Alta Gama',
    hours: '300 h',
    modules: 20,
    desc: 'Programa completo que abarca todos los tratamientos estéticos modernos, con certificación de aval internacional y mentoría personalizada.',
    highlights: ['Láser y tecnología avanzada', 'Cirugía menor estética', 'Gestión y apertura de clínica', 'Mentoría 1:1 con especialistas'],
  },
];

function Training() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="formacion" className="section section--ivory">
      <SectionHeader
        eyebrow="Academia Lumière"
        title="Programas de Formación"
        subtitle="Desarrolla tu excelencia profesional con programas diseñados por expertos líderes de la industria estética."
      />
      <div ref={ref} className="programs-grid">
        {PROGRAMS.map(({ level, title, hours, modules, desc, highlights, featured }, i) => (
          <motion.article
            key={title}
            className={`program-card${featured ? ' program-card--featured' : ''}`}
            initial={{ opacity: 0, y: 56 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.14, ease: 'easeOut' }}
          >
            {featured && <div className="program-card__ribbon">Más popular</div>}
            <div className="program-card__level">{level}</div>
            <h3 className="program-card__title">{title}</h3>
            <div className="program-card__meta">
              <span>⏱ {hours}</span>
              <span>📋 {modules} módulos</span>
            </div>
            <p className="program-card__desc">{desc}</p>
            <ul className="program-card__highlights">
              {highlights.map((h) => (
                <li key={h}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
            <button className={featured ? 'btn-primary btn-full' : 'btn-outline btn-full'}>
              Solicitar Información
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="nosotros" className="section section--pearl">
      <div className="about" ref={ref}>
        <motion.div
          className="about__visual"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="about__img-frame">
            <div className="about__img-placeholder" />
            <div className="about__img-accent" />
          </div>
          <div className="about__cert-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            <div>
              <span className="about__cert-title">Certificación ISO 9001</span>
              <span className="about__cert-sub">Calidad en Procesos Clínicos</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="about__text"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
        >
          <p className="section-eyebrow">Nuestra Historia</p>
          <h2 className="section-title section-title--left">
            Donde la medicina<br /><em>se convierte en arte.</em>
          </h2>
          <p className="about__body">
            Lumière Aesthetics nació de la convicción de que la belleza auténtica emerge de la
            intersección entre ciencia rigurosa y sensibilidad artística. Somos una clínica y
            academia de referencia, comprometidos con la excelencia en cada procedimiento y
            en cada programa de formación.
          </p>
          <p className="about__body">
            Nuestro equipo está compuesto por médicos especialistas con formación internacional,
            quienes combinan técnica impecable con un profundo respeto por la naturalidad y la
            individualidad de cada paciente.
          </p>
          <div className="about__values">
            {['Ética médica', 'Resultados naturales', 'Formación continua', 'Atención personalizada'].map((v) => (
              <div key={v} className="about__value">
                <span className="about__value-dot" />
                {v}
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => scrollTo('contacto')}>
            Conoce al Equipo
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: 'La formación en Lumière transformó completamente mi práctica clínica. Los módulos prácticos y la mentoría personalizada me dieron la confianza para ofrecer resultados excepcionales.',
    name: 'Dra. Valentina Ríos',
    role: 'Médica Estética — Bogotá',
  },
  {
    quote: 'Como paciente, lo que más valoro es la naturalidad de los resultados. El equipo se toma el tiempo de entender lo que realmente quieres y trabaja con una precisión extraordinaria.',
    name: 'Sofía Mendez',
    role: 'Paciente — Medellín',
  },
  {
    quote: 'El Máster me dio la certificación y el respaldo que necesitaba para abrir mi propia clínica. La calidad del programa y el acompañamiento del equipo son incomparables.',
    name: 'Dr. Andrés Castillo',
    role: 'Director Clínico — Cali',
  },
];

function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section className="section section--gold-soft">
      <SectionHeader eyebrow="Testimonios" title="Lo que dicen de nosotros" />
      <div ref={ref} className="testimonials-grid">
        {TESTIMONIALS.map(({ quote, name, role }, i) => (
          <motion.article
            key={name}
            className="testimonial-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.13 }}
          >
            <div className="testimonial-card__quote-mark">&ldquo;</div>
            <p className="testimonial-card__quote">{quote}</p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">{name.charAt(0)}</div>
              <div>
                <span className="testimonial-card__name">{name}</span>
                <span className="testimonial-card__role">{role}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const palettes = [
    'linear-gradient(135deg,#F2EDE7 0%,#DEB9A8 100%)',
    'linear-gradient(145deg,#D4B5A0 0%,#BFA08A 100%)',
    'linear-gradient(135deg,#C9A96E 0%,#A68B5B 100%)',
    'linear-gradient(145deg,#EFE3D8 0%,#D4B5A0 100%)',
    'linear-gradient(135deg,#E8D5A3 0%,#C9A48A 100%)',
  ];
  return (
    <section className="section section--ivory">
      <SectionHeader eyebrow="Instalaciones" title="Nuestro Espacio" />
      <div ref={ref} className="gallery-strip">
        {palettes.map((bg, i) => (
          <motion.div
            key={i}
            className="gallery-item"
            style={{ background: bg }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section id="contacto" className="section section--pearl">
      <div className="contact" ref={ref}>
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow">Contáctanos</p>
          <h2 className="section-title section-title--left">
            Tu transformación<br /><em>comienza aquí.</em>
          </h2>
          <p className="contact__body">
            Agenda tu consulta de valoración sin compromiso. Un experto de nuestro equipo
            te asesorará de forma completamente personalizada.
          </p>
          <div className="contact__details">
            {[
              { icon: '✉', label: 'hola@lumiereesthetics.com' },
              { icon: '✆', label: '+57 300 000 0000' },
              { icon: '◎', label: 'Bogotá · Medellín · Cali' },
              { icon: '◷', label: 'Lun – Sáb, 8:00 – 18:00' },
            ].map(({ icon, label }) => (
              <div key={label} className="contact__detail">
                <span className="contact__detail-icon">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.14 }}
        >
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                className="contact__form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0 }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre completo</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Tu nombre" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="tu@correo.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+57 300 000 0000" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Servicio de interés</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange}>
                      <option value="">Selecciona una opción</option>
                      <option>Toxina Botulínica</option>
                      <option>Rellenos Dérmicos</option>
                      <option>Bioestimuladores</option>
                      <option>Peelings Médicos</option>
                      <option>Hilos Tensores PDO</option>
                      <option>Láser &amp; Radiofrecuencia</option>
                      <option>Formación Profesional</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="¿En qué podemos ayudarte?" />
                </div>
                <button type="submit" className="btn-primary btn-full">Enviar Mensaje</button>
              </motion.form>
            ) : (
              <motion.div
                key="thanks"
                className="contact__thanks"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="contact__thanks-icon">✓</div>
                <h3>¡Mensaje enviado!</h3>
                <p>Nuestro equipo se pondrá en contacto contigo dentro de las próximas 24 horas.</p>
                <button className="btn-outline" onClick={() => setSent(false)}>Enviar otro mensaje</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
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
          <p className="footer__tagline">Arte y ciencia al servicio de tu belleza.</p>
        </div>
        <div className="footer__links">
          <div className="footer__col">
            <h4>Servicios</h4>
            <ul>
              {['Toxina Botulínica', 'Rellenos Dérmicos', 'Bioestimuladores', 'Peelings', 'Hilos Tensores'].map((s) => (
                <li key={s}><a href="#servicios">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Formación</h4>
            <ul>
              {['Programa Esencial', 'Especialización', 'Máster Integral', 'Talleres', 'Webinars'].map((s) => (
                <li key={s}><a href="#formacion">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contacto</h4>
            <ul>
              <li>hola@lumiereesthetics.com</li>
              <li>+57 300 000 0000</li>
              <li>Bogotá · Medellín · Cali</li>
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
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const onScroll = () => {
      const ids = ['inicio', 'servicios', 'formacion', 'nosotros', 'contacto'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 120 && bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="app">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <StatsStrip />
        <Services />
        <Training />
        <About />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
