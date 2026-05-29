import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const APP_NAME     = 'CompañIA';
const IA_START     = 6;    // C,o,m,p,a,ñ → serif | I,A → sans naranja
const LETTER_DELAY = 0.4;
const LETTER_STEP  = 0.08;
const TOTAL_MS     = 2800; // duración de la animación desde que todo está listo
const FONTS_TIMEOUT = 1500;
const IMAGE_TIMEOUT = 3000;

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible,    setVisible]    = useState(true);
  const [imageReady, setImageReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const ready = imageReady && fontsReady;

  // Precargar imagen imperatitvamente (independiente del render)
  useEffect(() => {
    let cancelled = false;
    const fallback = setTimeout(() => { if (!cancelled) setImageReady(true); }, IMAGE_TIMEOUT);
    const img = new window.Image();
    img.onload  = () => { if (!cancelled) { clearTimeout(fallback); setImageReady(true); } };
    img.onerror = () => { if (!cancelled) { clearTimeout(fallback); setImageReady(true); } };
    img.src = '/buho-0.png';
    return () => { cancelled = true; clearTimeout(fallback); };
  }, []);

  // Esperar fuentes
  useEffect(() => {
    let cancelled = false;
    const fallback = setTimeout(() => { if (!cancelled) setFontsReady(true); }, FONTS_TIMEOUT);
    Promise.all([
      document.fonts.load('700 1em "Playfair Display"'),
      document.fonts.load('700 1em "Poppins"'),
    ]).then(() => {
      if (!cancelled) { clearTimeout(fallback); setFontsReady(true); }
    }).catch(() => {
      if (!cancelled) { clearTimeout(fallback); setFontsReady(true); }
    });
    return () => { cancelled = true; clearTimeout(fallback); };
  }, []);

  // Countdown arranca cuando imagen Y fuentes están listas
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setVisible(false), TOTAL_MS);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          {/* Logo: invisible hasta que la imagen cargó, luego pulso doble */}
          <motion.img
            src="/buho-0.png"
            alt="CompañIA"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={ready ? {
              opacity: [0, 1, 1,    1,    1,    1,    1],
              scale:   [0.82, 1, 1.12, 1.02, 1.15, 1,  1],
            } : { opacity: 0, scale: 0.82 }}
            transition={{
              times:    [0, 0.12, 0.28, 0.42, 0.58, 0.78, 1],
              duration: 1.4,
              ease:     'easeInOut',
            }}
            style={{ width: 160, height: 160, objectFit: 'contain' }}
          />

          {/* Texto: aparece solo cuando imagen + fuentes están listas */}
          {ready && (
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: -6, alignItems: 'baseline' }}>
              {APP_NAME.split('').map((char, i) => {
                const isIA = i >= IA_START;
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay:    LETTER_DELAY + i * LETTER_STEP,
                      duration: 0.22,
                      ease:     'easeOut',
                    }}
                    style={{
                      fontSize:      34,
                      fontFamily:    isIA ? '"Poppins", sans-serif' : '"Playfair Display", serif',
                      fontWeight:    700,
                      color:         isIA ? '#f27d26' : '#333333',
                      letterSpacing: isIA ? 0 : 1,
                      lineHeight:    1,
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
