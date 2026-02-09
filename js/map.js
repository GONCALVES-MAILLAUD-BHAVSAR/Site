// Initialisation de la carte
const map = L.map('map').setView([46.5, 2.5], 6);

// Fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Charger les sites depuis le fichier JSON
fetch('data/sites.json')
  .then(response => response.json())
  .then(sites => {
    sites.forEach(site => {
      L.marker([site.lat, site.lng])
        .addTo(map)
        .bindPopup(`
          <strong>${site.nom}</strong><br>
          ${site.description}
        `);
    });
  })
  .catch(error => {
    console.error("Erreur lors du chargement des sites :", error);
  });
