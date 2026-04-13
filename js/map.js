// 🧠 INIT CARTE
var map = L.map('map').setView([46.5, 2.5], 6);

// 🗺️ FOND DE CARTE
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// 🎨 COULEURS PAR TYPE
function getColor(type) {
  return type === "chatelperronien" ? "red" :
         type === "neandertal" ? "blue" :
         type === "Châtelperron" ? "gold" :
         "green";
         
}

// 📍 DONNÉES DES SITES
var sites = [

  {
    name: "Châtelperron",
    coords: [46.33, 3.63],
    type: "Châtelperron",
    desc: "<strong>Importance :</strong> Site éponyme du Châtelperronien.<br><strong>Rôle carte :</strong> Marque le début de l'énigme des industries de transition.<br><strong>Interprétation :</strong> Illustre le débat sur la capacité de Néandertal à innover seul ou par imitation de Sapiens."
  },

  {
    name: "Grotte du Renne",
    coords: [47.6, 3.75],
    type: "chatelperronien",
    desc: "<strong>Importance :</strong> Présence de parures et d'os travaillés.<br><strong>Rôle carte :</strong> Point de preuve majeur pour la cognition néandertalienne.<br><strong>Lien :</strong> Soutient l'hypothèse d'une 'modernité' culturelle propre aux derniers Néandertaliens."
  },

  {
    name: "Roc-de-Combe",
    coords: [44.75, 1.45],
    type: "chatelperronien",
    desc: "<strong>Importance :</strong> Célèbre pour ses interstratifications supposées.<br><strong>Rôle carte :</strong> Illustre la complexité des fouilles et les erreurs d'interprétation passées.<br><strong>Lien :</strong> Longtemps utilisé pour prouver une cohabitation alternée entre Néandertal et Sapiens."
  },

  {
    name: "Le Piage",
    coords: [44.7, 1.4],
    type: "chatelperronien",
    desc: "<strong>Importance :</strong> Séquence stratigraphique très débattue.<br><strong>Rôle carte :</strong> Témoin des méthodes d'analyse modernes (tapho-chronologie).<br><strong>Interprétation :</strong> Aide à comprendre si les cultures se sont mélangées naturellement ou par l'action humaine."
  },

  {
    name: "La Ferrassie",
    coords: [44.95, 1.0],
    type: "neandertal",
    desc: "<strong>Importance :</strong> Nécropole néandertalienne majeure.<br><strong>Rôle carte :</strong> Point de référence pour le monde néandertalien 'classique'.<br><strong>Lien :</strong> Permet de comparer les comportements funéraires avant l'arrivée massive de Sapiens."
  },

  {
    name: "Saint-Césaire",
    coords: [45.75, -0.5],
    type: "neandertal",
    desc: "<strong>Importance :</strong> Découverte d'un Néandertal associé à du Châtelperronien.<br><strong>Rôle carte :</strong> Preuve biologique irréfutable.<br><strong>Lien :</strong> Relie physiquement l'espèce Néandertal aux industries dites 'de transition'."
  },

  {
    name: "Abri Pataud",
    coords: [44.94, 1.01],
    type: "sapiens",
    desc: "<strong>Importance :</strong> Chronologie ultra-précise de l'Aurignacien.<br><strong>Rôle carte :</strong> Le 'chronomètre' de la carte.<br><strong>Lien :</strong> Documente le remplacement définitif des industries néandertaliennes par celles de Sapiens."
  },

  {
    name: "Aurignac",
    coords: [43.2, 0.88],
    type: "sapiens",
    desc: "<strong>Importance :</strong> Site éponyme de l'Aurignacien (Homo sapiens).<br><strong>Rôle carte :</strong> Marque la rupture technologique (os, art, parure).<br><strong>Interprétation :</strong> Représente l'arrivée de la modernité culturelle 'standardisée' en Europe."
  }

];

// 📍 AJOUT DES MARQUEURS
sites.forEach(site => {
  L.circleMarker(site.coords, {
    radius: 8,
    color: getColor(site.type),
    fillOpacity: 0.8
  })
  .addTo(map)
  .bindPopup(`
    <strong>${site.name}</strong><br>
    ${site.desc}
  `);
});