// import React, { useState } from 'react';
// // import { 
// //   Waves, 
// //   Wind, 
// //   Activity, 
// //   Sun, 
// //   Droplets, 
// //   ChevronRight, 
// //   BookOpen, 
// //   Clock, 
// //   Award, 
// //   X,
// //   ShieldAlert
// // } from 'lucide-react';

// const disasterCourses = [
//   {
//     id: 'floods',
//     title: 'Flood Risk & Coastal Safety',
//     category: 'Hydrological',
//     // icon: Waves,
//     color: 'from-blue-500 to-cyan-400',
//     borderColor: 'border-blue-500/30',
//     hoverGlow: 'hover:shadow-blue-500/10',
//     accentBg: 'bg-blue-500/10',
//     accentText: 'text-cyan-400',
//     description: 'Master flood hazard mapping, early warning systems, urban drainage resilience, and emergency response operations.',
//     duration: '6 Weeks',
//     modulesCount: 12,
//     level: 'Intermediate',
//     topics: [
//       'Hydrodynamic Modeling & Inundation Mapping',
//       'Urban Runoff & Infrastructure Resilience',
//       'Early Warning Communication Networks',
//       'Post-Flood Disaster Relief & Sanitation'
//     ]
//   },
//   {
//     id: 'cyclones',
//     title: 'Tropical Cyclones & Storm Surges',
//     category: 'Atmospheric',
//     // icon: Wind,
//     color: 'from-teal-500 to-emerald-400',
//     borderColor: 'border-teal-500/30',
//     hoverGlow: 'hover:shadow-teal-500/10',
//     accentBg: 'bg-teal-500/10',
//     accentText: 'text-teal-400',
//     description: 'Learn storm track prediction, wind-resistant engineering, coastal shelter logistics, and large-scale evacuation strategies.',
//     duration: '8 Weeks',
//     modulesCount: 16,
//     level: 'Advanced',
//     topics: [
//       'Meteorological Tracking & Wind Mechanics',
//       'Storm Surge Inundation Forecasting',
//       'Evacuation Route Optimization & Logistics',
//       'Coastal Defense & Barrier Ecosystems'
//     ]
//   },
//   {
//     id: 'earthquakes',
//     title: 'Earthquakes & Structural Mitigation',
//     category: 'Geological',
//     // icon: Activity,
//     color: 'from-amber-500 to-red-500',
//     borderColor: 'border-amber-500/30',
//     hoverGlow: 'hover:shadow-amber-500/10',
//     accentBg: 'bg-amber-500/10',
//     accentText: 'text-amber-400',
//     description: 'Understand seismic risk assessment, retrofitting structures, search-and-rescue protocols, and fault line analysis.',
//     duration: '7 Weeks',
//     modulesCount: 14,
//     level: 'All Levels',
//     topics: [
//       'Seismology & Fault Line Mapping',
//       'Structural Engineering & Retrofitting',
//       'Urban Search & Rescue (USAR) Fundamentals',
//       'Community Seismic Emergency Preparedness'
//     ]
//   },
//   {
//     id: 'heatwaves',
//     title: 'Heatwaves & Climate Extremes',
//     category: 'Climatic',
//     // icon: Sun,
//     color: 'from-orange-500 to-rose-500',
//     borderColor: 'border-orange-500/30',
//     hoverGlow: 'hover:shadow-orange-500/10',
//     accentBg: 'bg-orange-500/10',
//     accentText: 'text-orange-400',
//     description: 'Address urban heat islands, public health protocols, grid load resilience, and vulnerable population protection.',
//     duration: '4 Weeks',
//     modulesCount: 8,
//     level: 'Beginner',
//     topics: [
//       'Urban Heat Island (UHI) Mitigation',
//       'Public Health Response & Hyperthermia Prevention',
//       'Power Grid Stability Under Extreme Demand',
//       'Green Infrastructure & Microclimate Design'
//     ]
//   },
//   {
//     id: 'droughts',
//     title: 'Drought Management & Water Security',
//     category: 'Environmental',
//     // icon: Droplets,
//     color: 'from-emerald-500 to-teal-300',
//     borderColor: 'border-emerald-500/30',
//     hoverGlow: 'hover:shadow-emerald-500/10',
//     accentBg: 'bg-emerald-500/10',
//     accentText: 'text-emerald-400',
//     description: 'Implement agricultural adaptation, groundwater monitoring, rainwater harvesting, and long-term water conservation.',
//     duration: '5 Weeks',
//     modulesCount: 10,
//     level: 'Intermediate',
//     topics: [
//       'Agricultural Resilience & Crop Adaptation',
//       'Aquifer Recharge & Groundwater Management',
//       'Desalination & Rainwater Harvesting Tech',
//       'Socio-Economic Policy for Drought Relief'
//     ]
//   }
// ];

