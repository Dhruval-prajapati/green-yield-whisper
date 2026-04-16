import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Farm Shop — AgroSmart" },
      { name: "description", content: "Browse quality seeds, tools, and fertilizers for your farm." },
    ],
  }),
});

// product data with real unsplash images
const products = [
  { id: 1, name: "Hybrid Tomato Seeds (50g)", price: "₹120", category: "Seeds", img: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=300&fit=crop", link: "https://www.amazon.in/s?k=tomato+seeds" },
  { id: 2, name: "Organic Wheat Seeds (1kg)", price: "₹250", category: "Seeds", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop", link: "https://www.amazon.in/s?k=wheat+seeds" },
  { id: 3, name: "NPK Fertilizer 10-26-26 (5kg)", price: "₹480", category: "Fertilizer", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop", link: "https://www.amazon.in/s?k=npk+fertilizer" },
  { id: 4, name: "Vermicompost (10kg)", price: "₹350", category: "Fertilizer", img: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop", link: "https://www.amazon.in/s?k=vermicompost" },
  { id: 5, name: "Garden Pruning Shears", price: "₹599", category: "Tools", img: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=400&h=300&fit=crop", link: "https://www.amazon.in/s?k=pruning+shears" },
  { id: 6, name: "Drip Irrigation Kit (100m)", price: "₹2,499", category: "Tools", img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop", link: "https://www.amazon.in/s?k=drip+irrigation" },
  { id: 7, name: "Neem Oil Spray (500ml)", price: "₹180", category: "Pest Control", img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop", link: "https://www.amazon.in/s?k=neem+oil+spray" },
  { id: 8, name: "Hand Cultivator Tool Set", price: "₹899", category: "Tools", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop", link: "https://www.amazon.in/s?k=garden+tool+set" },
];

function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">🛒 Farm Shop</h1>
        <p className="mt-2 text-muted-foreground">Quality products for modern farmers. Click to visit the seller.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="hover-lift bg-card border border-border rounded-xl overflow-hidden">
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-48 object-cover"
              loading="lazy"
              width={400}
              height={300}
            />
            <div className="p-4">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {p.category}
              </span>
              <h3 className="font-semibold mt-2 leading-snug">{p.name}</h3>
              <p className="text-lg font-bold text-primary mt-1">{p.price}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center py-2 rounded-md bg-secondary text-secondary-foreground font-medium text-sm hover:opacity-80 transition-opacity"
              >
                Visit Store →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
