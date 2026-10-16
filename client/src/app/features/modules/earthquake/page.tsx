import React, { useState } from 'react';
import { Activity, ShieldAlert, Layers, AlertTriangle, CheckCircle2, XCircle, RefreshCw, ChevronRight, Award, BarChart3 } from 'lucide-react';
import * as THREE from 'three';

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

const EarthquakesPage: React.FC = () => {
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
  const totalQuestions = earthquakeQuestions.length;
  const answeredCount = Object.keys(showResults).filter(k => showResults[Number(k)]).length;
  const isTestCompleted = answeredCount === totalQuestions;

  const correctCount = earthquakeQuestions.reduce((acc, q) => {
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
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Seismic Response Drills</h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Progress: {answeredCount} / {totalQuestions} Answered
            </span>
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

        {/* THREE.JS PERFORMANCE RESULT GRAPH (Appears automatically when all questions are answered) */}
        {isTestCompleted && (
            <div className="mb-16 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Seismic Drill Performance Analysis</h3>
                            <p className="text-xs text-slate-400">Live 3D vector evaluation based on your earthquake drill answers</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-extrabold text-amber-400">{scorePercentage}%</div>
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
                                <BarChart3 className="w-4 h-4 text-amber-400" /> Performance Breakdown
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                {scorePercentage >= 70 
                                    ? "Fantastic job! You have fully grasped seismic drop-cover protocols, structural hazards, and soil liquefaction mechanics."
                                    : "Good effort! Review the earthquake explanations above to strengthen your safety instincts against structural collapse and falling debris."}
                            </p>
                            <button 
                                onClick={() => {
                                    setSelectedAnswers({});
                                    setShowResults({});
                                }}
                                className="w-full py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold transition-all flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-3.5 h-3.5" /> Retake Drill & Recalibrate 3D Graph
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

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