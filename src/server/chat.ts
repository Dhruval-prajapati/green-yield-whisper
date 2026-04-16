import { createServerFn } from "@tanstack/react-start";

// keyword responses — works surprisingly well for farming questions
const responses: Record<string, string> = {
  "summer crop": "For summer, try watermelon, muskmelon, cucumber, okra, or bitter gourd. They love the heat.",
  "winter crop": "Winter's great for wheat, mustard, peas, chickpea (chana), and cauliflower.",
  fertilizer: "Use NPK 10-26-26 for flowering crops. For leafy veggies, nitrogen-rich urea works well. Always soil-test first!",
  organic: "Organic tips: vermicompost, neem cake for pests, and crop rotation to keep soil healthy.",
  irrigation: "Drip irrigation saves up to 60% water vs flood irrigation. Sprinklers work well for large fields.",
  pest: "Natural pest control: neem oil spray, ladybugs, pheromone traps. And rotate your crops each season.",
  soil: "Get a soil test at your nearest Krishi Vigyan Kendra. They'll tell you pH, nutrients, everything.",
  loan: "Check PM-KISAN for income support. For crop loans, try SBI's Kisan Credit Card or your local co-op bank.",
  weather: "Use the IMD app for accurate forecasts. Plan sowing 2-3 days after predicted rainfall.",
  market: "Check eNAM for real-time mandi prices. Helps you sell at the best rate instead of getting lowballed.",
};

export const chatWithBot = createServerFn({ method: "POST" })
  .inputValidator((input: { message: string }) => input)
  .handler(async ({ data }) => {
    const lower = data.message.toLowerCase();

    // keyword matching
    for (const [key, val] of Object.entries(responses)) {
      if (lower.includes(key)) return { reply: val };
    }

    // loose matches
    if (lower.includes("crop") && lower.includes("best")) return { reply: responses["summer crop"] };
    if (lower.includes("price") || lower.includes("mandi")) return { reply: responses["market"] };
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("help"))
      return { reply: "Hello! 👋 I'm AgroBot. Ask me anything about farming — crops, fertilizer, irrigation, you name it." };

    return { reply: "Hmm, I'm not sure about that one. Try asking about crops, soil, fertilizers, irrigation, or government schemes!" };
  });
