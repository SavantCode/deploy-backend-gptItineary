// v2
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

if (!PIXABAY_API_KEY) {
  throw new Error('❌ Missing PIXABAY_API_KEY in .env');
}

// const searchImage = async (query) => {
//   const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=1&safesearch=true`;
//   const res = await fetch(url);
//   const data = await res.json();
//   return data?.hits?.[0]?.webformatURL || null;
// };



const searchImage = async (query) => {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3&safesearch=true`;

  const res = await fetch(url);

  if (!res.ok) {
    // Log the status and text for debugging
    const errorText = await res.text();
    console.error(`Pixabay API error (${res.status}): ${errorText}`);
    return null;  // or throw a custom error if you want
  }

  const data = await res.json();
  return data?.hits?.[0]?.webformatURL || null;
};





export const enrichWithImages = async (itinerary) => {
  for (const day of itinerary.itinerary) {
    for (const activity of day.activities) {
      if (!activity.image) {
        const img = await searchImage(`${activity.activity} in ${itinerary.destination}`);
        if (img) activity.image = img;
      }
    }
  }
  return itinerary;
};











// v1
// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// dotenv.config();

// const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// if (!PIXABAY_API_KEY) {
//   throw new Error("Missing PIXABAY_API_KEY in .env file");
// }

// // Search for an image using Pixabay
// const searchImage = async (query) => {
//   const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=1&safesearch=true`;
//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     return data?.hits?.[0]?.webformatURL || null;
//   } catch (err) {
//     console.error(`Error fetching image for "${query}":`, err);
//     return null;
//   }
// };

// // Enrich itinerary with images
// export const enrichWithImages = async (itinerary) => {
//   const imageCache = new Map();

//   for (const day of itinerary.itinerary) {
//     for (const activity of day.activities) {
//       if (!activity.image) {
//         const query = `${activity.activity} in ${itinerary.destination}`;

//         // Use cache if available
//         if (imageCache.has(query)) {
//           activity.image = imageCache.get(query);
//           continue;
//         }

//         const img = await searchImage(query);
//         const imageUrl = img || 'https://via.placeholder.com/600x400?text=No+Image+Available';

//         activity.image = imageUrl;
//         imageCache.set(query, imageUrl);
//       }
//     }
//   }

//   return itinerary;
// };
