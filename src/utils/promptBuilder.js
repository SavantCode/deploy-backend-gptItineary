export const buildPrompt = (data) => {
const {
traveler = "Traveler",
travelerType = "solo",
travelBasics,
tripOverviewDetails
} = data;

const {
from,
to,
startDate,
endDate,
totalTravelers,
totalDays
} = travelBasics || {};

if (!from || !to || !startDate || !endDate) {
throw new Error("Missing required travelBasics fields: from, to, startDate, or endDate.");
}

const romanticNote = travelerType.toLowerCase() === "couple"
? "- Use a romantic, personal, and exciting tone in the descriptions.\n"
: "";

const overviewNote = tripOverviewDetails
? `- Traveler has shared the following preferences and interests:\n "${tripOverviewDetails.trim()}"\n`
: "";

return `
You are a travel planning expert. Create a detailed ${totalDays}-day itinerary for the traveler:

${JSON.stringify({
traveler,
travelerType,
from,
to,
startDate,
endDate,
totalTravelers,
tripDuration: `${totalDays} Days`
}, null, 2)}

Guidelines:
${romanticNote}${overviewNote}

Requirements:
- Output **only valid JSON**. Do not include any extra text or markdown.
- Each day should include:
- A **day title** and a **summary** of the day
- **8 to 12 activities**, spaced from **6:00 AM to 10:00 PM**
- An appropriate mix of sightseeing, meals, transport, culture, rest, and unique local experiences
- Each activity must have:
- A **start time**
- An **activity title**
- A **detailed description**
- Activities should be spaced realistically (1–2 hours each).
- Include rest/sleep hours (10:00 PM to 6:00 AM).
- Ensure a balanced schedule without overwhelming the traveler.
- Highlight both famous landmarks and lesser-known local gems.
- If meals are included, be specific (e.g., "Breakfast at Café X", "Dinner at rooftop restaurant").
- If relevant, suggest surprise or hidden experiences for added excitement.

Format example:
{
"traveler": "Mark",
"from": { "country": "Japan", "city": "Tokyo" },
"to": { "country": "Japan", "city": "Kyoto" },
"tripDuration": "7 Days",
"startDate": "2025-10-01",
"endDate": "2025-10-07",
"itinerary": [
{
"day": 1,
"title": "Day Title",
"summary": "Brief overview",
"activities": [
{
"time": "6:00 AM",
"activity": "Activity name",
"details": "Detailed description of the experience."
}
]
}
]
}
Respond only with properly formatted JSON.
`.trim();
};