/**
 * Deepam Financial Services — Loan EMI Calculator
 * Self-contained: wrapped in an IIFE so its variables never leak into
 * the global scope or collide with other page scripts (main.js,
 * loans.js, chatbot.js, etc. all run on the same page).
 */
(function () {
  'use strict';

  const loanAmount = document.getElementById('emiLoanAmount');
  const interestRate = document.getElementById('emiInterestRate');
  const loanTenure = document.getElementById('emiLoanTenure');

  // Not on this page (e.g. a page that doesn't include the calculator) — bail quietly.
  if (!loanAmount || !interestRate || !loanTenure) return;

  const loanAmountDisplay = document.getElementById('emiLoanAmountDisplay');
  const interestRateDisplay = document.getElementById('emiInterestRateDisplay');
  const loanTenureDisplay = document.getElementById('emiLoanTenureDisplay');

  const monthlyEMI = document.getElementById('emiMonthlyResult');
  const resultPrincipal = document.getElementById('emiResultPrincipal');
  const totalInterest = document.getElementById('emiTotalInterest');
  const totalPayment = document.getElementById('emiTotalPayment');

  const principalBar = document.getElementById('emiPrincipalBar');
  const interestBar = document.getElementById('emiInterestBar');

  const principalPercentage = document.getElementById('emiPrincipalPercentage');
  const interestPercentage = document.getElementById('emiInterestPercentage');

  /* Indian currency format */
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function updateInputDisplays() {
    const amount = Number(loanAmount.value);
    const rate = Number(interestRate.value);
    const tenure = Number(loanTenure.value);

    if (loanAmountDisplay) loanAmountDisplay.textContent = formatCurrency(amount);
    if (interestRateDisplay) interestRateDisplay.textContent = rate.toFixed(1) + '%';
    if (loanTenureDisplay) loanTenureDisplay.textContent = tenure + (tenure === 1 ? ' Year' : ' Years');
  }

  function calculateEMI() {
    const principal = Number(loanAmount.value);
    const annualRate = Number(interestRate.value);
    const years = Number(loanTenure.value);

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    let emi;
    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const total = emi * months;
    const interest = total - principal;

    if (monthlyEMI) monthlyEMI.textContent = formatCurrency(emi);
    if (resultPrincipal) resultPrincipal.textContent = formatCurrency(principal);
    if (totalInterest) totalInterest.textContent = formatCurrency(interest);
    if (totalPayment) totalPayment.textContent = formatCurrency(total);

    const principalPct = (principal / total) * 100;
    const interestPct = (interest / total) * 100;

    if (principalBar) principalBar.style.width = principalPct + '%';
    if (interestBar) interestBar.style.width = interestPct + '%';
    if (principalPercentage) principalPercentage.textContent = principalPct.toFixed(1) + '%';
    if (interestPercentage) interestPercentage.textContent = interestPct.toFixed(1) + '%';
  }

  function refresh() {
    updateInputDisplays();
    calculateEMI();
  }

  [loanAmount, interestRate, loanTenure].forEach((input) => {
    input.addEventListener('input', refresh);
  });

  const calculateButton = document.getElementById('emiCalculateBtn');
  calculateButton?.addEventListener('click', refresh);

  /* Initial calculation on load */
  refresh();
})();
