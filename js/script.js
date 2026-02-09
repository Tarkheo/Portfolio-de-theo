/**
 * FOND ANIMÉ MINECRAFT - THÈME ENDERMAN
 * Ambiance sombre de l'End avec particules violettes et Endermen
 */

// ===== CONFIGURATION =====
const ENDERMAN_CONFIG = {
    particleCount: 150,
    endermanCount: 5,
    starCount: 100,
    particleSpeed: 0.5,
    endermanSpeed: 0.3,
    glowIntensity: 0.8,
    portalParticles: 80
};

// ===== COULEURS THÈME ENDERMAN =====
const COLORS = {
    particles: [
        'rgba(138, 43, 226, 0.8)',   // Violet profond
        'rgba(147, 51, 234, 0.7)',   // Violet clair
        'rgba(168, 85, 247, 0.6)',   // Violet lumineux
        'rgba(192, 132, 252, 0.5)',  // Violet pastel
        'rgba(216, 180, 254, 0.4)'   // Violet très clair
    ],
    endermanEyes: 'rgba(199, 36, 177, 1)', // Rose-violet pour les yeux
    portal: 'rgba(138, 43, 226, 0.3)',
    stars: 'rgba(255, 255, 255, 0.6)',
    ambient: 'rgba(20, 5, 30, 0.1)'
};

// ===== CLASSE PARTICULE =====
class EndParticle {
    constructor(canvas) {
        this.reset(canvas);
        this.y = Math.random() * canvas.height;
    }

    reset(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * ENDERMAN_CONFIG.particleSpeed + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = COLORS.particles[Math.floor(Math.random() * COLORS.particles.length)];
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
    }

    update(canvas) {
        this.y += this.speedY;
        this.x += this.speedX;
        this.pulse += this.pulseSpeed;
        
        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
            this.reset(canvas);
        }
    }

    draw(ctx) {
        const glowSize = this.size * (2 + Math.sin(this.pulse));
        
        ctx.save();
        ctx.globalAlpha = this.opacity * (0.5 + Math.sin(this.pulse) * 0.5);
        
        // Effet de lueur
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - glowSize, this.y - glowSize, glowSize * 2, glowSize * 2);
        
        // Particule centrale
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        
        ctx.restore();
    }
}

// ===== CLASSE ÉTOILE =====
class Star {
    constructor(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
        this.twinkle += this.twinkleSpeed;
    }

    draw(ctx) {
        const opacity = 0.3 + Math.sin(this.twinkle) * 0.3;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = COLORS.stars;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.restore();
    }
}

// ===== CLASSE ENDERMAN =====
class Enderman {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.width = 8;
        this.height = 30;
        this.speedX = (Math.random() - 0.5) * ENDERMAN_CONFIG.endermanSpeed;
        this.speedY = (Math.random() - 0.5) * ENDERMAN_CONFIG.endermanSpeed;
        this.teleportTimer = Math.random() * 300 + 200;
        this.alpha = 0.6;
        this.particles = [];
    }

    teleport() {
        // Effet de particules avant téléportation
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: this.x + this.width/2,
                y: this.y + Math.random() * this.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 30
            });
        }
        
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.speedX = (Math.random() - 0.5) * ENDERMAN_CONFIG.endermanSpeed;
        this.speedY = (Math.random() - 0.5) * ENDERMAN_CONFIG.endermanSpeed;
        this.teleportTimer = Math.random() * 300 + 200;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rebond sur les bords
        if (this.x < 0 || this.x > this.canvas.width - this.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height - this.height) this.speedY *= -1;
        
        this.teleportTimer--;
        if (this.teleportTimer <= 0) {
            this.teleport();
        }
        
        // Mise à jour des particules
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            return p.life > 0;
        });
    }

    draw(ctx) {
        // Dessiner les particules de téléportation
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life / 30;
            ctx.fillStyle = COLORS.particles[0];
            ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
            ctx.restore();
        });
        
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Corps (noir)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Tête
        ctx.fillRect(this.x - 2, this.y - 10, this.width + 4, 10);
        
        // Yeux lumineux
        ctx.fillStyle = COLORS.endermanEyes;
        ctx.fillRect(this.x + 1, this.y - 8, 2, 3);
        ctx.fillRect(this.x + 5, this.y - 8, 2, 3);
        
        // Effet de lueur des yeux
        ctx.shadowBlur = 10;
        ctx.shadowColor = COLORS.endermanEyes;
        ctx.fillRect(this.x + 1, this.y - 8, 2, 3);
        ctx.fillRect(this.x + 5, this.y - 8, 2, 3);
        
        ctx.restore();
    }
}

