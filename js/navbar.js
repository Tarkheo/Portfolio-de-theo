/* ============================================================
   NAVBAR PARTAGÉE — source unique pour TOUTES les pages
   ------------------------------------------------------------
   Injecte la barre de navigation (identique à l'accueil) en
   haut du <body>, puis câble le menu hamburger + l'accordéon
   des sous-menus sur mobile.

   Avantage : une seule définition de la navbar. Pas de
   copier-coller à maintenir sur 12 pages. Fonctionne aussi en
   ouverture locale (file://) car on n'utilise PAS fetch(), on
   injecte directement dans le DOM.

   Utilisation sur une page :
     <link rel="stylesheet" href="css/style.css">   (dans <head>)
     <script src="js/navbar.js"></script>           (juste après <body>)
   ============================================================ */
(function () {
  "use strict";

  // --- Structure HTML de la navbar (copie fidèle de l'accueil) ---
  var NAVBAR_HTML = [
    '<header class="site-header">',
    '  <button class="hamburger" aria-label="Ouvrir le menu" aria-controls="main-nav" aria-expanded="false" type="button">',
    '    <span class="hamburger-box"><span class="hamburger-inner"></span></span>',
    '  </button>',
    '  <nav id="main-nav">',
    '    <ul>',
    '      <li><a href="index.html"><span class="nav-text">Accueil</span></a></li>',
    '      <li><a href="cv2.html"><span class="nav-text">CV</span></a></li>',
    '      <li><a href="motivation.html"><span class="nav-text">Lettre de motivation</span></a></li>',
    '      <li class="dropdown">',
    '        <a href="#" class="dropbtn"><span class="nav-text">Projets</span><span class="nav-chevron"><svg class="lucide" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></a>',
    '        <div class="dropdown-content">',
    '          <a href="jeu.html">Tetris</a>',
    '          <a href="#">Serveur NAS</a>',
    '        </div>',
    '      </li>',
    '      <li><a href="technologie.html"><span class="nav-text">Veille</span></a></li>',
    '      <li><a href="contact.html"><span class="nav-text">Contact</span></a></li>',
    '      <li><a href="tp.html"><span class="nav-text">TPS</span></a></li>',
    '      <li><a href="competences.html"><span class="nav-text">Compétences</span></a></li>',
    '      <li class="dropdown">',
    '        <a href="#" class="dropbtn"><span class="nav-text">Stages</span><span class="nav-chevron"><svg class="lucide" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></a>',
    '        <div class="dropdown-content">',
    '          <a href="stages.html">Stage(2024)</a>',
    '          <a href="stage1.html">1ère Année (2026)</a>',
    '          <a href="stage2.html">2ème Année (2027)</a>',
    '        </div>',
    '      </li>',
    '    </ul>',
    '  </nav>',
    '</header>'
  ].join("\n");

  // --- Injection en tête du body ---
  document.body.insertAdjacentHTML("afterbegin", NAVBAR_HTML);
  // Marque la page : active l'espacement + masque les anciens boutons "Retour"
  document.body.classList.add("has-navbar");

  // --- Pied de page commun (centré en bas, position:fixed via style.css) ---
  var FOOTER_HTML = '<footer class="footer">2025-2027 Dautrevaux Théo Corporationn. Droits réservés et exclusifs</footer>';
  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector("footer.footer")) {
      document.body.insertAdjacentHTML("beforeend", FOOTER_HTML);
    }
  });

  var btn = document.querySelector(".hamburger");
  var nav = document.getElementById("main-nav");
  if (!btn || !nav) return;

  // --- Surligne le lien de la page courante ---
  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  nav.querySelectorAll("a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").toLowerCase();
    if (href === current) a.classList.add("active-page");
  });

  // --- Menu hamburger (ouverture / fermeture) ---
  btn.addEventListener("click", function () {
    var opened = document.body.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", opened ? "true" : "false");
    btn.classList.toggle("is-active", opened);
  });

  // Ferme le panneau au clic sur un lien — SAUF les boutons de sous-menu
  nav.querySelectorAll("a").forEach(function (a) {
    if (a.classList.contains("dropbtn")) return;
    a.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("is-active");
    });
  });

  // Fermeture avec la touche Échap
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("is-active");
      btn.focus();
    }
  });

  // Fermeture au clic à l'extérieur
  document.addEventListener("click", function (e) {
    if (!document.body.classList.contains("nav-open")) return;
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      document.body.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("is-active");
    }
  }, true);

  // --- Sous-menus en accordéon (mobile uniquement) ---
  var mobile = window.matchMedia("(max-width: 768px)");
  nav.querySelectorAll(".dropdown > .dropbtn").forEach(function (db) {
    db.addEventListener("click", function (e) {
      if (!mobile.matches) return;   // desktop = ouverture au survol
      e.preventDefault();            // pas de saut vers "#"
      var parent = db.closest(".dropdown");
      var willOpen = !parent.classList.contains("open");
      nav.querySelectorAll(".dropdown.open").forEach(function (d) {
        if (d !== parent) d.classList.remove("open");
      });
      parent.classList.toggle("open", willOpen);
    });
  });
  mobile.addEventListener("change", function (e) {
    if (!e.matches) {
      nav.querySelectorAll(".dropdown.open").forEach(function (d) {
        d.classList.remove("open");
      });
    }
  });
})();
