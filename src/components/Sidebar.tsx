import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png";

// left side nav — main app sections
const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/prediction", label: "Prediction", icon: "🌾" },
  { to: "/weather", label: "Weather Map", icon: "🌦️" },
  { to: "/shop", label: "Shop", icon: "🛒" },
  { to: "/schemes", label: "Schemes", icon: "📋" },
  { to: "/news", label: "News", icon: "📰" },
  { to: "/about", label: "About", icon: "ℹ️" },
  { to: "/contact", label: "Contact", icon: "✉️" },
] as const;

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-card border-b border-border px-4 h-14">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="AgroSmart" width={28} height={28} />
          <span className="font-bold text-primary">AgroSmart</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-accent"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* backdrop on mobile */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-foreground/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img src={logo} alt="AgroSmart" width={36} height={36} />
            <span className="text-xl font-bold text-primary">
              Agro<span className="text-secondary-foreground">Smart</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground mt-2">Smart farming, simple tools</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <span className="text-lg">{l.icon}</span>
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border text-xs text-muted-foreground">
          🌱 Built for Indian farmers
        </div>
      </aside>
    </>
  );
}
