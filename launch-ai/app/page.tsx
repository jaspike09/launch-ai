"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Zap, Target, TrendingUp, Mail } from 'lucide-react';

export default function LandingPage() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const router = useRouter();

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation of AI scoring logic
    setTimeout(() => {
      const calculatedScore = Math.floor(Math.random() * (95 - 40 + 1)) + 40;
      setScore(calculatedScore);
      setLoading(false);
    }, 2000);
  };

  const startTrial = () => {
    // Save trial start date to local storage
    localStorage.setItem("launchAI_trial_start", new Date().toISOString());
    localStorage.setItem("user_email", email);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Hero Section */}
      <nav className="p-6 flex justify-between items-center border-b border-slate-800">
        <h1 className="text-2xl font-black tracking-tighter text-blue-500">LAUNCH AI</h1>
        <button onClick={() => router.push('/dashboard')} className="text-sm font-medium hover:text-blue-400">Login</button>
      </nav>

      <main className="max-w-4xl mx-auto pt-20 px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
          Your Idea is a Score. <br/>Our Board Makes it a Business.
        </h2>
        <p className="text-slate-400 text-xl mb-12">Stop guessing. Get a real-time Market Survival Score and a 30-day execution roadmap.</p>

        {!score ? (
          <form onSubmit={handleValidate} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
            <textarea 
              placeholder="Describe your business idea in detail..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 mb-4 h-32 focus:border-blue-500 outline-none transition"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition flex justify-center items-center gap-2"
            >
              {loading ? "Analyzing Market Data..." : <><Zap size={18}/> Analyze My Idea</>}
            </button>
          </form>
        ) : (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="bg-slate-900 p-10 rounded-3xl border-2 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              <h3 className="text-2xl font-bold mb-2">Market Survival Score</h3>
              <div className="text-8xl font-black text-blue-500 mb-6">{score}/100</div>
              
              <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                <div className="bg-slate-950 p-3 rounded-lg flex items-center gap-2"><Target size={16} className="text-green-400"/> Demand: High</div>
                <div className="bg-slate-950 p-3 rounded-lg flex items-center gap-2"><ShieldAlert size={16} className="text-yellow-400"/> Entry: Medium</div>
                <div className="bg-slate-950 p-3 rounded-lg flex items-center gap-2"><TrendingUp size={16} className="text-blue-400"/> Scalability: 8.5/10</div>
                <div className="bg-slate-950 p-3 rounded-lg flex items-center gap-2"><Mail size={16} className="text-purple-400"/> Problems Solved: 3</div>
              </div>

              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email to unlock your 7-Day Free Trial" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  onClick={startTrial}
                  className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-slate-200 transition"
                >
                  START 30-DAY JOURNEY (7 DAYS FREE)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}