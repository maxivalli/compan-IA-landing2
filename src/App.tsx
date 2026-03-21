import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Ear,
  Brain,
  Users,
  Calendar,
  AlertCircle,
  Music,
  Clock,
  Headphones,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  Smartphone,
  Play,
  Pause,
  Check,
  X,
  ShieldAlert,
  Activity,
  MessageCircleWarning,
  Bell,
  PhoneCall,
  Mic,
  Image,
  UserCheck,
  Radio,
  Eye
} from 'lucide-react';

// Helper: nombre de marca con estilo
const Brand = ({ className = '', iaClassName = 'text-brand-orange' }: { className?: string; iaClassName?: string }) => (
  <span className={`font-serif font-bold ${className}`}>Compañ<span className={`font-sans ${iaClassName}`}>IA</span></span>
);

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <img src="/adaptive-icon.png" alt="CompañIA" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            <Brand />
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#problema" className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors">El problema</a>
          <a href="#como-funciona" className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors">Cómo funciona</a>
          <a href="#voces" className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors">Voces</a>
          <a href="#funciones" className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors">Funciones</a>
          <a href="#testimonios" className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors">Testimonios</a>
          <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors">FAQ</a>
        </div>
        <a
          href="https://expo.dev/artifacts/eas/egD2MQaSYuWjvgrCN9NncA.apk"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-orange text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-all shadow-md shadow-orange-200"
        >
          Probar gratis
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Imagen de fondo full-screen */}
    <img
      src="https://res.cloudinary.com/dy1ll1azp/image/upload/f_auto,q_auto,w_1600/v1774034375/Gemini_Generated_Image_mn4eosmn4eosmn4e_dnumw6.png"
      alt="Adulta mayor usando tablet"
      className="absolute inset-0 w-full h-full object-cover"
      referrerPolicy="no-referrer"
    />
    {/* Gradiente oscuro diagonal desde la izquierda */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

    {/* Contenido */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
          Tu ser querido <br />
          <span className="text-brand-orange italic">nunca más solo.</span>
        </h1>
        <p className="text-base sm:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
          <Brand className="text-white" /> es una compañera de voz con IA que escucha, recuerda y cuida — y mantiene a toda la familia informada, en tiempo real.
        </p>
        <div className="flex flex-wrap gap-4 mb-12">
          <a
            href="https://expo.dev/artifacts/eas/egD2MQaSYuWjvgrCN9NncA.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-500 transition-all shadow-lg shadow-orange-900/40"
          >
            Probá gratis 7 días →
          </a>
          <a
            href="#como-funciona"
            className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
          >
            Ver cómo funciona
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex -space-x-2">
            {[
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=72&h=72&q=80',
              'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=72&h=72&q=80',
              'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=72&h=72&q=80',
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Usuario"
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <p className="text-white/70 text-sm font-medium">
            Familias de Argentina ya la usan · <span className="text-white font-semibold">MVP en producción</span>
          </p>
        </div>
      </motion.div>

      {/* Floating quote — solo desktop */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden lg:block absolute right-12 bottom-20 bg-white rounded-2xl p-6 shadow-2xl max-w-xs"
      >
        <p className="text-slate-700 italic text-sm leading-relaxed mb-4">
          "Desde que tiene <strong>CompañIA</strong>, mamá está más feliz y nosotros dormimos mejor."
        </p>
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=72&h=72&q=80"
            alt="Tomás V."
            className="w-9 h-9 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-bold text-slate-900 text-sm">Tomás V.</p>
            <p className="text-slate-400 text-xs">Hijo, Buenos Aires</p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Scroll cue */}
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
    >
      <ChevronDown className="w-7 h-7" />
    </motion.div>
  </section>
);

// ── Press Strip ───────────────────────────────────────────────────────────────
const PressStrip = () => (
  <section className="py-10 bg-brand-blue-light/30 border-y border-brand-blue-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Mencionado en</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {['La Nación', 'Clarín', 'Infobae Tech', 'TecnoXplora'].map(name => (
          <span key={name} className="text-xl font-serif font-bold text-slate-400/70 hover:text-slate-600 transition-colors cursor-default">
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Problem = () => (
  <section id="problema" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">El problema</h2>
      </div>
      <div className="bg-brand-blue-light/40 rounded-[40px] overflow-hidden shadow-sm border border-brand-blue-light">
        <div className="grid lg:grid-cols-2 items-center">
          <div className="h-full min-h-[300px]">
            <img
              src="https://res.cloudinary.com/dy1ll1azp/image/upload/f_auto,q_auto,w_900/v1774034548/Gemini_Generated_Image_3q9gur3q9gur3q9g_kk77am.png"
              alt="Familia mirando álbum"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8 lg:p-16 flex flex-col items-center justify-center">
            <div className="space-y-8 w-full max-w-sm">
              {[
                { num: '40%', text: 'de adultos mayores pasan días en silencio.' },
                { num: '50%', text: 'de deterioro cognitivo por aislamiento social.' },
                { num: 'USD 400–1.200/mes', text: 'en cuidado derivado\nde la soledad.' },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-center gap-6">
                  <div className={`w-36 min-h-[4.5rem] font-bold text-brand-blue-dark leading-tight shrink-0 whitespace-pre-line flex items-center ${num.startsWith('USD') ? 'text-lg' : 'text-3xl'}`}>
                    {num}
                  </div>
                  <p className="text-slate-600 font-medium leading-snug whitespace-pre-line">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 p-4 bg-white/60 rounded-2xl border border-white">
              <p className="text-lg font-bold text-slate-900 text-center">
                <Brand /> combate la soledad, mejorando su bienestar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="como-funciona" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Cómo funciona</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Ear className="w-8 h-8 text-brand-blue-dark" />,
            title: "Escucha",
            desc: "El usuario habla. CompañIA escucha y aprende el contexto diario en español rioplatense."
          },
          {
            icon: <Brain className="w-8 h-8 text-brand-blue-dark" />,
            title: "Entiende",
            desc: "CompañIA comprende. Reconoce voces, historias, fechas importantes y necesidades."
          },
          {
            icon: <Heart className="w-8 h-8 text-brand-orange" />,
            title: "Responde",
            desc: "Responde con calidez. Ofrece compañía, recordatorios y alertas a la familia."
          }
        ].map((step, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
            <p className="text-slate-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Powered By ────────────────────────────────────────────────────────────────
const PoweredBy = () => (
  <section className="py-16 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
        Tecnología de clase mundial, al servicio de tu familia
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {[
          { name: 'Claude', sub: 'Inteligencia', logo: 'https://cdn.simpleicons.org/anthropic/ffffff' },
          { name: 'ElevenLabs', sub: 'Voz sintética', logo: 'https://cdn.simpleicons.org/elevenlabs/ffffff' },
          { name: 'Whisper', sub: 'Reconocimiento', logo: null },
          { name: 'Telegram', sub: 'Familia conectada', logo: 'https://cdn.simpleicons.org/telegram/ffffff' },
          { name: 'React Native', sub: 'App móvil', logo: 'https://cdn.simpleicons.org/react/ffffff' },
          { name: 'Railway', sub: 'Infraestructura', logo: 'https://cdn.simpleicons.org/railway/ffffff' },
        ].map(tech => (
          <div key={tech.name} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            {tech.logo
              ? <img src={tech.logo} alt={tech.name} className="w-8 h-8 object-contain" />
              : <Headphones className="w-8 h-8 text-white" />
            }
            <span className="font-bold text-white text-sm">{tech.name}</span>
            <span className="text-xs text-slate-400">{tech.sub}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Voice Demo ────────────────────────────────────────────────────────────────
const VoiceDemo = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const voices = [
    {
      id: 'femenina',
      name: 'Rosita',
      desc: 'Tucumana, cercana y enérgica. Perfecta para acompañar el día a día.',
      file: '/Rosita.mp3',
      emoji: '👩',
      tags: ['Compañía', 'Consejo', 'Recordatorio'],
      color: 'bg-brand-orange',
    },
    {
      id: 'masculino',
      name: 'Juanchi',
      desc: 'Santafesino, tranquilo y divertido. Ideal para charlar sin apuros.',
      file: '/Juanchi.mp3',
      emoji: '👨',
      tags: ['Charla', 'Humor', 'Ayuda'],
      color: 'bg-brand-blue-dark',
    },
  ];

  const handlePlay = (id: string) => {
    // Parar todos los audios primero
    Object.entries(audioRefs.current).forEach(([key, audio]: [string, HTMLAudioElement | null]) => {
      if (audio && key !== id) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    const audio = audioRefs.current[id];
    if (!audio) return;

    if (playing === id) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(null);
    } else {
      audio.play();
      setPlaying(id);
      audio.onended = () => setPlaying(null);
    }
  };

  return (
    <section id="voces" className="py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-orange uppercase tracking-widest mb-3">Demo de voces</p>
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Escuchá cómo suena <Brand className="text-white" />
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Elegís la voz que más le guste a tu familiar. Dos personalidades, el mismo cuidado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {voices.map(voice => (
            <div key={voice.id} className="bg-white/5 rounded-[32px] p-8 border border-white/10 hover:border-white/20 transition-all">
              {/* Hidden audio element */}
              <audio
                ref={(el: HTMLAudioElement | null) => { audioRefs.current[voice.id] = el; }}
                src={voice.file}
                preload="none"
              />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/adaptive-icon.png"
                  alt={voice.name}
                  style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{voice.name}</h3>
                  <p className="text-slate-400 text-sm">{voice.desc}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {voice.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 text-slate-300 text-xs font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Play button */}
              <button
                onClick={() => handlePlay(voice.id)}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white transition-all ${
                  playing === voice.id
                    ? 'bg-white/20 ring-2 ring-white/40'
                    : `${voice.color} hover:opacity-90 shadow-lg`
                }`}
              >
                {playing === voice.id ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pausar muestra
                    <span className="flex gap-[3px] ml-1">
                      {[0, 1, 2, 3].map(i => (
                        <span
                          key={i}
                          className="inline-block w-1 bg-white rounded-full animate-bounce"
                          style={{ height: `${10 + i * 4}px`, animationDelay: `${i * 80}ms` }}
                        />
                      ))}
                    </span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Escuchar muestra
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => (
  <section id="funciones" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Funciones</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: <Users className="text-violet-400" />, title: "Conexión Familiar", desc: "Mensajes, fotos e informes fáciles para toda la familia." },
          { icon: <Calendar className="text-teal-400" />, title: "Asistencia de Memoria", desc: "Recordatorios de citas, eventos familiares y medicación." },
          { icon: <AlertCircle className="text-rose-400" />, title: "Botón SOS", desc: "Avisos de emergencia inmediata a contactos designados." },
          { icon: <Music className="text-pink-300" />, title: "Música y Juegos", desc: "Entretenimiento personalizado y ejercicios mentales." },
          { icon: <Clock className="text-amber-400" />, title: "Recordatorios", desc: "Notificaciones diarias para actividades y bienestar." },
          { icon: <Eye className="text-emerald-500" />, title: "Lectura de textos", desc: "Apuntá la cámara a cualquier papel y Rosita lo lee en voz alta. Ideal para personas con dificultad visual." },
          { icon: <Headphones className="text-sky-400" />, title: "Soporte 24/7", desc: "Acceso continuo y actualizaciones automáticas." }
        ].map((feat, i) => (
          <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-brand-blue-light transition-colors group">
            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-brand-blue-light/20 transition-colors">
              {React.cloneElement(feat.icon as React.ReactElement<{ className?: string }>, { className: `w-7 h-7 ${(feat.icon as React.ReactElement<{ className?: string }>).props.className ?? ''}` })}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">{feat.title}</h4>
              <p className="text-sm text-slate-500 leading-snug">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── SOS Modal ─────────────────────────────────────────────────────────────────
const SOSModal = ({ onClose }: { onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-orange p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg">
              SOS
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Seguridad completa</h3>
              <p className="text-white/80 text-sm">Protección activa las 24 horas</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">

          {/* Botón SOS */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <PhoneCall className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Botón SOS físico</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Con solo presionar el botón SOS, <Brand /> envía una alerta inmediata por Telegram a todos los familiares y contactos de emergencia designados.
              </p>
            </div>
          </div>

          {/* Detección de caídas */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Activity className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Alerta de caídas</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Si el dispositivo detecta una caída brusca, <Brand /> activa automáticamente el protocolo de emergencia sin necesidad de que el adulto mayor haga nada. La familia recibe aviso de inmediato.
              </p>
            </div>
          </div>

          {/* Detección emocional */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <MessageCircleWarning className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Detección de frases de alerta</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                <Brand /> analiza el lenguaje en tiempo real. Si detecta palabras como <span className="font-semibold text-rose-600">"dolor"</span>, <span className="font-semibold text-rose-600">"me caí"</span>, <span className="font-semibold text-rose-600">"tristeza"</span>, <span className="font-semibold text-rose-600">"no me siento bien"</span> o <span className="font-semibold text-rose-600">"ayuda"</span>, notifica automáticamente a la familia con el contexto de la conversación.
              </p>
            </div>
          </div>

          {/* Alertas silenciosas */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Bell className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Alertas silenciosas a la familia</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Además del SOS, la familia recibe notificaciones si el adulto mayor no interactuó con el dispositivo por un período inusual, o si hay cambios bruscos en sus patrones de conversación diaria.
              </p>
            </div>
          </div>

          {/* Shield */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-teal-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Múltiples capas de protección</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                SOS manual, detección de caídas, análisis de lenguaje y monitoreo de actividad trabajan juntos para garantizar que ninguna situación de riesgo pase desapercibida.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          <a
            href="https://expo.dev/artifacts/eas/egD2MQaSYuWjvgrCN9NncA.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-brand-orange text-white text-center px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg"
          >
            Descargar y probar
          </a>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ── Telegram Modal ────────────────────────────────────────────────────────────
const TelegramModal = ({ onClose }: { onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-blue-dark p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Conexión familiar</h3>
              <p className="text-white/70 text-sm">La familia siempre presente, sin esfuerzo</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">

          {/* Mensajes de audio */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Mic className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Mensajes de voz de la familia</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Los familiares pueden enviar mensajes de audio desde Telegram y <Brand /> los reproduce en voz alta al adulto mayor, con una voz cálida: <span className="italic text-slate-500">"Tenés un mensaje de tu hijo Juan."</span>
              </p>
            </div>
          </div>

          {/* Fotos */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Image className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Fotos que narran momentos</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cuando la familia comparte una foto, <Brand /> la describe en voz alta: <span className="italic text-slate-500">"Tu hija te manda una foto de los chicos en la plaza."</span> Ideal para personas con visión reducida.
              </p>
            </div>
          </div>

          {/* Leer textos */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Eye className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Lectura de textos y documentos</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                ¿Una carta, una receta, una boleta? Solo pedile <span className="italic text-slate-500">"Rosita, ¿qué dice acá?"</span> y apuntá el teléfono. La cámara se activa sola y lee todo en voz alta. Pensado especialmente para personas con dificultad visual.
              </p>
            </div>
          </div>

          {/* Informes */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Radio className="w-5 h-5 text-teal-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Informes diarios automáticos</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cada día, la familia recibe por Telegram un resumen del estado de ánimo, los temas de conversación, los recordatorios completados y cualquier alerta relevante del día.
              </p>
            </div>
          </div>

          {/* Sin app para el mayor */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <UserCheck className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Sin apps ni pantallas para el mayor</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                El adulto mayor no necesita tocar ninguna aplicación. Solo habla con <Brand />. Toda la coordinación familiar ocurre en Telegram, del lado de la familia.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          <a
            href="https://expo.dev/artifacts/eas/egD2MQaSYuWjvgrCN9NncA.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-brand-blue-dark text-white text-center px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all shadow-lg"
          >
            Descargar y probar
          </a>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const FunctionalitiesDetail = () => {
  const [showSOS, setShowSOS] = useState(false);
  const [showTelegram, setShowTelegram] = useState(false);
  return (
  <>
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-serif font-bold text-slate-900 leading-tight">
          Funcionalidades: <span className="text-brand-orange">La tecnología más <br />humana</span> para conectar generaciones.
        </h2>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          <Brand /> está diseñada para enriquecer la vida de sus seres queridos con empatía y cuidado.
        </p>
      </div>

      <div className="space-y-32">
        {/* Detail 1 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dy1ll1azp/image/upload/f_auto,q_auto,w_900/v1774034833/Gemini_Generated_Image_pf7te8pf7te8pf7t_j8zdry.png"
              alt="Hijo usando teléfono"
              className="rounded-[40px] shadow-xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-orange/10 rounded-full -z-10" />
          </div>
          <div>
            <div className="w-12 h-12 bg-brand-blue-light rounded-2xl flex items-center justify-center mb-6">
              <Users className="text-brand-blue-dark w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Manténganse siempre cerca.</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              <Brand /> facilita el envío de mensajes de audio y fotos a través de una integración perfecta con Telegram, permitiendo que toda la familia participe activamente en el día a día del adulto mayor, casi como si estuvieran ahí.
            </p>
            <button
              onClick={() => setShowTelegram(true)}
              className="bg-brand-blue-dark text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-all"
            >
              Saber más
            </button>
          </div>
        </div>

        {/* Detail 2 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="w-12 h-12 bg-brand-blue-light rounded-2xl flex items-center justify-center mb-6">
              <Brain className="text-brand-blue-dark w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Ayuda para el bienestar cognitivo.</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              <Brand /> ofrece recordatorios suaves para medicamentos, citas médicas y eventos importantes, además de estimular la memoria con historias y preguntas personalizadas.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 font-bold text-slate-800">
                <div className="w-2 h-2 bg-brand-orange rounded-full" />
                Estimulación cognitiva diaria
              </div>
              <div className="flex items-center gap-3 font-bold text-slate-800">
                <div className="w-2 h-2 bg-brand-orange rounded-full" />
                Organización y tranquilidad
              </div>
            </div>
            <button className="bg-brand-blue-dark text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-all">
              Empezar prueba
            </button>
          </div>
          <div className="order-1 lg:order-2 relative">
            <img
              src="https://res.cloudinary.com/dy1ll1azp/image/upload/f_auto,q_auto,w_900/v1774035006/Gemini_Generated_Image_qd0wqrqd0wqrqd0w_mst50x.png"
              alt="Panel de control"
              className="rounded-[40px] shadow-xl border-8 border-slate-100"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Detail 3 - SOS */}
        <div className="bg-brand-orange rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex justify-center">
              <div className="bg-white p-8 rounded-[40px] shadow-2xl">
                <div className="w-32 h-32 bg-red-500 rounded-3xl flex items-center justify-center text-5xl font-black shadow-lg shadow-red-200">
                  SOS
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Botón SOS y Seguridad</h4>
              <h3 className="text-4xl font-bold mb-6">Alerta inmediata en caso de emergencia.</h3>
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                Con solo presionar el Botón SOS, <Brand className="text-white" iaClassName="text-white/60" /> notifica instantáneamente a todos los familiares designados y contactos de emergencia, brindando asistencia rápida cuando más se necesita.
              </p>
              <button
                onClick={() => setShowSOS(true)}
                className="bg-white text-brand-orange px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-xl"
              >
                Saber más
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Detail 4 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-12 bg-brand-blue-light rounded-2xl flex items-center justify-center mb-6">
              <Music className="text-brand-blue-dark w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Música y Entretenimiento</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              <Brand /> permite escuchar listas de reproducción personalizadas basadas en sus gustos musicales, desde tango hasta clásicos, y ofrece juegos cognitivos adaptados para mantener la mente activa y entretenida.
            </p>
            <button className="bg-brand-blue-dark text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-all">
              Empezar prueba
            </button>
          </div>
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dy1ll1azp/image/upload/f_auto,q_auto,w_900/v1774069222/Gemini_Generated_Image_9qjd9c9qjd9c9qjd_pqrrvk.png"
              alt="Adulta mayor escuchando música"
              className="rounded-[40px] shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  {showSOS && <SOSModal onClose={() => setShowSOS(false)} />}
  {showTelegram && <TelegramModal onClose={() => setShowTelegram(false)} />}
  </>
  );
};

const Testimonials = () => (
  <section id="testimonios" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Lo que dicen las familias</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Carolina R., Hija",
            text: "\"CompañIA le devolvió la sonrisa a mi mamá. Saber que no está sola es un alivio enorme para toda la familia.\"",
            img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=104&h=104&q=80"
          },
          {
            name: "Martha G., Abuela",
            text: "\"Nunca pensé que iba a poder charlar así con alguien a las tres de la mañana. CompañIA siempre está.\"",
            img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=104&h=104&q=80"
          },
          {
            name: "Tomás V., Nieto",
            text: "\"Desde que tiene CompañIA, la abuela llama más tranquila y nosotros dormimos mejor. Vale cada peso.\"",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=104&h=104&q=80"
          }
        ].map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div className="font-bold text-slate-900">{t.name}</div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, si) => (
                <span key={si} className="text-brand-orange text-lg">★</span>
              ))}
            </div>
            <p className="text-slate-600 italic leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Stats Row ─────────────────────────────────────────────────────────────────
const Stats = () => (
  <section className="py-16 bg-brand-orange">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
        {[
          { value: '5 min', label: 'Y ya estaban interactuando' },
          { value: '87%', label: 'Uso diario activo' },
          { value: '★★★★★', label: 'Valoración promedio' },
          { value: '24/7', label: 'Siempre disponible' },
        ].map(stat => (
          <div key={stat.label}>
            <div className="text-4xl font-serif font-bold mb-2">{stat.value}</div>
            <div className="text-white/80 font-medium text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Para Quién ────────────────────────────────────────────────────────────────
const ForWhom = () => (
  <section className="py-24 bg-brand-blue-light/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">¿Para quién es <Brand />?</h2>
        <p className="text-slate-500 max-w-xl mx-auto">Una solución pensada para toda la familia.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-brand-blue-dark rounded-[32px] p-8 text-white">
          <div className="text-4xl mb-4">👵</div>
          <h3 className="text-xl font-bold mb-6">Para adultos mayores</h3>
          <ul className="space-y-3">
            {[
              'Compañía y conversación diaria',
              'Recordatorios de medicación y citas',
              'Música y juegos cognitivos',
              'Botón SOS de emergencia',
              'Contacto fácil con la familia',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-white/90 text-sm">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <div className="text-4xl mb-4">👨‍👩‍👧</div>
          <h3 className="text-xl font-bold mb-6 text-slate-900">Para hijos e hijas</h3>
          <ul className="space-y-3">
            {[
              'Informes de bienestar diarios',
              'Alertas ante emergencias',
              'Fotos del entorno por Telegram',
              'Estado emocional en tiempo real',
              'Tranquilidad aunque estés lejos',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-brand-blue-dark shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-brand-blue-dark rounded-[32px] p-8 text-white">
          <div className="text-4xl mb-4">🧑‍⚕️</div>
          <h3 className="text-xl font-bold mb-6">Para cuidadores</h3>
          <ul className="space-y-3">
            {[
              'Asistente siempre disponible',
              'Reducción de carga operativa',
              'Registro de actividad diaria',
              'Alertas ante cambios de ánimo',
              'Comunicación fluida con familia',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-white/90 text-sm">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// ── Comparison Table ──────────────────────────────────────────────────────────
const Comparison = () => {
  const features = [
    'Disponible 24/7',
    'Habla en castellano rioplatense',
    'Recordatorios activos',
    'Alertas de emergencia a la familia',
    'Estimulación cognitiva',
    'Informes a la familia',
    'Sin capacitación técnica',
  ];
  const cols = [
    { name: 'CompañIA', values: [true, true, true, true, true, true, true], highlight: true },
    { name: 'heyATO', values: [true, false, true, true, false, true, false], highlight: false },
    { name: 'Cuidador presencial', values: [false, true, true, true, false, false, true], highlight: false },
    { name: 'Videollamada', values: [false, true, false, false, false, false, true], highlight: false },
    { name: 'Teléfono', values: [false, true, false, false, false, false, true], highlight: false },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            ¿Por qué <Brand />?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">Comparado con las alternativas tradicionales.</p>
        </div>

        <div className="overflow-x-auto rounded-[32px] border border-slate-100 shadow-sm">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-6 text-slate-500 font-medium text-sm">Función</th>
                {cols.map(col => (
                  <th key={col.name} className={`p-6 text-center text-sm font-bold ${col.highlight ? 'bg-brand-blue-dark text-white rounded-t-2xl' : 'text-slate-600'}`}>
                    {col.highlight ? <Brand className="text-white" /> : col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, fi) => (
                <tr key={feat} className={fi % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                  <td className="p-5 text-slate-700 font-medium text-sm">{feat}</td>
                  {cols.map(col => (
                    <td key={col.name} className={`p-5 text-center ${col.highlight ? 'bg-brand-blue-dark/5' : ''}`}>
                      {col.values[fi] ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-slate-100">
                <td className="p-5 text-slate-700 font-bold text-sm">Precio mensual</td>
                <td className="p-5 text-center font-bold text-brand-blue-dark bg-brand-blue-dark/5">$39</td>
                <td className="p-5 text-center text-slate-500 text-sm font-medium">$29 + $149 hardware</td>
                <td className="p-5 text-center text-slate-500 text-sm font-medium">USD 400-1,200</td>
                <td className="p-5 text-center text-slate-500 text-sm font-medium">Gratis</td>
                <td className="p-5 text-center text-slate-500 text-sm font-medium">Gratis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const PricingContact = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      const form = e.currentTarget;
      await fetch('https://formspree.io/f/mdawyrkk', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      setSent(true);
      form.reset();
    } catch {
      // silencioso — el usuario puede reintentar
    } finally {
      setSending(false);
    }
  };

  return (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Pricing Card */}
        <div className="bg-brand-blue-light/40 p-10 rounded-[40px] border border-brand-blue-light flex flex-col justify-between">
          <div>
            <div className="inline-block bg-brand-orange text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Precio especial MVP
            </div>
            <div className="flex justify-between items-center mb-8">
              <div className="text-4xl font-bold text-slate-900">$39<span className="text-lg text-slate-500 font-normal">/mes</span></div>
              <a
                href="https://expo.dev/artifacts/eas/egD2MQaSYuWjvgrCN9NncA.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-orange text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-200"
              >
                Probar 7 días gratis
              </a>
            </div>
            <ul className="space-y-4 text-slate-700 font-medium">
              {[
                'Asistencia por voz 24/7',
                'Conexión familiar ilimitada',
                'Botón SOS y recordatorios',
                'Música y juegos cognitivos',
                'Informe de bienestar diario',
                'Integración con Telegram',
              ].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-blue-dark w-5 h-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-8">¿Tenés alguna pregunta?</h3>
          {sent ? (
            <div className="flex flex-col items-center justify-center h-48 gap-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-green-500 w-8 h-8" />
              </div>
              <p className="text-xl font-bold text-slate-900">¡Mensaje enviado!</p>
              <p className="text-slate-500">Te respondemos a la brevedad.</p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="_subject" value="Nueva consulta desde CompañIA" />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                required
                className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-dark/20 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Tu correo"
                required
                className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-dark/20 transition-all"
              />
            </div>
            <textarea
              name="mensaje"
              placeholder="Tu mensaje..."
              rows={4}
              required
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-dark/20 transition-all resize-none"
            ></textarea>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-brand-blue-dark text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
            >
              <Send className="w-5 h-5" />
              {sending ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  </section>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-brand-orange transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('General');
  const faqsByTab: Record<string, { q: string; a: string }[]> = {
    General: [
      { q: "¿Es difícil de configurar para un adulto mayor?", a: "No, CompañIA fue diseñada desde cero para ser accesible. La configuración la hace un familiar una sola vez. A partir de ahí, tu ser querido solo necesita hablar: no hay pantallas complicadas ni menús difíciles." },
      { q: "¿En qué dispositivos funciona?", a: "CompañIA funciona como aplicación móvil en Android. Se instala en cualquier tablet o smartphone. Lo ideal es dejarlo fijo en un lugar cómodo de la casa, enchufado y siempre disponible." },
    ],
    Técnica: [
      { q: "¿Qué pasa si no hay internet?", a: "Algunas funciones básicas siguen disponibles sin conexión. Para las funciones de IA, voz y mensajes con la familia se necesita conexión a internet, preferentemente WiFi." },
      { q: "¿Necesito instalar algo en mi teléfono?", a: "Los familiares reciben los mensajes, fotos e informes directamente por Telegram, que ya usan en el día a día. No hace falta instalar nada adicional." },
    ],
    Privacidad: [
      { q: "¿Cómo se protegen los datos de mi familiar?", a: "Los datos viajan cifrados y nunca se venden a terceros. Los audios de voz se procesan en tiempo real y no se almacenan. Cumplimos con las normativas de protección de datos de Argentina." },
      { q: "¿Quién puede escuchar las conversaciones?", a: "Nadie. Las conversaciones son privadas entre tu familiar y CompañIA. Los familiares solo reciben los resúmenes de bienestar que el propio sistema genera, no las conversaciones completas." },
    ],
    Precios: [
      { q: "¿Puedo cancelar en cualquier momento?", a: "Sí, sin penalidades ni letra chica. Podés cancelar la suscripción cuando quieras desde la app o enviándonos un mensaje." },
      { q: "¿La prueba gratuita requiere tarjeta de crédito?", a: "No. Podés probar CompañIA gratis durante 7 días sin ingresar ningún dato de pago. Solo pedimos un email para crear tu cuenta." },
    ],
  };

  const faqs = faqsByTab[activeTab] ?? [];

  return (
    <section id="faq" className="py-24 bg-brand-blue-light/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900">Preguntas Frecuentes</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/4 space-y-2">
            {['General', 'Técnica', 'Privacidad', 'Precios'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab ? 'bg-brand-blue-light text-brand-blue-dark shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="md:w-3/4 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-16 bg-brand-blue-dark rounded-[32px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">¿Aún tenés preguntas?</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-brand-blue-dark px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-all">
                Contactar Soporte
              </button>
              <div className="flex items-center gap-3 text-xl font-bold">
                <Smartphone className="w-6 h-6" />
                (0800) 123-4567
              </div>
            </div>
          </div>
          <div className="md:w-1/3 relative z-10">
            <img
              src="/rosita.png"
              alt="Rosita"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/20 object-cover shadow-2xl"
            />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-50 py-12 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <img src="/adaptive-icon.png" alt="CompañIA" className="w-6 h-6 rounded-full object-cover" />
          <span className="text-lg font-bold text-slate-900"><Brand /></span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-brand-orange transition-colors">Sobre nosotros</a>
          <a href="#" className="hover:text-brand-orange transition-colors">Términos</a>
          <a href="#" className="hover:text-brand-orange transition-colors">Privacidad</a>
          <a href="#" className="hover:text-brand-orange transition-colors">Soporte</a>
        </div>
        <div className="text-sm text-slate-400">
          © 2026 CompañIA. Hecho con ❤️ inspirados en "Negrita".
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-orange/20">
      <Navbar />
      <main>
        <Hero />
        <PressStrip />
        <Problem />
        <HowItWorks />
        <PoweredBy />
        <VoiceDemo />
        <Features />
        <FunctionalitiesDetail />
        <Testimonials />
        <Stats />
        <ForWhom />
        <Comparison />
        <PricingContact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
