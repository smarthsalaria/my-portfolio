// data/certifications.js
import { BadgeCheck, GraduationCap, Scroll, Award } from 'lucide-react';
import React from 'react';

export const certifications = [
    {
      id: 1,
      category: "professional", 
      title: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      code: "AZ-900",
      date: "2024",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-8 h-8" />,
      link: "https://learn.microsoft.com/api/credentials/share/en-us/smarthsalaria/D926472C09CAEE59?sharingId=79851582C16A4478", 
      file: "/my-portfolio/certificates/az900.pdf",
      color: "border-blue-500"
    },
    {
      id: 2,
      category: "professional", 
      title: "Microsoft Certified: Azure Administrator Associate",
      issuer: "Microsoft",
      code: "AZ-900",
      date: "2024 - 2026",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-8 h-8" />,
      link: "https://learn.microsoft.com/api/credentials/share/en-us/smarthsalaria/F27B9E6BCA6B1292?sharingId=79851582C16A4478", 
      file: "/my-portfolio/certificates/az104.pdf",
      color: "border-blue-500"
    },
    {
      id: 3,
      category: "professional",
      title: "Version Control",
      issuer: "Coursera | Meta",
      code: "Course",
      date: "2024",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg" alt="Coursera" className="w-8 h-8 rounded-full bg-white p-1" />,
      link: "https://coursera.org/share/e7a2d93a3836a18253e2cf4db4248668",
      file: "/my-portfolio/certificates/vc.pdf",
      color: "border-blue-500"
    },
    {
      id: 4,
      category: "professional",
      title: "Basics React",
      issuer: "Coursera | Meta",
      code: "Course",
      date: "2024",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg" alt="Coursera" className="w-8 h-8 rounded-full bg-white p-1" />,
      link: "https://coursera.org/share/1075012ad3e58d26580053b8e67461d1",
      file: "/my-portfolio/certificates/br.pdf",
      color: "border-blue-500"
    },
    {
      id: 5,
      category: "professional",
      title: "Advanced React",
      issuer: "Coursera | Meta",
      code: "Course",
      date: "2025",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg" alt="Coursera" className="w-8 h-8 rounded-full bg-white p-1" />,
      link: "https://coursera.org/share/5ff22c804e577c308da646e6779e9908",
      file: "/my-portfolio/certificates/ar.pdf",
      color: "border-blue-500"
    },

    {
      id: 6,
      category: "university",
      title: "Bachelor of Engineering: Internet of Things",
      issuer: "Chandigarh University, Mohali",
      code: "Computer Science & Engineering",
      date: "2018 - 2022",
      icon: <img src='/my-portfolio/logos/culogo_1.png' alt="Chandigarh University Logo" className='w-8 h-12 bg-gray p-0 '/>,
      link: "#", 
      file: "/my-portfolio/certificates/cu.jpg",
      color: "border-gray-700"
    },
    {
      id: 7,
      category: "other",
      title: "Python 3: Deep Dive (Part 1- Functional)",
      issuer: "Udemy",
      code: "Course | Chandigarh Univeristy",
      date: "2021",
      icon: <Scroll className="w-8 h-8 text-emerald-400" />,
      link: "ude.my/UC-48332433-b730-42d1-a3de-f986cf3e9d3a", 
      file: "/my-portfolio/certificates/python.pdf",
      color: "border-emerald-500"
    },
    {
      id: 8,
      category: "other",
      title: "Algorithms on Graphs",
      issuer: "Coursera",
      code: "Course | Chandigarh University",
      date: "2020",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg" alt="Coursera" className="w-8 h-8 rounded-full bg-white p-1" />,
      link: "https://coursera.org/share/4fcd22d2fcd377d4f2b61f5f69945065", 
      file: "/my-portfolio/certificates/algo.pdf",
      color: "border-emerald-500"
    },

    {
      id: 9,
      category: "other",
      title: "Internet of Things",
      issuer: "Verzeo",
      code: "Workshop | Chandigarh University",
      date: "2021",
      icon: <Scroll className="w-8 h-8 text-emerald-400" />,
      link: "#",
      file: "/my-portfolio/certificates/iot.jpg",
      color: "border-emerald-500"
    },
    {
      id: 10,
      category: "other",
      title: "Web Development",
      issuer: "Bolt TechnoShots program",
      code: "Workshop | Chandigarh University",
      date: "2020",
      icon: <Scroll className="w-8 h-8 text-emerald-400" />,
      link: "#",
      file: "/my-portfolio/certificates/Web.pdf",
      color: "border-emerald-500"
    }
  ];