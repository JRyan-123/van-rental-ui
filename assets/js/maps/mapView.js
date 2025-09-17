// mapView.js
export const map = L.map("map").setView([14.4995, 121.0542], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; '
}).addTo(map);
