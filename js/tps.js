// ========================================
// CONFIGURATION DES TPs - MODIFIER ICI
// ========================================

const tpsList = [
    {
        numero: 1,
        titre: "TP 1 - Commandes CMD",
        description: "Premiers pas avec l'invite de commandes Windows",
        pdfPath: "images/TP3.pdf",
        imagePath: "images/images_tp/tp1.png",
        disponible: true
    },
    {
        numero: 2,
        titre: "TP 2 - CMD Avancé",
        description: "Commandes avancées et scripts batch",
        pdfPath: "images/TP4.pdf",
        imagePath: "images/images_tp/lab2.png",
        disponible: true
    },
    {
        numero: 3,
        titre: "TP Bash",
        description: "Administration système et réseau",
        pdfPath: "images/TP4.2.pdf",
        imagePath: "images/images_tp/tpbash.png",
        disponible: true
    },
    {
        numero: 4,
        titre: "TP Powershell",
        description: "",
        pdfPath: "images/TP5.pdf",
        imagePath: "images/images_tp/tppowershell.png",
        disponible: true
    },
    {
        numero: 5,
        titre: "Commandes CMD",
        description: "TP 6.1",
        pdfPath: "images/TP6.1.pdf",
        imagePath: "images/images_tp/cmdtp61.png",
        disponible: true
    },
    {
        numero: 6,
        titre: "Linux",
        description: "Utilisateurs Linux",
        pdfPath: "images/Linux_utilisateurs.pdf",
        imagePath: "images/images_tp/tplinuxusers.png",
        disponible: true
    },
    {
        numero: 7,
        titre: "TP Apache2",
        description: "Installer un serveur Http",
        pdfPath: "images/TP8.pdf",
        imagePath: "images/images_tp/tpapache2.png",
        disponible: true
    },
    {
        numero: 8,
        titre: "Windows & Linux",
        description: "Installation Windows & Linux en Dual Boot (Grub)",
        pdfPath: "images/Guide Ultime Dual Boot Windows & Linux.pdf",
        imagePath: "images/images_tp/logowmint.png",
        disponible: true
    },
    {
        numero: 9,
        titre: "Windows Permissions Utilisateurs",
        description: "Attribution des Permissions éléves & Administrateurs",
        pdfPath: "images/permissionsWindows.pdf",
        imagePath: "images/images_tp/winpermusers.png",
        disponible: true
    },
    {
        numero: 10,
        titre: "TP Packet Tracer",
        description: "Configuration Switch & Wifi ",
        pdfPath: "images/tpSwifi.png",
        imagePath: "images/images_tp/Cisco.jpeg",
        disponible: true
    },
    {
        numero: 11,
        titre: "Variable Subnet Lenght Mask",
        description: "Packet Tracer",
        pdfPath: "images/TD_VLSM.pdf",
        imagePath: "images/images_tp/vslm.jpeg",
        disponible: true
    },
    {
        numero: 12,
        titre: "Configuration Switch Cisco",
        description: "Packet Tracer",
        pdfPath: "images/switch_cisco.pdf",
        imagePath: "images/images_tp/switch.jpeg",
        disponible: true
    },
    {
        numero: 13,
        titre: "Machine Virtuelle",
        description: "Etapes d'installation",
        pdfPath: "images/Etape_diapo.pdf",
        imagePath: "images/images_tp/cmd1.jpeg",
        disponible: true
    },
    {
        numero: 14,
        titre: "Commandes Linux",
        description: "Les commandes à connaitre",
        pdfPath: "images/commandes.pdf",
        imagePath: "images/images_tp/P.png",
        disponible: true
    },
    {
        numero: 15,
        titre: "LAB 1 : Configuration Switch avec VLAN",
        description: "Premier LAB Cisco BTS SIO 2",
        pdfPath: "images/lab1.pdf",
        imagePath: "images/images_tp/lab1.png",
        disponible: true
    },
    {
        numero: 16,
        titre: "LAB 1 : Révision Commandes Linux",
        description: "Commandes linux 2e annee",
        pdfPath: "images/LAB1_linux.pdf",
        imagePath: "images/images_tp/lab1linux.png",
        disponible: true
    },
];

// ========================================
// GÉNÉRATION AUTOMATIQUE DES CARTES TP
// ========================================

function generateTPCards() {
    const grid = document.getElementById('tpGrid');
    
    tpsList.forEach((tp, index) => {
        const card = document.createElement('div');
        card.className = 'tp-card';
        card.setAttribute('data-tp', tp.numero);
        
        // Animation d'apparition en cascade (Stagger effect)
        card.style.animation = `cardEntrance 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
        
        const statusClass = tp.disponible ? 'available' : 'locked';
        const statusText = tp.disponible ? (ICON('check', 15) + ' Disponible') : (ICON('lock', 15) + ' Verrouillé');
        const iconClass = tp.disponible ? '' : 'locked';
        const iconEmoji = tp.disponible ? ICON('file-text', 42) : ICON('lock', 42);
        const disabled = tp.disponible ? '' : 'disabled';
        
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
                        ${ICON('eye', 16)} Visualiser
                    </button>
                    <a href="${tp.pdfPath}" download class="btn-download" ${disabled}>
                        ${ICON('download', 16)} Télécharger
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
    });
}

// ========================================
// ANIMATION MATRIX (OR & ROUGE)
// ========================================

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = '0101011010100101XYZABCDEFGHIJKLMNOPQRSTUVWｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ';
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
        // Palette Or et Rouge
        if (brightness > 0.95) {
            ctx.fillStyle = '#F3E5AB'; // Or très clair
        } else if (brightness > 0.8) {
            ctx.fillStyle = '#D4AF37'; // Or classique
        } else if (brightness > 0.6) {
            ctx.fillStyle = '#9E0E40'; // Rouge bordeaux
        } else if (brightness > 0.4) {
            ctx.fillStyle = '#7a0a30'; // Rouge sombre
        } else {
            ctx.fillStyle = '#4d051e'; // Rouge très sombre
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
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        
        const colors = ['#D4AF37', '#9E0E40', '#b3154b', '#e6c86e'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > particlesCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > particlesCanvas.height) this.speedY *= -1;
    }

    draw() {
        pCtx.save();
        pCtx.globalAlpha = this.opacity;
        pCtx.fillStyle = this.color;
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fill();
        
        pCtx.shadowBlur = 10;
        pCtx.shadowColor = this.color;
        pCtx.fill();
        
        pCtx.restore();
    }
}

const globalParticles = [];
const particleCount = 60; // Légèrement réduit pour plus de netteté

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
        this.size = Math.random() * 3 + 1;
        this.speedY = -(Math.random() * 1.5 + 0.5);
        this.opacity = Math.random() * 0.6 + 0.2;
        
        const colors = ['#D4AF37', '#9E0E40', '#F3E5AB', '#7a0a30'];
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
        this.element.style.boxShadow = `0 0 8px ${this.color}`;
        
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
// LANCEMENT AU CHARGEMENT DE LA PAGE
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    generateTPCards();
});
