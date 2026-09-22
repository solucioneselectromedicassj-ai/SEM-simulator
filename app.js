function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

// ══════════════════════════════════════════════════════
// CONSTANTES
// ══════════════════════════════════════════════════════
const PROGRAMS = [{
  id: 'normal',
  label: 'Normal adulto',
  hr: 72,
  spo2: 98,
  sys: 120,
  dia: 80,
  temp: 36.6,
  resp: 16,
  rhythm: 'sinusal',
  color: '#00C896'
}, {
  id: 'hta1',
  label: 'Hipertensión I',
  hr: 78,
  spo2: 97,
  sys: 145,
  dia: 95,
  temp: 36.8,
  resp: 18,
  rhythm: 'sinusal',
  color: '#F5A623'
}, {
  id: 'hta2',
  label: 'Hipertensión II',
  hr: 82,
  spo2: 96,
  sys: 168,
  dia: 105,
  temp: 37.0,
  resp: 20,
  rhythm: 'sinusal',
  color: '#F5A623'
}, {
  id: 'hta3',
  label: 'Crisis HTA',
  hr: 90,
  spo2: 94,
  sys: 195,
  dia: 124,
  temp: 37.3,
  resp: 22,
  rhythm: 'sinusal',
  color: '#E63946'
}, {
  id: 'shock',
  label: 'Hipotensión',
  hr: 118,
  spo2: 90,
  sys: 85,
  dia: 55,
  temp: 35.8,
  resp: 26,
  rhythm: 'sinusal',
  color: '#3A86FF'
}, {
  id: 'brady',
  label: 'Bradicardia',
  hr: 36,
  spo2: 96,
  sys: 100,
  dia: 65,
  temp: 36.5,
  resp: 14,
  rhythm: 'sinusal',
  color: '#6C8EBF'
}, {
  id: 'taqui',
  label: 'Taquicardia',
  hr: 132,
  spo2: 94,
  sys: 130,
  dia: 85,
  temp: 37.2,
  resp: 22,
  rhythm: 'sinusal',
  color: '#F5A623'
}, {
  id: 'afib',
  label: 'FA',
  hr: 88,
  spo2: 95,
  sys: 125,
  dia: 78,
  temp: 36.7,
  resp: 18,
  rhythm: 'afib',
  color: '#F5A623'
}, {
  id: 'flutter',
  label: 'Flutter A.',
  hr: 150,
  spo2: 93,
  sys: 110,
  dia: 72,
  temp: 36.6,
  resp: 20,
  rhythm: 'flutter',
  color: '#F5A623'
}, {
  id: 'vtach',
  label: 'TV',
  hr: 172,
  spo2: 84,
  sys: 80,
  dia: 50,
  temp: 36.5,
  resp: 30,
  rhythm: 'vtach',
  color: '#E63946'
}, {
  id: 'vfib',
  label: 'FV',
  hr: 0,
  spo2: 0,
  sys: 0,
  dia: 0,
  temp: 36.5,
  resp: 0,
  rhythm: 'vfib',
  color: '#C1121F'
}, {
  id: 'paro',
  label: 'Asistolia',
  hr: 0,
  spo2: 0,
  sys: 0,
  dia: 0,
  temp: 36.3,
  resp: 0,
  rhythm: 'asistolia',
  color: '#C1121F'
}, {
  id: 'marcap',
  label: 'Marcapasos',
  hr: 70,
  spo2: 97,
  sys: 118,
  dia: 78,
  temp: 36.6,
  resp: 16,
  rhythm: 'marcap',
  color: '#9B59B6'
}, {
  id: 'ped',
  label: 'Pediátrico',
  hr: 108,
  spo2: 99,
  sys: 90,
  dia: 60,
  temp: 36.9,
  resp: 28,
  rhythm: 'sinusal',
  color: '#00C896'
}, {
  id: 'neo',
  label: 'Neonato',
  hr: 148,
  spo2: 98,
  sys: 65,
  dia: 45,
  temp: 37.1,
  resp: 42,
  rhythm: 'sinusal',
  color: '#00C896'
}, {
  id: 'hipox',
  label: 'Hipoxemia',
  hr: 80,
  spo2: 74,
  sys: 110,
  dia: 70,
  temp: 36.5,
  resp: 32,
  rhythm: 'sinusal',
  color: '#E63946'
}, {
  id: 'fiebre',
  label: 'Fiebre alta',
  hr: 100,
  spo2: 96,
  sys: 135,
  dia: 88,
  temp: 39.9,
  resp: 22,
  rhythm: 'sinusal',
  color: '#F5A623'
}];
const RHYTHM_INFO = {
  sinusal: {
    label: 'Ritmo sinusal',
    color: '#00C896'
  },
  afib: {
    label: 'Fibrilación auricular',
    color: '#F5A623'
  },
  flutter: {
    label: 'Flutter auricular',
    color: '#F5A623'
  },
  vtach: {
    label: 'Taquicardia ventricular',
    color: '#E63946'
  },
  vfib: {
    label: 'Fibrilación ventricular',
    color: '#C1121F'
  },
  asistolia: {
    label: 'Asistolia',
    color: '#C1121F'
  },
  marcap: {
    label: 'Marcapasos',
    color: '#9B59B6'
  }
};
const SPO2_BRANDS = {
  nellcor: {
    label: 'Nellcor OxiMax',
    color: '#3A86FF',
    detect: 'SRC resistor: 10kΩ adulto / 4.7kΩ pediátrico',
    notes: 'Rango 70–100%. Respuesta 3–15s.',
    hw: 'Incluir R_SRC entre pins 3-5.'
  },
  bci: {
    label: 'BCI / Smiths',
    color: '#9B59B6',
    detect: 'Continuidad (sin resistor específico)',
    notes: 'Algoritmo simple. Rango 70–100%.',
    hw: 'Cortocircuito en pins de detección.'
  },
  masimo: {
    label: 'Masimo LNOP',
    color: '#F5A623',
    detect: 'Resistor ID en cable LNOP',
    notes: 'Tecnología SET®. Tolerante al movimiento.',
    hw: 'Medir R_ID de sonda original.'
  }
};
const PARAM_CFG = {
  nibp: {
    label: 'Presión (NIBP)',
    unit: 'mmHg',
    tipo: 'offset',
    norma: 'AAMI SP10',
    tol: 2,
    nomLabel: 'Nominal (mmHg)',
    refLabel: 'Referencia patrón (mmHg)'
  },
  temp: {
    label: 'Temperatura',
    unit: '°C',
    tipo: 'offset',
    norma: 'IEC 60601-2-56',
    tol: 0.2,
    nomLabel: 'Nominal (°C)',
    refLabel: 'Referencia patrón (°C)',
    step: 0.01
  },
  ecg: {
    label: 'ECG Amplitud',
    unit: 'mV',
    tipo: 'gain',
    norma: 'IEC 60601-2-25',
    tol: 0.05,
    nomLabel: 'Nominal (mV)',
    refLabel: 'Medido instrumento (mV)',
    step: 0.01
  },
  spo2: {
    label: 'SpO₂',
    unit: '%',
    tipo: 'offset',
    norma: 'ISO 9919',
    tol: 2,
    nomLabel: 'Nominal (%)',
    refLabel: 'Referencia patrón (%)'
  }
};
const defaultInstr = {
  marca: '',
  modelo: '',
  serie: '',
  cert: '',
  trazabilidad: 'INTI / Red OAA'
};
const defaultCalP = {
  offset: 0,
  gain: 1,
  applied: false,
  points: [],
  instrument: {
    ...defaultInstr
  },
  date: '',
  nextDate: '',
  tecnico: ''
};
const defaultCal = {
  nibp: {
    ...defaultCalP
  },
  temp: {
    ...defaultCalP
  },
  ecg: {
    ...defaultCalP
  },
  spo2: {
    ...defaultCalP
  }
};

// ══════════════════════════════════════════════════════
// ICONOS (SVG en línea — sin fuentes de emoji ni CDN externo,
// para no reintroducir dependencias que rompan el uso offline)
// ══════════════════════════════════════════════════════
const Icon = ({
  d,
  size = 20,
  color = 'currentColor',
  children
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, children || /*#__PURE__*/React.createElement("path", {
  d: d
}));
const IconMonitor = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "3",
  width: "20",
  height: "14",
  rx: "2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "21",
  x2: "16",
  y2: "21"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "17",
  x2: "12",
  y2: "21"
}));
const IconActivity = p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
  d: "M22 12h-4l-3 9L9 3l-3 9H2"
}));
const IconDroplet = p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
  d: "M12 2.69s6 7.15 6 11a6 6 0 0 1-12 0c0-3.85 6-11 6-11z"
}));
const IconSettings = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
}));
const IconClipboard = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z"
}), /*#__PURE__*/React.createElement("rect", {
  x: "5",
  y: "4",
  width: "14",
  height: "18",
  rx: "2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9",
  y1: "11",
  x2: "15",
  y2: "11"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9",
  y1: "15",
  x2: "15",
  y2: "15"
}));
const IconFileText = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "14 2 14 8 20 8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "13",
  x2: "16",
  y2: "13"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "17",
  x2: "16",
  y2: "17"
}));
const IconZap = p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
  d: "M13 2L4.09 12.11a1 1 0 0 0 .76 1.65h5.4l-1.1 8.24 8.91-10.11a1 1 0 0 0-.76-1.65h-5.4z"
}));
const IconSliders = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "21",
  x2: "4",
  y2: "14"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "10",
  x2: "4",
  y2: "3"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "21",
  x2: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "8",
  x2: "12",
  y2: "3"
}), /*#__PURE__*/React.createElement("line", {
  x1: "20",
  y1: "21",
  x2: "20",
  y2: "16"
}), /*#__PURE__*/React.createElement("line", {
  x1: "20",
  y1: "12",
  x2: "20",
  y2: "3"
}), /*#__PURE__*/React.createElement("line", {
  x1: "1",
  y1: "14",
  x2: "7",
  y2: "14"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9",
  y1: "8",
  x2: "15",
  y2: "8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "17",
  y1: "16",
  x2: "23",
  y2: "16"
}));
const IconWifi = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M5 12.55a11 11 0 0 1 14.08 0"
}), /*#__PURE__*/React.createElement("path", {
  d: "M1.42 9a16 16 0 0 1 21.16 0"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8.53 16.11a6 6 0 0 1 6.95 0"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "20",
  x2: "12.01",
  y2: "20"
}));
const IconBluetooth = p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
  d: "M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"
}));
const IconChevron = p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
  d: "M6 9l6 6 6-6"
}));

