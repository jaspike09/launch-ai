'use client';
import { useState, useEffect } from 'react';

export default function WarRoomDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  // Prevent Hydration Errors
  useEffect(() => { setMounted(true); }, []);

  const runMeeting = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const result = await res.json();
      setData(result);
    } catch (e) {
      console.error("Board connection failed", e);
    }
    setLoading(false);
  };

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-slate-50 overflow-hidden font-sans">
      
      {/* 1. THE MENTOR INTERVENTION (The "Shock" Factor) */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-2xl bg-slate-900/50 border border-sky-500/30 p-12 rounded-[2.5rem] shadow-[0_0_100px_rgba(56,189,248,0.15)] animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-sky-500/10 rounded-full flex items-center justify-center border border-sky-500/40 mx-auto mb-8">
              <span className="text-5xl">🧠</span>
            </div>
            <h2 className="text-4xl font-black italic tracking-tighter mb-4">I'M STEPPING IN.</h2>
            <p className="text-sky-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Sovereign Protocol: Active</p>
            <p className="text-slate-300 text-xl leading-relaxed mb-10">
              Founder, your current idea has been flagged for <span className="text-red-400 font-bold underline decoration-red-400/30">Low Margin Potential</span>. 
              We are moving from "Selling Items" to <span className="text-sky-400 font-bold italic text-2xl">Selling Results.</span>
            </p>
            <button 
              onClick={() => setShowOverlay(false)}
              className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-6 rounded-2xl transition-all shadow-[0_20px_40px_rgba(56,189,248,0.3)] active:scale-95 text-sm uppercase tracking-widest"
            >
              Activate Master Architect
            </button>
          </div>
        </div>
      )}

      {/* 2. HEADER */}
      <header className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-black tracking-tighter text-sky-400 italic">LAUNCH<span className="text-white">AI</span></div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Sovereign War Room v2.0</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <div className="text-[10px] text-slate-500 font-bold uppercase">ROI Target</div>
            <div className="text-emerald-400 font-black text-sm">+$39.00 / FOUNDER TIER</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-sky-500/20">
            FB
          </div>
        </div>
      </header>

      {/* 3. MAIN COMMAND CENTER */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
        
        {/* STATS OVERVIEW */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Validation Score</p>
            <p className="text-3xl font-black text-white italic">42% <span className="text-xs text-red-500 ml-2 not-italic underline decoration-red-500/20 underline-offset-4 font-bold tracking-tighter">DEPRECATED</span></p>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Pivot Potential</p>
            <p className="text-3xl font-black text-sky-400 italic">88% <span className="text-xs text-sky-500/50 ml-2 not-italic font-bold tracking-tighter">OPTIMIZED</span></p>
          </div>
          <div className="bg-slate-900/40 border border-sky-500/20 p-6 rounded-3xl backdrop-blur-sm ring-2 ring-sky-500/10">
            <p className="text-[10px] font-bold text-sky-500 uppercase mb-2 font-mono">Days To Revenue</p>
            <p className="text-3xl font-black text-emerald-400 italic">30</p>
          </div>
        </div>

        {/* AGENT GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
          
          {/* THE ARCHITECT (Center Stage) */}
          <div className="lg:col-span-8 bg-slate-900/40 border-2 border-sky-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">Live Synthesis active</span>
            </div>
            <h3 className="text-sky-400 font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-3 italic">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_#38bdf8]" />
              Architect's 30-Day Directive
            </h3>
            <div className="text-slate-200 text-xl leading-relaxed min-h-[300px] whitespace-pre-wrap font-serif italic">
              {loading ? (
                <div className="flex flex-col gap-4 animate-pulse">
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-800 rounded w-1/2" />
                  <div className="h-4 bg-slate-800 rounded w-5/6" />
                </div>
              ) : (
                data?.architect || "Awaiting mission parameters from the Founder..."
              )}
            </div>
          </div>

          {/* THE BOARD (Sidebar) */}
          <div className="lg:col-span-4 space-y-4">
            {data?.board ? data.board.map((m: any) => (
              <div key={m.name} className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl hover:border-sky-500/30 transition-all group">
                <h4 className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-3 group-hover:translate-x-1 transition-transform italic">
                  {m.name} // Analysis
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed italic">{m.text.slice(0, 200)}...</p>
              </div>
            )) : (
              <>
                <div className="bg-slate-900/20 border border-white/5 p-6 rounded-3xl opacity-50 italic text-xs text-slate-600">
                  Mentor standing by for validation...
                </div>
                <div className="bg-slate-900/20 border border-white/5 p-6 rounded-3xl opacity-50 italic text-xs text-slate-600">
                  Coach waiting for traffic strategy...
                </div>
                <div className="bg-slate-900/20 border border-white/5 p-6 rounded-3xl opacity-50 italic text-xs text-slate-600 border-red-500/10">
                  <span className="text-red-500 font-bold not-italic">Validator Status:</span> PIG_BREED_01 DEPRECATED
                </div>
              </>
            )}
          </div>

        </div>
      </main>

      {/* 4. FOOTER COMMAND INPUT */}
      <footer className="p-8 bg-slate-950/80 border-t border-slate-800/50 backdrop-blur-xl fixed bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runMeeting()}
            placeholder="Speak to the Board: Describe your pivot or goal..." 
            className="w-full bg-slate-900/80 border border-slate-700 hover:border-sky-500/50 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-white pr-24 shadow-2xl placeholder:text-slate-600 italic"
          />
          <button 
            onClick={runMeeting}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-sky-500 hover:bg-white text-slate-950 font-black px-6 py-2.5 rounded-xl text-[10px] uppercase tracking-widest transition-all active:scale-90 disabled:opacity-30"
          >
            {loading ? "PROCESSING" : "EXECUTE"}
          </button>
        </div>
      </footer>

    </div>
  );
}
