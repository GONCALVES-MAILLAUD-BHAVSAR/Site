document.addEventListener("DOMContentLoaded", () => {
    
   console.log("IA Experte prête");

    const aiContainer = document.getElementById("archaeo-ai");
    const aiToggle = document.getElementById("ai-toggle");
    const aiForm = document.getElementById("ai-form");
    const aiInput = document.getElementById("ai-input");
    const aiMessages = document.getElementById("ai-messages");

    // --- 3. OUVERTURE (CORRIGÉE) ---
    if (aiToggle && aiContainer) {
        aiToggle.onclick = (e) => {
            e.preventDefault();
            aiContainer.classList.toggle("open");
        };
    }

    // --- 4. LOGIQUE D'ENVOI ---
    if (aiForm) {
        aiForm.onsubmit = async (e) => {
            e.preventDefault();
            const prompt = aiInput.value.trim();
            if (!prompt) return;

            // Affichage utilisateur
            const uDiv = document.createElement("div");
            uDiv.className = "ai-message ai-user";
            uDiv.textContent = prompt;
            aiMessages.appendChild(uDiv);
            aiInput.value = "";

            // Bulle d'attente
            const botDiv = document.createElement("div");
            botDiv.className = "ai-message ai-bot";
            botDiv.textContent = "Analyse des strates...";
            aiMessages.appendChild(botDiv);

            try {
                // APPEL DIRECT À GOOGLE (On ne passe plus par /api/chat)
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: "Réponds comme un archéologue expert : " + prompt }] }]
                    })
                });

                const data = await response.json();

                // --- VÉRIFICATION DE LA RÉPONSE ---
                if (data.candidates && data.candidates[0]) {
                    botDiv.textContent = data.candidates[0].content.parts[0].text;
                } else if (data.error) {
                    botDiv.textContent = "Erreur Google : " + data.error.message;
                } else {
                    botDiv.textContent = "L'expert est perplexe devant cette demande.";
                }

            } catch (err) {
                botDiv.textContent = "Connexion impossible avec le laboratoire.";
                console.error(err);
            }
            aiMessages.scrollTop = aiMessages.scrollHeight;
        };
    }

    const ARCHEO_KNOWLEDGE = {
    "auteur": "Le Châtelperronien est traditionnellement attribué à Néandertal, notamment suite aux découvertes de Saint-Césaire et d'Arcy-sur-Cure. C'est une culture de transition fascinante !",
    "pointe": "La pointe de Châtelperron est un couteau à dos courbe, obtenu par une retouche abrupte. C'est le fossile directeur de cette culture.",
    "couche": "La stratigraphie de la Grotte des Fées a été très critiquée. On a longtemps cru à une interstratification (mélange) entre Aurignacien et Châtelperronien, mais il s'agissait probablement de remaniements lors des fouilles anciennes.",
    "strate": "La stratigraphie de la Grotte des Fées a été très critiquée. On a longtemps cru à une interstratification (mélange) entre Aurignacien et Châtelperronien, mais il s'agissait probablement de remaniements lors des fouilles anciennes.",
    "neandertal": "Néandertal est l'artisan probable de cette industrie. Cela prouve qu'il possédait des capacités cognitives complexes et une forme de modernité comportementale.",
    "date": "Le Châtelperronien se situe environ entre -45 000 et -40 000 ans avant notre ère, au tout début du Paléolithique supérieur.",
    "default": "En tant qu'expert de Châtelperron, cette question mérite une analyse plus approfondie dans les archives. Pouvez-vous préciser votre pensée (pointe, auteur, stratigraphie) ?"
};

