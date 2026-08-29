/**
 * Deepam Financial Services — Insurance Comparison Platform
 * Page-specific behavior for insurance.html only. Written in the same
 * class-based style as main.js so it's consistent with the rest of the
 * site, but kept separate so main.js (loaded on every page) doesn't
 * carry insurance-only code and demo data.
 *
 * DEMO DATA NOTICE: everything in DEMO_PLANS below is illustrative
 * sample data for the UI to demonstrate against. When you're ready to
 * connect a real insurance-aggregator API, replace the contents of
 * DEMO_PLANS and the two functions marked "REPLACE WITH API CALL"
 * — the rest of the UI (rendering, filtering, sorting, comparison)
 * works against whatever array those functions return, so it doesn't
 * need to change.
 */

/* ==========================================================================
   Demo data — illustrative only, not real insurer quotes
   ========================================================================== */
const DEMO_PLANS = {
  health: [
    { id: 'h1', insurer: 'Star Health', plan: 'Comprehensive Health Plan', premium: 14500, coverage: '₹10 Lakh', duration: '1 Year', claimSettlement: '96.8%', rating: 4.3, waitingPeriod: '30 days (2 yrs for pre-existing)', networkHospitals: '11,000+', benefits: ['Cashless treatment', 'No-claim bonus up to 100%', 'Free annual health check-up', 'Pre & post hospitalization cover'], exclusions: ['Cosmetic treatments', 'Self-inflicted injury', 'War & nuclear risks'], addons: ['Maternity cover', 'Critical illness rider'] },
    { id: 'h2', insurer: 'Niva Bupa', plan: 'ReAssure 2.0', premium: 12800, coverage: '₹10 Lakh', duration: '1 Year', claimSettlement: '94.2%', rating: 4.1, waitingPeriod: '30 days (3 yrs for pre-existing)', networkHospitals: '9,000+', benefits: ['Unlimited reinstatement of cover', 'Air ambulance cover', 'Home healthcare'], exclusions: ['Dental treatment (unless accident)', 'Obesity treatment'], addons: ['OPD cover', 'Personal accident cover'] },
    { id: 'h3', insurer: 'Care Health', plan: 'Care Supreme', premium: 15900, coverage: '₹15 Lakh', duration: '1 Year', claimSettlement: '92.5%', rating: 4.0, waitingPeriod: '30 days (4 yrs for pre-existing)', networkHospitals: '8,500+', benefits: ['Unlimited teleconsultations', 'Automatic recharge of sum insured', 'International coverage add-on'], exclusions: ['Non-allopathic treatment (unless opted)', 'Weight management'], addons: ['International treatment', 'Room rent waiver'] },
    { id: 'h4', insurer: 'HDFC Ergo', plan: 'Optima Secure', premium: 13200, coverage: '₹10 Lakh', duration: '1 Year', claimSettlement: '95.1%', rating: 4.2, waitingPeriod: '30 days (3 yrs for pre-existing)', networkHospitals: '13,000+', benefits: ['Booster + benefit', 'No room rent capping', 'Multiplier benefit up to 6x'], exclusions: ['Cosmetic surgery', 'Infertility treatment (unless opted)'], addons: ['Air ambulance', 'Second opinion'] },
  ],
  term: [
    { id: 't1', insurer: 'HDFC Life', plan: 'Click 2 Protect Super', premium: 11200, coverage: '₹1 Crore', duration: '30 Years', claimSettlement: '99.0%', rating: 4.5, waitingPeriod: 'N/A', networkHospitals: 'N/A', benefits: ['Level cover till 85 yrs option', 'Accidental death benefit', 'Terminal illness payout'], exclusions: ['Suicide within 1st year', 'Non-disclosure of medical history'], addons: ['Critical illness rider', 'Waiver of premium'] },
    { id: 't2', insurer: 'ICICI Prudential', plan: 'iProtect Smart', premium: 10800, coverage: '₹1 Crore', duration: '30 Years', claimSettlement: '99.2%', rating: 4.6, waitingPeriod: 'N/A', networkHospitals: 'N/A', benefits: ['Return of premium option', 'Special exit value', '34 critical illnesses covered'], exclusions: ['Suicide within 1st year', 'Death due to hazardous activity (unless disclosed)'], addons: ['Accidental death benefit', 'Income benefit rider'] },
    { id: 't3', insurer: 'Max Life', plan: 'Smart Secure Plus', premium: 10500, coverage: '₹1 Crore', duration: '30 Years', claimSettlement: '99.3%', rating: 4.6, waitingPeriod: 'N/A', networkHospitals: 'N/A', benefits: ['Whole life cover option', 'Premium break option', 'Joint life cover available'], exclusions: ['Suicide within 1st year'], addons: ['Critical illness rider', 'Accidental death benefit'] },
    { id: 't4', insurer: 'Tata AIA', plan: 'Sampoorna Raksha Supreme', premium: 11600, coverage: '₹1 Crore', duration: '30 Years', claimSettlement: '98.8%', rating: 4.4, waitingPeriod: 'N/A', networkHospitals: 'N/A', benefits: ['Life stage protection', 'Return of premium option', 'Terminal illness benefit'], exclusions: ['Suicide within 1st year'], addons: ['Waiver of premium', 'Critical illness rider'] },
  ],
  motor: [
    { id: 'm1', insurer: 'ICICI Lombard', plan: 'Comprehensive Car Cover', premium: 8200, coverage: 'IDV ₹6 Lakh', duration: '1 Year', claimSettlement: '95.5%', rating: 4.2, waitingPeriod: 'N/A', networkHospitals: '7,500+ garages', benefits: ['Zero depreciation add-on', 'Roadside assistance', 'Engine protection'], exclusions: ['Driving without valid license', 'Consequential damages'], addons: ['Zero depreciation', 'Return to invoice'] },
    { id: 'm2', insurer: 'Bajaj Allianz', plan: 'Motor Secure', premium: 7600, coverage: 'IDV ₹6 Lakh', duration: '1 Year', claimSettlement: '94.0%', rating: 4.0, waitingPeriod: 'N/A', networkHospitals: '6,800+ garages', benefits: ['No claim bonus protection', 'Cashless garages nationwide', '24x7 spot assistance'], exclusions: ['Drunk driving', 'Damage outside India'], addons: ['Engine protector', 'NCB protector'] },
    { id: 'm3', insurer: 'Tata AIG', plan: 'Auto Secure', premium: 8900, coverage: 'IDV ₹6 Lakh', duration: '1 Year', claimSettlement: '93.8%', rating: 4.1, waitingPeriod: 'N/A', networkHospitals: '7,200+ garages', benefits: ['Key replacement cover', 'Tyre protection add-on', 'Consumables cover'], exclusions: ['Mechanical breakdown', 'Wear and tear'], addons: ['Tyre secure', 'Consumables cover'] },
    { id: 'm4', insurer: 'HDFC Ergo', plan: 'Motor Comprehensive', premium: 7900, coverage: 'IDV ₹6 Lakh', duration: '1 Year', claimSettlement: '95.0%', rating: 4.2, waitingPeriod: 'N/A', networkHospitals: '8,000+ garages', benefits: ['Instant claim approval', 'Personal accident cover included', 'No inspection renewal'], exclusions: ['Driving under influence', 'Racing or speed contests'], addons: ['Zero depreciation', 'Roadside assistance'] },
  ],
  travel: [
    { id: 'tr1', insurer: 'Tata AIG', plan: 'Travel Guard International', premium: 1450, coverage: '$100,000', duration: 'Per Trip', claimSettlement: '92.0%', rating: 4.0, waitingPeriod: 'N/A', networkHospitals: 'Worldwide cashless network', benefits: ['Medical emergency cover', 'Trip cancellation cover', 'Baggage loss cover'], exclusions: ['Pre-existing conditions (unless opted)', 'Adventure sports (unless opted)'], addons: ['Adventure sports cover', 'Trip delay cover'] },
    { id: 'tr2', insurer: 'ICICI Lombard', plan: 'Travel Insurance International', premium: 1290, coverage: '$100,000', duration: 'Per Trip', claimSettlement: '91.5%', rating: 3.9, waitingPeriod: 'N/A', networkHospitals: 'Worldwide cashless network', benefits: ['Emergency medical evacuation', 'Passport loss cover', 'Missed connection cover'], exclusions: ['Self-inflicted injury', 'War-related events'], addons: ['Compassionate visit', 'Home burglary cover'] },
    { id: 'tr3', insurer: 'Bajaj Allianz', plan: 'Travel Companion', premium: 1180, coverage: '$50,000', duration: 'Per Trip', claimSettlement: '90.8%', rating: 3.8, waitingPeriod: 'N/A', networkHospitals: 'Worldwide cashless network', benefits: ['24x7 travel assistance', 'Flight delay cover', 'Emergency cash advance'], exclusions: ['Pre-existing conditions', 'Alcohol-related incidents'], addons: ['Adventure sports cover', 'Extended stay cover'] },
  ],
  life: [
    { id: 'l1', insurer: 'LIC', plan: 'Jeevan Umang', premium: 9800, coverage: '₹50 Lakh', duration: 'Whole Life', claimSettlement: '98.6%', rating: 4.3, waitingPeriod: 'N/A', networkHospitals: 'N/A', benefits: ['Whole life coverage', 'Survival benefits from 15th year', 'Loan facility available'], exclusions: ['Suicide within 1st year'], addons: ['Accidental death benefit', 'Critical illness rider'] },
    { id: 'l2', insurer: 'ICICI Prudential', plan: 'Guaranteed Income Plan', premium: 10500, coverage: '₹50 Lakh', duration: 'Whole Life', claimSettlement: '99.2%', rating: 4.5, waitingPeriod: 'N/A', networkHospitals: 'N/A', benefits: ['Guaranteed regular income', 'Life cover throughout', 'Flexible payout options'], exclusions: ['Suicide within 1st year'], addons: ['Waiver of premium'] },
  ],
  home: [
    { id: 'ho1', insurer: 'HDFC Ergo', plan: 'Home Suraksha', premium: 3200, coverage: '₹50 Lakh', duration: '1 Year', claimSettlement: '93.0%', rating: 4.0, waitingPeriod: 'N/A', networkHospitals: 'N/A', benefits: ['Fire & allied perils cover', 'Burglary & theft cover', 'Contents cover included'], exclusions: ['Wear and tear', 'Damage due to war'], addons: ['Jewellery cover', 'Electronic equipment cover'] },
    { id: 'ho2', insurer: 'Bajaj Allianz', plan: 'My Home Insurance', premium: 2900, coverage: '₹50 Lakh', duration: '1 Year', claimSettlement: '91.5%', rating: 3.9, waitingPeriod: 'N/A', networkHospitals: 'N/A', benefits: ['Structure + contents cover', 'Natural calamity cover', 'Alternate accommodation cover'], exclusions: ['Intentional damage', 'Gradual deterioration'], addons: ['Portable equipment cover'] },
  ],
};

