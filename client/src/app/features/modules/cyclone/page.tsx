import { useState } from 'react';
import { Wind, ShieldAlert, Compass, Activity, CheckCircle2, XCircle, RefreshCw, ChevronRight, Zap } from 'lucide-react';

const cycloneQuestions = [
    {
        id: 1,
        question: "What is the calm region in the center of a tropical cyclone called?",
        options: [
            "The Gust Zone",
            "The Eye",
            "The Vorticity Core",
            "The Apex"
        ],
        correctAnswer: 1,
        explanation: "The Eye is a circular area of light winds and clear skies at the cyclone's center, surrounded by the violent winds of the Eyewall."
    },
    {
        id: 2,
        question: "What items should be stored in an emergency supply kit prior to landfall?",
        options: [
            "1 gallon of water per person per day, non-perishable food, flashlight, and first-aid kit",
            "Heavy electrical tools and generator fuel inside living quarters",
            "Standard garden hoses and extra window glass",
            "Fresh perishable produce for 1 month"
        ],
        correctAnswer: 0,
        explanation: "A standard disaster kit requires 3–7 days of non-perishable food, 1 gallon of water per person daily, medical supplies, and offline power banks."
    },
    {
        id: 3,
        question: "What causes the majority of fatalities during a coastal tropical cyclone landfall?",
        options: [
            "Tornado breakouts",
            "Lightning strikes",
            "Storm surge and marine inundation",
            "Structural glass breakage"
        ],
        correctAnswer: 2,
        explanation: "Storm surge—an abnormal rise in sea level pushed ashore by cyclonic winds—is historically the leading cause of cyclone fatalities."
    }
];

const CyclonesPage = () => {
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
        <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-red-500/30 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-red-500/10 via-rose-500/5 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase mb-4">
                        <Wind className="w-4 h-4 animate-spin-slow" />
                        Atmospheric Dynamics & Marine Telemetry
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                        Tropical Cyclone Readiness
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400">
                        Analyze barometric drop patterns, storm surge modeling, and structural wind mitigation techniques.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Saffir-Simpson</div>
                            <div className="text-lg font-bold text-white">Categories 1 to 5</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                            <Compass className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Primary Hazard</div>
                            <div className="text-lg font-bold text-white">Storm Surge & Gale Winds</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Defense Protocol</div>
                            <div className="text-lg font-bold text-white">Shutter & Interior Shelter</div>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                        <Zap className="w-5 h-5 text-red-400" />
                        <h2 className="text-2xl font-bold text-white">Interactive Cyclone Diagnostics</h2>
                    </div>

                    <div className="space-y-6">
                        {cycloneQuestions.map((q) => {
                            const isAnswered = showResults[q.id];
                            const selectedOpt = selectedAnswers[q.id];

                            return (
                                <div key={q.id} className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <h3 className="text-lg font-bold text-white flex items-start gap-3">
                                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-extrabold shrink-0 mt-0.5">
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
                                            let buttonStyle = "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-red-500/30";
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
                                            <strong className="text-red-400 font-semibold">Explanation: </strong>{q.explanation}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-red-950/20 via-slate-900/60 to-slate-900/40 border border-red-500/20 rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-red-400" /> Cyclone Operational Checklist
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><span><strong>Cover Openings:</strong> Install storm shutters or plywood over structural windows.</span></li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><span><strong>Beware Eye Illusion:</strong> Skies clear during the eye, but severe winds resume instantly in reverse direction.</span></li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><span><strong>Generators Outside:</strong> Keep fuel generators at least 20 feet away from windows to prevent CO poisoning.</span></li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><span><strong>Obey Evacuation Directives:</strong> Leave coastal low zones immediately when orders are issued.</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CyclonesPage;