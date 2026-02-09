/* ============================================
   FICHIER JAVASCRIPT - CERTIFICATIONS
   Nom du fichier : competences.js
   Emplacement : js/competences.js
   ============================================ */

// ========================================
// ### CONFIGURATION DES CERTIFICATIONS ###
// MODIFIER ICI POUR AJOUTER VOS CERTIFICATIONS
// ========================================

const certificationsList = [
    {
        nom: "Cisco CCNA",
        organisme: "Cisco",
        description: "Certification réseau Cisco Certified Network Associate",
        imagePath: "images/cisco.pdf", // Peut être PDF ou image (jpg, png)
        dateObtention: "Décembre 2024",
        logo: "🌐", // Emoji ou icône
        badge: "✅", // Badge de validation
        type: "pdf" // "pdf" ou "image"
    },
    {
        nom: "SecNumAcadémie",
        organisme: "ANSSI",
        description: "Formation à la sécurité numérique - ANSSI",
        imagePath: "images/secnum_certif.pdf",
        dateObtention: "Novembre 2024",
        logo: "🔒",
        badge: "✅",
        type: "pdf"
    },

];

// ========================================
// ### GÉNÉRATION AUTOMATIQUE DES CARTES ###
// ========================================

function generateCertCards() {
    const grid = document.getElementById('certGrid');
    
    // Boucle sur chaque certification
    certificationsList.forEach((cert, index) => {
        // Crée un élément div pour la carte
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.setAttribute('data-cert', index);
        
        // Construit le HTML de la carte
        card.innerHTML = `
            <div class="card-glow"></div>
            <div class="cert-badge">${cert.badge}</div>
            <div class="cert-content">
                <div class="cert-logo">${cert.logo}</div>
                <h2>${cert.nom}</h2>
                <p><strong>${cert.organisme}</strong></p>
                <p>${cert.description}</p>
                <span class="cert-date">📅 ${cert.dateObtention}</span>
                <div class="cert-actions">
                    <button class="btn-view" onclick="viewCert('${cert.imagePath}', '${cert.nom}', '${cert.type}')">
                        👁️ Visualiser
                    </button>
                    <a href="${cert.imagePath}" download class="btn-download">
                        ⬇️ Télécharger
                    </a>
                </div>
            </div>
        `;
        
        // Ajoute la carte à la grille
        grid.appendChild(card);
    });
    
    // Initialise les effets visuels
    initializeCardEffects();
}

// ========================================
// ### INITIALISATION DES EFFETS DE CARTES ###
// ========================================

function initializeCardEffects() {
    const cards = document.querySelectorAll('.cert-card');
    
    cards.forEach(card => {
        // Animation d'apparition progressive
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s ease-out';
        
        // Observer pour l'animation au scroll
        observer.observe(card);
    });
}

// ========================================
// ### VISUALISATION DES CERTIFICATIONS ###
// ========================================

function viewCert(imagePath, certName, type) {
    const modal = document.getElementById('certModal');
    const certImage = document.getElementById('certImage');
    const caption = document.getElementById('certCaption');
    
    // Si c'est un PDF, on utilise un viewer PDF
    if (type === 'pdf') {
        // Crée un iframe pour le PDF
        const iframe = document.createElement('iframe');
        iframe.src = imagePath;
        iframe.style.width = '100%';
        iframe.style.height = '80vh';
        iframe.style.border = '3px solid #fbbf24';
        iframe.style.borderRadius = '15px';
        iframe.style.boxShadow = '0 0 60px rgba(251, 191, 36, 0.5)';
        
        // Remplace l'image par l'iframe
        certImage.style.display = 'none';
        certImage.parentNode.insertBefore(iframe, certImage);
        iframe.id = 'pdfViewer';
    } else {
        // Si c'est une image, affiche normalement
        certImage.src = imagePath;
        certImage.style.display = 'block';
        certImage.alt = certName;
    }
    
    // Définit le titre
    caption.textContent = certName;
    
    // Affiche le modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ========================================
// ### FERMETURE DU MODAL ###
// ========================================

function closeModal() {
    const modal = document.getElementById('certModal');
    const certImage = document.getElementById('certImage');
    
    // Supprime le viewer PDF s'il existe
    const pdfViewer = document.getElementById('pdfViewer');
    if (pdfViewer) {
        pdfViewer.remove();
    }
    
    // Réinitialise l'image
    certImage.src = '';
    certImage.style.display = 'block';
    
    // Cache le modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Ferme le modal en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById('certModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Ferme le modal avec la touche Échap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// ### ANIMATION MATRIX EN ARRIÈRE-PLAN ###
// (Identique au code TPS mais avec couleurs dorées)
// ========================================

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789@#$%^&*()';
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
        // Couleurs dorées au lieu de violettes
        if (brightness > 0.95) {
            ctx.fillStyle = '#fbbf24';
        } else if (brightness > 0.8) {
            ctx.fillStyle = '#f59e0b';
        } else if (brightness > 0.6) {
            ctx.fillStyle = '#d97706';
        } else if (brightness > 0.4) {
            ctx.fillStyle = '#b45309';
        } else {
            ctx.fillStyle = '#92400e';
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

// Redimensionnement du canvas
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
// ### PARTICULES GLOBALES FLOTTANTES ###
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
        
        // Couleurs dorées pour les particules
        const colors = ['#fbbf24', '#f59e0b', '#fcd34d', '#fef3c7', '#d97706'];
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
// ### OBSERVER POUR ANIMATIONS AU SCROLL ###
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

// ========================================
// ### EFFET DE CURSEUR PERSONNALISÉ ###
// ========================================

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '8px';
    trail.style.height = '8px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'rgba(251, 191, 36, 0.6)';
    trail.style.pointerEvents = 'none';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.transform = 'translate(-50%, -50%)';
    trail.style.zIndex = '9999';
    trail.style.boxShadow = '0 0 15px rgba(251, 191, 36, 0.8)';
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
// ### LANCEMENT AU CHARGEMENT DE LA PAGE ###
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    generateCertCards();
    console.log('📜 ' + certificationsList.length + ' certification(s) chargée(s)');
});


//{ AJOUTER PDF / IMAGES 
    // nom: "Votre Certification",
    //organisme: "Organisation",
   // description: "Description de la certification",
  //  imagePath: "images/certifications/votre-certif.pdf",
    //dateObtention: "Janvier 2025",
  //  logo: "🔐", // Emoji de votre choix
 //   badge: "✅",
//    type: "pdf" // ou "image"
//}