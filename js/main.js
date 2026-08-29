/**
 * Meridian & Co. — site behavior
 * Organized as classes so each piece of interactivity (nav, scroll
 * reveal, contact form) is self-contained and reusable across pages.
 */

/* ==========================================================================
   Navigation — mobile toggle + active-link highlighting
   ========================================================================== */

/* ==========================================================================
   Supabase Configuration
   ========================================================================== */

const SUPABASE_URL = 'https://qhawlcueglobnkmokhep.supabase.co';

const SUPABASE_KEY =
  'sb_publishable_cIFC9IQdvKbVQa-UjHA1lw_no5z3Zry';

let supabaseClient = null;

if (window.supabase) {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );
}

class Navigation {

  
  constructor(headerSelector = '.site-header') {
    this.header = document.querySelector(headerSelector);
    if (!this.header) return;

    this.toggleBtn = this.header.querySelector('.nav-toggle');
    this.links = this.header.querySelector('.nav-links');

    this.bindEvents();
    this.highlightActiveLink();
  }

  bindEvents() {
    if (this.toggleBtn && this.links) {
      this.toggleBtn.addEventListener('click', () => this.toggleMenu());
    }

    // Close the mobile menu when a link is clicked
    this.header.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!this.header.contains(e.target)) this.closeMenu();
    });
  }

  toggleMenu() {
    const isOpen = this.links.classList.toggle('is-open');
    this.toggleBtn.setAttribute('aria-expanded', String(isOpen));
  }

  closeMenu() {
    this.links.classList.remove('is-open');
    this.toggleBtn?.setAttribute('aria-expanded', 'false');
  }

  highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    this.header.querySelectorAll('.nav-links a').forEach((link) => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage) {
        link.classList.add('is-active');
      }
    });
  }
}

/* ==========================================================================
   ScrollReveal — fades/slides elements in as they enter the viewport
   ========================================================================== */
class ScrollReveal {
  constructor(selector = '.reveal', options = {}) {
    this.elements = document.querySelectorAll(selector);
    this.options = { threshold: 0.15, ...options };
    if (!this.elements.length) return;

    // Respect users who prefer reduced motion — just show everything
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersect(entries),
      this.options
    );
    this.elements.forEach((el) => this.observer.observe(el));
  }

  handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        this.observer.unobserve(entry.target);
      }
    });
  }
}

/* ==========================================================================
   ContactForm — client-side validation + (mock) submit handling
   ========================================================================== */
class ContactForm {
  constructor(formSelector = '#contact-form') {
    this.form = document.querySelector(formSelector);
    if (!this.form) return;

    this.statusEl = this.form.querySelector('.form-status');
    this.rules = {
  name: (v) =>
    v.trim().length >= 2 ||
    'Please enter your full name.',

  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
    'Please enter a valid email address.',

  phone: (v) =>
    /^[+]?[0-9\s()-]{10,15}$/.test(v.trim()) ||
    'Please enter a valid phone number.',

  message: (v) =>
    v.trim().length >= 10 ||
    'Message should be at least 10 characters.',
};

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    // Validate a field as soon as the user leaves it
    Object.keys(this.rules).forEach((name) => {
      const field = this.form.querySelector(`[name="${name}"]`);
      field?.addEventListener('blur', () => this.validateField(name));
    });
  }

  validateField(name) {
    const field = this.form.querySelector(`[name="${name}"]`);
    if (!field) return true;

    const wrapper = field.closest('.form-field');
    const result = this.rules[name](field.value);
    const isValid = result === true;

    wrapper.classList.toggle('has-error', !isValid);
    const errorEl = wrapper.querySelector('.field-error');
    if (errorEl && !isValid) errorEl.textContent = result;

    return isValid;
  }

  validateAll() {
    return Object.keys(this.rules)
      .map((name) => this.validateField(name))
      .every(Boolean);
  }

  async handleSubmit(e) {
  e.preventDefault();

  if (!supabaseClient) {
  this.showStatus(
    'Contact service is temporarily unavailable. Please try again later.',
    'error'
  );
  return;
}

  if (!this.validateAll()) {
    this.showStatus(
      'Please fix the highlighted fields and try again.',
      'error'
    );
    return;
  }

  const data = Object.fromEntries(
    new FormData(this.form).entries()
  );

  this.showStatus('Sending your message...', 'success');

  try {

    const { error } = await supabaseClient
      .from('contact_messages')
      .insert({
        name: data.name,
        email: data.email,
        phone_number: data.phone,
        message: data.message
      });

    if (error) {
      console.error(error);

      this.showStatus(
        'Could not send message. Please try again.',
        'error'
      );

      return;
    }

    this.showStatus(
      "Thanks — we've received your message and will reply within one business day.",
      'success'
    );

    this.form.reset();

  } catch (err) {

    console.error(err);

    this.showStatus(
      'Unexpected error. Please try again.',
      'error'
    );
  }
}

  showStatus(message, type) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message;
    this.statusEl.classList.remove('is-success', 'is-error');
    this.statusEl.classList.add('is-visible', type === 'success' ? 'is-success' : 'is-error');
  }
}

/* ==========================================================================
   App — entry point, wires up whichever components exist on the page
   ========================================================================== */
class App {
  static init() {
    new Navigation();
    new ScrollReveal();
    new ContactForm();
  }
}

document.addEventListener('DOMContentLoaded', () => App.init());

/* =========================================================
   Concierge Connect
========================================================= */

class ConciergeConnect {

    constructor() {

        this.button = document.getElementById('conciergeButton');
        this.panel = document.getElementById('conciergePanel');
        this.closeButton = document.getElementById('conciergeClose');

        this.label = document.getElementById('conciergeLabel');
        this.labelClose = document.getElementById('conciergeLabelClose');

        if (!this.button || !this.panel) return;

        this.bindEvents();
    }


    bindEvents() {

        /* Open panel */

        this.button.addEventListener('click', () => {
            this.open();
        });


        /* Close panel */

        this.closeButton?.addEventListener('click', () => {
            this.close();
        });


        /* Hide suggestion label */

        this.labelClose?.addEventListener('click', () => {

            this.label.classList.add('hidden');

        });


        /* Close when clicking outside */

        document.addEventListener('click', (event) => {

            if (!event.target.closest('.concierge-widget')) {

                this.close();

            }

        });

    }


    open() {

        this.panel.classList.add('open');

        this.label?.classList.add('hidden');

    }


    close() {

        this.panel.classList.remove('open');

    }

}


/* Initialize */

document.addEventListener('DOMContentLoaded', () => {

    new ConciergeConnect();

});