// ===== CLASSE PORTAIL =====
class PortalParticle {
    constructor(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 80 + 20;
        this.speed = Math.random() * 0.02 + 0.01;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.angle += this.speed;
        this.x = this.centerX + Math.cos(this.angle) * this.radius;
        this.y = this.centerY + Math.sin(this.angle) * this.radius;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = COLORS.portal;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.restore();
    }
}

// ===== CLASSE PRINCIPALE =====
class EndermanBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            this.canvas = this.createCanvas(canvasId);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.stars = [];
        this.endermen = [];
        this.portalParticles = [];
        this.isRunning = false;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.init();
    }

    createCanvas(canvasId) {
        const canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        
        document.body.insertBefore(canvas, document.body.firstChild);
        return canvas;
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Créer les étoiles
        for (let i = 0; i < ENDERMAN_CONFIG.starCount; i++) {
            this.stars.push(new Star(this.canvas));
        }
        
        // Créer les particules
        for (let i = 0; i < ENDERMAN_CONFIG.particleCount; i++) {
            this.particles.push(new EndParticle(this.canvas));
        }
        
        // Créer les Endermen
        for (let i = 0; i < ENDERMAN_CONFIG.endermanCount; i++) {
            this.endermen.push(new Enderman(this.canvas));
        }
        
        // Créer les particules de portail
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        for (let i = 0; i < ENDERMAN_CONFIG.portalParticles; i++) {
            this.portalParticles.push(new PortalParticle(centerX, centerY));
        }
    }

    drawBackground() {
        // Dégradé de fond sombre
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0a0015');
        gradient.addColorStop(0.5, '#1a0a2e');
        gradient.addColorStop(1, '#0f051d');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        if (!this.isRunning) return;
        
        this.drawBackground();
        
        // Dessiner les étoiles
        this.stars.forEach(star => {
            star.update();
            star.draw(this.ctx);
        });
        
        // Dessiner les particules de portail
        this.portalParticles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
        
        // Dessiner les particules
        this.particles.forEach(particle => {
            particle.update(this.canvas);
            particle.draw(this.ctx);
        });
        
        // Dessiner les Endermen
        this.endermen.forEach(enderman => {
            enderman.update();
            enderman.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
            console.log('Fond Enderman démarré !');
        }
    }

    stop() {
        this.isRunning = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log('Fond Enderman arrêté');
    }

    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }
}

// ===== INITIALISATION =====
function initEndermanBackground(canvasId = 'enderman-background', autoStart = true) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createBackground(canvasId, autoStart);
        });
    } else {
        createBackground(canvasId, autoStart);
    }
}

function createBackground(canvasId, autoStart) {
    window.endermanBackground = new EndermanBackground(canvasId);
    
    if (autoStart) {
        window.endermanBackground.start();
    }
    
    window.startEndermanBackground = () => window.endermanBackground.start();
    window.stopEndermanBackground = () => window.endermanBackground.stop();
    window.toggleEndermanBackground = () => window.endermanBackground.toggle();
}

// ===== AUTO-DÉMARRAGE =====
initEndermanBackground();

// ===== EXPORTS =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EndermanBackground,
        initEndermanBackground
    };
}







//--------------------------------------------------------------SEPARATION MUSIQUES DOSSIER  AUDIO-----------------------------------------------------------------------------------------------------------



/**
 * PLAYLIST MINECRAFT
 * Liste de toutes les musiques disponibles
 * Remplacez les chemins par vos vrais fichiers audio
 */

const MINECRAFT_PLAYLIST = [
    {
        title: "C418 - Aria Math ",
        src: "audio/minecraft/Aria Math.mp3"
    },
    {
        title: "C418 - Haggstrom",
        src: "audio/minecraft/Haggstrom.mp3"
    },
    {
        title: "C418 - Mice On Venus",
        src: "audio/minecraft/Mice On Venus.mp3"
    },
    {
        title: "C418 - Subwoofer Lullaby",
        src: "audio/minecraft/Subwoofer Lullaby.mp3"
    },
    {
        title: "C418 - Sweden",
        src: "audio/minecraft/Sweden.mp3"
    },
    {
        title: "C418 - Haggstrom", //PAS RENSEIGNER 
        src: "audio/minecraft/haggs.mp3"
    },
    {
        title: "C418 - Minecraft",//PAS RENSEIGNER 
        src: "audio/minecraft/minecraft.mp3"
    },
    {
        title: "C418 - Dry Hands",//PAS RENSEIGNER 
        src: "audio/minecraft/dry-hands.mp3"
    },
    {
        title: "C418 - Clark",//PAS RENSEIGNER 
        src: "audio/minecraft/clark.mp3"
    },
    {
        title: "C418 - Danny",//PAS RENSEIGNER 
        src: "audio/minecraft/danny.mp3"
    }
];

