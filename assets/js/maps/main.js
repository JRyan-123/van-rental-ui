// main.js
import './config.js';
import './mapView.js';
import './locationClick.js';
import { setupAutocomplete } from './autocomplete.js';
import './resetBtn.js';
import { qoute } from './qoute.js';
qoute();
setupAutocomplete("pickup", "pickupSuggestions", "pickup");
setupAutocomplete("dropoff", "dropoffSuggestions", "dropoff");