// ══════════════════════════════════════════════════════
// ECG MATH
// ══════════════════════════════════════════════════════
function gauss(x, c, w, a) {
  return a * Math.exp(-Math.pow((x - c) / w, 2));
}
function ecgSinusal(p) {
  return gauss(p, .080, .024, .14) + gauss(p, .192, .007, -.12) + gauss(p, .208, .011, 1) + gauss(p, .226, .007, -.28) + gauss(p, .420, .068, .27);
}
function ecgAfib(p) {
  const f = .030 * Math.sin(p * Math.PI * 14) + .018 * Math.sin(p * Math.PI * 23 + .9) + .012 * Math.sin(p * Math.PI * 34 + 2);
  return f + gauss(p, .192, .007, -.12) + gauss(p, .208, .011, 1) + gauss(p, .226, .007, -.28) + gauss(p, .420, .062, .22);
}
function ecgFlutter(p) {
  return .15 * Math.sin(p * Math.PI * 4 - .5) + .08 * Math.sin(p * Math.PI * 8) + gauss(p, .208, .011, .9) + gauss(p, .226, .007, -.25) + gauss(p, .420, .06, .2);
}
function ecgVtach(p) {
  return gauss(p, .18, .025, -.22) + gauss(p, .26, .028, .88) + gauss(p, .34, .022, -.48) + gauss(p, .52, .09, -.2);
}
function ecgMarcap(p) {
  return (p >= .17 && p < .178 ? 2 : 0) + gauss(p, .22, .022, .72) + gauss(p, .30, .018, -.38) + gauss(p, .50, .08, -.18);
}
function calSignal(ph, mode, amp) {
  if (mode === 'cuadrada') return ph < .5 ? amp : 0;
  if (mode === 'senoidal') return amp * Math.sin(ph * 2 * Math.PI);
  if (mode === 'triangular') {
    if (ph < .25) return amp * (ph / .25);
    if (ph < .75) return amp * (1 - (ph - .25) / .25);
    return amp * (-1 + (ph - .75) / .25);
  }
  return 0;
}
function getECG(ph, rhythm, mode, amp, st) {
  if (mode !== 'cardiaco') return calSignal(ph, mode, amp);
  let b;
  switch (rhythm) {
    case 'sinusal':
      b = ecgSinusal(ph) * amp;
      break;
    case 'afib':
      b = ecgAfib(ph) * amp;
      break;
    case 'flutter':
      b = ecgFlutter(ph) * amp;
      break;
    case 'vtach':
      b = ecgVtach(ph) * amp;
      break;
    case 'vfib':
      return (Math.random() - .5) * 1.4 * amp;
    case 'asistolia':
      return 0;
    case 'marcap':
      b = ecgMarcap(ph) * amp;
      break;
    default:
      b = ecgSinusal(ph) * amp;
  }
  if (st !== 0 && rhythm !== 'vfib' && rhythm !== 'asistolia' && ph > .235 && ph < .385) b += st * Math.min(1, Math.min((ph - .235) / .025, (.385 - ph) / .025));
  return b;
}
function getPleth(p, rhythm, spo2) {
  if (rhythm === 'vfib' || rhythm === 'asistolia') return 0;
  let v = p < .28 ? Math.pow(Math.sin(p / .28 * Math.PI / 2), 2) : Math.pow(Math.cos((p - .28) / .72 * Math.PI / 2), 1.5) * .38;
  return v * (spo2 / 100);
}

// ══════════════════════════════════════════════════════
// CANVAS
// ══════════════════════════════════════════════════════
function drawWave(canvas, buf, color, label, yMin, yMax) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width,
    H = canvas.height,
    pL = 4,
    pR = 4,
    pT = 4,
    pB = 12;
  const pH = H - pT - pB,
    pW = W - pL - pR;
  ctx.fillStyle = '#0E1826';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const y = pT + i / 4 * pH;
    ctx.beginPath();
    ctx.moveTo(pL, y);
    ctx.lineTo(W - pR, y);
    ctx.stroke();
  }
  for (let i = 1; i < 8; i++) {
    const x = pL + i / 8 * pW;
    ctx.beginPath();
    ctx.moveTo(x, pT);
    ctx.lineTo(x, pT + pH);
    ctx.stroke();
  }
  ctx.fillStyle = color + '66';
  ctx.font = '8px Space Mono,monospace';
  ctx.textAlign = 'left';
  ctx.fillText(label, pL + 3, H - 3);
  if (buf.length < 2) return;
  const sy = v => pT + pH * (1 - (v - yMin) / (yMax - yMin));
  ctx.save();
  ctx.shadowBlur = 9;
  ctx.shadowColor = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  buf.forEach((v, i) => {
    const x = pL + i,
      y = Math.max(pT, Math.min(pT + pH, sy(v)));
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.restore();
  if (buf.length > 0) {
    const hx = pL + buf.length - 1,
      hy = Math.max(pT, Math.min(pT + pH, sy(buf[buf.length - 1])));
    ctx.save();
    ctx.beginPath();
    ctx.arc(hx, hy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.fill();
    ctx.restore();
  }
}
function WaveCanvas({
  vitals,
  rhythm,
  running,
  type,
  ecgMode,
  amplitude,
  stOffset,
  h
}) {
  const canvasRef = useRef(null),
    buf = useRef([]),
    phase = useRef(Math.random() * .3),
    rr = useRef(1),
    lastT = useRef(null),
    raf = useRef(null);
  const p = useRef({
    vitals,
    rhythm,
    running,
    ecgMode,
    amplitude,
    stOffset
  });
  useEffect(() => {
    p.current = {
      vitals,
      rhythm,
      running,
      ecgMode,
      amplitude,
      stOffset
    };
  }, [vitals, rhythm, running, ecgMode, amplitude, stOffset]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const loop = () => {
      const {
        vitals,
        rhythm,
        running,
        ecgMode,
        amplitude,
        stOffset
      } = p.current;
      const now = performance.now();
      if (!lastT.current) lastT.current = now;
      const dt = Math.min((now - lastT.current) / 1000, .05);
      lastT.current = now;
      const pW = canvas.width - 8;
      if (running) {
        const ct = 60 / Math.max(1, vitals.hr || 60);
        phase.current += dt / (rr.current * ct);
        if (phase.current >= 1) {
          phase.current -= 1;
          rr.current = rhythm === 'afib' ? .6 + Math.random() * .8 : rhythm === 'flutter' ? .5 : 1;
        }
        buf.current.push(type === 'ecg' ? getECG(phase.current, rhythm, ecgMode, amplitude, stOffset) : getPleth(phase.current, rhythm, vitals.spo2));
      } else buf.current.push(0);
      if (buf.current.length > pW) buf.current.shift();
      if (type === 'ecg') {
        const col = ecgMode !== 'cardiaco' ? '#F5A623' : '#00C896';
        drawWave(canvas, buf.current, col, ecgMode !== 'cardiaco' ? `CAL ${ecgMode.toUpperCase()}` : 'ECG II', -0.5 * amplitude - .1, 2.6 * amplitude + .3);
      } else {
        const c = vitals.spo2 < 90 ? '#E63946' : vitals.spo2 < 95 ? '#F5A623' : '#00BFFF';
        drawWave(canvas, buf.current, c, 'PLETH', -.05, 1.05);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf.current);
      lastT.current = null;
    };
  }, [type]);
  const ch = h || 100;
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 540,
    height: ch,
    style: {
      width: '100%',
      height: ch + 'px',
      display: 'block'
    }
  });
}

