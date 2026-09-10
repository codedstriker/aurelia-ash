/**
 * ==========================================================================
 * AURELIA & ASH — LUXURY EDITORIAL ENGINE & INTERACTIONS
 * Framework: Vanilla ECMAScript (ES2022+) + GSAP 3 & ScrollTrigger via CDN
 * Features: Cinematic Scroll Choreography, Asymmetric Parallax, Accessible Tabs,
 *           Multi-Facet Menu Tag Filtering, Dynamic WhatsApp Concierge Engine
 * ==========================================================================
 */

// Configuration Constants
const RESTAURANT_CONFIG = {
  name: 'Aurelia & Ash',
  tagline: 'Elemental Fire. Botanical Ferment. Nordic-Japanese Precision.',
  // Configurable concierge phone number (format: country code without + or dashes)
  whatsappNumber: '601163265610', // [WHATSAPP_NUMBER] placeholder for manual replacement
  defaultGreeting: 'Warm greetings from Aurelia & Ash. How may our concierge assist your culinary experience today?'
};

document.addEventListener('DOMContentLoaded', () => {
  // Motion Preference Verification (WCAG AA Compliance)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Initialize Global Shared Navigation & Header
  initHeaderScroll();
  initMobileDrawer();
  initFloatingWhatsApp();

  // 2. Initialize Motion & Visual Choreography
  if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    initGsapChoreography();
  }

  // 3. Initialize Page-Specific Interactive Modules
  initSeasonalCarousel();
  initInteractiveTimeline();
  initMenuExperience();
  initWhatsAppConciergeEngine();
});

/**
 * --------------------------------------------------------------------------
 * 1. HEADER SCROLL DETECTION & GLASSMORPHISM ELEVATION
 * --------------------------------------------------------------------------
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * --------------------------------------------------------------------------
 * 2. ACCESSIBLE MOBILE DRAWER NAVIGATION
 * --------------------------------------------------------------------------
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    backdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  // Close on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Close when clicking any nav link
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * --------------------------------------------------------------------------
 * 3. GLOBAL FLOATING WHATSAPP BUTTON WIREUP
 * --------------------------------------------------------------------------
 */
function initFloatingWhatsApp() {
  const floatBtn = document.querySelector('.whatsapp-float-btn');
  if (!floatBtn) return;

  floatBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = `*AURELIA & ASH CONCIERGE DIRECT INQUIRY*\n\n${RESTAURANT_CONFIG.defaultGreeting}\n\n_Sent via Quick Concierge Trigger_`;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

/**
 * --------------------------------------------------------------------------
 * 4. GSAP & SCROLLTRIGGER MOTION CHOREOGRAPHY
 * --------------------------------------------------------------------------
 */
function initGsapChoreography() {
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero Section Cinematic Reveal
  const heroContent = document.querySelector('.hero-content-wrap');
  if (heroContent) {
    const eyebrow = heroContent.querySelector('.eyebrow');
    const title = heroContent.querySelector('.display-hero, h1');
    const lead = heroContent.querySelector('.hero-tagline-lead, .lead-text');
    const actions = heroContent.querySelector('.hero-actions');
    const visual = document.querySelector('.hero-visual-frame');

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (eyebrow) heroTl.from(eyebrow, { opacity: 0, y: 20, duration: 0.8 }, 0.1);
    if (title) heroTl.from(title, { opacity: 0, y: 35, duration: 1.1 }, 0.25);
    if (lead) heroTl.from(lead, { opacity: 0, y: 25, duration: 0.9 }, 0.45);
    if (actions) heroTl.from(actions, { opacity: 0, y: 20, duration: 0.8 }, 0.65);
    if (visual) heroTl.from(visual, { opacity: 0, scale: 0.96, duration: 1.4, ease: 'power2.out' }, 0.3);
  }

  // General ScrollTrigger Batch Reveals
  const revealElements = document.querySelectorAll('.editorial-split, .accolades-strip, .doctrine-card, .dish-highlight-card, .member-card, .timeline-card');
  revealElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 35,
      duration: 0.9,
      ease: 'power2.out'
    });
  });

  // Parallax on Visual Frames
  const parallaxFrames = document.querySelectorAll('[data-parallax="true"]');
  parallaxFrames.forEach(frame => {
    const img = frame.querySelector('img');
    if (img) {
      gsap.to(img, {
        scrollTrigger: {
          trigger: frame,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        },
        yPercent: -12,
        ease: 'none'
      });
    }
  });
}

