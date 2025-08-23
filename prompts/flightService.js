import axios from 'axios';

// const API_URL = 'http://api.aviationstack.com/v1/flights'; // Use public endpoint for free tier
const API_URL = 'https://api.aviationstack.com/v1/flights';

const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Add all relevant city codes
const cityToIATA = {
  'Dubai (UAE)': 'DXB',
  'Singapore (SG)': 'SIN',
  'New York (USA)': 'JFK',
  'London (UK)': 'LHR',
  'Copenhagen (DK)': 'CPH',
  'Barcelona (ES)': 'BCN',
};

const premiumAirlines = ['EK', 'SQ', 'QR', 'CX', 'LH']; // Used in prod

export const getFlightSuggestions = async (fromCity, toCity, date) => {
  const originCode = cityToIATA[fromCity] || fromCity.split(' ')[0];
  const destCode = cityToIATA[toCity] || toCity.split(' ')[0];

  if (!originCode || !destCode) {
    throw new Error('Invalid city codes');
  }

  const cacheKey = `${originCode}-${destCode}-${date}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() < cached.expiry) return cached.data;

  try {
    const response = await axios.get(API_URL, {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        dep_iata: originCode,
        arr_iata: destCode,
        flight_date: date,
        limit: 20,
      },
    });

    let flights = response.data.data || [];

    console.log(`🛫 Raw flights from API for ${originCode} → ${destCode} on ${date}:`);
    console.log(JSON.stringify(flights.slice(0, 3), null, 2)); // Log first 3 for debugging

    if (flights.length === 0) {
      throw new Error('No flights available for these dates and cities. Try adjusting your search.');
    }

    // DEV: Relax filters for testing (include active flights and skip premiumAirlines restriction)
    flights = flights
      .filter(flight =>
        ['scheduled', 'active'].includes(flight.flight_status) &&
        flight.departure?.scheduled &&
        flight.arrival?.scheduled
      )
      .map(flight => {
        const departureTime = flight.departure?.scheduled;
        const arrivalTime = flight.arrival?.scheduled;

        const durationMs = new Date(arrivalTime) - new Date(departureTime);
        const durationHours = Math.round((durationMs / (1000 * 60 * 60)) * 100) / 100;

        return {
          airline: flight.airline?.name,
          flightNo: flight.flight?.number,
          departureTime,
          arrivalTime,
          stops: flight.segments ? flight.segments.length - 1 : 0,
          fromCity,
          toCity,
          date,
          duration: durationHours,
        };
      });

    if (flights.length === 0) {
      throw new Error('No valid flights found after filtering. Try a broader search.');
    }

    // Sort: earliest departure first, then fewer stops
    flights.sort((a, b) => {
      const timeDiff = new Date(a.departureTime) - new Date(b.departureTime);
      return timeDiff !== 0 ? timeDiff : a.stops - b.stops;
    });

    // Limit to top 5
    flights = flights.slice(0, 5);

    // Cache result
    cache.set(cacheKey, { data: flights, expiry: Date.now() + CACHE_TTL });

    return flights;
  } catch (err) {
    console.error('❌ AviationStack API Error:', err.message);

    if (err.response?.status === 429) {
      throw new Error('Rate limit reached. Please try again later.');
    }

    if (err.response?.data?.error) {
      throw new Error(`AviationStack Error: ${err.response.data.error.message}`);
    }

    throw new Error('No flights available for these dates and cities. Try adjusting your search.');
  }
};



// // src/services/flightService.js
// import axios from 'axios';

// const API_URL = 'http://api.aviationstack.com/v1/flights';

// const cache = new Map();
// const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms

// // const cityToIATA = {
// //   'Dubai (UAE)': 'DXB',
// //   'Singapore (SG)': 'SIN',
// //   'New York (USA)': 'JFK',
// //   'London (UK)': 'LHR',
// // };

// const cityToIATA = {
//   "Dubai (UAE)": "DXB",
//   "Singapore (SG)": "SIN",
//   "New York (USA)": "JFK",
//   "London (UK)": "LHR",
//   "Copenhagen (DK)": "CPH",
//   "Barcelona (ES)": "BCN",
// };


// const premiumAirlines = ['EK', 'SQ', 'QR', 'CX', 'LH']; // Emirates, Singapore, Qatar, Cathay, Lufthansa

// export const getFlightSuggestions = async (fromCity, toCity, date) => {
//   const originCode = cityToIATA[fromCity] || fromCity.split(' ')[0];
//   const destCode = cityToIATA[toCity] || toCity.split(' ')[0];

//   if (!originCode || !destCode) throw new Error('Invalid city codes');

//   const cacheKey = `${originCode}-${destCode}-${date}`;
//   const cached = cache.get(cacheKey);
//   if (cached && Date.now() < cached.expiry) return cached.data;

//   try {
//     const response = await axios.get(API_URL, {
//       params: {
//         access_key: process.env.AVIATIONSTACK_API_KEY,
//         dep_iata: originCode,
//         arr_iata: destCode,
//         // flight_date: date, // Uncomment if supported by your plan
//         limit: 20,
//       },
//     });

//     let flights = response.data.data || [];
//     if (flights.length === 0) return [];

//     flights = flights
//       .filter(flight =>
//         flight.flight_status === 'scheduled' &&
//         premiumAirlines.includes(flight.airline?.iata)
//       )
//       .map(flight => {
//         const departureTime = flight.departure?.scheduled;
//         const arrivalTime = flight.arrival?.scheduled;

//         const durationMs = new Date(arrivalTime) - new Date(departureTime);
//         const durationHours = Math.round((durationMs / (1000 * 60 * 60)) * 100) / 100;

//         return {
//           airline: flight.airline?.name,
//           flightNo: flight.flight?.number,
//           departureTime,
//           arrivalTime,
//           stops: flight.segments ? flight.segments.length - 1 : 0,
//           fromCity,
//           toCity,
//           date,
//           duration: durationHours,
//         };
//       });

//     flights.sort((a, b) => {
//       const timeDiff = new Date(a.departureTime) - new Date(b.departureTime);
//       return timeDiff !== 0 ? timeDiff : a.stops - b.stops;
//     });

//     flights = flights.slice(0, 5);
//     cache.set(cacheKey, { data: flights, expiry: Date.now() + CACHE_TTL });

//     return flights;
//   } catch (err) {
//     console.error('AviationStack API Error:', err.message);
//     if (err.response?.status === 429) {
//       throw new Error('Rate limit reached. Please try again later.');
//     }
//     if (err.response?.data?.error) {
//       throw new Error(`AviationStack Error: ${err.response.data.error.message}`);
//     }
//     return [];
//   }
// };
