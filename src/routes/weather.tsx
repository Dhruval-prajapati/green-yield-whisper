import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/weather")({
  component: WeatherPage,
  head: () => ({
    meta: [
      { title: "Weather Map — AgroSmart" },
      { name: "description", content: "Live weather, humidity, and rainfall map for Indian farmers. Tap any city to see details." },
    ],
  }),
});

// indian cities with farming activity
const cities = [
  { name: "Ahmedabad", lat: 23.02, lon: 72.57, state: "Gujarat" },
  { name: "Delhi", lat: 28.61, lon: 77.21, state: "Delhi" },
  { name: "Mumbai", lat: 19.08, lon: 72.88, state: "Maharashtra" },
  { name: "Jaipur", lat: 26.91, lon: 75.79, state: "Rajasthan" },
  { name: "Lucknow", lat: 26.85, lon: 80.95, state: "UP" },
  { name: "Bhopal", lat: 23.26, lon: 77.41, state: "MP" },
  { name: "Pune", lat: 18.52, lon: 73.86, state: "Maharashtra" },
  { name: "Hyderabad", lat: 17.39, lon: 78.49, state: "Telangana" },
  { name: "Chennai", lat: 13.08, lon: 80.27, state: "TN" },
  { name: "Kolkata", lat: 22.57, lon: 88.36, state: "WB" },
  { name: "Bengaluru", lat: 12.97, lon: 77.59, state: "Karnataka" },
  { name: "Patna", lat: 25.59, lon: 85.13, state: "Bihar" },
  { name: "Chandigarh", lat: 30.73, lon: 76.78, state: "Punjab" },
  { name: "Amritsar", lat: 31.63, lon: 74.87, state: "Punjab" },
  { name: "Nagpur", lat: 21.14, lon: 79.08, state: "Maharashtra" },
  { name: "Indore", lat: 22.71, lon: 75.85, state: "MP" },
];

interface Weather {
  temp: number;
  humidity: number;
  wind: number;
  rain: number;
  feels: number;
  code: number;
}

function describe(code: number) {
  if (code === 0) return "Clear sky ☀️";
  if (code <= 3) return "Partly cloudy ⛅";
  if (code <= 48) return "Foggy 🌫️";
  if (code <= 57) return "Drizzle 🌦️";
  if (code <= 67) return "Rainy 🌧️";
  if (code <= 82) return "Heavy rain 🌧️";
  return "Thunderstorm ⛈️";
}

function tip(w: Weather) {
  if (w.humidity > 80) return "High humidity — risk of fungal disease. Skip overhead irrigation today.";
  if (w.temp > 38) return "Extreme heat — water early morning or late evening to reduce evaporation loss.";
  if (w.rain > 5) return "Rain expected — postpone fertilizer spreading to avoid runoff.";
  if (w.wind > 30) return "Windy day — secure structures and avoid pesticide spraying.";
  if (w.humidity < 30) return "Dry air — increase irrigation frequency for sensitive crops.";
  return "Conditions look fine for fieldwork. Good day to inspect your crops.";
}

function WeatherPage() {
  const [selected, setSelected] = useState(cities[0]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setWeather(null);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${selected.lat}&longitude=${selected.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia/Kolkata`;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const c = data.current;
        setWeather({
          temp: Math.round(c.temperature_2m),
          humidity: c.relative_humidity_2m,
          wind: Math.round(c.wind_speed_10m),
          rain: c.precipitation,
          feels: Math.round(c.apparent_temperature),
          code: c.weather_code,
        });
      })
      .catch(() => !cancelled && setError("Couldn't fetch weather. Try again."))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [selected]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">🌦️ Live Weather Map</h1>
        <p className="mt-2 text-muted-foreground">
          Tap any city below to see current weather, humidity, and rainfall.
        </p>
      </div>

      {/* city chips — touch friendly */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {cities.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelected(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected.name === c.name
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "bg-card border border-border hover:bg-accent"
            }`}
          >
            📍 {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* weather details */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <p className="text-sm text-muted-foreground">{selected.state}, India</p>
            </div>
            {weather && <p className="text-lg">{describe(weather.code)}</p>}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : error ? (
            <p className="text-destructive text-center py-12">{error}</p>
          ) : weather ? (
            <>
              <div className="text-center py-6 bg-agro-green-light rounded-xl">
                <p className="text-6xl font-bold text-primary">{weather.temp}°C</p>
                <p className="text-sm text-muted-foreground mt-2">Feels like {weather.feels}°C</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl">💧</p>
                  <p className="text-xs text-muted-foreground mt-1">Humidity</p>
                  <p className="text-lg font-bold text-primary">{weather.humidity}%</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl">💨</p>
                  <p className="text-xs text-muted-foreground mt-1">Wind</p>
                  <p className="text-lg font-bold">{weather.wind} km/h</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl">🌧️</p>
                  <p className="text-xs text-muted-foreground mt-1">Rainfall</p>
                  <p className="text-lg font-bold">{weather.rain} mm</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl">🌡️</p>
                  <p className="text-xs text-muted-foreground mt-1">Feels</p>
                  <p className="text-lg font-bold">{weather.feels}°C</p>
                </div>
              </div>

              <div className="mt-5 p-4 bg-agro-yellow-light border border-border rounded-lg">
                <p className="font-semibold text-sm">💡 Today's Farming Tip</p>
                <p className="text-sm text-muted-foreground mt-1">{tip(weather)}</p>
              </div>
            </>
          ) : null}
        </div>

        {/* map */}
        <div className="bg-card border border-border rounded-xl overflow-hidden min-h-[480px]">
          <iframe
            title={`Map of ${selected.name}`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${selected.lon - 0.2},${selected.lat - 0.15},${selected.lon + 0.2},${selected.lat + 0.15}&layer=mapnik&marker=${selected.lat},${selected.lon}`}
            className="w-full h-full min-h-[480px]"
            loading="lazy"
            style={{ border: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
