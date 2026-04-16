import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/schemes")({
  component: SchemesPage,
  head: () => ({
    meta: [
      { title: "Government Schemes — AgroSmart" },
      { name: "description", content: "Indian government agriculture schemes and subsidies for farmers." },
    ],
  }),
});

const schemes = [
  {
    name: "PM-KISAN",
    desc: "Get ₹6,000/year directly in your bank — three installments, no middlemen. For small and marginal farmer families.",
    link: "https://pmkisan.gov.in/",
  },
  {
    name: "PM Fasal Bima Yojana",
    desc: "Crop insurance that actually helps. If floods, drought, or hail destroy your harvest, this scheme has your back.",
    link: "https://pmfby.gov.in/",
  },
  {
    name: "Kisan Credit Card (KCC)",
    desc: "Need quick credit for seeds or fertilizer? KCC gives you affordable short-term loans without the bank runaround.",
    link: "https://www.nabard.org/content.aspx?id=593",
  },
  {
    name: "Soil Health Card Scheme",
    desc: "Free soil testing — find out exactly what your land needs. No more guessing on fertilizer amounts.",
    link: "https://soilhealth.dac.gov.in/",
  },
  {
    name: "eNAM (National Agriculture Market)",
    desc: "Sell your produce online to buyers across India. Better prices, more transparency, less dependence on local mandis.",
    link: "https://enam.gov.in/",
  },
  {
    name: "Paramparagat Krishi Vikas Yojana",
    desc: "Going organic? Get ₹50,000/hectare over 3 years for organic inputs, certification, and training.",
    link: "https://pgsindia-ncof.gov.in/PKVY/Index.aspx",
  },
  {
    name: "PM Krishi Sinchai Yojana",
    desc: "'Har Khet Ko Pani' — this scheme helps you get irrigation infrastructure and save water with micro-irrigation.",
    link: "https://pmksy.gov.in/",
  },
  {
    name: "Agriculture Infrastructure Fund",
    desc: "₹1 lakh crore for post-harvest storage, cold chains, and processing units. Apply through your bank or FPO.",
    link: "https://agriinfra.dac.gov.in/",
  },
];

function SchemesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">📋 Government Schemes</h1>
        <p className="mt-2 text-muted-foreground">Money, insurance, loans — the government has programs for you. Here's what's available.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((s) => (
          <div key={s.name} className="hover-lift bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary">{s.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            <a
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Learn More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
