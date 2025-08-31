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

- Output **only valid JSON**. Do not include any extra text or markdown.
- Use the format shown below.
- Each day must include:
  - A **day title**
  - A **summary** of the sightseeing focus
  - **8 to 12 activities** from **6:00 AM to 10:00 PM**
  - Each activity must include:
    - A **start time**
    - An **activity name** (only tourist attraction / destination)
    - A **description** focused only on what the traveler will see or explore at that location
- No meals, transport, lodging, shopping, or personal events
- No sleep or rest hours
- Emphasize **famous landmarks** and **hidden gems**

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
          "details": "Detailed description of the tourist place or landmark."
        }
      ]
    }
  ]
}
Respond only with properly formatted JSON.
`.trim();
};
