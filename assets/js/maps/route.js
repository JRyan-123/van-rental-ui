// route.js
import { apiKey } from './config.js';
import { map } from './mapView.js';
import { state } from './state.js';

export let routeLayer = null; // store the drawn route

export async function drawRoute() {
  if (!state.pickupSet || !state.dropoffSet) return;

  const start = state.pickupMarker.getLatLng();
  const end = state.dropoffMarker.getLatLng();

  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const coords = data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);

    if (routeLayer) {
      map.removeLayer(routeLayer); // remove old route
    }
    routeLayer = L.polyline(coords, { color: 'blue', weight: 4 }).addTo(map);

    // Optional: display distance
    const distanceKm = (data.features[0].properties.summary.distance / 1000).toFixed(2);
    document.getElementById('distanceDisplay').value = distanceKm;

  } catch (err) {
    console.error("Error fetching route:", err);
  }
}

export function removeRoute() {
  if (routeLayer) {
    map.removeLayer(routeLayer);
    routeLayer = null;
  }
}
