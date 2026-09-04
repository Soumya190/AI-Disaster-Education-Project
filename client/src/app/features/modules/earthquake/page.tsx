import { useState } from 'react';
import { Activity, ShieldAlert, Layers, AlertTriangle, CheckCircle2, XCircle, RefreshCw, ChevronRight } from 'lucide-react';

const earthquakeQuestions = [
  {
    id: 1,
    question: "What is the recommended immediate response when indoors during seismic shaking?",
    options: [
      "Run outdoors immediately into the street",
      "Drop, Cover, and Hold On under a sturdy table",
      "Stand in a doorway or near exterior glass windows",
      "Use elevators to reach the ground floor quickly"
    ],
    correctAnswer: 1,
    explanation: "Dropping to hands and knees, covering head and neck under sturdy furniture, and holding on shields you from falling debris—the primary cause of earthquake injuries."
  },
  {
    id: 2,
    question: "Why should you NOT run outside during active ground shaking in urban areas?",
    options: [
      "Falling facades, shattered window glass, and electrical wires create lethal hazard zones",
      "Outside air pressure drops dangerously",
      "Seismic waves move faster outdoors",
      "Emergency services block exterior exits"
    ],
    correctAnswer: 0,
    explanation: "Building exterior collapse, falling masonry, and glass shards make the immediate perimeter surrounding structures extremely dangerous during shaking."
  },
  {
    id: 3,
    question: "What ground condition occurs when saturated soil loses strength during an earthquake?",
    options: [
      "Tectonic uplifting",
      "Soil Liquefaction",
      "Subduction faulting",
      "Thermal expansion"
    ],
    correctAnswer: 1,
    explanation: "Soil liquefaction converts solid, water-saturated sand/silt into a liquid-like state under cyclic shaking, causing heavy structures to tilt or sink."
  }
];

const EarthquakesPage = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const handleOptionSelect = (qId:any, optionIdx:any) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setShowResults(prev => ({ ...prev, [qId]: true }));
  };

  const handleReset = (qId:any) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: null }));
    setShowResults(prev => ({ ...prev, [qId]: false }));
  };

  return (
    <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-amber-500/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-yellow-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-4">
            <Activity className="w-4 h-4 animate-pulse" />
            Seismology & Structural Dynamics
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Earthquake Readiness & Wave Mechanics
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            Study fault shear mechanics, structural resonance dampening, and rapid duck-and-cover safety procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Wave Progression</div>
              <div className="text-lg font-bold text-white">P-Wave then S-Wave</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Primary Action</div>
              <div className="text-lg font-bold text-white">Drop, Cover, Hold On</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Secondary Threat</div>
              <div className="text-lg font-bold text-white">Aftershocks & Liquefaction</div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <Activity className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Seismic Response Drills</h2>
          </div>

          <div className="space-y-6">
            {earthquakeQuestions.map((q) => {
              const isAnswered = showResults[q.id];
              const selectedOpt = selectedAnswers[q.id];

              return (
                <div key={q.id} className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-lg font-bold text-white flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-extrabold shrink-0 mt-0.5">
                        Q{q.id}
                      </span>
                      {q.question}
                    </h3>
                    {isAnswered && (
                      <button onClick={() => handleReset(q.id)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {q.options.map((opt, idx) => {
                      let buttonStyle = "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-amber-500/30";
                      if (isAnswered) {
                        if (idx === q.correctAnswer) buttonStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold";
                        else if (selectedOpt === idx) buttonStyle = "bg-rose-500/10 border-rose-500/40 text-rose-300 font-semibold";
                        else buttonStyle = "bg-white/[0.01] border-white/5 text-slate-500 opacity-50";
                      }

                      return (
                        <button key={idx} disabled={isAnswered} onClick={() => handleOptionSelect(q.id, idx)} className={`flex items-center justify-between p-4 rounded-xl border text-sm text-left transition-all ${buttonStyle}`}>
                          <span>{opt}</span>
                          {isAnswered && idx === q.correctAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                          {isAnswered && selectedOpt === idx && idx !== q.correctAnswer && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-amber-400 font-semibold">Explanation: </strong>{q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-950/20 via-slate-900/60 to-slate-900/40 border border-amber-500/20 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" /> Earthquake Mitigation Rules
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /><span><strong>Anchor Heavy Items:</strong> Bolt bookshelves, water heaters, and heavy furniture directly to wall studs.</span></li>
            <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /><span><strong>Expect Aftershocks:</strong> Additional shaking usually follows the mainshock; maintain readiness.</span></li>
            <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /><span><strong>Check Gas Lines:</strong> Shut off gas valves immediately if you smell sulfur or hear gas leaks.</span></li>
            <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /><span><strong>Move Away from Fault Slopes:</strong> Watch for rockfalls and coastal tsunami alerts following severe shaking.</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EarthquakesPage;