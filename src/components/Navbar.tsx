import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png";

// main nav links
const links = [
  { to: "/", label: "Home" },
  { to: "/prediction", label: "Prediction" },
  { to: "/shop", label: "Shop" },
  { to: "/schemes", label: "Schemes" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="AgroSmart" width={36} height={36} />
            <span className="text-xl font-bold text-primary">
              Agro<span className="text-secondary-foreground">Smart</span>
            </span>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                  location.pathname === l.to
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* mobile menu */}
        {open && (
          <div className="md:hidden pb-4 animate-fade-in">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                  location.pathname === l.to
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