/* ============================================================
   HEALTH INSURANCE FORM FIELDS
============================================================ */

const HEALTH_FORM_FIELDS = [

    {
        name: 'age',
        label: 'Age',
        type: 'number',
        min: 1,
        max: 100,
        required: true
    },

    {
        name: 'members',
        label: 'Number of Members',
        type: 'number',
        min: 1,
        max: 20,
        required: true
    },

    {
        name: 'city',
        label: 'City',
        type: 'text',
        required: true
    },

    {
        name: 'sumInsured',
        label: 'Preferred Sum Insured',
        type: 'select',
        options: [
            '₹5 Lakh',
            '₹10 Lakh',
            '₹15 Lakh',
            '₹25 Lakh',
            '₹50 Lakh',
            '₹1 Crore'
        ],
        required: true
    },

    {
        name: 'existingDisease',
        label: 'Pre-existing Disease',
        type: 'select',
        options: [
            'No',
            'Yes'
        ],
        required: true
    },

    {
        name: 'smokingStatus',
        label: 'Smoking Status',
        type: 'select',
        options: [
            'Non-smoker',
            'Smoker'
        ],
        required: true
    }

];

/* Field configuration per insurance type — drives the dynamic form */
const FIELD_CONFIGS = {
  health: [

  /* ============================================================
     MANIPALCIGNA LIFETIME
     ============================================================ */

  {
    id: 'mc-lifetime-health',
    insurer: 'ManipalCigna',
    plan: 'LifeTime Health India',
    category: 'Health Insurance',

    premium: null,
    coverage: '₹50 Lakh – ₹3 Crore',
    duration: '1 / 2 / 3 Years',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.5,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Cashless network – verify current list',

    roomCategory: 'Any room including suite for ₹3 Cr SI',
    restoration: 'Unlimited for unrelated illnesses',
    daycare: 'Covered up to Sum Insured',
    preHospitalisation: 'Covered',
    postHospitalisation: 'Covered',
    domiciliary: 'Up to 10% of SI',
    ayush: 'Covered',
    modernTreatments: 'Covered',
    mentalCare: 'Covered up to SI',
    globalTreatment: 'Not available under India variant',

    benefits: [
      '₹50 Lakh to ₹3 Crore Sum Insured',
      'Unlimited restoration for unrelated illnesses',
      'Any-room option for ₹3 Crore SI',
      'Day-care treatment covered',
      'AYUSH treatment covered',
      'Modern treatments covered',
      'Mental-care cover'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods as applicable',
      'Terms and conditions apply'
    ],

    addons: [
      'Refer to available policy options'
    ]
  },


  {
    id: 'mc-lifetime-global',
    insurer: 'ManipalCigna',
    plan: 'LifeTime Health Global',
    category: 'Health Insurance',

    premium: null,
    coverage: '₹50 Lakh – ₹3 Crore',
    duration: '1 / 2 / 3 Years',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.5,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Cashless network – verify current list',

    roomCategory: 'Any room including suite for ₹3 Cr SI',
    restoration: 'Unlimited for unrelated illnesses',
    daycare: 'Covered up to Sum Insured',
    preHospitalisation: 'Covered',
    postHospitalisation: 'Covered',
    domiciliary: 'Up to 10% of SI',
    ayush: 'Covered',
    modernTreatments: 'Covered',
    mentalCare: 'Covered up to SI',
    globalTreatment: 'Available subject to plan conditions',

    benefits: [
      '₹50 Lakh to ₹3 Crore domestic Sum Insured',
      'Separate global Sum Insured option',
      'Global treatment subject to plan conditions',
      'Unlimited restoration for unrelated illnesses',
      'Any-room option for ₹3 Crore SI',
      'Modern treatments covered'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Global treatment subject to applicable conditions',
      'Waiting periods as applicable'
    ],

    addons: [
      'Major illness coverage outside India may be available',
      'Refer to policy schedule'
    ]
  },


  /* ============================================================
     MANIPALCIGNA SARVAH
     ============================================================ */

  {
    id: 'mc-sarvah-pratham',
    insurer: 'ManipalCigna',
    plan: 'Sarvah Pratham',
    category: 'Health Insurance',

    premium: null,
    coverage: '₹5 Lakh – ₹3 Crore',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.5,

    waitingPeriod: 'Zero-waiting feature subject to conditions',
    networkHospitals: 'Verify current cashless network',

    roomCategory: 'Single Private AC Room',
    restoration: 'Unlimited',
    daycare: 'Covered',
    guaranteedBonus: 'Up to 15×',
    surplusBenefit: 'Additional 100% from day one',
    majorIllness: 'Up to ₹3 Crore for specified major illnesses',

    benefits: [
      '₹5 Lakh to ₹3 Crore Sum Insured',
      '15× guaranteed bonus feature',
      'Zero-waiting-period feature',
      'No zonal co-payment',
      'Unlimited restoration',
      'Surplus benefit',
      'Major illness cover',
      'Single private AC room'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Applicable waiting periods and conditions',
      'Policy terms apply'
    ],

    addons: [
      'Refer to official policy schedule'
    ]
  },


  {
    id: 'mc-sarvah-uttam',
    insurer: 'ManipalCigna',
    plan: 'Sarvah Uttam',
    category: 'Health Insurance',

    premium: null,
    coverage: '₹5 Lakh – ₹3 Crore',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.6,

    waitingPeriod: 'Zero-waiting feature subject to conditions',
    networkHospitals: 'Verify current cashless network',

    roomCategory: 'Single Private AC Room',
    restoration: 'Unlimited',
    daycare: 'Covered',
    guaranteedBonus: 'Up to 15×',
    surplusBenefit: 'Available',
    majorIllness: 'Covered',

    benefits: [
      '₹5 Lakh to ₹3 Crore Sum Insured',
      '15× guaranteed bonus feature',
      'Zero-waiting-period feature',
      'No zonal co-payment',
      'Unlimited restoration',
      'Surplus benefit',
      'Major illness cover',
      'Single private AC room'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Applicable waiting periods and conditions',
      'Policy terms apply'
    ],

    addons: [
      'Refer to official policy schedule'
    ]
  },


  {
    id: 'mc-sarvah-param',
    insurer: 'ManipalCigna',
    plan: 'Sarvah Param',
    category: 'Health Insurance',

    premium: null,
    coverage: '₹5 Lakh – ₹3 Crore',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.7,

    waitingPeriod: 'Zero-waiting feature subject to conditions',
    networkHospitals: 'Verify current cashless network',

    roomCategory: 'Single Private AC Room',
    restoration: 'Unlimited',
    daycare: 'Covered',
    guaranteedBonus: 'Up to 15×',
    surplusBenefit: 'Available',
    majorIllness: 'Covered',

    benefits: [
      '₹5 Lakh to ₹3 Crore Sum Insured',
      '15× guaranteed bonus feature',
      'Zero-waiting-period feature',
      'No zonal co-payment',
      'Unlimited restoration',
      'Surplus benefit',
      'Major illness cover',
      'Single private AC room'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Applicable waiting periods and conditions',
      'Policy terms apply'
    ],

    addons: [
      'Refer to official policy schedule'
    ]
  },


  /* ============================================================
     CARE SUPREME SENIOR
     ============================================================ */

  {
    id: 'care-supreme-senior-premium',
    insurer: 'Care Health Insurance',
    plan: 'Care Supreme Senior Premium',
    category: 'Senior Citizen Health Insurance',

    premium: null,
    coverage: '₹5 Lakh – ₹25 Lakh',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.3,

    waitingPeriod: 'PED: 3 years; reduction option may apply',
    networkHospitals: 'Verify current cashless network',

    entryAge: '61+',
    maximumEntryAge: 'No limit',
    coPay: '20%',
    diseaseSubLimits: 'No',
    lifelongRenewal: 'Yes',
    recharge: 'Unlimited automatic recharge',
    cumulativeBonus: 'Up to 7× in 5 years',
    ayush: 'Covered',
    homeCare: 'Covered',
    consultation: 'Unlimited e-consultation',

    benefits: [
      'Designed for senior citizens',
      'No upper age limit',
      'Lifelong renewability',
      '20% mandatory co-payment',
      'No disease-wise sub-limits',
      'Unlimited automatic recharge',
      'Cumulative Bonus Super',
      'AYUSH treatment',
      'Home care',
      'Annual health check-up'
    ],

    exclusions: [
      'Subject to policy exclusions',
      '20% co-payment applies',
      'PED waiting period applies'
    ],

    addons: [
      'PED waiting period reduction option'
    ]
  },


  {
    id: 'care-supreme-senior-super',
    insurer: 'Care Health Insurance',
    plan: 'Care Supreme Senior Super',
    category: 'Senior Citizen Health Insurance',

    premium: null,
    coverage: '₹5 Lakh – ₹25 Lakh',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.1,

    waitingPeriod: 'PED: 3 years; reduction option may apply',
    networkHospitals: 'Verify current cashless network',

    entryAge: '61+',
    maximumEntryAge: 'No limit',
    coPay: '20%',
    diseaseSubLimits: 'Yes',
    lifelongRenewal: 'Yes',
    recharge: 'Unlimited automatic recharge',
    cumulativeBonus: 'Up to 7× in 5 years',
    ayush: 'Covered',
    homeCare: 'Covered',
    consultation: 'Unlimited e-consultation',

    benefits: [
      'Designed for senior citizens',
      'No upper age limit',
      'Lifelong renewability',
      '20% mandatory co-payment',
      'Unlimited automatic recharge',
      'Cumulative Bonus Super',
      'AYUSH treatment',
      'Home care',
      'Annual health check-up'
    ],

    exclusions: [
      'Subject to policy exclusions',
      '20% co-payment applies',
      'Disease-wise sub-limits apply',
      'PED waiting period applies'
    ],

    addons: [
      'PED waiting period reduction option'
    ]
  },


  /* ============================================================
     NIVA BUPA REASSURE 2.0
     ============================================================ */

  {
    id: 'niva-reassure-20-bronze',
    insurer: 'Niva Bupa',
    plan: 'ReAssure 2.0 Bronze+',
    category: 'Health Insurance',

    premium: null,
    coverage: 'Variant dependent',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.2,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    booster: 'Up to 10× unused base SI',
    reassureForever: 'Unlimited reinstatement',
    lockTheClock: 'Available',
    healthCheckup: 'Day 1',
    liveHealthy: 'Up to 30% renewal discount',

    benefits: [
      'Booster+ benefit',
      'ReAssure Forever',
      'Lock the Clock',
      'Day-1 annual health check-up',
      'AYUSH',
      'Day-care',
      'Modern treatments',
      'E-consultation'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods as applicable',
      'Policy terms apply'
    ],

    addons: [
      'Available options depend on selected variant'
    ]
  },


  {
    id: 'niva-reassure-20-titanium',
    insurer: 'Niva Bupa',
    plan: 'ReAssure 2.0 Titanium+',
    category: 'Health Insurance',

    premium: null,
    coverage: 'Variant dependent',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.4,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    booster: 'Up to 10× unused base SI',
    reassureForever: 'Unlimited reinstatement',
    lockTheClock: 'Available',
    healthCheckup: 'Day 1',
    liveHealthy: 'Up to 30% renewal discount',

    benefits: [
      'Booster+ benefit',
      'ReAssure Forever',
      'Lock the Clock',
      'Day-1 annual health check-up',
      'AYUSH',
      'Day-care',
      'Modern treatments',
      'E-consultation'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods as applicable',
      'Policy terms apply'
    ],

    addons: [
      'Available options depend on selected variant'
    ]
  },


  {
    id: 'niva-reassure-20-platinum',
    insurer: 'Niva Bupa',
    plan: 'ReAssure 2.0 Platinum+',
    category: 'Health Insurance',

    premium: null,
    coverage: 'Variant dependent',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.6,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    booster: 'Up to 10× unused base SI',
    reassureForever: 'Unlimited reinstatement',
    lockTheClock: 'Available',
    healthCheckup: 'Day 1',
    liveHealthy: 'Up to 30% renewal discount',

    benefits: [
      'Booster+ benefit',
      'ReAssure Forever',
      'Lock the Clock',
      'Day-1 annual health check-up',
      'AYUSH',
      'Day-care',
      'Modern treatments',
      'E-consultation'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods as applicable',
      'Policy terms apply'
    ],

    addons: [
      'Available options depend on selected variant'
    ]
  },


  /* ============================================================
     NIVA BUPA ASPIRE
     ============================================================ */

  {
    id: 'niva-aspire-gold',
    insurer: 'Niva Bupa',
    plan: 'Aspire Gold+',
    category: 'Family Health Insurance',

    premium: null,
    coverage: 'Variant dependent',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.2,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    lockTheClock: 'Yes',
    booster: 'Booster+',
    maternity: 'M-iracle',
    borderless: 'Available',
    hospitalisation: '2+ hours',
    preHospitalisation: '60 days',
    postHospitalisation: '180 days',
    liveHealthy: 'Up to 30% renewal discount',

    benefits: [
      'Lock the Clock+',
      'Booster+',
      'M-iracle maternity benefits',
      'Maternity coverage',
      'IVF',
      'Adoption',
      'Surrogacy',
      'Pre-natal care',
      'Borderless option',
      'Home care'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods apply',
      'Policy terms and conditions apply'
    ],

    addons: [
      'Refer to selected variant and policy schedule'
    ]
  },


  {
    id: 'niva-aspire-diamond',
    insurer: 'Niva Bupa',
    plan: 'Aspire Diamond+',
    category: 'Family Health Insurance',

    premium: null,
    coverage: 'Variant dependent',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.3,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    lockTheClock: 'Yes',
    booster: 'Booster+',
    maternity: 'M-iracle',
    borderless: 'Available',
    hospitalisation: '2+ hours',
    preHospitalisation: '60 days',
    postHospitalisation: '180 days',
    liveHealthy: 'Up to 30% renewal discount',

    benefits: [
      'Lock the Clock+',
      'Booster+',
      'M-iracle maternity benefits',
      'Maternity coverage',
      'IVF',
      'Adoption',
      'Surrogacy',
      'Pre-natal care',
      'Borderless option',
      'Home care'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods apply',
      'Policy terms apply'
    ],

    addons: [
      'Refer to selected variant and policy schedule'
    ]
  },


  {
    id: 'niva-aspire-platinum',
    insurer: 'Niva Bupa',
    plan: 'Aspire Platinum+',
    category: 'Family Health Insurance',

    premium: null,
    coverage: 'Variant dependent',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.5,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    lockTheClock: 'Yes',
    booster: 'Booster+',
    maternity: 'M-iracle',
    borderless: 'Available',
    hospitalisation: '2+ hours',
    preHospitalisation: '60 days',
    postHospitalisation: '180 days',
    liveHealthy: 'Up to 30% renewal discount',

    benefits: [
      'Lock the Clock+',
      'Booster+',
      'M-iracle maternity benefits',
      'Maternity coverage',
      'IVF',
      'Adoption',
      'Surrogacy',
      'Pre-natal care',
      'Borderless option',
      'Home care'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods apply',
      'Policy terms apply'
    ],

    addons: [
      'Refer to selected variant and policy schedule'
    ]
  },


  {
    id: 'niva-aspire-titanium',
    insurer: 'Niva Bupa',
    plan: 'Aspire Titanium+',
    category: 'Family Health Insurance',

    premium: null,
    coverage: 'Variant dependent',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.6,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    lockTheClock: 'Yes',
    booster: 'Booster+',
    maternity: 'M-iracle',
    borderless: 'Available',
    hospitalisation: '2+ hours',
    preHospitalisation: '60 days',
    postHospitalisation: '180 days',
    liveHealthy: 'Up to 30% renewal discount',

    benefits: [
      'Lock the Clock+',
      'Booster+',
      'M-iracle maternity benefits',
      'Maternity coverage',
      'IVF',
      'Adoption',
      'Surrogacy',
      'Pre-natal care',
      'Borderless option',
      'Home care'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods apply',
      'Policy terms apply'
    ],

    addons: [
      'Refer to selected variant and policy schedule'
    ]
  },


  /* ============================================================
     NIVA BUPA REASSURE 3.0
     ============================================================ */

  {
    id: 'niva-reassure-30-classic',
    insurer: 'Niva Bupa',
    plan: 'ReAssure 3.0 Classic',
    category: 'Health Insurance',

    premium: null,
    coverage: 'Unlimited Sum Insured',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.2,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    roomCategory: 'General Room',
    roadAmbulance: '₹2,000 per hospitalisation',
    airAmbulance: 'Not available',
    modernTreatments: 'Up to ₹1 Lakh per claim',
    lockTheClock: 'Not available',
    dailyCash: '₹1,000/day',
    personalAccident: 'Up to ₹10 Lakh',
    borderless: 'Not available',

    benefits: [
      'Unlimited Sum Insured',
      'General room coverage',
      'Day-care treatment',
      'Modern treatment coverage',
      'Hospital daily cash option',
      'Personal accident option'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods apply',
      'Policy terms apply'
    ],

    addons: [
      'Refer to available optional benefits'
    ]
  },


  {
    id: 'niva-reassure-30-select',
    insurer: 'Niva Bupa',
    plan: 'ReAssure 3.0 Select',
    category: 'Health Insurance',

    premium: null,
    coverage: 'Unlimited Sum Insured',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.3,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    roomCategory: 'Twin Sharing',
    roadAmbulance: '₹2,000 per hospitalisation',
    airAmbulance: 'Not available',
    modernTreatments: 'Up to ₹1 Lakh per claim',
    lockTheClock: 'Not available',
    dailyCash: '₹1,000/day',
    personalAccident: 'Up to ₹20 Lakh',
    borderless: 'Up to ₹10 Lakh',

    benefits: [
      'Unlimited Sum Insured',
      'Twin-sharing room coverage',
      'Day-care treatment',
      'Modern treatment coverage',
      'Personal accident option',
      'Borderless option'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods apply',
      'Policy terms apply'
    ],

    addons: [
      'Refer to available optional benefits'
    ]
  },


  {
    id: 'niva-reassure-30-elite',
    insurer: 'Niva Bupa',
    plan: 'ReAssure 3.0 Elite',
    category: 'Health Insurance',

    premium: null,
    coverage: 'Unlimited Sum Insured',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.5,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    roomCategory: 'All rooms except Deluxe/Suite',
    roadAmbulance: 'Up to Sum Insured',
    airAmbulance: 'Up to ₹5 Lakh',
    modernTreatments: 'Up to Sum Insured',
    lockTheClock: 'Yes',
    dailyCash: '₹2,000/day',
    personalAccident: 'Up to ₹50 Lakh',
    borderless: 'Up to ₹50 Lakh',

    benefits: [
      'Unlimited Sum Insured',
      'Broader room coverage',
      'Lock the Clock',
      'Modern treatments up to SI',
      'Air ambulance up to ₹5 Lakh',
      'Personal accident option up to ₹50 Lakh',
      'Borderless option'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods apply',
      'Policy terms apply'
    ],

    addons: [
      'Refer to available optional benefits'
    ]
  },


  {
    id: 'niva-reassure-30-black',
    insurer: 'Niva Bupa',
    plan: 'ReAssure 3.0 Black',
    category: 'Health Insurance',

    premium: null,
    coverage: 'Unlimited Sum Insured',
    duration: 'As per policy option',

    claimSettlement: 'Refer to latest insurer disclosure',
    rating: 4.7,

    waitingPeriod: 'As per policy terms',
    networkHospitals: 'Verify current cashless network',

    roomCategory: 'Any Room',
    roadAmbulance: 'Up to Sum Insured',
    airAmbulance: 'Up to ₹5 Lakh',
    modernTreatments: 'Up to Sum Insured',
    lockTheClock: 'Yes',
    dailyCash: '₹4,000/day',
    personalAccident: 'Up to ₹1 Crore',
    borderless: 'Up to ₹5 Crore',

    benefits: [
      'Unlimited Sum Insured',
      'Any-room coverage',
      'Lock the Clock',
      'Modern treatments up to SI',
      'Air ambulance up to ₹5 Lakh',
      'Personal accident option up to ₹1 Crore',
      'Borderless option up to ₹5 Crore'
    ],

    exclusions: [
      'Subject to policy exclusions',
      'Waiting periods apply',
      'Policy terms apply'
    ],

    addons: [
      'Refer to available optional benefits'
    ]
  }

],
  term: [
    { name: 'age', label: 'Age', type: 'number', min: 18, max: 65, required: true },
    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
    { name: 'annualIncome', label: 'Annual Income', type: 'select', options: ['Below ₹5 Lakh', '₹5–10 Lakh', '₹10–25 Lakh', '₹25 Lakh+'], required: true },
    { name: 'coverageRequired', label: 'Coverage Required', type: 'select', options: ['₹50 Lakh', '₹1 Crore', '₹1.5 Crore', '₹2 Crore'], required: true },
    { name: 'policyDuration', label: 'Policy Duration', type: 'select', options: ['20 Years', '25 Years', '30 Years', 'Till Age 85'], required: true },
    { name: 'smokingStatus', label: 'Smoking Status', type: 'select', options: ['Non-smoker', 'Smoker'], required: true },
  ],
  life: [
    { name: 'age', label: 'Age', type: 'number', min: 18, max: 65, required: true },
    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
    { name: 'annualIncome', label: 'Annual Income', type: 'select', options: ['Below ₹5 Lakh', '₹5–10 Lakh', '₹10–25 Lakh', '₹25 Lakh+'], required: true },
    { name: 'coverageRequired', label: 'Coverage Required', type: 'select', options: ['₹25 Lakh', '₹50 Lakh', '₹1 Crore'], required: true },
    { name: 'policyDuration', label: 'Policy Duration', type: 'select', options: ['Whole Life', '20 Years', '30 Years'], required: true },
    { name: 'smokingStatus', label: 'Smoking Status', type: 'select', options: ['Non-smoker', 'Smoker'], required: true },
  ],
  motor: [
    { name: 'vehicleType', label: 'Vehicle Type', type: 'select', options: ['Car', 'Two-Wheeler', 'Commercial Vehicle'], required: true },
    { name: 'vehicleAge', label: 'Vehicle Age', type: 'select', options: ['Less than 1 Year', '1–3 Years', '3–5 Years', '5+ Years'], required: true },
    { name: 'vehicleModel', label: 'Vehicle Model', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'previousInsurance', label: 'Previous Insurance Status', type: 'select', options: ['Currently Insured', 'Lapsed', 'First-time Buyer'], required: true },
    { name: 'noClaimBonus', label: 'No Claim Bonus', type: 'select', options: ['0%', '20%', '25%', '35%', '45%', '50%+'], required: false },
  ],
  travel: [
    { name: 'destination', label: 'Destination', type: 'text', required: true },
    { name: 'travelStartDate', label: 'Travel Start Date', type: 'date', required: true },
    { name: 'travelEndDate', label: 'Travel End Date', type: 'date', required: true },
    { name: 'travellers', label: 'Number of Travellers', type: 'number', min: 1, max: 20, required: true },
    { name: 'travellerAge', label: 'Traveller Age (Oldest)', type: 'number', min: 1, max: 100, required: true },
    { name: 'tripType', label: 'Trip Type', type: 'select', options: ['Single Trip', 'Multi-Trip / Annual'], required: true },
  ],
  home: [
    { name: 'propertyType', label: 'Property Type', type: 'select', options: ['Apartment', 'Independent House', 'Rented Property'], required: true },
    { name: 'propertyValue', label: 'Property Value', type: 'select', options: ['₹25 Lakh', '₹50 Lakh', '₹1 Crore', '₹1 Crore+'], required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'constructionType', label: 'Construction Type', type: 'select', options: ['RCC (Concrete)', 'Other'], required: true },
    { name: 'policyDuration', label: 'Policy Duration', type: 'select', options: ['1 Year', '3 Years', '5 Years'], required: true },
  ],
};

