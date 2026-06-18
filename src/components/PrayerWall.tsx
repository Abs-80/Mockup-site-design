import React, { useState } from "react";
import { INITIAL_PRAYERS } from "../data";
import { PrayerRequest } from "../types";
import { Heart, Plus, Send, Check, HeartHandshake } from "lucide-react";

export default function PrayerWall() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(INITIAL_PRAYERS);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Form states
  const [creatorName, setCreatorName] = useState<string>("");
  const [targetVerse, setTargetVerse] = useState<string>("");
  const [requestText, setRequestText] = useState<string>("");

  // Helper to dynamically determine appropriate prayer button text
  const getPrayButtonText = (name: string) => {
    const lowerName = name.toLowerCase();
    
    if (
      lowerName.includes("brother") || 
      lowerName.includes("david") || 
      lowerName.includes("marcus") || 
      lowerName.includes("timothy") || 
      lowerName.includes("benjamin") || 
      lowerName.includes("deacon") || 
      lowerName.includes("pastor") ||
      lowerName.includes("thomas")
    ) {
      return "Pray with Brother";
    }
    
    if (
      lowerName.includes("sister") || 
      lowerName.includes("elena") || 
      lowerName.includes("grace") || 
      lowerName.includes("mary") || 
      lowerName.includes("sarah") || 
      lowerName.includes("mrs") || 
      lowerName.includes("miss")
    ) {
      return "Pray with Sister";
    }
    
    if (lowerName.includes("&") || lowerName.includes("and") || lowerName.includes("family")) {
      return "Pray with Family";
    }
    
    // Default fallback to a warm, welcoming, inclusive term
    return "Pray with Sower";
  };

  const handleIncrementPray = (prayerId: string) => {
    setPrayers((prev) =>
      prev.map((pr) => {
        if (pr.id === prayerId) {
          const alreadyPrayed = pr.hasPrayed;
          return {
            ...pr,
            hasPrayed: !alreadyPrayed,
            prayersCount: alreadyPrayed ? pr.prayersCount - 1 : pr.prayersCount + 1
          };
        }
        return pr;
      })
    );
  };

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorName || !requestText) return;

    const newPrayer: PrayerRequest = {
      id: "pr-" + Date.now(),
      name: creatorName,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }),
      verse: targetVerse.trim() || undefined,
      text: requestText,
      prayersCount: 1,
      hasPrayed: true
    };

    setPrayers((prev) => [newPrayer, ...prev]);

    // Clear inputs
    setCreatorName("");
    setTargetVerse("");
    setRequestText("");
    setShowForm(false);
  };

  return (
    <section id="prayers" className="py-16 md:py-24 border-b border-brand-clay/20 bg-brand-cream select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-brand-forest uppercase font-bold block">
            Fellowship Bulletin Board
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal mt-2">
            The Digital Prayer Wall
          </h2>
          <p className="font-sans text-brand-taupe text-sm md:text-base mt-4 font-light leading-relaxed">
            "Bear one another's burdens, and so fulfill the law of Christ." Join our national community network in uplifting daily petitions, celebrating answers to prayer, and registering your own requests.
          </p>
        </div>

        {/* Action Form trigger bar */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-brand-forest hover:bg-brand-forest/90 text-white px-6 py-3.5 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer"
          >
            <span>{showForm ? "Close Form Console" : "Pin a Prayer Request"}</span>
            <Plus className="w-4 h-4 text-white ml-1" />
          </button>
        </div>

        {/* Pin a Prayer submission form layout */}
        {showForm && (
          <div className="max-w-xl mx-auto bg-white border border-[#E5E1D8] p-6 md:p-8 rounded-3xl mb-12 animate-fade-in shadow-sm">
            <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-4 text-center">
              Submit Your Prayer Request
            </h3>
            <form onSubmit={handleSubmitPrayer} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Your Name / Alias</label>
                  <input
                    type="text"
                    required
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="e.g. Sister Grace"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Verse Reference (Optional)</label>
                  <input
                    type="text"
                    value={targetVerse}
                    onChange={(e) => setTargetVerse(e.target.value)}
                    placeholder="e.g. Galatians 6:2"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Your Petition or Thanksgiving</label>
                <textarea
                  rows={4}
                  required
                  value={requestText}
                  onChange={(setRequest) => setRequestText(setRequest.target.value)}
                  placeholder="Share what is on your heart... we are standing with you in fellowship."
                  className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest resize-none text-brand-charcoal"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-brand-forest text-white hover:bg-brand-forest/90 py-3.5 rounded-full font-sans font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Publish Request & Suffer in Common</span>
              </button>
            </form>
          </div>
        )}

        {/* Dynamic Masonry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prayers.map((prayer) => {
            return (
              <div
                key={prayer.id}
                className="bg-white border border-[#E5E1D8] rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-sm relative overflow-hidden"
              >
                {/* Visual quote overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-clay/10 rounded-bl-full pointer-events-none flex items-center justify-end pr-4 pt-4 opacity-50">
                  <HeartHandshake className="w-10 h-10 text-brand-forest/15" />
                </div>

                <div className="space-y-4">
                  {/* Header metadata */}
                  <div className="flex justify-between items-center bg-[#F2F0EB]/60 -mx-6 -mt-6 md:-mx-8 md:-mt-8 py-3.5 px-6 md:px-8 border-b border-[#E5E1D8] select-none">
                    <div>
                      <span className="font-serif text-sm font-bold text-brand-charcoal block">{prayer.name}</span>
                      <span className="font-mono text-[9px] text-brand-taupe select-none">{prayer.date}</span>
                    </div>

                    {prayer.verse && (
                      <span className="font-mono text-[10px] tracking-wide font-bold uppercase text-brand-forest bg-brand-forest/10 px-3 py-1 rounded-full shrink-0">
                        {prayer.verse}
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-xs md:text-sm text-brand-charcoal/80 leading-relaxed font-light pt-2 whitespace-pre-line">
                    "{prayer.text}"
                  </p>
                </div>

                {/* Pray Action segment */}
                <div className="border-t border-brand-clay pt-4 flex items-center justify-between select-none">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-brand-forest animate-ping"></div>
                    <span className="font-mono text-[10px] text-brand-taupe uppercase font-semibold">
                      Joined by {prayer.prayersCount} intercessors
                    </span>
                  </div>

                  <button
                    onClick={() => handleIncrementPray(prayer.id)}
                    className={`flex items-center space-x-2.5 px-4.5 py-2.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                      prayer.hasPrayed
                        ? "bg-brand-forest text-white border-brand-forest shadow-sm"
                        : "bg-brand-clay/10 border-brand-clay hover:bg-brand-clay/40 text-brand-charcoal/80"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 stroke-[2.5] ${prayer.hasPrayed ? "text-white fill-white" : "text-brand-forest"}`} />
                    <span>{prayer.hasPrayed ? "Fervent Prayer Listed" : getPrayButtonText(prayer.name)}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
