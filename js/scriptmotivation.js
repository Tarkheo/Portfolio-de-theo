// ========================================
// FONCTION POUR INSÉRER LA DATE ACTUELLE
// ========================================

function insertCurrentDate() {
  // Crée un nouvel objet Date avec la date/heure actuelle
  const today = new Date();
  
  // Options de formatage pour la date en français
  const options = { 
    year: 'numeric',  // Affiche l'année en nombre (ex: 2025)
    month: 'long',    // Affiche le mois en toutes lettres (ex: janvier)
    day: 'numeric'    // Affiche le jour en nombre (ex: 15)
  };
  
  // Sélectionne l'élément HTML avec l'id "current-date"
  const dateElement = document.getElementById('current-date');
  
  // Si l'élément existe dans la page
  if (dateElement) {
    // Insère la date formatée en français dans l'élément
    dateElement.textContent = today.toLocaleDateString('fr-FR', options);
  }
}

// ========================================
// EFFET MATRIX - PLUIE DE CARACTÈRES VERTS
// ========================================

function initMatrixEffect() {
  // Crée un nouvel élément canvas (zone de dessin)
  const canvas = document.createElement('canvas');
  
  // Donne un identifiant au canvas
  canvas.id = 'matrixCanvas';
  
  // Obtient le contexte 2D pour dessiner sur le canvas
  const ctx = canvas.getContext('2d');

  // Définit la largeur du canvas = largeur de la fenêtre
  canvas.width = window.innerWidth;
  
  // Définit la hauteur du canvas = hauteur de la fenêtre
  canvas.height = window.innerHeight;

  // Insère le canvas en tant que premier enfant du body
  document.body.insertBefore(canvas, document.body.firstChild);

  // Chaîne de caractères qui vont tomber (chiffres, lettres, symboles)
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*()';
  
  // Taille de la police des caractères
  const fontSize = 14;
  
  // Calcule le nombre de colonnes en fonction de la largeur du canvas
  const columns = Math.floor(canvas.width / fontSize);
  
  // Crée un tableau vide pour stocker la position verticale de chaque colonne
  const drops = [];
  
  // Boucle pour initialiser chaque colonne
  for (let i = 0; i < columns; i++) {
    // Position initiale aléatoire pour chaque colonne (effet de cascade)
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
  }

  // Fonction qui dessine l'animation Matrix
  function drawMatrix() {
    // Dessine un rectangle noir semi-transparent sur tout le canvas
    // Cela crée l'effet de traînée (les anciens caractères s'effacent progressivement)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Définit la police d'écriture
    ctx.font = fontSize + 'px monospace';

    // Boucle sur chaque colonne
    for (let i = 0; i < drops.length; i++) {
      // Sélectionne un caractère aléatoire dans la chaîne
      const char = characters[Math.floor(Math.random() * characters.length)];
      
      // Calcule la position X (horizontale) du caractère
      const x = i * fontSize;
      
      // Calcule la position Y (verticale) du caractère
      const y = drops[i] * fontSize;

      // Génère un nombre aléatoire pour la luminosité
      const brightness = Math.random();
      
      // Détermine la couleur en fonction de la luminosité
      if (brightness > 0.95) {
        // 5% de chance d'être blanc (très brillant)
        ctx.fillStyle = '#fff';
      } else if (brightness > 0.8) {
        // 15% de chance d'être vert fluo (#0f0)
        ctx.fillStyle = '#0f0';
      } else if (brightness > 0.5) {
        // 30% de chance d'être vert moyen (#0d0)
        ctx.fillStyle = '#0d0';
      } else {
        // 50% de chance d'être vert foncé (#0a0)
        ctx.fillStyle = '#0a0';
      }

      // Dessine le caractère à la position calculée
      ctx.fillText(char, x, y);

      // Si le caractère est sorti en bas de l'écran
      if (y > canvas.height && Math.random() > 0.975) {
        // 2.5% de chance de réinitialiser la colonne au début
        drops[i] = 0;
      }

      // Incrémente la position verticale (fait tomber le caractère)
      drops[i]++;
    }
  }

  // Lance l'animation avec un intervalle de 50ms (20 images par seconde)
  const matrixInterval = setInterval(drawMatrix, 50);

  // Écoute l'événement de redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    // Met à jour la largeur du canvas
    canvas.width = window.innerWidth;
    
    // Met à jour la hauteur du canvas
    canvas.height = window.innerHeight;
    
    // Vide le tableau des colonnes
    drops.length = 0;
    
    // Recalcule le nombre de colonnes
    const newColumns = Math.floor(canvas.width / fontSize);
    
    // Réinitialise les positions de chaque colonne
    for (let i = 0; i < newColumns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
  });

  // Retourne l'identifiant de l'intervalle (pour pouvoir l'arrêter si nécessaire)
  return matrixInterval;
}

// ========================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ========================================

// Vérifie si le DOM est encore en train de charger
if (document.readyState === 'loading') {
  // Si oui, attend que le DOM soit complètement chargé
  document.addEventListener('DOMContentLoaded', function() {
    insertCurrentDate();    // Insère la date actuelle
    initMatrixEffect();     // Lance l'effet Matrix
  });
} else {
  // Si le DOM est déjà chargé, exécute immédiatement
  insertCurrentDate();      // Insère la date actuelle
  initMatrixEffect();       // Lance l'effet Matrix
}