/**
 * --------------------------------------------------------------------------
 * 5. SEASONAL HIGHLIGHTS CAROUSEL (index.html)
 * --------------------------------------------------------------------------
 */
function initSeasonalCarousel() {
  const carousel = document.querySelector('[data-module="seasonal-carousel"]');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  const dots = carousel.querySelectorAll('.carousel-dot');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;

  const getVisibleSlides = () => {
    const width = window.innerWidth;
    if (width >= 1100) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  const getMaxIndex = () => {
    return Math.max(0, slides.length - getVisibleSlides());
  };

  const updateCarousel = () => {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const visibleSlides = getVisibleSlides();
    const slidePercent = 100 / visibleSlides;
    const moveAmount = currentIndex * slidePercent;

    track.style.transform = `translateX(-${moveAmount}%)`;

    // Update Indicators
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === currentIndex);
      dot.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
    });

    // Update ARIA for accessible reader focus
    slides.forEach((slide, i) => {
      const isVisible = i >= currentIndex && i < currentIndex + visibleSlides;
      slide.setAttribute('aria-hidden', (!isVisible).toString());
    });
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = Math.min(index, getMaxIndex());
      updateCarousel();
    });
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      // Swipe Left -> Next
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe Right -> Prev
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    }
  }, { passive: true });

  // Keyboard navigation when carousel is focused
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    } else if (e.key === 'ArrowLeft') {
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}

/**
 * --------------------------------------------------------------------------
 * 6. INTERACTIVE VERTICAL TIMELINE (history.html)
 * --------------------------------------------------------------------------
 */
function initInteractiveTimeline() {
  const timeline = document.querySelector('[data-module="vertical-timeline"]');
  if (!timeline) return;

  const progressBar = timeline.querySelector('.timeline-track-progress');
  const milestones = timeline.querySelectorAll('.timeline-milestone');

  const onScroll = () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate progress line fill
    if (progressBar) {
      const totalHeight = timeline.offsetHeight;
      const visibleScrolled = Math.max(0, windowHeight / 2 - rect.top);
      const percent = Math.min(100, Math.max(0, (visibleScrolled / totalHeight) * 100));
      progressBar.style.height = `${percent}%`;
    }

    // Highlight milestones currently reached
    milestones.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top <= windowHeight * 0.65) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * --------------------------------------------------------------------------
 * 7. INTERACTIVE MENU CATEGORIES & COMPOUND TAG FILTER (menu.html)
 * --------------------------------------------------------------------------
 */
function initMenuExperience() {
  const menuContainer = document.querySelector('[data-module="menu-system"]');
  if (!menuContainer) return;

  const tabBtns = menuContainer.querySelectorAll('.menu-tab-btn');
  const filterChips = menuContainer.querySelectorAll('.filter-chip');
  const dishCards = menuContainer.querySelectorAll('.dish-card-luxury');

  let activeCategory = 'all';
  let activeTag = 'all';

  const applyFilters = () => {
    dishCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardTags = (card.getAttribute('data-tags') || '').toLowerCase().split(' ');

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesTag = activeTag === 'all' || cardTags.includes(activeTag.toLowerCase());

      const shouldShow = matchesCategory && matchesTag;

      if (shouldShow) {
        card.style.display = 'flex';
        card.setAttribute('aria-hidden', 'false');
        if (typeof gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        } else {
          card.style.opacity = '1';
        }
      } else {
        card.style.display = 'none';
        card.setAttribute('aria-hidden', 'true');
      }
    });
  };

  // Primary Category Tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      activeCategory = btn.getAttribute('data-tab');
      applyFilters();
    });
  });

  // Secondary Attribute Tag Chips
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
      activeTag = chip.getAttribute('data-filter');
      applyFilters();
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * 8. DYNAMIC WHATSAPP RESERVATION & ORDERING ENGINE (contact.html)
 * --------------------------------------------------------------------------
 */