// ══════════════════════════════════════════════════════
// UI ATOMS
// ══════════════════════════════════════════════════════
function Readout({
  label,
  value,
  unit,
  color,
  alarm,
  small,
  cal
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.5)',
      border: `1px solid ${alarm ? color + '80' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 6,
      padding: small ? '6px 4px' : '9px 6px',
      textAlign: 'center',
      position: 'relative'
    }
  }, cal && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      right: 3,
      fontFamily: 'Space Mono,monospace',
      fontSize: 6,
      color: '#F5A623'
    }
  }, "CAL"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: small ? 22 : 32,
      fontWeight: 700,
      color,
      textShadow: `0 0 10px ${color}70`,
      lineHeight: 1,
      letterSpacing: -1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 7,
      color: color + '70',
      letterSpacing: '0.08em',
      marginTop: 2
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 7,
      color: 'rgba(255,255,255,0.2)',
      marginTop: 1
    }
  }, unit));
}

// Sección desplegable
function Sec({
  icon,
  title,
  color,
  defaultOpen,
  children
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid #E2E8F0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      width: '100%',
      padding: '14px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'white',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 14,
      color: color || '#1A2535'
    }
  }, title)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#94A3B8',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.2s',
      flexShrink: 0,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(IconChevron, {
    size: 16
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 16px',
      animation: 'fadeIn 0.15s ease'
    }
  }, children));
}
const INP = {
  padding: '8px 10px',
  border: '1px solid #E2E8F0',
  borderRadius: 6,
  fontSize: 13,
  fontFamily: 'Space Mono,monospace',
  outline: 'none',
  width: '100%'
};
const LBL = {
  fontSize: 11,
  color: '#5A6B7E',
  fontWeight: 500,
  display: 'block',
  marginBottom: 3
};

// Slider row
function NumControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange
}) {
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState('');
  const holdRef = useRef(null);
  const fmt = v => step < 1 ? Number(v).toFixed(1) : String(v);
  const clamp = v => Math.round(Math.min(max, Math.max(min, v)) * (1 / step)) / (1 / step);
  const inc = () => onChange(clamp(parseFloat(value) + step));
  const dec = () => onChange(clamp(parseFloat(value) - step));
  const startHold = fn => {
    fn();
    holdRef.current = setInterval(fn, 120);
  };
  const stopHold = () => {
    clearInterval(holdRef.current);
  };
  const commit = () => {
    const v = parseFloat(editVal);
    if (!isNaN(v)) onChange(clamp(v));
    setEditing(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 10,
      color: '#5A6B7E',
      width: 34,
      flexShrink: 0
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    onMouseDown: () => startHold(dec),
    onMouseUp: stopHold,
    onMouseLeave: stopHold,
    onTouchStart: e => {
      e.preventDefault();
      startHold(dec);
    },
    onTouchEnd: stopHold,
    style: {
      width: 42,
      height: 42,
      fontSize: 22,
      fontWeight: 300,
      borderRadius: 8,
      border: '1px solid #E2E8F0',
      background: 'white',
      cursor: 'pointer',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none'
    }
  }, "\u2212"), editing ? /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: editVal,
    autoFocus: true,
    onChange: e => setEditVal(e.target.value),
    onBlur: commit,
    onKeyDown: e => e.key === 'Enter' && commit(),
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Space Mono,monospace',
      fontSize: 20,
      fontWeight: 700,
      border: '2px solid #00C896',
      borderRadius: 8,
      padding: '8px 4px',
      outline: 'none'
    }
  }) : /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setEditVal(fmt(value));
      setEditing(true);
    },
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Space Mono,monospace',
      fontSize: 20,
      fontWeight: 700,
      background: '#F8F9FB',
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      padding: '9px 4px',
      cursor: 'pointer',
      lineHeight: 1
    }
  }, fmt(value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: '#aaa',
      marginLeft: 3
    }
  }, unit)), /*#__PURE__*/React.createElement("button", {
    onMouseDown: () => startHold(inc),
    onMouseUp: stopHold,
    onMouseLeave: stopHold,
    onTouchStart: e => {
      e.preventDefault();
      startHold(inc);
    },
    onTouchEnd: stopHold,
    style: {
      width: 42,
      height: 42,
      fontSize: 22,
      fontWeight: 300,
      borderRadius: 8,
      border: '1px solid #E2E8F0',
      background: 'white',
      cursor: 'pointer',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none'
    }
  }, "+"));
}
// Keep SliderRow as alias for NumControl
const SliderRow = NumControl;

// ══════════════════════════════════════════════════════
// MONITOR DISPLAY (panel oscuro reutilizable)
// ══════════════════════════════════════════════════════
function MonitorDisplay({
  cv,
  rhythm,
  running,
  ecgMode,
  amplitude,
  stOffset,
  cal,
  compact,
  tempIsReal
}) {
  const dead = rhythm === 'vfib' || rhythm === 'asistolia';
  const ri = RHYTHM_INFO[rhythm] || RHYTHM_INFO.sinusal;
  const hrC = dead ? '#E63946' : cv.hr < 50 ? '#3A86FF' : cv.hr > 120 ? '#F5A623' : '#00C896';
  const spC = cv.spo2 < 90 ? '#E63946' : cv.spo2 < 95 ? '#F5A623' : '#00BFFF';
  const nibpC = dead ? '#E63946' : cv.sys >= 180 ? '#E63946' : cv.sys >= 140 ? '#F5A623' : cv.sys < 90 ? '#3A86FF' : '#00C896';
  const tmpC = cv.temp >= 38.5 ? '#E63946' : cv.temp >= 37.5 ? '#F5A623' : cv.temp < 35.5 ? '#3A86FF' : '#00C896';
  const map = Math.round(cv.dia + (cv.sys - cv.dia) / 3);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0E1826',
      padding: '10px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 8,
      color: 'rgba(0,200,150,0.35)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase'
    }
  }, ecgMode !== 'cardiaco' ? `CAL ${ecgMode.toUpperCase()}` : 'Lead II'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      color: ri.color,
      border: `1px solid ${ri.color}40`,
      padding: '2px 8px',
      borderRadius: 3,
      animation: dead ? 'blink 0.8s step-end infinite' : 'none'
    }
  }, ecgMode !== 'cardiaco' ? `${amplitude.toFixed(2)} mV` : ri.label)), /*#__PURE__*/React.createElement(WaveCanvas, {
    vitals: cv,
    rhythm: rhythm,
    running: running,
    type: "ecg",
    ecgMode: ecgMode,
    amplitude: amplitude,
    stOffset: stOffset,
    h: compact ? 75 : 100
  }), !compact && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 8,
      color: 'rgba(0,191,255,0.35)',
      letterSpacing: '0.1em'
    }
  }, "PLETH \u2014 SpO\u2082"), /*#__PURE__*/React.createElement(WaveCanvas, {
    vitals: cv,
    rhythm: rhythm,
    running: running,
    type: "pleth",
    ecgMode: ecgMode,
    amplitude: amplitude,
    stOffset: stOffset,
    h: 60
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Readout, {
    label: "FC",
    value: dead ? '---' : cv.hr,
    unit: "bpm",
    color: hrC,
    alarm: dead || cv.hr < 50 || cv.hr > 120,
    small: true
  }), /*#__PURE__*/React.createElement(Readout, {
    label: "SpO\u2082",
    value: dead ? '---' : cv.spo2,
    unit: "%",
    color: spC,
    alarm: dead || cv.spo2 < 90,
    small: true,
    cal: cal?.spo2?.applied
  }), /*#__PURE__*/React.createElement(Readout, {
    label: "RESP",
    value: dead ? '---' : cv.resp,
    unit: "rpm",
    color: "#00C896",
    small: true
  }), /*#__PURE__*/React.createElement(Readout, {
    label: "TEMP",
    value: dead ? '---' : Number(cv.temp).toFixed(1),
    unit: "\xB0C",
    color: tmpC,
    alarm: cv.temp >= 38.5 || cv.temp < 35.5,
    small: true,
    cal: cal?.temp?.applied && !tempIsReal
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.5)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 6,
      padding: '8px 12px',
      position: 'relative'
    }
  }, cal?.nibp?.applied && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 4,
      right: 6,
      fontFamily: 'Space Mono,monospace',
      fontSize: 7,
      color: '#F5A623'
    }
  }, "CAL"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 32,
      fontWeight: 700,
      color: nibpC,
      textShadow: `0 0 10px ${nibpC}70`,
      lineHeight: 1,
      letterSpacing: -1
    }
  }, dead ? '---' : `${cv.sys}/${cv.dia}`), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 8,
      color: 'rgba(255,255,255,0.22)',
      marginTop: 2
    }
  }, "NIBP mmHg \xB7 MAP ", dead ? '---' : map, stOffset !== 0 && ecgMode === 'cardiaco' && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10,
      color: stOffset > 0 ? '#F5A623' : '#3A86FF'
    }
  }, "\xB7 ST ", stOffset > 0 ? '+' : '', stOffset.toFixed(2), "mV"))), (dead || cv.sys >= 180 || cv.sys < 90 || cv.spo2 < 90) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap'
    }
  }, dead && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      padding: '3px 8px',
      borderRadius: 3,
      color: '#E63946',
      border: '1px solid #E63946',
      background: 'rgba(230,57,70,0.1)',
      animation: 'blink 0.7s step-end infinite'
    }
  }, "\u26A0 ", rhythm === 'vfib' ? 'FIBRILACIÓN V.' : 'ASISTOLIA'), !dead && cv.sys >= 180 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      padding: '3px 8px',
      borderRadius: 3,
      color: '#E63946',
      border: '1px solid #E63946'
    }
  }, "HTA SEVERA"), !dead && cv.sys < 90 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      padding: '3px 8px',
      borderRadius: 3,
      color: '#3A86FF',
      border: '1px solid #3A86FF'
    }
  }, "HIPOTENSI\xD3N"), !dead && cv.spo2 < 90 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      padding: '3px 8px',
      borderRadius: 3,
      color: '#E63946',
      border: '1px solid #E63946'
    }
  }, "SpO\u2082 BAJA")));
}

// ══════════════════════════════════════════════════════
// PANTALLA DE CONEXIÓN
// ══════════════════════════════════════════════════════
function ConnectScreen({
  onConnect,
  onDemo
}) {
  const [status, setStatus] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [ip, setIp] = useState('192.168.4.1');
  const hasBLE = 'bluetooth' in navigator;
  const isEsp = window.location.hostname === '192.168.4.1';
  // Una página HTTPS (como este sitio en Vercel) no puede abrir un WebSocket
  // ws:// sin cifrar hacia el módulo local: el navegador lo bloquea por
  // "mixed content" antes de intentar nada. Detectarlo evita que el usuario
  // vea un error críptico en el campo — se le explica la causa de una.
  const isHttps = window.location.protocol === 'https:';

  // Auto-connect si estamos en el ESP32
  useEffect(() => {
    if (!isEsp) return;
    setStatus('Conectando automáticamente...');
    setConnecting(true);
    const sock = new WebSocket(`ws://192.168.4.1/ws`);
    sock.onopen = () => {
      setStatus('¡Conectado!');
      setTimeout(() => onConnect('wifi', sock), 600);
    };
    sock.onerror = () => {
      setStatus('Error de conexión');
      setConnecting(false);
    };
    return () => {
      if (sock.readyState === WebSocket.OPEN || sock.readyState === WebSocket.CONNECTING) sock.close();
    };
  }, []);

  // Busca un dispositivo BLE ya autorizado antes (API de "permisos
  // persistentes" de Web Bluetooth) y reconecta directo, SIN mostrar el
  // selector — así no hay que volver a elegir "SEM-Sim" de una lista cada
  // vez que se corta la conexión. Si el navegador no soporta esto, o el
  // módulo no está a la vista, no hace nada (silencioso, no es un error).
  const reconnectKnownBLE = async () => {
    if (!hasBLE || !navigator.bluetooth.getDevices) return null;
    try {
      const devices = await navigator.bluetooth.getDevices();
      const known = devices.find(d => d.name === 'SEM-Simulator' || d.name === 'SEM-Sim');
      if (!known) return null;
      const server = await known.gatt.connect();
      return {
        device: known,
        server
      };
    } catch (e) {
      return null;
    }
  };

  // Al abrir la pantalla: si ya autorizamos el módulo antes, probamos
  // reconectar solos en segundo plano, sin molestar si no se puede.
  useEffect(() => {
    if (isEsp) return;
    (async () => {
      const conn = await reconnectKnownBLE();
      if (conn) {
        setConnecting(true);
        setStatus('¡Reconectado por BLE!');
        setTimeout(() => onConnect('ble', conn), 600);
      }
    })();
  }, []);
  const connectWifi = () => {
    if (isHttps) {
      setStatus('WiFi no disponible desde esta página (HTTPS). Entrá a http://192.168.4.1 desde la red del módulo SEM, o usá Bluetooth / modo demo.');
      return;
    }
    setConnecting(true);
    setStatus('Conectando por WiFi...');
    try {
      const sock = new WebSocket(`ws://${ip}/ws`);
      sock.onopen = () => {
        setStatus('¡Conectado por WiFi!');
        setTimeout(() => onConnect('wifi', sock), 600);
      };
      sock.onclose = () => {
        setStatus('Desconectado');
        setConnecting(false);
      };
      sock.onerror = () => {
        setStatus('Error — verificá que el celular esté en la red SEM-Simulator');
        setConnecting(false);
      };
    } catch (e) {
      setStatus('Error: ' + e.message);
      setConnecting(false);
    }
  };
  const connectBLE = async () => {
    setConnecting(true);
    setStatus('Buscando SEM-Sim por BLE...');
    try {
      // Si el navegador ya lo autorizó antes, reconectar directo sin selector
      const known = await reconnectKnownBLE();
      if (known) {
        setStatus('¡Conectado por BLE!');
        setTimeout(() => onConnect('ble', known), 600);
        return;
      }
      const device = await navigator.bluetooth.requestDevice({
        filters: [{
          name: 'SEM-Simulator'
        }, {
          name: 'SEM-Sim'
        }],
        optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
      });
      const server = await device.gatt.connect();
      setStatus('¡Conectado por BLE!');
      setTimeout(() => onConnect('ble', {
        device,
        server
      }), 600);
    } catch (e) {
      setStatus('BLE: ' + e.message);
      setConnecting(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#0E1826',
      padding: 24,
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 28,
      fontWeight: 700,
      color: '#00C896',
      letterSpacing: '0.1em'
    }
  }, "\u25C9 SEM"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: 'rgba(255,255,255,0.7)',
      marginTop: 4
    }
  }, "Simulador de Paciente"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 10,
      color: 'rgba(255,255,255,0.3)',
      marginTop: 4,
      letterSpacing: '0.1em'
    }
  }, "SOLUCIONES ELECTROM\xC9DICAS SJ")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 300,
      height: 60,
      background: '#152238',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(0,200,150,0.2)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 300 60",
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "0,30 40,30 55,30 62,10 70,50 78,5 86,55 94,28 120,28 140,28 147,10 155,50 163,5 171,55 179,28 210,28 300,28",
    fill: "none",
    stroke: "#00C896",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      filter: 'drop-shadow(0 0 4px #00C896)'
    }
  }))), !isEsp && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 340,
      background: 'rgba(0,200,150,0.08)',
      border: '1px solid rgba(0,200,150,0.25)',
      borderRadius: 12,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 11,
      color: '#00C896',
      letterSpacing: '0.08em',
      marginBottom: 10
    }
  }, "\uD83D\uDCE1 WIFI"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.5)',
      marginBottom: 10
    }
  }, "Conect\xE1 el celular a la red del m\xF3dulo SEM, luego toc\xE1 Conectar."), isHttps && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#F5A623',
      marginBottom: 10,
      padding: '6px 8px',
      borderRadius: 5,
      background: 'rgba(245,166,35,0.08)',
      border: '1px solid rgba(245,166,35,0.25)'
    }
  }, "\u26A0 Desde este sitio (HTTPS) el WiFi local no conecta. Abr\xED ", /*#__PURE__*/React.createElement("b", null, "http://192.168.4.1"), " en el navegador estando en la red del m\xF3dulo, o us\xE1 Bluetooth."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: ip,
    onChange: e => setIp(e.target.value),
    style: {
      flex: 1,
      padding: '8px 12px',
      borderRadius: 6,
      border: '1px solid rgba(0,200,150,0.3)',
      background: 'rgba(0,0,0,0.4)',
      color: 'rgba(0,200,150,0.4)',
      fontFamily: 'Space Mono,monospace',
      fontSize: 11,
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: connectWifi,
    disabled: connecting,
    style: {
      padding: '8px 18px',
      background: '#00C896',
      color: '#0E1826',
      border: 'none',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 700,
      cursor: 'pointer',
      flexShrink: 0
    }
  }, "Conectar"))), hasBLE && /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 340,
      background: 'rgba(58,134,255,0.08)',
      border: '1px solid rgba(58,134,255,0.25)',
      borderRadius: 12,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 11,
      color: '#3A86FF',
      letterSpacing: '0.08em',
      marginBottom: 10
    }
  }, "\uD83D\uDD35 BLUETOOTH"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.5)',
      marginBottom: 10
    }
  }, "Mantiene internet activo. Solo Chrome Android."), /*#__PURE__*/React.createElement("button", {
    onClick: connectBLE,
    disabled: connecting,
    style: {
      width: '100%',
      padding: '8px',
      background: '#3A86FF',
      color: 'white',
      border: 'none',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, "Conectar m\xF3dulo SEM"))), status && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 12,
      color: status.includes('!') ? '#00C896' : status.includes('Error') || status.includes('BLE:') ? '#E63946' : 'rgba(255,255,255,0.5)',
      textAlign: 'center',
      padding: '8px 16px',
      borderRadius: 6,
      background: 'rgba(255,255,255,0.05)'
    }
  }, connecting && !status.includes('!') && /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 8
    }
  }, "\u27F3"), status), /*#__PURE__*/React.createElement("button", {
    onClick: onDemo,
    style: {
      padding: '8px 24px',
      background: 'transparent',
      color: 'rgba(255,255,255,0.3)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 6,
      fontSize: 12,
      cursor: 'pointer',
      marginTop: 8
    }
  }, "Modo demo (sin hardware)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      color: 'rgba(255,255,255,0.15)',
      textAlign: 'center',
      marginTop: 8
    }
  }, "v3.5"));
}

