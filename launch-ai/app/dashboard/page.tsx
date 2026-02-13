"use client";
import React, { useState, useEffect } from 'react';
import { User, MessageSquare, Briefcase, Gavel, Calculator, LineChart, Layout, CheckCircle } from 'lucide-react';

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

  useEffect(() => {
    const start = localStorage.getItem("launchAI_trial_start");
    if (start) {
      const diff = Math.floor((new Date().getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
      setTrialLeft(7 - diff);
    }
  }, []);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200">
      {/* Sidebar - The Board */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white tracking-tighter">THE BOARDROOM</h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">6 Active Directors</p>
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
          <div className="text-xs text-blue-400 font-bold mb-1">FREE TRIAL: {trialLeft} DAYS LEFT</div>
          <button className="w-full bg-blue-600 text-[10px] font-bold py-2 rounded-lg text-white">UPGRADE TO FOUNDER TIER</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-400">Roadmap:</span>
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-600/30">Day {day} of 30</span>
          </div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full ${i < day ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
            ))}
          </div>
        </header>

        {/* Workspace */}
        <section className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
               <div className={`p-4 rounded-2xl bg-slate-900 border border-slate-800 ${activeAgent.color}`}>
                 {activeAgent.icon}
               </div>
               <div>
                 <h2 className="text-3xl font-black text-white">{activeAgent.name}'s Directive</h2>
                 <p className="text-slate-500 italic">"Focus is our primary asset today."</p>
               </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 shadow-xl">
              <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                <CheckCircle size={18}/> YOUR MISSION FOR DAY {day}
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg mb-6">
                Based on your business score, {activeAgent.name} has identified your first bottleneck. 
                Today you need to define your **Minimum Viable Audience**. Who is the *one* person that needs this problem solved right now?
              </p>
              
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center group cursor-pointer hover:border-blue-500 transition">
                  <span>Complete Market Persona Document</span>
                  <div className="h-5 w-5 rounded-full border-2 border-slate-700 group-hover:border-blue-500"></div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center group cursor-pointer hover:border-blue-500 transition">
                  <span>Draft 1-Sentence Value Proposition</span>
                  <div className="h-5 w-5 rounded-full border-2 border-slate-700 group-hover:border-blue-500"></div>
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="relative">
              <input 
                type="text" 
                placeholder={`Ask ${activeAgent.name} a question...`}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 outline-none focus:border-blue-500 pr-16 shadow-2xl"
              />
              <button className="absolute right-4 top-4 bg-blue-600 p-2 rounded-lg hover:bg-blue-500 transition">
                <Zap size={20} className="text-white"/>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}