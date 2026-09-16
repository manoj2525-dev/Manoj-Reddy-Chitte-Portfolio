/**
 * PROJECT DETAIL ROUTER & MODAL SYSTEM
 * Supports hash routing (#project/:id or /projects/:id) and deep-dive case study views.
 */

const ProjectRouter = {
  overlayEl: null,
  containerEl: null,
  currentProjectId: null,

  init() {
    this.overlayEl = document.getElementById("project-modal-overlay");
    this.containerEl = document.getElementById("project-modal-body");

    // Close button
    const closeBtn = document.getElementById("project-modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeProject(true));
    }

    // Overlay background click to close
    if (this.overlayEl) {
      this.overlayEl.addEventListener("click", (e) => {
        if (e.target === this.overlayEl) {
          this.closeProject(true);
        }
      });
    }

    // Keyboard ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.closeProject(true);
      }
    });

    // Hash change routing
    window.addEventListener("hashchange", () => this.handleHashChange());
    
    // Initial check on page load
    this.handleHashChange();
  },

  isOpen() {
    return this.overlayEl && this.overlayEl.classList.contains("active");
  },

  handleHashChange() {
    const hash = window.location.hash;
    if (hash.startsWith("#project/")) {
      const projectId = hash.replace("#project/", "");
      this.openProject(projectId, false);
    } else if (this.isOpen()) {
      this.closeProject(false);
    }
  },

  openProject(projectId, updateHash = true) {
    const project = window.PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
    if (!project) return;

    this.currentProjectId = projectId;
    this.renderProjectDetail(project);

    if (this.overlayEl) {
      this.overlayEl.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    if (updateHash) {
      window.location.hash = `#project/${projectId}`;
    }
  },

  closeProject(updateHash = true) {
    if (this.overlayEl) {
      this.overlayEl.classList.remove("active");
      document.body.style.overflow = "";
    }
    this.currentProjectId = null;

    if (updateHash && window.location.hash.startsWith("#project/")) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  },

  renderProjectDetail(p) {
    if (!this.containerEl) return;

    const githubBtnHtml = p.githubUrl
      ? `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          VIEW GITHUB REPO
        </a>`
      : `<button class="btn btn-disabled" aria-disabled="true">
          GITHUB — COMING SOON
        </button>`;

    const demoBtnHtml = p.liveDemoUrl
      ? `<a href="${p.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          LAUNCH LIVE DEMO
        </a>`
      : `<button class="btn btn-disabled" aria-disabled="true">
          LIVE DEMO — COMING SOON
        </button>`;

    this.containerEl.innerHTML = `
      <div class="modal-back-link" id="modal-back-action" role="button" tabindex="0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        BACK TO SELECTED PROJECTS
      </div>

      <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <span class="eyebrow">${p.num}</span>
        <span style="font-size: var(--text-xs); font-family: var(--font-mono); color: var(--text-muted);">${p.date}</span>
      </div>

      <h2 style="font-size: clamp(1.75rem, 3.5vw, 2.5rem); margin-bottom: 1rem; color: var(--text-white);">${p.title}</h2>
      
      <div class="project-impact-pill" style="margin-bottom: 1.5rem;">
        ${p.impact}
      </div>

      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-muted); margin-bottom: 0.5rem;">OVERVIEW</h3>
        <p style="color: var(--text-primary); font-size: var(--text-base); line-height: 1.7;">${p.overview}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1.25rem;">
          <h4 style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 0.5rem;">PROBLEM</h4>
          <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">${p.problem}</p>
        </div>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1.25rem;">
          <h4 style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 0.5rem;">SOLUTION</h4>
          <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">${p.solution}</p>
        </div>
      </div>

      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-muted); margin-bottom: 0.75rem;">KEY FEATURES</h3>
        <ul class="exp-details-list" style="margin-bottom: 0;">
          ${p.features.map((feat) => `<li>${feat}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-muted); margin-bottom: 0.75rem;">TECHNOLOGY STACK</h3>
        <div class="skills-items-container">
          ${p.technology.map((tech) => `<span class="skill-tag">${tech}</span>`).join("")}
        </div>
      </div>

      ${p.futureRoadmap ? `
        <div style="margin-bottom: 2.5rem;">
          <h3 style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-muted); margin-bottom: 0.75rem;">FUTURE IMPROVEMENTS</h3>
          <ul class="exp-details-list" style="margin-bottom: 0;">
            ${p.futureRoadmap.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      ` : ""}

      <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
        ${githubBtnHtml}
        ${demoBtnHtml}
      </div>
    `;

    const backBtn = document.getElementById("modal-back-action");
    if (backBtn) {
      backBtn.addEventListener("click", () => this.closeProject(true));
      backBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.closeProject(true);
        }
      });
    }
  }
};

window.ProjectRouter = ProjectRouter;
