export const buildPrompt = (data) => {
  // Adjusted destructuring for your frontend input
  const traveler = data.user?.name || "Traveler";
  const travelerType = data.user?.type || "Solo";
  const destination = data.travelBasics?.destination || "Unknown Destination";
  const startDate = data.travelBasics?.startDate;
  const endDate = data.travelBasics?.endDate;

  if (!startDate || !endDate) {
    throw new Error("Missing startDate or endDate in travelBasics");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  const romanticNote =
    travelerType.toLowerCase() === "couple"
      ? "- Use a romantic, personal, and exciting tone in the descriptions.\n"
      : "";

  return `
You are an expert travel planner. Create a detailed and realistic ${days}-day travel itinerary for the following traveler:

${JSON.stringify(
    {
      traveler,
      destination,
      startDate,
      endDate,
      tripDuration: `${days} Days`,
    },
    null,
    2
  )}

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

${romanticNote}

JSON Format Example:

{
  "traveler": "Traveler Name",
  "destination": "City",
  "tripDuration": "X Days",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "summary": "Brief overview of the day's theme",
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
