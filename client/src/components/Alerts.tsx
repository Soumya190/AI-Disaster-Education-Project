import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface AlertItem {
  id: string;
  location: string;
  type: string;
  severity: 'Critical' | 'Warning' | 'Advisory';
  eta: string;
  aiAdvice: string;
}

const Alerts: React.FC = () => {
  const [str, setStr] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStr(e.target.value);
  };

  // Mock Telemetry Streaming Data
  const mockAlerts: AlertItem[] = [
    {
      id: '1',
      location: 'Tokyo, Japan',
      type: 'Seismic Anomaly (Mag 6.2)',
      severity: 'Critical',
      eta: 'Immediate Impact',
      aiAdvice: 'AI Recommendation: Move away from glass facades. Initiate secondary automatic structure isolation dampers immediately.'
    },
    {
      id: '2',
      location: 'Miami, Florida',
      type: 'Flash Flood Surge',
      severity: 'Warning',
      eta: 'In 45 Minutes',
      aiAdvice: 'AI Recommendation: High tide synchronization detected. Relocate communication arrays and vehicles to elevations above 15 feet.'
    },
    {
      id: '3',
      location: 'Raigarh, India',
      type: 'Severe Cloudburst Telemetry',
      severity: 'Warning',
      eta: 'In 20 Minutes',
      aiAdvice: 'AI Recommendation: High local moisture density spikes. Secure power grids and halt all low-ground student transport routes.'
    },
    {
      id: '4',
      location: 'Sydney, Australia',
      type: 'Extreme Thermal Spike',
      severity: 'Advisory',
      eta: 'Ongoing Matrix',
      aiAdvice: 'AI Recommendation: Monitor structural coolant levels. Ensure automated ventilation exhausts are entirely cleared.'
    }
  ];

  // Instant location filter match logic
  const filteredAlerts = mockAlerts.filter(alert =>
    alert.location.toLowerCase().includes(str.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-teal-500/30">
      
      {/* 1. Cohesive Background Aurora Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] bg-red-950/15 rounded-full blur-[140px] animate-[pulse_8s_infinite_alternate]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-teal-950/20 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16 min-h-screen flex flex-col justify-center">
        
        {/* Header telemetry status tracking */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-950/30 text-red-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> Live Telemetry Feed
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-teal-400">
              Active Warnings
            </h1>
          </div>
          
          {/* 2. Upgraded Location Search Input Box */}
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              value={str}
              onChange={handleSearch}  
              placeholder="Search target location..." 
              className="w-full px-5 py-3 pl-12 bg-white/[0.03] backdrop-blur-md text-white placeholder:text-white/30 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all text-sm shadow-inner"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-base">🔍</span>
          </div>
        </div>

        {/* Live Search Indicator String Trace Tag */}
        {str && (
          <div className="mb-6 text-xs tracking-wider text-teal-400/80 animate-fade-in bg-teal-950/20 border border-teal-500/10 px-3 py-1.5 rounded-lg w-fit">
            Filtering radar zone matrices for: <span className="font-bold underline text-white">{str}</span>
          </div>
        )}

        {/* 3. Alerts Live Stream Matrix Grid Container */}
        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="group relative bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-md border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(20,184,166,0.05)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-md border ${
                      alert.severity === 'Critical' 
                        ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                        : alert.severity === 'Warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                    }`}>
                      {alert.severity}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                      {alert.type}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-white/40 sm:text-right">
                    ETA: <span className="text-white font-bold">{alert.eta}</span>
                  </div>
                </div>

                <div className="text-sm font-medium text-white/80 mb-3 flex items-center gap-1.5">
                  <span className="text-white/40 text-xs">📍 Location Matrix:</span> {alert.location}
                </div>

                {/* AI Automated Advisory Box */}
                <p className="text-xs text-teal-300/80 bg-teal-950/20 border border-teal-500/10 p-3 rounded-xl leading-relaxed font-light">
                  {alert.aiAdvice}
                </p>
              </div>
            ))
          ) : (
            // No results radar trace container
            <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
              <div className="text-3xl mb-3">📡</div>
              <p className="text-sm text-white/40 font-light">No anomalous events tracked matching this perimeter scan query.</p>
            </div>
          )}
        </div>

        {/* Footer Navigation Link */}
        <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-white/30 animate-in fade-in duration-1000 delay-200">
          <div>Continuous radar sweep cycle active.</div>
          <NavLink to="/features" className="hover:text-teal-300 transition-colors flex items-center gap-1">
            ← Back to System Modules
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default Alerts;