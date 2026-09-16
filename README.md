# Chitte Manoj Reddy Portfolio

A responsive AI and Data Analytics portfolio built with semantic HTML, modern CSS, and vanilla ES modules.

## Current Experience

- Full-screen Home hero with profile image and technology marquee.
- About section with animated metrics and biography.
- Skills matrix with interactive hover states.
- Experience accordion with keyboard support.
- Project cards that reveal details only after click, Enter, or Space.
- Education timeline and certification carousel.
- Certificate image lightbox with focus handling and Escape-to-close support.
- Contact form that validates input and opens a pre-filled Gmail compose window.
- Light and dark theme toggle in the top navigation, persisted in `localStorage`.
- Warm light palette with muted teal accents and a charcoal dark theme.
- Section-specific GSAP and ScrollTrigger animations, with reduced-motion support.
- Optional Three.js particle background with a static-content fallback.

## Technology

- HTML5 and CSS3 custom properties
- Vanilla JavaScript ES modules
- Three.js loaded through the browser import map
- GSAP, ScrollTrigger, and Lenis loaded from CDN scripts
- No build step, package manager, or npm installation is required

## Project Structure

```text
manoj-reddy-portfolio/
├── index.html                 # Main page, metadata, import map, and markup
├── 404.html                   # Static hosting fallback page
├── server.ps1                 # PowerShell static server on port 8080
├── robots.txt                 # Crawler instructions
├── sitemap.xml                # Sitemap for search engines
├── public/assets/             # Profile photo, certificates, and resume
├── src/
│   ├── data.js                # Portfolio content and certificate metadata
│   ├── main.js                # Hydration, navigation, interactions, and animation
│   ├── styles/
│   │   ├── tokens.css         # Light/dark theme design tokens
│   │   └── base.css           # Layout, components, responsive rules, and motion
│   └── webgl/particles.js     # Optional Three.js particle background
└── README.md                  # Project documentation
```

The root `css/`, `js/`, and `assets/` folders are retained legacy/source material. The active page loads styles and JavaScript from `src/` and public media from `public/assets/`.

## Run Locally

### PowerShell server

From the project folder:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\server.ps1
```

Open http://localhost:8080/ in a modern browser.

The execution-policy flag applies only to that PowerShell process. It does not change the machine policy.

### VS Code Live Server

Open `index.html` with the Live Server extension. Any static server is suitable because the site uses browser-native modules.

Do not rely on opening `index.html` directly with a `file:` URL. ES modules, the import map, and local asset loading are more reliable over HTTP.

## Customize Content

Edit `src/data.js` to update:

- Profile biography and metrics
- Skills and experience
- Projects, technologies, and repository/demo links
- Education records
- Certification names, dates, badges, and image paths
- Social links and resume path

Add media to `public/assets/` and reference it with a path such as `public/assets/my-photo.jpg`.

## Theme and Motion

The active light palette is defined in `src/styles/tokens.css`:

- Background: `#FAFAF9`
- Home background: `#EDEBE7`
- Cards: `#FFFFFF`
- Main text: `#1C1917`
- Secondary text: `#78716C`
- Primary accent: `#0F766E`
- Secondary accent: `#10B981`
- Pale teal surface: `#F0FDFA`
- Borders: `#E7E5E4`

The theme toggle stores `light` or `dark` in `localStorage` under `portfolio-theme`. Animations respect `prefers-reduced-motion: reduce`.

## Deployment

This is a static site and can be deployed directly to Vercel, Netlify, GitHub Pages, or any static hosting provider. The project intentionally has no `package.json`, Vite config, or `vercel.json` because it does not need a build step.

For Vercel, set:

- Framework Preset: `Other`
- Build Command: leave empty, or set it to `None`
- Output Directory: `.` (the project root)
- Install Command: leave empty, or set it to `None`

If Vercel still runs `vite build`, open the project Settings and clear the saved Build Command. That setting is external to this repository and causes `vite: command not found`.

No secrets or server-side environment variables are required.

## Verification Checklist

1. Start the local server and open the root URL.
2. Confirm the Home hero appears at the top after a fresh load.
3. Toggle light and dark themes and refresh to verify persistence.
4. Scroll through each section and confirm its content reveals correctly.
5. Click a project card and verify its details open and close.
6. Open a certificate and verify the lightbox closes with Escape.
7. Test the layout at desktop and mobile widths.
