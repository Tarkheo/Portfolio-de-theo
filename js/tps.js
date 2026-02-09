// ========================================
// CONFIGURATION DES TPs - MODIFIER ICI
// ========================================

const tpsList = [
    {
        numero: 1,
        titre: "TP 1 - Commandes CMD",
        description: "Premiers pas avec l'invite de commandes Windows",
        pdfPath: "images/TP3.pdf",
        imagePath: "images/images_tp/cmd.jpeg", // 🎨 AJOUTEZ VOTRE IMAGE ICI
        disponible: true  // true = disponible, false = verrouillé
    },
    {
        numero: 2,
        titre: "TP 2 - CMD Avancé",
        description: "Commandes avancées et scripts batch",
        pdfPath: "images/TP4.pdf",
        imagePath: "images/images_tp/cmd.jpeg", // 🎨 AJOUTEZ VOTRE IMAGE ICI
        disponible: true
    },
    {
        numero: 3,
        titre: "TP Bash",
        description: "Administration système et réseau",
        pdfPath: "images/TP4.2.pdf",
        imagePath: "images/images_tp/cmd.jpeg", // 🎨 AJOUTEZ VOTRE IMAGE ICI
        disponible: true
    },
    {
        numero: 4,
        titre: "TP Powershell",
        description: "",
        pdfPath: "images/TP5.pdf",
        imagePath: "images/images_tp/powershell.jpeg", // 🎨 AJOUTEZ VOTRE IMAGE ICI
        disponible: true
    },
    {
        numero: 5,
        titre: "Commandes CMD",
        description: "TP 6.1",
        pdfPath: "images/TP6.1.pdf",
        imagePath: "images/images_tp/cmd.jpeg", // 🎨 AJOUTEZ VOTRE IMAGE ICI
        disponible: true
    },
    {
        numero: 6,
        titre: "Linux",
        description: "Utilisateurs Linux",
        pdfPath: "images/Linux_utilisateurs.pdf",
        imagePath: "images/images_tp/P.png", // 🎨 AJOUTEZ VOTRE IMAGE ICI
        disponible: true
    }
];

// ========================================
// GÉNÉRATION AUTOMATIQUE DES CARTES TP
// ========================================

