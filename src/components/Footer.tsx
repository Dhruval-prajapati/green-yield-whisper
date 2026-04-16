import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">AgroSmart</h3>
            <p className="text-sm opacity-80">
              Empowering farmers with technology. Smart predictions, real-time news,
              and everything agriculture in one place.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/prediction" className="hover:opacity-100 transition-opacity">AI Prediction</Link></li>
              <li><Link to="/shop" className="hover:opacity-100 transition-opacity">Shop</Link></li>
              <li><Link to="/schemes" className="hover:opacity-100 transition-opacity">Govt Schemes</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: info@agrosmart.in</li>
              <li>Phone: +91 98765 43210</li>
              <li>Location: Ahmedabad, Gujarat, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} AgroSmart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
