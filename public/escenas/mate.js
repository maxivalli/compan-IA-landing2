// ── El mate ───────────────────────────────────────────────────────────────────
// Tres piezas: la calabaza, la virola de metal del borde y la bombilla, que va
// clavada en la yerba y sale hacia arriba y HACIA ADENTRO (donde está la boca).
// Hubo una pava cebando: se sacó a propósito — era el 60% de la complejidad y
// no aportaba al gesto principal, que es tomar.
//
// La calabaza no es un cono: es un cuerpo de revolución con panza. Se define
// por su PERFIL (radio a cada altura) y la silueta sale sola de la envolvente
// de sus anillos, en cualquier vuelco. Misma maquinaria que la taza.

(function () {

const DUR_ESCENA = 9000;
const FASES = [
  { hasta: 4200, nombre: 'reposo — humea el mate' },
  { hasta: 4900, nombre: 'levanta el mate' },
  { hasta: 6300, nombre: 'toma por la bombilla' },
  { hasta: 7100, nombre: 'apoya el mate' },
  { hasta: 9000, nombre: 'reposo otra vez' },
];
function nombreFase(t) {
  for (const f of FASES) if (t < f.hasta) return f.nombre;
  return FASES[FASES.length - 1].nombre;
}

// ── Guion ────────────────────────────────────────────────────────────────────
function estado(t) {
  const mateArriba = suaveInOut(tramo(t, 4200, 4900)) * (1 - suaveInOut(tramo(t, 6300, 7100)));
  const bebiendo = pulso(t, 4900, 5300, 5900, 6350);
  // al tomar por la bombilla el mate se inclina apenas: no se vuelca como una
  // taza, se ladea lo justo para que la bombilla llegue cómoda.
  const vuelco = mateArriba * 0.30;

  return { mateArriba, bebiendo, vuelco };
}

// El gesto de llevárselo a la boca: sale de donde está, sube POCO, se inclina
// apenas hacia adentro y SE ACHICA — porque al acercárselo a la boca se aleja
// de quien mira. Sin ese achique el movimiento se lee como "flotó hacia arriba"
// en vez de "se lo llevó a la boca".
const SUBE = 62;
const ACHIQUE = 0.12;
const escalaMate = mateArriba => 1 - ACHIQUE * mateArriba;

// Al tomar baja el nivel; se recupera muy de a poco durante el reposo largo
// (7px repartidos en casi dos segundos, no se percibe) para que el bucle cierre
// exactamente donde arrancó.
function nivelAgua(t) {
  const baja = suaveInOut(tramo(t, 5000, 6100)) * 7;
  const vuelve = suaveInOut(tramo(t, 7100, 9000)) * 7;
  return Math.max(0, baja - vuelve);
}

// ── Paleta ───────────────────────────────────────────────────────────────────
const PALETA = {
  linea: '#2b2118', grosor: 5, brillo: 0,
  // calabaza: madera de porongo, cálida
  cal: { brillo: '#c08a4a', medio: '#9a6530', nucleo: '#40280f', borde: '#7d5323' },
  // virola y bombilla: alpaca
  metal: { brillo: '#ffffff', medio: '#c9d2da', nucleo: '#5d6874', borde: '#a8b3bf' },
  yerba: '#4d6a29', yerbaClara: '#6f8c42', yerbaOscura: '#33481a',
  agua: 'rgba(216,238,250,0.80)',
  sombraApoyo: 'rgba(30,26,20,0.30)',
  vapor: '#cdd4dd', ojo: '#5ce1e6',
};

// ── La calabaza ──────────────────────────────────────────────────────────────
// Perfil [altura, radio]: base angosta, panza y boca que se vuelve a abrir.
const PERFIL = [
  [0, 22], [10, 38], [24, 52], [40, 60], [56, 62],
  [74, 59], [92, 52], [108, 46], [120, 44],
];
const ALTO_MATE = 120;
const R_BOCA = 44;

function dibujarMate(ctx, p, t, e, op, dentroDeLaBoca) {
  const ang = e.vuelco;
  const boca = anillo(R_BOCA, ALTO_MATE, ang);
  const silueta = siluetaRevolucion(PERFIL, ang);

  // cuerpo
  conBrillo(ctx, p, () => {
    trazarPuntos(ctx, silueta);
    ctx.fillStyle = volumen(ctx, silueta, p.cal); ctx.fill();
  });
  ctx.save();
  trazarPuntos(ctx, silueta); ctx.clip();
  ctx.fillStyle = oclusionVertical(ctx, silueta, 0.30);
  ctx.fillRect(-300, -460, 600, 700);
  // veta de la calabaza: dos arcos suaves, apenas insinuados
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = '#2e1c08'; ctx.lineWidth = 3;
  for (const k of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(k * 14, -62, 34, 58, k * 0.25, 0.6, 2.4);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
  trazarPuntos(ctx, silueta); contornear(ctx, p, op);

  // ── virola: el aro de metal del borde ──
  const virolaAlta = anillo(R_BOCA + 2, ALTO_MATE + 3, ang);
  const virolaBaja = anillo(R_BOCA + 2, ALTO_MATE - 13, ang);
  const aro = envolvente(virolaAlta.concat(virolaBaja));
  conBrillo(ctx, p, () => {
    trazarPuntos(ctx, aro);
    ctx.fillStyle = volumen(ctx, aro, p.metal); ctx.fill();
  });
  trazarPuntos(ctx, aro); contornear(ctx, p, op);

  // ── adentro: yerba + agua ──
  ctx.save();
  trazarPuntos(ctx, boca); ctx.clip();
  // hueco
  const ysB = boca.map(q => q[1]);
  const gh = ctx.createLinearGradient(0, Math.min(...ysB), 0, Math.max(...ysB));
  gh.addColorStop(0, '#241505'); gh.addColorStop(1, '#4a3116');
  trazarPuntos(ctx, boca); ctx.fillStyle = gh; ctx.fill();

  // agua: disco horizontal DEL MUNDO (no acompaña el ladeo del mate)
  const yAgua = ALTO_MATE - 26 + nivelAgua(t);
  const discoAgua = [];
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    const [X, Y] = proyectar(Math.cos(a) * (R_BOCA - 3), yAgua, Math.sin(a) * (R_BOCA - 3), ang * 0.2);
    discoAgua.push([X, Y - ang * 26]);
  }
  trazarPuntos(ctx, discoAgua); ctx.fillStyle = p.agua; ctx.fill();

  // La bombilla va ACÁ ADENTRO: recortada contra la boca y por debajo de la
  // yerba, así queda clavada en ella y no apoyada encima.
  if (dentroDeLaBoca) dentroDeLaBoca();

  // la montañita de yerba, cargada de un lado (como se carga de verdad)
  const yerba = [];
  for (let i = 0; i <= 34; i++) {
    const u = i / 34, a = Math.PI * u;
    const r = R_BOCA - 4;
    const x = -r * Math.cos(a) - 8;
    const alturaLoma = Math.sin(a) * 26;
    const [X, Y] = proyectar(x, ALTO_MATE - 20 + alturaLoma, r * 0.55 * Math.sin(a), ang);
    yerba.push([X, Y]);
  }
  const [Xa, Ya] = proyectar(R_BOCA - 12, ALTO_MATE - 26, 0, ang);
  yerba.push([Xa, Ya + 40], [yerba[0][0], yerba[0][1] + 40]);
  trazarPuntos(ctx, yerba);
  const xsY = yerba.map(q => q[0]);
  const gy = ctx.createLinearGradient(Math.min(...xsY), 0, Math.max(...xsY), 0);
  gy.addColorStop(0, p.yerbaClara); gy.addColorStop(0.55, p.yerba); gy.addColorStop(1, p.yerbaOscura);
  ctx.fillStyle = gy; ctx.fill();
  // textura: pintitas de yerba
  ctx.fillStyle = 'rgba(20,40,8,0.35)';
  for (let i = 0; i < 26; i++) {
    const a = (i * 2.399) % (Math.PI * 2), rr = 6 + (i * 7) % 30;
    ctx.beginPath();
    ctx.ellipse(-8 + Math.cos(a) * rr, -ALTO_MATE + 34 + Math.sin(a) * rr * 0.35, 2.2, 1.4, a, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  trazarPuntos(ctx, boca); contornear(ctx, p, op);
  return { silueta, boca };
}

// Recorta TODO MENOS la figura dada (para dibujar lo que sobresale de un cuerpo
// sin que se superponga encima de él).
function recorteFuera(ctx, pts) {
  ctx.beginPath();
  ctx.rect(-2000, -2000, 4000, 4000);
  pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]));
  ctx.closePath();
  ctx.clip('evenodd');
}

// ── La bombilla ──────────────────────────────────────────────────────────────
// Nace hundida en la yerba y sale hacia arriba, HACIA ADENTRO (alejándose de
// quien mira, que es donde está la boca) y apenas a la derecha. Antes se doblaba
// hacia la izquierda y quedaba tirada sobre el plano, como un palito pegado.
//
// Por eso la espina es de verdad TRIDIMENSIONAL: el tercer número es la
// profundidad, y al ser negativa la bombilla se va para atrás. La proyección se
// encarga sola de que se vea más corta y más alta a medida que se aleja.
function bezier3(P0, P1, P2, P3, pasos) {
  const out = [];
  for (let i = 0; i <= pasos; i++) {
    const u = i / pasos, v = 1 - u;
    const f = k => v*v*v*P0[k] + 3*v*v*u*P1[k] + 3*v*u*u*P2[k] + u*u*u*P3[k];
    out.push([f(0), f(1), f(2)]);
  }
  return out;
}

function dibujarBombilla(ctx, p, e, op) {
  const ang = e.vuelco;
  const espina3D = bezier3(
    [16, ALTO_MATE - 36,  20],   // hundida en la yerba, del lado de acá
    [26, ALTO_MATE + 10,   8],
    [32, ALTO_MATE + 66, -24],
    [28, ALTO_MATE + 112, -52],  // boquilla: arriba, adentro y apenas a la derecha
    26,
  );
  const espina = espina3D.map(q => proyectar(q[0], q[1], q[2], ang));
  const grosor = u => 9 + 5 * Math.pow(1 - u, 3) + 6 * Math.pow(u, 8);  // bulbo abajo, boquilla arriba
  const cont = banda(espina, grosor);
  conBrillo(ctx, p, () => {
    trazarPuntos(ctx, cont);
    ctx.fillStyle = volumen(ctx, cont, p.metal); ctx.fill();
  });
  // reflejo largo de metal
  ctx.save();
  trazarPuntos(ctx, cont); ctx.clip();
  const xs = cont.map(q => q[0]);
  const g = ctx.createLinearGradient(Math.min(...xs), 0, Math.max(...xs), 0);
  g.addColorStop(0.18, 'rgba(255,255,255,0)');
  g.addColorStop(0.34, 'rgba(255,255,255,0.75)');
  g.addColorStop(0.5, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(-300, -460, 600, 700);
  ctx.restore();
  trazarPuntos(ctx, cont); contornear(ctx, p, op);
}

// ── Escena ───────────────────────────────────────────────────────────────────
function dibujarEscena(ctx, W, H, t, op) {
  const p = PALETA;
  // (Acá había un `clearRect` de toda la pantalla. Lo sacó el día que el bucle
  // del taller pasó a limpiar por su cuenta: era redundante, y encima BORRABA la
  // capa de ambiente que se dibuja debajo — la luz de sala del pochoclo no se
  // veía en el taller por esto. En la app nunca hizo nada: cada cuadro se graba
  // en un lienzo nuevo, que ya nace vacío.)
  ctx.save();
  ctx.translate(W / 2, H * 0.80);
  ctx.scale(1.5, 1.5);

  const e = estado(t);
  if (op.vuelcoFijo != null) { e.vuelco = op.vuelcoFijo; e.mateArriba = 1; }

  if (op.ojos) {
    ctx.save(); ctx.translate(0, -330);
    dibujarOjos(ctx, p, e.bebiendo);
    ctx.restore();
  }

  // sombra de apoyo
  ctx.save();
  ctx.beginPath();
  const rs = 46 * (1.06 - e.mateArriba * 0.22);
  ctx.ellipse(10, 4, rs, rs * 0.32, 0, 0, Math.PI * 2);
  const gs = ctx.createRadialGradient(10, 4, 0, 10, 4, rs);
  gs.addColorStop(0, colorConAlfa(p.sombraApoyo, (1 - e.mateArriba * 0.7) * 0.9));
  gs.addColorStop(1, colorConAlfa(p.sombraApoyo, 0));
  ctx.fillStyle = gs; ctx.fill();
  ctx.restore();

  // el vapor sale de la boca del mate y sube más fuerte apenas lo cebaron
  const esc = escalaMate(e.mateArriba);
  const yBoca = -ALTO_MATE * esc - SUBE * e.mateArriba;
  dibujarVapor(ctx, p, t, {
    y: yBoca, escala: 0.62 * esc,
    periodo: DUR_ESCENA / 4,
    fuerza: 0.85 * (1 - e.bebiendo) * (1 - e.mateArriba * 0.4),
  });

  // Sube poco, se achica un poco (se aleja) y se ladea apenas — todo desde su
  // propia posición, sin correrse para el costado.
  ctx.save();
  ctx.translate(0, -SUBE * e.mateArriba);
  ctx.scale(esc, esc);
  // La bombilla NO se dibuja encima del mate: va en dos pasadas. Una adentro de
  // la boca (lo que se ve por la abertura, debajo de la yerba) y otra recortada
  // contra el AFUERA del cuerpo (lo que sobresale). Lo que queda tapado por la
  // pared de la calabaza se tapa solo, sin trucos.
  const geo = dibujarMate(ctx, p, t, e, op, () => dibujarBombilla(ctx, p, e, op));
  ctx.save();
  recorteFuera(ctx, geo.silueta);
  dibujarBombilla(ctx, p, e, op);
  ctx.restore();
  ctx.restore();

  ctx.restore();
}

ANIMACIONES.mate = { nombre: 'Mate', dur: DUR_ESCENA, nombreFase, dibujar: dibujarEscena };
})();
