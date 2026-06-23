import React from 'react';
import { NavLink } from 'react-router-dom';

interface VisionBlockProps {
  icon: string;
  title: string;
  description: string;
}

const VisionBlock: React.FC<VisionBlockProps> = ({ icon, title, description }) => (
  <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
    <div className="text-2xl p-3 bg-teal-500/10 text-teal-400 rounded-xl h-fit">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-white mb-1.5">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed font-light">{description}</p>
    </div>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-teal-500/30">
      
      {/* Cohesive Background Aurora Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-teal-950/20 rounded-full blur-[140px] animate-[pulse_12s_infinite_alternate]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-20 min-h-screen flex flex-col justify-center">
        
        {/* Header Introduction */}
        <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-950/30 text-teal-300 text-xs font-semibold tracking-widest uppercase mb-4">
            Our Mission Matrix
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-teal-400">
            Bridging the Crisis Awareness Gap.
          </h1>
          <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
            In critical moments, the difference between danger and safety comes down to immediate, actionable knowledge. Too often, individuals are caught off guard simply due to a lack of clear disaster preparation. We engineered this platform to empower students and communities with defensive structural logic, predictive insights, and automated safety response frameworks.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          
          <VisionBlock 
            icon="🛰️"
            title="Real-Time Telemetry & Warnings"
            description="Stay ahead of sudden events. The platform continuously monitors atmospheric anomalies to deliver streaming, localized early warning data tracking precisely when and how quickly a localized disaster is developing."
          />

          <VisionBlock 
            icon="🧠"
            title="Location-Aware Contextual AI"
            description="An intelligent fallback companion. By analyzing your active coordinates combined with current hyper-local weather parameters, our integrated AI immediately parses live data to output customized, immediate protective checklists."
          />

          <VisionBlock 
            icon="🎮"
            title="Gamified Virtual Response Drills"
            description="Move past boring textbooks. Students cultivate tactical memory by actively navigating real-world threat models through interactive games, scenario modules, and simulated decision trees."
          />

          <VisionBlock 
            icon="📊"
            title="Preparedness Metrics & Analytics"
            description="Track your survival readiness. Dynamic personal charts continuously process data from your training history and drills, visually grading your emergency defense mastery to highlight where you need to improve."
          />

        </div>

        {/* CTA Section */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in duration-1000 delay-300">
          <div className="text-sm text-white/40 max-w-md text-center sm:text-left">
            Ready to replace uncertainty with tactical situational awareness? Dive into the environment.
          </div>
          <NavLink 
            to="/features"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(20,184,166,0.2)] hover:shadow-[0_0_35px_rgba(20,184,166,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 w-full sm:w-auto text-center"
          >
            Explore System Modules
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;