// ══════════════════════════════════════════════════════
// HOME SCREEN — cards
// ══════════════════════════════════════════════════════
function HomeCard({
  icon,
  title,
  value,
  sub,
  color,
  onClick,
  badge
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      background: '#1A2A42',
      border: `1px solid ${color}25`,
      borderRadius: 12,
      padding: '16px 14px',
      textAlign: 'left',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%',
      transition: 'border-color 0.15s',
      WebkitTapHighlightColor: 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color
    }
  }, icon), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 8,
      padding: '2px 6px',
      borderRadius: 3,
      background: `${color}22`,
      color: color
    }
  }, badge)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      color: color,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: 4
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 20,
      fontWeight: 700,
      color: 'white',
      lineHeight: 1.1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.35)',
      marginTop: 5
    }
  }, sub)));
}

// Home: solo tarjetas de navegación — sin vista previa en vivo, para que
// entrar a la app sea elegir a dónde ir, no ver el monitor ya corriendo.
function HomeScreen({
  cv,
  rhythm,
  amplitude,
  cal,
  anyCal,
  setScreen,
  sensorData
}) {
  const dead = rhythm === 'vfib' || rhythm === 'asistolia';
  const calCount = ['nibp', 'temp', 'ecg', 'spo2'].filter(k => cal[k].applied).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "screen",
    style: {
      height: '100%',
      overflow: 'auto',
      padding: 16,
      background: '#152238'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 10,
      color: 'rgba(255,255,255,0.35)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, "Eleg\xED una pantalla")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(HomeCard, {
    icon: /*#__PURE__*/React.createElement(IconMonitor, {
      size: 22
    }),
    title: "Monitor",
    value: dead ? '---' : `${cv.sys}/${cv.dia}`,
    sub: `FC ${cv.hr} · SpO₂ ${cv.spo2}% · ${Number(cv.temp).toFixed(1)}°C${sensorData && sensorData.tempRef > 0 ? ' · real' : ''}`,
    color: "#00C896",
    onClick: () => setScreen('monitor')
  }), /*#__PURE__*/React.createElement(HomeCard, {
    icon: /*#__PURE__*/React.createElement(IconActivity, {
      size: 22
    }),
    title: "ECG",
    value: dead ? '---' : `${amplitude.toFixed(1)} mV`,
    sub: RHYTHM_INFO[rhythm]?.label || rhythm,
    color: "#00C896",
    onClick: () => setScreen('ecg')
  }), /*#__PURE__*/React.createElement(HomeCard, {
    icon: /*#__PURE__*/React.createElement(IconDroplet, {
      size: 22
    }),
    title: "Saturometr\xEDa",
    value: dead ? '---' : `${cv.spo2}%`,
    sub: `FC ${cv.hr} bpm`,
    color: "#00BFFF",
    onClick: () => setScreen('spo2')
  }), /*#__PURE__*/React.createElement(HomeCard, {
    icon: /*#__PURE__*/React.createElement(IconSettings, {
      size: 22
    }),
    title: "Ajustes",
    value: `${calCount}/4`,
    sub: calCount === 4 ? 'Todos calibrados' : calCount === 0 ? 'Calibración y conexión' : 'Calibración parcial',
    color: "#F5A623",
    onClick: () => setScreen('ajustes'),
    badge: anyCal ? 'ACTIVO' : null
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(HomeCard, {
    icon: /*#__PURE__*/React.createElement(IconClipboard, {
      size: 22
    }),
    title: "Verificaci\xF3n",
    value: "Medir",
    sub: "Registrar lecturas del equipo",
    color: "#9B59B6",
    onClick: () => setScreen('verif')
  }), /*#__PURE__*/React.createElement(HomeCard, {
    icon: /*#__PURE__*/React.createElement(IconFileText, {
      size: 22
    }),
    title: "Informe",
    value: "Generar",
    sub: "Certificado de servicio",
    color: "#6C8EBF",
    onClick: () => setScreen('informe')
  })));
}

// Fila de chips reutilizable (programas, ritmos, etc.)
function ChipRow({
  items,
  selectedId,
  onSelect,
  getBg
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, items.map(it => {
    const sel = selectedId === it.id;
    const bg = sel ? getBg ? getBg(it) : it.color : 'white';
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onSelect(it),
      style: {
        padding: '6px 12px',
        fontSize: 12,
        fontWeight: 500,
        borderRadius: 100,
        cursor: 'pointer',
        border: sel ? 'none' : '1px solid #E2E8F0',
        background: bg,
        color: sel ? 'white' : '#5A6B7E'
      }
    }, it.label);
  }));
}

// Desplegable compacto anidado (para agrupar chips dentro de un Sec)
function MiniSec({
  title,
  defaultOpen,
  children
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#F8F9FB',
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      padding: '9px 12px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: '#5A6B7E',
      fontWeight: 600,
      textTransform: 'uppercase'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#94A3B8',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.2s',
      display: 'flex',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(IconChevron, {
    size: 14
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, children));
}

// ══════════════════════════════════════════════════════
// MONITOR SCREEN
// ══════════════════════════════════════════════════════
function MonitorScreen({
  vitals,
  setV,
  cv,
  rhythm,
  setRhythm,
  running,
  ecgMode,
  amplitude,
  stOffset,
  cal,
  prog,
  setProg,
  applyProg,
  tempIsReal
}) {
  const rhythmItems = Object.entries(RHYTHM_INFO).map(([id, info]) => ({
    id,
    label: info.label,
    color: id === 'sinusal' ? '#22344C' : id === 'marcap' ? '#9B59B6' : ['vfib', 'asistolia'].includes(id) ? '#E63946' : '#F5A623'
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "screen",
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MonitorDisplay, {
    cv: cv,
    rhythm: rhythm,
    running: running,
    ecgMode: ecgMode,
    amplitude: amplitude,
    stOffset: stOffset,
    cal: cal,
    tempIsReal: tempIsReal
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: '#F2F4F7'
    }
  }, /*#__PURE__*/React.createElement(Sec, {
    icon: /*#__PURE__*/React.createElement(IconZap, {
      size: 18,
      color: "#5A6B7E"
    }),
    title: "Tipos / Accesos r\xE1pidos",
    defaultOpen: true,
    color: "#1A2535"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MiniSec, {
    title: "Programas cl\xEDnicos"
  }, /*#__PURE__*/React.createElement(ChipRow, {
    items: PROGRAMS,
    selectedId: prog,
    onSelect: applyProg
  })), /*#__PURE__*/React.createElement(MiniSec, {
    title: "Ritmo ECG"
  }, /*#__PURE__*/React.createElement(ChipRow, {
    items: rhythmItems,
    selectedId: rhythm,
    onSelect: it => {
      setRhythm(it.id);
      setProg(null);
    }
  })))), /*#__PURE__*/React.createElement(Sec, {
    icon: /*#__PURE__*/React.createElement(IconSliders, {
      size: 18,
      color: "#5A6B7E"
    }),
    title: "Par\xE1metros"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(SliderRow, {
    label: "FC",
    value: vitals.hr,
    min: 20,
    max: 200,
    step: 1,
    unit: "bpm",
    onChange: v => setV('hr', v)
  }), /*#__PURE__*/React.createElement(SliderRow, {
    label: "SpO\u2082",
    value: vitals.spo2,
    min: 50,
    max: 100,
    step: 1,
    unit: "%",
    onChange: v => setV('spo2', v)
  }), /*#__PURE__*/React.createElement(SliderRow, {
    label: "SYS",
    value: vitals.sys,
    min: 60,
    max: 260,
    step: 1,
    unit: "mmHg",
    onChange: v => setV('sys', v)
  }), /*#__PURE__*/React.createElement(SliderRow, {
    label: "DIA",
    value: vitals.dia,
    min: 30,
    max: 160,
    step: 1,
    unit: "mmHg",
    onChange: v => setV('dia', v)
  }), /*#__PURE__*/React.createElement(SliderRow, {
    label: "TEMP",
    value: vitals.temp,
    min: 32,
    max: 42,
    step: 0.1,
    unit: "\xB0C",
    onChange: v => setV('temp', v)
  }), /*#__PURE__*/React.createElement(SliderRow, {
    label: "RESP",
    value: vitals.resp,
    min: 4,
    max: 60,
    step: 1,
    unit: "rpm",
    onChange: v => setV('resp', v)
  })))));
}

