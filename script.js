const content = window.siteContent || {};

const byId = (id) => document.getElementById(id);

const renderLinks = (items = [], extraClass = "") =>
  items
    .map(
      (item) =>
        `<a${extraClass ? ` class="${extraClass}"` : ""} href="${item.href}">${item.label}</a>`
    )
    .join("");

const renderStats = (items = []) =>
  items
    .map(
      (item) => `
        <div class="hero-stat">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </div>
      `
    )
    .join("");

const renderListItems = (items = []) => items.map((item) => `<li>${item}</li>`).join("");

const renderAboutCards = (items = []) =>
  items.map((item) => `<article class="about-card"><p>${item}</p></article>`).join("");

const renderMetrics = (items = []) =>
  items
    .map(
      (item) => `
        <div>
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </div>
      `
    )
    .join("");

const renderServiceCards = (items = []) =>
  items
    .map(
      (item, index) => `
        <article class="service-card">
          <span class="service-index">${String(index + 1).padStart(2, "0")}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");

const renderGallery = (items = []) =>
  items
    .map(
      (item) => `
        <figure class="gallery-card ${item.layoutClass || ""}">
          <button
            class="gallery-trigger"
            type="button"
            data-full="${item.full}"
            data-alt="${item.alt}"
            aria-label="${item.ariaLabel}"
          >
            <img src="${item.src}" alt="${item.alt}" loading="lazy" />
            <span class="gallery-hover">Tap to enlarge</span>
          </button>
          <figcaption class="gallery-overlay">
            <span>${item.category}</span>
            <strong>${item.caption}</strong>
          </figcaption>
        </figure>
      `
    )
    .join("");

const renderReasonCards = (items = []) =>
  items
    .map(
      (item) => `
        <article class="reason-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");

const renderBookingHighlights = (items = []) =>
  items
    .map(
      (item) => `
        <div class="booking-highlight">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </div>
      `
    )
    .join("");

const renderBookingChecklist = (items = []) =>
  items
    .map(
      (item) => `
        <li>${item}</li>
      `
    )
    .join("");

const renderButtons = (items = []) =>
  items
    .map((item) => {
      const isExternal = /^https?:\/\//.test(item.href || "");
      const targetAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";

      return `
        <a
          class="button button-${item.variant || "primary"} payment-plan-button"
          href="${item.href}"
          ${targetAttrs}
        >
          ${item.label}
        </a>
      `;
    })
    .join("");

const renderFaqItems = (items = []) =>
  items
    .map(
      (item) => `
        <article class="faq-item">
          <button class="faq-question" type="button" aria-expanded="false">
            <span>${item.question}</span>
            <span class="faq-icon"></span>
          </button>
          <div class="faq-answer">
            <p>${item.answer}</p>
          </div>
        </article>
      `
    )
    .join("");

const applyText = (id, value) => {
  const el = byId(id);
  if (el && value !== undefined) {
    el.textContent = value;
  }
};

const applyHTML = (id, value) => {
  const el = byId(id);
  if (el && value !== undefined) {
    el.innerHTML = value;
  }
};

const applyHref = (id, value) => {
  const el = byId(id);
  if (el && value !== undefined) {
    el.href = value;
  }
};

