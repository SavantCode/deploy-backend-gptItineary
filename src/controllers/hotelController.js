import hotels from '../data/hotels.js';

export const getAllHotels = (req, res) => {
  try {
    const { country, city } = req.query;

    let filteredHotels = hotels;

    if (country) {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.location.country.toLowerCase() === country.toLowerCase()
      );
    }

    if (city) {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.location.city.toLowerCase() === city.toLowerCase()
      );
    }

    res.json(filteredHotels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};
