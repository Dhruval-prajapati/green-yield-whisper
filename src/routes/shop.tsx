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
  // seeds / beans
  { id: 1, name: "Hybrid Tomato Seeds (50g)", price: "₹120", category: "Seeds",
    img: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=tomato+seeds+hybrid" },
  { id: 2, name: "Organic Wheat Seeds (1kg)", price: "₹250", category: "Seeds",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=wheat+seeds+for+farming" },
  { id: 3, name: "Green Gram (Moong) Beans Seeds 1kg", price: "₹190", category: "Seeds",
    img: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=moong+dal+seeds" },
  { id: 4, name: "Chickpea (Chana) Seeds 1kg", price: "₹160", category: "Seeds",
    img: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&h=300&fit=crop&sat=-30",
    link: "https://www.amazon.in/s?k=chickpea+seeds" },

  // fertilizers
  { id: 5, name: "NPK Fertilizer 19-19-19 (5kg)", price: "₹480", category: "Fertilizers",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=npk+fertilizer" },
  { id: 6, name: "Vermicompost Organic (10kg)", price: "₹350", category: "Fertilizers",
    img: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=vermicompost" },
  { id: 7, name: "Urea Fertilizer (5kg)", price: "₹220", category: "Fertilizers",
    img: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=urea+fertilizer" },
  { id: 8, name: "Bone Meal Organic Fertilizer 1kg", price: "₹280", category: "Fertilizers",
    img: "https://images.unsplash.com/photo-1592982537447-7440770faae9?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=bone+meal+fertilizer" },

  // tools
  { id: 9, name: "Garden Pruning Shears", price: "₹599", category: "Tools",
    img: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=pruning+shears" },
  { id: 10, name: "Drip Irrigation Kit (100m)", price: "₹2,499", category: "Tools",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=drip+irrigation+kit" },
  { id: 11, name: "Hand Cultivator Tool Set (5pc)", price: "₹899", category: "Tools",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=garden+tool+set" },
  { id: 12, name: "Manual Seed Sprayer 16L", price: "₹1,799", category: "Tools",
    img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=knapsack+sprayer" },

  // pesticides
  { id: 13, name: "Neem Oil Organic Spray (500ml)", price: "₹180", category: "Pesticides",
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=neem+oil+spray" },
  { id: 14, name: "Bio Pesticide for Crops 1L", price: "₹420", category: "Pesticides",
    img: "https://images.unsplash.com/photo-1620200423727-8127f75d4f53?w=400&h=300&fit=crop",
    link: "https://www.amazon.in/s?k=bio+pesticide" },
  { id: 15, name: "Insect Trap Sticky Sheets (10pc)", price: "₹250", category: "Pesticides",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&sat=-50",
    link: "https://www.amazon.in/s?k=yellow+sticky+traps" },
  { id: 16, name: "Trichoderma Bio Fungicide 1kg", price: "₹390", category: "Pesticides",
    img: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&h=300&fit=crop",
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
              className="w-full h-48 object-cover"
              loading="lazy"
              width={400}
              height={300}
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
