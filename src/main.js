/**
 * MAIN APPLICATION — BOLD EDITORIAL REDESIGN
 * Chitte Manoj Reddy · AI & Data Analytics
 * ============================================
 */

const DATA = window.PD;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(pointer: coarse)').matches;
const isDesktop = () => window.innerWidth >= 1024;

/* ═══════════════════════════════════════════════════════════════
   SVG ICON GLYPHS FOR SKILLS (Clean inline SVGs for every tool)
═══════════════════════════════════════════════════════════════ */
const SKILL_ICONS = {
  // AI & ML
  "Generative AI": `<svg viewBox="0 0 24 24"><path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z"/></svg>`,
  "Large Language Models": `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  "Prompt Engineering": `<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  "Machine Learning": `<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" stroke-width="2"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" stroke-width="2"/></svg>`,
  "AI Agents": `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>`,

  // Programming
  "Python": `<svg viewBox="0 0 24 24"><path d="M12 2c-3.5 0-4 1.5-4 3v2h4v1H6C3.5 8 2 9.5 2 13s1.5 5 4 5h1v-2c0-1.5 1-2.5 2.5-2.5h3c1 0 2-.8 2-2V7c0-2-1.5-5-5-5zm-1.5 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5.5 5c-1 0-2 .8-2 2v4.5c0 2 1.5 5 5 5 3.5 0 4-1.5 4-3v-2h-4v-1h6c2.5 0 4-1.5 4-5s-1.5-5-4-5h-1v2c0 1.5-1 2.5-2.5 2.5h-3zm2 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>`,
  "SQL": `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,

  // Data & BI
  "Power BI": `<svg viewBox="0 0 24 24"><path d="M3 17h3v4H3v-4zm5-6h3v10H8V11zm5-4h3v14h-3V7zm5-4h3v18h-3V3z"/></svg>`,
  "Excel": `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8l8 8m0-8l-8 8" stroke="currentColor" stroke-width="2"/></svg>`,
  "Pandas": `<svg viewBox="0 0 24 24"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><circle cx="12" cy="14" r="5"/><circle cx="10" cy="13" r="1"/><circle cx="14" cy="13" r="1"/></svg>`,
  "Data Analysis": `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" stroke-width="2"/><line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" stroke-width="2"/></svg>`,
  "Data Validation": `<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
  "Reporting": `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,

  // Automation
  "Microsoft Copilot Studio": `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  "Power Automate": `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  "Workflow Automation": `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h3m6-6v3a3 3 0 0 1-3 3h-3"/></svg>`,

  // Web
  "HTML": `<svg viewBox="0 0 24 24"><path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4zm13.2 5.5l-.2 2.3h-7l.2 2.2h6.6l-.6 6.3-4.2 1.3-4.2-1.3-.3-3.6h2.2l.1 1.8 2.2.6 2.2-.6.2-2.7H8l-.5-6h9.9z"/></svg>`,
  "CSS": `<svg viewBox="0 0 24 24"><path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4zm13.2 4.5l-.3 3H9.1l-.2 2.5h7.9l-.6 6.5-4.2 1.3-4.2-1.3-.3-3.6h2.2l.1 1.8 2.2.6 2.2-.6.3-3.2H6.9L6.5 6.5h10.7z"/></svg>`,
  "JavaScript": `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M14 18c0-1.5 1-2.5 2.5-2.5s2 .5 2 2m-8-4v6c0 1.5-.5 2.5-2 2.5"/></svg>`,
  "React.js": `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5"/></svg>`,
  "Node.js": `<svg viewBox="0 0 24 24"><path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm-1 14.5h-2v-5h2v5zm4 0h-2v-7h2v7z"/></svg>`,
  "Django": `<svg viewBox="0 0 24 24"><path d="M11 2h3v14c0 3-1.5 5-5 5H6v-3h3c1.5 0 2-.8 2-2V2zm-7 8h3v11H4V10z"/></svg>`,
  "REST API": `<svg viewBox="0 0 24 24"><path d="M4 12h16m-7-7l7 7-7 7"/></svg>`,
  "FastAPI": `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,

  // Database & Cloud
  "Oracle DB": `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>`,
  "MySQL": `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="7" rx="8" ry="3"/><path d="M4 7v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7"/></svg>`,
  "GCP": `<svg viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  "Cloud Computing": `<svg viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,

  // Tools
  "VS Code": `<svg viewBox="0 0 24 24"><path d="M18.5 2.5L7 12l11.5 9.5 3-1.5V4l-3-1.5zM3 9l3.5 3L3 15V9z"/></svg>`,
  "Jupyter Notebook": `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/></svg>`,
  "GitHub": `<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  "Microsoft Office": `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>`
};

