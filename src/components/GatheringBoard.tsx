import React, { useState } from "react";
import { GATHERING_EVENTS } from "../data";
import { GatheringEvent } from "../types";
import { Calendar, MapPin, Users, Heart, BookOpen, PlusCircle, CheckCircle, Check, Info } from "lucide-react";

export default function GatheringBoard() {
  const [events, setEvents] = useState<GatheringEvent[]>(GATHERING_EVENTS);
  const [filter, setFilter] = useState<string>("all");
  const [showHostForm, setShowHostForm] = useState<boolean>(false);

  // Form states
  const [hostName, setHostName] = useState<string>("");
  const [hostCity, setHostCity] = useState<string>("");
  const [hostState, setHostState] = useState<string>("");
  const [hostEmail, setHostEmail] = useState<string>("");
  const [successHostMessage, setSuccessHostMessage] = useState<string | null>(null);

  const handleRegisterEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const registered = !ev.registered;
          const participants = registered ? ev.participants + 1 : ev.participants - 1;
          return { ...ev, registered, participants };
        }
        return ev;
      })
    );
  };

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostName || !hostCity || !hostState || !hostEmail) return;

    setSuccessHostMessage(`Outstanding news, ${hostName}! Your 'Hollow & Found Table' proposal has been filed. We are mailing your physical Fellowship dinner guide and micro-grant applications pack in 3 business days!`);
    
    // Clear inputs
    setHostName("");
    setHostCity("");
    setHostState("");
    setHostEmail("");

    setTimeout(() => {
      setSuccessHostMessage(null);
      setShowHostForm(false);
    }, 9000);
  };

  const filteredEvents = events.filter((ev) => {
    if (filter === "all") return true;
    return ev.category === filter;
  });

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case "study": return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      case "fellowship": return "bg-brand-forest/10 text-brand-forest border-brand-forest/20";
      case "service": return "bg-red-500/10 text-red-700 border-red-500/20";
      default: return "bg-brand-clay text-brand-charcoal";
    }
  };

  return (
    <section id="gatherings" className="py-16 md:py-24 border-b border-brand-clay/20 bg-brand-clay/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs tracking-[0.2em] text-brand-forest uppercase font-bold block mb-2">
              Bringing People Together
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal mt-2">
              Hollow & Found Table Gatherings
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-sans text-brand-taupe text-sm md:text-base leading-relaxed font-light">
              We believe faith is fully realized around a common table. Check out our national event directory or learn how to establish a microhouse church table in your zip code.
            </p>
          </div>
        </div>

        {/* Filters and Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Category Filter list */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Gatherings" },
              { id: "fellowship", label: "Fellowship Dinners" },
              { id: "study", label: "Bible Study Guides" },
              { id: "service", label: "Service Missions" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`text-xs px-4 py-2 rounded-xl font-medium border cursor-pointer transition-all ${
                  filter === f.id
                    ? "bg-brand-forest border-brand-forest text-white font-bold"
                    : "bg-white border-brand-clay text-brand-charcoal/80 hover:bg-brand-clay/35"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Setup table Action */}
          <button
            onClick={() => {
              setShowHostForm(!showHostForm);
              setSuccessHostMessage(null);
            }}
            className="flex items-center space-x-2 bg-brand-forest hover:bg-brand-forest/90 text-white px-5 py-2.5 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Host A Table Group</span>
          </button>
        </div>

        {/* Conditional Expand: Setup house fellowship table group form */}
        {showHostForm && (
          <div className="mb-12 bg-white border border-[#E5E1D8] rounded-3xl p-6 md:p-8 animate-fade-in relative z-10 shadow-sm max-w-3xl mx-auto">
            <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">
              Establish a Local Hollow & Found Table
            </h3>
            <p className="font-sans text-xs text-brand-taupe leading-relaxed mb-6">
              When you establish a table, we provide a $150 startup micro-grant for food support, send weekly scripture discussion pamphlets, and list your group (publicly or privately) so local seekers can find refuge.
            </p>

            {successHostMessage ? (
              <div className="bg-green-50 rounded-2xl p-5 border border-green-200 text-green-800 text-xs md:text-sm flex items-start space-x-3.5 leading-relaxed">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <span className="font-bold underline block mb-1">Partnership Confirmed!</span>
                  <span>{successHostMessage}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleHostSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="e.g. Deacon Thomas"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-3.5 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={hostEmail}
                    onChange={(e) => setHostEmail(e.target.value)}
                    placeholder="deacon@fellowship.org"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-3.5 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">Home City</label>
                  <input
                    type="text"
                    required
                    value={hostCity}
                    onChange={(e) => setHostCity(e.target.value)}
                    placeholder="e.g. Dallas"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-3.5 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-semibold">State (US)</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={hostState}
                    onChange={(e) => setHostState(e.target.value.toUpperCase())}
                    placeholder="e.g. TX"
                    className="w-full bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl px-3.5 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-brand-charcoal text-white hover:bg-brand-charcoal/90 py-3 rounded-full font-sans text-xs tracking-widest font-bold uppercase transition-all cursor-pointer"
                  >
                    Submit Host Petition & Request Sower Guide
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Directory Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => {
            return (
              <div
                key={ev.id}
                className="bg-white border border-[#E5E1D8] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm hover:translate-y-[-2px] transition-all"
              >
                {/* Event Category Badge & Register Progress ratio */}
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${getCategoryBadgeColor(ev.category)}`}>
                    {ev.category === 'study' ? 'Bible Study' : ev.category === 'fellowship' ? 'Dinner Table' : 'Service Outreach'}
                  </span>
                  
                  <div className="flex items-center space-x-1 font-mono text-[10px] text-brand-taupe select-none">
                    <Users className="w-3.5 h-3.5" />
                    <span>{ev.participants} attending</span>
                  </div>
                </div>

                {/* Event core info */}
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-brand-charcoal leading-snug line-clamp-1">
                    {ev.title}
                  </h3>
                  <p className="font-sans text-[11px] text-brand-forest font-bold uppercase tracking-wider">
                    Led by {ev.organizer}
                  </p>
                  <p className="font-sans text-xs text-brand-taupe leading-relaxed font-light line-clamp-3">
                    {ev.desc}
                  </p>
                </div>

                {/* Event logistics details */}
                <div className="space-y-2 pt-4 border-t border-brand-clay text-xs text-brand-taupe">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-brand-forest" />
                    <span>{ev.date} at {ev.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-brand-forest" />
                    <span className="line-clamp-1">{ev.location} ({ev.city}, {ev.state})</span>
                  </div>
                </div>

                {/* RSVP Check button state */}
                <button
                  onClick={() => handleRegisterEvent(ev.id)}
                  className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider border transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    ev.registered
                      ? "bg-green-50 border-green-500/20 text-green-700 font-bold"
                      : "bg-[#FAF9F6] border-brand-clay text-brand-charcoal hover:bg-brand-clay/35"
                  }`}
                >
                  {ev.registered ? (
                    <>
                      <Check className="w-4 h-4 text-green-600 stroke-[3]" />
                      <span>My Seat is Saved!</span>
                    </>
                  ) : (
                    <span>Reserve Fellowship Seat</span>
                  )}
                </button>

              </div>
            );
          })}
        </div>

        {/* Micro Map helper */}
        <div className="mt-12 bg-[#FAF9F6] border border-[#E5E1D8] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between text-xs text-brand-taupe gap-4">
          <div className="flex items-center space-x-3 text-left">
            <Info className="w-5 h-5 text-brand-forest shrink-0" />
            <span>
              <strong>Note to Seekers:</strong> All home fellowships represent welcoming environments and do not enforce dress codes or structural standards. Bring an open heart, study resources are provided.
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold text-brand-forest shrink-0">
            Acts 2:42 Fellowship Standard
          </span>
        </div>

      </div>
    </section>
  );
}
