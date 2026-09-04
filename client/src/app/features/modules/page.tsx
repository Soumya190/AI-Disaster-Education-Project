import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const disasterCourses =[
  {
    id: 'flood',
    title: 'Flood Risk & Coastal Safety',
    category: 'Hydrological',
    color: 'from-blue-500 to-cyan-400',
    borderColor: 'border-blue-500/30',
    hoverGlow: 'hover:shadow-blue-500/10',
    accentBg: 'bg-blue-500/10',
    accentText: 'text-cyan-400',
    description: 'Master flood hazard mapping, early warning systems, urban drainage resilience, and emergency response operations.',
  },
  {
    id: 'cyclone',
    title: 'Tropical Cyclones & Storm Surges',
    category: 'Atmospheric',
    color: 'from-teal-500 to-emerald-400',
    borderColor: 'border-teal-500/30',
    hoverGlow: 'hover:shadow-teal-500/10',
    accentBg: 'bg-teal-500/10',
    accentText: 'text-teal-400',
    description: 'Learn storm track prediction, wind-resistant engineering, coastal shelter logistics, and large-scale evacuation strategies.',
  },
  {
    id: 'earthquake',
    title: 'Earthquakes & Structural Mitigation',
    category: 'Geological',
    color: 'from-amber-500 to-red-500',
    borderColor: 'border-amber-500/30',
    hoverGlow: 'hover:shadow-amber-500/10',
    accentBg: 'bg-amber-500/10',
    accentText: 'text-amber-400',
    description: 'Understand seismic risk assessment, retrofitting structures, search-and-rescue protocols, and fault line analysis.',
  },
  {
    id: 'heatwave',
    title: 'Heatwaves & Climate Extremes',
    category: 'Climatic',
    color: 'from-orange-500 to-rose-500',
    borderColor: 'border-orange-500/30',
    hoverGlow: 'hover:shadow-orange-500/10',
    accentBg: 'bg-orange-500/10',
    accentText: 'text-orange-400',
    description: 'Address urban heat islands, public health protocols, grid load resilience, and vulnerable population protection.',
  },
  {
    id: 'drought',
    title: 'Drought Management & Water Security',
    category: 'Environmental',
    color: 'from-emerald-500 to-teal-300',
    borderColor: 'border-emerald-500/30',
    hoverGlow: 'hover:shadow-emerald-500/10',
    accentBg: 'bg-emerald-500/10',
    accentText: 'text-emerald-400',
    description: 'Implement agricultural adaptation, groundwater monitoring, rainwater harvesting, and long-term water conservation.',
  }
];

const Modules = () => {

  return (
    <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-teal-500/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wide uppercase mb-4">
           
            Specialized Crisis Curriculum
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Disaster Preparedness & Response Courses
          </h1>
          <p className="text-lg text-slate-400">
            Gain certified expertise in mitigating, responding to, and recovering from high-impact natural hazards. Select a topic to explore course modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {disasterCourses.map((course) => {
            return (
              <div
                key={course.id}
                className={`group relative bg-slate-900/40 border ${course.borderColor} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-slate-900/80 cursor-pointer shadow-lg ${course.hoverGlow} flex flex-col justify-between`}
              >
                <div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${course.accentBg} ${course.accentText}`}>
                      
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors mb-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                    {course.description}
                  </p>
                </div>

              
                  <NavLink to={`/${course.id}`} className={`inline-flex items-center justify-center w-full gap-2 text-sm font-semibold rounded-xl py-2.5 px-4 bg-slate-800 text-white group-hover:bg-gradient-to-r ${course.color} transition-all duration-300`}>
                    View Course Details
                  </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Modules;