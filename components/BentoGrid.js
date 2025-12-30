import React from 'react';

export default function BentoGrid({ children }) {
  return (
    // CHANGE: 'auto-rows-auto' for mobile (fits content), 'md:auto-rows-[150px]' for desktop (strict grid)
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[150px]">
      {children}
    </div>
  );
}