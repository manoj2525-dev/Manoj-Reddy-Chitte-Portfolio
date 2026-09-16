/**
 * REFINED FULL-SITE ANIMATION SYSTEM & MICRO-INTERACTIONS
 * Respects prefers-reduced-motion.
 * Section Sequencer + Experience Drawing Line + Voice Intro (Web Speech API)
 */

const TechAnimations = {
  canvas: null,
  ctx: null,
  particles: [],
  animationFrameId: null,
  isReducedMotion: false,
  isVisible: true,

  // In-memory session state for Voice Intro (not localStorage)
  hasSpokenSession: false,
  isVoiceMuted: false,

  init() {
    this.isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.initScrollProgress();
    this.initHeroEntrance();
    this.initCanvas();
    this.initVoiceIntro();
    this.initSectionSequenceObserver();
    this.initExperienceTimelineDraw();
    this.initBackToTop();
    this.initCopyEmailCrossFade();
    this.initCertificateLightbox();
  },

  // 1. SCROLL PROGRESS BAR (Accent color, persistent)
  initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress-bar");
    if (!progressBar) return;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        progressBar.style.width = `${progress}%`;
      }
    }, { passive: true });
  },

  // 2. VOICE INTRO USING WEB SPEECH API (speechSynthesis)
  initVoiceIntro() {
    const widget = document.getElementById("voice-intro-widget");
    const statusText = document.getElementById("voice-status-text");
    if (!widget) return;

    const introText = "Welcome to my portfolio. I'm Manoj Reddy — I build intelligent solutions through AI, data, and automation.";

    const speakGreeting = () => {
      if (this.hasSpokenSession || this.isVoiceMuted) return;
      if (!('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(introText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Select a clear English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Alex") || v.name.includes("Guy") || v.name.includes("David")));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onstart = () => {
        widget.classList.add("speaking");
        if (statusText) statusText.textContent = "Speaking...";
        this.hasSpokenSession = true;
      };

      utterance.onend = () => {
        widget.classList.remove("speaking");
        if (statusText) statusText.textContent = "Voice Intro";
      };

      utterance.onerror = () => {
        widget.classList.remove("speaking");
        if (statusText) statusText.textContent = "Voice Intro";
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("SpeechSynthesis error:", err);
      }
    };

    // Toggle mute/speaker in the corner (in-memory state)
    widget.addEventListener("click", () => {
      this.isVoiceMuted = !this.isVoiceMuted;
      if (this.isVoiceMuted) {
        window.speechSynthesis.cancel();
        widget.classList.remove("speaking");
        widget.classList.add("muted");
        if (statusText) statusText.textContent = "Muted";
      } else {
        widget.classList.remove("muted");
        if (statusText) statusText.textContent = "Voice Intro";
        speakGreeting();
      }
    });

    // Auto trigger on first load after 1.5s delay
    setTimeout(() => {
      speakGreeting();
    }, 1500);

    // Fallback: If browser blocks autoplay audio, trigger on first user click or scroll gracefully
    const onUserInteraction = () => {
      if (!this.hasSpokenSession && !this.isVoiceMuted) {
        speakGreeting();
      }
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };

    window.addEventListener("click", onUserInteraction, { once: true });
    window.addEventListener("scroll", onUserInteraction, { once: true });
    window.addEventListener("keydown", onUserInteraction, { once: true });
  },

  // 3. HERO ENTRANCE (Page load, not scroll)
  initHeroEntrance() {
    if (this.isReducedMotion) return;

    const avatar = document.querySelector(".hero-avatar-frame");
    const headline = document.querySelector(".hero-headline");
    const subhead = document.querySelector(".hero-subhead");
    const supporting = document.querySelector(".hero-supporting");
    const ctas = document.querySelector(".hero-ctas");
    const social = document.querySelector(".hero-social-row");

    // Profile image scales in from 0.95 to 1 with a fade
    if (avatar) {
      avatar.style.opacity = "0";
      avatar.style.transform = "scale(0.95)";
      avatar.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
    }

    // Text slides up and fades in
    const textEls = [headline, subhead, supporting].filter(Boolean);
    textEls.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${120 + i * 80}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${120 + i * 80}ms`;
    });

    // Buttons and social icons fade in last, staggered
    const actions = [ctas, social].filter(Boolean);
    actions.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${380 + i * 100}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${380 + i * 100}ms`;
    });

    requestAnimationFrame(() => {
      setTimeout(() => {
        if (avatar) {
          avatar.style.opacity = "1";
          avatar.style.transform = "scale(1)";
        }
        textEls.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
        actions.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      }, 50);
    });
  },

  // 4. BACKGROUND CANVAS
  initCanvas() {
    this.canvas = document.getElementById("hero-canvas");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) return;

    const resize = () => {
      this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
      this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    if (this.isReducedMotion) return;

    const count = 24;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.offsetWidth,
        y: Math.random() * this.canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        size: Math.random() * 1.2 + 0.6,
        alpha: Math.random() * 0.2 + 0.05
      });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.animationFrameId) {
          this.loop();
        }
      });
    });
    observer.observe(this.canvas);

    this.loop();
  },

  loop() {
    if (!this.isVisible) {
      this.animationFrameId = null;
      return;
    }

    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
    this.ctx.lineWidth = 1;
    const gridSize = 64;

    this.ctx.beginPath();
    for (let x = 0; x < width; x += gridSize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += gridSize) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }
    this.ctx.stroke();

    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.animationFrameId = requestAnimationFrame(() => this.loop());
  },

  // 5. SECTION SEQUENCE OBSERVER
  initSectionSequenceObserver() {
    if (this.isReducedMotion) return;

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sec = entry.target;
          sec.classList.add("in-view");

          const items = sec.querySelectorAll(".anim-item");
          items.forEach((item, idx) => {
            setTimeout(() => {
              item.classList.add("revealed");
            }, 200 + idx * 75);
          });

          const skillRows = sec.querySelectorAll(".skills-category-row");
          skillRows.forEach((row) => {
            const tags = row.querySelectorAll(".skill-tag");
            tags.forEach((tag, tIdx) => {
              tag.style.opacity = "0";
              tag.style.transform = "translateX(-8px)";
              tag.style.transition = `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${tIdx * 50}ms, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${tIdx * 50}ms`;
              requestAnimationFrame(() => {
                tag.style.opacity = "1";
                tag.style.transform = "translateX(0)";
              });
            });
          });

          const contactColLeft = sec.querySelector(".contact-info-column");
          const contactColRight = sec.querySelector(".contact-form-column");
          if (contactColLeft && contactColRight) {
            contactColLeft.style.opacity = "0";
            contactColLeft.style.transform = "translateX(-24px)";
            contactColLeft.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 160ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 160ms";

            contactColRight.style.opacity = "0";
            contactColRight.style.transform = "translateX(24px)";
            contactColRight.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 160ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 160ms";

            requestAnimationFrame(() => {
              contactColLeft.style.opacity = "1";
              contactColLeft.style.transform = "translateX(0)";
              contactColRight.style.opacity = "1";
              contactColRight.style.transform = "translateX(0)";
            });
          }

          observer.unobserve(sec);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    sections.forEach((sec) => observer.observe(sec));
  },

  // 6. EXPERIENCE TIMELINE DRAW
  initExperienceTimelineDraw() {
    const timelineWrap = document.querySelector(".experience-timeline-wrap");
    const fillLine = document.querySelector(".timeline-fill-line");
    const expCards = document.querySelectorAll(".experience-card");

    if (!timelineWrap || !fillLine || !expCards.length) return;

    const onScroll = () => {
      const rect = timelineWrap.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startY = rect.top - windowHeight * 0.7;
      const totalH = rect.height;
      const progress = Math.min(100, Math.max(0, (-startY / totalH) * 100));

      fillLine.style.height = `${progress}%`;

      expCards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top < windowHeight * 0.65) {
          card.classList.add("active-node");
        } else {
          card.classList.remove("active-node");
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  },

  // 7. COPY EMAIL CROSS FADE
  initCopyEmailCrossFade() {
    const copyBtns = document.querySelectorAll(".btn-copy-email");
    copyBtns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const email = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.social.email) || "manojreddy2525@gmail.com";
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(email);
          } else {
            const input = document.createElement("input");
            input.value = email;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
          }
        } catch (e) {
          // ignore error
        }

        btn.classList.add("copied");
        if (window.ContactController && window.ContactController.showToast) {
          window.ContactController.showToast("Email address copied to clipboard.");
        }

        setTimeout(() => {
          btn.classList.remove("copied");
        }, 1500);
      });
    });
  },

  // 8. CERTIFICATE LIGHTBOX
  initCertificateLightbox() {
    const overlay = document.getElementById("cert-lightbox-overlay");
    const imgEl = document.getElementById("cert-lightbox-img");
    const titleEl = document.getElementById("cert-lightbox-title");
    const closeBtn = document.getElementById("cert-lightbox-close");

    if (!overlay || !imgEl) return;

    window.openCertificate = (imgSrc, certTitle) => {
      if (!imgSrc) return;
      imgEl.src = imgSrc;
      if (titleEl) titleEl.textContent = certTitle || "Certificate Verification";
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => {
        imgEl.src = "";
      }, 200);
    };

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("active")) {
        closeLightbox();
      }
    });
  },

  // 9. BACK TO TOP ACTION
  initBackToTop() {
    const btn = document.getElementById("back-to-top-action");
    if (btn) {
      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }
};

window.TechAnimations = TechAnimations;
