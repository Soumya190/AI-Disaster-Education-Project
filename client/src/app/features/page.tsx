import React from 'react';
import { NavLink } from 'react-router-dom';

// Interfaces for our core app module features
interface FeatureCardProps {
  icon: string;
  badge: string;
  title: string;
  description: string;
  colorClass: string;
  path: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, badge, title, description, colorClass, path }) => {
  return (
    <NavLink 
      to={path}
      className="group relative block w-full text-left bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
    >
      {/* Absolute background accent hint on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] ${colorClass} blur-xl -z-10 pointer-events-none`} />
      
      <div className="flex items-start justify-between mb-6">
        <div className="text-3xl p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">
          {badge}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors flex items-center gap-2">
        {title}
        {/* Animated directional hint */}
        <span className="text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-400">→</span>
      </h3>
      
      <p className="text-white/60 text-sm leading-relaxed font-light">
        {description}
      </p>
    </NavLink>
  );
};

const FeaturesPage: React.FC = () => {
  // Configured local routing paths for each core app module
  const coreFeatures = [
    {
      icon: "📚",
      badge: "Education",
      title: "Disaster Learning Modules",
      description: "Interactive, data-driven courses detailing various natural hazards. Understand structural vulnerability, atmospheric physics, and actionable science behind global weather anomalies.",
      colorClass: "from-blue-500/10 via-transparent to-transparent",
      path: "/modules" 
    },
    {
      icon: "🚨",
      badge: "Real-time",
      title: "Instant Warning Alerts",
      description: "Low-latency streaming telemetry that pushes localized severe weather warnings and structural anomaly alerts directly to your console before disaster impacts.",
      colorClass: "from-red-500/10 via-transparent to-transparent",
      path: "/alerts"
    },
    {
      icon: "🕹️",
      badge: "Simulation",
      title: "Virtual Response Drills",
      description: "Immersive simulated scenario models designed to evaluate rapid response procedures, evacuation times, and emergency resource management matrices.",
      colorClass: "from-emerald-500/10 via-transparent to-transparent",
      path: "/drills"
    },
    {
      icon: "📊",
      badge: "Analytics",
      title: "Preparedness Diagnostics",
      description: "Comprehensive multi-layered assessments that evaluate your localized infrastructure integrity and personal defense plans against predictive emergency frameworks.",
      colorClass: "from-teal-500/10 via-transparent to-transparent",
      path: "/analysis"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-teal-500/30">
      
      {/* Cohesive Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-teal-950/20 rounded-full blur-[140px] animate-[pulse_12s_infinite_alternate]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-20 flex flex-col justify-center min-h-screen">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-950/30 text-teal-300 text-xs font-semibold tracking-widest uppercase mb-4">
            System Capabilities
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-teal-400">
            Engineered for Extreme Resilience.
          </h1>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            Our multi-modular engine balances advanced spatial awareness with dynamic proactive readiness data to safely insulate localized operations.
          </p>
        </div>

        {/* Clickable Feature Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          {coreFeatures.map((feature, idx) => (
            <FeatureCard 
              key={idx}
              icon={feature.icon}
              badge={feature.badge}
              title={feature.title}
              description={feature.description}
              colorClass={feature.colorClass}
              path={feature.path}
            />
          ))}
        </div>

        {/* Action footer link option */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/5 pt-8 text-sm text-white/40 animate-in fade-in duration-1000 delay-300">
          <div>Select a module card above to launch operational details.</div>
          <NavLink 
            to="/docs"
            className="hover:text-teal-300 text-white/60 font-medium transition-colors flex items-center gap-1 group focus:outline-none"
          >
            Explore Documentation Matrix <span className="group-hover:translate-x-1 transition-transform">→</span>
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default FeaturesPage;