// const Modules = () => {
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   return (
//     <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-teal-500/30 py-16 px-4 sm:px-6 lg:px-8">
//       {/* Background Radial Gradients */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">
        
//         {/* Header Section */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wide uppercase mb-4">
//             {/* <ShieldAlert className="w-4 h-4" /> */}
//             Specialized Crisis Curriculum
//           </div>
//           <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
//             Disaster Preparedness & Response Courses
//           </h1>
//           <p className="text-lg text-slate-400">
//             Gain certified expertise in mitigating, responding to, and recovering from high-impact natural hazards. Select a topic to explore course modules.
//           </p>
//         </div>

//         {/* Disaster Courses Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
//           {disasterCourses.map((course) => {
//             // const IconComponent = course.icon;
//             return (
//               <div
//                 key={course.id}
//                 onClick={() => setSelectedCourse(course)}
//                 className={`group relative bg-slate-900/40 border ${course.borderColor} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-slate-900/80 cursor-pointer shadow-lg ${course.hoverGlow} flex flex-col justify-between`}
//               >
//                 <div>
//                   {/* Top Bar inside Card */}
//                   <div className="flex items-center justify-between mb-4">
//                     <div className={`p-3 rounded-xl ${course.accentBg} ${course.accentText}`}>
//                       {/* <IconComponent className="w-6 h-6" /> */}
//                     </div>
//                     <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
//                       {course.category}
//                     </span>
//                   </div>

//                   <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors mb-2">
//                     {course.title}
//                   </h3>
//                   <p className="text-slate-400 text-sm mb-6 line-clamp-2">
//                     {course.description}
//                   </p>
//                 </div>

//                 {/* Footer Meta Details */}
//                 <div>
//                   <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4 mb-4">
//                     <span className="flex items-center gap-1">
//                       {/* < className="w-3.5 h-3.5 text-slate-500" /> */}
//                       {course.duration}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       {/* <BookOpen className="w-3.5 h-3.5 text-slate-500" /> */}
//                       {course.modulesCount} Modules
//                     </span>
//                     <span className="flex items-center gap-1">
//                       {/* <Award className="w-3.5 h-3.5 text-slate-500" /> */}
//                       {course.level}
//                     </span>
//                   </div>

//                   <div className={`inline-flex items-center justify-center w-full gap-2 text-sm font-semibold rounded-xl py-2.5 px-4 bg-slate-800 text-white group-hover:bg-gradient-to-r ${course.color} transition-all duration-300`}>
//                     View Course Details
//                     {/* <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Interactive Modal Drawer for Selected Course Details */}
//       {selectedCourse && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
//           <div 
//             className="relative w-full max-w-2xl bg-[#0a110e] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Background Glow */}
//             <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${selectedCourse.color} opacity-10 blur-2xl pointer-events-none`} />

//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedCourse(null)}
//               className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             {/* Modal Header */}
//             <div className="flex items-center gap-3 mb-4">
//               <div className={`p-3 rounded-xl ${selectedCourse.accentBg} ${selectedCourse.accentText}`}>
//                 <selectedCourse.icon className="w-7 h-7" />
//               </div>
//               <div>
//                 <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
//                   {selectedCourse.category} Disaster Management
//                 </span>
//                 <h2 className="text-2xl font-bold text-white">
//                   {selectedCourse.title}
//                 </h2>
//               </div>
//             </div>

//             <p className="text-slate-300 text-sm mb-6 leading-relaxed">
//               {selectedCourse.description}
//             </p>

//             {/* Course Curriculum Topics */}
//             <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-3 flex items-center gap-2">
//               <BookOpen className="w-4 h-4 text-teal-400" /> Key Topics Included
//             </h4>
//             <div className="grid grid-cols-1 gap-2 mb-8">
//               {selectedCourse.topics.map((topic, index) => (
//                 <div 
//                   key={index} 
//                   className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-colors"
//                 >
//                   <span className={`w-6 h-6 rounded-full ${selectedCourse.accentBg} ${selectedCourse.accentText} text-xs font-bold flex items-center justify-center shrink-0`}>
//                     {index + 1}
//                   </span>
//                   <span className="text-sm font-medium text-slate-200">{topic}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Modal Actions */}
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80 pt-6">
//               <div className="flex items-center gap-4 text-xs text-slate-400">
//                 <span>Duration: <strong className="text-white">{selectedCourse.duration}</strong></span>
//                 <span>Level: <strong className="text-white">{selectedCourse.level}</strong></span>
//               </div>
//               <button className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r ${selectedCourse.color} text-white shadow-lg hover:brightness-110 transition-all`}>
//                 Enroll in Course
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Modules;

const Modules =()=>{
    return(
        <div>
            Hello
        </div>
    )
}

export default Modules;