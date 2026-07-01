
import React, { useEffect, useState, useRef } from 'react';
// import googleLogin from '../../../../server/controllers/authController.ts';
import * as THREE from 'three';

type UserInfo = {
  image?: string;
  [key: string]: unknown;
};

const Homepage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data || '{}');
    setUserInfo(userData);
    console.log("User Info:", userInfo);
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x0a1510, 1.5);
    scene.add(ambientLight);

    const auroraGlowLight = new THREE.DirectionalLight(0x14b8a6, 2);
    auroraGlowLight.position.set(-5, 3, -2);
    scene.add(auroraGlowLight);

    // Particle Setup (Star Field)
    const starCount = 600; // Increased count for richer field
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 18;
      starPositions[i + 1] = (Math.random() - 0.5) * 18;
      starPositions[i + 2] = (Math.random() - 0.8) * 12;
      starSpeeds[i / 3] = 0.1 + Math.random() * 0.4; // Custom drift speed per star
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xccfbf1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Mouse Tracking for Parallax Effect
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow dynamic rotation
      starField.rotation.y = elapsedTime * -0.008;
      starField.rotation.x = elapsedTime * 0.003;

      // Smooth mouse parallax interpolation (Lerp)
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#020806] text-white overflow-hidden font-sans selection:bg-teal-500/30">


      <div
        ref={mountRef}
        className="absolute inset-0 z-0 bg-[#020806] bg-[radial-gradient(circle_at_50%_-20%,rgba(13,148,136,0.2)_0%,transparent_70%),radial-gradient(circle_at_10%_90%,rgba(4,47,31,0.3)_0%,transparent_50%)]"
      >

        <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none animate-[pulse_10s_infinite_alternate] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/50 via-transparent to-transparent" />
      </div>


      <div className="relative z-10 flex flex-col min-h-screen">


        <header className="flex justify-between items-center px-6 md:px-16 lg:px-24 py-6 w-full backdrop-blur-sm bg-black/5 border-b border-white/5 animate-fade-in">
          <div className="text-xl md:text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-400 cursor-pointer">
            AURA.<span className="text-white">SHIELD</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <a href="/" className="text-teal-400 border-b-2 border-teal-400 pb-1 text-[14px] font-semibold tracking-wide transition-all">Home</a>
            <a href="./about" className="text-white/60 hover:text-white text-[14px] font-medium tracking-wide transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-teal-400 after:transition-all">About</a>
            <a href="./features" className="text-white/60 hover:text-white text-[14px] font-medium tracking-wide transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-teal-400 after:transition-all">Features</a>
            <a href="./analysis" className="text-white/60 hover:text-teal-300 text-[14px] font-medium tracking-wide transition-colors duration-300 px-3 py-1.5 rounded-md bg-white/5 hover:bg-teal-500/10 border border-white/10 hover:border-teal-500/30">Analysis</a>
            <img src={userInfo?.image} onError={(e) => {
              e.currentTarget.src = "https://api.dicebear.com/7.x/initials/svg?seed=" + userInfo?.name;
            }} alt="User Image" className='h-10  w-10 rounded-full object-cover' />
          </nav>
        </header>


        <main className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-8 max-w-4xl mx-auto z-10">


          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-950/20 text-teal-300 text-xs font-semibold tracking-widest uppercase animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Live Monitoring Active
          </div>


          <p className="text-sm md:text-base font-bold tracking-[0.4em] uppercase text-emerald-400/90 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-[fadeInUp_1s_ease-out]">
            Get Disaster Ready
          </p>


          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.15] animate-[fadeInUp_1.2s_ease-out_forwards]">
            Be Prepared. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-emerald-200 to-white drop-shadow-sm">
              Stay Informed.
            </span>
          </h1>


          <p className="text-base md:text-lg text-white/60 max-w-2xl mb-10 leading-relaxed font-light animate-[fadeInUp_1.4s_ease-out_forwards]">
            An advanced spatial threat intelligence platform designed to predict extreme events, streamline relief workflows, and protect local infrastructure in real-time.
          </p>


          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto animate-[fadeInUp_1.6s_ease-out_forwards]">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-black font-bold tracking-wide rounded-xl shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] transform hover:-translate-y-0.5 transition-all duration-300">
              Launch Dashboard
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium tracking-wide rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-md transform hover:-translate-y-0.5 transition-all duration-300">
              Read Documentation
            </button>
          </div>

        </main>


        <footer className="w-full text-center py-6 text-white/30 text-xs tracking-wider border-t border-white/5 bg-black/10">
          © 2026 Aura Shield Initiative. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
