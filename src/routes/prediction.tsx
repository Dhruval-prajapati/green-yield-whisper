import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/prediction")({
  component: PredictionPage,
  head: () => ({
    meta: [
      { title: "AI Crop Prediction — AgroSmart" },
      { name: "description", content: "Get AI-powered crop yield predictions based on weather, soil type, and location." },
    ],
  }),
});

// dropdown options
const soilTypes = ["Alluvial", "Black (Regur)", "Red", "Laterite", "Sandy", "Clay", "Loamy"];
const cropTypes = ["Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Soybean", "Groundnut", "Mustard", "Tomato", "Onion"];

// simple rule-based prediction engine
function predict(temp: number, rain: number, humidity: number, soil: string, crop: string) {
  let score = 50; // base score out of 100

  // temperature scoring
  if (temp >= 20 && temp <= 35) score += 15;
  else if (temp >= 10 && temp < 20) score += 5;
  else score -= 10;

  // rainfall scoring
  if (rain >= 50 && rain <= 200) score += 15;
  else if (rain >= 200 && rain <= 300) score += 5;
  else if (rain < 30) score -= 15;

  // humidity
  if (humidity >= 40 && humidity <= 70) score += 10;
  else if (humidity > 85) score -= 5;

  // soil + crop combos that work well
  const goodCombos: Record<string, string[]> = {
    "Alluvial": ["Rice", "Wheat", "Sugarcane", "Maize"],
    "Black (Regur)": ["Cotton", "Soybean", "Sugarcane"],
    "Red": ["Groundnut", "Mustard", "Tomato"],
    "Loamy": ["Wheat", "Tomato", "Onion", "Maize"],
    "Sandy": ["Groundnut", "Mustard"],
    "Clay": ["Rice", "Sugarcane"],
    "Laterite": ["Rice", "Onion"],
  };
  if (goodCombos[soil]?.includes(crop)) score += 15;

  // clamp
  score = Math.max(0, Math.min(100, score));

  if (score >= 80) return { level: "Excellent", color: "text-primary", msg: `High yield expected for ${crop}. Conditions look great!`, score };
  if (score >= 60) return { level: "Good", color: "text-agro-green", msg: `Good conditions for ${crop}. Minor adjustments could improve yield.`, score };
  if (score >= 40) return { level: "Moderate", color: "text-secondary-foreground", msg: `Moderate risk for ${crop}. Consider irrigation and soil amendments.`, score };
  return { level: "Low", color: "text-destructive", msg: `Challenging conditions for ${crop}. Consider alternative crops or protective measures.`, score };
}

function PredictionPage() {
  const [form, setForm] = useState({ temp: "", rain: "", humidity: "", soil: "", crop: "", location: "" });
  const [result, setResult] = useState<ReturnType<typeof predict> | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = predict(
      parseFloat(form.temp) || 25,
      parseFloat(form.rain) || 100,
      parseFloat(form.humidity) || 60,
      form.soil || "Loamy",
      form.crop || "Rice"
    );
    setResult(r);
  }

  function update(field: string, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
    setResult(null);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">🌾 AI Crop Prediction</h1>
        <p className="mt-2 text-muted-foreground">Enter your farm conditions to get a smart yield prediction.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* temperature */}
          <div>
            <label className="block text-sm font-medium mb-1">Temperature (°C)</label>
            <input
              type="number"
              value={form.temp}
              onChange={(e) => update("temp", e.target.value)}
              placeholder="e.g. 30"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* rainfall */}
          <div>
            <label className="block text-sm font-medium mb-1">Rainfall (cm)</label>
            <input
              type="number"
              value={form.rain}
              onChange={(e) => update("rain", e.target.value)}
              placeholder="e.g. 120"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* humidity */}
          <div>
            <label className="block text-sm font-medium mb-1">Humidity (%)</label>
            <input
              type="number"
              value={form.humidity}
              onChange={(e) => update("humidity", e.target.value)}
              placeholder="e.g. 65"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="e.g. Ahmedabad, Gujarat"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* soil type */}
          <div>
            <label className="block text-sm font-medium mb-1">Soil Type</label>
            <select
              value={form.soil}
              onChange={(e) => update("soil", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select soil type</option>
              {soilTypes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* crop type */}
          <div>
            <label className="block text-sm font-medium mb-1">Crop Type</label>
            <select
              value={form.crop}
              onChange={(e) => update("crop", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select crop</option>
              {cropTypes.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          🔍 Get Prediction
        </button>
      </form>

      {/* result card */}
      {result && (
        <div className="mt-8 bg-card border border-border rounded-xl p-6 sm:p-8 animate-fade-in">
          <h2 className="text-xl font-bold mb-4">Prediction Result</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{result.score}%</span>
            </div>
            <div>
              <p className={`text-2xl font-bold ${result.color}`}>{result.level}</p>
              <p className="text-muted-foreground text-sm mt-1">{result.msg}</p>
            </div>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
