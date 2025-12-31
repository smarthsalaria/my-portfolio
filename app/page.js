'use client';
import { useState } from 'react';
import BentoGrid from '@/components/BentoGrid';
import Card from '@/components/Card';
import Intro from '@/components/Intro'; 
import resumeData from '@/data/resume.json';
import { MapPin, Briefcase, Cpu, Server, Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  

  

  const calculateTotalExperience = (work = []) => {
  let totalMonths = 0;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based

  work.forEach((job) => {
    if (!job.startDate) return;

    const [startYear, startMonth] = job.startDate.split("-").map(Number);

    let endYear, endMonth;

    if (job.endDate === "present" || !job.endDate) {
      endYear = currentYear;
      endMonth = currentMonth;
    } else {
      [endYear, endMonth] = job.endDate.split("-").map(Number);
      endMonth = endMonth - 1; // JS month is 0-based
    }

    const months =
      (endYear - startYear) * 12 +
      (endMonth - (startMonth - 1)+1);

    totalMonths += months;
  });

  const yearsDecimal = (totalMonths / 12).toFixed(1);

  return yearsDecimal;
};

  const years = calculateTotalExperience(resumeData.work);
  

  return (
    <main className="min-h-screen bg-black text-white relative font-sans">
      
      {/* 1. INTRO OVERLAY */}
      {showIntro && (
        <Intro onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. MAIN CONTENT */}
      {!showIntro && (
        <div className="animate-in fade-in duration-1000 py-12 px-4">
          <div className="px-4 sm:px-8 md:px-20 lg:px-52">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-4xl font-bold">
              Overview Portfolio
            </h1>

            <Link
              href="/data-files"
              //className="bg-blue-600 px-6 md:px-8 py-2 rounded-full text-center font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-500/30 text-sm"
            >
              <button className="group flex items-center px-8 py-2 gap-2 bg-blue-600 hover:bg-blue-500 text-white cursor-pointer rounded-full border border-gray-700 transition-all shadow-lg shadow-blue-500/30">
                Data Files
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

          <BentoGrid>
            
            {/* --- PROFILE CARD --- */}
            <Card className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-900 to-gray-900 justify-center">
              <div>
                <h2 className="text-4xl font-bold mb-2">{resumeData.personal.name}</h2>
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
            <div className='grid grid-cols-2 gap-4 md:contents'>
              <Card className="md:col-span-1 md:row-span-1 flex items-center justify-center bg-gray-800 relative group">
                <Briefcase className="w-8 h-8 text-emerald-400 absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition" />
                <div className="text-center">
                  <h3 className="text-5xl font-bold">{years}+</h3>

                  <p className="text-gray-400 text-sm mt-1">Years Exp.</p>
                </div>
              </Card>

              {/* --- LOCATION --- */}
              <Card className="md:col-span-1 md:row-span-1 bg-gray-800 justify-center">
                <MapPin className="w-8 h-8 text-red-400 mb-2" />
                <h3 className="text-xl font-bold">{resumeData.personal.location}</h3>
                <p className="text-xs text-gray-500 uppercase mt-1">Open to Relocation</p>
                <p className="text-xs uppercase">Delhi NCR, Noida, Gurugram</p>
              </Card>
            </div>

            {/* --- TECH STACK (UPDATED: Shows ALL skills) --- */}
            {/* Search for: Tech Stack Card */}
            <Card className="md:col-span-2 md:row-span-1 justify-center overflow-y-auto custom-scrollbar p-1 pl-4">
                <h3 className="
                  sticky top-0 z-10
                  text-lg font-semibold text-gray-300
                   flex items-center gap-2
                  bg-gray-900 py-2 
                ">
                  <Cpu size={18} /> Core Technologies
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
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
                    <span className="text-xs md:text-sm text-blue-400 bg-blue-900/30 px-2 md:px-3 py-1 md:py-2 rounded whitespace-nowrap">{edu.year}</span>
                 </div>
               ))}
            </Card>

            {/* --- WORK HISTORY --- */}
            <Card className="md:col-span-2 md:row-span-2 overflow-y-auto custom-scrollbar relative pt-0 pl-4">
              {/* FIX: Added 'z-10' so text scrolls BEHIND the header, not over it */}
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 sticky top-0 bg-gray-900 py-3 z-15 border-b border-gray-800">
                <Server /> Work Experience
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
                          <Image
                            src={job.logo || "/placeholder.png"}
                            alt={job.company}
                            width={100}
                            height={100}
                            className="object-contain p-1"
                            loading="lazy"
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
            <Card className="md:col-span-2 md:row-span-1 bg-gray-800 overflow-y-auto custom-scrollbar p-0 pl-4">
               <h3 className="sticky top-0 z-10 text-lg font-bold flex items-center gap-2 text-gray-200 bg-gray-800 px-4 py-2">
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