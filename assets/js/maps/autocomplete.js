import { apiKey } from './config.js';
import { map } from './mapView.js';
import { greenIcon, redIcon } from './locationClick.js';
import { state } from './state.js';
import { drawRoute } from './route.js';

export function setupAutocomplete(inputId, suggestionsId, type) {
  const input = document.getElementById(inputId);
  const suggestionsBox = document.getElementById(suggestionsId);
  let debounceTimer;

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const query = input.value.trim();

    if (!query) {
      suggestionsBox.classList.add("d-none");
      return;
    }

    debounceTimer = setTimeout(async () => {
      const res = await fetch(
        `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(query)}&boundary.country=PH`
      );
      const data = await res.json();
      suggestionsBox.innerHTML = "";

      data.features.forEach(f => {
        const div = document.createElement("div");
        div.textContent = f.properties.label;

        div.onclick = () => {
          input.value = f.properties.label;
          const coords = f.geometry.coordinates;

          if (type === "pickup") {
            if (state.pickupMarker) map.removeLayer(state.pickupMarker);
            state.pickupMarker = L.marker([coords[1], coords[0]], { icon: greenIcon }).addTo(map);
            state.pickupSet = true;
          } else {
            if (state.dropoffMarker) map.removeLayer(state.dropoffMarker);
            state.dropoffMarker = L.marker([coords[1], coords[0]], { icon: redIcon }).addTo(map);
            state.dropoffSet = true;
          }
           if (state.pickupSet && state.dropoffSet) {
            drawRoute();
          }
          map.setView([coords[1], coords[0]], 14);
          suggestionsBox.classList.add("d-none");
        };


        suggestionsBox.appendChild(div);
      });

      suggestionsBox.classList.remove("d-none");
    }, 1000); // debounce 1s
  });
}
