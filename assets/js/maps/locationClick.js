import { apiKey } from './config.js';
import { map } from './mapView.js';
import { state } from './state.js';
import { drawRoute } from './route.js';

export const greenIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  iconSize: [32, 32],
});

export const redIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
});

map.on("click", async (e) => {
  const lat = e.latlng.lat;
  const lon = e.latlng.lng;

  const res = await fetch(
    `https://api.openrouteservice.org/geocode/reverse?api_key=${apiKey}&point.lat=${lat}&point.lon=${lon}`
  );
  const data = await res.json();
  const placeName = data.features[0]?.properties.label || `${lat}, ${lon}`;

  if (!state.pickupSet) {
    if (state.pickupMarker) map.removeLayer(state.pickupMarker);
    state.pickupMarker = L.marker([lat, lon], { icon: greenIcon }).addTo(map);
    document.getElementById("pickup").value = placeName;
    state.pickupSet = true;
  } else if (!state.dropoffSet) {
    if (state.dropoffMarker) map.removeLayer(state.dropoffMarker);
    state.dropoffMarker = L.marker([lat, lon], { icon: redIcon }).addTo(map);
    document.getElementById("dropoff").value = placeName;
    state.dropoffSet = true;
  }

  if (state.pickupSet && state.dropoffSet) {
  	drawRoute();
	}
});
