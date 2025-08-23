import express from 'express';
import {
  createItinerary,
  suggestFlights,
  selectFlight,
  getItinerary,
  fetchFlightByNumber,
  generateItinerary
} from '../controllers/itineraryController.js';


const router = express.Router();

router.post('/itineraries', createItinerary);
router.post('/itineraries/:id/suggest-flights', suggestFlights);
router.post('/itineraries/:id/select-flight', selectFlight);
router.post('/flights/search', fetchFlightByNumber);
router.get('/itineraries/:id', getItinerary);

// gemini
router.post('/generate', generateItinerary);


export default router;