const applySiteContent = () => {
  document.title = content.meta?.title || document.title;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && content.meta?.description) {
    metaDescription.setAttribute("content", content.meta.description);
  }

  const brandLogo = byId("brand-logo");
  const heroLogo = byId("hero-logo");
  const brandLogoPath = content.meta?.brandLogoPath || content.meta?.logoPath;
  const heroLogoPath = content.meta?.heroLogoPath || content.meta?.logoPath;

  if (brandLogo && brandLogoPath) {
    brandLogo.src = brandLogoPath;
    brandLogo.alt = content.meta.logoAlt || "Site logo";
  }

  if (heroLogo && heroLogoPath) {
    heroLogo.src = heroLogoPath;
    heroLogo.alt = `${content.meta.logoAlt || "Site logo"} artwork`;
  }

  applyHTML("nav-links", renderLinks(content.nav?.links));
  applyHref("nav-cta", content.nav?.cta?.href);
  applyText("nav-cta", content.nav?.cta?.label);

  applyText("hero-eyebrow", content.hero?.eyebrow);
  applyText("hero-tag", content.hero?.tag);
  applyText("hero-title", content.hero?.title);
  applyText("hero-text", content.hero?.text);
  applyHTML("hero-stats", renderStats(content.hero?.stats));
  applyHTML("hero-points", renderListItems(content.hero?.points));
  applyHref("hero-scroll-cue", content.hero?.scrollCue?.href);
  applyText("hero-scroll-cue", content.hero?.scrollCue?.label);
  applyText("hero-panel-top-label", content.hero?.panelTop?.label);
  applyText("hero-panel-top-value", content.hero?.panelTop?.value);
  applyText("hero-panel-bottom-label", content.hero?.panelBottom?.label);
  applyText("hero-panel-bottom-value", content.hero?.panelBottom?.value);

  applyText("about-eyebrow", content.about?.eyebrow);
  applyText("about-title", content.about?.title);
  applyText("about-intro", content.about?.intro);
  applyHTML("about-cards", renderAboutCards(content.about?.cards));
  applyHTML("about-metrics", renderMetrics(content.about?.metrics));

  applyText("services-eyebrow", content.services?.eyebrow);
  applyText("services-title", content.services?.title);
  applyText("services-intro", content.services?.intro);
  applyHTML("services-grid", renderServiceCards(content.services?.items));

  applyText("portfolio-eyebrow", content.portfolio?.eyebrow);
  applyText("portfolio-title", content.portfolio?.title);
  applyText("portfolio-intro", content.portfolio?.intro);
  applyText("portfolio-lead", content.portfolio?.lead);
  applyHTML("portfolio-grid", renderGallery(content.portfolio?.items));

  applyText("why-us-eyebrow", content.whyUs?.eyebrow);
  applyText("why-us-title", content.whyUs?.title);
  applyText("why-us-intro", content.whyUs?.intro);
  applyHTML("why-us-grid", renderReasonCards(content.whyUs?.items));

  applyText("booking-eyebrow", content.booking?.eyebrow);
  applyText("booking-title", content.booking?.title);
  applyText("booking-intro", content.booking?.intro);
  applyHTML("booking-highlights", renderBookingHighlights(content.booking?.highlights));

  const bookingEmail = byId("booking-email");
  if (bookingEmail) {
    bookingEmail.href = `mailto:${content.booking?.contact?.email || ""}`;
    bookingEmail.textContent = content.booking?.contact?.email || "";
  }

  const bookingPhone = byId("booking-phone");
  if (bookingPhone) {
    bookingPhone.href = `tel:${content.booking?.contact?.phoneHref || ""}`;
    bookingPhone.textContent = content.booking?.contact?.phone || "";
  }

  applyText("booking-status", content.booking?.contact?.status);
  applyText("booking-action-kicker", content.booking?.action?.kicker);
  applyText("booking-action-copy", content.booking?.action?.text);
  applyHTML("booking-checklist", renderBookingChecklist(content.booking?.action?.checklist));
  applyText("booking-reference-note", content.booking?.action?.referenceNote);
  applyHref("booking-action-button", content.booking?.action?.buttonHref);
  applyText("booking-action-button", content.booking?.action?.buttonLabel);
  applyText("booking-action-note", content.booking?.action?.note);

  applyText("deposit-eyebrow", content.deposit?.eyebrow);
  applyText("deposit-title", content.deposit?.title);
  applyText("deposit-intro", content.deposit?.intro);
  applyText("deposit-note", content.deposit?.note);
  applyText("deposit-button", content.deposit?.button?.label);
  applyText("deposit-payment-match-note", content.deposit?.paymentMatchNote);

  applyText("payment-eyebrow", content.payment?.eyebrow);
  applyText("payment-title", content.payment?.title);
  applyText("payment-intro", content.payment?.intro);
  applyText("payment-button", content.payment?.button?.label);
  applyText("payment-match-note", content.payment?.paymentMatchNote);

  applyText("payment-plan-eyebrow", content.paymentPlan?.eyebrow);
  applyText("payment-plan-title", content.paymentPlan?.title);
  applyText("payment-plan-intro", content.paymentPlan?.intro);
  applyText("payment-plan-note", content.paymentPlan?.note);
  applyHTML("payment-plan-buttons", renderButtons(content.paymentPlan?.buttons));

  applyText("faq-eyebrow", content.faq?.eyebrow);
  applyText("faq-title", content.faq?.title);
  applyText("faq-intro", content.faq?.intro);
  applyHTML("faq-list", renderFaqItems(content.faq?.items));

  applyText("footer-brand", content.footer?.brand);
  applyText("footer-description", content.footer?.description);
  applyHTML("footer-links", renderLinks(content.footer?.links));
  applyText("footer-copyright-name", content.footer?.copyrightName);
};

applySiteContent();

const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const internalAnchorLinks = document.querySelectorAll('a[href^="#"]');
const mobileNavMedia = window.matchMedia("(max-width: 900px)");
const faqButtons = document.querySelectorAll(".faq-question");
const yearTarget = document.getElementById("year");
const galleryTriggers = document.querySelectorAll(".gallery-trigger");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxBackdrop = document.querySelector("[data-lightbox-close]");
let lastScrollY = window.scrollY;
let isHeaderTicking = false;
let isAnchorScrolling = false;
let anchorScrollTimer = 0;

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const getHeaderHeight = () => siteHeader?.offsetHeight || 0;

