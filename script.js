/* ── Facts Pool ─────────────────────────────────────────────── */
const facts = [
  "Honey never expires — archaeologists found 3,000-year-old honey in Egyptian tombs that was still edible.",
  "A group of flamingos is called a flamboyance.",
  "Scotland's national animal is the unicorn.",
  "Otters hold hands while sleeping so they don't drift apart.",
  "The shortest war in history lasted 38–45 minutes — the Anglo-Zanzibar War of 1896.",
  "A day on Venus is longer than a year on Venus.",
  "Bananas are technically berries, but strawberries are not.",
  "The Eiffel Tower grows about 15cm taller in summer due to thermal expansion.",
  "Wombat poop is cube-shaped — the only known animal to produce cubic feces.",
  "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
  "The average cloud weighs about 1.1 million pounds.",
  "Crows can recognize human faces and hold grudges.",
  "There are more possible iterations of a chess game than atoms in the observable universe.",
  "A shrimp's heart is located in its head.",
  "The mantis shrimp can punch with the force of a bullet.",
  "Oxford University is older than the Aztec Empire.",
  "Sharks are older than trees — they've existed for over 450 million years.",
  "An octopus has three hearts and blue blood.",
  "The moon is slowly drifting away from Earth at about 3.8cm per year.",
  "You cannot hum while holding your nose closed.",
];

function randomFact() {
  return facts[Math.floor(Math.random() * facts.length)];
}

/* ── Matrix Rain ────────────────────────────────────────────── */
const canvas    = document.getElementById('rain-canvas');
const ctx       = canvas.getContext('2d');
const terminal  = document.getElementById('terminal');
const loading   = document.getElementById('loading-screen');
const bar       = document.getElementById('bar');
const pct       = document.getElementById('pct');

const rainChars = 'アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.?/~`\\';
let rainActive = false;
let rainAlpha  = 0;
let drops      = [];
let rainFrame;

function initRain() {
  canvas.width  = terminal.offsetWidth;
  canvas.height = terminal.offsetHeight;
  const cols = Math.floor(canvas.width / 16);
  drops = Array(cols).fill(0).map(() => Math.random() * -60);
}