// ══════════════════════════════════════════════════════
// SPO2 SCREEN
// ══════════════════════════════════════════════════════
function Spo2Screen({
  vitals,
  setV,
  cv,
  rhythm,
  setRhythm,
  running,
  ecgMode,
  amplitude,
  stOffset,
  cal,
  brand,
  setBrand,
  prog,
  setProg,
  applyProg
}) {
  const dead = rhythm === 'vfib' || rhythm === 'asistolia';
  const spC = cv.spo2 < 90 ? '#E63946' : cv.spo2 < 95 ? '#F5A623' : '#00BFFF';
  const b = SPO2_BRANDS[brand];
  return /*#__PURE__*/React.createElement("div", {
    className: "screen",
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0E1826',
      padding: '12px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 8,
      color: 'rgba(0,191,255,0.4)',
      letterSpacing: '0.1em',
      marginBottom: 6
    }
  }, "PLETH \u2014 SpO\u2082"), /*#__PURE__*/React.createElement(WaveCanvas, {
    vitals: cv,
    rhythm: rhythm,
    running: running,
    type: "pleth",
    ecgMode: ecgMode,
    amplitude: amplitude,
    stOffset: stOffset,
    h: 90
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: 8,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.5)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 8,
      padding: '10px 14px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 42,
      fontWeight: 700,
      color: spC,
      textShadow: `0 0 14px ${spC}70`,
      lineHeight: 1
    }
  }, dead ? '---' : cv.spo2), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      color: spC + '80',
      marginTop: 3
    }
  }, "SpO\u2082 %")), /*#__PURE__*/React.createElement(Readout, {
    label: "FC",
    value: dead ? '---' : cv.hr,
    unit: "bpm",
    color: "#00C896",
    alarm: dead || cv.hr < 50 || cv.hr > 120
  }), /*#__PURE__*/React.createElement(Readout, {
    label: "RESP",
    value: dead ? '---' : cv.resp,
    unit: "rpm",
    color: "#00C896"
  })), (dead || cv.spo2 < 90) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      padding: '5px 10px',
      borderRadius: 4,
      background: 'rgba(230,57,70,0.1)',
      border: '1px solid #E63946',
      fontFamily: 'Space Mono,monospace',
      fontSize: 10,
      color: '#E63946',
      animation: dead ? 'blink 0.7s step-end infinite' : 'none'
    }
  }, "\u26A0 ", dead ? 'PARO CARDÍACO / FV' : 'SpO₂ BAJA — HIPOXEMIA')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: '#F2F4F7'
    }
  }, /*#__PURE__*/React.createElement(Sec, {
    icon: /*#__PURE__*/React.createElement(IconZap, {
      size: 18,
      color: "#5A6B7E"
    }),
    title: "Tipos / Accesos r\xE1pidos",
    defaultOpen: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MiniSec, {
    title: "Programas cl\xEDnicos"
  }, /*#__PURE__*/React.createElement(ChipRow, {
    items: PROGRAMS,
    selectedId: prog,
    onSelect: applyProg
  })), /*#__PURE__*/React.createElement(MiniSec, {
    title: "Ritmo card\xEDaco"
  }, /*#__PURE__*/React.createElement(ChipRow, {
    items: Object.entries(RHYTHM_INFO).map(([id, info]) => ({
      id,
      label: info.label,
      color: id === 'sinusal' ? '#22344C' : id === 'marcap' ? '#9B59B6' : ['vfib', 'asistolia'].includes(id) ? '#E63946' : '#F5A623'
    })),
    selectedId: rhythm,
    onSelect: it => {
      setRhythm(it.id);
      setProg(null);
    }
  })), /*#__PURE__*/React.createElement(MiniSec, {
    title: "Marca / Protocolo de sonda"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 10
    }
  }, Object.entries(SPO2_BRANDS).map(([id, bb]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setBrand(id),
    style: {
      flex: 1,
      padding: '8px 6px',
      fontSize: 11,
      fontWeight: 600,
      borderRadius: 8,
      cursor: 'pointer',
      border: brand === id ? 'none' : '1px solid #E2E8F0',
      background: brand === id ? bb.color : 'white',
      color: brand === id ? 'white' : '#5A6B7E'
    }
  }, bb.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8F9FB',
      borderRadius: 8,
      padding: 12,
      fontSize: 12,
      lineHeight: 1.8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Conector:"), " ", b.connector || '—'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Detecci\xF3n:"), " ", b.detect), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Algoritmo:"), " ", b.notes), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      padding: '6px 10px',
      borderRadius: 5,
      background: b.color + '15',
      border: `1px solid ${b.color}33`,
      color: b.color,
      fontSize: 11,
      fontFamily: 'Space Mono,monospace'
    }
  }, "HW: ", b.hw))))), /*#__PURE__*/React.createElement(Sec, {
    icon: /*#__PURE__*/React.createElement(IconSliders, {
      size: 18,
      color: "#5A6B7E"
    }),
    title: "Par\xE1metros"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(SliderRow, {
    label: "SpO\u2082",
    value: vitals.spo2,
    min: 50,
    max: 100,
    step: 1,
    unit: "%",
    onChange: v => setV('spo2', v)
  }), /*#__PURE__*/React.createElement(SliderRow, {
    label: "FC",
    value: vitals.hr,
    min: 20,
    max: 200,
    step: 1,
    unit: "bpm",
    onChange: v => setV('hr', v)
  }), /*#__PURE__*/React.createElement(SliderRow, {
    label: "RESP",
    value: vitals.resp,
    min: 4,
    max: 60,
    step: 1,
    unit: "rpm",
    onChange: v => setV('resp', v)
  })))));
}

