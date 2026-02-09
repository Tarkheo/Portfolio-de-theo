// ========================================
// ANIMATION DE NUMÉROS DE TÉLÉPHONE
// ========================================

const canvas = document.getElementById('phoneCanvas');
const ctx = canvas.getContext('2d');

// Définir la taille du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Formats de numéros de téléphone français
const phoneFormats = [
    '+33 6 ## ## ## ##',
    '+33 7 ## ## ## ##',
    '06 ## ## ## ##',
    '07 ## ## ## ##',
    '01 ## ## ## ##',
    '02 ## ## ## ##',
    '03 ## ## ## ##',
    '04 ## ## ## ##',
    '05 ## ## ## ##',
    '09 ## ## ## ##'
];

// Générer un numéro de téléphone aléatoire
function generatePhoneNumber() {
    const format = phoneFormats[Math.floor(Math.random() * phoneFormats.length)];
    return format.replace(/#/g, () => Math.floor(Math.random() * 10));
}

// Classe pour une colonne de numéros
class PhoneColumn {
    constructor(x) {
        this.x = x;
        this.y = Math.random() * -500;
        this.speed = Math.random() * 1 + 0.5;
        this.phoneNumber = generatePhoneNumber();
        this.opacity = Math.random() * 0.5 + 0.3;
        this.fontSize = Math.random() * 8 + 12;
    }

    update() {
        this.y += this.speed;
        
        // Si le numéro sort de l'écran, le réinitialiser
        if (this.y > canvas.height + 50) {
            this.y = -50;
            this.phoneNumber = generatePhoneNumber();
            this.opacity = Math.random() * 0.5 + 0.3;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.fontSize}px 'Courier New', monospace`;
        
        // Dégradé violet
        const gradient = ctx.createLinearGradient(this.x, this.y - 20, this.x, this.y + 20);
        gradient.addColorStop(0, '#a855f7');
        gradient.addColorStop(0.5, '#8b5cf6');
        gradient.addColorStop(1, '#6d28d9');
        
        ctx.fillStyle = gradient;
        ctx.fillText(this.phoneNumber, this.x, this.y);
        ctx.restore();
    }
}

// Créer les colonnes de numéros
const columns = [];
const numberOfColumns = Math.floor(canvas.width / 150);

for (let i = 0; i < numberOfColumns; i++) {
    const x = (i * canvas.width) / numberOfColumns + Math.random() * 100;
    columns.push(new PhoneColumn(x));
}

// Animation principale
function animate() {
    // Fond semi-transparent pour l'effet de traînée
    ctx.fillStyle = 'rgba(10, 0, 21, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Mettre à jour et dessiner chaque colonne
    columns.forEach(column => {
        column.update();
        column.draw();
    });
    
    requestAnimationFrame(animate);
}

// Démarrer l'animation
animate();

// Redimensionner le canvas si la fenêtre change de taille
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recréer les colonnes avec la nouvelle taille
    columns.length = 0;
    const newNumberOfColumns = Math.floor(canvas.width / 150);
    
    for (let i = 0; i < newNumberOfColumns; i++) {
        const x = (i * canvas.width) / newNumberOfColumns + Math.random() * 100;
        columns.push(new PhoneColumn(x));
    }
});

// ========================================
// PARTICULES INTERACTIVES AU SURVOL
// ========================================

const particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Créer des particules au mouvement de la souris
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.3) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

// Animer les particules
function animateParticles() {
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ========================================
// VALIDATION DU FORMULAIRE
// ========================================

const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animation de succès
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.textContent = '✓ Message envoyé !';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Créer une explosion de particules
    for (let i = 0; i < 50; i++) {
        const rect = submitBtn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        particles.push(new Particle(x, y));
    }
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
        submitBtn.textContent = 'Envoyer';
        submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        form.reset();
    }, 3000);
});

// ========================================
// ANIMATION DU BOUTON RETOUR
// ========================================

const btnBack = document.querySelector('.btn-back');

btnBack.addEventListener('mouseenter', () => {
    btnBack.style.transform = 'translateY(-3px)';
});

btnBack.addEventListener('mouseleave', () => {
    btnBack.style.transform = 'translateY(0)';
});