import React from 'react';

export default function BentoGrid({ children }) {
  return (
    
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[150px]">
      {children}
    </div>
  );
}