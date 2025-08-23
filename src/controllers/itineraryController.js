import Itinerary from '../models/Itinerary.js';
import * as flightService from '../services/flightService.js';

import { getItineraryFromGemini } from '../services/geminiService.js';
import { enrichWithImages } from '../services/imageService.js';
import { buildPrompt } from '../utils/promptBuilder.js';

import {
  validateItineraryCreate,
  validateFlightSuggest,
  validateFlightSelect,
} from '../utils/validators.js';

export const createItinerary = async (req, res, next) => {
  try {
    const { error } = validateItineraryCreate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const itinerary = new Itinerary(req.body);
    await itinerary.save();
    res.status(201).json({ success: true, message: 'Itinerary created', itinerary });
  } catch (err) {
    next(err);
  }
};

export const suggestFlights = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fromCity, toCity, date } = req.body;
    const { error } = validateFlightSuggest(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const itinerary = await Itinerary.findById(id);
    if (!itinerary) return res.status(404).json({ success: false, message: 'Itinerary not found' });

    if (date < itinerary.startDate || date > itinerary.endDate) {
      return res.status(400).json({ success: false, message: 'Flight date must be between itinerary start and end dates' });
    }

    const suggestions = await flightService.getFlightSuggestions(fromCity, toCity, date);
    if (!suggestions.length) {
      return res.status(200).json({
        success: false,
        message: 'No flights available for these dates and cities. Try adjusting your search.',
      });
    }

    res.json({ success: true, suggestions });
  } catch (err) {
    next(err);
  }
};

export const selectFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { legIndex, selectedFlight } = req.body;
    const { error } = validateFlightSelect(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const itinerary = await Itinerary.findById(id);
    if (!itinerary) return res.status(404).json({ success: false, message: 'Itinerary not found' });

    if (legIndex < 0) return res.status(400).json({ success: false, message: 'Invalid leg index' });

    if (legIndex >= itinerary.journeyLegs.length) {
      itinerary.journeyLegs.push({ modeOfTravel: 'Flight', ...selectedFlight });
    } else {
      itinerary.journeyLegs[legIndex] = { ...itinerary.journeyLegs[legIndex], ...selectedFlight };
    }

    await itinerary.save();
    res.json({ success: true, message: 'Flight selected and saved', selected: selectedFlight, itinerary });
  } catch (err) {
    next(err);
  }
};

export const getItinerary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itinerary = await Itinerary.findById(id);
    if (!itinerary) return res.status(404).json({ success: false, message: 'Itinerary not found' });
    res.json({ success: true, itinerary });
  } catch (err) {
    next(err);
  }
};

export const fetchFlightByNumber = async (req, res, next) => {
  try {
    const { airline, flightNo } = req.body;

    if (!airline || !flightNo) {
      return res.status(400).json({
        success: false,
        message: 'Airline and flight number are required',
      });
    }

    const result = await flightService.getFlightByNumber(airline, flightNo);

    if (!result) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }

    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};


/**
 * Controller to generate a travel itinerary based on frontend input format.
//  */
// export const generateItinerary = async (req, res) => {
//   try {
//     const {
//       user,
//       travelBasics,
//       food,
//       budget,
//       attractions,
//       accommodation,
//       transport,
//       travelDetails
//     } = req.body;

//     // ✅ 1. Transform frontend data to format expected by prompt builder
//     const formattedData = {
//       traveler: user?.name || "Traveler",
//       travelerType: user?.type || "Solo",
//       destination: travelBasics?.destination,
//       startDate: travelBasics?.startDate,
//       endDate: travelBasics?.endDate,
//       preferences: travelBasics?.preferences || [],
//       accommodation,
//       transport,
//       food,
//       budget,
//       attractions,
//       travelDetails
//     };

//     // ✅ 2. Build prompt and send to Gemini
//     const prompt = buildPrompt(formattedData);
//     const rawResponse = await getItineraryFromGemini(prompt);

//     // ✅ 3. Clean raw text and parse JSON
//     const cleaned = rawResponse
//       .trim()
//       .replace(/^```json/, '')
//       .replace(/```$/, '')
//       .trim();

//     let itineraryData;
//     try {
//       itineraryData = JSON.parse(cleaned);
//     } catch (parseErr) {
//       console.error('❌ Failed to parse Gemini response:', cleaned);
//       return res.status(500).json({ error: 'Invalid response format from Gemini' });
//     }

//     // ✅ 4. Enrich with image URLs
//     const enrichedItinerary = await enrichWithImages(itineraryData);

//     // ✅ 5. Send response
//     res.status(200).json(enrichedItinerary);

//   } catch (error) {
//     console.error('❌ Error generating itinerary:', error.message || error);
//     res.status(500).json({ error: 'Failed to generate itinerary' });
//   }
// };




export const generateItinerary = async (req, res) => {
  try {
    const userData = req.body;

    // 1. Get raw JSON string from Gemini
    const rawResponse = await getItineraryFromGemini(userData);
    console.log('Raw Gemini response:', rawResponse);  // <---- Add this


    // 2. Clean and parse JSON from Gemini
    const cleaned = rawResponse
      .trim()
      .replace(/^```json/, '')
      .replace(/```$/, '')
      .trim();

    let itineraryData;
    try {
      itineraryData = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('❌ Failed to parse Gemini response:', cleaned);
      return res.status(500).json({ error: 'Invalid response format from Gemini' });
    }

    console.log('Parsed Gemini response:', itineraryData);  // <---- Add this


    // 3. Validate that itinerary property exists and is an array
    if (
      !itineraryData ||
      !Array.isArray(itineraryData.itinerary)
    ) {
      console.error('❌ Invalid or missing "itinerary" array in Gemini response:', itineraryData);
      return res.status(500).json({ error: 'Gemini returned invalid itinerary format' });
    }

    // 4. Enrich itinerary with images
    const enrichedItinerary = await enrichWithImages(itineraryData);

    // 5. Return enriched itinerary
    res.status(200).json(enrichedItinerary);
  } catch (error) {
    console.error('❌ Error generating itinerary:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
};
