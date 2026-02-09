// ========================================
// EFFET MATRIX - Pluie de caractères verts
// ========================================

function initMatrixEffect() {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrixCanvas';
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.body.insertBefore(canvas, document.body.firstChild);

  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*()';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = characters[Math.floor(Math.random() * characters.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      const brightness = Math.random();
      if (brightness > 0.95) {
        ctx.fillStyle = '#fff';
      } else if (brightness > 0.8) {
        ctx.fillStyle = '#0f0';
      } else if (brightness > 0.5) {
        ctx.fillStyle = '#0d0';
      } else {
        ctx.fillStyle = '#0a0';
      }

      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  const matrixInterval = setInterval(drawMatrix, 50);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = 0;
    const newColumns = Math.floor(canvas.width / fontSize);
    for (let i = 0; i < newColumns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
  });

  return matrixInterval;
}

// ========================================
// INITIALISATION
// ========================================

// Démarrer l'effet Matrix quand la page est chargée
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMatrixEffect);
} else {
  initMatrixEffect();
}