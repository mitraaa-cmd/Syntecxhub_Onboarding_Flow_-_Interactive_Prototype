const device = document.getElementById('device');

// Desktop/tablet: scale the whole frame down to fit the viewport height,
// without touching its internal layout (so text/padding stay correct).
function fitDeviceToViewport(){
  if (window.innerWidth <= 480) {
    device.style.transform = 'none';
    return;
  }
  const margin = 32; // breathing room top/bottom
  const scale = Math.min(1, (window.innerHeight - margin) / 844);
  device.style.transform = `scale(${scale})`;
}
fitDeviceToViewport();
window.addEventListener('resize', fitDeviceToViewport);
const screens = [...document.querySelectorAll('.screen')];
const orbit = [...document.querySelectorAll('#orbit i')];
let current = 0;
let chosenVibe = null;

function paintOrbit(){
  orbit.forEach((dot,i)=>{
    dot.className = i < current ? 'done' : (i===current ? 'current' : '');
  });
}

function goTo(i){
  screens[current].classList.remove('active');
  current = Math.max(0, Math.min(screens.length-1, i));
  screens[current].classList.add('active');
  paintOrbit();
  if (current === 4) {
    updateSuccessCopy();
    burstConfetti();
  }
}

// Auto-advance the splash screen after 1.4s
setTimeout(()=>goTo(1), 1400);

// Next / skip buttons
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',(e)=>{
  spawnRipple(e);
  goTo(current+1);
}));
document.querySelectorAll('[data-skip]').forEach(b=>b.addEventListener('click',()=>goTo(current+1)));

document.getElementById('enterHome').addEventListener('click', ()=>{
  alert('Prototype end — this is where "Home" would load.');
});

// Ripple effect on button press
function spawnRipple(e){
  const btn = e.currentTarget;
  const r = document.createElement('span');
  r.className='ripple';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.width=r.style.height=size+'px';
  r.style.left=(e.clientX-rect.left-size/2)+'px';
  r.style.top=(e.clientY-rect.top-size/2)+'px';
  btn.appendChild(r);
  setTimeout(()=>r.remove(),600);
}

// Personalization branching — sets CSS variables on the device root
const vibeNext = document.getElementById('vibeNext');
document.querySelectorAll('.vibe-card').forEach(card=>{
  card.addEventListener('click', (e)=>{
    document.querySelectorAll('.vibe-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    chosenVibe = card.dataset.vibe;
    device.style.setProperty('--accent', card.dataset.accent);
    device.style.setProperty('--accent-2', card.dataset.accent2);
    vibeNext.disabled = false;
    spawnRipple(e);
  });
});

// Permission toggles
document.querySelectorAll('[data-toggle]').forEach(t=>{
  t.addEventListener('click', ()=>{
    const card = t.closest('.perm-card');
    const granting = !t.classList.contains('on');
    t.classList.toggle('on');
    card.classList.toggle('granted', granting);
  });
});

// Conditional copy on the success screen, based on chosen vibe
const heading = document.getElementById('successHeading');
const sub = document.getElementById('successSub');
const vibeCopy = {
  calm: ["Echo is breathing with you.", "A gentle check-in arrives this evening."],
  dreamy: ["Echo is dreaming alongside you.", "Your first poetic letter lands in 7 days."],
  energetic: ["Echo's got your momentum.", "Expect a nudge first thing tomorrow."],
  creative: ["Echo is sketching your future.", "A playful prompt lands in your inbox tonight."],
  null: ["Echo is listening.", "Your first letter from the future arrives in 7 days."]
};
function updateSuccessCopy(){
  const copy = vibeCopy[chosenVibe] || vibeCopy.null;
  heading.textContent = copy[0];
  sub.textContent = copy[1];
}

// Confetti burst
const confettiHost = document.getElementById('confetti');
function burstConfetti(){
  confettiHost.innerHTML='';
  const colors = [
    getComputedStyle(device).getPropertyValue('--accent'),
    getComputedStyle(device).getPropertyValue('--accent-2'),
    '#fff'
  ];
  for(let i=0;i<36;i++){
    const s = document.createElement('span');
    s.style.left = Math.random()*100+'%';
    s.style.background = colors[i%3];
    s.style.animationDelay = (Math.random()*0.4)+'s';
    s.style.borderRadius = Math.random()>.5 ? '50%' : '2px';
    confettiHost.appendChild(s);
  }
}

// Floating particles, drawn on a canvas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width = device.clientWidth; canvas.height = device.clientHeight; }
resize();
window.addEventListener('resize', resize);

const pts = Array.from({length:26}, ()=>({
  x: Math.random()*canvas.width, y: Math.random()*canvas.height,
  r: Math.random()*1.6+0.6, vy: Math.random()*0.25+0.05, a: Math.random()*0.5+0.15
}));

function tick(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#fff';
  pts.forEach(p=>{
    p.y -= p.vy;
    if(p.y < -5){ p.y = canvas.height+5; p.x = Math.random()*canvas.width; }
    ctx.globalAlpha = p.a;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(tick);
}
tick();