function drawRain() {
  if (!rainActive) return;
  ctx.fillStyle = `rgba(0,0,0,${0.05 + (1 - rainAlpha) * 0.12})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '13px Share Tech Mono, monospace';
  drops.forEach((y, i) => {
    const ch = rainChars[Math.floor(Math.random() * rainChars.length)];
    ctx.fillStyle = `rgba(255,255,255,${rainAlpha * (0.4 + Math.random() * 0.5)})`;
    ctx.fillText(ch, i * 16, y * 16);
    if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.6 + Math.random() * 0.4;
  });
  rainFrame = requestAnimationFrame(drawRain);
}

/* ── Panel Content ──────────────────────────────────────────── */
const panelData = {
  whoami: [
    { t: 'dim',  h: '── About me ─────────────────────────────────' },
    { t: '',     h: '' },
    { t: '',     h: '  <span class="label">name    </span><span class="val">  Cuber</span>' },
    { t: '',     h: '  <span class="label">role    </span><span class="val">  Just a person on the internet</span>' },
    { t: '',     h: '  <span class="label">status  </span><span class="green"> online</span>' },
    { t: '',     h: '  <span class="label">Country   </span><span class="val">  🍁</span>' },
    { t: '',     h: '' },
    { t: 'dim',  h: '────────────────────────────────────────────' },
    { t: '',     h: '  <span class="label">Bio    </span><span class="val">  Yello! I am a web developer/unity idiot.</span>' },
    { t: '',     h: '' },
    { t: 'fact', h: '' },
  ],
  hobbies: [
    { t: 'dim',  h: '── hobbies ────────────────────────────────' },
    { t: '',     h: '' },
    { t: 'card', icon: 'ti-device-gamepad-2', title: 'Gaming', sub: 'I will always want to to play!' },
    { t: 'card', icon: 'ti-terminal-2',       title: 'Coding', sub: 'Building random things for fun' },
    { t: '',     h: '' },
    { t: 'fact', h: '' },
  ],
  socials: [
    { t: 'dim',    h: '── socials ────────────────────────────────' },
    { t: '',       h: '' },
    { t: 'social', icon: 'ti-brand-github',  label: 'github',  val: 'github.com/cosmic4445',   url: 'https://github.com/cosmic4445' },
    { t: 'social', icon: 'ti-brand-discord', label: 'discord', val: 'thefinalbacon',               url: null },
    { t: 'social', icon: 'ti-brand-youtube', label: 'youtube', val: 'youtube.com/@KiroDev',  url: 'https://youtube.com/Kirodevn' },
    { t: '',       h: '' },
    { t: 'fact',   h: '' },
  ],
};

const rendered = { whoami: false, hobbies: false, socials: false };

/* ── Build a Single Line Element ────────────────────────────── */
function buildLine(l, container) {
  if (l.t === 'card') {
    const d = document.createElement('div');
    d.className = 'line hobby-card';
    d.innerHTML = `<i class="ti ${l.icon}" aria-hidden="true"></i>
      <div>
        <div class="hobby-title">${l.title}</div>
        <div class="hobby-sub">${l.sub}</div>
      </div>`;
    container.appendChild(d);
    return d;
  }

  if (l.t === 'social') {
    const d   = document.createElement('div');
    d.className = 'line social-row';
    const val = l.url
      ? `<span class="link" onclick="window.open('${l.url}','_blank')">${l.val}</span>`
      : `<span class="val">${l.val}</span>`;
    d.innerHTML = `<i class="ti ${l.icon}" aria-hidden="true"></i>
      <span class="social-label">${l.label}</span>${val}`;
    container.appendChild(d);
    return d;
  }

  if (l.t === 'fact') {
    const d = document.createElement('div');
    d.className = 'line fact-bar';
    d.innerHTML = `<i class="ti ti-bulb" aria-hidden="true"></i>
      <div class="fact-text"><span class="fact-label">did you know?</span>${randomFact()}</div>`;
    container.appendChild(d);
    return d;
  }

  const d = document.createElement('div');
  d.className = 'line' + (l.t === 'dim' ? ' dim' : '');
  d.innerHTML  = l.h;
  container.appendChild(d);
  return d;
}

/* ── Animate Lines Into a Panel ─────────────────────────────── */
async function renderPanel(name, container) {
  const defaultContainer = document.getElementById('panel-' + name);
  if (!container) container = defaultContainer;

  // Skip re-render for the main panels (float windows always re-render)
  if (container === defaultContainer && rendered[name]) return;
  if (container === defaultContainer) rendered[name] = true;

  container.innerHTML = '';
  const lines = panelData[name];

  for (let i = 0; i < lines.length; i++) {
    const el = buildLine(lines[i], container);
    await new Promise(r => setTimeout(r, 1));
    requestAnimationFrame(() => el.classList.add('show'));
    await new Promise(r => setTimeout(r, 55));
  }
}

/* ── Tab Click ──────────────────────────────────────────────── */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab._wasDragging) { tab._wasDragging = false; return; }
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const name = tab.dataset.tab;
    document.getElementById('panel-' + name).classList.add('active');
    renderPanel(name);
  });
});

/* ── Drag to Detach ─────────────────────────────────────────── */
let dragTab    = null;
let dragStartX = 0;
let dragStartY = 0;
let dragMoved  = false;
const floatWindows = {};

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('mousedown', e => {
    dragTab    = tab;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragMoved  = false;
  });
});

document.addEventListener('mousemove', e => {
  if (!dragTab) return;
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;

  if (!dragMoved && (Math.abs(dx) > 6 || Math.abs(dy) > 15)) {
    dragMoved           = true;
    dragTab._wasDragging = true;
    dragTab.classList.add('dragging');
  }

  if (dragMoved && dy > 40) {
    const name = dragTab.dataset.tab;
    if (!floatWindows[name]) spawnWindow(name, e.clientX - 160, e.clientY + 10);
    dragTab.classList.remove('dragging');
    dragTab._wasDragging = true;
    dragTab = null;
  }
});

document.addEventListener('mouseup', () => {
  if (dragTab) { dragTab.classList.remove('dragging'); dragTab = null; }
});

/* Touch drag support */
document.querySelectorAll('.tab').forEach(tab => {
  let touchStart = null;
  tab.addEventListener('touchstart', e => { touchStart = e.touches[0]; }, { passive: true });
  tab.addEventListener('touchmove', e => {
    if (!touchStart) return;
    const t = e.touches[0];
    if (t.clientY - touchStart.clientY > 50) {
      const name = tab.dataset.tab;
      if (!floatWindows[name]) spawnWindow(name, t.clientX - 160, t.clientY + 10);
      touchStart = null;
    }
  }, { passive: true });
});

/* ── Spawn Floating Window ──────────────────────────────────── */
function spawnWindow(name, x, y) {
  const icons = { whoami: 'ti-user', hobbies: 'ti-puzzle', socials: 'ti-link' };

  const win = document.createElement('div');
  win.className = 'float-win';
  win.style.left = Math.max(10, Math.min(x, window.innerWidth - 360)) + 'px';
  win.style.top  = Math.max(10, y) + 'px';

  win.innerHTML = `
    <div class="float-titlebar">
      <i class="ti ${icons[name]}" style="font-size:12px;color:#555;" aria-hidden="true"></i>
      <span class="float-title">${name}.sh — detached</span>
      <button class="float-close" title="close">✕</button>
    </div>
    <div class="float-body" id="float-body-${name}"></div>
  `;

  document.body.appendChild(win);
  floatWindows[name] = win;

  win.querySelector('.float-close').addEventListener('click', () => {
    win.remove();
    delete floatWindows[name];
  });

  makeDraggable(win, win.querySelector('.float-titlebar'));
  renderPanel(name, win.querySelector('#float-body-' + name));
}

/* ── Make an Element Draggable ──────────────────────────────── */
function makeDraggable(el, handle) {
  let ox = 0, oy = 0, mx = 0, my = 0;

  handle.addEventListener('mousedown', e => {
    e.preventDefault();
    mx = e.clientX;
    my = e.clientY;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  function onMove(e) {
    ox = mx - e.clientX;
    oy = my - e.clientY;
    mx = e.clientX;
    my = e.clientY;
    el.style.top  = (el.offsetTop  - oy) + 'px';
    el.style.left = (el.offsetLeft - ox) + 'px';
  }

  function onUp() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  }
}

/* ── Boot Sequence ──────────────────────────────────────────── */
async function startLoading() {
  initRain();
  rainActive = true;
  drawRain();

  // Animate progress bar
  let p = 0;
  await new Promise(res => {
    const iv = setInterval(() => {
      p += Math.random() * 3.5 + 1;
      if (p >= 100) { p = 100; clearInterval(iv); res(); }
      bar.style.width      = p + '%';
      pct.textContent      = Math.floor(p) + '%';
    }, 40);
  });

  await new Promise(r => setTimeout(r, 300));

  // Fade out rain
  rainAlpha = 1;
  const fade = setInterval(() => {
    rainAlpha = Math.max(0, rainAlpha - 0.04);
    if (rainAlpha <= 0) {
      cancelAnimationFrame(rainFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clearInterval(fade);
    }
  }, 30);

  // Fade out loading screen
  loading.style.transition = 'opacity 0.5s';
  loading.style.opacity    = '0';
  await new Promise(r => setTimeout(r, 500));
  loading.style.display = 'none';
  rainActive = false;

  await new Promise(r => setTimeout(r, 150));
  renderPanel('whoami');
}

startLoading();