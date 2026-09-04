import{ useState } from 'react';
import { Waves, ShieldAlert, Navigation, Home, CheckCircle2, XCircle, RefreshCw, ChevronRight, Droplet } from 'lucide-react';

const floodQuestions = [
    {
        id: 1,
        question: "What is the safest action during a flash flood warning?",
        options: [
            "Head immediately to high ground or upper levels",
            "Drive fast across flooded roads to escape",
            "Check the basement for valuable items",
            "Wait near riverbanks to observe water levels"
        ],
        correctAnswer: 0,
        explanation: "Flash floods occur rapidly. Seeking high ground immediately saves lives. Driving or entering basements during flash floods carries high mortality risks."
    },
    {
        id: 2,
        question: "How much moving floodwater can sweep away a standard passenger vehicle?",
        options: [
            "6 inches (15 cm)",
            "12 to 24 inches (30–60 cm)",
            "4 feet (1.2 meters)",
            "Only deep river water"
        ],
        correctAnswer: 1,
        explanation: "Just 12 inches of rushing water can float small cars, and 2 feet (24 inches) will carry away almost any SUV or pickup truck."
    },
    {
        id: 3,
        question: "Why should you avoid walking through standing floodwaters?",
        options: [
            "Water is usually too cold",
            "It may hide downed power lines, sharp debris, and sewage contamination",
            "It causes immediate dehydration",
            "It disrupts wildlife navigation systems"
        ],
        correctAnswer: 1,
        explanation: "Floodwaters often carry biological pathogens, electrical current from submerged power lines, and open manholes or hazardous structural debris."
    }
];

const FloodsPage = () => {
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
        <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-blue-500/30 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-4">
                        <Waves className="w-4 h-4 animate-pulse" />
                        Hydrological Hazards & Emergency Preparedness
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                        Flood Safety & Hydraulics
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400">
                        Learn structural water deflection strategies, flood telemetry interpretation, and immediate survival protocols.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <Navigation className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Primary Rule</div>
                            <div className="text-lg font-bold text-white">Turn Around, Don't Drown</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                            <Home className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Evacuation Area</div>
                            <div className="text-lg font-bold text-white">Elevated Structures</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Critical Threat</div>
                            <div className="text-lg font-bold text-white">Flash Surge & Hydrodynamic Force</div>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                        <Droplet className="w-5 h-5 text-blue-400" />
                        <h2 className="text-2xl font-bold text-white">Interactive Flood Assessment</h2>
                    </div>

                    <div className="space-y-6">
                        {floodQuestions.map((q) => {
                            const isAnswered = showResults[q.id];
                            const selectedOpt = selectedAnswers[q.id];

                            return (
                                <div key={q.id} className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <h3 className="text-lg font-bold text-white flex items-start gap-3">
                                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-extrabold shrink-0 mt-0.5">
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
                                            let buttonStyle = "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-blue-500/30";
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
                                            <strong className="text-blue-400 font-semibold">Explanation: </strong>{q.explanation}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-950/20 via-slate-900/60 to-slate-900/40 border border-blue-500/20 rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-blue-400" /> Essential Flood Action Rules
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /><span><strong>Shut off Main Power:</strong> Cut utilities at the main switch before water enters your premises.</span></li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /><span><strong>Avoid Bridges:</strong> Fast-moving water under bridges can wash away structural supports without warning.</span></li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /><span><strong>Avoid Closed Roof Attic Traps:</strong> If trapped in a house, go to the roof only if you can clear an exit hatch.</span></li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /><span><strong>Disinfect Aftermath:</strong> Boil all municipal water after a flood until health authorities confirm safety.</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FloodsPage;