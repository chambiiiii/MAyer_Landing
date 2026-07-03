import React, { useEffect, useRef, useState } from "react";
import "./mayer.css";

const BASE = import.meta.env.BASE_URL;

const CAR_SLIDES: { src: string; label: string; type?: "image" | "video" }[] = [
  { src: `${BASE}images/car-hilux.png`,   label: "Toyota Hilux" },
  { src: `${BASE}images/car-fit.png`,     label: "Honda Fit" },
  { src: `${BASE}images/car-mgzs.png`,    label: "MG ZS" },
  { src: `${BASE}images/car-sportage.png`,label: "Kia Sportage" },
  {
    src: "https://res.cloudinary.com/dw191in7j/video/upload/v1782757979/VIDOEO_1_qhzhbi.mov",
    label: "Video Lubricentro Mayer",
    type: "video",
  },
];

const BRAND_LIST = [
  { name: "Toyota",     logo: `${BASE}images/brands/toyota.png` },
  { name: "Honda",      logo: `${BASE}images/brands/honda.png` },
  { name: "Kia",        logo: `${BASE}images/brands/kia.png` },
  { name: "Nissan",     logo: `${BASE}images/brands/nissan.png` },
  { name: "Hyundai",    logo: `${BASE}images/brands/hyundai.png` },
  { name: "Chevrolet",  logo: `${BASE}images/brands/chevrolet.svg` },
  { name: "Mazda",      logo: `${BASE}images/brands/mazda.svg` },
  { name: "Ford",       logo: `${BASE}images/brands/ford.png` },
  { name: "Mitsubishi", logo: `${BASE}images/brands/mitsubishi.svg` },
  { name: "Suzuki",     logo: `${BASE}images/brands/suzuki.svg` },
  { name: "Subaru",     logo: `${BASE}images/brands/subaru.png` },
  { name: "Volkswagen", logo: `${BASE}images/brands/volkswagen.png` },
  { name: "Renault",    logo: `${BASE}images/brands/renault.png` },
  { name: "Peugeot",    logo: `${BASE}images/brands/peugeot.png` },
  { name: "MG",         logo: `${BASE}images/brands/mg.png` },
  { name: "Chery",      logo: `${BASE}images/brands/chery.svg` },
  { name: "BYD",        logo: `${BASE}images/brands/byd.svg` },
  { name: "JAC",        logo: `${BASE}images/brands/jac.png` },
];

