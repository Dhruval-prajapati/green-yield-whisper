import { useState } from "react";

// simple keyword-based responses — no ML needed
const responses: Record<string, string> = {
  "summer crop": "For summer, consider growing watermelon, muskmelon, cucumber, okra, or bitter gourd. They thrive in high temperatures.",
  "winter crop": "Winter is ideal for wheat, mustard, peas, chickpea (chana), and cauliflower.",
  "fertilizer": "Use NPK 10-26-26 for flowering crops. For leafy vegetables, a nitrogen-rich urea-based fertilizer works well. Always do a soil test first!",
  "organic": "Organic farming tips: use vermicompost, neem cake for pest control, and practice crop rotation to maintain soil health.",
  "irrigation": "Drip irrigation saves up to 60% water compared to flood irrigation. Consider sprinkler systems for large fields.",
  "pest": "For natural pest control, try neem oil spray, introduce ladybugs, or use pheromone traps. Rotate crops seasonally.",
  "soil": "Get a soil test done at your nearest Krishi Vigyan Kendra. It'll tell you pH, nutrients, and what amendments you need.",
  "loan": "Check PM-KISAN for direct income support. For crop loans, approach your local cooperative bank or SBI's Kisan Credit Card scheme.",
  "weather": "Use the IMD (India Meteorological Department) app for accurate forecasts. Plan sowing 2-3 days after predicted rainfall.",
  "market": "Check eNAM (National Agriculture Market) for real-time mandi prices. It helps you sell at the best rate.",
  "default": "I'm here to help with agriculture questions! Ask me about crops, fertilizers, irrigation, pest control, soil health, government schemes, or market prices.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, val] of Object.entries(responses)) {
    if (key !== "default" && lower.includes(key)) return val;
  }
  // check a few more loose matches
  if (lower.includes("crop") && lower.includes("best")) return responses["summer crop"];
  if (lower.includes("price") || lower.includes("mandi")) return responses["market"];
  if (lower.includes("help") || lower.includes("hello") || lower.includes("hi"))
    return "Hello! 👋 I'm AgroBot, your agriculture assistant. Ask me anything about farming!";
  return responses["default"];
}

type Message = { role: "user" | "bot"; text: string };

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 🌾 I'm AgroBot. Ask me anything about farming, crops, or agriculture." },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    const botMsg: Message = { role: "bot", text: getResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  return (
    <>
      {/* floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-xl flex flex-col max-h-[28rem] animate-fade-in">
          <div className="px-4 py-3 bg-primary text-primary-foreground rounded-t-xl font-semibold flex justify-between items-center">
            <span>🌱 AgroBot</span>
            <button onClick={() => setOpen(false)} className="opacity-70 hover:opacity-100">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    m.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about farming..."
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={send}
              className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
