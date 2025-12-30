'use client';
import { useState } from 'react';
import BentoGrid from '@/components/BentoGrid';
import Card from '@/components/Card';
import Intro from '@/components/Intro'; 
import resumeData from '@/data/resume.json';
import { MapPin, Briefcase, Cpu, Server, Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="min-h-screen bg-black text-white relative font-sans">
      
      {/* 1. INTRO OVERLAY */}
      {showIntro && (
        <Intro onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. MAIN CONTENT */}
      {!showIntro && (
        <div className="animate-in fade-in duration-1000 py-12 px-4">
          <BentoGrid>
            
            {/* --- PROFILE CARD --- */}
            <Card className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-900 to-gray-900 justify-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">{resumeData.personal.name}</h1>
                <p className="text-blue-300 text-xl">{resumeData.personal.role}</p>
                <p className="text-gray-400 mt-4 text-sm">{resumeData.personal.bio}</p>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-6 flex-wrap">
                 <a href={resumeData.personal.socials.github} target="_blank" className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-black transition"><Github size={20} /></a>
                 <a href={resumeData.personal.socials.linkedin} target="_blank" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition"><Linkedin size={20} /></a>
                 <a href={resumeData.personal.socials.email} className="p-2 bg-gray-800 rounded-full hover:bg-emerald-500 hover:text-white transition"><Mail size={20} /></a>
                 <a href={resumeData.personal.socials.mobile} className="p-2 bg-gray-800 rounded-full hover:bg-purple-500 hover:text-white transition"><Phone size={20} /></a>

                 <button className="bg-blue-600 px-8 py-2 rounded-full font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-500/30 text-sm ml-auto">
                   <a href="/my-portfolio/resume.pdf" target="_blank" rel="noopener noreferrer">View CV</a>
                 </button>
              </div>
            </Card>

            {/* --- EXPERIENCE STAT --- */}
            <Card className="md:col-span-1 md:row-span-1 flex items-center justify-center bg-gray-800 relative group">
              <Briefcase className="w-8 h-8 text-emerald-400 absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition" />
              <div className="text-center">
                <h3 className="text-5xl font-bold">{resumeData.personal.totalExperience.split('+')[0]}+</h3>
                <p className="text-gray-400 text-sm mt-1">Years Exp.</p>
              </div>
            </Card>

            {/* --- LOCATION --- */}
            <Card className="md:col-span-1 md:row-span-1 bg-gray-800 justify-center">
              <MapPin className="w-8 h-8 text-red-400 mb-2" />
              <h3 className="text-xl font-bold">{resumeData.personal.location}</h3>
              <p className="text-xs text-gray-500 uppercase mt-1">Open to Relocation</p>
            </Card>

            {/* --- TECH STACK (UPDATED: Shows ALL skills) --- */}
            {/* Search for: Tech Stack Card */}
            <Card className="md:col-span-2 md:row-span-1 justify-center overflow-y-auto custom-scrollbar">
                <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Cpu size={18}/> Core Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {/* Combine all skills and map them ALL (removed .slice) */}
                  {[
                    ...resumeData.skills.frontend, 
                    ...resumeData.skills.backend,
                    ...resumeData.skills.ot_tech
                  ].map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm border border-gray-600 hover:bg-gray-600 transition cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
            </Card>

            {/* --- EDUCATION --- */}
            <Card className="md:col-span-2 md:row-span-1 bg-gray-800 justify-center">
               <h3 className="text-lg font-bold text-gray-200 mb-2">Education</h3>
               {resumeData.education.map((edu, idx) => (
                 <div key={idx} className="flex justify-between items-center border-b border-gray-700 pb-2 last:border-0">
                    <div>
                        <p className="font-bold text-white text-sm md:text-base">{edu.degree}</p>
                        <p className="text-xs md:text-sm text-gray-400">{edu.school}</p>
                    </div>
                    <span className="text-xs md:text-sm text-blue-400 bg-blue-900/30 px-2 py-1 rounded">{edu.year}</span>
                 </div>
               ))}
            </Card>

            {/* --- WORK HISTORY --- */}
            <Card className="md:col-span-2 md:row-span-2 overflow-y-auto custom-scrollbar relative">
              {/* FIX: Added 'z-10' so text scrolls BEHIND the header, not over it */}
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 sticky top-0 bg-gray-900 py-3 z-15 border-b border-gray-800">
                <Server /> Work History
              </h3>
              
              <div className="space-y-8 px-2">
                {resumeData.work.map((job) => (
                  <div key={job.id} className="border-l-2 border-gray-700 pl-6 relative">
                    
                    {/* Timeline Dot */}
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    
                    {/* Header: Logo + Role */}
                    <div className="flex items-center gap-4 mb-2">
                       {/* Company Logo */}
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-600">
                          {/* We use a standard img tag for simplicity. 
                              If the logo is missing, the 'alt' text will show. */}
                          <img 
                            src={job.logo || "https://placehold.co/100"} 
                            alt={job.company} 
                            className="object-contain w-full h-full p-1"
                          />
                       </div>
                       
                       <div>
                         <h4 className="font-bold text-lg leading-tight">{job.role}</h4>
                         <p className="text-sm text-blue-400">{job.company}</p>
                       </div>
                    </div>

                    {/* Date & Description */}
                    <p className="text-xs text-gray-500 mb-2 font-mono">{job.period}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{job.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* --- CERTIFICATIONS --- */}
            {/* Search for: Certifications Card */}
            <Card className="md:col-span-2 md:row-span-1 bg-gray-800 overflow-y-auto custom-scrollbar">
               <h3 className="text-lg font-bold text-gray-200 mb-3 flex items-center gap-2">
                 Certifications
               </h3>
               <div className="grid grid-cols-1 gap-3">
                  {resumeData.certifications.map((cert, idx) => (
                    <a 
                      key={idx} 
                      href={cert.url} 
                      target="_blank"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0"></div>
                            <div>
                                <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition">{cert.name}</p>
                                <p className="text-xs text-gray-500">{cert.issuer}</p>
                            </div>
                        </div>
                        <ExternalLink size={16} className="text-gray-500 opacity-0 group-hover:opacity-100 transition shrink-0" />
                    </a>
                  ))}
               </div>
            </Card>

          </BentoGrid>
        </div>
      )}
    </main>
  );
}