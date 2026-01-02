'use client';
import { useState, useEffect } from 'react';
import { Folder, Award, FileText, User, Github, Discord, Linkedin, ExternalLink, X, Menu, Lock, Unlock, AlertTriangle, BadgeCheck, Eye, Download } from 'lucide-react';
import Link from 'next/link';
import {  Link2Off, Link as LinkIcon, GraduationCap, Scroll, Cpu, Server, Code2, Terminal, Database, Globe, Cloud, Wrench, ArrowRight, ArrowLeft  } from 'lucide-react'; 

import dynamic from 'next/dynamic';
import { certifications } from '@/data/certifications';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), { 
  ssr: false,
  loading: () => <div className="text-gray-500 text-sm text-center py-10">Loading Viewer...</div>
});
const ACCESS_PASSWORD = "admin"; 

export default function DataFiles() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const [activeTab, setActiveTab] = useState(null); 

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [selectedCert, setSelectedCert] = useState(null);
  
  const [toastMsg, setToastMsg] = useState(''); 
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    setImgError(false);
  }, [selectedCert]);

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  useEffect(() => {
    const savedTab = sessionStorage.getItem('data_sys_tab');
    if (savedTab) {
      setActiveTab(savedTab);
    } else {
      setActiveTab('profiles');
    }
  }, []);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('data_sys_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (activeTab) {
      sessionStorage.setItem('data_sys_tab', activeTab);
    }
  }, [activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsChecking(true);
    setErrorMsg('');

    setTimeout(() => {
      if (passwordInput === ACCESS_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem('data_sys_auth', 'true');
      } else {
        setErrorMsg('ACCESS DENIED: Invalid Credentials');
        setPasswordInput('');
      }
      setIsChecking(false);
    }, 800);
  };

  const menuItems = [
    { id: 'profiles', icon: <User size={20} />, label: 'Socials', angle: -60, color: 'text-blue-400', border: 'border-blue-500' },
    { id: 'projects', icon: <Folder size={20} />, label: 'Projects', angle: -20, color: 'text-purple-400', border: 'border-purple-500' },
    { id: 'certificates', icon: <Award size={20} />, label: 'Awards', angle: 20, color: 'text-emerald-400', border: 'border-emerald-500' },
    { id: 'about', label: 'About', icon: <Cpu size={24} />, angle: 60, color: 'text-yellow-400', border: 'border-yellow-500' },  ];

  

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="w-full max-w-md bg-gray-900/50 border border-gray-700 p-8 rounded-2xl shadow-2xl backdrop-blur-md relative z-10">
           
           <div className="text-center mb-8">
             <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
               <Lock className="w-8 h-8 text-blue-400" />
             </div>
             <h1 className="text-2xl font-bold tracking-widest text-white">Data Files Locked</h1>
             <p className="text-xs text-gray-500 mt-2">Admin Password Required</p>
           </div>

           <form onSubmit={handleLogin} className="flex flex-col gap-4">
             <div className="relative">
               <input 
                 type="password" 
                 value={passwordInput}
                 onChange={(e) => setPasswordInput(e.target.value)}
                 placeholder="Enter Passkey..."
                 className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-center text-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all placeholder:text-gray-700"
                 autoFocus
               />
             </div>

             {errorMsg && (
               <div className="flex items-center justify-center gap-2 text-red-500 text-xs font-bold animate-pulse">
                 <AlertTriangle size={12} /> {errorMsg}
               </div>
             )}

             <button 
               type="submit" 
               disabled={isChecking}
               className={`w-full py-3 rounded-lg font-bold tracking-wider transition-all duration-200
                  ${isChecking 
                    ? 'bg-gray-700 text-gray-400 cursor-wait' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/30'}
               `}
             >
               {isChecking ? 'VERIFYING...' : 'UNLOCK'}
             </button>
           </form>

           <div className="mt-8 text-center">
             <Link href="/" className="text-gray-100 text-xs hover:text-white transition flex items-center justify-center gap-1">
               <ArrowLeft size={10} /> ABORT CONNECTION
             </Link>
           </div>

           <div className="absolute bottom-4 left-0 text-center w-full pointer-events-none">
              <p className="text-gray-500 text-[10px] font-mono opacity-50">
                DESIGNED & DEVELOPED BY SMARTH SALARIA
              </p>
              <p className="text-gray-400 text-[10px] mt-1">© 2026 // ALL RIGHTS RESERVED</p>
           </div>
        </div>
      </div>
    );
  }

  // --- PORTFOLIO TECH STACK DATA ---
  const portfolioStack = {
    core: [
      { name: "Next.js 16", icon: "N", color: "text-white", desc: "App Router" },
      { name: "React 19", icon: "⚛", color: "text-cyan-400", desc: "Server Components" },
      { name: "Tailwind CSS", icon: "≋", color: "text-cyan-300", desc: "Utility Styling" },
      { name: "JavaScript", icon: "JS", color: "text-yellow-400", desc: "ES6+ Logic" },
    ],
    ui: [
      { name: "Lucide React", icon: "✒", color: "text-pink-400", desc: "Vector Icons" },
      { name: "React PDF", icon: "📄", color: "text-red-500", desc: "PDF Rendering" },
      { name: "PDF.js Worker", icon: "⚙", color: "text-orange-400", desc: "Doc Processing" },
      { name: "Tailwind Animate", icon: "✨", color: "text-purple-400", desc: "Keyframe plugin" },
    ],
    utilities: [
      { name: "Clsx", icon: "cx", color: "text-blue-300", desc: "Conditionals" },
      { name: "Tailwind Merge", icon: "tm", color: "text-blue-500", desc: "Class Conflict" },
      { name: "PostCSS", icon: "P", color: "text-pink-600", desc: "CSS Transpiler" },
      { name: "Turbopack", icon: "⚡", color: "text-red-400", desc: "Bundler" },
    ],
    infrastructure: [
      { name: "GitHub Pages", icon: "🐙", color: "text-white", desc: "Static Hosting" },
      { name: "GitHub Actions", icon: "▶", color: "text-green-500", desc: "CI/CD Pipeline" },
      { name: "Umami Cloud", icon: "U", color: "text-indigo-400", desc: "Privacy Analytics" },
      { name: "Node", icon: "⬢", color: "text-yellow-200", desc: "Package Manager" },
    ]
  };

    const navigateCert = (direction) => {
    if (!selectedCert) return;
    
    // Find current index
    const currentIndex = certifications.findIndex(c => c.id === selectedCert.id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % certifications.length;
    } else {
        newIndex = (currentIndex - 1 + certifications.length) % certifications.length;
    }

    setSelectedCert(certifications[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCert) return; 

      if (e.key === 'ArrowRight') navigateCert('next');
      if (e.key === 'ArrowLeft') navigateCert('prev');
      if (e.key === 'Escape') setSelectedCert(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]); 


  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative selection:bg-blue-500/30">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-full p-4 md:p-8 z-20 flex justify-between items-start pointer-events-none">
         <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition bg-gray-900 pointer-events-auto bg-black/50 px-4 py-2 rounded-full border border-gray-800 backdrop-blur-md text-sm md:text-base">
           <ArrowLeft size={18} /> <span className="hidden md:inline">Back to Overview</span><span className="md:hidden">Back</span>
         </Link>
         
         <div className="text-right opacity-50 hidden md:block">
            <h1 className="text-4xl font-bold text-gray-500 uppercase tracking-tighter">SMARTH SALARIA</h1>
            <p className="text-xs text-gray-400 font-mono flex items-center justify-end gap-2">
               <Unlock size={10} className="text-emerald-500" /> ACCESS GRANTED
            </p>
         </div>
      </div>

      <div className="w-full h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
        
        <div className="w-full max-w-5xl mx-auto px-4 pt-24 pb-32 flex flex-col items-center min-h-screen">
            
            {!activeTab && (
               <div className="flex h-[50vh] items-center justify-center text-gray-500 animate-pulse">
                  Initializing System...
               </div>
            )}
            
            {activeTab === 'profiles' && (
              <div className="w-full animate-in zoom-in duration-500 space-y-8">
                
                {/* 1. PROFESSIONAL */}
                <section>
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Professional & Dev
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileCard 
                      title="GitHub" 
                      handle="@smarthsalaria" 
                      desc="Code Repositories & Open Source" 
                      icon={<Github className="text-white" size={32} />}
                      color="bg-[#181717]" 
                      link="https://github.com/smarthsalaria"
                    />
                    <ProfileCard 
                      title="LinkedIn" 
                      handle="Smarth Salaria" 
                      desc="Professional Network" 
                      icon={<Linkedin className="text-white" size={32} />}
                      color="bg-[#0077b5]" 
                      link="https://linkedin.com/in/smarthsalaria"
                    />
                  </div>
                </section>

                <section>
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Social Network
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <MiniCard title="Instagram" handle="smarthsalaria" icon="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" link="https://www.instagram.com/smarthsalaria/" color="hover:border-pink-500" />
                     <MiniCard title="Twitter / X" handle="SmarthSalaria" icon="https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg" link="https://x.com/SmarthSalaria" color="hover:border-white" />
                     <MiniCard title="Discord" handle="lazy_daoist" icon="https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Discord_logo.svg/2560px-Discord_logo.svg.png" link="https://discord.com/users/1283695172106059790" color="hover:border-indigo-500" iconSize={50} />
                     <MiniCard title="Reddit" handle="u/lazymage2000" icon="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/960px-Reddit_Logo_Icon.svg.png" link="https://www.reddit.com/user/lazymage2000/" color="hover:border-orange-500" />
                     <MiniCard title="Facebook" handle="smarthsalaria" icon="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" link="https://www.facebook.com/smarthsalaria/" color="hover:border-blue-600" />
                  </div>
                </section>

                {/* 3. GAMING */}
                <section>
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Gaming ID
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <GamingCard 
                      platform="Epic Games" 
                      id="smarthsalaria" 
                      icon="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/960px-Epic_Games_logo.svg.png" 
                      bg="from-[#1b2838] to-[#101822]" 
                    />
                    <GamingCard 
                      platform="Steam" 
                      id="smarthsalaria" 
                      icon="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" 
                      bg="from-[#1b2838] to-[#101822]" 
                    />
                    <GamingCard 
                      platform="PlayStation" 
                      id="smarthsalaria" 
                      icon="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png" 
                      bg="from-[#003791] to-[#002561]" 
                    />
                    <GamingCard 
                      platform="Xbox" 
                      id="lazymage06" 
                      icon="https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg" 
                      bg="from-[#107C10] to-[#0b580b]" 
                    />
                  </div>
                </section>

                {/* 4. ENTERTAINMENT */}
                <section>
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span> Entertainment & Stream
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MiniCard title="Spotify" handle="smarth06" icon="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" link="https://open.spotify.com/user/smarth06" color="hover:border-green-500" />
                    <MiniCard title="YouTube" handle="smarthsalaria" icon="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" link="https://www.youtube.com/@smarthsalaria" color="hover:border-red-600" />
                    <MiniCard title="Twitch" handle="smarthsalaria" icon="https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg" link="https://m.twitch.tv/smarthsalaria/" color="hover:border-purple-400" />
                    <MiniCard title="Crunchyroll" handle="smarthsalaria" icon="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Crunchyroll_2024.svg/2560px-Crunchyroll_2024.svg.png" link="https://www.crunchyroll.com/discover" color="hover:border-orange-400" iconSize={48} />
                  </div>
                </section>
              </div>
            )}

            {/* --- PROJECTS --- */}
            {activeTab === 'projects' && <EmptyState icon={<Folder size={64}/>} title="Project Directory" color="text-purple-400" />}
            
            {/* --- CERTIFICATES --- */}
            {activeTab === 'certificates' && (
              <div className="w-full animate-in zoom-in duration-500 space-y-12">
                
                {/* 1. PROFESSIONAL SECTION */}
                <CertSection 
                    title="Professional Certifications" 
                    subtitle="Industry recognized & verifiable credentials."
                    icon={<BadgeCheck className="w-6 h-6 text-blue-400" />}
                    items={certifications.filter(c => c.category === 'professional')}
                    onSelect={setSelectedCert}
                />

                {/* 2. UNIVERSITY SECTION */}
                <CertSection 
                    title="University & Academic" 
                    subtitle="Degrees, Diplomas & Academic Records."
                    icon={<GraduationCap className="w-6 h-6 text-white" />}
                    items={certifications.filter(c => c.category === 'university')}
                    onSelect={setSelectedCert}
                />

                {/* 3. OTHERS SECTION */}
                <CertSection 
                    title="Workshops & Other" 
                    subtitle="Training programs, workshops and participations."
                    icon={<Scroll className="w-6 h-6 text-emerald-400" />}
                    items={certifications.filter(c => c.category === 'other')}
                    onSelect={setSelectedCert}
                />
                
              </div>
            )}
            
            <Toast message={toastMsg} />

      {/* --- SMART MODAL --- */}
      {selectedCert && (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-2 md:p-8 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedCert(null)}
        >
            <div 
                className="relative w-full max-w-5xl h-[85vh] bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >

              {/* PREV BUTTON (Left) */}
               <button 
                  onClick={(e) => { e.stopPropagation(); navigateCert('prev'); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 hover:bg-emerald-500 text-white/50 hover:text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:border-emerald-400 group"
                  title="Previous (Left Arrow)"
               >
                  <ArrowLeft size={24} className="group-hover:-translate-x-1 transition" />
               </button>

               {/* NEXT BUTTON (Right) */}
               <button 
                  onClick={(e) => { e.stopPropagation(); navigateCert('next'); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 hover:bg-emerald-500 text-white/50 hover:text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:border-emerald-400 group"
                  title="Next (Right Arrow)"
               >
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition" />
               </button>              

               {/* Header */}
               <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
                 <div className="flex items-center gap-3">
                    <Award className="text-blue-500" size={20} />
                    <div>
                        <h3 className="text-lg font-bold text-white">{selectedCert.title}</h3>
                        <p className="text-xs text-gray-400">{selectedCert.issuer} • Issued {selectedCert.date}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedCert(null)} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-full transition">
                    <X size={20} />
                 </button>
               </div>

               {/* Viewer (PDF/Image) */}
               <div className="flex-1 bg-gray-800/50 relative flex items-center justify-center overflow-hidden">
                  {selectedCert.file.endsWith('.pdf') ? (
                    <iframe src={selectedCert.file} className="w-full h-full border-0" />
                  ) : (
                    <img src={selectedCert.file} className="max-w-full max-h-full object-contain p-4" />
                  )}
               </div>

               {/* Footer */}
               <div className="p-4 border-t border-gray-800 bg-gray-900 flex justify-between md:justify-end gap-3">
                  
                  {/* LOGIC: Verify Button */}
                  <button
                    onClick={() => {
                        if (selectedCert.link && selectedCert.link !== '#') {
                            window.open(selectedCert.link, '_blank');
                        } else {
                            setToastMsg("Verification Link Not Available");
                        }
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition
                        ${(selectedCert.link && selectedCert.link !== '#') 
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                            : 'bg-gray-800/50 text-gray-600 cursor-not-allowed hover:bg-red-900/20 hover:text-red-400'}
                    `}
                  >
                    {(selectedCert.link && selectedCert.link !== '#') ? <ExternalLink size={16} /> : <Link2Off size={16} />}
                    <span className="hidden md:inline">Verify Credential</span>
                  </button>
                  
                  <a 
                     href={selectedCert.file} 
                     download 
                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold text-white shadow-lg transition"
                  >
                     <Download size={16} /> Download
                  </a>
               </div>
            </div>
        </div>
      )}

            {/* --- ABOUT / SYSTEM SPECS TAB --- */}
            {activeTab === 'about' && (
              <div className="w-full animate-in zoom-in duration-500 space-y-8">
                
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/50">
                        <Cpu className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">About Portfolio Project</h2>
                        <p className="text-gray-400 text-sm">Tools, Libraries, Frameworks, and more used...</p>
                    </div>
                </div>

                {/* MAIN GRID: 1 Column on Mobile, 2 Columns on Desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* 1. CORE FRAMEWORK */}
                    <StackSection 
                        title="Core Framework" 
                        icon={<Terminal size={18} />} 
                        items={portfolioStack.core} 
                        color="border-cyan-500"
                    />

                    {/* 2. INTERFACE & ENGINES */}
                    <StackSection 
                        title="Interface & Engines" 
                        icon={<Code2 size={18} />} 
                        items={portfolioStack.ui} 
                        color="border-pink-500"
                    />

                    {/* 3. DEV TOOLS & UTILITIES */}
                    <StackSection 
                        title="Dev Tools & Utilities" 
                        icon={<Wrench size={18} />} 
                        items={portfolioStack.utilities} 
                        color="border-orange-500"
                    />

                    {/* 4. CLOUD & DEPLOYMENT */}
                    <StackSection 
                        title="Cloud & Deployment" 
                        icon={<Cloud size={18} />} 
                        items={portfolioStack.infrastructure} 
                        color="border-indigo-500"
                    />

                </div>
                
                {/* Footer */}
                <div className="pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-600 text-xs font-mono mb-2">BUILD_ID: 2026.01.ALPHA</p>
                    <p className="text-gray-500 text-sm">
                        Designed & Developed by <span className="text-white font-bold">Smarth Salaria</span>
                    </p>
                </div>

              </div>
            )}
            
        </div>
      </div>

      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 pl-2 md:pl-4">
          <div className="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center">
             <div className={`absolute left-0 border-r-2 border-t-2 border-b-2 border-gray-700 rounded-r-full transition-all duration-500 ease-out pointer-events-none cursor-pointer
                ${isMenuOpen ? 'w-[120px] h-[240px] md:w-[140px] md:h-[280px] opacity-100' : 'w-0 h-0 opacity-0'}
             `}></div>
             
             <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative z-50 w-12 cursor-pointer h-12 md:w-16 md:h-16 rounded-full bg-gray-800 border-2 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300
                   ${isMenuOpen ? 'border-blue-500 shadow-blue-500/20' : 'border-gray-600 hover:border-gray-400'}
                `}
             >
                 {isMenuOpen ? <X className="text-white w-5 h-5 md:w-6 md:h-6" /> : <Menu className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />}
             </button>

             {menuItems.map((item) => {
                 const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 85 : 110;
                 const radian = (item.angle * Math.PI) / 180;
                 const x = Math.cos(radian) * radius;
                 const y = Math.sin(radian) * radius;

                 return (
                    <button
                        key={item.id}
                        onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                        className={`absolute cursor-pointer w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 border flex items-center justify-center shadow-lg transition-all duration-500 z-40
                            ${activeTab === item.id ? item.border + ' text-white' : 'border-gray-700 text-gray-400'}
                        `}
                        style={{
                            transform: isMenuOpen 
                                ? `translate(${x}px, ${y}px) scale(1)` 
                                : `translate(0px, 0px) scale(0)`,
                            opacity: isMenuOpen ? 1 : 0
                        }}
                    >
                        {item.icon}
                        <span 
                            className={`absolute -bottom-6 text-[9px] md:text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded text-gray-300 whitespace-nowrap transition-opacity duration-300 pointer-events-none border border-gray-800
                                ${isMenuOpen ? 'opacity-100 delay-100' : 'opacity-0'}
                            `}
                        >
                           {item.label}
                        </span>
                    </button>
                 );
             })}
          </div>
      </div>

      {selectedCert && (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-2 md:p-8 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedCert(null)}
        >
            <div 
                className="relative w-full max-w-5xl h-[85vh] bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
               {/* Header */}
               <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
                 <div className="flex items-center gap-3">
                    <Award className="text-blue-500" size={20} />
                    <div>
                        <h3 className="text-lg font-bold text-white">{selectedCert.title}</h3>
                        <p className="text-xs text-gray-400">{selectedCert.issuer} • Issued {selectedCert.date}</p>
                    </div>
                 </div>
                 <button 
                    onClick={() => setSelectedCert(null)}
                    className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-full transition"
                 >
                    <X size={20} />
                 </button>
               </div>

               {/* CONTENT VIEWER AREA */}
               <div className="flex-1 bg-gray-800/50 relative flex items-center justify-center overflow-auto p-4 custom-scrollbar">
                  
                  {/* CASE 1: PDF Handling (Handled by Component) */}
                  {selectedCert.file.endsWith('.pdf') ? (
                    <div className="max-w-full max-h-full w-full">
                       <PdfViewer url={selectedCert.file} />
                    </div>
                  ) : (
                    /* CASE 2: Image Handling */
                    <>
                        {/* A. If Error: Show Text */}
                        {imgError ? (
                            <div className="flex flex-col items-center justify-center p-12 text-center border border-gray-700 border-dashed rounded-xl">
                                <AlertTriangle className="w-10 h-10 text-gray-500 mb-4" />
                                <h3 className="text-xl font-bold text-gray-300">Image Not Available</h3>
                                <p className="text-gray-500 text-sm mt-2">Preview cannot be displayed.</p>
                            </div>
                        ) : (
                            /* B. If Normal: Show Image */
                            <img 
                                src={selectedCert.file} 
                                alt={selectedCert.title} 
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                                onError={() => setImgError(true)} // <--- Triggers the text view
                            />
                        )}
                    </>
                  )}
               </div>

               {/* Footer */}
               <div className="p-4 border-t border-gray-800 bg-gray-900 flex justify-between md:justify-end gap-3">
                  
                  {/* VERIFY BUTTON (Smart Link) */}
                  <a
                    href={(selectedCert.link && selectedCert.link !== '#') ? selectedCert.link : '#'}
                    target={(selectedCert.link && selectedCert.link !== '#') ? "_blank" : "_self"}
                    onClick={(e) => {
                        if (!selectedCert.link || selectedCert.link === '#') {
                            e.preventDefault();
                            setToastMsg("Verification Link Not Available");
                        }
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition
                        ${(selectedCert.link && selectedCert.link !== '#') 
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white cursor-pointer' 
                            : 'bg-gray-800/50 text-gray-600 cursor-not-allowed hover:bg-red-900/10 hover:text-red-400'}
                    `}
                  >
                    {(selectedCert.link && selectedCert.link !== '#') ? <ExternalLink size={16} /> : <Link2Off size={16} />}
                    <span className="hidden md:inline">Verify Credential</span>
                  </a>
                  
                  {/* DOWNLOAD BUTTON */}
                  <a 
                     href={selectedCert.file} 
                     download 
                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold text-white shadow-lg transition"
                  >
                     <Download size={16} /> Download
                  </a>
               </div>
            </div>
        </div>
      )}

    </div>
  );
}

function ProfileCard({ title, handle, desc, icon, color, link }) {
  return (
    <a href={link} target="_blank" className={`relative p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition group overflow-hidden flex items-center gap-4`}>
       <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500 ${color}`}></div>
       <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
          {icon}
       </div>
       <div>
          <h4 className="text-lg font-bold text-white leading-tight">{title}</h4>
          <p className="text-blue-400 text-sm font-mono">{handle}</p>
          <p className="text-gray-500 text-xs mt-1">{desc}</p>
       </div>
       <ExternalLink className="ml-auto text-gray-600 group-hover:text-white transition" size={16} />
    </a>
  );
}


function MiniCard({ title, handle, icon, link, color, iconSize=24, }) {
  return (
    <a href={link} target="_blank" className={`flex items-center gap-3 p-3 rounded-xl border border-gray-800 bg-gray-900/40 transition hover:bg-gray-800 ${color} hover:border-opacity-50 group`}>
       <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center shrink-0">
          <img src={icon} alt={title} className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition" style={{ width: iconSize, height: iconSize }}
 />
       </div>
       <div className="overflow-hidden">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-sm font-mono text-white truncate group-hover:text-blue-400 transition">{handle}</p>
       </div>
    </a>
  );
}

function GamingCard({ platform, id, icon, bg }) {
   const isPlayStation = platform === "PlayStation";
  return (
    <div className={`relative p-4 rounded-xl overflow-hidden group border border-gray-700`}>
       <div className={`absolute inset-0 bg-gradient-to-br ${bg} opacity-50 group-hover:opacity-80 transition duration-500`}></div>
       <div className="relative z-10 flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-sm
            ${
              isPlayStation
                ? "bg-white border-black/10"
                : "bg-black/30 border-white/10"
            }`}
        >
              <img src={icon} alt={platform} className="w-6 h-6 object-contain" />
          </div>
          <div>
             <p className="text-[10px] uppercase font-bold tracking-wider text-white/60">{platform}</p>
             <p className="text-white font-mono font-bold">{id}</p>
          </div>
       </div>
    </div>
  );
}

function EmptyState({ icon, title, color }) {
    return (
        <div className="text-center animate-in slide-in-from-bottom-10 fade-in duration-500 bg-gray-900/50 p-8 md:p-12 rounded-3xl border border-gray-800 backdrop-blur-sm mx-4">
            <div className={`mx-auto w-fit mb-4 md:mb-6 ${color} opacity-80 scale-75 md:scale-100`}>{icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm md:text-base text-gray-500">Access restricted. Content uploading...</p>
        </div>
    );
}

function StackSection({ title, icon, items, color }) {
    return (
        <section className="bg-gray-900/40 rounded-xl border border-gray-800 p-5 relative overflow-hidden h-full">
             {/* Decorative Top Line */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${color.replace('border-', '')} to-transparent opacity-50`}></div>

            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                {icon} {title}
            </h3>

            {/* Internal Grid: Fixed to 2 columns because the card itself is now smaller */}
            <div className="grid grid-cols-2 gap-3">
                {items.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/30 border border-gray-800/50 hover:border-gray-600 transition group text-center">
                        {/* Icon Box */}
                        <div className={`w-8 h-8 mb-2 rounded flex items-center justify-center font-bold text-sm bg-gray-800 group-hover:bg-gray-700 transition ${item.color}`}>
                            {item.icon}
                        </div>
                        {/* Text Info */}
                        <div>
                             <span className="text-xs text-white font-bold block leading-tight">{item.name}</span>
                             <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wide opacity-100">{item.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-2xl z-[80] animate-in slide-in-from-top-5 fade-in duration-300 flex items-center gap-3 border border-red-500/50 backdrop-blur-md">
      <AlertTriangle size={18} />
      <span className="text-sm font-bold tracking-wide">{message}</span>
    </div>
  );
}
function CertSection({ title, subtitle, icon, items, onSelect }) {
  if (items.length === 0) return null;

  return (
    <section>
        <div className="mb-4 flex items-center gap-3 border-b border-gray-800 pb-2">
            <div className="p-2 bg-gray-800 rounded-lg">
                {icon}
            </div>
            <div>
                <h2 className="text-xl font-bold text-white leading-none">{title}</h2>
                <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((cert) => {
                const hasLink = cert.link && cert.link !== '#';
                
                return (
                <div 
                    key={cert.id} 
                    onClick={() => onSelect(cert)} 
                    className={`relative bg-gray-900/80 border ${cert.color} border-opacity-30 hover:border-opacity-100 p-5 rounded-xl transition-all group overflow-hidden cursor-pointer`}
                >
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition">
                        <BadgeCheck size={80} />
                    </div>
                    
                    <div className="flex items-start justify-between relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            {cert.icon}
                            <span className="bg-gray-800 text-[10px] px-2 py-1 rounded border border-gray-700 text-gray-400 font-mono">
                                {cert.date}
                            </span>
                        </div>
                        
                        {/* Link Status Icon */}
                        {hasLink ? (
                            <ExternalLink size={16} className="text-gray-500 group-hover:text-blue-400 transition" />
                        ) : (
                            <Link2Off size={16} className="text-gray-700 group-hover:text-red-900 transition" />
                        )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition relative z-10">
                        {cert.title}
                    </h3>
                    <p className="text-sm text-gray-400 relative z-10 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${cert.color.replace('border', 'bg')}`}></span>
                        {cert.issuer} • {cert.code}
                    </p>
                </div>
                );
            })}
        </div>
    </section>
  );
}