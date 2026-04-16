import { useState, useEffect } from "react";

// using open-meteo — no API key needed, completely free
interface WeatherData {
  location: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  feelsLike: number;
  precipitation: number;
}

// some key Indian cities for farmers
const locations = [
  { name: "Ahmedabad", lat: 23.02, lon: 72.57 },
  { name: "Delhi", lat: 28.61, lon: 77.21 },
  { name: "Mumbai", lat: 19.08, lon: 72.88 },
  { name: "Jaipur", lat: 26.91, lon: 75.79 },
  { name: "Lucknow", lat: 26.85, lon: 80.95 },
  { name: "Bhopal", lat: 23.26, lon: 77.41 },
  { name: "Pune", lat: 18.52, lon: 73.86 },
  { name: "Hyderabad", lat: 17.39, lon: 78.49 },
  { name: "Chennai", lat: 13.08, lon: 80.27 },
  { name: "Kolkata", lat: 22.57, lon: 88.36 },
];

// weather code to description — WMO standard
function weatherLabel(code: number): string {
  if (code === 0) return "Clear sky ☀️";
  if (code <= 3) return "Partly cloudy ⛅";
  if (code <= 48) return "Foggy 🌫️";
  if (code <= 57) return "Drizzle 🌦️";
  if (code <= 67) return "Rainy 🌧️";
  if (code <= 77) return "Snowy ❄️";
  if (code <= 82) return "Heavy rain 🌧️";
  if (code <= 86) return "Snow showers 🌨️";
  return "Thunderstorm ⛈️";
}

export default function WeatherMap() {
  const [selected, setSelected] = useState(locations[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    // open-meteo is free, no key needed
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${selected.lat}&longitude=${selected.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia/Kolkata`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Weather API unavailable");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const c = data.current;
        setWeather({
          location: selected.name,
          temp: Math.round(c.temperature_2m),
          humidity: c.relative_humidity_2m,
          windSpeed: Math.round(c.wind_speed_10m),
          weatherCode: c.weather_code,
          feelsLike: Math.round(c.apparent_temperature),
          precipitation: c.precipitation,
        });
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't fetch weather. Try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [selected]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">🌦️ Live Weather for Farmers</h2>
          <p className="mt-2 text-muted-foreground">
            Check real-time weather and humidity before you head to the field.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* location selector */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-3 text-sm">📍 Select Your City</h3>
            <div className="space-y-1.5 max-h-80 overflow-y-auto">
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => setSelected(loc)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selected.name === loc.name
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>

          {/* weather details */}
          <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-48 text-destructive text-sm">{error}</div>
            ) : weather ? (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{weather.location}</p>
                  <p className="text-5xl font-bold text-primary mt-1">{weather.temp}°C</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Feels like {weather.feelsLike}°C
                  </p>
                  <p className="mt-2 text-lg">{weatherLabel(weather.weatherCode)}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Humidity</p>
                    <p className="text-lg font-bold text-primary">{weather.humidity}%</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Wind</p>
                    <p className="text-lg font-bold">{weather.windSpeed} km/h</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Rain</p>
                    <p className="text-lg font-bold">{weather.precipitation} mm</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* embedded map — openstreetmap, no key needed */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <iframe
              title={`Map of ${selected.name}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${selected.lon - 0.15},${selected.lat - 0.1},${selected.lon + 0.15},${selected.lat + 0.1}&layer=mapnik&marker=${selected.lat},${selected.lon}`}
              className="w-full h-full min-h-[280px]"
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>
        </div>

        {/* farming tip based on weather */}
        {weather && !loading && (
          <div className="mt-6 bg-agro-green-light border border-border rounded-xl p-5 animate-fade-in">
            <p className="font-semibold text-primary">💡 Farming Tip</p>
            <p className="text-sm text-muted-foreground mt-1">
              {weather.humidity > 80
                ? "High humidity detected — watch out for fungal diseases. Avoid overhead irrigation today."
                : weather.temp > 38
                  ? "Extreme heat! Water your crops early morning or late evening to reduce evaporation."
                  : weather.precipitation > 5
                    ? "Rain expected — hold off on fertilizer application to avoid runoff and waste."
                    : weather.windSpeed > 30
                      ? "High winds today. Secure any temporary structures and delay spraying."
                      : "Conditions look decent for fieldwork. A good day to check on your crops!"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
