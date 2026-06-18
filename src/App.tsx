import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ShirtViewer from "./components/ShirtViewer";
import InitiativesTabs from "./components/InitiativesTabs";
import FaithNavigator from "./components/FaithNavigator";
import GatheringBoard from "./components/GatheringBoard";
import PrayerWall from "./components/PrayerWall";
import CheckoutModal from "./components/CheckoutModal";

import { CartItem, ShirtSize } from "./types";
import { SHIRT_COLORS } from "./data";
import { BookOpen, Users, Heart, ArrowDown, Sparkles, MessageCircle, Info, Calendar } from "lucide-react";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("shirt");

  // Track scroll position to update active navbar tag
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["shirt", "initiatives", "faith", "gatherings", "prayers"];
      let currentSection = "shirt";
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (colorId: string, size: ShirtSize, quantity: number) => {
    const colorObject = SHIRT_COLORS.find((c) => c.id === colorId) || SHIRT_COLORS[0];
    const itemId = `${colorId}-${size}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            colorId,
            colorName: colorObject.name,
            size,
            quantity,
            price: 35.00
          }
        ];
      }
    });

    // Automatically pop open cart drawer for immediate confirmation
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const executeScrollTo = (elementId: string) => {
    if (elementId === "root") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(elementId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // offset header height
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  // Derived states
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-cream/40 flex flex-col justify-between selection:bg-brand-gold/35 select-none">
      
      {/* Sticky beautiful Header navigation bar */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onScrolledTo={executeScrollTo}
      />

      {/* Main landing container layout */}
      <main className="flex-1">
        
        {/* HERO SECTION: The Sowers Covenant */}
        <section className="relative overflow-hidden bg-brand-clay/30 border-b border-brand-clay/50 py-20 lg:py-32 select-none">
          
          {/* Subtle background liturgy design circles */}
          <div className="absolute inset-x-0 top-0 h-[500px] pointer-events-none opacity-5">
            <svg className="w-full h-full text-brand-charcoal" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="50" cy="-20" r="60" fill="none" stroke="currentColor" strokeWidth="0.2" />
              <circle cx="50" cy="-20" r="50" fill="none" stroke="currentColor" strokeWidth="0.15" />
              <circle cx="50" cy="-20" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left description text (Col span 7) */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-gold/15 text-[#8d6e35] rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Acts 2:42 Charity Fellowship</span>
                </div>

                <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-brand-charcoal leading-tight">
                  A Thread of Grace, <br />
                  <span className="font-serif italic font-normal text-brand-gold">Woven in Communion.</span>
                </h1>

                <p className="font-sans text-brand-charcoal/70 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                  Through a single t-shirt, we unite hearts globally. 100% of the financial profits directly subsidize theological apps, local neighborhood dinner tables, and homeless relief efforts. No corporate salaries—strictly local hands in service.
                </p>

                {/* Sowers Metrics Row */}
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 pt-4 select-none">
                  <div className="border-l-2 border-brand-gold pl-4 text-left">
                    <span className="font-mono text-xl sm:text-3xl font-bold text-brand-charcoal">1.2k+</span>
                    <span className="font-sans text-[10px] uppercase font-semibold text-brand-charcoal/60 block tracking-wider mt-1">Dinner Tables</span>
                  </div>
                  <div className="border-l-2 border-brand-gold pl-4 text-left">
                    <span className="font-mono text-xl sm:text-3xl font-bold text-brand-charcoal">450k</span>
                    <span className="font-sans text-[10px] uppercase font-semibold text-brand-charcoal/60 block tracking-wider mt-1">Seekers Guided</span>
                  </div>
                  <div className="border-l-2 border-brand-gold pl-4 text-left">
                    <span className="font-mono text-xl sm:text-3xl font-bold text-brand-charcoal">100%</span>
                    <span className="font-sans text-[10px] uppercase font-semibold text-brand-charcoal/60 block tracking-wider mt-1">proceeds given</span>
                  </div>
                </div>

                {/* Navigation CTA button */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <button
                    onClick={() => executeScrollTo("shirt")}
                    className="w-full sm:w-auto bg-brand-charcoal hover:bg-brand-charcoal/90 text-white px-8 py-4 rounded-xl font-sans font-semibold text-xs uppercase tracking-widest transition-transform hover:scale-[1.01] flex items-center justify-center space-x-2.5 cursor-pointer shadow-md"
                  >
                    <span>Examine the Shirt</span>
                    <ArrowDown className="w-4 h-4 text-brand-gold" />
                  </button>
                  <button
                    onClick={() => executeScrollTo("faith")}
                    className="w-full sm:w-auto border border-brand-clay bg-white hover:bg-brand-clay/20 text-brand-charcoal px-8 py-4 rounded-xl font-sans font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <span>Explore Faith Q&A</span>
                  </button>
                </div>
              </div>

              {/* Right decorative visual box (Col span 5) */}
              <div className="lg:col-span-5 relative flex items-center justify-center select-none">
                
                {/* Simulated frame showcasing the apparel print details */}
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-[40px] bg-brand-cream border-8 border-brand-clay/35 shadow-xl rotate-[3deg] hover:rotate-0 transition-transform duration-500 overflow-hidden flex flex-col justify-between p-6">
                  
                  {/* Miniature brand bar */}
                  <div className="flex justify-between items-center pb-4 border-b border-brand-clay/30">
                    <span className="font-mono text-[9px] font-bold text-[#8d6e35] uppercase tracking-widest">Agape Edition YR26</span>
                    <span className="h-5 w-5 rounded-full bg-brand-clay flex items-center justify-center font-mono text-[8px] font-bold">1/4</span>
                  </div>

                  {/* Elegant scripture print mockup lines */}
                  <div className="my-auto text-center space-y-3.5 py-4">
                    <span className="font-serif text-sm italic block text-brand-charcoal/80">"where two or three..."</span>
                    <svg className="w-10 h-10 text-brand-gold mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M12 2v20M5 9h14" />
                    </svg>
                    <span className="font-mono text-[10px] tracking-widest text-[#8d6e35] uppercase block font-semibold">MATTHEW 18:20 PRINT</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] uppercase tracking-wider pt-3 border-t border-brand-clay/30">
                    <span className="font-sans text-brand-charcoal/60 font-medium">Genuine Linen feel</span>
                    <span className="font-mono font-bold text-brand-charcoal">$35.00</span>
                  </div>

                </div>

                {/* Micro hovering bubble with matching fund indicator */}
                <div className="absolute -top-4 right-1/4 bg-[#556b2f] text-brand-cream px-4 py-2.5 rounded-2xl border border-brand-cream/20 shadow-md text-[10px] tracking-widest uppercase font-mono ring-4 ring-brand-cream/80 flex items-center space-x-1.5 animate-bounce select-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-ping"></div>
                  <span>Supporter Matched Campaign</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 1: Shirt Presentation Applet */}
        <ShirtViewer onAddToCart={handleAddToCart} />

        {/* SECTION 2: Charity Initiatives Switching Dashboard */}
        <InitiativesTabs />

        {/* SECTION 3: Gemini Q&A and Mood-based custom scripture */}
        <FaithNavigator />

        {/* SECTION 4: Active RSVP event boards */}
        <GatheringBoard />

        {/* SECTION 5: Fellowship Prayer Wall */}
        <PrayerWall />

      </main>

      {/* Solid Polished Christian Footer */}
      <footer className="bg-brand-charcoal text-[#efebe4] pt-16 pb-12 border-t border-brand-charcoal relative select-none">
        
        {/* Subtle geometric overlay */}
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none opacity-5">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="50" y2="20" stroke="currentColor" strokeWidth="0.2" />
            <line x1="100" y1="100" x2="50" y2="20" stroke="currentColor" strokeWidth="0.2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#efebe4]/10 pb-12 mb-12">
            
            {/* Brand details column (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-brand-cream text-brand-charcoal flex items-center justify-center font-serif text-lg font-bold">
                  χ
                </div>
                <div>
                  <h4 className="font-display font-semibold tracking-wider text-sm uppercase text-brand-cream">
                    KOINONIA GATHER
                  </h4>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-brand-gold -mt-0.5 font-semibold">
                    The Sowers Project
                  </p>
                </div>
              </div>
              <p className="font-sans text-xs text-[#efebe4]/65 leading-relaxed font-light pr-8">
                An ecumenical Christian organization providing startup micro-grants, discussion pamphlets and intercession logs. Formed under sovereign non-profit standards to help seekers and disciples discover depth in Jesus Christ.
              </p>
              <span className="font-serif italic text-xs block text-brand-gold">
                "Be devoted to one another in brotherly love." — Romans 12:10
              </span>
            </div>

            {/* Quick Links Column (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-[#efebe4]/50">Community Hubs</h5>
              <div className="flex flex-col space-y-2 text-xs">
                <button onClick={() => executeScrollTo("shirt")} className="text-left text-[#efebe4]/75 hover:text-brand-gold transition-colors cursor-pointer select-none">Apparel Fundraiser</button>
                <button onClick={() => executeScrollTo("initiatives")} className="text-left text-[#efebe4]/75 hover:text-brand-gold transition-colors cursor-pointer select-none">Charity Objectives</button>
                <button onClick={() => executeScrollTo("faith")} className="text-left text-[#efebe4]/75 hover:text-brand-gold transition-colors cursor-pointer select-none">Faith Seekers Q&A</button>
                <button onClick={() => executeScrollTo("gatherings")} className="text-left text-[#efebe4]/75 hover:text-brand-gold transition-colors cursor-pointer select-none">Fellowship Dinners</button>
                <button onClick={() => executeScrollTo("prayers")} className="text-left text-[#efebe4]/75 hover:text-brand-gold transition-colors cursor-pointer select-none">Prayer Bulletins</button>
              </div>
            </div>

            {/* Contact details column (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-[#efebe4]/50">Sower Secretariat</h5>
              <div className="space-y-2 text-xs text-[#efebe4]/75 font-light">
                <p><strong>Agape Headquarters:</strong> Minneapolis Outreach Warehouse Facility, 425 W Sowers Blvd, Suite 200, Minneapolis, MN 55401</p>
                <p><strong>Secretariat Mailbox:</strong> secretariat@koinoniagather.org</p>
                <p><strong>Intercessors Helpline:</strong> 1-800-425-SOWS (7697)</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#efebe4]/40 font-mono select-none">
            <p>© 2026 Koinonia Gather & Sowers Foundation. All Rights Reserved. 501(c)(3) Entity.</p>
            <div className="flex space-x-4">
              <span className="hover:text-brand-gold select-none">Doctrine Statement</span>
              <span className="hover:text-brand-gold select-none">Tax Credentials</span>
              <span className="hover:text-brand-gold select-none">Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide out checkout draw console */}
      <CheckoutModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