const setHeaderOffset = () => {
  document.documentElement.style.setProperty("--header-offset", `${getHeaderHeight()}px`);
};

const showHeader = () => {
  siteHeader?.classList.remove("nav-hidden");
};

const hideHeader = () => {
  siteHeader?.classList.add("nav-hidden");
};

const isMobileViewport = () => mobileNavMedia.matches;

const isMenuOpen = () => Boolean(navMenu?.classList.contains("is-open"));

const closeNavMenu = () => {
  if (!navMenu || !navToggle) {
    return;
  }

  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

const scrollToHashTarget = (
  hash,
  { behavior = "smooth", updateHash = true, extraGap = 18 } = {}
) => {
  if (!hash || !hash.startsWith("#")) {
    return false;
  }

  const target = byId(decodeURIComponent(hash.slice(1)));

  if (!target) {
    return false;
  }

  const targetTop = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - getHeaderHeight() - extraGap
  );

  isAnchorScrolling = true;
  window.clearTimeout(anchorScrollTimer);
  showHeader();
  window.scrollTo({ top: targetTop, behavior });

  if (updateHash && window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }

  anchorScrollTimer = window.setTimeout(() => {
    isAnchorScrolling = false;
    lastScrollY = window.scrollY;
    setHeaderOffset();
  }, 550);

  return true;
};

const syncHeaderLayout = () => {
  setHeaderOffset();

  if (!isMobileViewport()) {
    closeNavMenu();
    showHeader();
    lastScrollY = window.scrollY;
    return;
  }

  if (window.scrollY <= getHeaderHeight() + 24 || isMenuOpen() || isAnchorScrolling) {
    showHeader();
  }

  lastScrollY = window.scrollY;
};

const updateMobileHeaderState = () => {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  if (!siteHeader) {
    isHeaderTicking = false;
    return;
  }

  if (!isMobileViewport()) {
    showHeader();
    lastScrollY = currentScrollY;
    isHeaderTicking = false;
    return;
  }

  if (isMenuOpen() || isAnchorScrolling || currentScrollY <= getHeaderHeight() + 24) {
    showHeader();
    lastScrollY = currentScrollY;
    isHeaderTicking = false;
    return;
  }

  if (scrollDelta >= 8) {
    hideHeader();
  } else if (scrollDelta <= -8) {
    showHeader();
  }

  lastScrollY = currentScrollY;
  isHeaderTicking = false;
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
    showHeader();
    setHeaderOffset();
  });
}

internalAnchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");

    if (!hash || hash === "#") {
      return;
    }

    const target = byId(decodeURIComponent(hash.slice(1)));

    if (!target) {
      return;
    }

    event.preventDefault();
    closeNavMenu();
    scrollToHashTarget(hash);
  });
});

window.addEventListener(
  "scroll",
  () => {
    if (!siteHeader || isHeaderTicking) {
      return;
    }

    isHeaderTicking = true;
    window.requestAnimationFrame(updateMobileHeaderState);
  },
  { passive: true }
);

window.addEventListener("resize", syncHeaderLayout);
window.addEventListener("orientationchange", syncHeaderLayout);
window.addEventListener("load", () => {
  syncHeaderLayout();

  if (window.location.hash) {
    scrollToHashTarget(window.location.hash, { behavior: "auto", updateHash: false });
  }
});

if (typeof mobileNavMedia.addEventListener === "function") {
  mobileNavMedia.addEventListener("change", syncHeaderLayout);
} else if (typeof mobileNavMedia.addListener === "function") {
  mobileNavMedia.addListener(syncHeaderLayout);
}

setHeaderOffset();
syncHeaderLayout();

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    faqButtons.forEach((otherButton) => {
      otherButton.setAttribute("aria-expanded", "false");
      otherButton.closest(".faq-item")?.classList.remove("is-open");
    });

    if (!isOpen && item) {
      button.setAttribute("aria-expanded", "true");
      item.classList.add("is-open");
    }
  });
});

const openLightbox = (trigger) => {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  const fullImage = trigger.dataset.full || "";
  const altText = trigger.dataset.alt || "";
  const caption =
    trigger.closest(".gallery-card")?.querySelector(".gallery-overlay strong")?.textContent || "";

  lightboxImage.src = fullImage;
  lightboxImage.alt = altText;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  document.body.style.overflow = "";
};

galleryTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openLightbox(trigger));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxBackdrop?.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
    closeLightbox();
  }
});
