// Registro de animaciones del taller (cada archivo se anota acá).
const ANIMACIONES = {};

// ── Herramientas compartidas por todas las animaciones ───────────────────────
// Esto es lo que en la app va a vivir en components/idle/volumen: la maquinaria
// de dibujar objetos con volumen. Escrito una vez, lo usan el café, el mate y
// las que vengan — por eso la segunda animación cuesta bastante menos que la
// primera.

// ── Tiempo y suavizados ──────────────────────────────────────────────────────
const clamp01 = v => Math.max(0, Math.min(1, v));
const suaveInOut = p => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
const suaveOut = p => 1 - Math.pow(1 - p, 3);
const suaveIn = p => p * p * p;
// Ojo: si `desde` y `hasta` son iguales esto sería 0/0 = NaN, y el NaN se
// propaga silenciosamente hasta aparecer como un color inválido y un objeto que
// desaparece. Pasó de verdad con el tercer bocado de la hamburguesa.
const tramo = (t, desde, hasta) =>
  hasta === desde ? (t >= hasta ? 1 : 0) : clamp01((t - desde) / (hasta - desde));
// Pulso: sube y vuelve a bajar. Casi todos los saltos de bucle salieron de
// usar un tramo suelto donde hacía falta un pulso (una variable que subía y se
// quedaba arriba hasta el final del ciclo).
const pulso = (t, sube0, sube1, baja0, baja1) =>
  suaveInOut(tramo(t, sube0, sube1)) * (1 - suaveInOut(tramo(t, baja0, baja1)));

// ── Volumen ──────────────────────────────────────────────────────────────────
// Marco del objeto: x a la derecha, y hacia arriba por su eje, z hacia nosotros.
// La cámara mira desde un poco arriba: por eso las bocas se ven como elipses y
// no como rayas, incluso con el objeto derecho.
const CAMARA = 0.23;

// Proyecta un punto del marco del objeto a la pantalla.
// `vuelco` = cuánto está volcado hacia atrás (0 derecho; al crecer, el borde se
// va para atrás y la base viene hacia nosotros hasta que se le ve el culo).
// Devuelve [x, y, profundidad]; profundidad mayor = más cerca nuestro.
function proyectar(x, y, z, vuelco) {
  const c = Math.cos(vuelco), s = Math.sin(vuelco);
  const y1 = y * c + z * s;
  const z1 = -y * s + z * c;
  const cf = Math.cos(CAMARA), sf = Math.sin(CAMARA);
  const arriba = y1 * cf - z1 * sf;
  const prof = y1 * sf + z1 * cf;
  return [x, -arriba, prof];        // en canvas la y crece hacia abajo
}

// Círculo horizontal del marco del objeto (radio r a la altura y), proyectado.
function anillo(r, y, vuelco, pasos = 48) {
  const pts = [];
  for (let i = 0; i < pasos; i++) {
    const a = (i / pasos) * Math.PI * 2;
    pts.push(proyectar(Math.cos(a) * r, y, Math.sin(a) * r, vuelco));
  }
  return pts;
}

// Envolvente convexa. La silueta de un cuerpo de revolución convexo (un cono
// truncado, una calabaza) es exactamente la envolvente de sus anillos, en
// cualquier vuelco. Por eso no hay que dibujar la silueta a mano.
function envolvente(pts) {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cruz = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const media = (arr) => {
    const h = [];
    for (const q of arr) {
      while (h.length >= 2 && cruz(h[h.length - 2], h[h.length - 1], q) <= 0) h.pop();
      h.push(q);
    }
    return h;
  };
  const inf = media(p), sup = media(p.slice().reverse());
  return inf.slice(0, -1).concat(sup.slice(0, -1));
}

// Silueta de un cuerpo de revolución a partir de su PERFIL ([[altura, radio]…]).
// Sirve igual para una taza (dos anillos) que para una calabaza (muchos).
function siluetaRevolucion(perfil, vuelco, pasos = 32) {
  let todos = [];
  for (const [y, r] of perfil) todos = todos.concat(anillo(r, y, vuelco, pasos));
  return envolvente(todos);
}

function trazarPuntos(ctx, pts) {
  ctx.beginPath();
  pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]));
  ctx.closePath();
}

const promProf = pts => pts.reduce((s, q) => s + q[2], 0) / pts.length;

