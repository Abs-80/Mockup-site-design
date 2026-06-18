import React, { useState } from "react";
import { INITIATIVES } from "../data";
import { BookOpen, Users, Heart, ArrowUpRight, GraduationCap, Compass, HelpCircle } from "lucide-react";
import { Initiative } from "../types";

export default function InitiativesTabs() {
  const [activeTab, setActiveTab] = useState<string>("learn");

  const getIcon = (name: string, className: string) => {
    switch (name) {
      case "BookOpen": return <BookOpen className={className} />;
      case "Users": return <Users className={className} />;
      case "Heart": return <Heart className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  const activeInitiative = INITIATIVES.find((i) => i.id === activeTab) || INITIATIVES[0];

  return (
    <section id="initiatives" className="py-16 md:py-24 bg-brand-clay/10 border-b border-brand-clay/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs tracking-[0.2em] text-brand-forest uppercase font-bold block mb-2">
              Where Your Donation Flows
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal mt-2">
              Our Core Healing Initiatives
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-sans text-brand-taupe text-sm md:text-base leading-relaxed font-light">
              We focus on cultivating a mature understanding of biblical teachings, removing obstacles to real community gatherings, and providing immediate local relief where hunger and hardship reside.
            </p>
          </div>
        </div>

        {/* Dynamic Interactive Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Tabs Selector list (Col Span 4) */}
          <div className="lg:col-span-4 space-y-3">
            {INITIATIVES.map((initiative) => {
              const isSelected = activeTab === initiative.id;
              return (
                <button
                  key={initiative.id}
                  onClick={() => setActiveTab(initiative.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border flex items-center space-x-4 cursor-pointer relative group ${
                    isSelected
                      ? "bg-brand-forest text-white border-brand-forest shadow-md"
                      : "bg-[#FAF9F6] text-brand-charcoal/80 border-brand-clay/60 hover:bg-brand-clay/30"
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-colors shrink-0 ${
                    isSelected ? "bg-white text-brand-forest" : "bg-brand-clay/50 text-brand-forest group-hover:bg-brand-clay"
                  }`}>
                    {getIcon(initiative.iconName, "w-6 h-6")}
                  </div>
                  <div>
                    <span className={`font-mono text-[9px] tracking-[0.15em] uppercase block ${
                      isSelected ? "text-brand-cream" : "text-brand-forest"
                    }`}>
                      {initiative.badge}
                    </span>
                    <span className="font-serif text-base font-bold tracking-tight block mt-0.5">
                      {initiative.title}
                    </span>
                  </div>
                  {!isSelected && (
                    <ArrowUpRight className="w-4 h-4 text-brand-charcoal/30 absolute top-4 right-4 group-hover:text-brand-forest transition-colors" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Detail Display Board (Col Span 8) */}
          <div className="lg:col-span-8 bg-white border border-[#E5E1D8] p-6 md:p-10 rounded-3xl space-y-8 shadow-sm">
            
            {/* Upper Badge & Metrics Grid */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-brand-clay pb-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-wide text-brand-forest px-3 py-1 bg-brand-forest/10 rounded-full">
                  {activeInitiative.badge}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal mt-3">
                  {activeInitiative.title}
                </h3>
                <p className="font-sans text-brand-forest text-sm font-medium mt-1">
                  {activeInitiative.tagline}
                </p>
              </div>

              {/* Major Key Metric Badge */}
              <div className="bg-[#F2F0EB] px-5 py-4 rounded-2xl flex flex-col items-center justify-center min-w-[140px] text-center shrink-0">
                <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-brand-charcoal">
                  {activeInitiative.metric}
                </span>
                <span className="font-sans text-[10px] uppercase font-bold text-brand-tauing tracking-wider mt-0.5">
                  {activeInitiative.metricLabel}
                </span>
              </div>
            </div>

            {/* Explanatory blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-brand-forest" />
                  <span>The Scope of Need</span>
                </h4>
                <p className="font-sans text-brand-taupe text-sm leading-relaxed font-light">
                  {activeInitiative.shortDesc}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-brand-forest" />
                  <span>Vision & Sowers Action</span>
                </h4>
                <p className="font-sans text-brand-taupe text-sm leading-relaxed font-light">
                  {activeInitiative.longDesc}
                </p>
              </div>
            </div>

            {/* Custom Interactive Milestone Timeline specific to currently selected initiative */}
            <div className="bg-[#FAF9F6] p-5 rounded-2xl space-y-4 border border-brand-clay">
              <h4 className="font-mono text-xs font-bold tracking-widest text-brand-forest uppercase">
                Active Year-to-Date Roadmap Metrics
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeTab === "learn" && (
                  <>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-clay/70">
                      <span className="text-[10px] font-mono uppercase text-brand-taupe block">Bible Apps Built</span>
                      <span className="text-sm font-bold text-brand-charcoal mt-1 block">4 Major Releases</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-clay/70">
                      <span className="text-[10px] font-mono uppercase text-brand-taupe block">Scripture Translations</span>
                      <span className="text-sm font-bold text-brand-charcoal mt-1 block">Greek & Hebrew Interlinear</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-clay/70">
                      <span className="text-[10px] font-mono uppercase text-[#6B665E] block">Sower Seminars</span>
                      <span className="text-sm font-bold text-brand-charcoal mt-1 block">18 Online Panels</span>
                    </div>
                  </>
                )}
                {activeTab === "gather" && (
                  <>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-clay/70">
                      <span className="text-[10px] font-mono uppercase text-brand-taupe block">Dinners Funded</span>
                      <span className="text-sm font-bold text-brand-charcoal mt-1 block">640 Tables Break Bread</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-clay/70">
                      <span className="text-[10px] font-mono uppercase text-brand-taupe block">Fellowship Starter Kits</span>
                      <span className="text-sm font-semibold text-brand-charcoal mt-1 block">350 Distributed Free</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-clay/70">
                      <span className="text-[10px] font-mono uppercase text-brand-taupe block">Small Group Retreats</span>
                      <span className="text-sm font-bold text-brand-charcoal mt-1 block">12 Held Annually</span>
                    </div>
                  </>
                )}
                {activeTab === "serve" && (
                  <>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-clay/70">
                      <span className="text-[10px] font-mono uppercase text-brand-taupe block">Hot Meals Logged</span>
                      <span className="text-sm font-bold text-brand-charcoal mt-1 block">42,500 Served</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-clay/70">
                      <span className="text-[10px] font-mono uppercase text-brand-taupe block">Outreach Congregations</span>
                      <span className="text-sm font-semibold text-brand-charcoal mt-1 block">85 Small Churches</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-clay/70">
                      <span className="text-[10px] font-mono uppercase text-brand-taupe block">Winter Kits Handed</span>
                      <span className="text-sm font-bold text-brand-charcoal mt-1 block">1,820 Insulated Kits</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Support trigger */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-clay pt-6">
              <span className="font-sans text-xs text-brand-taupe text-center sm:text-left">
                Every single purchased shirt generates <strong>$17.00</strong> of straight funding towards these Year-to-Date goals.
              </span>
              <button 
                onClick={() => {
                  const element = document.getElementById("shirt");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-brand-forest text-white hover:bg-brand-forest/90 px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Buy A Shirt & Fund This
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
