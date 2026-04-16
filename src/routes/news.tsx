import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({
    meta: [
      { title: "Agriculture News — AgroSmart" },
      { name: "description", content: "Latest agriculture news from India and around the world." },
    ],
  }),
});

// mock news — in production you'd hook this up to a news API
const allNews = [
  { id: 1, title: "Government announces ₹10,000 crore package for organic farming", tag: "India", date: "Apr 15, 2026", summary: "The Union Agriculture Ministry has unveiled a massive package aimed at boosting organic farming across 15 states. The scheme will provide subsidies for organic inputs, certification costs, and market linkages." },
  { id: 2, title: "Wheat production expected to hit record high this season", tag: "India", date: "Apr 14, 2026", summary: "Thanks to favorable weather conditions and improved seed varieties, India's wheat production is projected to cross 115 million tonnes this rabi season." },
  { id: 3, title: "Global rice prices surge amid supply chain disruptions", tag: "World", date: "Apr 13, 2026", summary: "International rice prices have jumped 18% in the last quarter due to export restrictions and logistics bottlenecks affecting major producing nations." },
  { id: 4, title: "New drought-resistant crop varieties released by ICAR", tag: "India", date: "Apr 12, 2026", summary: "The Indian Council of Agricultural Research has released 5 new crop varieties that can withstand extended dry spells, aimed at rainfed farming regions." },
  { id: 5, title: "FAO warns of climate change impact on Asian agriculture", tag: "World", date: "Apr 11, 2026", summary: "A new FAO report highlights that rising temperatures and erratic monsoons could reduce crop yields by 10-25% across South and Southeast Asia by 2040." },
  { id: 6, title: "PM-KISAN 17th installment to be released next month", tag: "India", date: "Apr 10, 2026", summary: "Over 11 crore farmer families will receive the 17th installment of ₹2,000 under the PM-KISAN scheme starting May 2026." },
  { id: 7, title: "Precision agriculture market to reach $15 billion by 2028", tag: "World", date: "Apr 9, 2026", summary: "The global precision agriculture market is growing rapidly, driven by AI, IoT sensors, and drone technology adoption in farming." },
  { id: 8, title: "Maharashtra farmers see bumper sugarcane harvest", tag: "India", date: "Apr 8, 2026", summary: "Improved irrigation facilities and timely rainfall have led to a record sugarcane harvest across western Maharashtra this year." },
];

function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">📰 Agriculture News</h1>
        <p className="mt-2 text-muted-foreground">Stay updated with the latest from India and the world.</p>
      </div>

      <div className="space-y-6">
        {allNews.map((n) => (
          <article key={n.id} className="hover-lift bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                n.tag === "India" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"
              }`}>
                {n.tag}
              </span>
              <span className="text-xs text-muted-foreground">{n.date}</span>
            </div>
            <h2 className="text-lg font-bold leading-snug">{n.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{n.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
