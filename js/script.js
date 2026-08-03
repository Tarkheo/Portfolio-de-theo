/**
 * FOND ANIMÉ - THÈME LUXE (OR ET VIOLET)
 * Ambiance abstraite et professionnelle
 */

// ===== CONFIGURATION =====
const ENDERMAN_CONFIG = {
    particleCount: 120,    // Un peu moins de particules pour un aspect plus épuré
    endermanCount: 0,      // On met à 0 pour un aspect abstrait et pro (fini les carrés noirs)
    starCount: 150,        // Plus d'étoiles pour un effet voie lactée
    particleSpeed: 0.3,    // Plus lent, plus relaxant
    endermanSpeed: 0,
    glowIntensity: 0.6,
    portalParticles: 50
};

// ===== COULEURS THÈME LUXE (OR & VIOLET) =====
const COLORS = {
    particles: [
        'rgba(212, 175, 55, 0.8)',   // Or classique
        'rgba(255, 215, 0, 0.6)',    // Or clair (Gold)
        'rgba(147, 51, 234, 0.5)',   // Violet clair
        'rgba(75, 27, 107, 0.7)',    // Violet profond
        'rgba(230, 194, 122, 0.4)'   // Or pâle
    ],
    endermanEyes: 'rgba(212, 175, 55, 1)', // Plus utilisé car endermanCount = 0
    portal: 'rgba(75, 27, 107, 0.2)',      // Portails très discrets
    stars: 'rgba(255, 245, 215, 0.7)',     // Étoiles légèrement dorées
    ambient: 'rgba(10, 3, 15, 0.1)'
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
        
        if (this.x < 0 || this.x > this.canvas.width - this.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height - this.height) this.speedY *= -1;
        
        this.teleportTimer--;
        if (this.teleportTimer <= 0) {
            this.teleport();
        }
        
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            return p.life > 0;
        });
    }

    draw(ctx) {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life / 30;
            ctx.fillStyle = COLORS.particles[0];
            ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
            ctx.restore();
        });
        
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.fillRect(this.x - 2, this.y - 10, this.width + 4, 10);
        
        ctx.fillStyle = COLORS.endermanEyes;
        ctx.fillRect(this.x + 1, this.y - 8, 2, 3);
        ctx.fillRect(this.x + 5, this.y - 8, 2, 3);
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = COLORS.endermanEyes;
        ctx.fillRect(this.x + 1, this.y - 8, 2, 3);
        ctx.fillRect(this.x + 5, this.y - 8, 2, 3);
        
        ctx.restore();
    }
}

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
        for (let i = 0; i < ENDERMAN_CONFIG.starCount; i++) {
            this.stars.push(new Star(this.canvas));
        }
        
        for (let i = 0; i < ENDERMAN_CONFIG.particleCount; i++) {
            this.particles.push(new EndParticle(this.canvas));
        }
        
        for (let i = 0; i < ENDERMAN_CONFIG.endermanCount; i++) {
            this.endermen.push(new Enderman(this.canvas));
        }
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        for (let i = 0; i < ENDERMAN_CONFIG.portalParticles; i++) {
            this.portalParticles.push(new PortalParticle(centerX, centerY));
        }
    }

    drawBackground() {
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
        
        this.stars.forEach(star => {
            star.update();
            star.draw(this.ctx);
        });
        
        this.portalParticles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
        
        this.particles.forEach(particle => {
            particle.update(this.canvas);
            particle.draw(this.ctx);
        });
        
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
            console.log('Fond démarré !');
        }
    }

    stop() {
        this.isRunning = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log('Fond arrêté');
    }

    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }
}

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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EndermanBackground,
        initEndermanBackground
    };
}


const MINECRAFT_PLAYLIST = [
    {
        title: "C418 - Aria Math",
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
    }
];

window.MINECRAFT_PLAYLIST = MINECRAFT_PLAYLIST;

document.addEventListener('DOMContentLoaded', function() {
    initAudioPlayer();
});

function initAudioPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    const audioPlayer = document.getElementById('audioPlayer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const trackInfo = document.getElementById('trackInfo');
    const trackNumber = document.getElementById('trackNumber');
    const vinylRecord = document.getElementById('vinylRecord'); // Notre vinyle !

    if (!audio || !playPauseBtn || !playIcon || !volumeSlider || !volumeIcon || 
        !audioPlayer || !prevBtn || !nextBtn || !trackInfo || !trackNumber || !vinylRecord) {
        console.error('Certains éléments du lecteur audio sont manquants');
        return;
    }

    if (!window.MINECRAFT_PLAYLIST || window.MINECRAFT_PLAYLIST.length === 0) {
        console.error('Playlist non trouvée ou vide');
        return;
    }

    const playlist = window.MINECRAFT_PLAYLIST;
    let currentTrack = 0;
    let previousVolume = 0.7;
    let isMinimized = false;

    audio.volume = 0.7;
    loadTrack(currentTrack);

    function loadTrack(index) {
        if (index < 0 || index >= playlist.length) return;
        
        const track = playlist[index];
        const wasPlaying = !audio.paused;
        
        audio.src = track.src;
        audio.load();
        
        trackInfo.textContent = track.title;
        trackNumber.textContent = `${index + 1}/${playlist.length}`;
        
        if (wasPlaying) {
            audio.play().then(() => {
                playIcon.textContent = '⏸';
                vinylRecord.classList.add('playing'); // Fait tourner le disque
            }).catch(error => {
                console.error('Erreur lors de la lecture:', error);
                playIcon.textContent = '▶';
                vinylRecord.classList.remove('playing');
            });
        }
        
        console.log(`Piste chargée: ${track.title}`);
    }

    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                playIcon.textContent = '⏸';
                vinylRecord.classList.add('playing'); // Fait tourner le disque
                console.log('Lecture démarrée');
            }).catch(error => {
                console.error('Erreur lors de la lecture:', error);
                alert('Impossible de démarrer la lecture. Vérifiez que le fichier audio existe.');
            });
        } else {
            audio.pause();
            playIcon.textContent = '▶';
            vinylRecord.classList.remove('playing'); // Arrête de faire tourner le disque
            console.log('Lecture en pause');
        }
    });

    prevBtn.addEventListener('click', function() {
        currentTrack--;
        if (currentTrack < 0) {
            currentTrack = playlist.length - 1;
        }
        loadTrack(currentTrack);
        
        prevBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            prevBtn.style.transform = 'scale(1)';
        }, 100);
    });

    nextBtn.addEventListener('click', function() {
        currentTrack++;
        if (currentTrack >= playlist.length) {
            currentTrack = 0;
        }
        loadTrack(currentTrack);
        
        nextBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            nextBtn.style.transform = 'scale(1)';
        }, 100);
    });

    audio.addEventListener('ended', function() {
        currentTrack++;
        if (currentTrack >= playlist.length) {
            currentTrack = 0;
        }
        loadTrack(currentTrack);
        
        audio.play().then(() => {
            playIcon.textContent = '⏸';
            vinylRecord.classList.add('playing');
        }).catch(error => {
            console.error('Erreur lecture auto:', error);
        });
    });

    volumeSlider.addEventListener('input', function(e) {
        const volume = e.target.value / 100;
        audio.volume = volume;
        previousVolume = volume > 0 ? volume : previousVolume;
        updateVolumeIcon(volume);
    });

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

    audio.addEventListener('error', function(e) {
        console.error('Erreur de chargement audio:', e);
        playIcon.textContent = '▶';
        trackInfo.textContent = 'Erreur: Fichier introuvable';
        trackInfo.style.color = '#ff6b6b';
        vinylRecord.classList.remove('playing');
    });

    audio.addEventListener('loadeddata', function() {
        console.log('Audio chargé avec succès');
        trackInfo.style.color = 'white';
    });

    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            playPauseBtn.click();
        }
        
        if (e.code === 'ArrowLeft') {
            e.preventDefault();
            prevBtn.click();
        }
        
        if (e.code === 'ArrowRight') {
            e.preventDefault();
            nextBtn.click();
        }
        
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
        
        if (e.code === 'KeyM') {
            e.preventDefault();
            volumeIcon.click();
        }
    });

    console.log('Lecteur vinyle initialisé !');
}

window.playAudio = function() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.play();
        document.getElementById('vinylRecord')?.classList.add('playing');
    }
};

window.pauseAudio = function() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.pause();
        document.getElementById('vinylRecord')?.classList.remove('playing');
    }
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