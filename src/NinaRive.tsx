import { useEffect, useRef } from 'react';

/* ── Nina, la de verdad ─────────────────────────────────────────────────────
   El MISMO archivo de Rive que usa la app (AbuApp/assets/chispa/chispa.riv,
   copiado a public/chispa.riv — si cambia allá, se vuelve a copiar). Antes los
   mockups dibujaban con CSS los ojos cian viejos; desde el 2026-10-02 es Nina con
   su cuerpo, en esfera y dorada, que es como sale de fábrica.

   Liviano a propósito, porque hay una por teléfono:
     · el reproductor se carga recién cuando el primer teléfono entra en pantalla
       (import diferido: no pesa en el primer pintado);
     · el archivo se baja UNA vez y cada Nina usa una copia;
     · cada una se arma al acercarse a la pantalla y se desarma al irse, así nunca
       hay más de dos o tres andando a la vez.                                  */

export type ExpresionNina = 'neutral' | 'feliz' | 'triste' | 'sorprendida' | 'ternura' | 'cansada';

// Los números del view model del archivo (lib/ui/chispa/controlador.ts en la app).
const EXPRESION: Record<ExpresionNina, number> = { neutral: 0, feliz: 1, triste: 2, sorprendida: 3, ternura: 7, cansada: 14 };

let archivo: Promise<ArrayBuffer> | null = null;
const bajarArchivo = () => (archivo ??= fetch('/chispa.riv').then(r => r.arrayBuffer()));
let reproductor: Promise<typeof import('@rive-app/canvas-single')> | null = null;
const cargarReproductor = () => (reproductor ??= import('@rive-app/canvas-single'));

export default function NinaRive({ expresion = 'neutral', escena, className = '' }: {
  expresion?: ExpresionNina;
  /** Una escena de reposo de la app (mate, radio, libro…): la que se ve en pantalla. */
  escena?: string;
  className?: string;
}) {
  const caja = useRef<HTMLDivElement | null>(null);
  const lienzo = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const nodo = caja.current, canvas = lienzo.current;
    if (!nodo || !canvas) return;
    let vivo = true, visible = false;
    let instancia: { cleanup(): void } | null = null;

    const armar = async () => {
      const [rive, datos] = await Promise.all([cargarReproductor(), bajarArchivo()]);
      if (!vivo || !visible || instancia) return;
      const r = new rive.Rive({
        buffer: datos.slice(0), canvas, artboard: 'Chispa', stateMachines: 'Chispa_StateMachine',
        autoplay: true, autoBind: true,
        layout: new rive.Layout({ fit: rive.Fit.Contain, alignment: rive.Alignment.Center }),
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
          const vm = r.viewModelInstance;
          if (!vm) return;
          const num = (k: string, v: number) => { const p = vm.number(k); if (p) p.value = v; };
          num('expression', EXPRESION[expresion]); num('skinTheme', 0); num('bodyShape', 0);
          if (escena) { const p = vm.boolean(`${escena}Active`); if (p) p.value = true; }
        },
      });
      instancia = r;
    };
    const desarmar = () => { instancia?.cleanup(); instancia = null; };

    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) armar().catch(() => {});
      else desarmar();
    }, { rootMargin: '150px' });
    obs.observe(nodo);
    return () => { vivo = false; obs.disconnect(); desarmar(); };
  }, [expresion, escena]);

  return (
    <div ref={caja} className={className}>
      <canvas ref={lienzo} className="h-full w-full" aria-label="Nina" role="img" />
    </div>
  );
}
