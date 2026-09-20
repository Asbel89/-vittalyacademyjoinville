// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
if (nav) nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Countdown — 30 dias a partir do primeiro acesso
function getTarget() {
  let t = localStorage.getItem('vittaly_target');
  if (!t) {
    t = String(Date.now() + 30 * 24 * 60 * 60 * 1000);
    localStorage.setItem('vittaly_target', t);
  }
  return Number(t);
}
const target = getTarget();
function tick() {
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff % 86400000 / 3600000);
  const m = Math.floor(diff % 3600000 / 60000);
  const s = Math.floor(diff % 60000 / 1000);
  const pad = n => String(n).padStart(2, '0');
  const dd = document.getElementById('dd');
  if (!dd) return;
  dd.textContent = pad(d);
  document.getElementById('hh').textContent = pad(h);
  document.getElementById('mm').textContent = pad(m);
  document.getElementById('ss').textContent = pad(s);
}
setInterval(tick, 1000); tick();

// Form -> WhatsApp
document.getElementById('leadForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const whats = document.getElementById('whats').value.trim();
  const email = document.getElementById('email').value.trim();
  const area = document.getElementById('area').value;
  const msg = `Olá! Sou ${nome} (${area || 'estética'}). Quero entrar para a Vittaly Academy ✨ Meu WhatsApp: ${whats} | E-mail: ${email}`;
  window.open('https://wa.me/5547999999999?text=' + encodeURIComponent(msg), '_blank');
  document.getElementById('formSuccess').hidden = false;
  e.target.reset();
});
