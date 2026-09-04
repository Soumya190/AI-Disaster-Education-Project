import { useState } from 'react';
import { SunMedium, ShieldAlert, Sprout, Compass, CheckCircle2, XCircle, RefreshCw, ChevronRight } from 'lucide-react';

const droughtQuestions = [
    {
        id: 1,
        question: "What characterizes a hydrological drought?",
        options: [
            "Short-term lack of rainfall over 2 weeks",
            "Depleted water levels in reservoirs, lakes, streams, and groundwater aquifers",
            "High wind velocities with dust storm formation",
            "Immediate crop foliage drying in 24 hours"
        ],
        correctAnswer: 1,
        explanation: "Hydrological drought occurs when low precipitation persists long enough to deplete surface reserves and subsurface groundwater aquifers."
    },
    {
        id: 2,
        question: "What is an effective domestic conservation technique during severe drought restrictions?",
        options: [
            "Running washing machines with half loads",
            "Installing low-flow aerators, repairing faucet leaks, and harvesting greywater",
            "Watering lawns during high-noon heat",
            "Flushing plumbing systems daily with tap water"
        ],
        correctAnswer: 1,
        explanation: "Fixing leaks and recycling greywater (from showers/washing) drastically cuts potable water demand during emergency shortages."
    },
    {
        id: 3,
        question: "How does prolonged groundwater over-pumping exacerbate long-term soil loss?",
        options: [
            "It creates permanent land subsidence and aquifer compaction",
            "It causes soil salinization in high atmosphere zones",
            "It triggers localized tectonic earthquakes",
            "It freezes upper soil horizons"
        ],
        correctAnswer: 0,
        explanation: "When water is drained from unconfined aquifers faster than natural recharge, soil particles collapse, causing non-reversible land subsidence."
    }
];

const DroughtsPage = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
    const [showResults, setShowResults] = useState<Record<number, boolean>>({});

    const handleOptionSelect = (qId: any, optionIdx: any) => {
        setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
        setShowResults(prev => ({ ...prev, [qId]: true }));
    };

    const handleReset = (qId: any) => {
        setSelectedAnswers(prev => ({ ...prev, [qId]: null }));
        setShowResults(prev => ({ ...prev, [qId]: false }));
    };

    return (
        <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-emerald-500/30 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-4">
                        <SunMedium className="w-4 h-4 animate-pulse" />
                        Aridification & Resource Sustainability
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                        Drought & Aquifer Management
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400">
                        Understand precipitation deficits, soil moisture integrity, and water conservation technologies.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <Sprout className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Agricultural Health</div>
                            <div className="text-lg font-bold text-white">Soil Moisture Retention</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
                            <Compass className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Aquifer Monitoring</div>
                            <div className="text-lg font-bold text-white">Subsurface Level Data</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Core Strategy</div>
                            <div className="text-lg font-bold text-white">Greywater & Rationing</div>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                        <Sprout className="w-5 h-5 text-emerald-400" />
                        <h2 className="text-2xl font-bold text-white">Drought Mitigation Assessment</h2>
                    </div>

                    <div className="space-y-6">
                        {droughtQuestions.map((q) => {
                            const isAnswered = showResults[q.id];
                            const selectedOpt = selectedAnswers[q.id];

                            return (
                                <div key={q.id} className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <h3 className="text-lg font-bold text-white flex items-start gap-3">
                                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold shrink-0 mt-0.5">
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
                                            let buttonStyle = "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-emerald-500/30";
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
                                            <strong className="text-emerald-400 font-semibold">Explanation: </strong>{q.explanation}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-slate-900/40 border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-emerald-400" /> Sustainability Rules
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span><strong>Mulch Soil Surfaces:</strong> Cover agricultural beds with organic mulch to cut evapotranspiration.</span></li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span><strong>Harvest Rainwater:</strong> Install cisterns to catch roof runoff during sporadic rain events.</span></li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span><strong>Drip Irrigation:</strong> Direct water straight to roots rather than using overhead sprinklers.</span></li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span><strong>Drought-Tolerant Landscaping:</strong> Replace moisture-demanding lawns with native xeriscaping plants.</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DroughtsPage;