/**
 * MAIN APPLICATION CONTROLLER
 * Full-width project cards, Certificate lightbox integration, Accordion, Sticky Nav
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  init() {
    this.hydrateDOM();
    this.initNavigation();
    this.initMobileMenu();
    this.initExperienceAccordion();

    // Sub-controllers
    if (window.TechAnimations) window.TechAnimations.init();
    if (window.ProjectRouter) window.ProjectRouter.init();
    if (window.ContactController) window.ContactController.init();
  },

  hydrateDOM() {
    const data = window.PORTFOLIO_DATA;

    // 1. Skills Editorial Rows
    const skillsContainer = document.getElementById("skills-editorial-list");
    if (skillsContainer && data.skills) {
      skillsContainer.innerHTML = data.skills.map((cat) => `
        <div class="skills-category-row anim-item">
          <div class="skills-category-name">${cat.category}</div>
          <div class="skills-items-container">
            ${cat.items.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
          </div>
        </div>
      `).join("");
    }

    // 2. Experience Accordion List (with Timeline Node Dots)
    const expContainer = document.getElementById("experience-accordion-container");
    if (expContainer && data.experience) {
      expContainer.innerHTML = data.experience.map((exp, idx) => `
        <div class="experience-card anim-item ${idx === 0 ? 'open active-node' : ''}" id="exp-card-${exp.id}">
          <div class="timeline-item-dot" aria-hidden="true"></div>
          <div class="experience-header" data-exp-id="${exp.id}" role="button" aria-expanded="${idx === 0 ? 'true' : 'false'}" tabindex="0">
            <div class="exp-meta-left">
              <span class="exp-num">${exp.num}</span>
              <span class="exp-title">${exp.title}</span>
              <span class="exp-date">${exp.date}</span>
            </div>
            <div class="exp-toggle-btn">
              <span>VIEW DETAILS</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          <div class="experience-body">
            <p style="font-size: var(--text-sm); color: var(--text-primary); margin-bottom: var(--space-4); font-weight: 500;">${exp.shortDesc}</p>
            <ul class="exp-details-list">
              ${exp.details.map((d) => `<li>${d}</li>`).join("")}
            </ul>
            <div class="exp-tech-container">
              ${exp.technologies.map((t) => `<span class="skill-tag" style="font-size: 0.7rem;">${t}</span>`).join("")}
            </div>
          </div>
        </div>
      `).join("");
    }

    // 3. Selected Projects (SINGLE FULL-WIDTH BLOCK - Conceptual mockups removed)
    const projectsContainer = document.getElementById("projects-editorial-container");
    if (projectsContainer && data.projects) {
      projectsContainer.innerHTML = data.projects.map((p) => `
        <article class="project-case-study anim-item" id="project-${p.id}">
          <div class="project-meta-row">
            <span class="project-num-badge">${p.num}</span>
            <span style="font-size: var(--text-xs); font-family: var(--font-mono); color: var(--text-muted);">${p.date}</span>
          </div>

          <h3 class="project-case-title">${p.title}</h3>
          
          <p class="project-case-desc">${p.description}</p>

          <div class="project-impact-pill">
            ${p.impact}
          </div>

          <div class="project-tech-pills">
            ${p.technology.map((tech) => `<span class="skill-tag">${tech}</span>`).join("")}
          </div>

          <div style="margin-top: var(--space-2); display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm btn-project-view" data-project-id="${p.id}" aria-label="View deep dive of ${p.title}">
              VIEW DETAILS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </article>
      `).join("");

      // Bind Project Detail triggers
      const viewBtns = projectsContainer.querySelectorAll(".btn-project-view");
      viewBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-project-id");
          if (window.ProjectRouter) {
            window.ProjectRouter.openProject(id, true);
          }
        });
      });
    }

    // 4. Education Timeline
    const eduContainer = document.getElementById("education-timeline-container");
    if (eduContainer && data.education) {
      eduContainer.innerHTML = data.education.map((edu) => `
        <div class="education-item-card anim-item">
          <div>
            <h3 class="edu-degree-title">${edu.degree}</h3>
            <p class="edu-school-name">${edu.institution}</p>
          </div>
          <div class="edu-period-badge">${edu.period}</div>
        </div>
      `).join("");
    }

    // 5. Certifications Grid (Click to open original certificate image backend lightbox)
    const certContainer = document.getElementById("certifications-container");
    if (certContainer && data.certifications) {
      certContainer.innerHTML = data.certifications.map((c) => `
        <div class="cert-item-card anim-item" data-cert-img="${c.image || ''}" data-cert-name="${c.credentialName || c.title}" role="button" tabindex="0" aria-label="View original certificate for ${c.title}">
          <div>
            <div class="cert-top-meta">
              <span class="cert-date-text">${c.date}</span>
              <span class="cert-badge-pill">${c.badge}</span>
            </div>
            <h3 class="cert-name-text">${c.title}</h3>
            <div class="cert-desc-text">${c.credentialName}</div>
          </div>
          <div class="cert-action-bar">
            <span>${c.image ? 'VIEW ORIGINAL CERTIFICATE' : 'VERIFIED MILESTONE'}</span>
            ${c.image ? `
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            ` : `
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            `}
          </div>
        </div>
      `).join("");

      // Bind click on certificate cards to open original image lightbox
      certContainer.querySelectorAll(".cert-item-card").forEach((card) => {
        const handler = () => {
          const imgSrc = card.getAttribute("data-cert-img");
          const certName = card.getAttribute("data-cert-name");
          if (imgSrc && window.openCertificate) {
            window.openCertificate(imgSrc, certName);
          }
        };
        card.addEventListener("click", handler);
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handler();
          }
        });
      });
    }
  },

  initExperienceAccordion() {
    const expContainer = document.getElementById("experience-accordion-container");
    if (!expContainer) return;

    expContainer.addEventListener("click", (e) => {
      const header = e.target.closest(".experience-header");
      if (!header) return;

      const card = header.closest(".experience-card");
      if (!card) return;

      const isOpen = card.classList.contains("open");

      // Close all cards
      const allCards = expContainer.querySelectorAll(".experience-card");
      allCards.forEach((c) => {
        c.classList.remove("open");
        const h = c.querySelector(".experience-header");
        if (h) h.setAttribute("aria-expanded", "false");
      });

      // Toggle clicked card
      if (!isOpen) {
        card.classList.add("open");
        header.setAttribute("aria-expanded", "true");
      }
    });

    // Keyboard accessibility
    expContainer.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const header = e.target.closest(".experience-header");
        if (header) {
          e.preventDefault();
          header.click();
        }
      }
    });
  },

  initNavigation() {
    const header = document.getElementById("site-header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, { threshold: 0.2, rootMargin: "-70px 0px -40% 0px" });

    sections.forEach((sec) => observer.observe(sec));
  },

  initMobileMenu() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const closeBtn = document.getElementById("mobile-menu-close");
    const overlay = document.getElementById("mobile-nav-overlay");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (!toggleBtn || !overlay) return;

    const openMenu = () => {
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    };

    toggleBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
};
