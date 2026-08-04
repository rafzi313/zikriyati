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
 * Horizontal Arrow Scroll Handler for Reviews (RTL Compatible)
 */
const reviewsGrid = document.getElementById('reviewsGrid');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');

if (reviewsGrid && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = reviewsGrid.querySelector('.review-card');
    if (card) {
      const cardWidth = card.offsetWidth + 25;
      reviewsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = reviewsGrid.querySelector('.review-card');
    if (card) {
      const cardWidth = card.offsetWidth + 25;
      reviewsGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  });
}

/**
 * DOMContentLoaded Initializations
 */
document.addEventListener("DOMContentLoaded", () => {
  // Update Footer Dynamic Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = document.querySelectorAll("section[id]");

  // 1. Highlight navbar item on Click
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Optional Swiper initialization (if Swiper library is loaded)
  if (typeof Swiper !== "undefined" && document.querySelector('.reviews-slider')) {
    new Swiper('.reviews-slider', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          navigation: { enabled: true }
        },
        768: {
          slidesPerView: 2,
        }
      }
    });
  }

  // 2. Highlight navbar item on Scroll using IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -50% 0px",
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          const hrefId = decodeURIComponent(link.getAttribute("href").replace("#", ""));
          if (hrefId === currentId) {
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

// Add this inside document.addEventListener("DOMContentLoaded", () => { ... })

const grid = document.getElementById('reviewsGrid');
const dotsContainer = document.getElementById('reviewsDots');

if (grid && dotsContainer) {
  const cards = grid.querySelectorAll('.review-card');

  if (cards.length > 0) {
    // Generate dots based on total cards
    cards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');

      // Tap dot to scroll to card
      dot.addEventListener('click', () => {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    // Update active dot automatically on touch swipe
    grid.addEventListener('scroll', () => {
      const gridRect = grid.getBoundingClientRect();
      const gridCenter = gridRect.left + gridRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(gridCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === closestIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }, { passive: true });
  }
}
