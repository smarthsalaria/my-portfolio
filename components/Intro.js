'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Intro({ onComplete }) {
  const text = "Welcome to Smarth Salaria Portfolio";
  const words = text.split(" ");

  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => setIsExiting(true), 2000);
    
    const finish = setTimeout(() => onComplete(), 3500);
    return () => { clearTimeout(timer); clearTimeout(finish); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <h1 className="text-4xl md:text-6xl font-bold text-white flex gap-3 flex-wrap justify-center p-4">
        {words.map((word, i) => (
          <div key={i} className="flex">
            {word.split("").map((char, j) => (
              <motion.span
                key={j}
                initial={{ opacity: 0, y: 20 }}
                animate={isExiting 
                  ? { opacity: 0, x: 100, y: -20, filter: "blur(10px)", scale: 0.5 } 
                  : { opacity: 1, y: 0 }
                }
                transition={{
                  duration: 0.5,
                  delay: isExiting ? (i * 0.1) + (j * 0.05) : 0.5 + (i * 0.1),
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </h1>
    </div>
  );
}