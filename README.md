# ⚡ Personal Portfolio: System Interface

> A high-performance, data-centric portfolio website built with **Next.js 16** and **React 19**. Designed with a futuristic "Data System" aesthetic, featuring interactive file viewers, dynamic routing, and persistent state management.

![Project Status](https://img.shields.io/badge/Status-Operational-emerald?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.1-white?style=flat-square&logo=next.js&logoColor=black)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan?style=flat-square&logo=tailwindcss)

## 🚀 Features

* **System UI Architecture:** A tab-based "Data Files" interface separating Profiles, Projects, Credentials, and System Info.
* **Smart Document Viewer:**
    * Integrated **PDF Viewer** (`react-pdf`) for certificates and resumes.
    * **Image Viewer** with automatic fallback logic for broken links.
    * **Keyboard Navigation:** Arrow keys (`←` / `→`) support for browsing files.
    * **Floating Controls:** Mobile-optimized touch controls overlaid on a backdrop.
* **Centralized Data Layer:** Shared data architecture (`app/data/`) ensures consistency between the Overview Dashboard and Data Files.
* **State Persistence:** Uses `SessionStorage` to remember user navigation choices between pages.
* **Responsive Design:** Fully adaptive layout with custom mobile grids and touch targets.
* **Error Handling:** Graceful UI fallbacks for 404s (Missing PDFs/Images) to prevent crashes.

---

## 🛠️ System Architecture (Tech Stack)

### Core Engine
* **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
* **Library:** [React 19](https://react.dev/) (Server Components)
* **Language:** JavaScript (ES6+)

### Interface & Styling
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Animations:** `tailwindcss-animate`, CSS Keyframes
* **PDF Engine:** `react-pdf` (with worker optimization)

### Utilities
* **Conditionals:** `clsx`, `tailwind-merge`
* **Processing:** PostCSS
* **Linting:** ESLint

### Infrastructure
* **Hosting:** GitHub Pages (Static Export)
* **CI/CD:** GitHub Actions
* **Analytics:** Umami (Privacy-focused)

---

## 📂 Project Structure

```bash
.
├── app/
│   ├── data/                 # SHARED DATA LAYER (Single Source of Truth)
│   │   └── certifications.js # Central list of all credentials
│   ├── data-files/           # THE "DATA SYSTEM" PAGE
│   │   └── page.js           # Main logic for Tabs, PDF Viewer & Modal
│   ├── components/           # REUSABLE UI COMPONENTS
│   │   └── PdfViewer.js      # Custom PDF wrapper with error handling
│   ├── layout.js             # Root layout (Fonts, Meta tags)
│   └── page.js               # HOME / OVERVIEW DASHBOARD
├── public/                   # STATIC ASSETS
│   ├── certificates/         # PDF and Image files
│   └── resume.pdf            # CV File
├── next.config.mjs           # Next.js Configuration (Static Export settings)
└── tailwind.config.mjs       # Theme & Animation Config

```

##⚡ Getting Started
1. Prerequisites
Ensure you have Node.js (v18+) 

2. Installation
Clone the repository and install dependencies:

```Bash
git clone [https://github.com/smarthsalaria/my-portfolio.git]
cd my-portfolio
npm install
```
3. Running Locally
Start the development server with Turbopack:

```Bash

npm run dev
Open http://localhost:3000 to view the system.
```

##🔧 How to Update Data
Adding a New Certificate
Upload your PDF/Image to public/certificates/.

Open app/data/certifications.js.

Add a new entry to the array:

```JavaScript

{
  id: 10,
  title: "New Certification Name",
  issuer: "Provider Name",
  date: "2025",
  icon: <BadgeCheck className="w-8 h-8 text-blue-500" />, 
  file: "/certificates/new-cert.pdf", // Path to your file
  color: "border-blue-500"
}
```
The Home page and Data Files page will automatically update.

🚢 Deployment (GitHub Pages)
This project is configured for Static Export.

Push changes to the main branch.

GitHub Actions will automatically build and deploy to the gh-pages branch.

Ensure your next.config.mjs has the correct basePath if serving from a subdirectory.

```JavaScript

const nextConfig = {
  output: "export",  // Required for GitHub Pages
  basePath: "/my-portfolio", // Change to your repo name
  images: { unoptimized: true }, // Required for static export
};
```
📜 License
Designed & Developed by Smarth Salaria. © 2025 All Rights Reserved.
