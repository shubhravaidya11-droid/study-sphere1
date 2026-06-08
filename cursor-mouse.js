(() => {
  const CURSOR_CLASS = 'custom-cursor';

  // Create cursor elements
  const dot = document.createElement('div');
  dot.className = CURSOR_CLASS;
  dot.setAttribute('aria-hidden', 'true');

  // A circle-ish cursor with glow
  dot.style.position = 'fixed';
  dot.style.left = '0px';
  dot.style.top = '0px';
  dot.style.width = '16px';
  dot.style.height = '16px';
  dot.style.borderRadius = '999px';
  dot.style.background = 'rgba(140, 70, 35, 0.95)'; // marron
  dot.style.boxShadow = '0 0 18px rgba(255, 170, 90, 0.35), 0 0 8px rgba(140, 70, 35, 0.7)';
  dot.style.pointerEvents = 'none';
  dot.style.zIndex = '999999';
  dot.style.transform = 'translate(-50%, -50%)';
  dot.style.transition = 'transform 0.06s linear';

  document.body.appendChild(dot);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let targetX = x;
  let targetY = y;

  function tick() {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    requestAnimationFrame(tick);
  }

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  tick();
})();

