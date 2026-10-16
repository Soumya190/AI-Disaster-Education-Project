import React, { useState } from 'react';
import { SunMedium, ShieldAlert, Sprout, Compass, CheckCircle2, XCircle, RefreshCw, ChevronRight, Award, BarChart3 } from 'lucide-react';
import * as THREE from 'three';

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

const DroughtsPage: React.FC = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
    const [showResults, setShowResults] = useState<Record<number, boolean>>({});

    const mountRef = React.useRef<HTMLDivElement | null>(null);
    const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);

    const handleOptionSelect = (qId: number, optionIdx: number) => {
        setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
        setShowResults(prev => ({ ...prev, [qId]: true }));
    };

    const handleReset = (qId: number) => {
        setSelectedAnswers(prev => ({ ...prev, [qId]: null }));
        setShowResults(prev => ({ ...prev, [qId]: false }));
    };

    // Calculate score metrics
    const totalQuestions = droughtQuestions.length;
    const answeredCount = Object.keys(showResults).filter(k => showResults[Number(k)]).length;
    const isTestCompleted = answeredCount === totalQuestions;

    const correctCount = droughtQuestions.reduce((acc, q) => {
        return selectedAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
    }, 0);

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    // Three.js performance score graph rendered when test is completed
    React.useEffect(() => {
        if (!isTestCompleted || !mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x010403);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 4, 10);
        camera.lookAt(0, 1, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(10, 20, 15);
        scene.add(directionalLight);

        // Grid Floor
        const gridHelper = new THREE.GridHelper(15, 15, 0x334155, 0x1e293b);
        gridHelper.position.y = -0.01;
        scene.add(gridHelper);

        // Performance Bar Group
        const barGroup = new THREE.Group();
        scene.add(barGroup);

        const targetHeight = Math.max(0.8, (scorePercentage / 100) * 5.0);
        const barGeometry = new THREE.BoxGeometry(1.5, targetHeight, 1.5);
        
        const barColor = scorePercentage >= 70 ? 0x10b981 : scorePercentage >= 40 ? 0xf59e0b : 0xef4444;
        const barMaterial = new THREE.MeshStandardMaterial({
            color: barColor,
            roughness: 0.2,
            metalness: 0.8,
            emissive: barColor,
            emissiveIntensity: 0.4,
        });

        const barMesh = new THREE.Mesh(barGeometry, barMaterial);
        barMesh.position.set(0, targetHeight / 2, 0);
        barGroup.add(barMesh);

        // Cap ring glow
        const ringGeo = new THREE.BoxGeometry(1.6, 0.15, 1.6);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.8,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.set(0, targetHeight + 0.075, 0);
        barGroup.add(ringMesh);

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            barGroup.rotation.y += 0.006;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (rendererRef.current && rendererRef.current.domElement) {
                rendererRef.current.dispose();
                mountRef.current?.removeChild(rendererRef.current.domElement);
            }
        };
    }, [isTestCompleted, scorePercentage]);

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
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                            <Sprout className="w-5 h-5 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">Drought Mitigation Assessment</h2>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            Progress: {answeredCount} / {totalQuestions} Answered
                        </span>
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

                {/* THREE.JS PERFORMANCE RESULT GRAPH (Appears automatically when all questions are answered) */}
                {isTestCompleted && (
                    <div className="mb-16 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl animate-fade-in">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Assessment Performance Analysis</h3>
                                    <p className="text-xs text-slate-400">Live 3D vector evaluation based on your drought assessment answers</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-extrabold text-emerald-400">{scorePercentage}%</div>
                                <div className="text-xs text-slate-400">{correctCount} of {totalQuestions} Correct</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                            <div className="lg:col-span-7 bg-[#010403] border border-white/5 rounded-2xl overflow-hidden relative shadow-inner">
                                <div ref={mountRef} className="w-full h-[320px]" />
                                <div className="absolute bottom-3 left-3 text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-md">
                                    3D Score Amplitude Pillar
                                </div>
                            </div>

                            <div className="lg:col-span-5 space-y-4">
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4 text-emerald-400" /> Performance Breakdown
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                        {scorePercentage >= 70 
                                            ? "Outstanding work! You have successfully mastered hydrological drought indices, greywater recycling, and land subsidence prevention."
                                            : "Good effort! Review the drought explanations above to strengthen your preparedness for aridification and water scarcity management."}
                                    </p>
                                    <button 
                                        onClick={() => {
                                            setSelectedAnswers({});
                                            setShowResults({});
                                        }}
                                        className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold transition-all flex items-center justify-center gap-2"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" /> Retake Test & Recalibrate 3D Graph
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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