function initWhatsAppConciergeEngine() {
  const bookingForm = document.getElementById('whatsappForm');
  if (!bookingForm) return;

  const serviceOptions = document.querySelectorAll('.service-tab-option');
  const serviceInput = document.getElementById('orderType');
  const detailsLabel = document.getElementById('labelPartyDetails');
  const detailsInput = document.getElementById('partyDetails');
  const notesLabel = document.getElementById('labelSpecialNotes');
  const notesInput = document.getElementById('specialNotes');

  // Dynamic Service Content Mapping
  const serviceConfigs = {
    'Table Reservation': {
      detailsLabel: 'Party Size & Seating Preference',
      detailsPlaceholder: 'e.g. 2 Guests — Chef’s Open Hearth Counter',
      notesLabel: 'Dietary Restrictions / Celebrations',
      notesPlaceholder: 'e.g. 1 pescatarian guest; 10th wedding anniversary'
    },
    'Curated Gourmet Pickup': {
      detailsLabel: 'Course Selection & Portion Count',
      detailsPlaceholder: 'e.g. 2x 7-Course Atelier Tasting Box + Ferment Pairings',
      notesLabel: 'Collection Time & Packaging Notes',
      notesPlaceholder: 'e.g. Insulated temperature-controlled travel box requested'
    },
    'Private Delivery Service': {
      detailsLabel: 'Private Residence Menu & Service Style',
      detailsPlaceholder: 'e.g. 6 Guests — Degustation with Private Sommelier Service',
      notesLabel: 'Destination Address & Access Instructions',
      notesPlaceholder: 'e.g. Penthouse 4B, Kyoto Terrace Villa. Gate entry code #2981'
    }
  };

  // Radio / Tab Switcher for Order Type
  serviceOptions.forEach(option => {
    option.addEventListener('click', () => {
      serviceOptions.forEach(opt => opt.classList.remove('is-selected'));
      option.classList.add('is-selected');

      const radio = option.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      const selectedType = option.getAttribute('data-value');
      if (serviceInput) serviceInput.value = selectedType;

      // Update contextual UI copy dynamically
      const config = serviceConfigs[selectedType] || serviceConfigs['Table Reservation'];
      if (detailsLabel) detailsLabel.textContent = config.detailsLabel;
      if (detailsInput) detailsInput.placeholder = config.detailsPlaceholder;
      if (notesLabel) notesLabel.textContent = config.notesLabel;
      if (notesInput) notesInput.placeholder = config.notesPlaceholder;
    });
  });

  // Form Submission & WhatsApp URL Construction
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const orderType = serviceInput ? serviceInput.value : 'Table Reservation';
    const guestName = document.getElementById('guestName')?.value.trim() || 'Guest';
    const guestPhone = document.getElementById('guestPhone')?.value.trim() || 'Not Provided';
    const bookingDate = document.getElementById('bookingDateTime')?.value || 'Pending Concierge Coordination';
    const partyDetails = detailsInput?.value.trim() || 'Standard Seating';
    const specialNotes = notesInput?.value.trim() || 'None specified';

    // Format Formatted Editorial Message with Unicode Separators
    const message =
      `*NEW INQUIRY — ${RESTAURANT_CONFIG.name.toUpperCase()} CONCIERGE*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `• *Service Requested:* ${orderType}\n` +
      `• *Guest Name:* ${guestName}\n` +
      `• *Contact Phone:* ${guestPhone}\n` +
      `• *Date & Time Window:* ${bookingDate}\n` +
      `• *Details / Selection:* ${partyDetails}\n` +
      `• *Special Requests & Notes:* ${specialNotes}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Dispatched via Aurelia & Ash Digital Concierge Engine_`;

    // Encode URL and redirect to WhatsApp Web / App
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}