// Exporter la playlist pour l'utiliser dans audio-player.js
window.MINECRAFT_PLAYLIST = MINECRAFT_PLAYLIST;
//-----------------------------------------------------------------------LECTEUR----------------------------------------------------------------------------------------------------------------------------------------------

/**
 * LECTEUR AUDIO MULTI-MUSIQUES - CONTRÔLES
 * Gestion complète du lecteur avec navigation entre pistes
 */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    initAudioPlayer();
});

function initAudioPlayer() {
    // Récupération des éléments
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    const audioPlayer = document.getElementById('audioPlayer');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const trackInfo = document.getElementById('trackInfo');
    const trackNumber = document.getElementById('trackNumber');

    // Vérifier que tous les éléments existent
    if (!audio || !playPauseBtn || !playIcon || !volumeSlider || !volumeIcon || 
        !audioPlayer || !minimizeBtn || !prevBtn || !nextBtn || !trackInfo || !trackNumber) {
        console.error('Certains éléments du lecteur audio sont manquants');
        return;
    }

    // Vérifier que la playlist existe
    if (!window.MINECRAFT_PLAYLIST || window.MINECRAFT_PLAYLIST.length === 0) {
        console.error('Playlist non trouvée ou vide');
        return;
    }

    // ===== VARIABLES =====
    const playlist = window.MINECRAFT_PLAYLIST;
    let currentTrack = 0;
    let previousVolume = 0.7;
    let isMinimized = false;

    // ===== INITIALISATION =====
    audio.volume = 0.7;
    loadTrack(currentTrack);

    // ===== CHARGEMENT D'UNE PISTE =====
    function loadTrack(index) {
        if (index < 0 || index >= playlist.length) return;
        
        const track = playlist[index];
        const wasPlaying = !audio.paused;
        
        // Charger la nouvelle piste
        audio.src = track.src;
        audio.load();
        
        // Mettre à jour l'affichage
        trackInfo.textContent = track.title;
        trackNumber.textContent = `${index + 1}/${playlist.length}`;
        
        // Reprendre la lecture si elle était en cours
        if (wasPlaying) {
            audio.play().then(() => {
                playIcon.textContent = '⏸';
            }).catch(error => {
                console.error('Erreur lors de la lecture:', error);
                playIcon.textContent = '▶';
            });
        }
        
        console.log(`Piste chargée: ${track.title}`);
    }

    // ===== BOUTON LECTURE/PAUSE =====
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                playIcon.textContent = '⏸';
                console.log('Lecture démarrée');
            }).catch(error => {
                console.error('Erreur lors de la lecture:', error);
                alert('Impossible de démarrer la lecture. Vérifiez que le fichier audio existe.');
            });
        } else {
            audio.pause();
            playIcon.textContent = '▶';
            console.log('Lecture en pause');
        }
    });

    // ===== BOUTON PISTE PRÉCÉDENTE =====
    prevBtn.addEventListener('click', function() {
        currentTrack--;
        if (currentTrack < 0) {
            currentTrack = playlist.length - 1; // Boucle à la fin
        }
        loadTrack(currentTrack);
        
        // Animation du bouton
        prevBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            prevBtn.style.transform = 'scale(1)';
        }, 100);
    });

    // ===== BOUTON PISTE SUIVANTE =====
    nextBtn.addEventListener('click', function() {
        currentTrack++;
        if (currentTrack >= playlist.length) {
            currentTrack = 0; // Boucle au début
        }
        loadTrack(currentTrack);
        
        // Animation du bouton
        nextBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            nextBtn.style.transform = 'scale(1)';
        }, 100);
    });

    // ===== PISTE SUIVANTE AUTOMATIQUE À LA FIN =====
    audio.addEventListener('ended', function() {
        // Passer à la piste suivante
        currentTrack++;
        if (currentTrack >= playlist.length) {
            currentTrack = 0; // Recommencer au début
        }
        loadTrack(currentTrack);
        
        // Reprendre la lecture automatiquement
        audio.play().then(() => {
            playIcon.textContent = '⏸';
        }).catch(error => {
            console.error('Erreur lecture auto:', error);
        });
    });

    // ===== CONTRÔLE DU VOLUME =====
    volumeSlider.addEventListener('input', function(e) {
        const volume = e.target.value / 100;
        audio.volume = volume;
        previousVolume = volume > 0 ? volume : previousVolume;
        updateVolumeIcon(volume);
    });

    // ===== CLIC SUR L'ICÔNE DE VOLUME (MUTE/UNMUTE) =====
    volumeIcon.addEventListener('click', function() {
        if (audio.volume > 0) {
            previousVolume = audio.volume;
            audio.volume = 0;
            volumeSlider.value = 0;
            updateVolumeIcon(0);
        } else {
            audio.volume = previousVolume;
            volumeSlider.value = previousVolume * 100;
            updateVolumeIcon(previousVolume);
        }
    });

    // ===== BOUTON MINIMISER/AGRANDIR =====
    minimizeBtn.addEventListener('click', function() {
        isMinimized = !isMinimized;
        
        if (isMinimized) {
            audioPlayer.classList.add('collapsed');
            audioPlayer.style.minWidth = 'auto';
            document.querySelector('.volume-control').style.display = 'none';
            document.querySelector('.audio-info-container').style.display = 'none';
            minimizeBtn.textContent = '+';
            minimizeBtn.title = 'Agrandir';
        } else {
            audioPlayer.classList.remove('collapsed');
            audioPlayer.style.minWidth = '400px';
            document.querySelector('.volume-control').style.display = 'flex';
            document.querySelector('.audio-info-container').style.display = 'flex';
            minimizeBtn.textContent = '−';
            minimizeBtn.title = 'Réduire';
        }
    });

    // ===== FONCTION POUR METTRE À JOUR L'ICÔNE DE VOLUME =====
    function updateVolumeIcon(volume) {
        if (volume === 0) {
            volumeIcon.textContent = '🔇';
        } else if (volume < 0.3) {
            volumeIcon.textContent = '🔈';
        } else if (volume < 0.7) {
            volumeIcon.textContent = '🔉';
        } else {
            volumeIcon.textContent = '🔊';
        }
    }

    // ===== AUTO-PLAY AU CHARGEMENT =====
    window.addEventListener('load', function() {
        audio.play().then(() => {
            playIcon.textContent = '⏸';
            console.log('Lecture automatique démarrée');
        }).catch(error => {
            console.log('Auto-play bloqué par le navigateur. Cliquez sur play pour démarrer.');
            playIcon.textContent = '▶';
        });
    });

    // ===== GESTION DES ÉVÉNEMENTS AUDIO =====
    audio.addEventListener('error', function(e) {
        console.error('Erreur de chargement audio:', e);
        playIcon.textContent = '▶';
        trackInfo.textContent = 'Erreur: Fichier introuvable';
        trackInfo.style.color = '#ff6b6b';
    });

    audio.addEventListener('loadeddata', function() {
        console.log('Audio chargé avec succès');
        trackInfo.style.color = 'white';
    });

    // ===== RACCOURCIS CLAVIER =====
    document.addEventListener('keydown', function(e) {
        // Espace pour play/pause
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            playPauseBtn.click();
        }
        
        // Flèches gauche/droite pour changer de piste
        if (e.code === 'ArrowLeft') {
            e.preventDefault();
            prevBtn.click();
        }
        
        if (e.code === 'ArrowRight') {
            e.preventDefault();
            nextBtn.click();
        }
        
        // Flèche haut/bas pour le volume
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            const newVolume = Math.min(100, parseInt(volumeSlider.value) + 5);
            volumeSlider.value = newVolume;
            volumeSlider.dispatchEvent(new Event('input'));
        }
        
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            const newVolume = Math.max(0, parseInt(volumeSlider.value) - 5);
            volumeSlider.value = newVolume;
            volumeSlider.dispatchEvent(new Event('input'));
        }
        
        // M pour mute/unmute
        if (e.code === 'KeyM') {
            e.preventDefault();
            volumeIcon.click();
        }
    });

    console.log('Lecteur audio multi-pistes initialisé avec succès !');
    console.log(`Playlist chargée: ${playlist.length} pistes`);
}

// ===== FONCTIONS UTILITAIRES EXPORTÉES =====
window.playAudio = function() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) audio.play();
};

window.pauseAudio = function() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) audio.pause();
};

window.nextTrack = function() {
    const btn = document.getElementById('nextBtn');
    if (btn) btn.click();
};

window.prevTrack = function() {
    const btn = document.getElementById('prevBtn');
    if (btn) btn.click();
};

window.setVolume = function(volume) {
    const audio = document.getElementById('backgroundMusic');
    const slider = document.getElementById('volumeSlider');
    if (audio && slider) {
        audio.volume = volume;
        slider.value = volume * 100;
    }
};