import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const APP_NAME = 'CompañIA';
const IA_START = 6; // C,o,m,p,a,ñ → serif | I,A → sans naranja

const LETTER_DELAY  = 0.4;
const LETTER_STEP   = 0.08;
const TOTAL_MS      = 2800;
const FONTS_TIMEOUT = 1500; // máximo que esperamos las fuentes antes de continuar igual

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible]       = useState(true);
  const [fontsReady, setFontsReady] = useState(false);

  // Esperar a que Playfair Display y Poppins estén disponibles antes de animar el texto
  useEffect(() => {
    let cancelled = false;
    const fallback = setTimeout(() => { if (!cancelled) setFontsReady(true); }, FONTS_TIMEOUT);

    Promise.all([
      document.fonts.load('700 1em "Playfair Display"'),
      document.fonts.load('700 1em "Poppins"'),
    ]).then(() => {
      if (!cancelled) setFontsReady(true);
    }).catch(() => {
      if (!cancelled) setFontsReady(true);
    });

    return () => { cancelled = true; clearTimeout(fallback); };
  }, []);

  // El temporizador de cierre arranca cuando las fuentes están listas
  useEffect(() => {
    if (!fontsReady) return;
    const t = setTimeout(() => setVisible(false), TOTAL_MS);
    return () => clearTimeout(t);
  }, [fontsReady]);

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
          {/* Logo con pulso doble */}
          <motion.img
            src="/buho-0.png"
            alt="CompañIA"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{
              opacity: [0, 1, 1,    1,    1,    1,    1],
              scale:   [0.82, 1, 1.12, 1.02, 1.15, 1,  1],
            }}
            transition={{
              times:    [0, 0.12, 0.28, 0.42, 0.58, 0.78, 1],
              duration: 1.4,
              ease:     'easeInOut',
            }}
            style={{ width: 160, height: 160, objectFit: 'contain' }}
          />

          {/* Nombre letra por letra — solo se anima cuando las fuentes están listas */}
          {fontsReady && (
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