// ══════════════════════════════════════════════════════
// ECG SCREEN
// ══════════════════════════════════════════════════════
function EcgScreen({
  vitals,
  setV,
  cv,
  rhythm,
  setRhythm,
  running,
  ecgMode,
  setEcgMode,
  amplitude,
  setAmplitude,
  stOffset,
  setStOffset,
  cal,
  prog,
  setProg,
  applyProg
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "screen",
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0E1826',
      padding: '12px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 8,
      color: 'rgba(0,200,150,0.4)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, ecgMode === 'cardiaco' ? 'ECG Lead II' : `Señal calibración — ${ecgMode}`), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      color: RHYTHM_INFO[rhythm]?.color || '#00C896',
      border: `1px solid ${RHYTHM_INFO[rhythm]?.color || '#00C896'}40`,
      padding: '2px 8px',
      borderRadius: 3
    }
  }, ecgMode !== 'cardiaco' ? `${amplitude.toFixed(2)} mV` : RHYTHM_INFO[rhythm]?.label)), /*#__PURE__*/React.createElement(WaveCanvas, {
    vitals: cv,
    rhythm: rhythm,
    running: running,
    type: "ecg",
    ecgMode: ecgMode,
    amplitude: amplitude,
    stOffset: stOffset,
    h: 110
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 6,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.5)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 6,
      padding: '8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 18,
      fontWeight: 700,
      color: '#00C896',
      lineHeight: 1
    }
  }, amplitude.toFixed(2)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 7,
      color: 'rgba(0,200,150,0.6)',
      marginTop: 2
    }
  }, "AMPLITUD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 7,
      color: 'rgba(255,255,255,0.2)'
    }
  }, "mV")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.5)',
      border: `1px solid ${stOffset !== 0 ? stOffset > 0 ? 'rgba(245,166,35,0.4)' : 'rgba(58,134,255,0.4)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 6,
      padding: '8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 18,
      fontWeight: 700,
      color: stOffset > 0 ? '#F5A623' : stOffset < 0 ? '#3A86FF' : '#00C896',
      lineHeight: 1
    }
  }, stOffset > 0 ? '+' : '', stOffset.toFixed(2)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 7,
      color: 'rgba(0,200,150,0.6)',
      marginTop: 2
    }
  }, "SEG. ST"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 7,
      color: 'rgba(255,255,255,0.2)'
    }
  }, "mV")), /*#__PURE__*/React.createElement(Readout, {
    label: "FC",
    value: cv.hr,
    unit: "bpm",
    color: "#00C896",
    small: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: '#F2F4F7'
    }
  }, /*#__PURE__*/React.createElement(Sec, {
    icon: /*#__PURE__*/React.createElement(IconZap, {
      size: 18,
      color: "#5A6B7E"
    }),
    title: "Tipos / Accesos r\xE1pidos",
    defaultOpen: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MiniSec, {
    title: "Tipo de se\xF1al",
    defaultOpen: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, [['cardiaco', '❤ Cardíaco', '#00C896'], ['cuadrada', '⬜ Cuadrada', '#F5A623'], ['senoidal', '〜 Senoidal', '#3A86FF'], ['triangular', '△ Triangular', '#9B59B6']].map(([id, lbl, col]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setEcgMode(id),
    style: {
      padding: '7px 14px',
      fontSize: 12,
      fontWeight: 500,
      borderRadius: 8,
      cursor: 'pointer',
      border: ecgMode === id ? 'none' : '1px solid #E2E8F0',
      background: ecgMode === id ? col : 'white',
      color: ecgMode === id ? 'white' : '#5A6B7E'
    }
  }, lbl)))), /*#__PURE__*/React.createElement(MiniSec, {
    title: "Ritmo ECG"
  }, /*#__PURE__*/React.createElement(ChipRow, {
    items: Object.entries(RHYTHM_INFO).map(([id, info]) => ({
      id,
      label: info.label,
      color: id === 'sinusal' ? '#22344C' : id === 'marcap' ? '#9B59B6' : ['vfib', 'asistolia'].includes(id) ? '#E63946' : '#F5A623'
    })),
    selectedId: rhythm,
    onSelect: it => setRhythm(it.id)
  })), /*#__PURE__*/React.createElement(MiniSec, {
    title: "Programas cl\xEDnicos"
  }, /*#__PURE__*/React.createElement(ChipRow, {
    items: PROGRAMS,
    selectedId: prog,
    onSelect: applyProg
  })))), /*#__PURE__*/React.createElement(Sec, {
    icon: /*#__PURE__*/React.createElement(IconSliders, {
      size: 18,
      color: "#5A6B7E"
    }),
    title: "Par\xE1metros"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#5A6B7E',
      fontWeight: 500,
      marginBottom: 4
    }
  }, "Amplitud: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#1A2535'
    }
  }, amplitude.toFixed(2), " mV"), cal.ecg.applied && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: '#F5A623',
      marginLeft: 6
    }
  }, "\u2192 ", (amplitude * cal.ecg.gain).toFixed(2), " mV (cal)")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0.1,
    max: 2.0,
    step: 0.05,
    value: amplitude,
    onChange: e => setAmplitude(parseFloat(e.target.value)),
    style: {
      marginBottom: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 10,
      color: '#aaa',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", null, "0.1"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#00C896',
      fontWeight: 600
    }
  }, "1.0 mV est\xE1ndar"), /*#__PURE__*/React.createElement("span", null, "2.0")), ecgMode === 'cardiaco' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#5A6B7E',
      fontWeight: 500,
      marginBottom: 4
    }
  }, "ST: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: stOffset > 0 ? '#F5A623' : stOffset < 0 ? '#3A86FF' : '#00C896'
    }
  }, stOffset > 0 ? '+' : '', stOffset.toFixed(2), " mV"), stOffset !== 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: stOffset > 0 ? '#F5A623' : '#3A86FF',
      marginLeft: 6
    }
  }, stOffset > 0 ? '↑ elevación' : '↓ depresión')), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: -0.5,
    max: 0.5,
    step: 0.05,
    value: stOffset,
    onChange: e => setStOffset(parseFloat(e.target.value)),
    style: {
      accentColor: stOffset > 0 ? '#F5A623' : stOffset < 0 ? '#3A86FF' : '#64748b',
      marginBottom: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 10,
      color: '#aaa',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#3A86FF'
    }
  }, "-0.5 depresi\xF3n"), /*#__PURE__*/React.createElement("span", null, "0"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#F5A623'
    }
  }, "+0.5 elevaci\xF3n")), stOffset !== 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 10px',
      borderRadius: 5,
      background: stOffset > 0 ? 'rgba(245,166,35,0.08)' : 'rgba(58,134,255,0.08)',
      border: `1px solid ${stOffset > 0 ? 'rgba(245,166,35,0.3)' : 'rgba(58,134,255,0.3)'}`,
      fontSize: 11,
      color: stOffset > 0 ? '#F5A623' : '#3A86FF',
      marginBottom: 8
    }
  }, stOffset > 0 ? `ST +${stOffset.toFixed(2)} mV — posible isquemia / infarto` : `ST ${stOffset.toFixed(2)} mV — isquemia subendocárdica`), /*#__PURE__*/React.createElement("button", {
    onClick: () => setStOffset(0),
    style: {
      padding: '5px 12px',
      fontSize: 11,
      background: 'none',
      border: '1px solid #E2E8F0',
      borderRadius: 6,
      cursor: 'pointer',
      color: '#5A6B7E'
    }
  }, "\u21BA Reset ST"))))));
}

// ══════════════════════════════════════════════════════
// CALIBRACIÓN, VERIFICACIÓN, INFORME (igual que antes)
// ══════════════════════════════════════════════════════
function calcStat(errors) {
  if (!errors.length) return null;
  const m = errors.reduce((a, b) => a + b, 0) / errors.length;
  const sd = Math.sqrt(errors.reduce((a, b) => a + Math.pow(b - m, 2), 0) / errors.length);
  return {
    mean: m,
    sd,
    passM: Math.abs(m) <= 5,
    passSd: sd <= 8,
    pass: Math.abs(m) <= 5 && sd <= 8
  };
}
const errClr = v => {
  const a = Math.abs(v);
  return a <= 3 ? '#00C896' : a <= 8 ? '#F5A623' : '#E63946';
};
const fmt = (v, d = 1) => isNaN(v) ? '—' : `${v > 0 ? '+' : ''}${v.toFixed(d)}`;
function VerifScreen({
  vitals,
  sensorData
}) {
  const [param, setParam] = useState('nibp');
  const [meas, setMeas] = useState([]);
  const [e, setE] = useState({
    tSys: '',
    tDia: '',
    mSys: '',
    mDia: '',
    tSpo2: '',
    mSpo2: '',
    tTemp: '',
    mTemp: '',
    tHr: '',
    mHr: ''
  });
  useEffect(() => {
    setE(p => ({
      ...p,
      tSys: String(vitals.sys),
      tDia: String(vitals.dia),
      tSpo2: String(vitals.spo2),
      tTemp: String(vitals.temp),
      tHr: String(vitals.hr)
    }));
  }, [vitals]);
  // Auto-cargar temperatura real del DS18B20 cuando llega del ESP32
  useEffect(() => {
    if (sensorData && sensorData.tempRef && sensorData.tempRef > 0) {
      setE(p => ({
        ...p,
        tTemp: String(sensorData.tempRef)
      }));
    }
  }, [sensorData]);
  const add = () => {
    setMeas(p => [...p, {
      id: Date.now(),
      param,
      ...e
    }]);
    setE(p => ({
      ...p,
      mSys: '',
      mDia: '',
      mSpo2: '',
      mTemp: '',
      mHr: ''
    }));
  };
  const del = id => setMeas(p => p.filter(m => m.id !== id));
  const fil = meas.filter(m => m.param === param);
  const sysE = fil.map(m => parseFloat(m.mSys) - parseFloat(m.tSys)).filter(v => !isNaN(v));
  const diaE = fil.map(m => parseFloat(m.mDia) - parseFloat(m.tDia)).filter(v => !isNaN(v));
  const Th = ({
    c
  }) => /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '6px 8px',
      fontSize: 10,
      fontWeight: 600,
      color: '#5A6B7E',
      textTransform: 'uppercase',
      textAlign: 'center'
    }
  }, c);
  const Td = ({
    c,
    s
  }) => /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 8px',
      textAlign: 'center',
      fontFamily: 'Space Mono,monospace',
      fontSize: 12,
      ...s
    }
  }, c);
  return /*#__PURE__*/React.createElement("div", {
    className: "screen",
    style: {
      height: '100%',
      overflow: 'auto',
      background: '#F2F4F7',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 14,
      flexWrap: 'wrap'
    }
  }, [['nibp', 'NIBP'], ['spo2', 'SpO₂'], ['temp', 'Temp'], ['hr', 'FC']].map(([id, lbl]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setParam(id),
    style: {
      padding: '7px 16px',
      fontSize: 12,
      fontWeight: 500,
      borderRadius: 100,
      cursor: 'pointer',
      border: param === id ? 'none' : '1px solid #E2E8F0',
      background: param === id ? '#00C896' : 'white',
      color: param === id ? 'white' : '#5A6B7E'
    }
  }, lbl))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      padding: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: '#5A6B7E',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 10
    }
  }, "Nueva medici\xF3n"), param === 'nibp' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
      gap: 8,
      alignItems: 'end'
    }
  }, [['tSys', 'T-SYS'], ['tDia', 'T-DIA'], ['mSys', 'M-SYS'], ['mDia', 'M-DIA']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, l), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: e[k],
    onChange: ev => setE({
      ...e,
      [k]: ev.target.value
    }),
    style: INP
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      padding: '7px 14px',
      background: '#00C896',
      color: 'white',
      border: 'none',
      borderRadius: 6,
      fontSize: 16,
      cursor: 'pointer',
      fontWeight: 700,
      height: 36,
      alignSelf: 'end'
    }
  }, "+")), param === 'spo2' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr auto',
      gap: 8,
      alignItems: 'end'
    }
  }, [['tSpo2', 'Target %'], ['mSpo2', 'Medido %']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, l), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: e[k],
    onChange: ev => setE({
      ...e,
      [k]: ev.target.value
    }),
    style: INP
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      padding: '7px 14px',
      background: '#00C896',
      color: 'white',
      border: 'none',
      borderRadius: 6,
      fontSize: 16,
      cursor: 'pointer',
      fontWeight: 700,
      height: 36,
      alignSelf: 'end'
    }
  }, "+")), param === 'temp' && /*#__PURE__*/React.createElement("div", null, sensorData && sensorData.tempRef > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 12px',
      background: 'rgba(0,200,150,0.08)',
      border: '1px solid rgba(0,200,150,0.25)',
      borderRadius: 6,
      fontSize: 11,
      color: '#00C896',
      marginBottom: 8,
      fontFamily: 'Space Mono,monospace'
    }
  }, "\uD83D\uDCE1 DS18B20: ", /*#__PURE__*/React.createElement("b", null, sensorData.tempRef.toFixed(1), "\xB0C"), " \u2014 cargado como referencia"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr auto',
      gap: 8,
      alignItems: 'end'
    }
  }, [['tTemp', 'Ref °C (DS18B20)'], ['mTemp', 'Monitor °C']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, l), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: e[k],
    onChange: ev => setE({
      ...e,
      [k]: ev.target.value
    }),
    style: INP
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      padding: '7px 14px',
      background: '#00C896',
      color: 'white',
      border: 'none',
      borderRadius: 6,
      fontSize: 16,
      cursor: 'pointer',
      fontWeight: 700,
      height: 36,
      alignSelf: 'end'
    }
  }, "+"))), param === 'hr' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr auto',
      gap: 8,
      alignItems: 'end'
    }
  }, [['tHr', 'Target bpm'], ['mHr', 'Medido bpm']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, l), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: e[k],
    onChange: ev => setE({
      ...e,
      [k]: ev.target.value
    }),
    style: INP
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      padding: '7px 14px',
      background: '#00C896',
      color: 'white',
      border: 'none',
      borderRadius: 6,
      fontSize: 16,
      cursor: 'pointer',
      fontWeight: 700,
      height: 36,
      alignSelf: 'end'
    }
  }, "+"))), fil.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: '#F8F9FB'
    }
  }, /*#__PURE__*/React.createElement(Th, {
    c: "#"
  }), param === 'nibp' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Th, {
    c: "T-SYS"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "T-DIA"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "M-SYS"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "M-DIA"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "\u0394 SYS"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "\u0394 DIA"
  })), param === 'spo2' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Th, {
    c: "Target"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "Medido"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "\u0394"
  })), param === 'temp' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Th, {
    c: "Ref."
  }), /*#__PURE__*/React.createElement(Th, {
    c: "Monitor"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "\u0394"
  })), param === 'hr' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Th, {
    c: "Target"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "Medido"
  }), /*#__PURE__*/React.createElement(Th, {
    c: "\u0394"
  })), /*#__PURE__*/React.createElement(Th, {
    c: ""
  }))), /*#__PURE__*/React.createElement("tbody", null, fil.map((m, i) => {
    const sE2 = parseFloat(m.mSys) - parseFloat(m.tSys),
      dE2 = parseFloat(m.mDia) - parseFloat(m.tDia);
    const spE = parseFloat(m.mSpo2) - parseFloat(m.tSpo2),
      tpE = parseFloat(m.mTemp) - parseFloat(m.tTemp),
      hrE = parseFloat(m.mHr) - parseFloat(m.tHr);
    return /*#__PURE__*/React.createElement("tr", {
      key: m.id,
      style: {
        borderTop: '1px solid #F0F0F0'
      }
    }, /*#__PURE__*/React.createElement(Td, {
      c: i + 1,
      s: {
        textAlign: 'left',
        paddingLeft: 12,
        color: '#aaa'
      }
    }), param === 'nibp' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Td, {
      c: m.tSys
    }), /*#__PURE__*/React.createElement(Td, {
      c: m.tDia
    }), /*#__PURE__*/React.createElement(Td, {
      c: m.mSys,
      s: {
        fontWeight: 700
      }
    }), /*#__PURE__*/React.createElement(Td, {
      c: m.mDia,
      s: {
        fontWeight: 700
      }
    }), /*#__PURE__*/React.createElement(Td, {
      c: fmt(sE2),
      s: {
        fontWeight: 600,
        color: errClr(sE2)
      }
    }), /*#__PURE__*/React.createElement(Td, {
      c: fmt(dE2),
      s: {
        fontWeight: 600,
        color: errClr(dE2)
      }
    })), param === 'spo2' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Td, {
      c: m.tSpo2 + '%'
    }), /*#__PURE__*/React.createElement(Td, {
      c: m.mSpo2 + '%',
      s: {
        fontWeight: 700
      }
    }), /*#__PURE__*/React.createElement(Td, {
      c: fmt(spE) + '%',
      s: {
        fontWeight: 600,
        color: errClr(spE * 3)
      }
    })), param === 'temp' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Td, {
      c: m.tTemp + '°C'
    }), /*#__PURE__*/React.createElement(Td, {
      c: m.mTemp + '°C',
      s: {
        fontWeight: 700
      }
    }), /*#__PURE__*/React.createElement(Td, {
      c: fmt(tpE, 2) + '°C',
      s: {
        fontWeight: 600,
        color: errClr(Math.abs(tpE) * 15)
      }
    })), param === 'hr' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Td, {
      c: m.tHr
    }), /*#__PURE__*/React.createElement(Td, {
      c: m.mHr,
      s: {
        fontWeight: 700
      }
    }), /*#__PURE__*/React.createElement(Td, {
      c: fmt(hrE),
      s: {
        fontWeight: 600,
        color: errClr(hrE)
      }
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '6px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => del(m.id),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#ccc',
        fontSize: 18
      }
    }, "\xD7")));
  })))), param === 'nibp' && sysE.length > 0 && (() => {
    const ss = calcStat(sysE),
      ds = calcStat(diaE),
      pass = ss?.pass && ds?.pass;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: 8,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: '#5A6B7E',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 10
      }
    }, "Estad\xEDsticas NIBP \u2014 AAMI SP10"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginBottom: 12
      }
    }, [{
      l: 'Error medio SYS',
      v: fmt(ss?.mean),
      ok: ss?.passM
    }, {
      l: 'DS SYS',
      v: fmt(ss?.sd),
      ok: ss?.passSd
    }].map(x => /*#__PURE__*/React.createElement("div", {
      key: x.l
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: '#aaa',
        textTransform: 'uppercase',
        marginBottom: 2
      }
    }, x.l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'Space Mono,monospace',
        fontSize: 18,
        fontWeight: 700,
        color: x.ok ? '#00C896' : '#E63946'
      }
    }, x.v, " mmHg")))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 14px',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: pass ? 'rgba(0,200,150,0.08)' : 'rgba(230,57,70,0.08)',
        border: `1px solid ${pass ? 'rgba(0,200,150,0.3)' : 'rgba(230,57,70,0.3)'}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, pass ? '✅' : '❌'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: pass ? '#00C896' : '#E63946'
      }
    }, pass ? 'APROBADO' : 'REPROBADO'), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: '#aaa'
      }
    }, "n=", sysE.length, sysE.length < 5 ? ' · ⚠ mín. 5' : ''))));
  })()), fil.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 30,
      color: '#aaa'
    }
  }, "Sin mediciones para ", param.toUpperCase(), "."));
}
function AjustesScreen({
  cal,
  setCal,
  connMode
}) {
  const [param, setParam] = useState('nibp');
  const [entry, setEntry] = useState({
    nominal: '',
    reference: ''
  });
  const cfg = PARAM_CFG[param],
    p = cal[param];
  const setInstr = (k, v) => setCal(prev => ({
    ...prev,
    [param]: {
      ...prev[param],
      instrument: {
        ...prev[param].instrument,
        [k]: v
      }
    }
  }));
  const setMeta = (k, v) => setCal(prev => ({
    ...prev,
    [param]: {
      ...prev[param],
      [k]: v
    }
  }));
  const addPoint = () => {
    const nom = parseFloat(entry.nominal),
      ref = parseFloat(entry.reference);
    if (isNaN(nom) || isNaN(ref)) return;
    if (cfg.tipo === 'gain' && nom === 0) return;
    setCal(prev => ({
      ...prev,
      [param]: {
        ...prev[param],
        points: [...prev[param].points, {
          id: Date.now(),
          nominal: nom,
          reference: ref,
          error: ref - nom
        }]
      }
    }));
    setEntry({
      nominal: '',
      reference: ''
    });
  };
  const removePoint = id => setCal(prev => ({
    ...prev,
    [param]: {
      ...prev[param],
      points: prev[param].points.filter(pt => pt.id !== id)
    }
  }));
  const applyCorrection = () => {
    if (!p.points.length) return;
    if (cfg.tipo === 'gain') {
      const g = p.points.reduce((a, pt) => a + pt.reference / pt.nominal, 0) / p.points.length;
      setCal(prev => ({
        ...prev,
        [param]: {
          ...prev[param],
          gain: parseFloat(g.toFixed(4)),
          applied: true,
          date: new Date().toISOString().split('T')[0]
        }
      }));
    } else {
      const o = p.points.reduce((a, pt) => a + pt.error, 0) / p.points.length;
      setCal(prev => ({
        ...prev,
        [param]: {
          ...prev[param],
          offset: parseFloat(o.toFixed(3)),
          applied: true,
          date: new Date().toISOString().split('T')[0]
        }
      }));
    }
  };
  const clear = () => setCal(prev => ({
    ...prev,
    [param]: {
      ...defaultCalP
    }
  }));
  const mean = p.points.length ? p.points.reduce((a, pt) => a + pt.error, 0) / p.points.length : null;
  const calCount = ['nibp', 'temp', 'ecg', 'spo2'].filter(k => cal[k].applied).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "screen",
    style: {
      height: '100%',
      overflow: 'auto',
      background: '#F2F4F7',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      padding: '12px 14px',
      borderRadius: 8,
      border: '1px solid #E2E8F0',
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: connMode !== 'demo' ? '#00C896' : '#94A3B8',
      display: 'flex'
    }
  }, connMode === 'ble' ? /*#__PURE__*/React.createElement(IconBluetooth, {
    size: 20
  }) : /*#__PURE__*/React.createElement(IconWifi, {
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13,
      color: connMode !== 'demo' ? '#00C896' : '#5A6B7E'
    }
  }, connMode === 'wifi' ? 'Conectado por WiFi' : connMode === 'ble' ? 'Conectado por Bluetooth' : 'Sin conexión — modo demo'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#94A3B8',
      marginTop: 2
    }
  }, "M\xF3dulo SEM"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      padding: '12px 14px',
      borderRadius: 8,
      border: `1px solid ${calCount === 4 ? 'rgba(0,200,150,0.3)' : calCount > 0 ? 'rgba(245,166,35,0.3)' : 'rgba(100,100,100,0.2)'}`,
      background: calCount === 4 ? 'rgba(0,200,150,0.06)' : calCount > 0 ? 'rgba(245,166,35,0.06)' : 'rgba(0,0,0,0.02)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, calCount === 4 ? '✅' : calCount > 0 ? '⚠️' : '⭕'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13,
      color: calCount === 4 ? '#00C896' : calCount > 0 ? '#F5A623' : '#5A6B7E'
    }
  }, calCount === 4 ? 'Todos calibrados' : calCount > 0 ? `${calCount}/4 parámetros calibrados` : 'Sin calibración activa'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#5A6B7E',
      marginTop: 2
    }
  }, ['nibp', 'temp', 'ecg', 'spo2'].map(k => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      marginRight: 8,
      color: cal[k].applied ? '#00C896' : '#aaa'
    }
  }, PARAM_CFG[k].label.split(' ')[0], ": ", cal[k].applied ? cal[k].date || '✓' : '—'))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 14,
      flexWrap: 'wrap'
    }
  }, Object.entries(PARAM_CFG).map(([id, c]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setParam(id),
    style: {
      padding: '7px 14px',
      fontSize: 12,
      fontWeight: 500,
      borderRadius: 8,
      cursor: 'pointer',
      border: param === id ? 'none' : '1px solid #E2E8F0',
      background: param === id ? '#22344C' : 'white',
      color: param === id ? '#00C896' : '#5A6B7E',
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, c.label.split(' ')[0], /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      fontFamily: 'Space Mono,monospace',
      padding: '1px 4px',
      borderRadius: 3,
      background: cal[id].applied ? 'rgba(0,200,150,0.2)' : 'rgba(0,0,0,0.05)',
      color: cal[id].applied ? '#00C896' : '#aaa'
    }
  }, cal[id].applied ? 'CAL' : '—')))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      padding: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: '#5A6B7E',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 10
    }
  }, "Instrumento patr\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8,
      marginBottom: 8
    }
  }, [['marca', 'Marca'], ['modelo', 'Modelo'], ['serie', 'N° Serie'], ['cert', 'N° Cert.']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, l), /*#__PURE__*/React.createElement("input", {
    value: p.instrument[k] || '',
    onChange: ev => setInstr(k, ev.target.value),
    style: {
      ...INP,
      fontFamily: 'Inter,sans-serif'
    }
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, "Trazabilidad"), /*#__PURE__*/React.createElement("input", {
    value: p.instrument.trazabilidad || '',
    onChange: ev => setInstr('trazabilidad', ev.target.value),
    style: {
      ...INP,
      fontFamily: 'Inter,sans-serif'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      padding: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: '#5A6B7E',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 10
    }
  }, "Puntos de calibraci\xF3n \u2014 ", cfg.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr auto',
      gap: 8,
      alignItems: 'end',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, cfg.nomLabel), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: cfg.step || 1,
    value: entry.nominal,
    onChange: ev => setEntry({
      ...entry,
      nominal: ev.target.value
    }),
    style: INP
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, cfg.refLabel), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: cfg.step || 0.1,
    value: entry.reference,
    onChange: ev => setEntry({
      ...entry,
      reference: ev.target.value
    }),
    onKeyDown: ev => ev.key === 'Enter' && addPoint(),
    style: INP
  })), /*#__PURE__*/React.createElement("button", {
    onClick: addPoint,
    style: {
      padding: '7px 14px',
      background: '#22344C',
      color: '#00C896',
      border: '1px solid #00C89640',
      borderRadius: 6,
      fontSize: 16,
      cursor: 'pointer',
      fontWeight: 700,
      height: 36,
      alignSelf: 'end'
    }
  }, "+")), p.points.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: '#F8F9FB'
    }
  }, ['#', 'Nominal', 'Patrón', 'Error', 'Estado'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '5px 8px',
      fontSize: 10,
      fontWeight: 600,
      color: '#5A6B7E',
      textTransform: 'uppercase',
      textAlign: 'center'
    }
  }, h)), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, p.points.map((pt, i) => {
    const ok = Math.abs(pt.error) <= cfg.tol * 3;
    return /*#__PURE__*/React.createElement("tr", {
      key: pt.id,
      style: {
        borderBottom: '1px solid #F0F0F0'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '5px 8px',
        textAlign: 'center',
        color: '#aaa',
        fontFamily: 'Space Mono,monospace',
        fontSize: 11
      }
    }, i + 1), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '5px 8px',
        textAlign: 'center',
        fontFamily: 'Space Mono,monospace',
        fontSize: 11
      }
    }, pt.nominal, " ", cfg.unit), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '5px 8px',
        textAlign: 'center',
        fontFamily: 'Space Mono,monospace',
        fontSize: 11,
        fontWeight: 700
      }
    }, pt.reference, " ", cfg.unit), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '5px 8px',
        textAlign: 'center',
        fontFamily: 'Space Mono,monospace',
        fontSize: 11,
        color: ok ? '#00C896' : '#E63946'
      }
    }, fmt(pt.error, 3), " ", cfg.unit), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '5px 8px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'Space Mono,monospace',
        fontSize: 9,
        padding: '2px 6px',
        borderRadius: 3,
        background: ok ? 'rgba(0,200,150,0.1)' : 'rgba(230,57,70,0.1)',
        color: ok ? '#00C896' : '#E63946'
      }
    }, ok ? 'OK' : 'FALLA')), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '5px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => removePoint(pt.id),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#ccc',
        fontSize: 16
      }
    }, "\xD7")));
  }))), mean !== null && /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8F9FB',
      borderRadius: 6,
      padding: 10,
      marginBottom: 12,
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#aaa',
      textTransform: 'uppercase',
      marginBottom: 2
    }
  }, "Error medio"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 16,
      fontWeight: 700,
      color: '#1A2535'
    }
  }, fmt(mean, 3), " ", cfg.unit)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#aaa',
      textTransform: 'uppercase',
      marginBottom: 2
    }
  }, "Correcci\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 16,
      fontWeight: 700,
      color: '#1A2535'
    }
  }, cfg.tipo === 'gain' ? (p.points.reduce((a, pt) => a + pt.reference / pt.nominal, 0) / p.points.length).toFixed(4) : fmt(mean, 3) + ' ' + cfg.unit))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: applyCorrection,
    style: {
      padding: '8px 16px',
      background: '#00C896',
      color: 'white',
      border: 'none',
      borderRadius: 6,
      fontSize: 13,
      cursor: 'pointer',
      fontWeight: 600
    }
  }, "\u2713 Aplicar correcci\xF3n"), /*#__PURE__*/React.createElement("button", {
    onClick: clear,
    style: {
      padding: '8px 14px',
      background: 'white',
      color: '#5A6B7E',
      border: '1px solid #E2E8F0',
      borderRadius: 6,
      fontSize: 13,
      cursor: 'pointer'
    }
  }, "\u21BA Limpiar"))), p.points.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '16px 0',
      color: '#aaa',
      fontSize: 13
    }
  }, "Ingres\xE1 al menos 3 puntos para aplicar correcci\xF3n.")), p.applied && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,200,150,0.06)',
      border: '1px solid rgba(0,200,150,0.25)',
      borderRadius: 8,
      padding: '12px 14px',
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\u2705"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: '#00C896',
      fontSize: 13
    }
  }, "Correcci\xF3n activa \u2014 ", cfg.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#5A6B7E',
      marginTop: 2
    }
  }, cfg.tipo === 'gain' ? `Ganancia: ×${p.gain.toFixed(4)}` : `Offset: ${fmt(p.offset, 3)} ${cfg.unit}`, " ", p.date && `· ${p.date}`))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      padding: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: '#5A6B7E',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 10
    }
  }, "Datos del registro"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, "T\xE9cnico"), /*#__PURE__*/React.createElement("input", {
    value: p.tecnico || '',
    onChange: ev => setMeta('tecnico', ev.target.value),
    style: {
      ...INP,
      fontFamily: 'Inter,sans-serif'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, "Fecha"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: p.date || '',
    onChange: ev => setMeta('date', ev.target.value),
    style: {
      ...INP,
      fontFamily: 'Inter,sans-serif'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, "Pr\xF3xima calibraci\xF3n"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: p.nextDate || '',
    onChange: ev => setMeta('nextDate', ev.target.value),
    style: {
      ...INP,
      fontFamily: 'Inter,sans-serif'
    }
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.print(),
    style: {
      width: '100%',
      padding: '12px',
      background: '#22344C',
      color: 'white',
      border: 'none',
      borderRadius: 8,
      fontSize: 14,
      cursor: 'pointer',
      fontWeight: 600
    }
  }, "\uD83D\uDDA8 Certificado de calibraci\xF3n"));
}
function InformeScreen({
  eq,
  setEq
}) {
  const fecha = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "screen",
    style: {
      height: '100%',
      overflow: 'auto',
      background: '#F2F4F7',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      padding: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: '#5A6B7E',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 10
    }
  }, "Datos del equipo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, [['marca', 'Marca'], ['modelo', 'Modelo'], ['serie', 'N° Serie'], ['cliente', 'Cliente'], ['tecnico', 'Técnico'], ['ot', 'N° OT']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("label", {
    style: LBL
  }, l), /*#__PURE__*/React.createElement("input", {
    value: eq[k] || '',
    onChange: ev => setEq(p => ({
      ...p,
      [k]: ev.target.value
    })),
    style: {
      ...INP,
      fontFamily: 'Inter,sans-serif'
    }
  }))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.print(),
    style: {
      width: '100%',
      padding: '12px',
      background: '#22344C',
      color: 'white',
      border: 'none',
      borderRadius: 8,
      fontSize: 14,
      cursor: 'pointer',
      fontWeight: 600,
      marginBottom: 14
    }
  }, "\uD83D\uDDA8 Imprimir informe"), /*#__PURE__*/React.createElement("div", {
    id: "print-area",
    style: {
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 9,
      letterSpacing: '0.15em',
      color: '#aaa',
      textTransform: 'uppercase'
    }
  }, "Soluciones Electrom\xE9dicas SJ \u2014 SEM"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: '#1A2535',
      marginTop: 3
    }
  }, "Informe de Verificaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#5A6B7E'
    }
  }, "SEM Simulator v3.5")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 11,
      fontWeight: 700
    }
  }, fecha), eq.ot && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 10,
      color: '#aaa'
    }
  }, "OT #", eq.ot))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#E2E8F0',
      margin: '12px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6px 24px',
      marginBottom: 12
    }
  }, [['Marca', eq.marca], ['Modelo', eq.modelo], ['N° Serie', eq.serie], ['Cliente', eq.cliente], ['Técnico', eq.tecnico]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      gap: 8,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#5A6B7E',
      minWidth: 70
    }
  }, l, ":"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, v || '—')))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#E2E8F0',
      margin: '12px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#aaa',
      lineHeight: 1.6,
      marginBottom: 24
    }
  }, "Verificaci\xF3n realizada con SEM Simulator v3.5 calibrado. Criterios: NIBP \u2192 AAMI SP10/ISO 81060-2 \xB7 SpO\u2082 \u2192 ISO 9919 \xB7 Temperatura \u2192 IEC 60601-2-56."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 40,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #ccc',
      paddingTop: 8,
      fontSize: 12,
      color: '#aaa'
    }
  }, "Firma y sello del t\xE9cnico"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #ccc',
      paddingTop: 8,
      fontSize: 12,
      color: '#aaa'
    }
  }, "Conformidad del cliente"))));
}

