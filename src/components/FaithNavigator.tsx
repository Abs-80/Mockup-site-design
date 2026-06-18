import React, { useState, useEffect, useRef } from "react";
import { ChatMessage, ScriptureResponse } from "../types";
import { Book, HelpCircle, Send, Sparkles, Smile, Shield, Compass, ChevronRight } from "lucide-react";

export default function FaithNavigator() {
  // Scripture states
  const [selectedCategory, setSelectedCategory] = useState<string>("Community");
  const [scripture, setScripture] = useState<ScriptureResponse>({
    verse: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another.",
    reference: "Hebrews 10:24-25",
    reflection: "True Christian discipleship is never isolated. We exist in a beautiful tapestry where faith is kindled, and sharing our lives with others cultivates a deep environment of grace."
  });
  const [loadingScripture, setLoadingScripture] = useState<boolean>(false);

  // Q&A chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      text: "Peace be with you! I am your Koinonia Faith Guide. Ask me anything about Christianity, Scripture history, or how Jesus brings us together in fellowship. What is on your heart today?"
    }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions
  const SUGGESTED_QUESTIONS = [
    "What does the word 'Koinonia' mean?",
    "How does Jesus define love (Agape)?",
    "How were early Christian communities styled in Acts?",
    "Explain what Grace is in the New Testament."
  ];

  // Fetch Scripture on category change
  const fetchScripture = async (cat: string) => {
    setLoadingScripture(true);
    try {
      const res = await fetch("/api/scripture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: cat })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.verse) setScripture(data);
      }
    } catch (err) {
      console.error("Error fetching scripture:", err);
    } finally {
      setLoadingScripture(false);
    }
  };

  useEffect(() => {
    fetchScripture(selectedCategory);
  }, [selectedCategory]);

  // Handle Q&A send
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loadingChat) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      role: "user",
      text: textToSend
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setLoadingChat(true);

    try {
      // Map history for API
      const historyList = chatMessages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/q-and-a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: textToSend, history: historyList })
      });

      if (res.ok) {
        const data = await res.json();
        const modelMsg: ChatMessage = {
          id: "m-" + Date.now(),
          role: "model",
          text: data.text
        };
        setChatMessages((prev) => [...prev, modelMsg]);
      } else {
        throw new Error("API failure");
      }
    } catch (err) {
      console.error("Error in AI Q&A:", err);
      // Fallback message
      setChatMessages((prev) => [
        ...prev,
        {
          id: "m-err-" + Date.now(),
          role: "model",
          text: "I want to apologize—there was an error contacting the theological servers. Let's reflect on the peace of Christ. Feel free to try submitting your question again."
        }
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loadingChat]);

  const scriptureCategories = [
    { id: "Community", label: "Fellowship" },
    { id: "Peace", label: "Grace & Peace" },
    { id: "Anxiety", label: "Comfort In Worry" },
    { id: "Joy", label: "Joy & Hope" },
    { id: "Service", label: "Serving Others" }
  ];

  return (
    <section id="faith" className="py-16 md:py-24 border-b border-brand-clay/20 bg-brand-cream select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-brand-forest uppercase font-bold block">
            Digital Faith Center
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal mt-2">
            Learn, Seek, & Reflect
          </h2>
          <p className="font-sans text-brand-taupe text-sm md:text-base mt-4 font-light">
            An educational portal centered on Christian scripture and teachings. Explore questions of faith with our Gemini-powered theological guide or gather Scripture tailored to your heart's current posture.
          </p>
        </div>

        {/* Double Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Daily Scripture Meditation (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-brand-clay/20 border border-brand-clay p-6 md:p-8 rounded-3xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <Book className="w-5 h-5 text-brand-forest" />
                <h3 className="font-serif text-lg font-bold tracking-tight text-brand-charcoal">
                  Daily Word Generator
                </h3>
              </div>
              <p className="font-sans text-xs text-brand-taupe leading-relaxed">
                Choose a general focus area to reveal a beautiful Scripture verse and associated reflection. Our team feeds this with theological grace guidelines.
              </p>

              {/* Category Toggles List */}
              <div className="flex flex-wrap gap-2 pt-2">
                {scriptureCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-xs px-3.5 py-2.5 rounded-xl font-medium border cursor-pointer transition-all ${
                      selectedCategory === cat.id
                        ? "bg-brand-forest border-brand-forest text-white font-bold"
                        : "bg-white border-brand-clay text-brand-charcoal/80 hover:bg-brand-clay/40"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scripture display card */}
            <div className="flex-1 min-h-[180px] bg-white rounded-2xl p-6 border border-brand-clay flex flex-col justify-between relative shadow-sm">
              {loadingScripture ? (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                  <div className="text-center space-y-2">
                    <div className="w-6 h-6 border-2 border-brand-forest border-t-transparent rounded-full animate-spin mx-auto" />
                    <span className="font-mono text-[10px] text-brand-charcoal/50 uppercase tracking-widest block">Opening Scripture...</span>
                  </div>
                </div>
              ) : null}

              <div className="space-y-4">
                {/* Visual elegant quotation symbol */}
                <span className="font-serif text-4xl text-brand-forest/20 leading-none absolute top-2 left-4">“</span>
                <p className="font-serif text-sm md:text-base text-brand-charcoal italic leading-relaxed pt-2">
                  {scripture.verse}
                </p>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-forest text-right">
                  — {scripture.reference}
                </p>
              </div>

              <div className="border-t border-brand-clay pt-4 mt-4 space-y-1.5 text-brand-charcoal/75 text-xs font-light">
                <span className="font-mono text-[9px] font-bold text-brand-forest uppercase block tracking-wider">Agape Reflection</span>
                <p className="leading-relaxed">
                  {scripture.reflection}
                </p>
              </div>
            </div>

            {/* Micro teaching card */}
            <div className="text-[10px] text-brand-taupe leading-relaxed pt-2 flex items-start space-x-2">
              <Compass className="w-3.5 h-3.5 shrink-0 text-brand-forest" />
              <span>
                All generated verses follow our biblically orthodox, grace-centered teachings. We focus on drawing hearts closer to Christ's humility and nurturing interpersonal unity.
              </span>
            </div>
          </div>

          {/* Right panel: Seekers Christianity Q&A Board (Col span 7) */}
          <div className="lg:col-span-7 bg-white border border-brand-clay rounded-3xl flex flex-col overflow-hidden shadow-sm h-[520px] md:h-[580px]">
            {/* Chat header */}
            <div className="bg-brand-charcoal text-white p-4 px-6 flex items-center justify-between border-b border-brand-charcoal">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-forest flex items-center justify-center">
                  <HelpCircle className="w-4.5 h-4.5 text-white stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold tracking-wide">
                    Christian Fellowship Guide
                  </h3>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-brand-cream">
                      AI Theological Companion
                    </span>
                  </div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-brand-forest animate-pulse" />
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-brand-cream/10">
              {chatMessages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                      isUser
                        ? "bg-brand-forest text-white rounded-br-none shadow-sm"
                        : "bg-brand-clay/35 text-brand-charcoal border border-brand-clay rounded-bl-none"
                    }`}>
                      {!isUser && (
                        <span className="font-mono text-[9px] font-bold text-brand-forest uppercase block mb-1">
                          Theological Guide
                        </span>
                      )}
                      
                      {/* Simple paragraph formatting of model responses */}
                      <p className="whitespace-pre-line font-light">{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {loadingChat && (
                <div className="flex justify-start">
                  <div className="bg-brand-clay/10 border border-brand-clay rounded-2xl rounded-bl-none p-4 max-w-[85%] text-xs space-y-1.5">
                    <span className="font-mono text-[9px] font-bold text-brand-forest uppercase block">
                      Reflecting on scripture
                    </span>
                    <div className="flex items-center space-x-1.5 py-1">
                      <span className="w-2 h-2 rounded-full bg-brand-forest animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 rounded-full bg-brand-forest animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 rounded-full bg-[#2a362d] animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions layout (only if chat lacks heavy contents) */}
            {chatMessages.length === 1 && (
              <div className="p-4 bg-brand-cream/20 border-t border-brand-clay space-y-2 select-none">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-taupe font-bold block mb-1.5">
                  Suggested Learning Prompts
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-[11px] p-2.5 rounded-xl border border-brand-clay bg-white hover:bg-brand-clay/35 text-brand-charcoal/85 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="line-clamp-1">{q}</span>
                      <ChevronRight className="w-3 h-3 text-brand-forest shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(userInput);
              }}
              className="p-3 bg-[#FAF9F6] border-t border-brand-clay flex items-center space-x-2"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about Christian history, Jesus, grace..."
                className="flex-1 bg-white border border-[#E5E1D8] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-brand-forest text-brand-charcoal placeholder-[#6B665E]/60 font-sans"
                disabled={loadingChat}
              />
              <button
                type="submit"
                disabled={loadingChat || !userInput.trim()}
                className="bg-brand-forest disabled:bg-brand-clay disabled:text-brand-charcoal/40 text-white p-3 rounded-xl hover:bg-brand-forest/90 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-[#FAF9F6]" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
