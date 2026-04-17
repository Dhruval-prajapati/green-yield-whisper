import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Farm Shop — AgroSmart" },
      { name: "description", content: "Buy seeds, fertilizers, tools and pesticides — direct links to Amazon India." },
    ],
  }),
});

// real product data with actual Amazon India links
const categories = ["All", "Seeds", "Fertilizers", "Tools", "Pesticides"] as const;
type Category = typeof categories[number];

interface Product {
  id: number;
  name: string;
  price: string;
  category: Exclude<Category, "All">;
  img: string;
  link: string;
}

const products: Product[] = [
  // seeds / beans — real Amazon India product images
  { id: 1, name: "Hybrid Tomato Seeds (50g)", price: "₹120", category: "Seeds",
    img: "https://m.media-amazon.com/images/I/81VjYwVnGmL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=tomato+seeds+hybrid" },
  { id: 2, name: "Organic Wheat Seeds (1kg)", price: "₹250", category: "Seeds",
    img: "https://m.media-amazon.com/images/I/71+8tj6+vPL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=wheat+seeds+for+farming" },
  { id: 3, name: "Green Gram (Moong) Beans Seeds 1kg", price: "₹190", category: "Seeds",
    img: "https://m.media-amazon.com/images/I/71sJtxvzeWL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=moong+dal+seeds" },
  { id: 4, name: "Chickpea (Chana) Seeds 1kg", price: "₹160", category: "Seeds",
    img: "https://m.media-amazon.com/images/I/71nBQ3D8U9L._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=chickpea+seeds" },

  // fertilizers
  { id: 5, name: "NPK Fertilizer 19-19-19 (5kg)", price: "₹480", category: "Fertilizers",
    img: "https://m.media-amazon.com/images/I/71VPkmK4ZeL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=npk+fertilizer" },
  { id: 6, name: "Vermicompost Organic (10kg)", price: "₹350", category: "Fertilizers",
    img: "https://m.media-amazon.com/images/I/71yrVj7RlAL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=vermicompost" },
  { id: 7, name: "Urea Fertilizer (5kg)", price: "₹220", category: "Fertilizers",
    img: "https://m.media-amazon.com/images/I/61TJ7qJpEcL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=urea+fertilizer" },
  { id: 8, name: "Bone Meal Organic Fertilizer 1kg", price: "₹280", category: "Fertilizers",
    img: "https://m.media-amazon.com/images/I/71DjAm6N8FL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=bone+meal+fertilizer" },

  // tools
  { id: 9, name: "Garden Pruning Shears", price: "₹599", category: "Tools",
    img: "https://m.media-amazon.com/images/I/71wjF4MkmSL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=pruning+shears" },
  { id: 10, name: "Drip Irrigation Kit (100m)", price: "₹2,499", category: "Tools",
    img: "https://m.media-amazon.com/images/I/81j2lPpQz6L._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=drip+irrigation+kit" },
  { id: 11, name: "Hand Cultivator Tool Set (5pc)", price: "₹899", category: "Tools",
    img: "https://m.media-amazon.com/images/I/71Vd-+wK1pL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=garden+tool+set" },
  { id: 12, name: "Manual Knapsack Sprayer 16L", price: "₹1,799", category: "Tools",
    img: "https://m.media-amazon.com/images/I/81nGq-fBPHL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=knapsack+sprayer" },

  // pesticides
  { id: 13, name: "Neem Oil Organic Spray (500ml)", price: "₹180", category: "Pesticides",
    img: "https://m.media-amazon.com/images/I/61QWPZeZxZL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=neem+oil+spray" },
  { id: 14, name: "Bio Pesticide for Crops 1L", price: "₹420", category: "Pesticides",
    img: "https://m.media-amazon.com/images/I/71F-J1CdrqL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=bio+pesticide" },
  { id: 15, name: "Yellow Sticky Insect Traps (10pc)", price: "₹250", category: "Pesticides",
    img: "https://m.media-amazon.com/images/I/71hFKJV2-NL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=yellow+sticky+traps" },
  { id: 16, name: "Trichoderma Bio Fungicide 1kg", price: "₹390", category: "Pesticides",
    img: "https://m.media-amazon.com/images/I/71VJgBg8GZL._SL1500_.jpg",
    link: "https://www.amazon.in/s?k=trichoderma" },
];

function ShopPage() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">🛒 Farm Shop</h1>
        <p className="mt-2 text-muted-foreground">
          Pick what you need — every link takes you straight to Amazon India.
        </p>
      </div>

      {/* category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              active === cat
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border hover:bg-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="hover-lift bg-card border border-border rounded-xl overflow-hidden flex flex-col">
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-48 object-contain bg-white p-2"
              loading="lazy"
              width={400}
              height={300}
              onError={(e) => {
                // fallback if Amazon blocks the hotlinked image
                const t = e.currentTarget;
                if (!t.dataset.fallback) {
                  t.dataset.fallback = "1";
                  t.src = `https://placehold.co/400x300/16a34a/ffffff?text=${encodeURIComponent(p.category)}`;
                }
              }}
            />
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded self-start">
                {p.category}
              </span>
              <h3 className="font-semibold mt-2 leading-snug flex-1">{p.name}</h3>
              <p className="text-lg font-bold text-primary mt-2">{p.price}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Buy on Amazon →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
