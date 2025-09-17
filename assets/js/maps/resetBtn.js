import { map } from './mapView.js';
import { state } from './state.js';
import { removeRoute } from './route.js';

document.getElementById("resetPickup").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("pickup").value = "";
  if (state.pickupMarker) map.removeLayer(state.pickupMarker);
  state.pickupMarker = null;
  state.pickupSet = false;
  removeRoute(); // remove route if pickup is cleared
});

document.getElementById("resetDropoff").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("dropoff").value = "";
  if (state.dropoffMarker) map.removeLayer(state.dropoffMarker);
  state.dropoffMarker = null;
  state.dropoffSet = false;
  removeRoute(); // remove route if dropoff is cleared
});
