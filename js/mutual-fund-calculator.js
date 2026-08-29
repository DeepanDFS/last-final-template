/* =========================================================
   DEEPAM FINANCIAL SERVICES
   MUTUAL FUND SIP & LUMPSUM CALCULATOR
========================================================= */

class MutualFundCalculator {

  constructor() {

    /* ================= MODE ================= */

    this.mode = "sip";


    /* ================= INPUTS ================= */

    this.monthlyInvestment =
      document.querySelector("#mf-monthly-investment");

    this.monthlySlider =
      document.querySelector("#mf-monthly-slider");

    this.lumpsumInvestment =
      document.querySelector("#mf-lumpsum-investment");

    this.lumpsumSlider =
      document.querySelector("#mf-lumpsum-slider");

    this.returnRate =
      document.querySelector("#mf-return");

    this.returnSlider =
      document.querySelector("#mf-return-slider");

    this.years =
      document.querySelector("#mf-years");

    this.yearsSlider =
      document.querySelector("#mf-years-slider");


    /* ================= BUTTONS ================= */

    this.calculateButton =
      document.querySelector("#mf-calculate");

    this.resetButton =
      document.querySelector("#mf-reset");


    /* ================= RESULTS ================= */

    this.futureValue =
      document.querySelector("#mf-future-value");

    this.investedAmount =
      document.querySelector("#mf-invested");

    this.estimatedReturns =
      document.querySelector("#mf-returns");

    this.periodResult =
      document.querySelector("#mf-period");

    this.rateResult =
      document.querySelector("#mf-rate");


    /* ================= BARS ================= */

    this.investmentBar =
      document.querySelector("#mf-investment-bar");

    this.growthBar =
      document.querySelector("#mf-growth-bar");


    /* ================= MODE INPUTS ================= */

    this.sipInput =
      document.querySelector("#mf-sip-input");

    this.lumpsumInput =
      document.querySelector("#mf-lumpsum-input");


    /* ================= MODE BUTTONS ================= */

    this.modeButtons =
      document.querySelectorAll(".mf-mode-btn");


    /* ================= CHECK ================= */

    if (!this.calculateButton) {

      console.warn(
        "Mutual Fund Calculator: #mf-calculate was not found."
      );

      return;
    }


    this.bindEvents();

    this.calculate();

  }


  /* =========================================================
     EVENTS
  ========================================================= */

