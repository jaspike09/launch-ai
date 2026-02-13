"use client";
import React, { useState, useEffect } from 'react';
import { User, MessageSquare, Briefcase, Gavel, Calculator, LineChart, Layout, CheckCircle, Zap } from 'lucide-react';

const AGENTS = [
  { id: 'mentor', name: 'MentorAI', role: 'Strategy', icon: <User size={20}/>, color: 'text-blue-400' },
  { id: 'secretary', name: 'SecretaryAI', role: 'Operations', icon: <MessageSquare size={20}/>, color: 'text-green-400' },
  { id: 'lawyer', name: 'LawyerAI', role: 'Legal', icon: <Gavel size={20}/>, color: 'text-red-400' },
  { id: 'accountant', name: 'AccountantAI', role: 'Finance', icon: <Calculator size={20}/>, color: 'text-yellow-400' },
  { id: 'marketing', name: 'MarketingAI', role: 'Growth', icon: <LineChart size={20}/>, color: 'text-purple-400' },
  { id: 'architect', name: 'ArchitectAI', role: 'Systems', icon: <Layout size={20}/>, color: 'text-cyan-400' },
];

export default function Dashboard() {
  const [activeAgent, setActiveAgent] = useState(AGENTS[0]);
  const [day, setDay] = useState(1);
  const [trialLeft, setTrialLeft] = useState(7);
  const [mounted, setMounted] = useState(false); // Prevents Hydration Error #419

  useEffect(() => {
    setMounted(true);
    const start = localStorage.getItem("launchAI_trial_start");
    if (start) {
      const startDate = new Date(start).getTime();
      const now = new Date().getTime();
      const diffInDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
      setTrialLeft(Math.max(0, 7 - diffInDays));
    }
  }, []);

  // If we haven't mounted yet, return a dark screen to prevent hydration flicker
  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200">
      {/* Sidebar - The Board */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white tracking-tighter italic">LAUNCH AI</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Sovereign Boardroom</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setActiveAgent(agent)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${activeAgent.id === agent.id ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'hover:bg-slate-800/50'}`}
            >
              <div className={`${agent.color}`}>{agent.icon}</div>
              <div className="text-left">
                <div className="text-sm font-bold">{agent.name}</div>
                <div className="text-[10px] text-slate-500 uppercase">{agent.role}</div>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-6 bg-blue-900/10 border-t border-blue-900/30">
          <div className="text-[10px] text-blue-400 font-black mb-2 uppercase tracking-tighter">
            {trialLeft > 0 ? `Trial Status: ${trialLeft} Days Remaining` : "Trial Expired"}
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-xs font-black py-3 rounded-lg text-white transition shadow-lg shadow-blue-900/20">
            UPGRADE TO FOUNDER TIER
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-400">Launch Roadmap:</span>
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-600/30">Day {day} of 30</span>
          </div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full ${i < day ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
            ))}
          </div>
        </header>

        <section className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
               <div className={`p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner ${activeAgent.color}`}>
                 {activeAgent.icon}
               </div>
               <div>
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{activeAgent.name}'s Directive</h2>
                 <p className="text-slate-500 text-sm italic">"Precision is the difference between an idea and an empire."</p>
               </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                <CheckCircle size={18}/> MISSION BRIEF: DAY {day}
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg mb-8">
                Your Market Survival Score was high, but {activeAgent.name} has spotted a weakness in your **execution speed**. 
                Today, you must finalize your pricing model. If your margins aren't 3x your cost, AccountantAI will veto this launch.
              </p>
              
              <div className="space-y-3">
                {["Calculate Unit Cost", "Set Value-Based Pricing", "Draft Stripe Invoice Template"].map((task, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex justify-between items-center group cursor-pointer hover:border-blue-500/50 transition">
                    <span className="text-sm font-medium">{task}</span>
                    <div className="h-6 w-6 rounded-full border-2 border-slate-700 group-hover:border-blue-500 transition shadow-inner"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat/Inquiry Interface */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder={`Query ${activeAgent.name}...`}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 outline-none focus:border-blue-500 pr-20 shadow-2xl transition"
              />
              <button className="absolute right-4 top-4 bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition shadow-lg shadow-blue-900/40">
                <Zap size={20} className="text-white fill-white"/>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