const TYPE_LABELS = {
  life: 'Life Insurance', health: 'Health Insurance', motor: 'Motor Insurance',
  term: 'Term Insurance', travel: 'Travel Insurance', home: 'Home Insurance',
};

/* ==========================================================================
   REPLACE WITH API CALL — these two functions are the only places that
   touch demo data. Swap their internals for a real fetch() to an
   insurance-aggregator API and everything downstream keeps working.
   ========================================================================== */
function fetchDemoPlans(type) {
  return DEMO_PLANS[type] || [];
}

function estimateDemoPremium(type, inputs) {
  // Simple illustrative formula — NOT a real underwriting calculation.
  const base = { health: 8000, term: 7000, life: 8500, motor: 5000, travel: 900, home: 2200 }[type] || 5000;
  const age = parseInt(inputs.age || inputs.travellerAge || inputs.vehicleAge || '30', 10) || 30;
  const ageFactor = 1 + Math.max(0, age - 25) * 0.015;
  const smokingFactor = inputs.smokingStatus === 'Smoker' ? 1.4 : 1;
  const estimate = Math.round(base * ageFactor * smokingFactor / 10) * 10;
  return estimate;
}

/* ==========================================================================
   InsuranceTypeSelector — the 6 type cards at the top of the page
   ========================================================================== */
