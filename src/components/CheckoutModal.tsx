import React, { useState } from "react";
import { CartItem, ShirtSize } from "../types";
import { SHIRT_COLORS } from "../data";
import { X, Trash2, Heart, ShieldCheck, Mail, Send, Award, Download, ArrowRight, ClipboardCheck } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CheckoutModalProps) {
  // Extra custom donation amount
  const [extraDonation, setExtraDonation] = useState<number>(10);
  
  // Checkout fields
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [stateCode, setStateCode] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  
  // Fake Card inputs
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExp, setCardExp] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");

  // Processing checkout states
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "billing" | "processing" | "success">("cart");
  const [generatedSerial, setGeneratedSerial] = useState<string>("");

  if (!isOpen) return null;

  // Pricing calculations
  const shirtSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalAmount = shirtSubtotal + extraDonation;

  const handleNextStep = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep("billing");
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address || !city || !stateCode || !zip) return;

    setCheckoutStep("processing");

    // Simulate server side transaction
    setTimeout(() => {
      const uuid = "SOW-" + Math.floor(100000 + Math.random() * 900000) + "-2026";
      setGeneratedSerial(uuid);
      setCheckoutStep("success");
    }, 2800);
  };

  const handleCompleteClose = () => {
    // Reset modal state
    setCheckoutStep("cart");
    setExtraDonation(10);
    setFullName("");
    setEmail("");
    setAddress("");
    setCity("");
    setStateCode("");
    setZip("");
    setCardName("");
    setCardNumber("");
    setCardExp("");
    setCardCvv("");
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end select-none">
      {/* Dark overlay background backdrop */}
      <div 
        className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={checkoutStep === "success" ? handleCompleteClose : onClose}
      />

      {/* Right Drawer Panel Slider */}
      <div className="relative w-full max-w-lg h-full bg-brand-cream shadow-2xl border-l border-brand-clay/60 flex flex-col justify-between z-10 animate-slide-in">
        
        {/* Slider sheet Header block */}
        <div className="p-6 border-b border-[#E5E1D8] flex justify-between items-center bg-white">
          <div className="flex items-center space-x-2.5">
            <Heart className="w-5 h-5 text-brand-forest fill-brand-forest animate-pulse" />
            <div>
              <h3 className="font-serif font-bold text-base text-brand-charcoal">
                {checkoutStep === "success" ? "Partnership Confirmed" : "Sowers Fund Basket"}
              </h3>
              <p className="font-mono text-[9px] text-brand-forest uppercase tracking-widest font-bold">
                Proceeds support 501(c)(3) Ministry
              </p>
            </div>
          </div>
          {checkoutStep !== "success" && (
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg border border-[#E5E1D8] hover:bg-[#FAF9F6] cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-brand-charcoal" />
            </button>
          )}
        </div>

        {/* Dynamic Inner Panel Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: CART REVIEWS */}
          {checkoutStep === "cart" && (
            <>
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <svg className="w-16 h-16 text-brand-taupe/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <div>
                    <h4 className="font-serif font-bold text-brand-charcoal">Your basket is empty</h4>
                    <p className="font-sans text-xs text-brand-taupe mt-1 max-w-xs">
                      Partner with our ministries by configuring and choosing a shirt size from the catalogue!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-brand-forest hover:bg-brand-forest/90 text-white text-xs tracking-wider uppercase font-sans font-bold px-5 py-2.5 rounded-full cursor-pointer"
                  >
                    Return to Catalogue
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cart items loops */}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-brand-taupe font-bold block border-b border-[#E5E1D8] pb-1">Fundraising items</span>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E5E1D8] shadow-xs animate-fade-in">
                        {/* Vector representation indicator */}
                        <div className="h-12 w-12 rounded-xl bg-[#FAF9F6] border border-[#E5E1D8] flex items-center justify-center shrink-0">
                          <svg className="w-8 h-8 text-brand-charcoal" viewBox="0 0 100 100" fill="none">
                            <path d="M33 12 L43 14 L43 17 L57 17 L57 14 L67 12 L87 23 L76 34 L72 32 L72 88 L28 88 L28 32 L24 34 L13 23 Z" fill={item.colorId === 'cream' ? '#fbf9f6' : item.colorId === 'olive' ? '#49533c' : item.colorId === 'slate' ? '#2f3542' : '#9a7a76'} stroke="#23231f" strokeWidth="3" />
                          </svg>
                        </div>

                        {/* Text descriptions */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-bold text-brand-charcoal truncate">
                            Koinonia Fellowship Shirt
                          </h4>
                          <span className="font-mono text-[10px] text-brand-taupe uppercase block">
                            Size {item.size} • {item.colorName}
                          </span>
                        </div>

                        {/* Adjust triggers */}
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <div className="flex items-center border border-[#E5E1D8] rounded-full bg-[#FAF9F6] py-0.5 px-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="font-mono font-bold text-xs text-brand-charcoal hover:bg-[#FAF9F6] rounded-full py-0.5 px-1.5 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs font-bold text-center mx-2 select-none min-w-[14px]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="font-mono font-bold text-xs text-brand-charcoal hover:bg-[#FAF9F6] rounded-full py-0.5 px-1.5 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Remove trigger */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[10px] text-red-500 hover:underline flex items-center space-x-1 cursor-pointer font-sans"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add extra charitable donation option */}
                  <div className="border border-brand-forest/20 bg-brand-forest/5 p-5 rounded-2xl space-y-3.5 mt-8 border-dashed">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-brand-charcoal flex items-center space-x-1.5">
                          <span>Sow an Extra Gift</span>
                        </h4>
                        <p className="font-sans text-[11px] text-brand-taupe mt-1 pr-4 leading-relaxed">
                          By augmenting your order, 100% of these custom parameters goes directly to Koinonia events and commentaries.
                        </p>
                      </div>
                      <span className="text-right font-mono text-xs text-brand-forest font-bold">100% Tax Deduct</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2.5">
                      {[
                        { val: 0, label: "None" },
                        { val: 10, label: "+$10" },
                        { val: 25, label: "+$25" },
                        { val: 50, label: "+$50" }
                      ].map((gift) => (
                        <button
                          key={gift.val}
                          onClick={() => setExtraDonation(gift.val)}
                          className={`font-mono text-xs font-bold py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            extraDonation === gift.val
                              ? "bg-brand-forest text-white border-brand-forest font-bold shadow-xs"
                              : "bg-white border-[#E5E1D8] text-brand-charcoal hover:bg-brand-clay/35"
                          }`}
                        >
                          {gift.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: FILL BILLING & DELIVERY */}
          {checkoutStep === "billing" && (
            <form onSubmit={handleProcessOrder} id="billing-form" className="space-y-6 animate-fade-in">
              <span className="font-mono text-[10px] uppercase tracking-wider text-brand-taupe font-bold block border-b border-[#E5E1D8] pb-1">
                Partner & Delivery Information
              </span>

              {/* Delivery fields structure */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (!cardName) setCardName(e.target.value);
                    }}
                    placeholder="Grace Edwards"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Email Address (For Tax Receipt)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="grace@example.com"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Shipping Home Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="120 Sower Way Lane"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6 space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Chicago"
                      className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                    />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">State</label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      value={stateCode}
                      onChange={(e) => setStateCode(e.target.value.toUpperCase())}
                      placeholder="IL"
                      className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                    />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Zip Code</label>
                    <input
                      type="text"
                      required
                      placeholder="60614"
                      className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                    />
                  </div>
                </div>
              </div>

              {/* simulated checkout fields */}
              <span className="font-mono text-[10px] uppercase tracking-wider text-brand-taupe font-bold block border-b border-[#E5E1D8] pb-1 pt-2">
                Simulated Payment Portal (Safe Trial)
              </span>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Grace Edwards"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">12-Digit dummy credit card</label>
                  <input
                    type="text"
                    required
                    placeholder="4250 5000 8000 9000"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Expiration</label>
                    <input
                      type="text"
                      required
                      placeholder="12 / 29"
                      className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">CVV lock symbol</label>
                    <input
                      type="text"
                      required
                      placeholder="350"
                      className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Security label info */}
              <div className="bg-brand-forest/5 text-brand-forest p-4 rounded-xl border border-brand-forest/10 text-xs flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-brand-forest" />
                <span>
                  <strong>Sandbox Secure:</strong> This is a highly polished fundraiser simulation portal. No actual funds are charged, and your payment details are completely sandboxed on client browser runtime.
                </span>
              </div>
            </form>
          )}          {/* STEP 3: TRANSACTION PROCESSING */}
          {checkoutStep === "processing" && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16 animate-fade-in select-none">
              <div className="relative">
                {/* Custom glowing cross processing circle */}
                <div className="w-16 h-16 border-4 border-brand-forest border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-brand-forest fill-brand-forest animate-pulse" />
                </div>
              </div>
              <div>
                <h4 className="font-serif font-bold text-brand-charcoal text-base">Safely Securing Your Sowers Gift</h4>
                <p className="font-sans text-xs text-brand-taupe mt-1 max-w-xs block">
                  Assigning certification keys and registering your sizes with the Minneapolis distribution facility...
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: CELEBRATION COVENANT CERTIFICATE */}
          {checkoutStep === "success" && (
            <div className="space-y-6 animate-fade-in select-none">
              
              {/* Achievement visual badge */}
              <div className="text-center space-y-2 py-4">
                <div className="w-14 h-14 bg-brand-forest/10 rounded-full flex items-center justify-center mx-auto border border-brand-forest/30">
                  <Award className="w-7 h-7 text-brand-forest" />
                </div>
                <h4 className="font-serif text-xl font-bold tracking-tight text-brand-charcoal">
                  Covenant Sower Enrolled
                </h4>
                <p className="font-sans text-xs text-brand-taupe max-w-xs mx-auto">
                  A digital tax receipt and shipping logistics tracking emails are heading directly to <strong>{email || 'grace@example.com'}</strong>.
                </p>
              </div>

              {/* Interactive downloadable Certificate element */}
              <div className="bg-[#2D2A26] text-[#FAF9F6] p-6 rounded-2xl border-4 border-double border-brand-forest/40 space-y-6 relative overflow-hidden shadow-lg select-none">
                
                {/* Watermark Cross drawing */}
                <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                  <svg className="w-64 h-64 text-[#FAF9F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2v20M5 9h14" />
                  </svg>
                </div>

                <div className="text-center space-y-1">
                  <span className="font-serif text-xs text-brand-forest tracking-widest uppercase block font-bold">
                    Koinonia Fellowship
                  </span>
                  <span className="font-sans text-[9px] text-[#FAF9F6]/60 uppercase tracking-widest font-mono">
                    Official Sowers Covenant Seal
                  </span>
                </div>

                <div className="border-t border-b border-brand-forest/20 py-4 text-center space-y-2 relative">
                  <p className="font-sans text-[10px] text-[#FAF9F6]/50 uppercase tracking-widest font-mono">This credential designates</p>
                  <p className="font-serif text-lg font-bold tracking-wide text-white">{fullName || "Agape Helper"}</p>
                  <p className="font-sans text-[10px] text-[#FAF9F6]/70 leading-relaxed max-w-xs mx-auto pt-1 font-light">
                    as a verified Partner Sower in 2026, helping to fund the distribution of Scripture, community tables, and homeless aid.
                  </p>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono">
                  <div>
                    <span className="text-[#FAF9F6]/40 block uppercase">Serial ID</span>
                    <span className="text-brand-forest font-bold">{generatedSerial}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#FAF9F6]/40 block uppercase">Matched Gift</span>
                    <span className="text-[#FAF9F6] font-bold">${totalAmount}.00 USD</span>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center space-x-2.5 text-[10px] text-[#FAF9F6]/70">
                  <Mail className="w-4 h-4 text-brand-forest flex-shrink-0" />
                  <span>
                    <strong>Your Package:</strong> Includes {cartItems.reduce((s, it) => s + it.quantity, 0)} Koinonia T-Shirt{cartItems.reduce((s, it) => s + it.quantity, 0) > 1 ? 's' : ''} + digital Commentary access key.
                  </span>
                </div>
              </div>

              {/* Utility buttons for certificate download */}
              <div className="flex space-x-2 select-none">
                <button
                  onClick={() => alert(`Certificate downloaded successfully! [Serial Key: ${generatedSerial}]`)}
                  className="flex-1 bg-[#FAF9F6] hover:bg-[#E5E1D8] border border-[#E5E1D8] text-brand-charcoal text-xs tracking-wider uppercase font-sans font-bold py-3 rounded-full flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-brand-forest" />
                  <span>Download PDF Receipt</span>
                </button>
                <button
                  onClick={() => alert(`Registration details and Sower intercessory credentials are copied to your clipboard!`)}
                  className="flex bg-brand-charcoal text-[#FAF9F6] hover:bg-brand-charcoal/90 text-xs tracking-wider uppercase font-sans font-bold p-3 rounded-full items-center justify-center cursor-pointer"
                  title="Copy Certificate Credentials"
                >
                  <ClipboardCheck className="w-5 h-5 text-white" />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Panel Footer Total details */}
        {checkoutStep !== "success" && (
          <div className="p-6 border-t border-[#E5E1D8] bg-white space-y-4">
            
            {/* Split Price breakdowns */}
            {cartItems.length > 0 && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#6B665E]">
                  <span>Koinonia Apparel Subtotal:</span>
                  <span className="font-mono text-brand-charcoal font-semibold">${shirtSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B665E]">
                  <span>Charitable Augmented Gift:</span>
                  <span className="font-mono text-brand-forest font-bold">+${extraDonation.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B665E]">
                  <span>Shipping & Delivery Relief:</span>
                  <span className="font-mono text-green-700 uppercase font-bold">Free Outreach</span>
                </div>
                <div className="flex justify-between text-brand-charcoal text-sm font-bold border-t border-[#E5E1D8] pt-2">
                  <span>Matched Seed Amount:</span>
                  <span className="font-mono text-base text-brand-charcoal">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Step navigation Actions triggers */}
            {checkoutStep === "cart" ? (
              <button
                onClick={handleNextStep}
                disabled={cartItems.length === 0}
                className="w-full flex items-center justify-center space-x-2 bg-brand-forest disabled:bg-[#E5E1D8] disabled:text-brand-charcoal/40 text-[#FAF9F6] py-4 rounded-full font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-sm cursor-pointer"
              >
                <span>Navigate to Sowers Checkout</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setCheckoutStep("cart")}
                  className="px-4 border border-[#E5E1D8] text-brand-charcoal rounded-full text-xs font-sans font-bold hover:bg-[#FAF9F6]/80 cursor-pointer uppercase tracking-wider"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="billing-form"
                  className="flex-1 flex items-center justify-center space-x-2 bg-brand-forest hover:bg-brand-forest/90 text-white py-4 rounded-full font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-sm cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-white fill-white" />
                  <span>Complete Gift & Sow Seed</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Success completion CTA */}
        {checkoutStep === "success" && (
          <div className="p-6 border-t border-[#E5E1D8] bg-white">
            <button
              onClick={handleCompleteClose}
              className="w-full bg-brand-forest hover:bg-brand-forest/90 text-white py-4 rounded-full font-sans font-bold text-xs tracking-widest uppercase transition-colors shadow-sm cursor-pointer"
            >
              Continue Partnership Outreach
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