// ══════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════
function App() {
  const [screen, setScreen] = useState('home');
  const [appReady, setAppReady] = useState(false);
  const [sensorData, setSensorData] = useState({
    tempRef: null,
    pressure: 0,
    battery: 0
  });
  const [connMode, setConnMode] = useState('demo');
  const wsAppRef = useRef(null);
  const [rhythm, setRhythm] = useState('sinusal');
  const [running, setRunning] = useState(true);
  const [prog, setProg] = useState('normal');
  const [vitals, setVitals] = useState({
    hr: 72,
    spo2: 98,
    sys: 120,
    dia: 80,
    temp: 36.6,
    resp: 16
  });
  const [ecgMode, setEcgMode] = useState('cardiaco');
  const [amplitude, setAmplitude] = useState(1.0);
  const [stOffset, setStOffset] = useState(0.0);
  const [spo2Brand, setSpo2Brand] = useState('nellcor');
  const [eq, setEq] = useState({
    marca: '',
    modelo: '',
    serie: '',
    cliente: '',
    tecnico: '',
    ot: ''
  });
  const [cal, setCal] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sem_cal')) || defaultCal;
    } catch {
      return defaultCal;
    }
  });
  const [ip, setIp] = useState('192.168.4.1');
  useEffect(() => {
    localStorage.setItem('sem_cal', JSON.stringify(cal));
  }, [cal]);

  // Confirmar antes de cerrar la pestaña/salir si hay una conexión activa
  // al módulo, para no cortarla por un toque accidental (atrás, cerrar,
  // cambiar de app). El navegador muestra su propio diálogo de confirmación
  // (el texto lo define el navegador, no se puede personalizar).
  useEffect(() => {
    if (connMode === 'demo') return;
    const handler = e => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [connMode]);

  // Ref con valores actuales para los intervals de WiFi y BLE
  // (evita closure stale — siempre manda lo que hay en pantalla)
  const sendRef = useRef({});

  // Manejar conexión desde ConnectScreen
  const handleConnect = (mode, conn) => {
    setConnMode(mode);
    if (mode === 'wifi' && conn) {
      wsAppRef.current = conn;
      // Recibir datos del ESP32 (temperatura, presión, batería)
      conn.onmessage = e => {
        try {
          const d = JSON.parse(e.data);
          if (d.type === 'sensors') setSensorData(d);
        } catch {}
      };
      conn.onclose = () => {
        setConnMode('demo');
      };
      conn._iv = setInterval(() => {
        if (conn.readyState === WebSocket.OPEN) conn.send(JSON.stringify({
          ...sendRef.current,
          ts: Date.now()
        }));
      }, 500);
    }
    if (mode === 'ble' && conn) {
      const {
        device,
        server
      } = conn;
      server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b').then(async svc => {
        // Suscribir a notificaciones del ESP32 (temperatura real, batería)
        const vChar = await svc.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');
        await vChar.startNotifications();
        vChar.addEventListener('characteristicvaluechanged', e => {
          try {
            const d = JSON.parse(new TextDecoder().decode(e.target.value));
            if (d.type === 'sensors') setSensorData(d);
          } catch {}
        });
        // Enviar vitals al ESP32 cada 500ms
        const cChar = await svc.getCharacteristic('cba1d466-344c-4be3-ab3f-189f80dd7518');
        device._iv = setInterval(async () => {
          if (server.connected) try {
            await cChar.writeValue(new TextEncoder().encode(JSON.stringify({
              ...sendRef.current,
              ts: Date.now()
            })));
          } catch {}
        }, 500);
        device.addEventListener('gattserverdisconnected', () => setConnMode('demo'));
      }).catch(e => console.warn('[BLE]', e));
    }
    setAppReady(true);
  };
  const handleDemo = () => {
    setConnMode('demo');
    setAppReady(true);
  };
  const setV = (k, v) => {
    setVitals(prev => ({
      ...prev,
      [k]: v
    }));
    setProg(null);
  };
  const applyProg = p => {
    setVitals({
      hr: p.hr,
      spo2: p.spo2,
      sys: p.sys,
      dia: p.dia,
      temp: p.temp,
      resp: p.resp
    });
    setRhythm(p.rhythm);
    setProg(p.id);
  };

  // Corrected values
  // TEMP: si hay un sensor real (DS18B20) reportando, mostrar SU lectura
  // directamente (es la referencia real, no tiene sentido corregirla con
  // el offset de calibración). Sin sensor real conectado (demo, o antes
  // de recibir el primer dato), se usa el valor simulado como siempre.
  const realTemp = sensorData && sensorData.tempRef > 0;
  const cv = {
    ...vitals,
    sys: Math.round(vitals.sys + (cal.nibp.applied ? cal.nibp.offset : 0)),
    dia: Math.round(vitals.dia + (cal.nibp.applied ? cal.nibp.offset : 0)),
    temp: realTemp ? parseFloat(sensorData.tempRef.toFixed(1)) : parseFloat((vitals.temp + (cal.temp.applied ? cal.temp.offset : 0)).toFixed(1)),
    spo2: Math.round(vitals.spo2 + (cal.spo2.applied ? cal.spo2.offset : 0))
  };
  const corrAmp = amplitude * (cal.ecg.applied ? cal.ecg.gain : 1);
  const anyCal = cal.nibp.applied || cal.temp.applied || cal.ecg.applied || cal.spo2.applied;

  // Mantener sendRef actualizado con los valores corregidos actuales
  // Se ejecuta en cada render → el interval WiFi/BLE siempre manda lo correcto
  useEffect(() => {
    sendRef.current = {
      ...cv,
      rhythm,
      ecgMode,
      amplitude: corrAmp,
      stOffset,
      running
    };
  });
  const SCREEN_TITLES = {
    home: 'SEM Simulator',
    monitor: 'Monitor Multiparamétrico',
    spo2: 'Saturometría SpO₂',
    ecg: 'ECG',
    ajustes: 'Ajustes',
    verif: 'Verificación',
    informe: 'Informe'
  };
  if (!appReady) return /*#__PURE__*/React.createElement(ConnectScreen, {
    onConnect: handleConnect,
    onDemo: handleDemo
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0E1826'
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: "app-header",
    style: {
      background: '#152238',
      padding: '0 16px',
      height: 52,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexShrink: 0,
      borderBottom: '1px solid #1A2535'
    }
  }, screen !== 'home' ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen('home'),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#00C896',
      fontSize: 22,
      lineHeight: 1,
      padding: '4px 6px 4px 0',
      display: 'flex',
      alignItems: 'center'
    }
  }, "\u2190") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 13,
      fontWeight: 700,
      color: '#00C896',
      letterSpacing: '0.08em'
    }
  }, "\u25C9 SEM"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)',
      fontWeight: 500,
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, SCREEN_TITLES[screen] || screen), anyCal && screen === 'home' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Mono,monospace',
      fontSize: 8,
      color: '#00C896',
      border: '1px solid #00C89640',
      padding: '2px 6px',
      borderRadius: 3,
      flexShrink: 0
    }
  }, "CAL"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setRunning(!running),
    style: {
      padding: '5px 14px',
      fontSize: 11,
      fontFamily: 'Space Mono,monospace',
      fontWeight: 700,
      background: running ? 'rgba(230,57,70,0.15)' : 'rgba(0,200,150,0.15)',
      color: running ? '#E63946' : '#00C896',
      border: `1px solid ${running ? '#E63946' : '#00C896'}`,
      borderRadius: 4,
      cursor: 'pointer',
      flexShrink: 0
    }
  }, running ? '⏸' : '▶')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, screen === 'home' && /*#__PURE__*/React.createElement(HomeScreen, {
    cv: cv,
    rhythm: rhythm,
    amplitude: corrAmp,
    cal: cal,
    anyCal: anyCal,
    setScreen: setScreen,
    sensorData: sensorData
  }), screen === 'monitor' && /*#__PURE__*/React.createElement(MonitorScreen, {
    vitals: vitals,
    setV: setV,
    cv: cv,
    rhythm: rhythm,
    setRhythm: setRhythm,
    running: running,
    ecgMode: ecgMode,
    amplitude: corrAmp,
    stOffset: stOffset,
    cal: cal,
    prog: prog,
    setProg: setProg,
    applyProg: applyProg,
    tempIsReal: realTemp
  }), screen === 'spo2' && /*#__PURE__*/React.createElement(Spo2Screen, {
    vitals: vitals,
    setV: setV,
    cv: cv,
    rhythm: rhythm,
    setRhythm: setRhythm,
    running: running,
    ecgMode: ecgMode,
    amplitude: corrAmp,
    stOffset: stOffset,
    cal: cal,
    brand: spo2Brand,
    setBrand: setSpo2Brand,
    prog: prog,
    setProg: setProg,
    applyProg: applyProg
  }), screen === 'ecg' && /*#__PURE__*/React.createElement(EcgScreen, {
    vitals: vitals,
    setV: setV,
    cv: cv,
    rhythm: rhythm,
    setRhythm: setRhythm,
    running: running,
    ecgMode: ecgMode,
    setEcgMode: setEcgMode,
    amplitude: amplitude,
    setAmplitude: setAmplitude,
    stOffset: stOffset,
    setStOffset: setStOffset,
    cal: cal,
    prog: prog,
    setProg: setProg,
    applyProg: applyProg
  }), screen === 'ajustes' && /*#__PURE__*/React.createElement(AjustesScreen, {
    cal: cal,
    setCal: setCal,
    connMode: connMode
  }), screen === 'verif' && /*#__PURE__*/React.createElement(VerifScreen, {
    vitals: {
      hr: cv.hr,
      spo2: cv.spo2,
      sys: cv.sys,
      dia: cv.dia,
      temp: cv.temp
    },
    sensorData: sensorData
  }), screen === 'informe' && /*#__PURE__*/React.createElement(InformeScreen, {
    eq: eq,
    setEq: setEq
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));