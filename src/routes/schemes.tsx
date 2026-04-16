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
    desc: "Direct income support of ₹6,000/year to small and marginal farmer families in three equal installments.",
    link: "https://pmkisan.gov.in/",
  },
  {
    name: "PM Fasal Bima Yojana",
    desc: "Crop insurance scheme providing financial support to farmers suffering crop loss due to natural calamities.",
    link: "https://pmfby.gov.in/",
  },
  {
    name: "Kisan Credit Card (KCC)",
    desc: "Provides affordable short-term credit to farmers for crop production, post-harvest expenses, and consumption.",
    link: "https://www.nabard.org/content.aspx?id=593",
  },
  {
    name: "Soil Health Card Scheme",
    desc: "Free soil testing and health cards to help farmers use the right amount of nutrients for better productivity.",
    link: "https://soilhealth.dac.gov.in/",
  },
  {
    name: "eNAM (National Agriculture Market)",
    desc: "Online trading platform for agricultural commodities, connecting farmers directly to buyers across India.",
    link: "https://enam.gov.in/",
  },
  {
    name: "Paramparagat Krishi Vikas Yojana",
    desc: "Promotes organic farming through cluster approach, providing ₹50,000/ha over 3 years for organic inputs.",
    link: "https://pgsindia-ncof.gov.in/PKVY/Index.aspx",
  },
  {
    name: "PM Krishi Sinchai Yojana",
    desc: "Aims to expand cultivable area under irrigation with 'Har Khet Ko Pani' and promote water-use efficiency.",
    link: "https://pmksy.gov.in/",
  },
  {
    name: "Agriculture Infrastructure Fund",
    desc: "₹1 lakh crore financing facility for post-harvest management and community farming assets.",
    link: "https://agriinfra.dac.gov.in/",
  },
];

function SchemesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">📋 Government Schemes</h1>
        <p className="mt-2 text-muted-foreground">Indian agriculture schemes to support and empower farmers.</p>
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
              className="inline-block mt-4 text-sm font-medium text-primary hover:underline"
            >
              Learn More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