function getSkillIcon(name) {
  return SKILL_ICONS[name] || `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>`;
}

/* ═══════════════════════════════════════════════════════════════
   1. DOM HYDRATION — Content Injection & Components
═══════════════════════════════════════════════════════════════ */
function hydrateDOM() {
  const D = DATA;

  /* ── About stats ── */
  const statsEl = document.getElementById('about-stats');
  if (statsEl && D.stats) {
    statsEl.innerHTML = D.stats.map(s => `
      <div class="stat-block">
        <div class="stat-num" data-count="${s.num}" data-suffix="${s.suffix}">0</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join('');
  }

  /* ── About bio ── */
  const bioEl = document.getElementById('about-bio');
  if (bioEl && D.bio) {
    bioEl.innerHTML = D.bio.map(p => `<p>${p}</p>`).join('');
  }

  /* ── Skills with Real Icons ── */
  const skillsEl = document.getElementById('skills-grid');
  if (skillsEl && D.skills) {
    skillsEl.innerHTML = D.skills.map((cat, ci) => `
      <div class="skills-row" data-cat="${ci}">
        <div class="skills-cat">${cat.category}</div>
        <div class="skills-chips" data-cat-index="${ci}">
          ${cat.items.map(item => `
            <div class="skill-chip" role="listitem">
              <span class="skill-chip-icon" aria-hidden="true">${getSkillIcon(item)}</span>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>
      </div>`).join('');
  }

  /* ── Experience ── */
  const expEl = document.getElementById('exp-list');
  if (expEl && D.experience) {
    expEl.innerHTML = D.experience.map((e, i) => `
      <div class="exp-card${i === 0 ? ' open' : ''}" id="exp-${e.id}" data-exp-index="${i}">
        <div class="exp-node" aria-hidden="true"></div>
        <div class="exp-header"
             role="button" tabindex="0"
             aria-expanded="${i === 0}"
             aria-controls="exp-body-${e.id}">
          <div class="exp-header-left">
            <span class="exp-num">${e.num}</span>
            <span class="exp-title">${e.title}</span>
          </div>
          <div class="exp-toggle-btn" aria-hidden="true">
            <span>${i === 0 ? 'HIDE' : 'VIEW DETAILS'}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div class="exp-body" id="exp-body-${e.id}" role="region" aria-labelledby="exp-${e.id}">
          <div class="exp-body-inner">
            <p class="exp-short">${e.shortDesc}</p>
            <ul class="exp-details">${e.details.map(d => `<li>${d}</li>`).join('')}</ul>
            <div class="exp-tech">${e.technologies.map(t => `<span class="skill-chip" style="font-size:0.75rem; padding:0.3rem 0.75rem;">${t}</span>`).join('')}</div>
          </div>
        </div>
      </div>`).join('');

    requestAnimationFrame(() => {
      const first = document.querySelector('.exp-card.open .exp-body');
      if (first) first.style.height = first.scrollHeight + 'px';
    });
  }

  /* ── Projects (Direction B: Bold Graphic Visual Panels) ── */
  const projEl = document.getElementById('projects-list');
  if (projEl && D.projects) {
    projEl.innerHTML = D.projects.map((p, i) => {
      // Custom Line-art Glyph for Each Project
      const isInventory = p.id === 'tims';
      const glyph = isInventory
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;

      return `
        <article class="project-card" id="project-${p.id}" tabindex="0" role="button" aria-expanded="false" aria-label="View details for ${p.title}">
          <div class="project-graphic-col" aria-hidden="true">
            <div class="project-graphic-icon-wrap">
              ${glyph}
            </div>
            <div class="project-graphic-badge">${p.shortTitle || p.title.slice(0, 4)}</div>
          </div>
          <div class="project-info">
            <div class="project-num-tag">PROJECT ${p.num} &bull; ${p.date || 'FEATURED'}</div>
            <h3 class="project-title">${p.title}</h3>
            <div class="project-detail-hint">CLICK TO VIEW DETAILS <span aria-hidden="true">&rarr;</span></div>
            <p class="project-desc">${p.desc}</p>
            <div class="project-impact-box">
              <strong>IMPACT:</strong> ${p.impact}
            </div>
            <div class="project-tech-row">
              ${p.tech.map(t => `<span class="skill-chip" style="font-size:0.75rem; padding:0.35rem 0.8rem;">${t}</span>`).join('')}
            </div>
            <div class="project-actions">
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">View Source</a>` : ''}
              ${p.liveDemoUrl ? `<a href="${p.liveDemoUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Live System &rarr;</a>` : ''}
            </div>
          </div>
        </article>`;
    }).join('');
  }

  /* ── Education ── */
  const eduEl = document.getElementById('edu-list');
  if (eduEl && D.education) {
    eduEl.innerHTML = D.education.map(e => `
      <div class="edu-card">
        <div class="edu-period">${e.period}</div>
        <div>
          <div class="edu-degree">${e.degree}</div>
          <div class="edu-institution">${e.institution}</div>
        </div>
      </div>`).join('');
  }

  /* ── Certifications Carousel ── */
  const certTrackEl = document.getElementById('cert-track');
  if (certTrackEl && D.certifications) {
    certTrackEl.innerHTML = D.certifications.map(c => `
      <div class="cert-slide" role="group" aria-label="${c.title}">
        <button class="cert-card" data-cert-id="${c.id}" data-cert-img="${c.img}" data-cert-name="${c.name}"
                aria-label="Inspect ${c.title} verified certificate">
          <span class="cert-badge ${c.badge}">${c.badgeLabel}</span>
          <div class="cert-issuer">${c.title}</div>
          <div class="cert-name">${c.name}</div>
          <div class="cert-date">${c.date}</div>
          <span class="cert-view-link" aria-hidden="true">Inspect Credential &rarr;</span>
        </button>
      </div>`).join('');

    const dotsEl = document.getElementById('carousel-dots');
    if (dotsEl) {
      dotsEl.innerHTML = D.certifications.map((_, i) => `
        <button class="carousel-dot${i === 0 ? ' active' : ''}"
                aria-label="Go to slide ${i + 1}" data-slide="${i}">
          <div class="carousel-dot-fill"></div>
        </button>`).join('');
    }
  }

  /* ── Marquee Loop ── */
  const marqueeEl = document.querySelector('.hero-marquee');
  if (marqueeEl && D.marqueeItems) {
    const items = D.marqueeItems.map(t => `<span>${t}</span><span class="sep">&bull;</span>`).join('');
    marqueeEl.innerHTML = items + items + items; // repeat for unbroken loop
  }

  /* ── Mobile Nav Links ── */
  const mobileLinks = document.getElementById('mobile-nav-links');
  if (mobileLinks) {
    mobileLinks.innerHTML = ['home','about','skills','experience','projects','education','certifications','contact']
      .map(s => `<li><a href="#${s}" class="mobile-nav-link">${s.toUpperCase()}</a></li>`).join('');
  }
}

/* ═══════════════════════════════════════════════════════════════
   2. PRELOADER
═══════════════════════════════════════════════════════════════ */
function initPreloader(onDone) {
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('preloader-bar');
  const pct = document.getElementById('preloader-pct');

  if (reducedMotion) {
    if (preloader) preloader.classList.add('hidden');
    onDone();
    return;
  }

  let progress = 0;
  const setProgress = (v) => {
    progress = Math.max(progress, v);
    if (bar) bar.style.width = progress + '%';
    if (pct) pct.textContent = Math.round(progress) + '%';
    if (progress >= 100) {
      setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
        onDone();
      }, 300);
    }
  };

  let t = 0;
  const tick = setInterval(() => {
    t += 20 + Math.random() * 25;
    setProgress(Math.min(t, 90));
    if (t >= 90) clearInterval(tick);
  }, 120);

  document.fonts.ready.then(() => setProgress(100));
  setTimeout(() => setProgress(100), 1800);
}

/* ═══════════════════════════════════════════════════════════════
   3. EXPERIENCE ACCORDION
═══════════════════════════════════════════════════════════════ */
function initAccordion() {
  const cards = document.querySelectorAll('.exp-card');

  const openCard = (card) => {
    const body = card.querySelector('.exp-body');
    const header = card.querySelector('.exp-header');
    const toggleLabel = card.querySelector('.exp-toggle-btn span');
    card.classList.add('open');
    header.setAttribute('aria-expanded', 'true');
    if (toggleLabel) toggleLabel.textContent = 'HIDE';
    body.style.height = body.scrollHeight + 'px';
    body.addEventListener('transitionend', () => {
      if (card.classList.contains('open')) body.style.height = 'auto';
    }, { once: true });
  };

  const closeCard = (card) => {
    const body = card.querySelector('.exp-body');
    const header = card.querySelector('.exp-header');
    const toggleLabel = card.querySelector('.exp-toggle-btn span');
    body.style.height = body.scrollHeight + 'px';
    requestAnimationFrame(() => { body.style.height = '0'; });
    card.classList.remove('open');
    header.setAttribute('aria-expanded', 'false');
    if (toggleLabel) toggleLabel.textContent = 'VIEW DETAILS';
  };

  cards.forEach(card => {
    const header = card.querySelector('.exp-header');
    header.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      cards.forEach(c => { if (c.classList.contains('open')) closeCard(c); });
      if (!isOpen) openCard(card);
    });
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); }
    });
  });
}

function initProjects() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  const toggleCard = (card) => {
    const open = card.classList.toggle('open');
    card.setAttribute('aria-expanded', String(open));
    cards.forEach(other => {
      if (other !== card) {
        other.classList.remove('open');
        other.setAttribute('aria-expanded', 'false');
      }
    });
  };

  cards.forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      toggleCard(card);
    });
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCard(card);
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   4. CERTIFICATIONS CAROUSEL
═══════════════════════════════════════════════════════════════ */
function initCarousel() {
  const track = document.getElementById('cert-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const wrap = document.querySelector('.carousel-track-wrap');
  if (!track || !wrap) return;

  const INTERVAL = 3500;
  let current = 0;
  let timer = null;
  let isHovered = false;
  let dragStartX = 0, dragDeltaX = 0, isDragging = false;

  const slides = track.querySelectorAll('.cert-slide');
  const total = slides.length;

  const slidesPerView = () => {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  };

  const goTo = (idx, animate = true) => {
    current = ((idx % total) + total) % total;
    const offset = current * (100 / slidesPerView());
    track.style.transition = animate && !reducedMotion ? 'transform .6s cubic-bezier(.22,1,.36,1)' : 'none';
    track.style.transform = `translateX(calc(-${offset}% - ${current * 24}px))`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      const fill = d.querySelector('.carousel-dot-fill');
      if (fill) {
        fill.style.transition = 'none';
        fill.style.transform = 'scaleX(0)';
        if (i === current && !reducedMotion) {
          requestAnimationFrame(() => {
            fill.style.transition = `transform ${INTERVAL}ms linear`;
            fill.style.transform = 'scaleX(1)';
          });
        }
      }
    });
  };

  const startAuto = () => {
    clearInterval(timer);
    if (reducedMotion) return;
    timer = setInterval(() => {
      if (!isHovered) goTo(current + 1);
    }, INTERVAL);
  };

  const stopAuto = () => clearInterval(timer);

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.slide));
      startAuto();
    });
  });

  wrap.addEventListener('mouseenter', () => { isHovered = true; stopAuto(); });
  wrap.addEventListener('mouseleave', () => { isHovered = false; startAuto(); });
  wrap.addEventListener('focusin', () => { isHovered = true; stopAuto(); });
  wrap.addEventListener('focusout', () => {
    isHovered = false;
    if (!wrap.matches(':focus-within')) startAuto();
  });

  wrap.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  // Swipe gesture
  const onDragStart = (x) => { isDragging = true; dragStartX = x; track.style.transition = 'none'; };
  const onDragMove  = (x) => { if (!isDragging) return; dragDeltaX = x - dragStartX; };
  const onDragEnd   = () => {
    if (!isDragging) return; isDragging = false;
    if (dragDeltaX < -50) goTo(current + 1);
    else if (dragDeltaX > 50) goTo(current - 1);
    else goTo(current);
    dragDeltaX = 0;
    startAuto();
  };

  wrap.addEventListener('mousedown', e => onDragStart(e.clientX));
  window.addEventListener('mousemove', e => { if (isDragging) onDragMove(e.clientX); });
  window.addEventListener('mouseup', onDragEnd);

  wrap.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
  wrap.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),  { passive: true });
  wrap.addEventListener('touchend',   onDragEnd);

  const io = new IntersectionObserver(([entry]) => {
    entry.isIntersecting ? startAuto() : stopAuto();
  }, { threshold: 0.1 });
  const certSection = document.getElementById('certifications');
  if (certSection) io.observe(certSection);

  window.addEventListener('resize', () => goTo(current, false), { passive: true });

  goTo(0, false);
  startAuto();
}

/* ═══════════════════════════════════════════════════════════════
   5. CERTIFICATE LIGHTBOX
═══════════════════════════════════════════════════════════════ */
function initLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  if (!overlay) return;

  let lastFocused = null;

  const open = (certId) => {
    const cert = DATA.certifications.find(c => c.id === certId);
    if (!cert) return;
    img.src = cert.img;
    img.alt = cert.name;
    if (caption) caption.textContent = `${cert.title} · ${cert.name} · ${cert.date}`;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    lastFocused = document.activeElement;
    setTimeout(() => closeBtn && closeBtn.focus(), 50);
  };

  const close = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });

  overlay.addEventListener('keydown', e => {
    if (e.key === 'Tab' && overlay.classList.contains('active')) {
      const focusable = overlay.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  document.getElementById('cert-track')?.addEventListener('click', e => {
    const card = e.target.closest('.cert-card');
    if (card) open(card.dataset.certId);
  });
}

/* ═══════════════════════════════════════════════════════════════
   6. ABOUT STAT COUNTERS (Count-up on scroll)
═══════════════════════════════════════════════════════════════ */
function initCounters() {
  const stats = document.querySelectorAll('.stat-num[data-count]');
  if (!stats.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      if (reducedMotion) { el.textContent = target + suffix; io.unobserve(el); return; }

      let start = null;
      const duration = 1400;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.3 });

  stats.forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   7. NAVIGATION — Sliding underline & Scroll-spy
═══════════════════════════════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('site-nav');
  const links = document.querySelectorAll('.nav-link');
  const underline = document.querySelector('.nav-underline');
  const sections = ['home','about','skills','experience','projects','education','certifications','contact'];

  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    let active = sections[0];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) active = id;
    });
    links.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + active;
      link.classList.toggle('active', isActive);
      if (isActive && underline) {
        const rect = link.getBoundingClientRect();
        const navRect = link.closest('.nav-links-wrap').getBoundingClientRect();
        underline.style.left  = (rect.left - navRect.left) + 'px';
        underline.style.width = rect.width + 'px';
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose  = document.getElementById('mobile-close');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');

  const openMobile = () => {
    mobileOverlay.classList.add('open');
    mobileOverlay.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  };
  const closeMobile = () => {
    mobileOverlay.classList.remove('open');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openMobile);
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', closeMobile));
}

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const setTheme = (theme) => {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      toggle.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    }
  };

  setTheme(storedTheme || (prefersDark ? 'dark' : 'light'));
  toggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
    setTheme(next);
  });
}

/* ═══════════════════════════════════════════════════════════════
   8. CUSTOM CURSOR (Signal Amber)
═══════════════════════════════════════════════════════════════ */
function initCursor() {
  if (isTouch || !isDesktop()) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -999, my = -999, rx = -999, ry = -999;
  const LERP = 0.12;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  let lastTs = 0;
  const loop = (ts) => {
    const dt = Math.min((ts - lastTs) / 16.67, 3);
    lastTs = ts;
    const l = 1 - Math.pow(1 - LERP, dt);
    rx += (mx - rx) * l;
    ry += (my - ry) * l;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  document.addEventListener('mouseleave', () => { dot.style.opacity='0'; ring.style.opacity='0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity='1'; ring.style.opacity='1'; });

  const setRingClass = (cls) => ring.className = cls;
  const watchTargets = () => {
    document.querySelectorAll('a, .nav-link').forEach(el => {
      el.addEventListener('mouseenter', () => setRingClass('hover-link'));
      el.addEventListener('mouseleave', () => setRingClass(''));
    });
    document.querySelectorAll('.btn, button').forEach(el => {
      el.addEventListener('mouseenter', () => setRingClass('hover-btn'));
      el.addEventListener('mouseleave', () => setRingClass(''));
    });
    document.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.style.opacity='0'; ring.style.opacity='0'; });
      el.addEventListener('mouseleave', () => { dot.style.opacity='1'; ring.style.opacity='1'; });
    });
  };
  watchTargets();
}

/* ═══════════════════════════════════════════════════════════════
   9. VOICE WIDGET (Automatic Voice On Load / Refresh)
═══════════════════════════════════════════════════════════════ */
function initVoice() {
  const widget = document.getElementById('voice-widget');
  if (!widget || !('speechSynthesis' in window)) {
    if (widget) widget.style.display = 'none';
    return;
  }

  // Always enable voice on fresh load / refresh
  let muted = false;
  let hasSpoken = false;

  const text = "Welcome to my portfolio. I'm Manoj Reddy — I build intelligent solutions through AI, data, and automation.";
  let utter = null;
  let playing = false;

  const setState = (p) => {
    playing = p;
    widget.setAttribute('aria-pressed', p);
    widget.setAttribute('aria-label', p ? 'Stop voice intro' : 'Play voice intro');
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setState(false);
  };

  const play = () => {
    if (muted) return;
    window.speechSynthesis.cancel();
    utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.93;
    utter.pitch = 0.90; // Natural masculine depth
    utter.volume = 1.0;

    // Prioritize male English voices across Windows, Edge, and Chrome
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const maleKeywords = [
        'david', 'mark', 'george', 'guy', 'ryan', 'christopher', 'eric', 'brian',
        'andrew', 'roger', 'steffan', 'ravi', 'male'
      ];
      
      // 1. Look for an English voice explicitly matching male names
      let selectedVoice = voices.find(v => {
        const nameLower = v.name.toLowerCase();
        return v.lang.startsWith('en') && maleKeywords.some(kw => nameLower.includes(kw));
      });

      // 2. Fallback: Google or Natural English voice that is not female
      if (!selectedVoice) {
        const femaleKeywords = ['zira', 'jenny', 'aria', 'hazel', 'susan', 'catherine', 'heera', 'female'];
        selectedVoice = voices.find(v => {
          const nameLower = v.name.toLowerCase();
          return v.lang.startsWith('en') && !femaleKeywords.some(kw => nameLower.includes(kw));
        });
      }

      // 3. General English fallback
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en'));
      }

      if (selectedVoice) utter.voice = selectedVoice;
    }

    utter.onstart = () => {
      hasSpoken = true;
      setState(true);
    };
    utter.onend = () => {
      setState(false);
    };
    utter.onerror = (e) => {
      console.warn('[Voice Intro] Error or blocked:', e);
      setState(false);
    };

    window.speechSynthesis.speak(utter);
  };

  // Attempt automatic speech synthesis after a brief delay
  const attemptAutoplay = () => {
    if (hasSpoken || muted) return;
    play();
  };

  // 1. Trigger automatically shortly after load
  setTimeout(attemptAutoplay, 800);

  // 2. If voices load asynchronously in Chromium, attempt speak
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      if (!hasSpoken && !muted) setTimeout(attemptAutoplay, 300);
    };
  }

  // 3. Fallback for strict browser autoplay policies: trigger on first user gesture
  const userGestureTrigger = () => {
    if (!hasSpoken && !muted) {
      play();
    }
    window.removeEventListener('click', userGestureTrigger);
    window.removeEventListener('keydown', userGestureTrigger);
    window.removeEventListener('touchstart', userGestureTrigger);
    window.removeEventListener('scroll', userGestureTrigger);
  };
  window.addEventListener('click', userGestureTrigger, { once: true, passive: true });
  window.addEventListener('keydown', userGestureTrigger, { once: true, passive: true });
  window.addEventListener('touchstart', userGestureTrigger, { once: true, passive: true });
  window.addEventListener('scroll', userGestureTrigger, { once: true, passive: true });

  // Toggle button interactions
  widget.addEventListener('click', () => {
    if (playing) {
      stop();
      muted = true;
    } else {
      muted = false;
      play();
    }
  });

  widget.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      widget.click();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  window.addEventListener('hashchange', stop);
}

/* ═══════════════════════════════════════════════════════════════
   10. CONTACT FORM → PRE-FILLED GMAIL SEND
═══════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const submitBtn = document.getElementById('form-submit-btn');
  const feedbackNotice = document.getElementById('form-feedback-notice');
  const feedbackText = document.getElementById('form-feedback-text');
  const fallbackArea = document.getElementById('form-fallback-area');

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const msgError = document.getElementById('msg-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    let valid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('invalid');
      nameError.style.display = 'block';
      valid = false;
    } else {
      nameInput.closest('.form-group').classList.remove('invalid');
      nameError.style.display = 'none';
    }

    // Email validation
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('invalid');
      emailError.style.display = 'block';
      valid = false;
    } else {
      emailInput.closest('.form-group').classList.remove('invalid');
      emailError.style.display = 'none';
    }

    // Message validation
    if (!messageInput.value.trim()) {
      messageInput.closest('.form-group').classList.add('invalid');
      msgError.style.display = 'block';
      valid = false;
    } else {
      messageInput.closest('.form-group').classList.remove('invalid');
      msgError.style.display = 'none';
    }

    return valid;
  };

  [nameInput, emailInput, messageInput].forEach(inp => {
    inp.addEventListener('input', () => {
      inp.closest('.form-group').classList.remove('invalid');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Button loading state (< 300ms)
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const rawSubject = subjectInput.value.trim() || 'Portfolio inquiry';
    const rawMessage = messageInput.value.trim();

    // Construct body with clear prefix
    const bodyContent = `Hi Manoj,\n\n${rawMessage}\n\n---\nFrom: ${senderName}\nEmail: ${senderEmail}`;

    // Construct Gmail Compose URL
    const to = 'manojreddy2525@gmail.com';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(bodyContent)}`;
    const mailtoFallback = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(bodyContent)}`;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      // Attempt to open Gmail in a new tab
      const newTab = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

      // Present honest, clear feedback
      feedbackNotice.classList.add('shown', 'gmail-opened');
      feedbackText.innerHTML = `<strong>Opened in Gmail!</strong> Click <em>Send</em> in your Gmail tab to deliver your message.`;

      fallbackArea.innerHTML = `
        If Gmail didn't open or pop-ups are blocked: 
        <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="fallback-link">Click to open Gmail compose</a> or 
        <a href="${mailtoFallback}" class="fallback-link">open default mail app</a>.
      `;

      // Clear the form fields after successful trigger
      form.reset();
    }, 280);
  });
}

/* ═══════════════════════════════════════════════════════════════
   11. SCROLL PROGRESS
═══════════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════
   12. PAGE MOTION — Entry, Scroll Reveals & Staggered Groups
═══════════════════════════════════════════════════════════════ */
function initPageMotion() {
  const sections = [...document.querySelectorAll('.section')];
  const revealGroups = [
    '.section-header-block', '.skills-row', '.exp-card', '.project-card',
    '.edu-card', '.cert-slide', '.contact-channel-row', '.contact-form-wrap'
  ];
  const revealTargets = sections.flatMap(section => revealGroups.flatMap(selector =>
    [...section.querySelectorAll(selector)]
  ));
  const heroTargets = [
    '.hero-eyebrow-pill', '.hero-name', '.hero-role-wrapper',
    '.hero-pitch', '.hero-ctas', '.hero-social-row', '.hero-visual-frame',
    '.hero-marquee-wrap'
  ].map(selector => document.querySelector(selector)).filter(Boolean);

  if (reducedMotion) return;

  [...revealTargets, ...heroTargets].forEach(element => {
    element.classList.add('motion-reveal');
  });

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(heroTargets,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: .8, stagger: .09, delay: .15, ease: 'power3.out' }
    );

    sections.forEach(section => {
      const trigger = { trigger: section, start: 'top 78%', once: true };
      const timeline = gsap.timeline({ scrollTrigger: trigger });
      const header = section.querySelector('.section-header-block');

      if (header) timeline.fromTo(header,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: .65, ease: 'power3.out' }
      );

      switch (section.id) {
        case 'about': {
          const statement = section.querySelector('.about-statement');
          const stats = section.querySelectorAll('.stat-block');
          const bio = section.querySelector('.about-right');
          timeline.fromTo(statement,
            { opacity: 0, x: -70, clipPath: 'inset(0 100% 0 0)' },
            { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: .9, ease: 'power4.out' }, '-=.2'
          ).fromTo(stats,
            { opacity: 0, scale: .72, y: 28 },
            { opacity: 1, scale: 1, y: 0, duration: .6, stagger: .12, ease: 'back.out(1.5)' }, '-=.45'
          ).fromTo(bio,
            { opacity: 0, x: 70 },
            { opacity: 1, x: 0, duration: .8, ease: 'power3.out' }, '-=.7'
          );
          break;
        }
        case 'skills':
          timeline.fromTo(section.querySelectorAll('.skills-row'),
            { opacity: 0, x: -45, scaleX: .92, transformOrigin: 'left center' },
            { opacity: 1, x: 0, scaleX: 1, duration: .65, stagger: .13, ease: 'power3.out' }, '-=.15'
          ).fromTo(section.querySelectorAll('.skill-chip'),
            { opacity: 0, y: 16, scale: .85 },
            { opacity: 1, y: 0, scale: 1, duration: .38, stagger: .025, ease: 'back.out(1.4)' }, '-=.45');
          break;
        case 'experience':
          timeline.fromTo(section.querySelectorAll('.exp-card'),
            { opacity: 0, x: (index) => index % 2 ? 70 : -70, rotate: (index) => index % 2 ? 1.5 : -1.5 },
            { opacity: 1, x: 0, rotate: 0, duration: .72, stagger: .16, ease: 'power3.out' }, '-=.1'
          );
          break;
        case 'projects':
          timeline.fromTo(section.querySelectorAll('.project-card'),
            { opacity: 0, y: 55, scale: .9, rotateX: 8 },
            { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: .85, stagger: .2, ease: 'power4.out' }, '-=.1'
          ).fromTo(section.querySelectorAll('.project-graphic-icon-wrap'),
            { opacity: 0, rotate: -25, scale: .55 },
            { opacity: 1, rotate: 0, scale: 1, duration: .65, stagger: .2, ease: 'back.out(1.7)' }, '-=.55');
          break;
        case 'education':
          timeline.fromTo(section.querySelectorAll('.edu-card'),
            { opacity: 0, x: 80, borderLeftColor: 'transparent' },
            { opacity: 1, x: 0, borderLeftColor: 'var(--accent)', duration: .7, stagger: .16, ease: 'power3.out' }, '-=.1'
          );
          break;
        case 'certifications':
          timeline.fromTo(section.querySelectorAll('.cert-slide'),
            { opacity: 0, y: 45, rotateY: 18 },
            { opacity: 1, y: 0, rotateY: 0, duration: .75, stagger: .14, ease: 'power3.out' }, '-=.1'
          ).fromTo(section.querySelectorAll('.carousel-controls, .carousel-dots'),
            { opacity: 0, scale: .8 },
            { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.5)' }, '-=.35');
          break;
        case 'contact':
          timeline.fromTo(section.querySelectorAll('.contact-channel-row'),
            { opacity: 0, x: -55, clipPath: 'inset(0 100% 0 0)' },
            { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: .65, stagger: .12, ease: 'power3.out' }, '-=.1'
          ).fromTo(section.querySelector('.contact-form-wrap'),
            { opacity: 0, x: 55, scale: .96 },
            { opacity: 1, x: 0, scale: 1, duration: .8, ease: 'power3.out' }, '-=.65');
          break;
        default:
          timeline.fromTo(revealGroups.flatMap(selector => [...section.querySelectorAll(selector)]),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: .72, stagger: .08, ease: 'power3.out' }, '-=.1');
      }
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  [...revealTargets, ...heroTargets].forEach(element => observer.observe(element));
}

/* ═══════════════════════════════════════════════════════════════
   13. LENIS & SCROLLTRIGGER
═══════════════════════════════════════════════════════════════ */
function initLenis(particles) {
  if (typeof Lenis === 'undefined' || isTouch || reducedMotion) return;

  const lenis = new Lenis({
    duration: 1.15,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  if (window.ScrollTrigger) {
    lenis.on('scroll', ScrollTrigger.update);
  }

  const rafLoop = (time) => { lenis.raf(time); requestAnimationFrame(rafLoop); };
  requestAnimationFrame(rafLoop);

  // Subtle watermark parallax effect
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.section-watermark').forEach(wm => {
      gsap.to(wm, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: wm.closest('.section') || wm,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Morph 3D background per section
    if (particles) {
      const morphMap = {
        '#about': 'about',
        '#skills': 'skills',
        '#experience': 'experience',
        '#projects': 'ambient',
        '#education': 'ambient',
        '#certifications': 'ambient',
        '#contact': 'contact'
      };
      Object.entries(morphMap).forEach(([sel, form]) => {
        const el = document.querySelector(sel);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          onEnter: () => particles.morphTo(form, 1.2),
          onLeaveBack: () => sel === '#about' && particles.morphTo('hero', 1.0)
        });
      });
    }
  }

  return lenis;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN BOOTSTRAP
═══════════════════════════════════════════════════════════════ */
async function main() {
  initTheme();
  hydrateDOM();

  initPreloader(async () => {
    let particles = null;
    try {
      const { createScene, ParticleSystem } = await import('./webgl/particles.js');
      const webgl = createScene();
      if (webgl) {
        const { renderer, scene, camera } = webgl;
        particles = new ParticleSystem(renderer, scene, camera);
        setTimeout(() => particles.morphTo('hero', 1.5), 200);

        window.addEventListener('mousemove', e => {
          const ndcX = (e.clientX / window.innerWidth)  * 2 - 1;
          const ndcY = (e.clientY / window.innerHeight) * 2 - 1;
          particles.setPointer(ndcX, -ndcY);
        }, { passive: true });

        const canvas = document.getElementById('webgl-canvas');
        let paused = false;
        const clock = { start: Date.now() };
        document.addEventListener('visibilitychange', () => { paused = document.hidden; });

        const renderLoop = () => {
          requestAnimationFrame(renderLoop);
          if (paused) return;
          const elapsed = (Date.now() - clock.start) / 1000;
          particles.tick(elapsed);
          renderer.render(scene, camera);
        };
        requestAnimationFrame(renderLoop);
        if (canvas) canvas.classList.add('ready');
      }
    } catch (err) {
      console.warn('[WebGL] Fallback to static:', err);
      document.documentElement.classList.add('no-webgl');
    }

    initLenis(particles);
  });

  initNav();
  initAccordion();
  initProjects();
  initCarousel();
  initLightbox();
  initCounters();
  initCursor();
  initVoice();
  initContactForm();
  initScrollProgress();
  initPageMotion();
}

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (!window.location.hash) window.scrollTo(0, 0);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