function simulateAIResponse(question) {
    const q = question.toLowerCase();
    
    // Logique de détection de mots-clés
    if (q.includes("auteur") || q.includes("qui")) return ARCHEO_KNOWLEDGE.auteur;
    if (q.includes("pointe") || q.includes("objet") || q.includes("outil")) return ARCHEO_KNOWLEDGE.pointe;
    if (q.includes("couche") || q.includes("mélange") || q.includes("strate") || q.includes("stratigraphie")) return ARCHEO_KNOWLEDGE.strate;
    if (q.includes("néandertal") || q.includes("homo")) return ARCHEO_KNOWLEDGE.neandertal;
    if (q.includes("date") || q.includes("quand") || q.includes("époque")) return ARCHEO_KNOWLEDGE.date;
    
    return ARCHEO_KNOWLEDGE.default;
}

    // --- 6. GESTION DU FORMULAIRE ---
    if (aiForm) {
    aiForm.onsubmit = (e) => {
        e.preventDefault();
        const prompt = aiInput.value.trim();
        if (!prompt) return;

        // 1. Affichage message utilisateur
        const uDiv = document.createElement("div");
        uDiv.className = "ai-message ai-user";
        uDiv.textContent = prompt;
        aiMessages.appendChild(uDiv);
        aiInput.value = "";

        // 2. Création de la bulle de réponse "En attente"
        const botDiv = document.createElement("div");
        botDiv.className = "ai-message ai-bot";
        botDiv.textContent = "..."; // Petit suspense
        aiMessages.appendChild(botDiv);

        // 3. Simulation du temps de réflexion (800ms)
        setTimeout(() => {
            const response = simulateAIResponse(prompt);
            botDiv.textContent = response;
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }, 800);

        aiMessages.scrollTop = aiMessages.scrollHeight;
    };
}

    // Suggestions
    window.askAI = (q) => {
        aiInput.value = q;
        aiForm.dispatchEvent(new Event('submit'));
    };
});

    // --- 2. PROFILS AUTEURS (ABOUT.HTML) ---
    const wrappers = document.querySelectorAll('.author-wrapper');
    wrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            wrappers.forEach(other => { if (other !== wrapper) other.classList.remove('active'); });
            this.classList.toggle('active');
        });
    });


    // --- 3. SLIDER CHRONOLOGIQUE (INDEX.HTML) ---
    const track = document.querySelector(".timeline-track");
    const slides = document.querySelectorAll(".timeline-slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    let index = 0;

    if (track && slides.length && nextBtn && prevBtn) {
        const updateTimeline = () => { track.style.transform = `translateX(-${index * 100}%)`; };
        nextBtn.addEventListener("click", () => { index = (index + 1) % slides.length; updateTimeline(); });
        prevBtn.addEventListener("click", () => { index = (index - 1 + slides.length) % slides.length; updateTimeline(); });
    }


    // --- 4. TRANSITION AVALANCHE (SOURCES.HTML) ---
    if (window.location.pathname.includes("miniarcheo.html")) {
        const overlay = document.getElementById("page-transition-overlay");
        if (overlay) {
            for (let i = 0; i < 60; i++) {
                const bone = document.createElement("div");
                bone.className = "avalanche-bone";
                bone.textContent = "🦴";
                bone.style.left = Math.random() * 100 + "vw";
                bone.style.animationDelay = Math.random() * 1.5 + "s";
                bone.style.fontSize = (Math.random() * 2 + 1.5) + "rem";
                overlay.appendChild(bone);
            }
            setTimeout(() => { document.body.classList.add("shaking"); }, 600);
            setTimeout(() => {
                overlay.classList.add("transition-hidden");
                document.body.classList.remove("shaking");
                setTimeout(() => overlay.remove(), 800);
            }, 2500);
        }
    }

    // if (window.location.pathname.includes("miniarchéo.html")) {
       


    // --- 5. LOGIQUE DES ÉTAPES (RECHERCHE.HTML) ---
    window.toggleStep = function (step) {
        if (step.classList.contains("active")) {
            step.classList.remove("active");
            return;
        }
        const rect = step.getBoundingClientRect();
        const stepId = step.querySelector('.step-number').textContent.trim();
        const projectile = document.createElement("div");
        projectile.className = "falling-bone";
        projectile.textContent = stepId === "01" ? "🦴" : stepId === "02" ? "🪨" : "🧭";
        projectile.style.left = (rect.right - 40) + "px";
        projectile.style.setProperty('--collision-y', rect.top + 'px');
        document.body.appendChild(projectile);

        setTimeout(() => {
            step.classList.add("active");
            setTimeout(() => projectile.remove(), 1000);
        }, 450);
    };

    // --- 6. INTERACTION ARTEFACT (SYNTHESE.HTML) ---
    const artifactSlider = document.getElementById("retouchLevel");
    if (artifactSlider) {
        const caption = document.getElementById("artifact-caption");
        artifactSlider.addEventListener("input", () => {
            const val = artifactSlider.value;
            document.querySelectorAll(".retouche-early, .retouche-mid, .retouche-final").forEach(p => p.style.opacity = "0");
            if (val >= "1") caption.textContent = "Ébauche : lame brute.";
            if (val >= "2") { 
                document.querySelectorAll(".retouche-early").forEach(p => p.style.opacity = "1");
                caption.textContent = "Début de la retouche.";
            }
            if (val === "3") {
                document.querySelectorAll(".retouche-mid, .retouche-final").forEach(p => p.style.opacity = "1");
                caption.textContent = "Pointe de Châtelperron terminée.";
            }
        });
    }
    window.toggleStep = function (step) {
  // 1. GESTION DE LA FERMETURE
  if (step.classList.contains("active")) {
    step.classList.remove("active");
    // On s'assure d'enlever le trait doré s'il est resté
    step.classList.remove("impact"); 
    return;
  }

  const rect = step.getBoundingClientRect();
  const stepId = step.querySelector('.step-number').textContent.trim();
  
  // 2. CRÉATION DU PROJECTILE
  const projectile = document.createElement("div");
  projectile.className = "falling-bone";

  if (stepId === "01") {
    projectile.textContent = "🦴";
  } else if (stepId === "02") {
    projectile.textContent = "🪨";
  } else if (stepId === "03") {
    projectile.textContent = "🧭"; 
  }

  const startX = rect.right - 40;
  projectile.style.left = startX + "px";

  // Configuration des trajectoires
  let xDest = 100; 
  if (stepId === "01") xDest = 250; 
  if (stepId === "02") xDest = 0;   
  if (stepId === "03") xDest = -150;

  projectile.style.setProperty('--collision-y', rect.top + 'px');
  projectile.style.setProperty('--x-dest', xDest + 'px');
  projectile.style.animation = "boneTrajectory 1.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards";
  
  document.body.appendChild(projectile);

  // 3. GESTION DE L'IMPACT (Synchronisation)
  setTimeout(() => {
    // On ajoute l'impact (trait doré) et on ouvre le texte
    step.classList.add("impact");
    step.classList.add("active"); 

    // Explosion de poussière
    for (let i = 0; i < 10; i++) {
      createDust(startX, rect.top);
    }

    // --- CORRECTION : On retire le trait doré après 500ms ---
    setTimeout(() => {
      step.classList.remove("impact");
    }, 500);

  }, 450);

  // Nettoyage du projectile
  setTimeout(() => projectile.remove(), 1600);
};

// Fonction de poussière avec nettoyage automatique strict
function createDust(x, y) {
  const dust = document.createElement("div");
  dust.className = "dust";
  dust.style.left = x + "px";
  dust.style.top = y + "px";
  
  dust.style.setProperty('--dx', (Math.random() * 120 - 40) + 'px');
  dust.style.setProperty('--dy', (Math.random() * -100 - 20) + 'px');
  
  document.body.appendChild(dust);

  // Suppression impérative de l'élément après l'animation
  dust.addEventListener('animationend', () => {
    dust.remove();
  });
}
  let iconTimeout;

  const sections = document.querySelectorAll(
     "#Mini-archéo"
  );

  sections.forEach(section => {
    section.addEventListener("mousemove", () => {
      const icons = section.querySelectorAll(".section-icon, .bone");

      icons.forEach(icon => icon.classList.add("animate"));

      clearTimeout(iconTimeout);

      iconTimeout = setTimeout(() => {
        icons.forEach(icon => icon.classList.remove("animate"));
      }, 400);
    });
  });

if (window.location.pathname.includes("carte.html")) {
    const mapOverlay = document.getElementById("map-transition-overlay");
    const scanText = document.querySelector(".scan-text");

    if (mapOverlay) {
        // Animation du texte
        setTimeout(() => { if(scanText) scanText.textContent = "Chargement des coordonnées GPS..."; }, 800);
        setTimeout(() => { if(scanText) scanText.textContent = "Localisation des sites néandertaliens..."; }, 1600);

        // DISPARITION DE L'ÉCRAN NOIR
        setTimeout(() => {
            mapOverlay.classList.add("hidden-transition"); // Lance le fondu CSS
            
            // On retire physiquement l'élément après le fondu pour libérer la carte
            setTimeout(() => {
                mapOverlay.style.display = "none";
            }, 800); 
        }, 2500);
    }
}

// Dans js/slider.js (ou à la fin de ton fichier)

document.addEventListener("DOMContentLoaded", () => {
  const scrubber = document.getElementById("soundwave-scrubber");
  const progressLine = scrubber.querySelector(".soundwave-progress");
  const handle = scrubber.querySelector(".soundwave-handle");
  const flintFinished = document.querySelector(".flint-finished");
  const caption = document.getElementById("artifact-caption");

  if (!scrubber || !flintFinished) return;

  function updateArtifact(e) {
    // 1. Calculer la position relative de la souris sur la ligne (0 à 1)
    const rect = scrubber.getBoundingClientRect();
    let x = e.clientX - rect.left; // Position X de la souris dans l'élément
    let offsetX = Math.max(0, Math.min(x, rect.width)); // Contenir entre 0 et la largeur
    let percentage = offsetX / rect.width;

    // 2. Mettre à jour l'onde sonore (UI)
    const percentageDisplay = percentage * 100;
    progressLine.style.width = `${percentageDisplay}%`;
    handle.style.left = `${percentageDisplay}%`;

    // 3. Mettre à jour l'artéfact (Masquage de la retouche)
    // Nous inversons la valeur pour le 'inset' : 100% caché à 0% caché
    const maskPercentage = 100 - (percentage * 100);
    flintFinished.style.clipPath = `inset(0 0 ${maskPercentage}% 0)`;

    // 4. Mettre à jour la légende selon l'avancement
    if (percentage < 0.1) {
      caption.textContent = "Lame brute : le point de départ.";
    } else if (percentage < 0.8) {
      caption.textContent = "Taille en cours : la retouche abrupte forme le dos courbe.";
    } else {
      caption.textContent = "Pointe de Châtelperron terminée : un outil prêt à l'emploi.";
    }
  }

  // Écouter le mouvement de la souris sur toute la zone de l'onde
  scrubber.addEventListener("mousemove", updateArtifact);

  // Optionnel : Gérer le 'click' pour sauter directement à un point
  scrubber.addEventListener("click", updateArtifact);

  // Initialisation à 0
  updateArtifact({ clientX: scrubber.getBoundingClientRect().left });
});

// Dans slider.js, remplace ou complète la logique du scrubber
if (scrubber) {
    // Fonction commune pour la souris et le toucher
    const handleInteraction = (clientX) => {
        const rect = scrubber.getBoundingClientRect();
        let x = clientX - rect.left;
        let percent = Math.min(Math.max(x / rect.width, 0), 1);
        
        progress.style.width = (percent * 100) + "%";
        handle.style.left = (percent * 100) + "%";
        finishedFlint.style.clipPath = `inset(0 0 ${100 - (percent * 100)}% 0)`;
    };

    // Événement Souris
    scrubber.addEventListener("mousemove", (e) => handleInteraction(e.clientX));

    // Événement Tactile (Doigt)
    scrubber.addEventListener("touchmove", (e) => {
        // e.touches[0] récupère la position du premier doigt
        handleInteraction(e.touches[0].clientX);
    }, { passive: true }); // passive: true améliore la fluidité du scroll
}



// ================= MENU MOBILE =================
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const menu = document.querySelector(".menu");

  if (!menuBtn || !menu) {
    console.error("Menu ou bouton introuvable");
    return;
  }

  menuBtn.addEventListener("click", function () {
    menu.classList.toggle("active");

    // Animation icône
    const icon = this.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  });

  // Fermer menu quand on clique sur un lien
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");

      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  });
});