  bindEvents() {


    /* ================= SIP / LUMPSUM ================= */

    this.modeButtons.forEach((button) => {

      button.addEventListener("click", () => {

        this.mode =
          button.dataset.mode;


        this.modeButtons.forEach((btn) => {

          btn.classList.remove("is-active");

        });


        button.classList.add("is-active");


        if (this.mode === "sip") {

          if (this.sipInput) {
            this.sipInput.hidden = false;
          }

          if (this.lumpsumInput) {
            this.lumpsumInput.hidden = true;
          }

        } else {

          if (this.sipInput) {
            this.sipInput.hidden = true;
          }

          if (this.lumpsumInput) {
            this.lumpsumInput.hidden = false;
          }

        }


        this.calculate();

      });

    });


    /* ================= MONTHLY INVESTMENT ================= */

    this.monthlyInvestment?.addEventListener(
      "input",
      () => {

        if (this.monthlySlider) {

          this.monthlySlider.value =
            this.monthlyInvestment.value;

        }

        this.calculate();

      }
    );


    this.monthlySlider?.addEventListener(
      "input",
      () => {

        if (this.monthlyInvestment) {

          this.monthlyInvestment.value =
            this.monthlySlider.value;

        }

        this.calculate();

      }
    );


    /* ================= LUMPSUM ================= */

    this.lumpsumInvestment?.addEventListener(
      "input",
      () => {

        if (this.lumpsumSlider) {

          this.lumpsumSlider.value =
            this.lumpsumInvestment.value;

        }

        this.calculate();

      }
    );


    this.lumpsumSlider?.addEventListener(
      "input",
      () => {

        if (this.lumpsumInvestment) {

          this.lumpsumInvestment.value =
            this.lumpsumSlider.value;

        }

        this.calculate();

      }
    );


    /* ================= RETURN ================= */

    this.returnRate?.addEventListener(
      "input",
      () => {

        if (this.returnSlider) {

          this.returnSlider.value =
            this.returnRate.value;

        }

        this.calculate();

      }
    );


    this.returnSlider?.addEventListener(
      "input",
      () => {

        if (this.returnRate) {

          this.returnRate.value =
            this.returnSlider.value;

        }

        this.calculate();

      }
    );


    /* ================= YEARS ================= */

    this.years?.addEventListener(
      "input",
      () => {

        if (this.yearsSlider) {

          this.yearsSlider.value =
            this.years.value;

        }

        this.calculate();

      }
    );


    this.yearsSlider?.addEventListener(
      "input",
      () => {

        if (this.years) {

          this.years.value =
            this.yearsSlider.value;

        }

        this.calculate();

      }
    );


    /* ================= CALCULATE ================= */

    this.calculateButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        this.calculate();

      }
    );


    /* ================= RESET ================= */

    this.resetButton?.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        this.reset();

      }
    );

  }


  /* =========================================================
     CALCULATE
  ========================================================= */

  calculate() {

    /* Make sure required elements exist */

    if (
      !this.returnRate ||
      !this.years
    ) {

      console.error(
        "Calculator error: Return rate or years input is missing."
      );

      return;

    }


    const rate =
      parseFloat(this.returnRate.value);


    const years =
      parseFloat(this.years.value);


    console.log(
      "Calculator inputs:",
      {
        mode: this.mode,
        rate,
        years
      }
    );


    /* Validate */

    if (
      !Number.isFinite(rate) ||
      !Number.isFinite(years) ||
      rate <= 0 ||
      years <= 0
    ) {

      console.warn(
        "Invalid return rate or investment period."
      );

      return;

    }


    let invested = 0;

    let futureValue = 0;


    /* =====================================================
       SIP
    ===================================================== */

    if (this.mode === "sip") {

      if (!this.monthlyInvestment) {

        console.error(
          "Calculator error: #mf-monthly-investment not found."
        );

        return;

      }


      const monthly =
        parseFloat(this.monthlyInvestment.value);


      console.log(
        "Monthly investment:",
        monthly
      );


      if (
        !Number.isFinite(monthly) ||
        monthly <= 0
      ) {

        console.warn(
          "Invalid monthly investment."
        );

        return;

      }


      const monthlyRate =
        rate / 100 / 12;


      const months =
        years * 12;


      /*
        SIP future value

        FV =
        P × [((1+r)^n - 1) / r] × (1+r)
      */

      futureValue =
        monthly *
        (
          (Math.pow(
            1 + monthlyRate,
            months
          ) - 1)
          / monthlyRate
        ) *
        (1 + monthlyRate);


      invested =
        monthly * months;

    }


    /* =====================================================
       LUMPSUM
    ===================================================== */

    else {

      if (!this.lumpsumInvestment) {

        console.error(
          "Calculator error: #mf-lumpsum-investment not found."
        );

        return;

      }


      const lumpsum =
        parseFloat(
          this.lumpsumInvestment.value
        );


      if (
        !Number.isFinite(lumpsum) ||
        lumpsum <= 0
      ) {

        console.warn(
          "Invalid lumpsum investment."
        );

        return;

      }


      futureValue =
        lumpsum *
        Math.pow(
          1 + rate / 100,
          years
        );


      invested =
        lumpsum;

    }


    /* =====================================================
       RETURNS
    ===================================================== */

    const returns =
      futureValue - invested;


    console.log(
      "Calculator results:",
      {
        futureValue,
        invested,
        returns
      }
    );


    this.displayResults(
      futureValue,
      invested,
      returns,
      years,
      rate
    );

  }


  /* =========================================================
     DISPLAY
  ========================================================= */

  displayResults(
    futureValue,
    invested,
    returns,
    years,
    rate
  ) {

    if (this.futureValue) {

      this.futureValue.textContent =
        this.formatCurrency(futureValue);

    }


    if (this.investedAmount) {

      this.investedAmount.textContent =
        this.formatCurrency(invested);

    }


    if (this.estimatedReturns) {

      this.estimatedReturns.textContent =
        this.formatCurrency(returns);

    }


    if (this.periodResult) {

      this.periodResult.textContent =
        `${years} Years`;

    }


    if (this.rateResult) {

      this.rateResult.textContent =
        `${rate}%`;

    }


    /* ================= BARS ================= */

    const total =
      invested + returns;


    if (
      total > 0 &&
      this.investmentBar &&
      this.growthBar
    ) {

      const investmentPercentage =
        (invested / total) * 100;


      const growthPercentage =
        (returns / total) * 100;


      this.investmentBar.style.width =
        `${investmentPercentage}%`;


      this.growthBar.style.width =
        `${growthPercentage}%`;

    }

  }


  /* =========================================================
     RESET
  ========================================================= */

  reset() {

    this.mode = "sip";


    this.modeButtons.forEach(
      (button) => {

        button.classList.toggle(
          "is-active",
          button.dataset.mode === "sip"
        );

      }
    );


    if (this.sipInput) {

      this.sipInput.hidden = false;

    }


    if (this.lumpsumInput) {

      this.lumpsumInput.hidden = true;

    }


    if (this.monthlyInvestment) {

      this.monthlyInvestment.value = 5000;

    }


    if (this.monthlySlider) {

      this.monthlySlider.value = 5000;

    }


    if (this.lumpsumInvestment) {

      this.lumpsumInvestment.value = 100000;

    }


    if (this.lumpsumSlider) {

      this.lumpsumSlider.value = 100000;

    }


    if (this.returnRate) {

      this.returnRate.value = 12;

    }


    if (this.returnSlider) {

      this.returnSlider.value = 12;

    }


    if (this.years) {

      this.years.value = 10;

    }


    if (this.yearsSlider) {

      this.yearsSlider.value = 10;

    }


    this.calculate();

  }


  /* =========================================================
     CURRENCY
  ========================================================= */

  formatCurrency(value) {

    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }
    ).format(value);

  }

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    new MutualFundCalculator();

  }
);