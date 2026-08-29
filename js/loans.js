/**
 * Deepam Financial Services — Loans page behavior
 * Handles loan-type tab switching, the T&C accordion, and the
 * loan eligibility / enquiry form (validation + Supabase submission).
 * Loaded as a plain classic script, after js/main.js, so it shares
 * main.js's page-level `supabaseClient` (may be null if the Supabase
 * CDN script hasn't loaded — the form degrades gracefully in that
 * case, same as the contact form on contact.html).
 */

/* =========================================================
   LOAN TYPE TABS
========================================================= */

class LoanTabs {
  constructor(root) {
    this.root = root;
    if (!this.root) return;

    this.buttons = [...this.root.querySelectorAll('.loans-tab-btn')];
    this.panels = [...document.querySelectorAll('.loans-panel')];

    this.buttons.forEach((btn) => {
      btn.addEventListener('click', () => this.activate(btn.dataset.loanTab));
    });
  }

  activate(key) {
    this.buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.loanTab === key));
    this.panels.forEach((p) => p.classList.toggle('is-active', p.dataset.loanPanel === key));

    // Keep the enquiry form's loan-type select in sync with the active tab
    const select = document.querySelector('#loan-type');
    if (select && [...select.options].some((o) => o.value === key)) {
      select.value = key;
    }
  }
}

/* =========================================================
   TERMS & CONDITIONS ACCORDION
========================================================= */

class LoansAccordion {
  constructor(root) {
    this.root = root;
    if (!this.root) return;

    this.root.querySelectorAll('.insurance-accordion-item').forEach((item) => {
      const trigger = item.querySelector('.insurance-accordion-trigger');
      trigger?.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        this.root.querySelectorAll('.insurance-accordion-item').forEach((i) => i.classList.remove('is-open'));
        if (!isOpen) item.classList.add('is-open');
      });
    });
  }
}

/* =========================================================
   LOAN ELIGIBILITY / ENQUIRY FORM
========================================================= */

class LoanEligibilityForm {
  constructor(formSelector = '#loan-eligibility-form') {
    this.form = document.querySelector(formSelector);
    if (!this.form) return;

    this.statusEl = this.form.querySelector('.form-status');

    this.rules = {
      name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
      phone: (v) => /^[+]?[0-9\s()-]{10,15}$/.test(v.trim()) || 'Please enter a valid phone number.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.',
      loan_type: (v) => v.trim().length > 0 || 'Please select a loan type.',
      loan_amount: (v) => Number(v) > 0 || 'Please enter the loan amount you need.',
      monthly_income: (v) => Number(v) > 0 || 'Please enter your approximate monthly income.',
      employment_type: (v) => v.trim().length > 0 || 'Please select your employment type.',
      city: (v) => v.trim().length >= 2 || 'Please enter your city.',
      consent: (v, field) => field.checked || 'Please accept the terms to continue.',
    };

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    Object.keys(this.rules).forEach((name) => {
      const field = this.form.querySelector(`[name="${name}"]`);
      field?.addEventListener('blur', () => this.validateField(name));
      field?.addEventListener('change', () => this.validateField(name));
    });
  }

  validateField(name) {
    const field = this.form.querySelector(`[name="${name}"]`);
    if (!field) return true;

    const wrapper = field.closest('.form-field');
    const result = this.rules[name](field.value, field);
    const isValid = result === true;

    wrapper?.classList.toggle('has-error', !isValid);
    const errorEl = wrapper?.querySelector('.field-error');
    if (errorEl && !isValid) errorEl.textContent = result;

    return isValid;
  }

  validateAll() {
    return Object.keys(this.rules)
      .map((name) => this.validateField(name))
      .every(Boolean);
  }

  showStatus(message, type) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message;
    this.statusEl.className = `form-status is-visible is-${type}`;
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (typeof supabaseClient === 'undefined' || !supabaseClient) {
      this.showStatus('Enquiry service is temporarily unavailable. Please call or WhatsApp us instead.', 'error');
      return;
    }

    if (!this.validateAll()) {
      this.showStatus('Please fix the highlighted fields and try again.', 'error');
      return;
    }

    const data = Object.fromEntries(new FormData(this.form).entries());
    const submitButton = this.form.querySelector('button[type="submit"]');

    if (submitButton) submitButton.disabled = true;
    this.showStatus('Submitting your enquiry...', 'success');

    try {
      const { error } = await supabaseClient
        .from('loan_enquiries')
        .insert({
          name: data.name,
          phone_number: data.phone,
          email: data.email,
          loan_type: data.loan_type,
          loan_amount: Number(data.loan_amount),
          monthly_income: Number(data.monthly_income),
          employment_type: data.employment_type,
          city: data.city,
          existing_emi: data.existing_emi ? Number(data.existing_emi) : null,
          notes: data.notes || null,
        });

      if (error) {
        console.error(error);
        this.showStatus('Could not submit your enquiry. Please try again.', 'error');
        return;
      }

      this.showStatus("Thanks — we've received your details. Our loan advisory team will call you within one business day.", 'success');
      this.form.reset();
    } catch (err) {
      console.error(err);
      this.showStatus('Something went wrong. Please try again in a moment.', 'error');
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  }
}

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  new LoanTabs(document.querySelector('.loans-tabs'));
  new LoansAccordion(document.querySelector('#loans-terms-accordion'));
  new LoanEligibilityForm('#loan-eligibility-form');
});