// Banda de grosor VARIABLE a lo largo de una curva: gorda en el medio y
// afinándose hacia las puntas. Es la diferencia entre un asa de porcelana (o
// una bombilla) y un caño doblado. Devuelve el contorno cerrado.
function banda(espina, grosorEn) {
  const n = espina.length;
  const lado = (signo, alRevés) => {
    const out = [];
    for (let k = 0; k < n; k++) {
      const i = alRevés ? n - 1 - k : k;
      const a = espina[Math.max(0, i - 1)], b = espina[Math.min(n - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const l = Math.hypot(dx, dy) || 1;
      const r = grosorEn(i / (n - 1)) / 2;
      out.push([espina[i][0] - (dy / l) * r * signo, espina[i][1] + (dx / l) * r * signo]);
    }
    return out;
  };
  const punta = (i, haciaAfuera) => {
    const a = espina[Math.max(0, i - 1)], b = espina[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const l = Math.hypot(dx, dy) || 1;
    const ux = (dx / l) * haciaAfuera, uy = (dy / l) * haciaAfuera;
    const r = grosorEn(i / (n - 1)) / 2;
    const pts = [];
    for (let k = 1; k < 7; k++) {
      const th = (Math.PI * k) / 7;
      const c = Math.cos(th), s = Math.sin(th);
      pts.push([espina[i][0] + (-uy * c + ux * s) * r, espina[i][1] + (ux * c + uy * s) * r]);
    }
    return pts;
  };
  return lado(1, false).concat(punta(n - 1, 1), lado(-1, true), punta(0, -1));
}

// Curva bezier cúbica muestreada (para espinas de asas, bombillas, chorros).
function bezier(P0, P1, P2, P3, pasos = 30) {
  const out = [];
  for (let i = 0; i <= pasos; i++) {
    const u = i / pasos, v = 1 - u;
    out.push([
      v*v*v*P0[0] + 3*v*v*u*P1[0] + 3*v*u*u*P2[0] + u*u*u*P3[0],
      v*v*v*P0[1] + 3*v*v*u*P1[1] + 3*v*u*u*P2[1] + u*u*u*P3[1],
    ]);
  }
  return out;
}

// ── Luz ──────────────────────────────────────────────────────────────────────
// La luz viene de arriba a la izquierda. El truco para que un cuerpo redondo se
// lea como redondo y no como una calcomanía son 4 franjas, en este orden desde
// la luz: brillo · medio tono · SOMBRA DE NÚCLEO (la más oscura, y NO va en el
// borde) · LUZ DE BORDE (el filo del lado oscuro se vuelve a encender, por lo
// que rebota del ambiente). Si la sombra se va hasta el borde, se aplana.
function volumen(ctx, pts, cols) {
  const xs = pts.map(q => q[0]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs);
  const g = ctx.createLinearGradient(x0, 0, x1, 0);
  g.addColorStop(0.00, cols.medio);
  g.addColorStop(0.17, cols.brillo);
  g.addColorStop(0.46, cols.medio);
  g.addColorStop(0.84, cols.nucleo);
  g.addColorStop(1.00, cols.borde);
  return g;
}

// Oscurecimiento hacia abajo (la luz viene de arriba, y donde el objeto apoya
// entra menos luz todavía).
function oclusionVertical(ctx, pts, fuerza = 0.22) {
  const ys = pts.map(q => q[1]);
  const y0 = Math.min(...ys), y1 = Math.max(...ys);
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(0.55, 'rgba(0,0,0,0)');
  g.addColorStop(1, `rgba(0,0,0,${fuerza})`);
  return g;
}

function colorConAlfa(hex, a) {
  if (hex.startsWith('rgba')) return hex.replace(/[\d.]+\)$/, a + ')');
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function conBrillo(ctx, p, fn) {
  if (p.brillo) { ctx.save(); ctx.shadowColor = p.linea; ctx.shadowBlur = p.brillo; fn(); ctx.restore(); }
  else fn();
}

// Contorno opcional. Sin él, la forma la define la luz — es lo que separa un
// objeto con volumen de un dibujito. Se sigue usando en el estilo Rosita,
// donde la línea cian ES la identidad.
function contornear(ctx, p, op) {
  if (op && op.sinContorno && !p.brillo) return;
  ctx.lineWidth = p.grosor; ctx.strokeStyle = p.linea; ctx.lineJoin = 'round'; ctx.stroke();
}

// ── Vapor ────────────────────────────────────────────────────────────────────
// Hilos serpenteantes que nacen de un punto, se abren al subir y se desvanecen.
// OJO con el período: tiene que entrar un número ENTERO de veces en el ciclo de
// la escena, si no la onda queda cortada al reiniciar y se ve el corte.
function dibujarVapor(ctx, p, t, { x = 0, y = 0, fuerza = 1, escala = 1, periodo = 3000, hilos: cfg }) {
  if (fuerza <= 0.01) return;
  const hilos = cfg || [
    { dx: -34, fase: 0.0,  amp: 15, alto: 175, ancho: 7 },
    { dx: 2,   fase: 0.45, amp: 20, alto: 215, ancho: 8 },
    { dx: 36,  fase: 0.8,  amp: 14, alto: 160, ancho: 6 },
  ];
  for (const hilo of hilos) {
    const ciclo = ((t / periodo) + hilo.fase) % 1;
    const alto = hilo.alto * escala, ancho = hilo.ancho * escala, amp = hilo.amp * escala;
    ctx.save();
    ctx.beginPath();
    const PASOS = 26;
    for (let i = 0; i <= PASOS; i++) {
      const u = i / PASOS;
      const yy = y - u * alto;
      const onda = Math.sin((u * 3.1 - ciclo * 6.283)) * amp * (0.25 + u);
      const xx = x + hilo.dx * escala + onda;
      if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
    }
    const grad = ctx.createLinearGradient(0, y, 0, y - alto);
    const a = 0.55 * fuerza;
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.18, colorConAlfa(p.vapor, a));
    grad.addColorStop(0.62, colorConAlfa(p.vapor, a * 0.75));
    grad.addColorStop(1, colorConAlfa(p.vapor, 0));
    ctx.strokeStyle = grad;
    ctx.lineWidth = ancho;
    ctx.lineCap = 'round';
    if (p.brillo) { ctx.shadowColor = p.vapor; ctx.shadowBlur = 10; }
    ctx.stroke();
    ctx.restore();
  }
}

// ── Anteojos de sol ──────────────────────────────────────────────────────────
// Los usan las escenas de verano (trago, helado). Colores propios: no dependen
// de la paleta de cada escena.
const SOL = { lente: 'rgba(24,32,46,0.82)', marco: '#2c3444', marcoLuz: '#66738a' };

// `bamboleo` en px: cada escena lo calcula con SU propia onda (acá no se sabe
// cuánto dura el ciclo, y una onda con período absoluto no cerraría el bucle).
function dibujarAnteojosSol(ctx, bamboleo = 0) {
  const p = { lente: SOL.lente, marcoSol: SOL.marco, marcoSolLuz: SOL.marcoLuz };
  const SEP = 118, W = 92, H = 66, R = 26;
  ctx.save();
  ctx.translate(0, 4 + bamboleo);
  for (const lado of [-1, 1]) {
    const cx = lado * SEP / 2;
    ctx.beginPath();
    ctx.roundRect(cx - W / 2, -H / 2, W, H, [R, R, R * 1.4, R * 1.4]);
    ctx.fillStyle = p.lente; ctx.fill();
    // el reflejo del sol: una diagonal ancha y clara
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cx - W / 2, -H / 2, W, H, [R, R, R * 1.4, R * 1.4]);
    ctx.clip();
    const g = ctx.createLinearGradient(cx - W / 2, -H / 2, cx + W / 4, H / 2);
    g.addColorStop(0.28, 'rgba(255,255,255,0)');
    g.addColorStop(0.42, 'rgba(255,255,255,0.30)');
    g.addColorStop(0.56, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.fillRect(cx - W / 2, -H / 2, W, H);
    ctx.restore();
    ctx.beginPath();
    ctx.roundRect(cx - W / 2, -H / 2, W, H, [R, R, R * 1.4, R * 1.4]);
    ctx.strokeStyle = p.marcoSol; ctx.lineWidth = 5; ctx.stroke();
    // patilla
    ctx.beginPath();
    ctx.moveTo(cx + lado * W / 2, -H / 4);
    ctx.lineTo(cx + lado * (W / 2 + 34), -H / 4 - 10);
    ctx.strokeStyle = p.marcoSol; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.stroke();
  }
  // puente
  ctx.beginPath();
  ctx.moveTo(-SEP / 2 + W / 2 - 2, -H / 4);
  ctx.quadraticCurveTo(0, -H / 2 - 4, SEP / 2 - W / 2 + 2, -H / 4);
  ctx.strokeStyle = p.marcoSolLuz; ctx.lineWidth = 5; ctx.stroke();
  ctx.restore();
}

// ── Los ojos (referencia, para mirar la sincronía) ───────────────────────────
// No es la cara real de la app: alcanza para ver si el gesto y los ojos caen
// juntos. En la app esto ya existe (el gesto 'saboreo' de RostroAsistente).
// `mirada` = [dx, dy] en px: los ojos se corren hacia lo que están mirando.
// En la app esto ya existe (miradaX/miradaY de useMiradaViva).
function dibujarOjos(ctx, p, bebiendo, mirada) {
  const feliz = suaveInOut(clamp01(bebiendo * 1.6));
  const SEP = 118, W = 62, H = 78;
  const [mx, my] = mirada || [0, 0];
  for (const lado of [-1, 1]) {
    const cx = lado * SEP / 2 + mx;
    ctx.save();
    ctx.translate(0, my);
    if (p.brillo) { ctx.shadowColor = p.ojo; ctx.shadowBlur = 18; }
    ctx.fillStyle = p.ojo; ctx.strokeStyle = p.ojo;
    if (feliz < 0.5) {
      const h = H * (1 - feliz * 0.9);
      ctx.beginPath();
      ctx.roundRect(cx - W / 2, -h / 2, W, h, Math.min(W / 2, h / 2));
      ctx.fill();
    } else {
      const k = (feliz - 0.5) / 0.5;
      ctx.beginPath();
      ctx.lineWidth = 13; ctx.lineCap = 'round';
      ctx.ellipse(cx, 6, W / 2, 14 + 16 * k, 0, Math.PI, 0);
      ctx.stroke();
    }
    ctx.restore();
  }
}
