'use client';
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileWarning } from 'lucide-react'; // Import an icon for the error state

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url }) {
  const [width, setWidth] = useState(600);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [url]);

  useEffect(() => {
    const handleResize = () => setWidth(Math.min(window.innerWidth - 40, 800));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-800/50 rounded-xl border border-gray-700 border-dashed w-full h-[400px]">
        <div className="bg-gray-800 p-4 rounded-full mb-4">
            <FileWarning className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-300">Document Not Available</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">
          The file could not be loaded or has been moved.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Document
        file={url}
        onLoadError={() => setHasError(true)} 
        loading={
          <div className="text-white animate-pulse flex flex-col items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm">Loading Document...</p>
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