export function LandingPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeBg, setActiveBg] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          entry.target.classList.remove("opacity-0");
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const duration = CAR_SLIDES[activeBg]?.type === "video" ? 9000 : 5000;
    const timer = setTimeout(() => {
      setActiveBg((prev) => (prev + 1) % CAR_SLIDES.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [activeBg]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTopBtn(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1128] text-white font-inter selection:bg-[#ff007f] selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 glass-panel border-b-0 border-t-0 border-l-0 border-r-0 border-b border-[#0056b3]/30 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-24"
          }`}
        >
          <img
            src={`${BASE}images/mayer-logo.png`}
            alt="Lubricentro y Servicios Mayer"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-12" : "h-20"}`}
          />
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            <a href="#servicios" className="nav-link hover:text-[#ff007f] transition-colors">SERVICIOS</a>
            <a href="#nosotros" className="nav-link hover:text-[#ff007f] transition-colors">NOSOTROS</a>
            <a href="#contacto" className="nav-link hover:text-[#ff007f] transition-colors">CONTACTO</a>
          </div>
          <a href="https://wa.me/56952137332" target="_blank" rel="noreferrer" className="btn-shine hidden md:inline-block bg-[#0056b3] hover:bg-[#ff007f] text-white px-6 py-2 rounded-sm font-bold transition-all duration-300 transform hover:-translate-y-1">AGENDA TU HORA</a>
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 shrink-0"
          >
            <span className={`block h-0.5 w-7 bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-7 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-7 bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0a1128]/95 backdrop-blur-md border-t border-[#0056b3]/30 ${
            mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium tracking-wide">
            <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ff007f] transition-colors">SERVICIOS</a>
            <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ff007f] transition-colors">NOSOTROS</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ff007f] transition-colors">CONTACTO</a>
            <a
              href="https://wa.me/56952137332"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-shine inline-block text-center bg-[#0056b3] hover:bg-[#ff007f] text-white px-6 py-2 rounded-sm font-bold transition-all duration-300"
            >
              AGENDA TU HORA
            </a>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col pt-20 overflow-hidden bg-[#0a1128]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128] via-[#0a1128]/75 to-[#0a1128]/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-[#0a1128]/60 z-10" />
          {/* Crossfade slideshow */}
          {CAR_SLIDES.map((slide, i) =>
            slide.type === "video" ? (
              <video
                key={slide.src}
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover object-[center_-25%] scale-105 transition-opacity duration-[2000ms] ease-in-out"
                style={{ opacity: i === activeBg ? 0.45 : 0 }}
              />
            ) : (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.label}
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-opacity duration-[2000ms] ease-in-out"
                style={{ opacity: i === activeBg ? 0.45 : 0 }}
              />
            )
          )}
          {/* Subtle Ken Burns scale on active slide via inline keyframe */}
          <style>{`
            @keyframes kbzoom { from { transform: scale(1.05); } to { transform: scale(1.12); } }
          `}</style>
          {CAR_SLIDES.map((slide, i) => i === activeBg && (
            <div key={`kb-${i}`} className="absolute inset-0" style={{ animation: 'kbzoom 5s ease-in-out forwards' }} />
          ))}
          {/* Slide indicator dots */}
          <div className="absolute bottom-6 right-8 z-20 flex gap-2">
            {CAR_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBg(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeBg ? '24px' : '8px',
                  height: '8px',
                  background: i === activeBg ? '#ff007f' : 'rgba(255,255,255,0.3)'
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 flex-1 flex items-center w-full">
          <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12">
            <div className="scroll-animate opacity-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff007f]/50 bg-[#ff007f]/10 text-[#ff007f] text-xs font-bold tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-pulse" />
                TALLER ESPECIALIZADO
              </div>
              <h1 className="font-syncopate text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="animate-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-[#0056b3] via-[#ff007f] to-[#0056b3]">RENDIMIENTO</span> Y CUIDADO DE TU MOTOR
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-lg leading-relaxed font-light">
                En Lubricentro y Servicios Mayer nos encargamos de que tu vehículo rinda al 100%. Tecnología, precisión y confianza en cada mantenimiento.
              </p>
            </div>
          </div>
        </div>
        {/* Brands Marquee — integrated at bottom of hero */}
        <div className="relative z-20 w-full border-t border-white/10 pt-4 pb-6">
          <div className="text-center mb-4">
            <p className="text-xs font-bold tracking-widest text-[#0056b3]">MARCAS QUE ATENDEMOS</p>
          </div>
          <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-0 items-center animate-marquee-track shrink-0">
              {BRAND_LIST.concat(BRAND_LIST).map((brand, i) => (
                <div key={i} className="flex items-center shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 px-8">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-9 w-auto max-w-[72px] object-contain filter brightness-0 invert"
                    onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = 'none'; if (el.parentElement) el.parentElement.style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="servicios" className="scroll-mt-20 py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0056b3]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff007f]/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0056b3]/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 scroll-animate opacity-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0056b3]/50 bg-[#0056b3]/10 text-[#0056b3] text-xs font-bold tracking-widest mb-6">
              LO QUE HACEMOS
            </div>
            <h2 className="font-syncopate text-3xl md:text-4xl font-bold text-[#0a1128] mb-4">NUESTROS SERVICIOS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0056b3] to-[#ff007f] mx-auto mb-6" />
            <p className="max-w-2xl mx-auto text-gray-600">Soluciones integrales para mantener tu vehículo en condiciones óptimas, con tecnología de punta y repuestos certificados.</p>
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {([
              {
                tag: "DIAGNÓSTICO",
                name: "Diagnóstico Vehicular\nvia Scanner",
                accent: "#ff007f",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h2l2 4 2-6 2 4h2"/>
                  </svg>
                )
              },
              {
                tag: "LUBRICANTES",
                name: "Cambio de\nLubricantes de Motor",
                accent: "#0056b3",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3a2 2 0 002 2zm8-16H7v2h4v4H7v2h4v1a3 3 0 006 0V7a2 2 0 00-2-2h-2V3h-2v2zM7 7H5L3 9v2h4V7zm10 10a1 1 0 01-2 0v-8h2v8z"/>
                  </svg>
                )
              },
              {
                tag: "TRANSMISIÓN",
                name: "Cambio de Aceite de\nTransmisión Automática/Mecánica",
                accent: "#0056b3",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M12 2.5v6"/>
                    <circle cx="12" cy="2.5" r="1.4" fill="currentColor" stroke="none"/>
                    <path d="M6.5 8.5h11l-1.2 3.5h-8.6z"/>
                    <path d="M7.5 12v4M12 12v6M16.5 12v4"/>
                    <path d="M4.5 21.5h15"/>
                  </svg>
                )
              },
              {
                tag: "DIFERENCIAL",
                name: "Inspección de\nFluido Diferencial",
                accent: "#ff007f",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <circle cx="9" cy="12" r="6.5"/>
                    <circle cx="9" cy="12" r="2"/>
                    <path d="M9 3.7v1.8M9 16.5v1.8M2.7 12h1.8M13.5 12h1.8M4.4 6.4l1.3 1.3M12.3 16.3l1.3 1.3M4.4 17.6l1.3-1.3M12.3 7.7l1.3-1.3"/>
                    <circle cx="19" cy="12" r="2.3"/>
                    <path d="M15.5 12h1.2"/>
                  </svg>
                )
              },
              {
                tag: "COMBUSTIBLE",
                name: "Cambio de\nFiltro de Combustible",
                accent: "#ff007f",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M12 3c2.75 0 5.46.23 8.08.68.53.09.92.56.92 1.1v1.04a2.25 2.25 0 01-.66 1.59l-5.43 5.43a2.25 2.25 0 00-.66 1.59v2.93a2.25 2.25 0 01-1.24 2.01L9.75 21v-6.57a2.25 2.25 0 00-.66-1.59L3.66 7.41A2.25 2.25 0 013 5.82V4.77c0-.54.38-1.01.92-1.1A48.32 48.32 0 0112 3z"/>
                  </svg>
                )
              },
              {
                tag: "FILTROS",
                name: "Cambio de\nFiltros de Aire",
                accent: "#0056b3",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M6 20V9a3 3 0 013-3h1V4h4v2h1a3 3 0 013 3v11"/>
                    <path d="M4 20h16"/>
                    <path d="M9 20v-4h6v4"/>
                    <path d="M9 13h.01M12 13h.01M15 13h.01M9 10h.01M12 10h.01M15 10h.01"/>
                  </svg>
                )
              },
              {
                tag: "A/C",
                name: "Cambio de\nFiltro de Polen",
                accent: "#ff007f",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M12 12h6.5a2.5 2.5 0 10-2.5-2.5"/>
                    <path d="M12 12v6.5a2.5 2.5 0 102.5-2.5"/>
                    <path d="M12 12H5.5A2.5 2.5 0 108 14.5"/>
                    <path d="M3 8h4M3 12h1M3 16h4M17 20h4M20 5v4M20 15v4"/>
                  </svg>
                )
              },
              {
                tag: "REFRIGERACIÓN",
                name: "Cambio de\nRefrigerante",
                accent: "#0056b3",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07L19.07 4.93"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                )
              },
              {
                tag: "INSPECCIÓN",
                name: "Diagnóstico de\nPartes y Piezas",
                accent: "#0056b3",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" clipRule="evenodd"/>
                  </svg>
                )
              },
            ] as Array<{tag: string; name: string; accent: string; icon: React.ReactNode}>).map((svc, i) => (
              <div
                key={i}
                className={`scroll-animate opacity-0 delay-${(i % 3) * 100} group relative rounded-2xl p-6 cursor-default overflow-hidden card-lift`}
                style={{ background: 'rgba(255,255,255,1)', border: '1px solid rgba(10,17,40,0.1)', boxShadow: '0 2px 16px rgba(10,17,40,0.07)' }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: svc.accent }}
                />
                {/* Icon */}
                <div
                  className="icon-pop w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ background: `${svc.accent}1a`, color: svc.accent }}
                >
                  {svc.icon}
                </div>
                {/* Tag */}
                <div className="text-xs font-bold tracking-widest mb-2 transition-colors duration-300" style={{ color: svc.accent }}>
                  {svc.tag}
                </div>
                {/* Name */}
                <div className="font-syncopate text-sm font-bold text-[#0a1128] leading-snug whitespace-pre-line">
                  {svc.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="nosotros" className="scroll-mt-20 py-28 bg-[#0a1128] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0056b3]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff007f]/30 to-transparent" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#0056b3]/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#ff007f]/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="text-center mb-20 scroll-animate opacity-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0056b3]/50 bg-[#0056b3]/10 text-[#0056b3] text-xs font-bold tracking-widest mb-6">
              EL EQUIPO
            </div>
            <h2 className="font-syncopate text-3xl md:text-5xl font-bold mb-4">CONÓCENOS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0056b3] to-[#ff007f] mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">Profesionales con décadas de experiencia combinada al cuidado de tu vehículo.</p>
          </div>

          {/* Mechanics cards */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Card: Alvaro */}
            <div className="scroll-animate opacity-0 group relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#0056b3]/60 via-transparent to-[#ff007f]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative border border-[#0056b3]/25 rounded-2xl overflow-hidden backdrop-blur-sm" style={{background: 'rgba(7,16,40,0.7)'}}>
                {/* Portrait header */}
                <div className="relative pt-10 pb-6 px-8 flex flex-col items-center text-center" style={{background: 'linear-gradient(135deg, rgba(0,86,179,0.15) 0%, rgba(7,16,40,0) 60%)'}}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0056b3] to-transparent" />
                  {/* Circular portrait */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0056b3] to-[#ff007f] blur-md opacity-50 scale-110" />
                    <div className="relative w-44 h-44 rounded-full border-2 border-[#0056b3]/60 overflow-hidden ring-4 ring-[#0a1128]">
                      <img
                        src={`${BASE}images/alvaro.png`}
                        alt="Alvaro Maldonado Torres"
                        className="w-full h-full object-cover object-[center_15%] group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div className="text-xs font-bold tracking-widest text-[#ff007f] mb-1">INGENIERO MECÁNICO AUTOMOTRIZ</div>
                  <h3 className="font-syncopate text-2xl font-bold text-white">ÁLVARO MALDONADO</h3>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                    Titulado de la Universidad Tecnológica de Chile INACAP, con sólida trayectoria en los sectores automotriz y minero. Especializado en diagnóstico computarizado y mantenimiento bajo altos estándares de seguridad y eficiencia.
                  </p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="text-xs font-bold tracking-widest text-[#0056b3] mb-3">ESPECIALIDADES</div>
                    <ul className="space-y-2">
                      {[
                        "Diagnóstico mecánico computarizado",
                        "Mantenimiento preventivo y correctivo",
                        "Sistemas de frenos, suspensión y dirección",
                        "Inspección técnica preventiva",
                      ].map((s, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#ff007f] shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  <div className="border-l-2 border-[#ff007f] pl-4">
                    <p className="text-gray-400 text-sm italic leading-relaxed">
                      "Más de una década de experiencia respaldando la seguridad, el rendimiento y la confiabilidad de cada vehículo que llega a nuestro taller."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: Sandro */}
            <div className="scroll-animate opacity-0 delay-200 group relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-bl from-[#ff007f]/60 via-transparent to-[#0056b3]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative border border-[#ff007f]/25 rounded-2xl overflow-hidden backdrop-blur-sm" style={{background: 'rgba(7,16,40,0.7)'}}>
                {/* Portrait header */}
                <div className="relative pt-10 pb-6 px-8 flex flex-col items-center text-center" style={{background: 'linear-gradient(135deg, rgba(255,0,127,0.12) 0%, rgba(7,16,40,0) 60%)'}}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff007f] to-transparent" />
                  {/* Circular portrait */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff007f] to-[#0056b3] blur-md opacity-50 scale-110" />
                    <div className="relative w-44 h-44 rounded-full border-2 border-[#ff007f]/60 overflow-hidden ring-4 ring-[#0a1128]">
                      <img
                        src={`${BASE}images/sandro.png`}
                        alt="Sandro Erazo Quispe"
                        className="w-full h-full object-cover object-[center_15%] group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div className="text-xs font-bold tracking-widest text-[#0056b3] mb-1">INGENIERO MECÁNICO AUTOMOTRIZ</div>
                  <h3 className="font-syncopate text-2xl font-bold text-white">SANDRO ERAZO</h3>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">Titulado de la Universidad Tecnológica de Chile INACAP, con más de 20 años en el rubro automotriz, reconocido por su profundo conocimiento en lubricación, diagnóstico de fallas y mantenimiento preventivo. Ha asesorado a cientos de clientes en la selección óptima de lubricantes y productos de mantenimiento.</p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="text-xs font-bold tracking-widest text-[#ff007f] mb-3">ESPECIALIDADES</div>
                    <ul className="space-y-2">
                      {[
                        "Lubricación especializada para livianos y SUV",
                        "Selección de aceites y lubricantes de alto rendimiento",
                        "Diagnóstico preventivo de sistemas mecánicos",
                        "Detección temprana de fallas",
                      ].map((s, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3] shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  <div className="border-l-2 border-[#0056b3] pl-4">
                    <p className="text-gray-400 text-sm italic leading-relaxed">
                      "Más de dos décadas entregando soluciones confiables para mantener cada vehículo en óptimas condiciones y prolongar su vida útil."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* CTA / Contact Section */}
      <section id="contacto" className="scroll-mt-20 py-24 bg-[#f4f5f7] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff007f]/40 to-transparent" />
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#ff007f]/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="text-center mb-14 scroll-animate opacity-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff007f]/50 bg-[#ff007f]/10 text-[#ff007f] text-xs font-bold tracking-widest mb-6">
              CONTÁCTANOS
            </div>
            <h2 className="font-syncopate text-3xl md:text-5xl font-bold text-[#0a1128] mb-4">¿TU VEHÍCULO NECESITA ATENCIÓN?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ff007f] to-[#0056b3] mx-auto mb-6" />
            <p className="text-gray-600 max-w-xl mx-auto text-lg font-light">No esperes a que sea tarde. Agenda una revisión hoy mismo con nuestros expertos.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: contact info */}
            <div className="scroll-animate opacity-0 flex flex-col gap-6">
              {/* Phone */}
              <a href="tel:+56952137333" className="group flex items-center gap-5 p-6 border border-[#0a1128]/10 rounded-xl hover:border-[#ff007f]/50 transition-all duration-300 bg-white shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[#ff007f]/15 flex items-center justify-center shrink-0 group-hover:bg-[#ff007f]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#ff007f]">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">TELÉFONO</div>
                  <div className="font-syncopate text-xl font-bold text-[#0a1128]">+56 9 5213 7333</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/56952137332" target="_blank" rel="noreferrer" className="group flex items-center gap-5 p-6 border border-[#0a1128]/10 rounded-xl hover:border-[#25D366]/50 transition-all duration-300 bg-white shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[#25D366]/15 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.523 5.855L0 24l6.29-1.497A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.95 0-3.775-.5-5.363-1.376l-.385-.228-3.735.889.931-3.63-.251-.4A9.964 9.964 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">WHATSAPP</div>
                  <div className="font-syncopate text-xl font-bold text-[#0a1128]">ESCRÍBENOS</div>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-center gap-5 p-6 border border-[#0a1128]/10 rounded-xl bg-white shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[#0056b3]/15 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#0056b3]">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">HORARIO</div>
                  <div className="space-y-1 mt-0.5">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">Lun — Vie</span>
                      <span className="font-bold text-[#0a1128]">09:00 — 19:00</span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">Sábado</span>
                      <span className="font-bold text-[#0a1128]">09:00 — 14:00</span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">Domingo</span>
                      <span className="font-bold text-[#ff007f]">Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: map + button */}
            <div className="scroll-animate opacity-0 delay-200 flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden border border-[#0a1128]/10 shadow-lg">
                <iframe
                  src="https://maps.google.com/maps?q=Los+Misioneros+818,+Arica,+Chile&output=embed&hl=es&z=17"
                  width="100%"
                  height="360"
                  style={{border: 0}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Lubricentro y Servicios Mayer"
                />
              </div>
              <a
                href="https://www.google.com/maps?client=safari&rls=en&oe=UTF-8&um=1&ie=UTF-8&fb=1&gl=cl&sa=X&geocode=Kf828SpJqVqRMYTnhPC4zQV6&daddr=Los+Misioneros+818,+1030214+Arica,+Arica+y+Parinacota"
                target="_blank"
                rel="noreferrer"
                className="btn-shine flex items-center justify-center gap-3 w-full bg-[#0056b3] hover:bg-[#ff007f] text-white py-4 font-bold tracking-wider transition-all duration-300 rounded-xl text-lg transform hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                CÓMO LLEGAR
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#050914] py-12 border-t border-[#0056b3]/20 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-center">
          <div>
            <img
              src={`${BASE}images/mayer-logo.png`}
              alt="Lubricentro y Servicios Mayer"
              className="h-14 w-auto mb-3"
            />
            <p className="text-gray-500 text-sm">Especialistas en rendimiento y cuidado de tu motor.</p>
          </div>
          <div className="text-gray-400 text-sm md:text-center">
            <p className="mb-1">Horario de atención</p>
            <p className="font-bold text-gray-300">Lun–Vie 09:00–18:00 · Sáb 09:00–14:00</p>
            <p className="text-[#ff007f] font-bold text-sm mt-0.5">Domingo cerrado</p>
          </div>
          <div className="text-gray-500 text-sm md:text-right">
            <p className="text-gray-300 font-bold mb-1">Los Misioneros 818</p>
            <p className="mb-2">Arica, Arica y Parinacota</p>
            <p>&copy; {new Date().getFullYear()} Lubricentro y Servicios Mayer.</p>
          </div>
        </div>
      </footer>
      {/* Back to top */}
      <button
        type="button"
        aria-label="Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#0056b3] hover:bg-[#ff007f] text-white flex items-center justify-center shadow-lg transition-all duration-300 animate-float ${
          showTopBtn ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V7.06l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
