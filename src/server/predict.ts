import { createServerFn } from "@tanstack/react-start";

// soil-crop compatibility map
const goodCombos: Record<string, string[]> = {
  Alluvial: ["Rice", "Wheat", "Sugarcane", "Maize"],
  "Black (Regur)": ["Cotton", "Soybean", "Sugarcane"],
  Red: ["Groundnut", "Mustard", "Tomato"],
  Loamy: ["Wheat", "Tomato", "Onion", "Maize"],
  Sandy: ["Groundnut", "Mustard"],
  Clay: ["Rice", "Sugarcane"],
  Laterite: ["Rice", "Onion"],
};

export const predictCrop = createServerFn({ method: "POST" })
  .inputValidator((input: { temp: number; rain: number; humidity: number; soil: string; crop: string }) => input)
  .handler(async ({ data }) => {
    const { temp, rain, humidity, soil, crop } = data;
    let score = 50;

    // temp scoring
    if (temp >= 20 && temp <= 35) score += 15;
    else if (temp >= 10 && temp < 20) score += 5;
    else score -= 10;

    // rainfall
    if (rain >= 50 && rain <= 200) score += 15;
    else if (rain >= 200 && rain <= 300) score += 5;
    else if (rain < 30) score -= 15;

    // humidity
    if (humidity >= 40 && humidity <= 70) score += 10;
    else if (humidity > 85) score -= 5;

    // soil+crop combo bonus
    if (goodCombos[soil]?.includes(crop)) score += 15;

    score = Math.max(0, Math.min(100, score));

    let level: string, msg: string;
    if (score >= 80) {
      level = "Excellent";
      msg = `High yield expected for ${crop}. Conditions look great!`;
    } else if (score >= 60) {
      level = "Good";
      msg = `Good conditions for ${crop}. Minor tweaks could help.`;
    } else if (score >= 40) {
      level = "Moderate";
      msg = `Moderate risk for ${crop}. Consider irrigation and soil amendments.`;
    } else {
      level = "Low";
      msg = `Tough conditions for ${crop}. Maybe try a different crop or add protective measures.`;
    }

    return { score, level, msg };
  });
