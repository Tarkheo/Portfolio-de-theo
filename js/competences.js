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
        dateObtention: "Décembre 2025",
        logo: "globe", // Nom d'icône Lucide (voir js/icons.js)
        badge: "check-circle", // Badge de validation
        type: "pdf" // "pdf" ou "image"
    },
    {
        nom: "SecNumAcadémie",
        organisme: "ANSSI",
        description: "Formation à la sécurité numérique - ANSSI",
        imagePath: "images/secnum_certif.pdf",
        dateObtention: "Novembre 2025",
        logo: "lock",
        badge: "check-circle",
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
            <div class="cert-badge">${ICON(cert.badge, 18)}</div>
            <div class="cert-content">
                <div class="cert-logo">${ICON(cert.logo, 40)}</div>
                <h2>${cert.nom}</h2>
                <p><strong>${cert.organisme}</strong></p>
                <p>${cert.description}</p>
                <span class="cert-date">${ICON('calendar', 16)} ${cert.dateObtention}</span>
                <div class="cert-actions">
                    <button class="btn-view" onclick="viewCert('${cert.imagePath}', '${cert.nom}', '${cert.type}')">
                        ${ICON('eye', 16)} Visualiser
                    </button>
                    <a href="${cert.imagePath}" download class="btn-download">
                        ${ICON('download', 16)} Télécharger
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
// ### ANIMATION ICÔNES DORÉES (MANETTES/CLAVIERS) ###
// ========================================

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Liste des objets qui vont flotter en arrière-plan
const floatingIcons = [];
const iconList = ['🎮', '⌨️'];

function drawIcons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ajout aléatoire d'une icône (fréquence très faible pour ne pas surcharger)
    // Environ 1 à 2% de chance par frame qu'une icône apparaisse
    if (Math.random() < 0.015) { 
        floatingIcons.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            icon: iconList[Math.random() > 0.5 ? 1 : 0],
            life: 0,
            maxLife: 150 + Math.random() * 150, // Durée de vie aléatoire
            size: 25 + Math.random() * 35, // Taille entre 25px et 60px
            speedY: -0.1 - Math.random() * 0.4 // Mouvement lent vers le haut
        });
    }

    for (let i = floatingIcons.length - 1; i >= 0; i--) {
        const item = floatingIcons[i];
        item.life++;
        item.y += item.speedY;

        // Effet d'apparition (fade in) et disparition (fade out)
        let opacity = 0;
        const fadeTime = 40; // Nombre de frames pour le fondu
        if (item.life < fadeTime) {
            opacity = item.life / fadeTime;
        } else if (item.life > item.maxLife - fadeTime) {
            opacity = (item.maxLife - item.life) / fadeTime;
        } else {
            opacity = 1;
        }
        
        // Opacité globale réduite pour rester discret et pro en arrière-plan
        opacity *= 0.25;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.font = item.size + 'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Teinte dorée via filtre CSS et ombre
        ctx.filter = "sepia(1) saturate(5) hue-rotate(-30deg) brightness(1.2)";
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 20;
        
        ctx.fillText(item.icon, item.x, item.y);
        ctx.restore();

        // Supprimer l'icône une fois sa durée de vie écoulée
        if (item.life >= item.maxLife) {
            floatingIcons.splice(i, 1);
        }
    }
    
    requestAnimationFrame(drawIcons);
}

// Lancer l'animation
drawIcons();

// Redimensionnement du canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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