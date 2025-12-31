'use client';
import { useState } from 'react';
import { Folder, Award, FileText, User, ArrowLeft, Github, Linkedin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function DataFiles() {
  const [activeTab, setActiveTab] = useState('profiles'); // Default view

  return (
    <div className="min-h-screen bg-black text-white flex font-sans overflow-hidden">
      
      {/* --- LEFT SIDEBAR (Menu) --- */}
      <div className="w-1/3 border-r border-gray-800 p-8 flex flex-col justify-center relative bg-gray-900/50">
        
        {/* Back Button */}
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition">
           <ArrowLeft size={20} /> Back to Overview
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-blue-500">Data Files</h1>

        <div className="flex flex-col gap-4">
          <MenuButton 
            icon={<User />} 
            label="Social Profiles" 
            isActive={activeTab === 'profiles'} 
            onClick={() => setActiveTab('profiles')} 
          />
          <MenuButton 
            icon={<Folder />} 
            label="Projects" 
            isActive={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')} 
          />
          <MenuButton 
            icon={<Award />} 
            label="Certificates" 
            isActive={activeTab === 'certificates'} 
            onClick={() => setActiveTab('certificates')} 
          />
          <MenuButton 
            icon={<FileText />} 
            label="Documents" 
            isActive={activeTab === 'documents'} 
            onClick={() => setActiveTab('documents')} 
          />
        </div>
      </div>

      {/* --- RIGHT SIDEBAR (Content Area) --- */}
      <div className="w-2/3 p-12 bg-black flex items-center justify-center relative">
        
        {/* BACKGROUND GRID EFFECT */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* 1. PROFILES VIEW (Default) */}
        {activeTab === 'profiles' && (
          <div className="grid grid-cols-1 gap-6 w-full max-w-2xl z-10">
            {/* GitHub Card (Simulates Embed) */}
            <div className="bg-[#0d1117] border border-gray-700 rounded-xl p-6 hover:border-gray-500 transition group">
               <div className="flex items-center gap-4 mb-4">
                  <Github className="w-10 h-10 text-white" />
                  <div>
                    <h3 className="text-xl font-bold">GitHub Profile</h3>
                    <p className="text-gray-400 text-sm">Check out my repositories and contributions.</p>
                  </div>
               </div>
               {/* GitHub Stats Image (Auto-generated) */}
               <img 
                 src="https://github-readme-stats.vercel.app/api?username=smarthsalaria&show_icons=true&theme=dark&bg_color=0d1117&hide_border=true" 
                 alt="GitHub Stats" 
                 className="w-full mb-4"
               />
               <a href="https://github.com/smarthsalaria" target="_blank" className="text-blue-400 flex items-center gap-2 group-hover:underline">
                 Visit Profile <ExternalLink size={16}/>
               </a>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-[#0077b5]/10 border border-[#0077b5] rounded-xl p-6 hover:bg-[#0077b5]/20 transition group">
               <div className="flex items-center gap-4 mb-4">
                  <Linkedin className="w-10 h-10 text-[#0077b5]" />
                  <div>
                    <h3 className="text-xl font-bold text-[#0077b5]">LinkedIn Profile</h3>
                    <p className="text-gray-300 text-sm">Connect with me professionally.</p>
                  </div>
               </div>
               <div className="bg-black/50 p-4 rounded-lg mb-4 text-sm text-gray-300">
                  "Full Stack Engineer | Industrial IoT Specialist | Bridging OT & IT"
               </div>
               <a href="https://linkedin.com/in/smarthsalaria" target="_blank" className="text-white flex items-center gap-2 group-hover:underline">
                 Connect on LinkedIn <ExternalLink size={16}/>
               </a>
            </div>
          </div>
        )}

        {/* 2. PLACEHOLDERS FOR OTHER TABS */}
        {activeTab === 'projects' && (
          <div className="z-10 text-center">
            <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Project Directory</h2>
            <p className="text-gray-500">Detailed case studies coming soon...</p>
          </div>
        )}

        {activeTab === 'certificates' && (
           <div className="z-10 text-center">
             <Award className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
             <h2 className="text-2xl font-bold">Certifications Hub</h2>
             <p className="text-gray-500">View verified credentials here.</p>
           </div>
        )}
        
        {activeTab === 'documents' && (
           <div className="z-10 text-center">
             <FileText className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
             <h2 className="text-2xl font-bold">Document Archive</h2>
             <p className="text-gray-500">Whitepapers and technical docs.</p>
           </div>
        )}

      </div>
    </div>
  );
}

// Simple Helper Component for the Menu Buttons
function MenuButton({ icon, label, isActive, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-4 text-lg font-medium rounded-xl transition-all duration-200 border w-full text-left
        ${isActive 
          ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
          : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}