function generateTPCards() {
    const grid = document.getElementById('tpGrid');
    
    tpsList.forEach(tp => {
        const card = document.createElement('div');
        card.className = 'tp-card';
        card.setAttribute('data-tp', tp.numero);
        
        const statusClass = tp.disponible ? 'available' : 'locked';
        const statusText = tp.disponible ? '✓ Disponible' : '🔒 Verrouillé';
        const iconClass = tp.disponible ? '' : 'locked';
        const iconEmoji = tp.disponible ? '📄' : '🔒';
        const disabled = tp.disponible ? '' : 'disabled';
        
        // Utiliser l'image personnalisée si elle existe, sinon utiliser l'icône emoji
        const imageContent = tp.imagePath 
            ? `<img src="${tp.imagePath}" alt="${tp.titre}" class="tp-image ${iconClass}">`
            : `<div class="tp-icon ${iconClass}">${iconEmoji}</div>`;
        
        card.innerHTML = `
            <div class="card-glow"></div>
            <div class="particle-container"></div>
            <div class="tp-content">
                ${imageContent}
                <h2>${tp.titre}</h2>
                <p>${tp.description}</p>
                <span class="tp-status ${statusClass}">${statusText}</span>
                <div class="tp-actions">
                    <button class="btn-view" onclick="viewPDF('${tp.pdfPath}')" ${disabled}>
                        👁️ Visualiser
                    </button>
                    <a href="${tp.pdfPath}" download class="btn-download" ${disabled}>
                        ⬇️ Télécharger
                    </a>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    initializeCardEffects();
}

// ========================================
// INITIALISATION DES EFFETS DE CARTES
// ========================================

function initializeCardEffects() {
    const cards = document.querySelectorAll('.tp-card');
    
    cards.forEach(card => {
        const container = card.querySelector('.particle-container');
        const particles = [];
        
        for (let i = 0; i < 15; i++) {
            particles.push(new LocalParticle(container));
        }
        
        card.addEventListener('mouseenter', () => {
            const interval = setInterval(() => {
                particles.forEach(p => p.update());
            }, 30);
            
            card.particleInterval = interval;
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.particleInterval) {
                clearInterval(card.particleInterval);
            }
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s ease-out';
        observer.observe(card);
    });
}

// ========================================
// ANIMATION MATRIX VIOLET EN ARRIÈRE-PLAN
// ========================================

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789@#$%^&*()';
const chars = matrixChars.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        const brightness = Math.random();
        if (brightness > 0.95) {
            ctx.fillStyle = '#a855f7';
        } else if (brightness > 0.8) {
            ctx.fillStyle = '#8b5cf6';
        } else if (brightness > 0.6) {
            ctx.fillStyle = '#7c3aed';
        } else if (brightness > 0.4) {
            ctx.fillStyle = '#6d28d9';
        } else {
            ctx.fillStyle = '#5b21b6';
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const newColumns = canvas.width / fontSize;
    drops.length = newColumns;
    for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) {
            drops[i] = Math.random() * -100;
        }
    }
});

// ========================================
// PARTICULES GLOBALES FLOTTANTES
// ========================================

const particlesCanvas = document.getElementById('particlesCanvas');
const pCtx = particlesCanvas.getContext('2d');

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        
        const colors = ['#a855f7', '#8b5cf6', '#c084fc', '#e9d5ff', '#ec4899'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > particlesCanvas.width) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > particlesCanvas.height) {
            this.speedY *= -1;
        }
    }

    draw() {
        pCtx.save();
        pCtx.globalAlpha = this.opacity;
        pCtx.fillStyle = this.color;
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fill();
        
        pCtx.shadowBlur = 15;
        pCtx.shadowColor = this.color;
        pCtx.fill();
        
        pCtx.restore();
    }
}

const globalParticles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    globalParticles.push(new Particle());
}

function animateGlobalParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    globalParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateGlobalParticles);
}

animateGlobalParticles();

window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

// ========================================
// PARTICULES LOCALES SUR LES CARTES
// ========================================

class LocalParticle {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.borderRadius = '50%';
        this.element.style.pointerEvents = 'none';
        
        this.reset();
        this.container.appendChild(this.element);
    }

    reset() {
        this.x = Math.random() * 100;
        this.y = 100;
        this.size = Math.random() * 4 + 2;
        this.speedY = -(Math.random() * 2 + 1);
        this.opacity = Math.random() * 0.8 + 0.2;
        
        const colors = ['#a855f7', '#8b5cf6', '#c084fc', '#e9d5ff', '#ec4899'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.update();
    }

    update() {
        this.y += this.speedY;
        this.opacity -= 0.01;
        
        this.element.style.left = this.x + '%';
        this.element.style.bottom = this.y + 'px';
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
        this.element.style.backgroundColor = this.color;
        this.element.style.opacity = this.opacity;
        this.element.style.boxShadow = `0 0 10px ${this.color}`;
        
        if (this.y < -20 || this.opacity <= 0) {
            this.reset();
        }
    }
}

// ========================================
// GESTION DES MODALES PDF
// ========================================

function viewPDF(pdfPath) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    
    viewer.src = pdfPath;
    modal.style.display = 'block';
    
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    
    modal.style.display = 'none';
    viewer.src = '';
    
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('pdfModal');
    if (event.target === modal) {
        closeModal();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// EFFETS SUPPLÉMENTAIRES
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Effet de curseur personnalisé avec traînée violette
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '8px';
    trail.style.height = '8px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'rgba(168, 85, 247, 0.6)';
    trail.style.pointerEvents = 'none';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.transform = 'translate(-50%, -50%)';
    trail.style.zIndex = '9999';
    trail.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.8)';
    trail.style.transition = 'all 0.5s ease-out';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.width = '20px';
        trail.style.height = '20px';
    }, 10);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
});

// ========================================
// LANCEMENT AU CHARGEMENT DE LA PAGE
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    generateTPCards();
});