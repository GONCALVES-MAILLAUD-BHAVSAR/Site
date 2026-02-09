document.addEventListener("DOMContentLoaded", () => {
    
   console.log("IA Experte prête");

    const aiContainer = document.getElementById("archaeo-ai");
    const aiToggle = document.getElementById("ai-toggle");
    const aiForm = document.getElementById("ai-form");
    const aiInput = document.getElementById("ai-input");
    const aiMessages = document.getElementById("ai-messages");

    // --- 2. CONFIGURATION ---
    const key = "AIzaSyCgpw6fqRDA9uw3U7zIyNYyDHQZvsxjDxE";

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

    // --- 5. APPEL API DIRECT ---
    async function askGemini(question) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Tu es un expert archéologue du site de Châtelperron. Réponds de façon concise : ${question}` }] }]
            })
        });
        return await response.json();
    }

    // --- 6. GESTION DU FORMULAIRE ---
    if (aiForm) {
        aiForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const userText = aiInput.value.trim();
            if (!userText) return;

            // Message Utilisateur
            const uDiv = document.createElement("div");
            uDiv.className = "ai-message ai-user";
            uDiv.textContent = userText;
            aiMessages.appendChild(uDiv);
            aiInput.value = "";

            // Attente Bot
            const botDiv = document.createElement("div");
            botDiv.className = "ai-message ai-bot";
            botDiv.textContent = "Analyse en cours...";
            aiMessages.appendChild(botDiv);

            try {
                const data = await askGemini(userText);
                const answer = data.candidates[0].content.parts[0].text;
                typeEffect(botDiv, answer);
            } catch (err) {
                botDiv.textContent = "Erreur : Clé API invalide ou problème réseau.";
                console.error(err);
            }
        });
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
    if (window.location.pathname.includes("sources.html")) {
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
    "#contexte, #decouvertes, #debats"
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

