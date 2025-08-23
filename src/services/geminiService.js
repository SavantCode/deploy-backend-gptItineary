import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { buildPrompt } from '../utils/promptBuilder.js'; // ✅ Add `.js` extension for ES modules

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('❌ Missing GEMINI_API_KEY in .env');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Builds and sends a prompt to Gemini using user travel data.
 * Returns raw JSON string (to be parsed by controller).
 */
export async function getItineraryFromGemini(userData) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = buildPrompt(userData);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error('❌ Gemini API error:', error.message || error);
    throw new Error('Failed to get itinerary from Gemini');
  }
}


// //v2
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';
// import { buildPrompt } from '../utils/promptBuilder'; // adjust path if needed

// dotenv.config();

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// if (!GEMINI_API_KEY) {
//   throw new Error('❌ Missing GEMINI_API_KEY in .env');
// }

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// /**
//  * Builds and sends a prompt to Gemini using user travel data.
//  * Returns raw JSON string (to be parsed by controller).
//  */
// export async function getItineraryFromGemini(userData) {
//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     const prompt = buildPrompt(userData);
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = await response.text();

//     return text;
//   } catch (error) {
//     console.error('❌ Gemini API error:', error.message || error);
//     throw new Error('Failed to get itinerary from Gemini');
//   }
// }


// //v1
// // import { GoogleGenerativeAI } from '@google/generative-ai';
// // import dotenv from 'dotenv';

// // dotenv.config();

// // const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// // if (!GEMINI_API_KEY) {
// //   throw new Error('Missing GEMINI_API_KEY in .env');
// // }

// // const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// // export async function getItineraryFromGemini(promptText) {
// //   try {
// //     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// //     const result = await model.generateContent(promptText);
// //     const response = await result.response;
// //     const text = await response.text();

// //     return text;
// //   } catch (error) {
// //     console.error('Error calling Gemini API:', error.message || error);
// //     throw new Error('Failed to generate itinerary from Gemini');
// //   }
// // }
