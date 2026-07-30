'use strict';

/**
 * add event on element
 */
const addEventOnelem = function (elem, type, callback) {
  if (!elem) return;
  if (elem.length && elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else if (elem.addEventListener) {
    elem.addEventListener(type, callback);
  }
}

/**
 * toggle navbar
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

if (navToggler) {
  addEventOnelem(navToggler, 'click', toggleNavbar);
}

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

if (navbarLinks.length) {
  addEventOnelem(navbarLinks, "click", closeNavbar);
}

/**
 * header active on scroll down to 100px
 */
const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

if (header) {
  addEventOnelem(window, "scroll", activeHeader);
}

/**
 * filter tab
 */
const tabCard = document.querySelectorAll("[data-tab-card]");

if (tabCard.length) {
  let lastTabCard = tabCard[0];

  const navigateTab = function () {
    lastTabCard.classList.remove("active");
    this.classList.add("active");
    lastTabCard = this;
  }

  addEventOnelem(tabCard, "click", navigateTab);
}

/**
 * Read More / Less Toggle (اقتباسات اور تبصرے دونوں کے لیے)
 */
document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', function () {
    // اپنے متعلقہ کارڈ (اقتباس ہو یا تبصرہ) کو تلاش کریں
    const card = this.closest('.excerpt-card') || this.closest('.review-card');

    if (card) {
      card.classList.toggle('active');

      const btnText = this.querySelector('.btn-text');
      if (btnText) {
        if (card.classList.contains('active')) {
          btnText.textContent = 'کم دکھائیں';
        } else {
          btnText.textContent = 'مزید پڑھیں';
        }
      }
    }
  });
});

/**
 * Horizontal Arrow Scroll Handler for Reviews
 */
const reviewsGrid = document.getElementById('reviewsGrid');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');

if (reviewsGrid && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    const card = reviewsGrid.querySelector('.review-card');
    if (card) {
      const cardWidth = card.offsetWidth + 25;
      reviewsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener('click', () => {
    const card = reviewsGrid.querySelector('.review-card');
    if (card) {
      const cardWidth = card.offsetWidth + 25;
      reviewsGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  });
}

document.getElementById('current-year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = document.querySelectorAll("section[id]");

  // 1. Highlight on Click
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // 2. Highlight on Scroll using IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // Triggers when section is near middle of viewport
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          const href = link.getAttribute("href").replace("#", "");
          if (href === currentId) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));
});