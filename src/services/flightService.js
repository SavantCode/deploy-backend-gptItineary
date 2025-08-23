import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'http://api.aviationstack.com/v1/flights';
const API_KEY = process.env.AVIATIONSTACK_API_KEY;

if (!API_KEY) {
  throw new Error('Missing AVIATIONSTACK_API_KEY in environment variables.');
}

const cityToIATA = {
  'Copenhagen (DK)': 'CPH',
  'Barcelona (ES)': 'BCN',
  'Paris (FR)': 'CDG',
  'Rome (IT)': 'FCO',
};

export async function getFlightSuggestions(fromCity, toCity, date) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        access_key: API_KEY,
        limit: 100,
      },
    });

    const flights = response.data.data || [];

    if (!fromCity && !toCity && !date) {
      return flights.map(f => ({
        airline: f.airline?.name,
        flightNo: f.flight?.number,
        departureTime: f.departure?.scheduled,
        arrivalTime: f.arrival?.scheduled,
        date: f.flight_date,
        fromCity: f.departure?.airport,
        toCity: f.arrival?.airport,
      }));
    }

    const originCode = cityToIATA[fromCity];
    const destCode = cityToIATA[toCity];

    if (!originCode || !destCode) {
      throw new Error('Invalid city provided. Check city name and try again.');
    }

    const filtered = flights.filter(f =>
      f.departure?.iata === originCode &&
      f.arrival?.iata === destCode &&
      f.flight_date === date &&
      ['scheduled', 'active'].includes(f.flight_status)
    );

    return filtered.map(f => ({
      airline: f.airline?.name,
      flightNo: f.flight?.number,
      departureTime: f.departure?.scheduled,
      arrivalTime: f.arrival?.scheduled,
      date: f.flight_date,
      fromCity,
      toCity,
    }));
  } catch (err) {
    console.error('Error fetching flight suggestions:', err.message);
    throw err;
  }
}

// ✅ MAIN FUNCTION TO FETCH FLIGHT BY AIRLINE NAME + FLIGHT NUMBER
export async function getFlightByNumber(airline, flightNo) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        access_key: API_KEY,
        airline_name: airline,
        flight_number: flightNo,
        limit: 1,
      },
    });

    const data = response.data;

    if (!data?.data?.length) {
      return null;
    }

    return {
      pagination: data.pagination,
      data: data.data,
    };
  } catch (err) {
    console.error('Error fetching flight by number:', err.message);
    throw err;
  }
}
