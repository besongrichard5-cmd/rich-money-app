"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };
  return (
    <main className="flex flex-col items-center w-full min-h-screen selection:bg-[#0FA8A3] selection:text-white relative">
      {/* HEADER / NAVIGATION */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/richmoney-logo.jpeg" alt="RICH MONEY Logo" width={40} height={40} className="rounded-full shadow-sm" priority />
          <span className="font-extrabold text-xl text-[#0FA8A3] tracking-tight">RICH MONEY</span>
        </div>
        <button 
          onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white border border-gray-200 text-[#1A1A1A] px-5 py-2.5 rounded-full font-medium hover:border-[#0FA8A3] hover:text-[#0FA8A3] transition-all shadow-sm text-sm cursor-pointer"
        >
          Join Waitlist
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="w-full max-w-4xl mx-auto px-6 pt-20 pb-24 text-center flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-8 border border-teal-100 uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          Launching Soon in West Africa
        </div>
        
        <h1 className="relative z-10 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1] drop-shadow-[0_24px_50px_rgba(0,0,0,0.35)]">
          Money that moves <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4EECDC] to-[#0FA8A3]">like Africans do</span>
        </h1>
        
        <p className="relative z-10 text-lg sm:text-xl text-gray-100 mb-12 max-w-2xl leading-relaxed drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]">
          P2P cross-border escrow built for Nigeria 🇳🇬 → Ghana 🇬🇭 → Cameroon 🇨🇲. Your funds stay locked until both sides confirm. No scam. No bank stress.
        </p>
        
        <div className="relative z-10 flex flex-col items-center gap-4 w-full">
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto bg-[#0FA8A3] text-white text-lg px-10 py-4 rounded-full font-bold hover:bg-teal-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ring-4 ring-teal-50 cursor-pointer"
          >
            Join Waitlist
          </button>
          <p className="text-sm text-gray-500 font-medium mt-2">Free to join. Early users get 0% fees for 3 months</p>
        </div>
      </section>

      {/* 3 COLUMNS SECTION */}
      <section className="w-full py-24 border-y border-white/20 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1 */}
            <div className="flex flex-col items-start p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-white/30 hover:bg-white/95 hover:shadow-xl transition-all group">
              <div className="text-4xl mb-6 bg-white/70 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">🇳🇬</div>
              <h3 className="text-xl font-bold mb-3 text-[#111827] drop-shadow-sm">Send Naira, Cedis, CFA in Minutes</h3>
              <p className="text-gray-800 leading-relaxed font-medium">
                Nigeria to Ghana to Cameroon. Naira ↔ Cedis ↔ XAF. No Aboki. No Western Union fees.
              </p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-start p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-white/30 hover:bg-white/95 hover:shadow-xl transition-all group">
              <div className="text-4xl mb-6 bg-white/70 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-[#111827] drop-shadow-sm">Locked Escrow = Zero Scam</h3>
              <p className="text-gray-800 leading-relaxed font-medium">
                Money only moves when both tap Confirm. If one ghosts, funds return.
              </p>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-start p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-white/30 hover:bg-white/95 hover:shadow-xl transition-all group">
              <div className="text-4xl mb-6 bg-white/70 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">🌍</div>
              <h3 className="text-xl font-bold mb-3 text-[#111827] drop-shadow-sm">Built in Lagos for West Africa</h3>
              <p className="text-gray-800 leading-relaxed font-medium">
                We live the CFA/Naira/Cedis wahala daily. West Africa first.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="w-full py-24 bg-[#FAFAFA]/40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1A1A1A] tracking-tight">Secure. Compliant. Built for You</h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {["BVN/NIN/KYC", "BEAC/CBN Compliant", "256-bit Encryption", "Bank + MoMo Partners"].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white px-6 py-4 rounded-full border border-gray-200 shadow-sm font-medium text-gray-700 hover:border-[#0FA8A3] transition-colors cursor-default">
                <svg className="w-5 h-5 text-[#0FA8A3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST SECTION */}
      <section id="waitlist" className="w-full bg-black/80 backdrop-blur-xl pt-24 pb-32 text-white relative border-t border-white/10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] left-[50%] -translate-x-1/2 w-[80%] h-[80%] bg-[#0FA8A3] rounded-full blur-[150px] opacity-20"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">Be First to Move CFA, Cedis & Naira</h2>
            <p className="text-gray-200 text-lg md:text-xl font-medium">Join 247+ founders, traders, students waiting for launch</p>
          </div>
          
          <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-12 shadow-2xl ring-1 ring-white/10 text-center">
            {status === "success" ? (
              <div className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 bg-teal-50 text-[#008080] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🎉</div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">You're in!</h3>
                <p className="text-gray-600 text-lg">We'll email you at launch 🚀</p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-5">
                <input
                  type="email"
                  placeholder="you@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#008080]/20 focus:border-[#008080] text-[#1A1A1A] text-lg disabled:opacity-50 transition-all placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#008080] text-white font-bold py-4 px-6 rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-70 flex items-center justify-center min-h-[60px] text-lg shadow-md hover:shadow-lg"
                >
                  {status === "loading" ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
                {status === "error" && (
                  <p className="text-red-500 font-medium mt-1 animate-in fade-in">Oops! Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black/90 backdrop-blur-xl border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-gray-300 text-sm font-medium">
          <div className="flex items-center gap-3">
            <Image src="/richmoney-logo.jpeg" alt="RICH MONEY Logo" width={24} height={24} className="rounded-full grayscale opacity-70" />
            <span>RICH MONEY © 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://richmoney.vercel.app" className="text-gray-100 hover:text-white transition-colors">richmoney.vercel.app</a>
            <span className="hidden sm:inline opacity-30">•</span>
            <span>Lagos, Nigeria</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
