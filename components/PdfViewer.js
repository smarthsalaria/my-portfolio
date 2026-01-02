'use client';
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url }) {
  const [width, setWidth] = useState(600);

  // Responsive Width: Calculate only on the client side
  useEffect(() => {
    const handleResize = () => {
       // Subtract 40px for padding, cap at 800px
       setWidth(Math.min(window.innerWidth - 40, 800));
    };

    // Set initial width
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex justify-center">
      <Document
        file={url}
        loading={
          <div className="text-white animate-pulse flex flex-col items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm">Rendering PDF...</p>
          </div>
        }
        error={
            <div className="text-red-400 text-sm text-center py-10">
                <p>Preview Unavailable.</p>
                <p className="text-xs text-gray-500">Please download the file to view it.</p>
            </div>
        }
      >
        <Page 
            pageNumber={1} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
            width={width}
            className="shadow-2xl rounded-lg overflow-hidden border border-gray-700"
        />
      </Document>
    </div>
  );
}