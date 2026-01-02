'use client';
import { useState, useEffect } from 'react';
import { Folder, Award, FileText, User, ArrowLeft, Github, Discord, Linkedin, ExternalLink, X, Menu, Lock, Unlock, AlertTriangle, BadgeCheck, Eye, Download } from 'lucide-react';
import Link from 'next/link';

const ACCESS_PASSWORD = "admin"; 

export default function DataFiles() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const [activeTab, setActiveTab] = useState('profiles');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('data_sys_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

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
    { id: 'documents', icon: <FileText size={20} />, label: 'Docs', angle: 60, color: 'text-yellow-400', border: 'border-yellow-500' },
  ];

  // --- UPDATED CERTIFICATES DATA ---
  // ACTION REQUIRED: Put your images in 'public/certificates/' and update filenames below
  const certifications = [
    {
      id: 1,
      title: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      code: "AZ-900",
      date: "2024",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-8 h-8" />,
      link: "https://learn.microsoft.com", 
      image: "/certificates/az900.jpg", // <--- PLACEHOLDER: Update with your actual file path
      color: "border-blue-500"
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      issuer: "Coursera",
      code: "Professional Cert",
      date: "2023",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg" alt="Coursera" className="w-8 h-8 rounded-full bg-white p-1" />,
      link: "https://coursera.org",
      image: "/certificates/coursera.jpg", // <--- PLACEHOLDER
      color: "border-blue-400"
    },
    {
      id: 3,
      title: "Internet of Things (IoT) Training",
      issuer: "Verzeo",
      code: "Technical",
      date: "2021",
      icon: <Award className="w-8 h-8 text-emerald-400" />,
      link: "#",
      image: "/certificates/iot.jpg", // <--- PLACEHOLDER
      color: "border-emerald-500"
    },
  ];

  // --- LOGIN SCREEN ---
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

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative selection:bg-blue-500/30">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-full p-4 md:p-8 z-20 flex justify-between items-start pointer-events-none">
         <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition bg-gray-900 pointer-events-auto bg-black/50 px-4 py-2 rounded-full border border-gray-800 backdrop-blur-md text-sm md:text-base">
           <ArrowLeft size={18} /> <span className="hidden md:inline">Back to Dashboard</span><span className="md:hidden">Back</span>
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
              <div className="w-full animate-in zoom-in duration-500">
                <div className="mb-6 flex items-center gap-3">
                   <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-500/50">
                      <Award className="w-8 h-8 text-emerald-400" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-bold text-white">Verified Certifications</h2>
                      <p className="text-gray-400 text-sm">Tap a card to view the original certificate.</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {certifications.map((cert) => (
                     <div 
                       key={cert.id} 
                       onClick={() => setSelectedCert(cert)} 
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
                           <Eye size={16} className="text-gray-500 group-hover:text-white transition" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition relative z-10">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-400 relative z-10 flex items-center gap-2">
                           <span className={`w-2 h-2 rounded-full ${cert.color.replace('border', 'bg')}`}></span>
                           {cert.issuer} • {cert.code}
                        </p>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {/* --- DOCUMENTS --- */}
            {activeTab === 'documents' && <EmptyState icon={<FileText size={64}/>} title="Documentation" color="text-yellow-400" />}

            {/* Footer */}
            <div className="w-full text-center py-12 mt-8 opacity-50">
               <p className="text-gray-100 text-xs font-mono uppercase tracking-widest">
                 Designed & Developed by Smarth Salaria
               </p>
               <p className="text-gray-400 text-[10px] mt-1">© 2026 // ALL RIGHTS RESERVED</p>
            </div>
            
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

      {/* --- MODAL (Lightbox) --- */}
      {selectedCert && (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedCert(null)}
        >
            <div 
                className="relative max-w-4xl w-full max-h-[90vh] bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
               <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900/50">
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

               <div className="flex-1 overflow-auto p-8 flex justify-center items-center bg-black/50">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg border border-gray-800"
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src="https://placehold.co/600x400?text=Certificate+Image+Not+Found";
                    }}
                  />
               </div>

               <div className="p-4 border-t border-gray-800 bg-gray-900/50 flex justify-end gap-3">
                  <a href={selectedCert.link} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition">
                    <ExternalLink size={16} /> Verify Credential
                  </a>
                  <a href={selectedCert.image} download className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold text-white shadow-lg transition">
                     <Download size={16} /> Download
                  </a>
               </div>
            </div>
        </div>
      )}

    </div>
  );
}

// --- HELPER COMPONENTS ---
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

// Updated MiniCard: Now shows Username/Handle
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