class InsuranceTypeSelector {
  constructor(formController) {
    this.cards = document.querySelectorAll('.insurance-type-card');
    this.formController = formController;
    if (!this.cards.length) return;

    this.cards.forEach((card) => {
      card.querySelector('.insurance-compare-now')?.addEventListener('click', (e) => {
        e.preventDefault();
        this.select(card.dataset.type);
      });
    });
  }

  select(type) {
    this.cards.forEach((c) => c.classList.toggle('is-selected', c.dataset.type === type));
    this.formController.showFormFor(type);
    document.querySelector('#insurance-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ==========================================================================
   InsuranceFormController — renders dynamic fields + validates + submits
   ========================================================================== */
class InsuranceFormController {
  constructor(resultsManager) {
    this.section = document.querySelector('#insurance-form-section');
    this.titleEl = document.querySelector('#insurance-form-title');
    this.fieldsEl = document.querySelector('#insurance-form-fields');
    this.form = document.querySelector('#insurance-comparison-form');
    this.resultsManager = resultsManager;
    this.activeType = null;
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  showFormFor(type) {
    this.activeType = type;
    this.section.classList.add('is-active');
    this.titleEl.textContent = `Compare ${TYPE_LABELS[type]} Plans`;
    this.renderFields(type);
  }

  renderFields(type) {

    let fields = FIELD_CONFIGS[type] || [];

    /* Health uses a separate form configuration
       because FIELD_CONFIGS.health contains
       insurance product information. */

    if (type === 'health') {
        fields = HEALTH_FORM_FIELDS;
    }

    this.fieldsEl.innerHTML =
        fields.map((f) => this.renderField(f)).join('');

}

  renderField(f) {
    const req = f.required ? 'required' : '';
    const id = `insfield-${f.name}`;
    let control;
    if (f.type === 'select') {
      control = `<select id="${id}" name="${f.name}" class="insurance-select" style="width:100%;" ${req}>
        <option value="">Select ${f.label}</option>
        ${f.options.map((o) => `<option value="${o}">${o}</option>`).join('')}
      </select>`;
    } else {
      control = `<input type="${f.type}" id="${id}" name="${f.name}" ${f.min ? `min="${f.min}"` : ''} ${f.max ? `max="${f.max}"` : ''} ${req}>`;
    }
    return `<div class="form-field">
      <label for="${id}">${f.label}</label>
      ${control}
      <span class="field-error">Please fill in ${f.label.toLowerCase()}.</span>
    </div>`;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.activeType) return;

    const fields = FIELD_CONFIGS[this.activeType] || [];
    let isValid = true;

    fields.forEach((f) => {
      const input = this.form.querySelector(`[name="${f.name}"]`);
      const wrapper = input?.closest('.form-field');
      const filled = input && input.value.trim().length > 0;
      const fieldOk = !f.required || filled;
      wrapper?.classList.toggle('has-error', !fieldOk);
      if (!fieldOk) isValid = false;
    });

    if (!isValid) return;

    const inputs = Object.fromEntries(new FormData(this.form).entries());
    const plans = fetchDemoPlans(this.activeType);
    this.resultsManager.setResults(this.activeType, plans, inputs);
    document.querySelector('#insurance-results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ==========================================================================
   ResultsManager — renders plan cards, handles filter/sort/select,
   and builds the side-by-side comparison table
   ========================================================================== */
class ResultsManager {
  constructor() {
    this.resultsSection = document.querySelector('#insurance-results-section');
    this.gridEl = document.querySelector('#insurance-plans-grid');
    this.countEl = document.querySelector('#insurance-results-count');
    this.sortSelect = document.querySelector('#insurance-sort');
    this.filterSelect = document.querySelector('#insurance-filter');
    this.compareSection = document.querySelector('#insurance-compare-section');
    this.compareWrap = document.querySelector('#insurance-compare-wrap');

    this.currentType = null;
    this.currentPlans = [];
    this.selectedIds = new Set();

    this.sortSelect?.addEventListener('change', () => this.render());
    this.filterSelect?.addEventListener('change', () => this.render());
  }

  setResults(type, plans, inputs) {
    this.currentType = type;
    this.currentPlans = plans;
    this.selectedIds.clear();
    this.resultsSection.classList.add('is-active');
    this.render();
  }

  getSortedFiltered() {
    let list = [...this.currentPlans];
    const filter = this.filterSelect?.value;
    const sort = this.sortSelect?.value;


  /* ================= FILTER ================= */

  if (filter === 'lowest-premium') {

    list.sort((a, b) =>
      (a.premium ?? Infinity) -
      (b.premium ?? Infinity)
    );


  /* ================= FILTER ================= */

  if (filter === 'lowest-premium') {

    list.sort((a, b) =>
      (a.premium ?? Infinity) -
      (b.premium ?? Infinity)
    );

  }


  if (filter === 'highest-coverage') {

    list.sort((a, b) =>
      this.coverageNumber(b.coverage) -
      this.coverageNumber(a.coverage)
    );

  }


  if (filter === 'highest-rating') {

    list.sort((a, b) =>
      b.rating - a.rating
    );

  }


  if (filter === 'best-benefits') {

    list.sort((a, b) =>
      b.benefits.length -
      a.benefits.length
    );

  }


  if (filter === 'shortest-waiting') {

    list.sort((a, b) =>
      this.waitingDays(a.waitingPeriod) -
      this.waitingDays(b.waitingPeriod)
    );

  }


  /* ================= SORT ================= */

  if (sort === 'premium-asc') {

    list.sort((a, b) =>
      (a.premium ?? Infinity) -
      (b.premium ?? Infinity)
    );

  }


  if (sort === 'premium-desc') {

    list.sort((a, b) =>
      (b.premium ?? -1) -
      (a.premium ?? -1)
    );

  }


  if (sort === 'coverage-desc') {

    list.sort((a, b) =>
      this.coverageNumber(b.coverage) -
      this.coverageNumber(a.coverage)
    );

  }


  if (sort === 'rating-desc') {

    list.sort((a, b) =>
      b.rating - a.rating
    );

  }


  return list;
}
    if (filter === 'highest-coverage') list.sort((a, b) => this.coverageNumber(b.coverage) - this.coverageNumber(a.coverage));
    if (filter === 'highest-rating') list.sort((a, b) => b.rating - a.rating);
    if (filter === 'best-benefits') list.sort((a, b) => b.benefits.length - a.benefits.length);
    if (filter === 'shortest-waiting') list.sort((a, b) => this.waitingDays(a.waitingPeriod) - this.waitingDays(b.waitingPeriod));

    if (sort === 'premium-asc') list.sort((a, b) => a.premium - b.premium);
    if (sort === 'premium-desc') list.sort((a, b) => b.premium - a.premium);
    if (sort === 'coverage-desc') list.sort((a, b) => this.coverageNumber(b.coverage) - this.coverageNumber(a.coverage));
    if (sort === 'rating-desc') list.sort((a, b) => b.rating - a.rating);

    return list;
  }

  coverageNumber(str) {
    const match = str.match(/[\d.]+/);
    if (!match) return 0;
    const num = parseFloat(match[0]);
    return str.includes('Crore') ? num * 100 : num;
  }

  waitingDays(str) {
    const match = str.match(/(\d+)\s*days/);
    return match ? parseInt(match[1], 10) : 9999;
  }

  render() {
    const list = this.getSortedFiltered();
    this.countEl.textContent = `${list.length} plan${list.length !== 1 ? 's' : ''} found`;
    this.gridEl.innerHTML = list.map((p) => this.renderCard(p)).join('');

    this.gridEl.querySelectorAll('.insurance-plan-details-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const details = btn.closest('.insurance-plan-card').querySelector('.insurance-plan-details');
        details.classList.toggle('is-open');
        btn.textContent = details.classList.contains('is-open') ? 'Hide Details' : 'View Details';
      });
    });

    this.gridEl.querySelectorAll('.insurance-plan-select input').forEach((cb) => {
      cb.addEventListener('change', () => this.toggleSelect(cb.value, cb.checked, cb));
    });
  }

  renderCard(p) {
    const selected = this.selectedIds.has(p.id) ? 'is-selected' : '';
    const checked = this.selectedIds.has(p.id) ? 'checked' : '';
    return `<div class="insurance-plan-card ${selected}" data-plan-id="${p.id}">
      <div class="insurance-plan-head">
        <div>
          <div class="insurance-plan-insurer">${p.insurer}</div>
          <div class="insurance-plan-name">${p.plan}</div>
        </div>
        <div class="insurance-plan-rating">★ ${p.rating}</div>
      </div>
      <div class="insurance-plan-stats">
        <div class="insurance-plan-stat"><span class="stat-label">Premium</span><span class="stat-value">₹${p.premium.toLocaleString('en-IN')}</span></div>
        <div class="insurance-plan-stat"><span class="stat-label">Coverage</span><span class="stat-value">${p.coverage}</span></div>
        <div class="insurance-plan-stat"><span class="stat-label">Duration</span><span class="stat-value">${p.duration}</span></div>
        <div class="insurance-plan-stat"><span class="stat-label">Claim Settlement</span><span class="stat-value">${p.claimSettlement}</span></div>
      </div>
      <div class="insurance-plan-details">
        <div class="insurance-plan-list">
          <strong>Key Benefits</strong>
          <ul>${p.benefits.map((b) => `<li>${b}</li>`).join('')}</ul>
        </div>
        <div class="insurance-plan-list" style="margin-top:12px;">
          <strong>Exclusions</strong>
          <ul>${p.exclusions.map((b) => `<li>${b}</li>`).join('')}</ul>
        </div>
        <div class="insurance-plan-list" style="margin-top:12px;">
          <strong>Available Add-ons</strong>
          <ul>${p.addons.map((b) => `<li>${b}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="insurance-plan-actions">
        <button type="button" class="btn btn-outline insurance-plan-details-toggle">View Details</button>
        <label class="insurance-plan-select">
          <input type="checkbox" value="${p.id}" ${checked}> Select Plan
        </label>
      </div>
    </div>`;
  }

  toggleSelect(id, checked, checkboxEl) {
    if (checked) {
      if (this.selectedIds.size >= 3) {
        checkboxEl.checked = false;
        alert('You can compare up to 3 plans at a time.');
        return;
      }
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
    checkboxEl.closest('.insurance-plan-card').classList.toggle('is-selected', checked);
    this.renderComparison();
  }

  renderComparison() {
    if (!this.compareSection) return;
    const selected = this.currentPlans.filter((p) => this.selectedIds.has(p.id));

    if (selected.length < 2) {
      this.compareWrap.innerHTML = `<div class="insurance-compare-empty">Select at least 2 plans above to compare them side by side.</div>`;
      return;
    }

   const rows = [

  [
    'Premium',
    (p) => p.premium
      ? `₹${p.premium.toLocaleString('en-IN')}`
      : 'Quote required'
  ],

  [
    'Coverage / Sum Insured',
    (p) => p.coverage || '—'
  ],

  [
    'Policy Duration',
    (p) => p.duration || '—'
  ],

  [
    'Room Category',
    (p) => p.roomCategory || '—'
  ],

  [
    'Restoration',
    (p) => p.restoration || p.reassureForever || '—'
  ],

  [
    'Waiting Period',
    (p) => p.waitingPeriod || '—'
  ],

  [
    'Network Hospitals',
    (p) => p.networkHospitals || '—'
  ],

  [
    'Day-care',
    (p) => p.daycare || '—'
  ],

  [
    'Pre-hospitalisation',
    (p) => p.preHospitalisation || '—'
  ],

  [
    'Post-hospitalisation',
    (p) => p.postHospitalisation || '—'
  ],

  [
    'Domiciliary',
    (p) => p.domiciliary || '—'
  ],

  [
    'AYUSH',
    (p) => p.ayush || '—'
  ],

  [
    'Modern Treatments',
    (p) => p.modernTreatments || '—'
  ],

  [
    'Mental Care',
    (p) => p.mentalCare || '—'
  ],

  [
    'Global Treatment',
    (p) => p.globalTreatment || p.borderless || '—'
  ],

  [
    'Guaranteed Bonus',
    (p) => p.guaranteedBonus || '—'
  ],

  [
    'Surplus Benefit',
    (p) => p.surplusBenefit || '—'
  ],

  [
    'Major Illness',
    (p) => p.majorIllness || '—'
  ],

  [
    'Co-payment',
    (p) => p.coPay || '—'
  ],

  [
    'Disease-wise Sub-limits',
    (p) => p.diseaseSubLimits || '—'
  ],

  [
    'Lifelong Renewal',
    (p) => p.lifelongRenewal || '—'
  ],

  [
    'Booster+',
    (p) => p.booster || '—'
  ],

  [
    'Lock the Clock',
    (p) => p.lockTheClock || '—'
  ],

  [
    'Hospitalisation Threshold',
    (p) => p.hospitalisation || '—'
  ],

  [
    'Road Ambulance',
    (p) => p.roadAmbulance || '—'
  ],

  [
    'Air Ambulance',
    (p) => p.airAmbulance || '—'
  ],

  [
    'Hospital Daily Cash',
    (p) => p.dailyCash || '—'
  ],

  [
    'Personal Accident',
    (p) => p.personalAccident || '—'
  ],

  [
    'Maternity',
    (p) => p.maternity || '—'
  ],

  [
    'Rating',
    (p) => `★ ${p.rating}`
  ],

  [
    'Key Benefits',
    (p) => p.benefits.join(', ')
  ],

  [
    'Exclusions',
    (p) => p.exclusions.join(', ')
  ],

  [
    'Add-ons',
    (p) => p.addons.join(', ')
  ]

];
    

    const table = `<table class="insurance-compare-table">
      <thead>
        <tr><th>Compare</th>${selected.map((p) => `<th>${p.insurer}<br><span style="font-weight:400;font-size:0.85rem;">${p.plan}</span></th>`).join('')}</tr>
      </thead>
      <tbody>
        ${rows.map(([label, getter]) => {
          const values = selected.map((p) => getter(p));
          const allSame = values.every((v) => v === values[0]);
          return `<tr>
            <th>${label}</th>
            ${values.map((v) => `<td class="${allSame ? '' : 'diff-highlight'}">${v}</td>`).join('')}
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;

    this.compareWrap.innerHTML = table;
  }
}

/* ==========================================================================
   PremiumEstimator — standalone illustrative calculator
   ========================================================================== */
class PremiumEstimator {
  constructor() {
    this.form = document.querySelector('#insurance-estimator-form');
    this.resultEl = document.querySelector('#insurance-estimator-result');
    this.amountEl = document.querySelector('#insurance-estimator-amount');
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const inputs = Object.fromEntries(new FormData(this.form).entries());
    if (!inputs.estType || !inputs.estAge) return;
    const estimate = estimateDemoPremium(inputs.estType, { age: inputs.estAge, smokingStatus: inputs.estSmoking });
    this.amountEl.textContent = `₹${estimate.toLocaleString('en-IN')} / year (approx.)`;
    this.resultEl.classList.add('is-visible');
  }
}

/* ==========================================================================
   Accordion — generic, used for both Buying Guide and FAQ
   ========================================================================== */
class Accordion {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    this.container.querySelectorAll('.insurance-accordion-item').forEach((item) => {
      const trigger = item.querySelector('.insurance-accordion-trigger');
      trigger?.addEventListener('click', () => {
        const wasOpen = item.classList.contains('is-open');
        this.container.querySelectorAll('.insurance-accordion-item').forEach((i) => i.classList.remove('is-open'));
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  }
}

/* ==========================================================================
   InsuranceApp — entry point for this page only
   ========================================================================== */
class InsuranceApp {
  static init() {
    const resultsManager = new ResultsManager();
    const formController = new InsuranceFormController(resultsManager);
    new InsuranceTypeSelector(formController);
    new PremiumEstimator();
    new Accordion('#insurance-guide-accordion');
    new Accordion('#insurance-faq-accordion');
  }
}

document.addEventListener('DOMContentLoaded', () => InsuranceApp.init());
