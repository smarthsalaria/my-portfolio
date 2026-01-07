import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Smarth Salaria | Portfolio',
  description: 'Senior Automation/EMS Engineer Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        {children}
        
        <Script 
          defer 
          src="https://cloud.umami.is/script.js" 
          data-website-id="915110e1-b168-4f6b-8344-7d00c068841b" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}