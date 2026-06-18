import React from "react";
import { Coffee, Heart, Menu, ShoppingBag, BookOpen, Star, HelpCircle } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onScrolledTo: (elementId: string) => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  activeSection,
  setActiveSection,
  onScrolledTo
}: HeaderProps) {
  const navItems = [
    { id: "shirt", label: "The Shirt" },
    { id: "initiatives", label: "Our Initiatives" },
    { id: "faith", label: "Faith Q&A & Scripture" },
    { id: "gatherings", label: "Gatherings" },
    { id: "prayers", label: "Prayer Board" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-cream/80 backdrop-blur-md border-b border-brand-clay/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand / Emblem */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onScrolledTo("root")}
          >
            <div className="h-10 w-10 rounded-full bg-brand-forest flex items-center justify-center transition-transform group-hover:scale-105">
              {/* Custom SVG Ichthys / Alpha Omega Christian Style Emblem */}
              <svg 
                className="w-6 h-6 text-white stroke-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                {/* Elegant simple fish symbol (Ichthys) */}
                <path d="M2 12c4-6 12-6 18 0c-6 6-14 6-18 0" />
                <path d="M16 12c2.5 3 4 5 6 5M16 12c2.5-3 4-5 6-5" />
                {/* Modern subtle small inner cross */}
                <path d="M9 10v4M7.5 11h3" />
              </svg>
            </div>
            <div>
              <h1 className="font-serif font-bold tracking-wider text-sm sm:text-base text-brand-charcoal uppercase">
                Hollow & Found
              </h1>
              <p className="font-mono text-[9px] tracking-widest text-[#6B665E] uppercase -mt-0.5 font-medium">
                Sowers Fellowship
              </p>
            </div>
          </div>

          {/* Core Navigation Items */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    onScrolledTo(item.id);
                  }}
                  className={`font-sans font-medium text-sm tracking-wide transition-colors duration-200 relative py-2 cursor-pointer ${
                    active ? "text-brand-forest font-semibold" : "text-brand-charcoal/70 hover:text-brand-charcoal"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-forest rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Hub / Cart */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full border border-brand-clay hover:bg-brand-clay/30 transition-all cursor-pointer group"
              aria-label="Toggle Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-brand-charcoal transition-transform group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-forest text-brand-cream font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF9F6] animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Giving Button */}
            <button
              onClick={() => onScrolledTo("shirt")}
              className="hidden lg:flex items-center space-x-2 bg-brand-forest hover:bg-brand-forest/90 text-[#FAF9F6] px-5 py-2.5 rounded-full font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-[#FAF9F6] fill-white/20" />
              <span>Sow a Seed</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
