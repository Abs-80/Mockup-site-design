import React, { useState } from "react";
import { ShirtColor, ShirtSize } from "../types";
import { SHIRT_COLORS } from "../data";
import { ShoppingBag, Star, Shield, RefreshCw, Heart, Info, ZoomIn } from "lucide-react";

interface ShirtViewerProps {
  onAddToCart: (colorId: string, size: ShirtSize, quantity: number) => void;
}

export default function ShirtViewer({ onAddToCart }: ShirtViewerProps) {
  const [selectedColor, setSelectedColor] = useState<ShirtColor>(SHIRT_COLORS[0]);
  const [selectedSize, setSelectedSize] = useState<ShirtSize>("L");
  const [quantity, setQuantity] = useState<number>(1);
  const [activePhotoView, setActivePhotoView] = useState<"front" | "back" | "pocket">("front");
  const [showSizeChart, setShowSizeChart] = useState<boolean>(false);

  // Campaign Metrics
  const campaignGoal = 20000;
  const campaignRaised = 14350;
  const progressRatio = Math.round((campaignRaised / campaignGoal) * 100);
  const totalSowers = 410;

  const handleAddToCartClick = () => {
    onAddToCart(selectedColor.id, selectedSize, quantity);
    // Reset quantity back to 1
    setQuantity(1);
  };

  const getShirtColorHex = (id: string) => {
    switch (id) {
      case "cream": return "#fbf9f6";
      case "olive": return "#4e5a4d";
      case "dusty-rose": return "#9a7a76";
      case "slate": return "#2e3b4e";
      default: return "#fbf9f6";
    }
  };

  return (
    <section id="shirt" className="py-16 md:py-24 border-b border-brand-clay/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-brand-forest uppercase font-bold block mb-2">
            Fundraising Apparel Campaign
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal mt-2">
            The Hollow & Found Fellowship T-Shirt
          </h2>
          <p className="font-sans text-brand-taupe text-base md:text-lg mt-4 leading-relaxed font-light">
            Every shirt is woven from heavy-density undyed organic cotton. 100% of the financial profits directly subsidize Hollow & Found table micro-grants, theology learning curricula, and critical Sower homeless relief efforts.
          </p>
        </div>

        {/* Product Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Vector Display */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-[#e0d9cf]/40 border border-brand-clay/40 py-12 px-6 flex flex-col items-center justify-center min-h-[480px] md:min-h-[560px] shadow-sm">
              
              {/* Background Cross Aura */}
              <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                <svg className="w-96 h-96 text-brand-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2v20M5 9h14" />
                </svg>
              </div>

              {/* Dynamic Styled Shirt Illustration Vector */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 transition-all duration-500 scale-105">
                
                {/* SVG Silhouette drawing filled with selected hex properties */}
                <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 100 100" fill="none">
                  {/* Outer Shirt contours */}
                  <path 
                    d="M33 12 L43 14 L43 17 L57 17 L57 14 L67 12 L87 23 L76 34 L72 32 L72 88 L28 88 L28 32 L24 34 L13 23 Z" 
                    fill={getShirtColorHex(selectedColor.id)} 
                    stroke="#23231f" 
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    className="transition-all duration-500"
                  />
                  {/* Subtle shadows & seams lines */}
                  <path d="M33 12 L30 31 M67 12 L70 31" stroke="#23231f" strokeWidth="0.8" strokeDasharray="1 1" opacity="0.4" />
                  <path d="M43 17 C45 22, 55 22, 57 17" stroke="#23231f" strokeWidth="1" fill="#fbf9f6" opacity="0.3" />
                  
                  {/* Front/Back/Pocket View Overlays */}
                  {activePhotoView === "front" && (
                    <g className="animate-fade-in">
                      {/* Elegant center chest script print */}
                      <text x="50" y="42" fill={selectedColor.id === 'cream' ? '#2d2a26' : '#fcfbfa'} fontSize="2.8" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.2" fontWeight="bold">
                        HOLLOW & FOUND
                      </text>
                      {/* Sleek thin aesthetic cross */}
                      <line x1="50" y1="46" x2="50" y2="55" stroke={selectedColor.id === 'cream' ? '#4A5D4E' : '#E5E1D8'} strokeWidth="0.6" />
                      <line x1="47.5" y1="49" x2="52.5" y2="49" stroke={selectedColor.id === 'cream' ? '#4A5D4E' : '#E5E1D8'} strokeWidth="0.6" strokeLinecap="round" />
                      
                      {/* Subtitle greek print */}
                      <text x="50" y="59" fill={selectedColor.id === 'cream' ? '#6B665E' : '#efebe4'} opacity="0.85" fontSize="2.2" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.2">
                        FELLOWSHIP OF SOWERS
                      </text>
                    </g>
                  )}

                  {activePhotoView === "back" && (
                    <g className="animate-fade-in">
                      {/* Back Scripture layout */}
                      <text x="50" y="36" fill={selectedColor.id === 'cream' ? '#2d2a26' : '#fcfbfa'} fontSize="2.8" fontFamily="serif" fontStyle="italic" textAnchor="middle">
                        "For where two or three"
                      </text>
                      <text x="50" y="41" fill={selectedColor.id === 'cream' ? '#2d2a26' : '#fcfbfa'} fontSize="2.8" fontFamily="serif" fontStyle="italic" textAnchor="middle">
                        "are gathered in my name,"
                      </text>
                      <text x="50" y="46" fill={selectedColor.id === 'cream' ? '#2d2a26' : '#fcfbfa'} fontSize="2.8" fontFamily="serif" fontStyle="italic" textAnchor="middle">
                        "there am I among them."
                      </text>
                      
                      <line x1="45" y1="51" x2="55" y2="51" stroke="#4A5D4E" strokeWidth="0.5" opacity="0.8" />
                      
                      <text x="50" y="57" fill={selectedColor.id === 'cream' ? '#4A5D4E' : '#efebe4'} fontSize="2.2" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2" fontWeight="bold">
                        MATTHEW 18:20
                      </text>
                    </g>
                  )}

                  {activePhotoView === "pocket" && (
                    <g className="animate-fade-in">
                      {/* Zoomed layout representing pocket details */}
                      <path d="M34 32 L46 32 L46 45 L40 50 L34 45 Z" fill={selectedColor.id === 'cream' ? '#efebe4' : '#23231f'} stroke="#23231f" strokeWidth="0.6" opacity="0.9" />
                      {/* Elegant olive branch stencil on pocket */}
                      <path d="M40 35 C42 36, 43 38, 43 40 M40 35 C38 36, 37 38, 37 40" stroke="#4A5D4E" strokeWidth="0.6" />
                      <path d="M40 34 S 40 43, 40 43" stroke="#4A5D4E" strokeWidth="0.6" />
                      <circle cx="39" cy="37" r="0.5" fill="#4A5D4E" />
                      <circle cx="41.5" cy="39" r="0.5" fill="#4A5D4E" />
                    </g>
                  )}
                </svg>

                {/* Aesthetic label badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-charcoal text-brand-cream text-[10px] tracking-widest font-mono uppercase py-1 px-3.5 rounded-full border border-brand-clay/20 flex items-center space-x-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                  <span>{selectedColor.name}</span>
                </div>
              </div>

              {/* View Selector Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-[#FAF9F6] backdrop-blur-sm p-1.5 rounded-2xl border border-brand-clay">
                <span className="text-xs font-mono font-medium text-brand-charcoal/70 px-2.5">
                  Design Preview
                </span>
                <div className="flex space-x-1">
                  {(["front", "back", "pocket"] as const).map((view) => (
                    <button
                      key={view}
                      onClick={() => setActivePhotoView(view)}
                      className={`text-[10px] tracking-wider font-mono uppercase px-3 py-1.5 rounded-lg transition-all border cursor-pointer ${
                        activePhotoView === view
                          ? "bg-brand-forest text-white border-brand-forest"
                          : "border-transparent text-brand-charcoal/70 hover:bg-[#FAF9F6]"
                      }`}
                    >
                      {view === "pocket" ? "Details Pocket" : `${view} print`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality specs banner */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white border border-[#E5E1D8] p-4 rounded-2xl flex flex-col items-center">
                <Shield className="w-5 h-5 text-brand-forest mb-1" />
                <span className="font-sans font-medium text-xs text-brand-charcoal select-none">100% Organic</span>
                <span className="font-sans text-[10px] text-brand-taupe mt-0.5">Heavy 240GSM</span>
              </div>
              <div className="bg-white border border-[#E5E1D8] p-4 rounded-2xl flex flex-col items-center">
                <RefreshCw className="w-5 h-5 text-brand-forest mb-1" />
                <span className="font-sans font-medium text-xs text-brand-charcoal select-none">Ethical Print</span>
                <span className="font-sans text-[10px] text-brand-taupe mt-0.5">Non-toxic Plant Dye</span>
              </div>
              <div className="bg-white border border-[#E5E1D8] p-4 rounded-2xl flex flex-col items-center">
                <Heart className="w-5 h-5 text-brand-forest mb-1" />
                <span className="font-sans font-medium text-xs text-brand-charcoal select-none">Fundraiser</span>
                <span className="font-sans text-[10px] text-brand-taupe mt-0.5">100% Profits Donated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Controls & Metrics details */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Title & Sizing Box */}
            <div className="space-y-3">
              <span className="px-3 py-1 bg-brand-forest/10 text-brand-forest rounded-full text-xs font-bold uppercase tracking-wider">
                Proceeds Support 3 Initiatives
              </span>
              <h3 className="font-serif text-2.5xl font-bold tracking-tight text-brand-charcoal mt-2">
                "Hollow & Found" Sower Fleece & T-Shirt
              </h3>
              
              <div className="flex items-center space-x-3 mt-1 select-none">
                <span className="text-3xl font-serif font-semibold text-brand-charcoal">$35.00</span>
                <span className="px-2.5 py-0.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-700 font-mono text-[10px] tracking-wide uppercase font-semibold">
                  Tax-Deductible Donation
                </span>
              </div>

              <p className="font-sans text-brand-taupe text-sm leading-relaxed">
                By purchasing this shirt, you support our digital Bible commentators, launch community dinner fellowships, and provide warm meals to homeless shelters.
              </p>
            </div>

            {/* Campaign Progress Meter CARD */}
            <div className="border border-[#E5E1D8] bg-white p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-sans text-xs text-brand-taupe uppercase tracking-wider block">Initiative Goal Met</span>
                  <span className="font-serif text-xl font-bold tracking-tight text-brand-charcoal">${campaignRaised.toLocaleString()}</span>
                  <span className="font-sans text-brand-taupe text-xs"> raised of ${campaignGoal.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-brand-forest">{progressRatio}%</span>
                  <span className="font-sans text-[10px] text-brand-taupe uppercase block">By {totalSowers} Sowers</span>
                </div>
              </div>

              {/* Slider meter */}
              <div className="w-full h-2.5 bg-[#F2F0EB] rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-brand-forest rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${progressRatio}%` }}
                />
              </div>

              <div className="flex items-center space-x-3 text-xs text-brand-forest bg-brand-forest/5 py-3 px-4 rounded-xl border border-brand-forest/10">
                <Info className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  <strong>Almost reached!</strong> Generous supporters matched $1,500 of shirt purchases. Let's finish the Sowers fund.
                </span>
              </div>
            </div>

            {/* Selection Options */}
            <div className="space-y-6">
              
              {/* Option 1: Color */}
              <div className="space-y-3">
                <label className="text-xs tracking-wider uppercase font-mono font-medium text-brand-charcoal/70">
                  Select Fabric Blend
                </label>
                <div className="flex items-center space-x-3">
                  {SHIRT_COLORS.map((color) => {
                    const isSelected = selectedColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isSelected ? "ring-2 ring-brand-forest ring-offset-2 scale-110" : "border-brand-clay hover:opacity-85"
                        }`}
                        style={{ backgroundColor: color.previewColor }}
                        title={color.name}
                      >
                        {isSelected && (
                          <span className={`w-2 h-2 rounded-full ${color.id === 'cream' ? 'bg-brand-charcoal' : 'bg-brand-cream'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="font-mono text-[10px] text-brand-taupe uppercase italic">
                  {selectedColor.caption}
                </p>
              </div>

              {/* Option 2: Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs tracking-wider uppercase font-mono font-medium text-brand-charcoal/70">
                    Select Size
                  </label>
                  <button 
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-xs text-brand-forest hover:underline font-bold cursor-pointer"
                  >
                    Size Chart
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {(["S", "M", "L", "XL", "XXL"] as const).map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`font-mono text-sm py-3 rounded-xl border font-bold transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-brand-forest text-white border-brand-forest shadow-sm"
                            : "bg-[#FAF9F6] border-brand-clay text-brand-charcoal/75 hover:bg-brand-clay/30"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {showSizeChart && (
                  <div className="bg-[#FAF9F6] p-4 rounded-xl border border-brand-clay text-xs space-y-2 animate-fade-in font-sans select-none">
                    <p className="font-bold border-b border-brand-clay pb-1 text-[10px] font-mono tracking-widest uppercase text-brand-charcoal">Measurements (Chest Width / Lgth)</p>
                    <div className="grid grid-cols-2 gap-y-1 text-brand-taupe">
                      <span>Small (S):</span> <span className="font-mono text-right font-semibold">20" Chest / 28" Length</span>
                      <span>Medium (M):</span> <span className="font-mono text-right font-semibold">22" Chest / 29" Length</span>
                      <span>Large (L):</span> <span className="font-mono text-right font-semibold">24" Chest / 30" Length</span>
                      <span>X-Large (XL):</span> <span className="font-mono text-right font-semibold">26" Chest / 31" Length</span>
                      <span>XX-Large (XXL):</span> <span className="font-mono text-right font-semibold">28" Chest / 32" Length</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Options */}
              <div className="flex items-center space-x-4">
                <div className="space-y-2">
                  <label className="text-xs tracking-wider uppercase font-mono font-medium text-brand-charcoal/70 block">
                    Qty
                  </label>
                  <div className="flex items-center border border-brand-clay rounded-xl bg-[#FAF9F6]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-brand-charcoal/80 hover:bg-brand-clay/35 rounded-l-xl transition-all font-mono font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 font-mono font-bold text-center text-brand-charcoal select-none min-w-[32px]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-brand-charcoal/80 hover:bg-brand-clay/35 rounded-r-xl transition-all font-mono font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <span className="text-xs border-transparent opacity-0 text-brand-charcoal select-none block">-</span>
                  <button
                    onClick={handleAddToCartClick}
                    className="w-full flex items-center justify-center space-x-2.5 bg-brand-forest hover:bg-brand-forest/90 text-white py-3.5 px-6 rounded-full font-sans font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FAF9F6]" />
                    <span>Purchase & Partner</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Campaign disclosure statement */}
            <p className="font-sans text-[11px] text-brand-charcoal/50 leading-relaxed border-t border-brand-clay/40 pt-4">
              <strong>Charitable Statement:</strong> 4250 Sowers Foundation is an ecumenical Christian non-profit organization registered under section 501(c)(3). In compliance with charity guidelines, $17.00 of your $35.00 purchase of the Hollow & Found T-Shirt qualifies as an immediate tax-deductible donation. Digital receipts issued promptly.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
