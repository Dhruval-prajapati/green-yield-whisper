import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { predictCrop } from "@/server/predict";

export const Route = createFileRoute("/prediction")({
  component: PredictionPage,
  head: () => ({
    meta: [
      { title: "AI Crop Prediction — AgroSmart" },
      { name: "description", content: "Get AI-powered crop yield predictions based on weather, soil type, and location." },
    ],
  }),
});

const soilTypes = ["Alluvial", "Black (Regur)", "Red", "Laterite", "Sandy", "Clay", "Loamy"];
const cropTypes = ["Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Soybean", "Groundnut", "Mustard", "Tomato", "Onion"];

function PredictionPage() {
  const [form, setForm] = useState({ temp: "", rain: "", humidity: "", soil: "", crop: "", location: "" });
  const [result, setResult] = useState<{ score: number; level: string; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await predictCrop({
        data: {
          temp: parseFloat(form.temp) || 25,
          rain: parseFloat(form.rain) || 100,
          humidity: parseFloat(form.humidity) || 60,
          soil: form.soil || "Loamy",
          crop: form.crop || "Rice",
        },
      });
      setResult(r);
    } catch {
      setResult({ score: 0, level: "Error", msg: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  }

  function update(field: string, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
    setResult(null);
  }

  const levelColor = result
    ? result.level === "Excellent" ? "text-primary"
      : result.level === "Good" ? "text-agro-green"
        : result.level === "Moderate" ? "text-secondary-foreground"
          : "text-destructive"
    : "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">🌾 AI Crop Prediction</h1>
        <p className="mt-2 text-muted-foreground">Tell us about your farm — we'll tell you what to expect this season.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Temperature (°C)</label>
            <input type="number" value={form.temp} onChange={(e) => update("temp", e.target.value)}
              placeholder="e.g. 30" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rainfall (cm)</label>
            <input type="number" value={form.rain} onChange={(e) => update("rain", e.target.value)}
              placeholder="e.g. 120" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Humidity (%)</label>
            <input type="number" value={form.humidity} onChange={(e) => update("humidity", e.target.value)}
              placeholder="e.g. 65" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)}
              placeholder="e.g. Ahmedabad, Gujarat" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Soil Type</label>
            <select value={form.soil} onChange={(e) => update("soil", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
              <option value="">Select soil type</option>
              {soilTypes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Crop Type</label>
            <select value={form.crop} onChange={(e) => update("crop", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
              <option value="">Select crop</option>
              {cropTypes.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-60">
          {loading ? "Analyzing..." : "🔍 Get Prediction"}
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-card border border-border rounded-xl p-6 sm:p-8 animate-fade-in">
          <h2 className="text-xl font-bold mb-4">Prediction Result</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{result.score}%</span>
            </div>
            <div>
              <p className={`text-2xl font-bold ${levelColor}`}>{result.level}</p>
              <p className="text-muted-foreground text-sm mt-1">{result.msg}</p>
            </div>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${result.score}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
