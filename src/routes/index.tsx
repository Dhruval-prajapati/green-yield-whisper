import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

// mock news data — saves us from dealing with API keys
const newsItems = [
  { id: 1, title: "Government announces ₹10,000 crore package for organic farming", tag: "India", date: "Apr 15, 2026" },
  { id: 2, title: "Wheat production expected to hit record high this season", tag: "India", date: "Apr 14, 2026" },
  { id: 3, title: "Global rice prices surge amid supply chain disruptions", tag: "World", date: "Apr 13, 2026" },
  { id: 4, title: "New drought-resistant crop varieties released by ICAR", tag: "India", date: "Apr 12, 2026" },
  { id: 5, title: "FAO warns of climate change impact on Asian agriculture", tag: "World", date: "Apr 11, 2026" },
  { id: 6, title: "PM-KISAN 17th installment to be released next month", tag: "India", date: "Apr 10, 2026" },
];

const features = [
  { icon: "🌾", title: "AI Crop Prediction", desc: "Get smart yield predictions based on weather, soil, and location data.", link: "/prediction" },
  { icon: "🛒", title: "Farm Shop", desc: "Browse quality seeds, tools, and fertilizers from trusted sellers.", link: "/shop" },
  { icon: "📋", title: "Govt Schemes", desc: "Stay updated on agriculture schemes and subsidies for farmers.", link: "/schemes" },
  { icon: "🤖", title: "AI Assistant", desc: "Chat with AgroBot for instant farming advice and tips.", link: "/" },
];

function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Lush green farmland at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 to-foreground/30" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
            Smart Farming,{" "}
            <span className="text-secondary">Better Yields</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-primary-foreground/90">
            AI-powered predictions, real-time news, and tools to help Indian farmers thrive.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/prediction"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Try AI Prediction
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-lg bg-primary-foreground/20 text-primary-foreground font-semibold backdrop-blur hover:bg-primary-foreground/30 transition-colors border border-primary-foreground/30"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* features grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.link}
              className="hover-lift bg-card border border-border rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* breaking news */}
      <section className="bg-agro-green-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Agriculture News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((n) => (
              <div key={n.id} className="hover-lift bg-card border border-border rounded-xl p-5">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-3 ${
                  n.tag === "India" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"
                }`}>
                  {n.tag}
                </span>
                <h3 className="font-semibold text-foreground leading-snug">{n.title}</h3>
                <p className="text-xs text-muted-foreground mt-2">{n.date}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/news" className="text-primary font-medium hover:underline">
              View All News →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
