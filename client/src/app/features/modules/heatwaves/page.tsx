import { useState } from 'react';
import { Sun, ShieldAlert, Droplets, Thermometer, CheckCircle2, XCircle, ChevronRight, RefreshCw, Flame } from 'lucide-react';

const heatwaveQuestions = [
    {
        id: 1,
        question: "What is the most important thing to drink during a heatwave?",
        options: [
            "Iced Coffee & Energy Drinks",
            "Plain Water & Electrolytes",
            "Sugary Sodas",
            "Chilled Fruit Juices"
        ],
        correctAnswer: 1,
        explanation: "Plain water and electrolyte solutions keep you hydrated. Drinks high in caffeine, alcohol, or sugar can actually cause your body to lose fluids faster."
    },
    {
        id: 2,
        question: "What are the common early warning signs of heat exhaustion?",
        options: [
            "Chest pain and sudden chills",
            "Heavy sweating, dizziness, headache, and nausea",
            "Extreme joint pain and coughing",
            "Numbness in hands and feet"
        ],
        correctAnswer: 1,
        explanation: "Heavy sweating, cold or clammy skin, dizziness, headache, and nausea are classic warning signs. If ignored, heat exhaustion can escalate into life-threatening heat stroke."
    },
    {
        id: 3,
        question: "Which of the following is the best way to keep a home cool without power?",
        options: [
            "Keep all windows open wide all day",
            "Block direct sunlight using dark curtains or blinds during peak hours",
            "Use heavy woolen blankets over windows",
            "Turn on all lights and electronic devices"
        ],
        correctAnswer: 1,
        explanation: "Blocking direct solar radiation during the hottest daytime hours prevents solar heat gain inside living spaces."
    }
];

const HeatwavesPage = () => {
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
        <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-orange-500/30 py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Heat Glow Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wide uppercase mb-4">
                        <Sun className="w-4 h-4 animate-spin-slow" />
                        Extreme Heat & Climate Safety
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                        Heatwave Awareness & Safety
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400">
                        Understand physiological vulnerabilities, emergency hydration protocols, and heat illness mitigation during extreme thermal events.
                    </p>
                </div>

                {/* Quick Hazard Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                            <Thermometer className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Core Risk</div>
                            <div className="text-lg font-bold text-white">Hyperthermia</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                            <Droplets className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Primary Defense</div>
                            <div className="text-lg font-bold text-white">Hydration & Cooling</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-semibold">Vulnerable Groups</div>
                            <div className="text-lg font-bold text-white">Seniors & Children</div>
                        </div>
                    </div>
                </div>


                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                        <Flame className="w-5 h-5 text-orange-400" />
                        <h2 className="text-2xl font-bold text-white">Interactive Knowledge Assessment</h2>
                    </div>

                    <div className="space-y-6">
                        {heatwaveQuestions.map((q) => {
                            const isAnswered = showResults[q.id];
                            const selectedOpt = selectedAnswers[q.id];

                            return (
                                <div
                                    key={q.id}
                                    className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <h3 className="text-lg font-bold text-white flex items-start gap-3">
                                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-extrabold shrink-0 mt-0.5">
                                                Q{q.id}
                                            </span>
                                            {q.question}
                                        </h3>

                                        {isAnswered && (
                                            <button
                                                onClick={() => handleReset(q.id)}
                                                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                                                title="Reset Question"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Options List */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                        {q.options.map((opt, idx) => {
                                            let buttonStyle = "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-orange-500/30";

                                            if (isAnswered) {
                                                if (idx === q.correctAnswer) {
                                                    buttonStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold";
                                                } else if (selectedOpt === idx) {
                                                    buttonStyle = "bg-rose-500/10 border-rose-500/40 text-rose-300 font-semibold";
                                                } else {
                                                    buttonStyle = "bg-white/[0.01] border-white/5 text-slate-500 opacity-50";
                                                }
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    disabled={isAnswered}
                                                    onClick={() => handleOptionSelect(q.id, idx)}
                                                    className={`flex items-center justify-between p-4 rounded-xl border text-sm text-left transition-all duration-200 ${buttonStyle}`}
                                                >
                                                    <span>{opt}</span>
                                                    {isAnswered && idx === q.correctAnswer && (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                                                    )}
                                                    {isAnswered && selectedOpt === idx && idx !== q.correctAnswer && (
                                                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Explanation Block */}
                                    {isAnswered && (
                                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed animate-in fade-in duration-300">
                                            <strong className="text-orange-400 font-semibold">Explanation: </strong>
                                            {q.explanation}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Essential Action Protocols */}
                <div className="bg-gradient-to-r from-orange-950/20 via-slate-900/60 to-slate-900/40 border border-orange-500/20 rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-orange-400" /> Essential Survival Rules
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                        <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                            <span><strong>Stay Indoors:</strong> Limit direct sun exposure between 11:00 AM and 4:00 PM.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                            <span><strong>Cool Coverings:</strong> Apply damp cloths or cool towels to skin and pulse points.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                            <span><strong>Check Vehicles:</strong> Never leave children or pets inside parked vehicles under any circumstance.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                            <span><strong>Recognize Heat Stroke:</strong> High body temp (&gt;103°F/39.4°C), hot red skin, confusion, or loss of consciousness requires <strong>immediate emergency medical assistance</strong>.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default HeatwavesPage;