import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlarmClock,
  AlertCircle,
  Bluetooth,
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  Headphones,
  Heart,
  Lightbulb,
  MessageCircleMore,
  Mic,
  Minus,
  Music,
  Pause,
  Play,
  Plus,
  Radio,
  Send,
  ShieldAlert,
  Smartphone,
  Subtitles,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

const LATEST_ANDROID_BUILD_URL = 'https://compan-ia.up.railway.app/';

/* ═══════════════════════════════════════════════════════════════════════════
   PRIMITIVAS
   ═══════════════════════════════════════════════════════════════════════════ */

const Brand = ({ className = '', iaClassName = '' }: { className?: string; iaClassName?: string }) => (
  <span className={`font-semibold ${className}`}>
    Compañ<span className={iaClassName}>IA</span>
  </span>
);

// Reveal: fade + leve desplazamiento al entrar en viewport.
// Único mecanismo de animación de scroll del sitio — lento y sutil, nunca brusco.
const Reveal = ({
  children,
  delay = 0,
  y = 24,
  className = '',
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
    transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

// Entrada: igual que Reveal pero dispara al montar, no al entrar en viewport.
// Es lo que usa el hero, que ya está en pantalla desde el primer frame.
const Entrada = ({
  children,
  delay = 0,
  y = 22,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const DEGRADADO_HERO = 'linear-gradient(96deg, #4a8cff, #7b5cf0 30%, #e0509a 64%, #ff7a3d)';

// Titular que entra letra por letra: cada una sube, crece y aparece.
//
// OJO con el degradado. No se puede poner en el <h1> y animar las letras
// adentro: al animarlas el navegador las pinta en su propia capa, el
// `background-clip: text` del padre no las alcanza y quedan TRANSPARENTES —
// o sea, el titular desaparece. Por eso cada letra lleva su propio degradado,
// estirado al largo del titular entero y desplazado según su posición: el
// resultado se ve como un único degradado continuo, pero cada letra es
// autosuficiente y se puede animar sin romper nada.
//
// Las letras van aria-hidden y el texto real viaja en aria-label, así un lector
// de pantalla lee "Nunca más sola." y no letra por letra.
const TituloPorLetra = ({
  lineas,
  className = '',
  delayInicial = 0,
  paso = 0.045,
}: {
  lineas: string[];
  className?: string;
  delayInicial?: number;
  paso?: number;
}) => {
  const total = lineas.reduce((acc, l) => acc + Array.from(l).length, 0);
  let n = 0;

  return (
    <h1 className={className} aria-label={lineas.join(' ')}>
      {lineas.map((linea, li) => (
        <span key={li} className="block" aria-hidden="true">
          {Array.from(linea).map((ch, i) => {
            const idx = n++;
            return (
              <motion.span
                key={i}
                className="inline-block whitespace-pre"
                style={{
                  backgroundImage: DEGRADADO_HERO,
                  backgroundSize: `${total * 100}% 100%`,
                  backgroundPositionX: total > 1 ? `${(idx / (total - 1)) * 100}%` : '50%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
                initial={{ opacity: 0, y: '0.4em', scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: delayInicial + idx * paso, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};

// Botón relleno. En capítulos claros va azul Apple; en oscuros, blanco.
const BotonLleno = ({
  href,
  children,
  tono = 'azul',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  tono?: 'azul' | 'blanco' | 'oscuro';
  className?: string;
}) => {
  const tonos = {
    azul: 'bg-[#0071e3] text-white hover:bg-[#0077ed]',
    blanco: 'bg-white text-black hover:bg-white/85',
    oscuro: 'bg-ink text-white hover:bg-ink/85',
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-medium transition-colors duration-300 ${tonos[tono]} ${className}`}
    >
      {children}
    </a>
  );
};

// Enlace de texto con flecha — el CTA secundario de Apple.
const EnlaceFlecha = ({
  href,
  children,
  tono = 'azul',
}: {
  href: string;
  children: React.ReactNode;
  tono?: 'azul' | 'blanco';
}) => (
  <a
    href={href}
    className={`group inline-flex items-center gap-1 text-[15px] font-medium transition-opacity duration-300 hover:opacity-70 ${
      tono === 'azul' ? 'text-[#0071e3]' : 'text-white'
    }`}
  >
    {children}
    <ChevronDown className="w-4 h-4 -rotate-90 transition-transform duration-300 group-hover:translate-x-0.5" />
  </a>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MARCOS DE DISPOSITIVO — dibujados en CSS, nítidos en cualquier pantalla
   ═══════════════════════════════════════════════════════════════════════════ */

const Telefono = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`device rounded-[2.6rem] p-[7px] ${className}`}>
    <div className="device-screen rounded-[2.2rem] aspect-[9/19.5]">
      {/* isla dinámica */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-[13px] w-[34%] rounded-full bg-black" />
      {children}
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════════════════════
   PANTALLAS DE LA APP — recreadas en código
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── El rostro de Rosita ─────────────────────────────────────────────────────
   NO hay boca: son solo los dos ojos. Las formas salen tal cual de
   AbuApp/components/RostroAsistente.tsx (`formaBase`), que las define sobre un
   rostro de referencia de 360 px de ancho:
     · w, h  = tamaño del ojo
     · rt, rb = radio de las esquinas de arriba y de abajo
     · rot    = inclinación en grados (distinta por ojo en triste/enojada)
     · dy     = corrimiento vertical (solo 'confundida', que tiene ojos desparejos)
   Los CENTROS de los ojos son fijos (x = 106 y 254 de 360) y lo que cambia es
   el tamaño de cada forma — por eso van posicionados por su centro y no en una
   fila flex, que los estiraría a todos por igual.                             */

const CARA_W = 360; // ancho del rostro de referencia en la app
const OJO_CX_IZQ = 106 / CARA_W; // 29,4%
const OJO_CX_DER = 254 / CARA_W; // 70,6%

type Forma = { w: number; h: number; rt: number; rb: number; rot?: number; arco?: boolean };

// Solo las expresiones que usamos en la web. El resto (confundida, guiño,
// avergonzada, durmiendo…) existe en la app pero acá no aporta.
const EXPRESIONES: Record<string, { L: Forma; R: Forma }> = {
  // óvalo alto de siempre
  neutral: { L: { w: 104, h: 132, rt: 52, rb: 52 }, R: { w: 104, h: 132, rt: 52, rb: 52 } },
  // más alto y angosto: ojos bien abiertos
  sorprendida: { L: { w: 100, h: 152, rt: 50, rb: 50 }, R: { w: 100, h: 152, rt: 50, rb: 50 } },
  // domo grueso: plano abajo, redondo arriba (ternura / pensativa)
  ternura: { L: { w: 122, h: 72, rt: 61, rb: 6 }, R: { w: 122, h: 72, rt: 61, rb: 6 } },
  // arco: los ojitos de risa "⌒"
  feliz: { L: { w: 100, h: 50, rt: 0, rb: 0, arco: true }, R: { w: 100, h: 50, rt: 0, rb: 0, arco: true } },
  // cuenco inclinado hacia afuera: ojos caídos
  triste: { L: { w: 120, h: 66, rt: 8, rb: 60, rot: -16 }, R: { w: 120, h: 66, rt: 8, rb: 60, rot: 16 } },
  // semi-cerrados: plano arriba, redondo abajo
  cansada: { L: { w: 118, h: 56, rt: 6, rb: 56 }, R: { w: 118, h: 56, rt: 6, rb: 56 } },
};

export type Expresion = keyof typeof EXPRESIONES;

// Un ojo, en DOS capas, y la separación es obligatoria:
//   · la de afuera lo ubica (translate para centrarlo en su eje + rotación)
//   · la de adentro lleva la forma y el pestañeo
// No se pueden juntar: el pestañeo es una animación CSS que escribe
// `transform: scaleY(...)`, y una animación le GANA al transform inline — se
// comía el translate de centrado y los ojos se corrían media anchura.
//
// El radio va con los dos ejes separados por barra para que la esquina sea un
// arco redondo: el % horizontal se mide contra el ancho y el vertical contra
// el alto, que acá son distintos.
const Ojo = ({ f, cx, retardo }: { f: Forma; cx: number; retardo: string }) => {
  const posicion: React.CSSProperties = {
    position: 'absolute',
    left: `${cx * 100}%`,
    top: '50%',
    width: `${(f.w / CARA_W) * 100}%`,
    paddingBottom: `${(f.h / CARA_W) * 100}%`,
    transform: `translate(-50%, -50%) rotate(${f.rot ?? 0}deg)`,
  };

  if (f.arco) {
    return (
      <div style={posicion}>
        <svg
          viewBox={`0 0 ${f.w} ${f.h}`}
          className="rosita-eye absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_0_9px_rgba(92,225,230,0.8)]"
          style={{ animationDelay: retardo }}
        >
          <path
            d={`M 13 ${f.h - 7} Q ${f.w / 2} 1 ${f.w - 13} ${f.h - 7}`}
            fill="none"
            stroke="#5ce1e6"
            strokeWidth={24}
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  const rtH = (f.rt / f.w) * 100;
  const rtV = (f.rt / f.h) * 100;
  const rbH = (f.rb / f.w) * 100;
  const rbV = (f.rb / f.h) * 100;

  return (
    <div style={posicion}>
      <div
        className="rosita-eye absolute inset-0 bg-[#5ce1e6] shadow-[0_0_26px_8px_rgba(92,225,230,0.5)]"
        style={{
          borderRadius: `${rtH}% ${rtH}% ${rbH}% ${rbH}% / ${rtV}% ${rtV}% ${rbV}% ${rbV}%`,
          animationDelay: retardo,
        }}
      />
    </div>
  );
};

/* ── Overlays de expresión ───────────────────────────────────────────────────
   La app suma un efecto encima de los ojos según la expresión (ver
   `OverlayEmojis` en RostroAsistente.tsx): corazones en ternura, confeti en
   feliz, signos de admiración en sorprendida. Posiciones, tamaños y colores
   salen de components/EfectosExpresion.tsx, convertidos a % del rostro de 360.  */

// x = centro de la pieza dentro del rostro (%), tam = tamaño (% del rostro)
const CORAZONES = [
  { x: 20.6, tam: 10.0, d: '0s' },
  { x: 32.2, tam: 8.3, d: '0.35s' },
  { x: 49.2, tam: 11.7, d: '0.7s' },
  { x: 64.2, tam: 9.4, d: '0.2s' },
  { x: 79.7, tam: 10.6, d: '0.55s' },
  { x: 38.3, tam: 7.8, d: '0.9s' },
];

const CONFETI = [
  { x: 19.2, tam: 5.6, color: '#FF6B6B', estrella: true, d: '0s' },
  { x: 30.0, tam: 6.7, color: '#FFD93D', estrella: false, d: '0.12s' },
  { x: 41.1, tam: 5.0, color: '#6BCB77', estrella: true, d: '0.06s' },
  { x: 53.3, tam: 6.1, color: '#4D96FF', estrella: false, d: '0.22s' },
  { x: 64.7, tam: 5.6, color: '#FF6BFF', estrella: true, d: '0.09s' },
  { x: 75.8, tam: 6.7, color: '#FF9F45', estrella: false, d: '0.18s' },
  { x: 86.1, tam: 5.0, color: '#C77DFF', estrella: true, d: '0.04s' },
];

// En la app van ARRIBA de los ojos y en diagonal: el más grande, más alto y
// más a la derecha (offsetX -28/0/+32, offsetY 52/26/0 sobre el rostro de 360).
// `alto` es la ALTURA en % del rostro (22/32/44 de 360, igual que la app). El
// ancho sale de ahí: el signo es un SVG de 10×34, o sea alto/3,4 — si se pone
// el valor como ancho, el signo sale 3,4 veces más grande de lo que debería.
const PROPORCION_SIGNO = 34 / 10;
const ADMIRACION = [
  { x: 42.2, alto: 6.1, top: 8, txt: '!', d: '0s' },
  { x: 50.0, alto: 8.9, top: -1, txt: '¡', d: '0.18s' },
  { x: 58.9, alto: 12.2, top: -11, txt: '!', d: '0.36s' },
];

const HEART_PATH =
  'M 0,-8 C -5,-14 -16,-12 -16,-4 C -16,4 -8,10 0,16 C 8,10 16,4 16,-4 C 16,-12 5,-14 0,-8 Z';
const STAR_PATH = 'M 0,-10 L 2.9,-3.1 L 10,-3.1 L 4.3,1.5 L 6.5,9 L 0,4.6 L -6.5,9 L -4.3,1.5 L -10,-3.1 L -2.9,-3.1 Z';

const Pieza = ({ x, tam, retardo, children }: { x: number; tam: number; retardo: string; children: React.ReactNode }) => (
  <div
    className="efecto-sube absolute"
    style={{ left: `${x}%`, bottom: '6%', width: `${tam}%`, animationDelay: retardo }}
  >
    {children}
  </div>
);

const OverlayExpresion = ({ expresion }: { expresion: Expresion }) => {
  if (expresion === 'ternura') {
    return (
      <>
        {CORAZONES.map((c) => (
          <Pieza key={c.x} x={c.x} tam={c.tam} retardo={c.d}>
            <svg viewBox="-18 -16 36 34" className="w-full drop-shadow-[0_0_6px_rgba(255,143,171,0.6)]">
              <path d={HEART_PATH} fill="#FF8FAB" />
            </svg>
          </Pieza>
        ))}
      </>
    );
  }
  if (expresion === 'feliz') {
    return (
      <>
        {CONFETI.map((c) => (
          <Pieza key={c.x} x={c.x} tam={c.tam} retardo={c.d}>
            {c.estrella ? (
              <svg viewBox="-11 -11 22 22" className="w-full">
                <path d={STAR_PATH} fill={c.color} />
              </svg>
            ) : (
              <div className="aspect-square w-full rounded-[28%]" style={{ background: c.color }} />
            )}
          </Pieza>
        ))}
      </>
    );
  }
  if (expresion === 'sorprendida') {
    return (
      <>
        {ADMIRACION.map((a) => (
          <div
            key={a.txt + a.x}
            className="efecto-late absolute"
            style={{
              left: `${a.x}%`,
              top: `${a.top}%`,
              width: `${a.alto / PROPORCION_SIGNO}%`,
              animationDelay: a.d,
            }}
          >
            <svg viewBox="0 0 10 34" className="w-full drop-shadow-[0_0_7px_rgba(92,225,230,0.7)]">
              {/* "¡" va cabeza abajo: el punto arriba y la barra colgando */}
              {a.txt === '¡' ? (
                <>
                  <circle cx="5" cy="4" r="3.4" fill="#5ce1e6" />
                  <path d="M 2.1 11 h 5.8 l -1 20 h -3.8 Z" fill="#5ce1e6" />
                </>
              ) : (
                <>
                  <path d="M 2.1 3 h 5.8 l -1 20 h -3.8 Z" fill="#5ce1e6" />
                  <circle cx="5" cy="30" r="3.4" fill="#5ce1e6" />
                </>
              )}
            </svg>
          </div>
        ))}
      </>
    );
  }
  return null;
};

const OjosRosita = ({ expresion = 'neutral' }: { expresion?: Expresion }) => {
  const { L, R } = EXPRESIONES[expresion] ?? EXPRESIONES.neutral;
  return (
    <div className="relative w-full" style={{ paddingBottom: `${(200 / CARA_W) * 100}%` }}>
      <Ojo f={L} cx={OJO_CX_IZQ} retardo="0s" />
      <Ojo f={R} cx={OJO_CX_DER} retardo="0.06s" />
      <OverlayExpresion expresion={expresion} />
    </div>
  );
};

// Barra de estado del sistema: hora a la izquierda, señal/wifi/batería a la derecha.
const BarraEstado = () => (
  <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[7%] pt-[4%] text-white">
    <span className="text-[7px] font-medium">13:57</span>
    <div className="flex items-center gap-[3px]">
      <div className="flex items-end gap-[1px]">
        {[3, 4.5, 6, 7.5].map((h, i) => (
          <span key={i} className="w-[1.5px] rounded-[1px] bg-white" style={{ height: `${h}px` }} />
        ))}
      </div>
      <span className="ml-[2px] rounded-[2px] bg-white px-[2px] text-[5px] font-bold leading-[8px] text-black">90</span>
      <span className="h-[3px] w-[3px] rounded-full bg-[#3ddc84]" />
    </div>
  </div>
);

// El panel blanco inferior de la pantalla principal: chips, reloj, fecha y los
// tres botones (micrófono, ¡Ayuda! y mensajes). Ocupa el 27% de abajo.
// Radio de las esquinas de arriba. Dos trampas seguidas acá:
//  1. un solo valor en % da una ELIPSE, porque es % del ancho en horizontal y
//     % del ALTO en vertical, y el panel es mucho más ancho que alto;
//  2. `border-top-left-radius` NO acepta la barra (`5.5%/9.4%`) — esa sintaxis
//     es solo del atajo `border-radius`. Con barra el navegador descarta la
//     regla entera y la esquina queda RECTA.
// Por eso van los dos ejes separados por ESPACIO, en estilo inline.
// 5,5% del ancho ≡ 9,4% del alto del panel → arco redondo de verdad.
const RADIO_PANEL = { borderTopLeftRadius: '5.5% 9.4%', borderTopRightRadius: '5.5% 9.4%' };

const PanelInferiorApp = () => (
  <div className="absolute inset-x-0 bottom-0 h-[27%] bg-white px-[6%] pt-[4%]" style={RADIO_PANEL}>
    <div className="flex justify-end gap-[3%]">
      <span className="flex h-[13px] w-[13px] items-center justify-center rounded-full bg-emerald-500/12">
        <AlarmClock className="h-[7px] w-[7px] text-emerald-600" strokeWidth={2.4} />
      </span>
      <span className="flex h-[13px] w-[13px] items-center justify-center rounded-full bg-amber-500/12 text-[6px] font-bold text-amber-600">
        Aa
      </span>
      <span className="flex h-[13px] w-[13px] items-center justify-center rounded-full bg-ink/[0.06]">
        <Bluetooth className="h-[7px] w-[7px] text-ink-soft" strokeWidth={2.4} />
      </span>
    </div>
    <p className="mt-[1%] text-center text-[19px] font-bold leading-none tracking-tight text-[#221d3d]">13:57</p>
    <p className="mt-[3%] text-center text-[7px] font-medium text-[#6b6486]">Martes 4 de agosto</p>
    <div className="mt-[3%] flex items-center justify-center gap-[3px]">
      <span className="h-[2.5px] w-[9px] rounded-full bg-[#a78bfa]" />
      <span className="h-[2.5px] w-[2.5px] rounded-full bg-ink/15" />
    </div>
    <div className="mt-[5%] flex items-center gap-[4%]">
      <span className="flex aspect-square w-[15%] items-center justify-center rounded-full bg-[#f1eff7]">
        <Mic className="h-[45%] w-[45%] text-[#221d3d]" strokeWidth={2} />
      </span>
      <span className="flex flex-1 items-center justify-center rounded-full bg-[#f0424a] py-[4.5%] text-[9px] font-semibold text-white shadow-[0_6px_14px_-4px_rgba(240,66,74,0.7)]">
        ¡Ayuda!
      </span>
      <span className="flex aspect-square w-[15%] items-center justify-center rounded-full bg-[#f1eff7]">
        <MessageCircleMore className="h-[45%] w-[45%] text-[#221d3d]" strokeWidth={2} />
      </span>
    </div>
    {/* barra de inicio del sistema */}
    <div className="absolute inset-x-0 bottom-[3%] flex justify-center">
      <span className="h-[2px] w-[28%] rounded-full bg-[#221d3d]/70" />
    </div>
  </div>
);

// Fondo de la app: casi negro, un poco más claro arriba, con el halo de los ojos.
const FondoApp = () => (
  <>
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#1a1d23_0%,#0b0d11_45%,#050506_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(92,225,230,0.13),transparent_55%)]" />
  </>
);

// La pantalla principal, reproducida de la captura real: los ojos arrancan al
// 19% del alto y abajo va el panel blanco con el reloj y el botón de ¡Ayuda!
// El rostro va centrado en su línea de ojos (27% del alto), no anclado arriba:
// así las formas más bajas (ternura, feliz) no "flotan" fuera de lugar cuando
// cambia la expresión.
const Rostro = ({ expresion }: { expresion: Expresion }) => (
  <div className="absolute left-1/2 top-[27%] w-[96%] -translate-x-1/2 -translate-y-1/2">
    <OjosRosita expresion={expresion} />
  </div>
);

// El mate: es el mismo Lottie que usa la app en reposo
// (AbuApp/assets/animations/MatePava.lottie → acá extraído a /mate.json).
// Se carga en diferido y solo cuando el teléfono está a la vista, para no
// meterle 50 KB de reproductor al primer pintado del hero.
const MateLottie = () => {
  const caja = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return;

    let anim: { destroy: () => void } | null = null;
    let cancelado = false;

    const arrancar = async () => {
      const { default: lottie } = await import('lottie-web/build/player/lottie_light');
      if (cancelado || !caja.current) return;
      anim = lottie.loadAnimation({
        container: caja.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/mate.json',
      });
    };

    // Solo lo cargamos cuando entra en pantalla
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          obs.disconnect();
          arrancar();
        }
      },
      { rootMargin: '200px' },
    );
    obs.observe(nodo);

    return () => {
      cancelado = true;
      obs.disconnect();
      anim?.destroy();
    };
  }, []);

  // 180 px sobre una pantalla de ~400 → 45% del ancho, centrado, igual que la app.
  // `aspect-square` es obligatorio: sin alto el div mide 0 px y el
  // IntersectionObserver nunca lo da por visible, así que el Lottie no cargaba.
  return (
    <div
      ref={caja}
      className="absolute left-1/2 top-[57%] aspect-square w-[45%] -translate-x-1/2 -translate-y-1/2"
    />
  );
};

const PantallaRosita = ({ expresion = 'neutral', mate = false }: { expresion?: Expresion; mate?: boolean }) => (
  <div className="absolute inset-0 overflow-hidden bg-black">
    <FondoApp />
    <BarraEstado />
    <Rostro expresion={expresion} />
    {mate && <MateLottie />}
    <PanelInferiorApp />
  </div>
);

// Pantalla con una acción en curso: el mismo rostro, lo que Rosita está
// diciendo, y abajo la tarjeta de lo que hizo.
const PantallaApp = ({
  dice,
  expresion = 'neutral',
  children,
}: {
  dice: string;
  expresion?: Expresion;
  children: React.ReactNode;
}) => (
  <div className="absolute inset-0 overflow-hidden bg-black">
    <FondoApp />
    <BarraEstado />
    <Rostro expresion={expresion} />
    <p className="absolute inset-x-0 top-[45%] px-4 text-center text-[9px] font-medium leading-snug text-white/70">
      {dice}
    </p>
    <div className="absolute inset-x-0 bottom-0 p-2.5 pb-4">{children}</div>
  </div>
);

// Tarjeta genérica de "UI de la app". Siempre ocupa el ancho disponible: dentro
// de un teléfono angosto no debe desbordar.
const PanelUI = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`w-full min-w-0 rounded-[18px] bg-white p-3.5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] ${className}`}
  >
    {children}
  </div>
);

const TarjetaRecordatorio = () => (
  <PanelUI>
    <div className="flex items-center gap-2 mb-3">
      <Bell className="w-3.5 h-3.5 text-[#f2905c]" />
      <span className="text-[11px] font-semibold text-ink">Recordatorios</span>
    </div>
    <div className="space-y-2.5">
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-[1.5px] border-ink-faint" />
        <div>
          <p className="text-[12px] font-medium leading-tight text-ink">Tomar la pastilla de la presión</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-[#f2905c]/12 px-1.5 py-0.5 text-[10px] font-medium text-[#c96a37]">
            <Clock className="w-2.5 h-2.5" /> Hoy 20:00
          </span>
        </div>
      </div>
      <div className="flex items-start gap-2.5 opacity-45">
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
        <p className="text-[12px] font-medium leading-tight text-ink line-through">Llamar al doctor Pérez</p>
      </div>
    </div>
  </PanelUI>
);

const TarjetaMensajeFamilia = () => (
  <PanelUI>
    <div className="flex items-center gap-2.5 mb-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#6e8cff] to-[#a78bfa] text-[10px] font-bold text-white">
        C
      </div>
      <div>
        <p className="text-[11px] font-semibold leading-none text-ink">Carolina</p>
        <p className="mt-1 text-[10px] leading-none text-ink-faint">Tu hija · ahora</p>
      </div>
    </div>
    <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-[#f5f5f7] px-2.5 py-2.5">
      <Play className="h-3 w-3 shrink-0 fill-ink text-ink" />
      <div className="flex h-5 min-w-0 flex-1 items-center gap-[3px] overflow-hidden">
        {[0.5, 0.9, 0.4, 1, 0.7, 0.35, 0.85, 0.5, 1, 0.6].map((h, i) => (
          <span
            key={i}
            className="wave-bar w-[2px] shrink-0 rounded-full bg-[#0071e3]"
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
      <span className="shrink-0 text-[9px] font-medium text-ink-faint">0:14</span>
    </div>
    <p className="mt-2.5 text-[10px] leading-snug text-ink-soft">Rosita lo reproduce en voz alta, sin tocar nada.</p>
  </PanelUI>
);

const TarjetaSOS = () => (
  <PanelUI>
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5484d] text-[10px] font-black text-white">
        SOS
      </div>
      <div>
        <p className="text-[11px] font-semibold leading-none text-ink">Alerta enviada</p>
        <p className="mt-1 text-[10px] leading-none text-ink-faint">Hace 4 segundos</p>
      </div>
    </div>
    <div className="mt-3 space-y-1.5">
      {['Carolina — hija', 'Tomás — nieto', 'Juan — hijo'].map((n) => (
        <div key={n} className="flex items-center gap-2 rounded-lg bg-[#f5f5f7] px-2.5 py-1.5">
          <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
          <span className="text-[10.5px] font-medium text-ink">{n}</span>
          <span className="ml-auto text-[9px] text-ink-faint">Notificado</span>
        </div>
      ))}
    </div>
    <p className="mt-2.5 text-[10px] leading-snug text-ink-soft">Con ubicación exacta, por Telegram.</p>
  </PanelUI>
);

const TarjetaLista = () => (
  <PanelUI>
    <div className="mb-3 flex items-center justify-between">
      <span className="text-[11px] font-semibold text-ink">Lista del almacén</span>
      <span className="text-[10px] text-ink-faint">4 cosas</span>
    </div>
    <div className="space-y-2">
      {['Pan casero', 'Leche descremada', 'Yerba', 'Pastillas de la presión'].map((item, i) => (
        <div key={item} className="flex items-center gap-2.5">
          <div
            className={`h-3.5 w-3.5 shrink-0 rounded-md ${
              i === 0 ? 'bg-[#0071e3]' : 'border-[1.5px] border-ink-faint'
            } flex items-center justify-center`}
          >
            {i === 0 && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
          </div>
          <span className={`text-[12px] font-medium text-ink ${i === 0 ? 'line-through opacity-40' : ''}`}>{item}</span>
        </div>
      ))}
    </div>
  </PanelUI>
);

const TarjetaMusica = () => (
  <PanelUI>
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f2905c] to-[#d94f5c]">
        <Music className="h-5 w-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold text-ink">Cambalache</p>
        <p className="truncate text-[10px] text-ink-faint">Tango · Los favoritos de Negrita</p>
      </div>
    </div>
    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#f5f5f7]">
      <div className="h-full w-2/5 rounded-full bg-ink" />
    </div>
    <div className="mt-1.5 flex justify-between text-[9px] text-ink-faint">
      <span>1:12</span>
      <span>3:04</span>
    </div>
  </PanelUI>
);

const TarjetaInforme = () => (
  <PanelUI>
    <div className="mb-3 flex items-center gap-2">
      <Heart className="h-3.5 w-3.5 text-[#e5484d]" />
      <span className="text-[11px] font-semibold text-ink">Informe del día</span>
    </div>
    <div className="space-y-2">
      <div className="rounded-xl bg-[#f5f5f7] px-3 py-2">
        <p className="text-[10px] text-ink-faint">Ánimo</p>
        <p className="text-[12px] font-semibold text-ink">Contenta · charló 14 veces</p>
      </div>
      <div className="rounded-xl bg-[#f5f5f7] px-3 py-2">
        <p className="text-[10px] text-ink-faint">Temas del día</p>
        <p className="text-[12px] font-medium leading-snug text-ink">El casamiento de Tomás y el dolor de rodilla</p>
      </div>
      <div className="rounded-xl bg-emerald-500/10 px-3 py-2">
        <p className="text-[11px] font-medium text-emerald-700">Tomó los 3 medicamentos</p>
      </div>
    </div>
  </PanelUI>
);

const TarjetaVision = () => (
  <PanelUI>
    <div className="mb-2.5 flex items-center gap-2">
      <Eye className="h-3.5 w-3.5 text-emerald-600" />
      <span className="text-[11px] font-semibold text-ink">Leyendo</span>
    </div>
    <div className="rounded-xl bg-[#f5f5f7] p-3">
      <div className="space-y-1.5">
        <div className="h-1.5 w-4/5 rounded-full bg-ink/15" />
        <div className="h-1.5 w-full rounded-full bg-ink/15" />
        <div className="h-1.5 w-3/5 rounded-full bg-ink/15" />
      </div>
    </div>
    <p className="mt-2.5 text-[11px] font-medium leading-snug text-ink">
      «Ibuprofeno 400 mg. Un comprimido cada 8 horas.»
    </p>
  </PanelUI>
);

/* ═══════════════════════════════════════════════════════════════════════════
   NAVEGACIÓN
   ═══════════════════════════════════════════════════════════════════════════ */

const Navbar = () => (
  <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/70 backdrop-blur-2xl backdrop-saturate-150">
    <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5">
      <a href="#top" className="flex items-center gap-2">
        <img src="/logo.png" alt="CompañIA" className="h-5 w-5 object-contain" />
        <span className="text-[13px] text-white">
          <Brand iaClassName="text-brand-blue" />
        </span>
      </a>
      <div className="hidden items-center gap-8 lg:flex">
        {[
          ['#escenas', 'Cómo funciona'],
          ['#voces', 'Voces'],
            ['#funciones', 'Funciones'],
          ['#precios', 'Precios'],
          ['#faq', 'Preguntas'],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="text-[12px] text-white/70 transition-colors duration-300 hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
      <BotonLleno href={LATEST_ANDROID_BUILD_URL} tono="azul" className="!px-4 !py-1.5 !text-[12px]">
        Probar gratis
      </BotonLleno>
    </div>
  </nav>
);

/* ═══════════════════════════════════════════════════════════════════════════
   CAPÍTULO 1 — HERO (negro)
   ═══════════════════════════════════════════════════════════════════════════ */

// Iconos que entran volando desde los costados mientras caen las letras del
// titular. Van en los márgenes libres que deja el texto (el titular más ancho
// llega hasta ~x 285-995 en una ventana de 1280), así que nunca lo pisan.
// Solo desde `lg`: más abajo no hay margen y quedarían encima de las palabras.
// Cada icono se sienta en la banda vertical de una parte del titular, y su
// separación del borde depende de cuánto ocupa ESA línea: al lado de "más
// sola." (la línea más ancha) van bien pegados al borde; al lado de "Nunca" o
// del párrafo, que son más angostos, pueden acercarse al centro.
const ICONOS_HERO = [
  { src: '/clock.png',  lado: 'izq', top: 'top-[7rem]',  x: 'left-[6vw]',  tam: 'w-[104px] xl:w-[150px]', delay: 0.3,  flot: 'flotar-a' },
  { src: '/chat.png',   lado: 'der', top: 'top-[6rem]',  x: 'right-[7vw]', tam: 'w-[88px] xl:w-[128px]',  delay: 0.4,  flot: 'flotar-c' },
  { src: '/health.png', lado: 'izq', top: 'top-[19rem]', x: 'left-[2vw]',  tam: 'w-[112px] xl:w-[168px]', delay: 0.52, flot: 'flotar-b' },
  { src: '/note.png',   lado: 'der', top: 'top-[18rem]', x: 'right-[2vw]', tam: 'w-[100px] xl:w-[148px]', delay: 0.62, flot: 'flotar-a' },
  { src: '/radio.png',  lado: 'izq', top: 'top-[31rem]', x: 'left-[7vw]',  tam: 'w-[84px] xl:w-[122px]',  delay: 0.74, flot: 'flotar-c' },
  { src: '/camera.png', lado: 'der', top: 'top-[32rem]', x: 'right-[6vw]', tam: 'w-[96px] xl:w-[140px]',  delay: 0.84, flot: 'flotar-b' },
] as const;

const IconosHero = () => (
  <>
    {ICONOS_HERO.map(({ src, lado, top, x, tam, delay, flot }) => {
      const desde = lado === 'izq' ? -180 : 180;
      return (
        <motion.div
          key={src}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 hidden select-none lg:block ${top} ${x}`}
          initial={{ opacity: 0, x: desde, scale: 0.5, rotate: lado === 'izq' ? -28 : 28 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: lado === 'izq' ? -7 : 7 }}
          transition={{ delay, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={flot}>
            <img src={src} alt="" className={`${tam} h-auto drop-shadow-[0_22px_50px_rgba(0,0,0,0.7)]`} />
          </div>
        </motion.div>
      );
    })}
  </>
);

const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-black px-5 pt-28 pb-20 sm:pt-36">
    <div className="pointer-events-none absolute left-1/2 top-[-14%] -translate-x-1/2">
      <div className="siri-orb respirar h-[560px] w-[560px] sm:h-[900px] sm:w-[900px]" />
    </div>

    <IconosHero />

    <div className="relative z-10 mx-auto max-w-5xl text-center">
      <Entrada>
        <p className="eyebrow mb-8 text-white/45">
          <Brand />
        </p>
      </Entrada>
      <TituloPorLetra lineas={['Nunca', 'más sola.']} className="display" delayInicial={0.15} />
      <Entrada delay={0.85}>
        <p className="copy-lead mx-auto mt-9 max-w-lg text-balance text-white/60">
          Una compañera de voz que escucha, recuerda y cuida a tu ser querido. Y mantiene a toda la familia cerca,
          aunque estén lejos.
        </p>
      </Entrada>
      <Entrada delay={1}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <BotonLleno href={LATEST_ANDROID_BUILD_URL} tono="blanco">
            Probá 7 días gratis
          </BotonLleno>
          <EnlaceFlecha href="#escenas" tono="blanco">
            Ver cómo funciona
          </EnlaceFlecha>
        </div>
      </Entrada>
    </div>

    {/* Collage de dispositivos: entran escalonados y después flotan desfasados.
        La rotación va en un div interno para no pelearse con el transform de
        la animación de flote. */}
    <div className="relative mx-auto mt-20 max-w-4xl">
      <div className="flex items-center justify-center gap-5 sm:gap-7">
        <Entrada delay={1.22} y={54} className="hidden sm:block">
          <div className="flotar-a">
            <div className="w-[168px] -rotate-[7deg] lg:w-[190px]">
              <Telefono>
                <PantallaApp dice="Te aviso a las ocho, quedate tranquila.">
                  <TarjetaRecordatorio />
                </PantallaApp>
              </Telefono>
            </div>
          </div>
        </Entrada>

        <Entrada delay={1.14} y={54} className="relative z-10 shrink-0">
          <div className="flotar-b">
            <div className="w-[240px] sm:w-[248px] lg:w-[268px]">
              <Telefono>
                <PantallaRosita mate />
              </Telefono>
            </div>
          </div>
        </Entrada>

        <Entrada delay={1.3} y={54} className="hidden sm:block">
          <div className="flotar-c">
            <div className="w-[168px] rotate-[7deg] lg:w-[190px]">
              <Telefono>
                <PantallaApp dice="Te dejó un mensaje tu hija Carolina." expresion="feliz">
                  <TarjetaMensajeFamilia />
                </PantallaApp>
              </Telefono>
            </div>
          </div>
        </Entrada>
      </div>
    </div>

    <Entrada delay={1.5} className="relative mt-14 flex flex-col items-center gap-3">
      <div className="flex -space-x-2">
        {[
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=72&h=72&q=80',
          'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=72&h=72&q=80',
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=72&h=72&q=80',
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-7 w-7 rounded-full border-2 border-black object-cover grayscale"
            loading="lazy"
          />
        ))}
      </div>
      <p className="text-xs text-white/40">Familias de Argentina ya la usan</p>
    </Entrada>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   Franja de confianza (negro)
   ═══════════════════════════════════════════════════════════════════════════ */

const Confianza = () => (
  <section className="border-t border-white/[0.07] bg-black py-14">
    <Reveal className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-5 sm:grid-cols-4 sm:gap-6">
      {[
        { icon: ShieldAlert, label: 'Privacidad total', sub: 'Las conversaciones no se almacenan' },
        { icon: Heart, label: 'Hecha en Argentina', sub: 'En castellano rioplatense' },
        { icon: CheckCircle2, label: 'Cancelás cuando querés', sub: 'Sin contratos ni letra chica' },
        { icon: Users, label: 'La familia, conectada', sub: 'Informes y alertas en tiempo real' },
      ].map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex flex-col items-center gap-2.5 text-center">
          <Icon className="h-5 w-5 text-white/40" strokeWidth={1.5} />
          <span className="text-[13px] font-medium text-white">{label}</span>
          <span className="text-[11px] leading-snug text-white/40">{sub}</span>
        </div>
      ))}
    </Reveal>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   ESCENAS — el patrón de la referencia: titular gigante + dispositivo + copy
   ═══════════════════════════════════════════════════════════════════════════ */

const Escena = ({
  id,
  fondo,
  degradado,
  titulo,
  copy,
  visual,
  invertir = false,
}: {
  id?: string;
  fondo: string;
  degradado: string;
  titulo: React.ReactNode;
  copy: React.ReactNode;
  visual: React.ReactNode;
  invertir?: boolean;
}) => (
  <section id={id} className={`overflow-hidden px-5 py-24 sm:py-32 ${fondo}`}>
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <h2 className={`display g-text ${degradado}`}>{titulo}</h2>
      </Reveal>
      <div
        className={`mt-12 flex flex-col items-center gap-12 lg:mt-16 lg:flex-row lg:gap-20 ${
          invertir ? 'lg:flex-row-reverse' : ''
        }`}
      >
        <Reveal delay={0.1} className="w-full lg:flex-1">
          {visual}
        </Reveal>
        <Reveal delay={0.18} className="w-full max-w-md lg:w-[340px] lg:shrink-0">
          <p className="copy-lead text-ink">{copy}</p>
        </Reveal>
      </div>
    </div>
  </section>
);

const EscenaEnCasa = () => (
  <Escena
    id="escenas"
    fondo="bg-scene-violet"
    degradado="g-navy"
    titulo={
      <>
        En
        <br />
        casa.
      </>
    }
    copy={
      <>
        Decile «Hola Rosita» desde cualquier rincón y ya está escuchando. Sin botones, sin menús, sin aprender nada. Ella
        se acuerda de la charla de ayer, de los remedios y de los nombres de todos los nietos.
      </>
    }
    visual={
      <div className="mx-auto w-[240px] sm:w-[280px]">
        <Telefono>
          <PantallaRosita expresion="ternura" />
        </Telefono>
      </div>
    }
  />
);

const EscenaAcompana = () => (
  <Escena
    fondo="bg-scene-teal"
    degradado="g-teal"
    invertir
    titulo={
      <>
        En el
        <br />
        living.
      </>
    }
    copy={
      <>
        Tango, folklore, la radio de siempre. Ta-te-ti, ahorcado y adivinanzas para mantener la cabeza despierta. Todo
        por voz, todo sin levantarse del sillón.
      </>
    }
    visual={
      <div className="mx-auto flex w-full max-w-[520px] items-end justify-center gap-5">
        <div className="w-[190px] sm:w-[215px]">
          <Telefono>
            <PantallaApp dice="Va un tango de los que te gustan." expresion="feliz">
              <TarjetaMusica />
            </PantallaApp>
          </Telefono>
        </div>
        <div className="w-[190px] translate-y-10 sm:w-[215px]">
          <Telefono>
            <PantallaApp dice="Listo, te lo anoté en la lista.">
              <TarjetaLista />
            </PantallaApp>
          </Telefono>
        </div>
      </div>
    }
  />
);

const EscenaFamilia = () => (
  <Escena
    fondo="bg-scene-blue"
    degradado="g-violet"
    titulo={
      <>
        Con la
        <br />
        familia.
      </>
    }
    copy={
      <>
        Los hijos mandan un audio o una foto por Telegram y Rosita se los lee en voz alta. Cada noche, la familia recibe
        un informe: cómo estuvo de ánimo, de qué habló, si tomó los remedios.
      </>
    }
    visual={
      <div className="mx-auto flex w-full max-w-[520px] items-end justify-center gap-5">
        <div className="w-[190px] translate-y-10 sm:w-[215px]">
          <Telefono>
            <PantallaApp dice="Te dejó un mensaje tu hija Carolina." expresion="feliz">
              <TarjetaMensajeFamilia />
            </PantallaApp>
          </Telefono>
        </div>
        <div className="w-[190px] sm:w-[215px]">
          <Telefono>
            <PantallaApp dice="Le mandé el resumen del día a la familia." expresion="ternura">
              <TarjetaInforme />
            </PantallaApp>
          </Telefono>
        </div>
      </div>
    }
  />
);

/* ═══════════════════════════════════════════════════════════════════════════
   CITAS — pares de tarjetas grandes sobre color pleno (la firma de la
   referencia: «Oye Siri, …»)
   ═══════════════════════════════════════════════════════════════════════════ */

const TarjetaCita = ({
  frase,
  tema,
  fondo,
  colorFrase,
  children,
}: {
  frase: string;
  tema: 'claro' | 'oscuro';
  fondo: string;
  colorFrase: string;
  children: React.ReactNode;
}) => (
  <div className={`card relative flex min-h-[440px] flex-col p-8 sm:min-h-[520px] sm:p-10 ${fondo}`}>
    <p className={`display-sm ${tema === 'claro' ? 'text-ink' : 'text-white'}`}>
      <span className={colorFrase}>Rosita,</span> {frase}
    </p>
    <div className="mt-auto pt-10">{children}</div>
  </div>
);

const CitasUno = () => (
  <section className="bg-quote-lavender px-5 py-24 sm:py-28">
    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
      <Reveal>
        <TarjetaCita
          frase="acordate de mi pastilla de la presión"
          tema="oscuro"
          fondo="card-dark"
          colorFrase="g-text g-siri"
        >
          <div className="mx-auto max-w-[300px]">
            <TarjetaRecordatorio />
          </div>
        </TarjetaCita>
      </Reveal>
      <Reveal delay={0.1}>
        <TarjetaCita frase="¿qué dice esta receta?" tema="claro" fondo="card-light" colorFrase="g-text g-violet">
          <div className="mx-auto max-w-[300px]">
            <TarjetaVision />
          </div>
        </TarjetaCita>
      </Reveal>
    </div>
  </section>
);

const CitasDos = () => (
  <section className="bg-quote-aqua px-5 py-24 sm:py-28">
    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
      <Reveal>
        <TarjetaCita frase="poneme un tango" tema="claro" fondo="card-light" colorFrase="g-text g-teal">
          <div className="mx-auto max-w-[300px]">
            <TarjetaMusica />
          </div>
        </TarjetaCita>
      </Reveal>
      <Reveal delay={0.1}>
        <TarjetaCita
          frase="mandale una foto mía a Carolina"
          tema="oscuro"
          fondo="card-dark"
          colorFrase="g-text g-siri"
        >
          <div className="flex items-center justify-center">
            <div className="siri-sphere h-28 w-28 sm:h-36 sm:w-36" />
          </div>
        </TarjetaCita>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   CAPÍTULO SOS (negro profundo)
   ═══════════════════════════════════════════════════════════════════════════ */

const EscenaSOS = ({ onSaberMas }: { onSaberMas: () => void }) => (
  <section className="relative overflow-hidden bg-[#07080c] px-5 py-24 sm:py-32">
    <div className="siri-orb absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 opacity-25" />
    <div className="relative mx-auto max-w-6xl">
      <Reveal>
        <h2 className="display g-text g-coral">
          Si algo
          <br />
          pasa.
        </h2>
      </Reveal>
      <div className="mt-12 flex flex-col items-center gap-12 lg:mt-16 lg:flex-row lg:gap-20">
        <Reveal delay={0.1} className="w-full lg:flex-1">
          <div className="mx-auto w-[230px] sm:w-[260px]">
            <Telefono>
              <PantallaApp dice="Ya avisé a tu familia. Quedate tranquila que vienen." expresion="sorprendida">
                <TarjetaSOS />
              </PantallaApp>
            </Telefono>
          </div>
        </Reveal>
        <Reveal delay={0.18} className="w-full max-w-md lg:w-[360px] lg:shrink-0">
          <p className="copy-lead text-white">
            Un botón, o simplemente decirlo. Si Rosita escucha «me caí», «me duele el pecho» o «ayuda», avisa a toda la
            familia por Telegram con la ubicación — sin esperar a que nadie pregunte.
          </p>
          <div className="mt-8">
            <button
              onClick={onSaberMas}
              className="group inline-flex items-center gap-1 text-[15px] font-medium text-white transition-opacity duration-300 hover:opacity-70"
            >
              Cómo funciona la seguridad
              <ChevronDown className="h-4 w-4 -rotate-90 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   VOCES (negro) — demo de audio
   ═══════════════════════════════════════════════════════════════════════════ */

const Voces = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const voces = [
    {
      id: 'rosita',
      name: 'Rosita',
      desc: 'Cálida y cantarina, con el acento del norte del país.',
      file: '/voz-nortena.mp3',
      fondo:
        'radial-gradient(circle at 22% 12%, rgba(242,144,92,0.3), transparent 58%), radial-gradient(circle at 86% 92%, rgba(167,139,250,0.22), transparent 62%), #0b0a0a',
    },
    {
      id: 'juanchi',
      name: 'Juanchi',
      desc: 'Tranquilo y cercano. El acento de todos los días.',
      file: '/voz-argentino.mp3',
      fondo:
        'radial-gradient(circle at 22% 12%, rgba(92,225,230,0.28), transparent 58%), radial-gradient(circle at 86% 92%, rgba(110,140,255,0.24), transparent 62%), #06090b',
    },
  ];

  const handlePlay = (id: string) => {
    Object.entries(audioRefs.current).forEach(([key, audio]) => {
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
      audio.play().catch(() => setPlaying(null));
      setPlaying(id);
      audio.onended = () => setPlaying(null);
    }
  };

  return (
    <section id="voces" className="bg-black px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="display g-text g-siri">
            Elegí
            <br />
            su voz.
          </h2>
          <p className="copy-lead mt-10 max-w-md text-white/55">
            Dos personalidades, el mismo cuidado. Tocá para escucharlas.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {voces.map((voz, i) => (
            <Reveal key={voz.id} delay={0.1 * i}>
              <div
                className="card relative flex min-h-[340px] flex-col justify-between p-8 sm:min-h-[380px] sm:p-10"
                style={{ background: voz.fondo }}
              >
                <audio
                  ref={(el) => {
                    audioRefs.current[voz.id] = el;
                  }}
                  src={voz.file}
                  preload="none"
                />
                <div>
                  <p className="display-md">
                    <span className="g-text g-siri">{voz.name}</span>
                    <span className="align-super text-[0.32em] font-semibold text-white/40">*</span>
                  </p>
                  <p className="copy-body mt-5 max-w-xs text-white/50">{voz.desc}</p>
                </div>

                <div className="mt-10 flex items-end justify-between gap-6">
                  <div className="siri-sphere h-24 w-24 shrink-0 sm:h-28 sm:w-28" />
                  <button
                    onClick={() => handlePlay(voz.id)}
                    className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-colors duration-300 ${
                      playing === voz.id
                        ? 'bg-white/10 text-white ring-1 ring-white/20'
                        : 'bg-white text-black hover:bg-white/85'
                    }`}
                  >
                    {playing === voz.id ? (
                      <>
                        <Pause className="h-4 w-4" /> Pausar
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" /> Escuchar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Aclaración del asterisco de los nombres */}
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-xl text-[13px] leading-relaxed text-white/35">
            <span className="align-super text-[0.75em]">*</span> Rosita y Juanchi son los nombres por defecto. Podés
            ponerle a tu asistente el nombre que quieras desde la configuración de la app.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   FUNCIONES (blanco)
   ═══════════════════════════════════════════════════════════════════════════ */

const Funciones = ({ onVision, onTelegram }: { onVision: () => void; onTelegram: () => void }) => {
  const principales = [
    { icon: Users, title: 'Conexión familiar', desc: 'Mensajes, fotos e informes fáciles para toda la familia.' },
    { icon: Calendar, title: 'Asistencia de memoria', desc: 'Recordatorios de citas, eventos familiares y medicación.' },
    { icon: Music, title: 'Música y juegos', desc: 'Entretenimiento personalizado y ejercicios mentales.' },
    { icon: Clock, title: 'Recordatorios', desc: 'Avisos diarios para actividades y bienestar.' },
    { icon: Bell, title: 'Alarmas por voz', desc: '«Rosita, despertame mañana a las 8» — sin tocar nada.' },
    { icon: Headphones, title: 'Soporte 24/7', desc: 'Acceso continuo y actualizaciones automáticas.' },
    { icon: UserCheck, title: 'Detección de presencia', desc: 'Rosita nota cuando alguien se acerca y lo saluda.' },
    { icon: Lightbulb, title: 'Casa inteligente', desc: 'Luces y enchufes por voz con SmartThings.' },
    { icon: Radio, title: 'Info en tiempo real', desc: 'Clima, noticias, búsquedas y Wikipedia con una pregunta.' },
  ];

  const accesibilidad = [
    {
      icon: AlertCircle,
      title: 'Botón SOS',
      desc: 'Una pulsación y todos los contactos familiares reciben la alerta por Telegram.',
    },
    {
      icon: Eye,
      title: 'Visión',
      desc: 'Lee cartas y recetas con la cámara, describe lo que ve y narra las fotos de la familia.',
    },
    {
      icon: Subtitles,
      title: 'Subtítulos en pantalla',
      desc: 'Todo lo que dice Rosita aparece en texto grande, en tiempo real.',
    },
  ];

  return (
    <section id="funciones" className="bg-white px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="display g-text g-navy">
            Hace
            <br />
            de todo.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-11 md:grid-cols-2 lg:grid-cols-3">
          {principales.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={0.03 * i} y={14} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-paper-alt">
                <Icon className="h-[18px] w-[18px] text-ink" strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-[14px] leading-snug text-ink-soft">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-ink/10" />
            <span className="eyebrow text-ink-faint">Accesibilidad y seguridad</span>
            <div className="h-px flex-1 bg-ink/10" />
          </Reveal>
          <div className="grid grid-cols-1 gap-x-12 gap-y-11 md:grid-cols-3">
            {accesibilidad.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={0.05 * i} y={14} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-paper-alt">
                  <Icon className="h-[18px] w-[18px] text-ink" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-ink-soft">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-14 flex flex-wrap gap-8">
          <button onClick={onVision} className="group inline-flex items-center gap-1 text-[15px] font-medium text-[#0071e3] transition-opacity hover:opacity-70">
            Más sobre Visión
            <ChevronDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button onClick={onTelegram} className="group inline-flex items-center gap-1 text-[15px] font-medium text-[#0071e3] transition-opacity hover:opacity-70">
            Más sobre la conexión familiar
            <ChevronDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-0.5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   EL PROBLEMA (negro) — números gigantes
   ═══════════════════════════════════════════════════════════════════════════ */

const Problema = () => (
  <section className="relative overflow-hidden bg-black px-5 py-24 sm:py-32">
    <div className="relative mx-auto max-w-6xl">
      <Reveal>
        <p className="eyebrow mb-8 text-white/40">El problema</p>
        <h2 className="display-md max-w-3xl text-balance text-white">
          Millones de personas mayores viven en silencio cada día.
        </h2>
        <p className="copy-body mt-8 max-w-xl text-white/50">
          El aislamiento en adultos mayores no es solo un problema emocional — es una crisis de salud pública con
          consecuencias médicas, cognitivas y económicas comprobadas.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-20 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
        {[
          { num: '1 de cada 3', label: 'adultos mayores vive solo en América Latina', source: 'CEPAL 2023' },
          { num: '+50%', label: 'más riesgo de demencia por aislamiento social', source: 'The Lancet 2022' },
          { num: '29%', label: 'mayor riesgo de enfermedad cardíaca por soledad', source: 'AHA 2023' },
          { num: 'USD +400', label: 'costo mensual promedio de cuidado domiciliario', source: 'OPS 2023' },
        ].map(({ num, label, source }) => (
          <div key={num}>
            <div className="display-sm text-white">{num}</div>
            <p className="mt-4 text-[14px] leading-snug text-white/55">{label}</p>
            <p className="mt-3 text-[11px] text-white/25">{source}</p>
          </div>
        ))}
      </Reveal>

      <div className="mt-20 grid items-stretch gap-5 lg:grid-cols-5">
        <Reveal delay={0.1} className="card relative min-h-[300px] overflow-hidden lg:col-span-2">
          <img
            src="https://res.cloudinary.com/dy1ll1azp/image/upload/f_auto,q_auto,w_900/v1774358430/Gemini_Generated_Image_6le1b46le1b46le1_im5jf3.png"
            alt="Adulta mayor sola en su hogar"
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
          {[
            { stat: '130.000', desc: 'nuevos casos de demencia por año solo en Argentina', sub: 'Alzheimer Argentina' },
            { stat: '40%', desc: 'no toma sus medicamentos correctamente por olvido o confusión', sub: 'OMS 2021' },
            { stat: '32%', desc: 'más riesgo de sufrir un ACV en personas socialmente aisladas', sub: 'JAMA 2022' },
            { stat: '60%', desc: 'de familiares cuidadores se sienten desbordados', sub: 'INDEC 2022' },
          ].map(({ stat, desc, sub }, i) => (
            <Reveal key={stat} delay={0.05 * i} className="card card-glass flex flex-col gap-2 p-6">
              <div className="text-2xl font-semibold tracking-tight text-white">{stat}</div>
              <p className="text-[13px] leading-snug text-white/50">{desc}</p>
              <p className="mt-auto pt-2 text-[11px] text-white/25">{sub}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1} className="mt-20 text-center">
        <p className="display-sm mx-auto max-w-3xl text-balance text-white">
          La tecnología existe. Lo que faltaba era una solución diseñada para quienes más la necesitan.
        </p>
        <p className="copy-lead mt-6">
          <span className="g-text g-siri">
            <Brand /> es esa solución.
          </span>
        </p>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIOS (gris claro)
   ═══════════════════════════════════════════════════════════════════════════ */

const Testimonios = () => (
  <section className="bg-paper-alt px-5 py-24 sm:py-32">
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <h2 className="display g-text g-navy">
          Lo que
          <br />
          dicen.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3">
        {[
          {
            name: 'Carolina R.',
            rol: 'Hija',
            text: 'CompañIA le devolvió la sonrisa a mi mamá. Saber que no está sola es un alivio enorme para toda la familia.',
            img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=104&h=104&q=80',
          },
          {
            name: 'Martha G.',
            rol: 'Abuela',
            text: 'Nunca pensé que iba a poder charlar así con alguien a las tres de la mañana. CompañIA siempre está.',
            img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=104&h=104&q=80',
          },
          {
            name: 'Tomás V.',
            rol: 'Nieto',
            text: 'Desde que tiene CompañIA, la abuela llama más tranquila y nosotros dormimos mejor. Vale cada peso.',
            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=104&h=104&q=80',
          },
        ].map((t, i) => (
          <Reveal key={t.name} delay={0.08 * i}>
            <div className="mb-5 flex gap-1">
              {[...Array(5)].map((_, si) => (
                <span key={si} className="text-[15px] text-[#f2905c]">
                  ★
                </span>
              ))}
            </div>
            <p className="display-sm !text-[1.35rem] !leading-snug text-balance text-ink">«{t.text}»</p>
            <div className="mt-6 flex items-center gap-3">
              <img src={t.img} alt="" className="h-10 w-10 rounded-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
              <div>
                <div className="text-[14px] font-semibold text-ink">{t.name}</div>
                <div className="text-[12px] text-ink-faint">{t.rol}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-24 grid grid-cols-2 gap-10 border-t border-ink/10 pt-16 md:grid-cols-4">
        {[
          { value: '5 min', label: 'Y ya estaban interactuando' },
          { value: '87%', label: 'Uso diario activo' },
          { value: '★★★★★', label: 'Valoración promedio' },
          { value: '24/7', label: 'Siempre disponible' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="display-sm text-ink">{s.value}</div>
            <div className="mt-3 text-[13px] text-ink-soft">{s.label}</div>
          </div>
        ))}
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   PARA QUIÉN (blanco)
   ═══════════════════════════════════════════════════════════════════════════ */

const ParaQuien = () => (
  <section className="bg-white px-5 py-24 sm:py-32">
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <h2 className="display g-text g-violet">
          Para
          <br />
          quién.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {[
          {
            titulo: 'Para adultos mayores',
            destacado: false,
            items: [
              'Compañía y conversación diaria',
              'Recordatorios de medicación y citas',
              'Música y juegos cognitivos',
              'Botón SOS de emergencia',
              'Contacto fácil con la familia',
            ],
          },
          {
            titulo: 'Para hijos e hijas',
            destacado: true,
            items: [
              'Informes de bienestar diarios',
              'Alertas ante emergencias',
              'Mensajes y fotos por Telegram',
              'Estado emocional en tiempo real',
              'Tranquilidad aunque estés lejos',
            ],
          },
          {
            titulo: 'Para cuidadores',
            destacado: false,
            items: [
              'Asistente siempre disponible',
              'Menos carga operativa',
              'Registro de actividad diaria',
              'Alertas ante cambios de ánimo',
              'Comunicación fluida con la familia',
            ],
          },
        ].map(({ titulo, items, destacado }, i) => (
          <Reveal key={titulo} delay={0.08 * i}>
            <div className={`card h-full p-8 ${destacado ? 'bg-ink text-white' : 'card-paper'}`}>
              <h3 className={`text-[17px] font-semibold ${destacado ? 'text-white' : 'text-ink'}`}>{titulo}</h3>
              <ul className="mt-6 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 shrink-0 ${destacado ? 'text-brand-blue' : 'text-emerald-500'}`}
                    />
                    <span className={`text-[14px] leading-snug ${destacado ? 'text-white/75' : 'text-ink-soft'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   COMPARATIVA (gris claro)
   ═══════════════════════════════════════════════════════════════════════════ */

const Comparativa = () => {
  const filas = [
    'Disponible 24/7',
    'Habla en castellano rioplatense',
    'Recordatorios activos',
    'Alarmas por voz (sin tocar la pantalla)',
    'Alertas de emergencia a la familia',
    'Estimulación cognitiva',
    'Informes a la familia',
    'Sin capacitación técnica',
    'Música y radio en streaming',
    'Listas por voz (compras, tareas)',
    'Control del hogar por voz',
    'Fotos de familia narradas en voz alta',
    'Lee textos y documentos',
    'Autofoto directo a la familia',
    'Subtítulos en pantalla',
  ];
  const columnas = [
    { name: 'CompañIA', precio: 'desde USD 19', destacado: true,  valores: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true] },
    { name: 'Ato',      precio: '$29 + hardware', destacado: false, valores: [true, false, true, true, false, false, true, true, true, true, false, false, false, false, false] },
    { name: 'Cuidador', precio: 'USD 400-1.200',  destacado: false, valores: [false, true, true, false, true, false, false, false, true, false, true, false, true, false, true] },
    { name: 'Videollamada', precio: 'Gratis',     destacado: false, valores: [false, true, false, false, false, false, false, false, true, false, false, false, false, false, false] },
    { name: 'Teléfono', precio: 'Gratis',         destacado: false, valores: [false, true, false, false, false, false, false, false, true, false, false, false, false, false, false] },
  ];

  return (
    <section className="overflow-hidden bg-paper-alt px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="display g-text g-navy">
            Por qué
            <br />
            ella.
          </h2>
          <p className="copy-lead mt-10 max-w-md text-ink">Comparada con las alternativas de siempre.</p>
        </Reveal>

        <Reveal delay={0.1} className="no-scrollbar mt-14 overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 overflow-hidden rounded-[28px] bg-white">
            <thead>
              <tr>
                <th className="p-5 text-left text-[13px] font-medium text-ink-faint">Función</th>
                {columnas.map((col) => (
                  <th
                    key={col.name}
                    className={`p-5 text-center text-[13px] font-semibold ${
                      col.destacado ? 'bg-ink text-white' : 'text-ink-soft'
                    }`}
                  >
                    {col.destacado ? <Brand iaClassName="text-brand-blue" /> : col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((fila, fi) => (
                <tr key={fila}>
                  <td className="border-t border-ink/[0.07] p-4 text-[13.5px] font-medium text-ink">{fila}</td>
                  {columnas.map((col) => (
                    <td
                      key={col.name}
                      className={`border-t border-ink/[0.07] p-4 text-center ${col.destacado ? 'bg-[#5ce1e6]/[0.09]' : ''}`}
                    >
                      {col.valores[fi] ? (
                        <Check
                          className={`mx-auto h-4 w-4 ${col.destacado ? 'text-[#0f9aa1]' : 'text-emerald-500'}`}
                          strokeWidth={2.5}
                        />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-ink/20" strokeWidth={2.5} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="border-t border-ink/[0.07] p-5 text-[13.5px] font-semibold text-ink">Precio mensual</td>
                {columnas.map((col) => (
                  <td
                    key={col.name}
                    className={`border-t border-ink/[0.07] p-5 text-center text-[13px] ${
                      col.destacado ? 'bg-[#5ce1e6]/[0.09] font-semibold text-ink' : 'font-medium text-ink-soft'
                    }`}
                  >
                    {col.precio}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   PRECIOS + CONTACTO (blanco)
   ═══════════════════════════════════════════════════════════════════════════ */

const Precios = () => {
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

  const comunes = [
    'Conexión familiar ilimitada',
    'Botón SOS y recordatorios',
    'Música y juegos cognitivos',
    'Informe de bienestar diario',
    'Integración con Telegram',
  ];

  const planes = [
    {
      etiqueta: 'Prueba gratuita',
      precio: 'Gratis',
      periodo: '/ 7 días',
      desc: 'Todas las funciones del plan Companion, sin costo ni tarjeta.',
      items: ['Voz premium ultra-natural', ...comunes],
      cta: 'Probar 7 días gratis',
      destacado: false,
    },
    {
      etiqueta: 'Starter',
      precio: 'USD 19',
      periodo: '/mes',
      desc: 'Motor de voz nativo de Android. Ideal para empezar.',
      items: ['Voz nativa Android', ...comunes],
      cta: 'Elegir Starter',
      destacado: false,
    },
    {
      etiqueta: 'Companion',
      precio: 'USD 29',
      periodo: '/mes',
      desc: 'Voz premium ultra-natural. La experiencia completa.',
      items: ['Voz premium ultra-natural', ...comunes],
      cta: 'Elegir Companion',
      destacado: true,
    },
  ];

  return (
    <section id="precios" className="bg-white px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="display g-text g-navy">
            Planes
            <br />
            y precios.
          </h2>
          <p className="copy-lead mt-10 max-w-md text-ink">
            Empezá gratis. Sin tarjeta de crédito. Cancelás cuando quieras.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-5 md:grid-cols-3">
          {planes.map((plan, i) => (
            <Reveal key={plan.etiqueta} delay={0.08 * i}>
              <div
                className={`card relative flex h-full flex-col p-8 ${plan.destacado ? 'bg-ink text-white' : 'card-paper'}`}
              >
                {plan.destacado && (
                  <span className="absolute right-6 top-6 rounded-full bg-brand-blue px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#06232c]">
                    Más elegido
                  </span>
                )}
                <div className={`eyebrow ${plan.destacado ? 'text-white/50' : 'text-ink-faint'}`}>{plan.etiqueta}</div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className={`text-[2rem] font-semibold tracking-tight ${plan.destacado ? 'text-white' : 'text-ink'}`}>
                    {plan.precio}
                  </span>
                  <span className={`text-[15px] ${plan.destacado ? 'text-white/50' : 'text-ink-faint'}`}>
                    {plan.periodo}
                  </span>
                </div>
                <p className={`mt-3 text-[13.5px] leading-snug ${plan.destacado ? 'text-white/60' : 'text-ink-soft'}`}>
                  {plan.desc}
                </p>
                <ul className="mt-7 flex-1 space-y-2.5">
                  {plan.items.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${plan.destacado ? 'text-brand-blue' : 'text-emerald-500'}`}
                      />
                      <span className={`text-[13.5px] leading-snug ${plan.destacado ? 'text-white/75' : 'text-ink-soft'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={LATEST_ANDROID_BUILD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 block rounded-full py-3 text-center text-[15px] font-medium transition-colors duration-300 ${
                    plan.destacado
                      ? 'bg-white text-ink hover:bg-white/85'
                      : 'bg-[#0071e3] text-white hover:bg-[#0077ed]'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Contacto */}
        <Reveal delay={0.1} className="mx-auto mt-24 max-w-2xl">
          <h3 className="display-sm text-center text-ink">¿Tenés alguna pregunta?</h3>
          {sent ? (
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/12">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <p className="text-[18px] font-semibold text-ink">¡Mensaje enviado!</p>
              <p className="text-[15px] text-ink-soft">Te respondemos a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-3">
              <input type="hidden" name="_subject" value="Nueva consulta desde CompañIA" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  required
                  className="w-full rounded-2xl bg-paper-alt px-5 py-3.5 text-[15px] text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Tu correo"
                  required
                  className="w-full rounded-2xl bg-paper-alt px-5 py-3.5 text-[15px] text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40"
                />
              </div>
              <textarea
                name="mensaje"
                placeholder="Tu mensaje…"
                rows={4}
                required
                className="w-full resize-none rounded-2xl bg-paper-alt px-5 py-3.5 text-[15px] text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40"
              />
              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0071e3] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#0077ed] disabled:cursor-wait disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {sending ? 'Enviando…' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ (gris claro)
   ═══════════════════════════════════════════════════════════════════════════ */

const FilaFAQ = ({ pregunta, respuesta }: { pregunta: string; respuesta: string }) => {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="border-b border-ink/10 last:border-0">
      <button onClick={() => setAbierto(!abierto)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
        <span className="text-[16px] font-medium text-ink sm:text-[18px]">{pregunta}</span>
        {abierto ? (
          <Minus className="h-5 w-5 shrink-0 text-ink-faint" />
        ) : (
          <Plus className="h-5 w-5 shrink-0 text-ink-faint" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink-soft">{respuesta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [tab, setTab] = useState('General');
  const porTab: Record<string, { q: string; a: string }[]> = {
    General: [
      { q: '¿Es difícil de configurar para un adulto mayor?', a: 'No. CompañIA fue diseñada desde cero para ser accesible. La configuración la hace un familiar una sola vez. A partir de ahí, tu ser querido solo necesita hablar: no hay pantallas complicadas ni menús difíciles.' },
      { q: '¿En qué dispositivos funciona?', a: 'CompañIA funciona como aplicación móvil en Android. Se instala en cualquier tablet o smartphone. Lo ideal es dejarlo fijo en un lugar cómodo de la casa, enchufado y siempre disponible.' },
    ],
    Técnica: [
      { q: '¿Qué pasa si no hay internet?', a: 'Algunas funciones básicas siguen disponibles sin conexión. Para las funciones de IA, voz y mensajes con la familia se necesita conexión a internet, preferentemente WiFi.' },
      { q: '¿Necesito instalar algo en mi teléfono?', a: 'Los familiares reciben los mensajes, fotos e informes directamente por Telegram, que ya usan en el día a día. No hace falta instalar nada adicional.' },
    ],
    Privacidad: [
      { q: '¿Cómo se protegen los datos de mi familiar?', a: 'Los datos viajan cifrados y nunca se venden a terceros. Los audios de voz se procesan en tiempo real y no se almacenan. Cumplimos con las normativas de protección de datos de Argentina.' },
      { q: '¿Quién puede escuchar las conversaciones?', a: 'Nadie. Las conversaciones son privadas entre tu familiar y CompañIA. Los familiares solo reciben los resúmenes de bienestar que el propio sistema genera, no las conversaciones completas.' },
    ],
    Precios: [
      { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí, sin penalidades ni letra chica. Podés cancelar la suscripción cuando quieras desde la app o enviándonos un mensaje.' },
      { q: '¿La prueba gratuita requiere tarjeta de crédito?', a: 'No. Podés probar CompañIA gratis durante 7 días con todas las funciones del plan Companion, sin ingresar ningún dato de pago.' },
    ],
  };

  return (
    <section id="faq" className="bg-paper-alt px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="display g-text g-navy">
            Preguntas
            <br />
            frecuentes.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 flex flex-wrap gap-2">
          {Object.keys(porTab).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-[14px] font-medium transition-colors duration-300 ${
                tab === t ? 'bg-ink text-white' : 'bg-white text-ink-soft hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <div className="card card-light px-7 sm:px-9">
            {porTab[tab].map((f) => (
              <FilaFAQ key={f.q} pregunta={f.q} respuesta={f.a} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="card bg-ink p-8 sm:p-12">
            <h3 className="display-sm text-white">¿Seguís con dudas?</h3>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="mailto:maximilianovalli.sc@gmail.com"
                className="rounded-full bg-white px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-white/85"
              >
                Escribinos
              </a>
              <a
                href="https://wa.me/543408677294"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-white transition-opacity hover:opacity-70"
              >
                <Smartphone className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   CIERRE DE PRIVACIDAD (negro) — el remate discreto de la referencia
   ═══════════════════════════════════════════════════════════════════════════ */

const CierrePrivacidad = () => (
  <section className="relative overflow-hidden bg-black px-5 py-28 sm:py-36">
    <div className="siri-orb absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-25" />
    <Reveal className="relative mx-auto max-w-2xl text-center">
      <img src="/logo.png" alt="" className="mx-auto mb-10 h-14 w-14 rounded-2xl object-contain" />
      <h2 className="display-md text-balance text-white">La compañía más discreta.</h2>
      <p className="copy-body mx-auto mt-9 text-white/55">
        Rosita aprende de tu ser querido, pero nadie más escucha. El audio se transcribe en el momento y se descarta: las
        conversaciones no se guardan en ningún servidor. El perfil, los gustos y los recuerdos viven en el dispositivo.
        La familia recibe resúmenes de bienestar, nunca la charla completa. Y por supuesto, no se comparte nada con
        anunciantes.
      </p>
      <div className="mt-10">
        <BotonLleno href={LATEST_ANDROID_BUILD_URL} tono="blanco">
          Probá 7 días gratis
        </BotonLleno>
      </div>
    </Reveal>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MODALES
   Hojas blancas, tipográficas, con el mismo lenguaje que el resto del sitio:
   antetítulo + titular grande + texto. Sin cabeceras de color ni chips de
   iconos, que era lo que los hacía parecer de otra web.
   ═══════════════════════════════════════════════════════════════════════════ */

const Modal = ({
  onClose,
  children,
  ancho = 'max-w-lg',
}: {
  onClose: () => void;
  children: React.ReactNode;
  ancho?: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 16 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className={`card relative w-full ${ancho} bg-white shadow-2xl`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* z-30: por encima de TODO el contenido de la hoja. Antes el encabezado
          tenía z-10 y le robaba el clic a este botón. */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.06] transition-colors hover:bg-ink/[0.14]"
        aria-label="Cerrar"
      >
        <X className="h-4 w-4 text-ink-soft" />
      </button>
      {/* La hoja entera scrollea: así ningún texto queda cortado detrás de un pie fijo. */}
      <div className="max-h-[86vh] overflow-y-auto px-7 py-9 sm:px-10 sm:py-11">{children}</div>
    </motion.div>
  </motion.div>
);

const EncabezadoModal = ({
  antetitulo,
  titulo,
  bajada,
}: {
  antetitulo: string;
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
}) => (
  <div className="pr-10">
    <p className="eyebrow text-ink-faint">{antetitulo}</p>
    <h3 className="display-sm mt-3 text-balance text-ink">{titulo}</h3>
    {bajada && <p className="copy-body mt-5 text-ink-soft">{bajada}</p>}
  </div>
);

const ListaModal = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-9 divide-y divide-ink/10">{children}</div>
);

const ItemModal = ({ titulo, children }: { titulo: string; children: React.ReactNode }) => (
  <div className="py-6 first:pt-0 last:pb-0">
    <h4 className="text-[16px] font-semibold tracking-tight text-ink">{titulo}</h4>
    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{children}</p>
  </div>
);

const CtaModal = () => (
  <a
    href={LATEST_ANDROID_BUILD_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-10 block rounded-full bg-[#0071e3] py-3.5 text-center text-[15px] font-medium text-white transition-colors hover:bg-[#0077ed]"
  >
    Descargar y probar
  </a>
);

const ModalSOS = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <EncabezadoModal
      antetitulo="Seguridad"
      titulo="Protegida las 24 horas."
      bajada="Cuatro capas que trabajan juntas para que ninguna situación de riesgo pase desapercibida."
    />
    <ListaModal>
      <ItemModal titulo="Botón SOS">
        <Brand /> incluye un botón SOS dentro de la app. La{' '}
        <span className="font-medium text-ink">pulsera SOS física</span> (se vende por separado) suma detección
        automática de caídas: si detecta una caída brusca, activa el protocolo de emergencia sin que el adulto mayor
        tenga que hacer nada. En ambos casos, la familia recibe la alerta de inmediato por Telegram.
      </ItemModal>
      <ItemModal titulo="Detección de frases de alerta">
        <Brand /> analiza el lenguaje en tiempo real. Si detecta frases como{' '}
        <span className="font-medium text-ink">«me duele el pecho»</span>,{' '}
        <span className="font-medium text-ink">«me caí»</span> o{' '}
        <span className="font-medium text-ink">«ayuda»</span>, notifica automáticamente a la familia con el contexto de
        la conversación.
      </ItemModal>
      <ItemModal titulo="Alertas silenciosas">
        Además del SOS, la familia recibe notificaciones si el adulto mayor no interactuó con el dispositivo por un
        período inusual, o si hay cambios bruscos en sus patrones de conversación diaria.
      </ItemModal>
      <ItemModal titulo="Ubicación en la alerta">
        Cada aviso llega con la ubicación exacta, así quien esté más cerca puede llegar primero.
      </ItemModal>
    </ListaModal>
    <CtaModal />
  </Modal>
);

const ModalVision = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <EncabezadoModal
      antetitulo="Visión"
      titulo="Sus ojos cuando los necesita."
      bajada="La cámara al servicio de quien ya no ve tan bien de cerca."
    />
    <ListaModal>
      <ItemModal titulo="Lectura de textos y documentos">
        ¿Una carta, una receta, una boleta? Solo decile <span className="italic">«Rosita, ¿qué dice acá?»</span> y
        apuntá el teléfono. La cámara trasera se activa sola con una cuenta regresiva y lee todo el texto en voz alta.
      </ItemModal>
      <ItemModal titulo="Fotos de la familia narradas">
        Cuando la familia manda una foto por Telegram, <Brand /> la describe en voz alta:{' '}
        <span className="italic">«Tu hija te manda una foto de los chicos en la plaza.»</span> No hace falta ver la
        pantalla.
      </ItemModal>
      <ItemModal titulo="Foto para la familia sin tocar nada">
        Decile <span className="italic">«Sacame una foto»</span> y <Brand /> avisa, abre la cámara frontal, cuenta tres
        segundos y la manda directo a la familia por Telegram. Siempre avisa antes: nunca saca una foto en silencio.
      </ItemModal>
    </ListaModal>
    <CtaModal />
  </Modal>
);

const ModalTelegram = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <EncabezadoModal
      antetitulo="Conexión familiar"
      titulo="La familia presente, sin esfuerzo."
      bajada="Todo pasa por Telegram, que la familia ya usa. Del lado del adulto mayor no hay ninguna app que aprender."
    />
    <ListaModal>
      <ItemModal titulo="Mensajes de voz de la familia">
        Los familiares mandan audios desde Telegram y <Brand /> los reproduce en voz alta:{' '}
        <span className="italic">«Tenés un mensaje de tu hijo Juan.»</span>
      </ItemModal>
      <ItemModal titulo="Informes diarios automáticos">
        Cada día la familia recibe un resumen del estado de ánimo, los temas de conversación, los recordatorios
        completados y cualquier alerta relevante.
      </ItemModal>
      <ItemModal titulo="Sin apps ni pantallas para el mayor">
        El adulto mayor no necesita tocar ninguna aplicación. Solo habla con <Brand />. Toda la coordinación familiar
        ocurre del lado de la familia.
      </ItemModal>
    </ListaModal>
    <CtaModal />
  </Modal>
);

const ModalSobreNosotros = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <EncabezadoModal
      antetitulo="Nuestra historia"
      titulo={
        <>
          Hecha con amor.
          <br />
          Inspirada en Negrita.
        </>
      }
    />
    <div className="mt-9 space-y-4 text-[14.5px] leading-relaxed text-ink-soft">
      <p>
        <Brand className="text-ink" /> nació de una historia real.
      </p>
      <p>
        <span className="font-medium text-ink">Negrita tiene 90 años y vive sola.</span> Es la abuela de Maximiliano, el
        creador de esta app. Un día, después de visitarla, Maxi volvió a casa con esa sensación que conocen muchos
        nietos: la de dejar a alguien que querés en silencio.
      </p>
      <p>
        No era solo la soledad. Era que Negrita se perdía los medicamentos, no recordaba las fechas importantes, y cuando
        quería hablar, no siempre había alguien disponible.
      </p>
      <p>
        <Brand className="text-ink" /> empezó como una idea simple:{' '}
        <span className="italic">¿y si Negrita tuviera alguien con quien charlar a las tres de la mañana?</span>
      </p>
      <p>
        Hoy, <Brand className="text-ink" /> es esa compañera. No es un robot ni una pantalla fría — es una voz cálida que
        escucha, recuerda y cuida. Pensada para todas las Negritas del mundo.
      </p>
      <p className="border-t border-ink/10 pt-5 text-[13px] text-ink-faint">
        CompañIA es un proyecto independiente desarrollado en Argentina.
      </p>
    </div>
  </Modal>
);

const ModalTerminos = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <EncabezadoModal antetitulo="Última actualización: marzo 2026" titulo="Términos de servicio." />
    <ListaModal>
      <ItemModal titulo="1. El servicio">
        <Brand className="text-ink" /> es una aplicación de asistente de voz con IA para adultos mayores. Incluye
        conversación por voz, recordatorios, alertas a familiares y funciones de accesibilidad.
      </ItemModal>
      <ItemModal titulo="2. Suscripción">
        El costo es de <span className="font-medium text-ink">USD 19 (Starter) o USD 29 (Companion) por mes</span> por
        dispositivo. Podés cancelar en cualquier momento sin penalidad; el acceso se mantiene hasta el fin del período
        pagado.
      </ItemModal>
      <ItemModal titulo="3. Uso aceptable">
        El servicio es para uso personal y familiar. No está permitido revender, redistribuir ni usar la app con fines
        comerciales sin autorización expresa.
      </ItemModal>
      <ItemModal titulo="4. No reemplaza atención médica">
        <Brand className="text-ink" /> no es un dispositivo médico ni reemplaza el criterio de un profesional de la
        salud. Los recordatorios de medicamentos son un apoyo, no una garantía de adherencia al tratamiento.
      </ItemModal>
      <ItemModal titulo="5. Disponibilidad">
        Nos comprometemos a mantener el servicio disponible de forma continua, pero no garantizamos disponibilidad del
        100%. Podemos realizar tareas de mantenimiento con aviso previo.
      </ItemModal>
      <ItemModal titulo="6. Modificaciones">
        Podemos actualizar estas condiciones con 30 días de aviso. El uso continuado implica la aceptación de los
        cambios.
      </ItemModal>
      <ItemModal titulo="7. Contacto">
        Para consultas escribí a{' '}
        <a href="mailto:maximilianovalli.sc@gmail.com" className="text-[#0071e3] underline">
          maximilianovalli.sc@gmail.com
        </a>
      </ItemModal>
    </ListaModal>
  </Modal>
);

const ModalPrivacidad = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <EncabezadoModal antetitulo="Última actualización: marzo 2026" titulo="Política de privacidad." />
    <ListaModal>
      <ItemModal titulo="¿Qué es CompañIA?">
        Una aplicación de asistente de voz para adultos mayores. Permite conversar por voz, recibir recordatorios de
        medicamentos, escuchar música y mantenerse en contacto con familiares mediante Telegram.
      </ItemModal>
      <ItemModal titulo="Datos que recopilamos">
        <span className="font-medium text-ink">Voz y audio:</span> el audio se envía a Deepgram para transcripción y se
        descarta de inmediato. No se almacena.
        <br />
        <span className="font-medium text-ink">Ubicación:</span> solo para obtener el clima local (OpenWeather). No se
        comparte ni almacena.
        <br />
        <span className="font-medium text-ink">Perfil:</span> nombre, gustos, medicamentos y fechas se guardan
        únicamente en el dispositivo. Las conversaciones no se almacenan en ningún servidor.
        <br />
        <span className="font-medium text-ink">ID de dispositivo:</span> un identificador anónimo para vincular el
        dispositivo con tu familia. No contiene información personal.
      </ItemModal>
      <ItemModal titulo="Datos que no recopilamos">
        No recopilamos nombre, correo, edad ni teléfono. No hay cuentas de usuario. No vendemos datos a terceros.
      </ItemModal>
      <ItemModal titulo="Servicios de terceros">
        OpenAI y Google Gemini (respuestas IA) · Deepgram (transcripción) · Fish Audio (síntesis de voz, sin
        almacenamiento) · OpenWeather (clima) · Telegram (mensajes familiares) · Samsung SmartThings (domótica,
        opcional).
      </ItemModal>
      <ItemModal titulo="Seguridad">
        Toda la comunicación usa HTTPS. Las claves de API nunca están en el dispositivo.
      </ItemModal>
      <ItemModal titulo="Contacto">
        Consultas o eliminación de datos:{' '}
        <a href="mailto:maximilianovalli.sc@gmail.com" className="text-[#0071e3] underline">
          maximilianovalli.sc@gmail.com
        </a>
      </ItemModal>
    </ListaModal>
  </Modal>
);

const ModalSoporte = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose} ancho="max-w-md">
    <EncabezadoModal antetitulo="Soporte" titulo="Estamos para ayudarte." bajada="Respondemos en menos de 24 horas." />
    <div className="mt-9 space-y-3">
      <a
        href="mailto:maximilianovalli.sc@gmail.com"
        className="flex items-center justify-between gap-4 rounded-2xl bg-paper-alt p-5 transition-colors hover:bg-ink/[0.07]"
      >
        <div>
          <p className="text-[15px] font-semibold text-ink">Correo electrónico</p>
          <p className="mt-0.5 text-[13px] text-ink-soft">maximilianovalli.sc@gmail.com</p>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 -rotate-90 text-ink-faint" />
      </a>
      <a
        href="https://wa.me/543408677294"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-4 rounded-2xl bg-paper-alt p-5 transition-colors hover:bg-ink/[0.07]"
      >
        <div>
          <p className="text-[15px] font-semibold text-ink">WhatsApp</p>
          <p className="mt-0.5 text-[13px] text-ink-soft">+54 340 867-7294</p>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 -rotate-90 text-ink-faint" />
      </a>
    </div>
  </Modal>
);

/* ═══════════════════════════════════════════════════════════════════════════
   PIE DE PÁGINA
   ═══════════════════════════════════════════════════════════════════════════ */

const Footer = ({
  onAbrir,
}: {
  onAbrir: (m: 'about' | 'terminos' | 'privacidad' | 'soporte') => void;
}) => (
  <footer className="bg-paper-alt px-5 pb-16 pt-14">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="" className="h-7 w-7 object-contain" />
          <span className="text-[15px] text-ink">
            <Brand />
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[13px] text-ink-soft">
          <button onClick={() => onAbrir('about')} className="transition-colors hover:text-ink">
            Sobre nosotros
          </button>
          <button onClick={() => onAbrir('terminos')} className="transition-colors hover:text-ink">
            Términos
          </button>
          <button onClick={() => onAbrir('privacidad')} className="transition-colors hover:text-ink">
            Privacidad
          </button>
          <button onClick={() => onAbrir('soporte')} className="transition-colors hover:text-ink">
            Soporte
          </button>
          <a
            href="/services/manual-uso.html"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            Manual de uso
          </a>
        </div>
      </div>
      <div className="mt-10 border-t border-ink/10 pt-6 text-center text-[12px] text-ink-faint md:text-left">
        © 2026 CompañIA. Hecho con ❤️ inspirados en «Negrita».
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════ */

type ModalId = 'sos' | 'vision' | 'telegram' | 'about' | 'terminos' | 'privacidad' | 'soporte' | null;

export default function App() {
  const [modal, setModal] = useState<ModalId>(null);

  // Escape cierra cualquier modal; mientras hay uno abierto, el fondo no scrollea.
  useEffect(() => {
    if (!modal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null);
    };
    window.addEventListener('keydown', handler);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = overflowPrevio;
    };
  }, [modal]);

  const cerrar = () => setModal(null);

  return (
    <>
      <div className="min-h-screen bg-black">
        <Navbar />
        <main>
          <Hero />
          <Confianza />
          <EscenaEnCasa />
          <CitasUno />
          <EscenaAcompana />
          <CitasDos />
          <EscenaFamilia />
          <EscenaSOS onSaberMas={() => setModal('sos')} />
          <Voces />
          <Funciones onVision={() => setModal('vision')} onTelegram={() => setModal('telegram')} />
          <Problema />
          <Testimonios />
          <ParaQuien />
          <Comparativa />
          <Precios />
          <FAQ />
          <CierrePrivacidad />
        </main>
        <Footer onAbrir={(m) => setModal(m)} />
      </div>

      <AnimatePresence>
        {modal === 'sos' && <ModalSOS key="sos" onClose={cerrar} />}
        {modal === 'vision' && <ModalVision key="vision" onClose={cerrar} />}
        {modal === 'telegram' && <ModalTelegram key="telegram" onClose={cerrar} />}
        {modal === 'about' && <ModalSobreNosotros key="about" onClose={cerrar} />}
        {modal === 'terminos' && <ModalTerminos key="terminos" onClose={cerrar} />}
        {modal === 'privacidad' && <ModalPrivacidad key="privacidad" onClose={cerrar} />}
        {modal === 'soporte' && <ModalSoporte key="soporte" onClose={cerrar} />}
      </AnimatePresence>
    </>
  );
}
