import './globals.css';
import Script from 'next/script'; // <--- Import Script

export const metadata = {
  title: 'Smarth Salaria | Portfolio',
  description: 'Control Systems Engineer & Full Stack Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* You can add custom meta tags here if needed */}
      </head>
      <body>
        {children}
        
        {/* UMAMI ANALYTICS */}
        <Script 
          defer 
          src="https://cloud.umami.is/script.js" 
          data-website-id="915110e1-b168-4f6b-8344-7d00c068841b" 
          strategy="afterInteractive" // Loads script after page is interactive (best performance)
        />
      </body>
    </html>
  );
}