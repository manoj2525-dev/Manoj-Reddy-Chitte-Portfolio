/**
 * CONTACT SYSTEM & FORM CONTROLLER
 * Form validation, graceful mailto fallback, clipboard copy, conditional WhatsApp, Resume downloader
 */

const ContactController = {
  init() {
    this.initWhatsApp();
    this.initContactForm();
    this.initCopyEmail();
    this.initResumeDownload();
  },

  initCopyEmail() {
    const copyButtons = document.querySelectorAll(".btn-copy-email");
    copyButtons.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const email = window.PORTFOLIO_DATA.social.email;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(email);
          } else {
            // Fallback for non-https or older environments
            const tempInput = document.createElement("input");
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
          }

          const originalText = btn.innerHTML;
          btn.classList.add("copied");
          btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> COPIED`;
          
          this.showToast("Email address copied to clipboard.");

          setTimeout(() => {
            btn.classList.remove("copied");
            btn.innerHTML = originalText;
          }, 2500);
        } catch (err) {
          this.showToast("Copied: " + email);
        }
      });
    });
  },

  initWhatsApp() {
    const waContainer = document.getElementById("whatsapp-cta-wrapper");
    const waNumber = window.PORTFOLIO_DATA.social.whatsappNumber;

    if (!waContainer) return;

    if (waNumber && waNumber.trim() !== "") {
      const msg = encodeURIComponent(window.PORTFOLIO_DATA.social.whatsappMessage);
      const url = `https://wa.me/${waNumber.trim().replace(/[^0-9]/g, "")}?text=${msg}`;
      
      waContainer.innerHTML = `
        <div class="contact-channel-card">
          <div class="channel-icon-side">
            <div class="channel-icon-box">
              <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </div>
            <div>
              <div class="channel-label">WHATSAPP</div>
              <div class="channel-desc">Chat with me</div>
            </div>
          </div>
          <div class="channel-actions">
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">CHAT ON WHATSAPP</a>
          </div>
        </div>
      `;
      waContainer.style.display = "block";
    } else {
      waContainer.style.display = "none";
    }
  },

  initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById("form-name");
      const emailInput = document.getElementById("form-email");
      const subjectInput = document.getElementById("form-subject");
      const messageInput = document.getElementById("form-message");
      const successBanner = document.getElementById("form-success-banner");

      const formGroups = form.querySelectorAll(".form-group");
      formGroups.forEach((g) => g.classList.remove("has-error"));
      if (successBanner) successBanner.classList.remove("active");

      let isValid = true;

      // Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        this.setError(nameInput, "Please enter your name.");
        isValid = false;
      }

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        this.setError(emailInput, "Please enter a valid email address.");
        isValid = false;
      }

      // Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 2) {
        this.setError(subjectInput, "Please provide a subject.");
        isValid = false;
      }

      // Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
        this.setError(messageInput, "Please enter a message.");
        isValid = false;
      }

      if (!isValid) return;

      // Graceful fallback to default email client with structured message
      const toEmail = window.PORTFOLIO_DATA.social.email;
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()} - from ${nameInput.value.trim()}`);
      const body = encodeURIComponent(
        `Name: ${nameInput.value.trim()}\n` +
        `Email: ${emailInput.value.trim()}\n` +
        `Subject: ${subjectInput.value.trim()}\n\n` +
        `Message:\n${messageInput.value.trim()}`
      );

      window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;

      if (successBanner) {
        successBanner.innerHTML = `<strong>Message prepared!</strong> Your default email client has opened with your message. You can also reach me directly at <a href="mailto:${toEmail}" style="text-decoration: underline; color: #fff;">${toEmail}</a>.`;
        successBanner.classList.add("active");
      }

      form.reset();
      this.showToast("Email client opened with your message.");
    });
  },

  setError(inputEl, msg) {
    const parent = inputEl.closest(".form-group");
    if (parent) {
      parent.classList.add("has-error");
      const errEl = parent.querySelector(".form-error-msg");
      if (errEl) errEl.textContent = msg;
    }
  },

  initResumeDownload() {
    const resumeButtons = document.querySelectorAll(".btn-resume-download");
    resumeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.showToast("Downloading Chitte Manoj Reddy's Resume...");
      });
    });
  },

  showToast(message) {
    let toast = document.getElementById("global-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "global-toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }
};

window.ContactController = ContactController;
