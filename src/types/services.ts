export interface MassageService {
  code: string;
  name: string;
  style: string;
  pressure: number; // 1-5 scale
  durationOptions: number[]; // minutes
  basePrice60min: number; // INR
  techniques: string;
  focusAreas: string;
  primaryBenefits: string;
  contraindications: string;
  oilsProducts: string;
  roomSetup: string;
  recommendedAddOns: string;
  category: 'relaxation' | 'therapeutic' | 'specialty' | 'couples' | 'wellness';
}

export interface ServicePackage {
  id: string;
  services: string[]; // service codes
  name: string;
  description: string;
  totalDuration: number;
  packagePrice: number;
  discount: number;
}

export interface AddOnService {
  code: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

// Complete massage catalog
export const MASSAGE_CATALOG: MassageService[] = [
  {
    code: 'ARO',
    name: 'Aromatherapy Massage',
    style: 'Essential oils + light-medium pressure',
    pressure: 2,
    durationOptions: [45, 60, 75, 90],
    basePrice60min: 2400,
    techniques: 'Swedish base with inhalation, acupressure points',
    focusAreas: 'Full body or targeted (stress areas)',
    primaryBenefits: 'Mood uplift, relaxation, sleep support',
    contraindications: 'Allergies, asthma triggers, pregnancy (avoid certain oils)',
    oilsProducts: 'Lavender, eucalyptus, citrus blends (diluted to 1-2%)',
    roomSetup: 'Diffuser, proper ventilation',
    recommendedAddOns: 'Scalp massage, face massage (oil-free)',
    category: 'relaxation'
  },
  {
    code: 'AYU',
    name: 'Ayurvedic Abhyanga',
    style: 'Warm oil, dosha-balanced',
    pressure: 2,
    durationOptions: [60, 75, 90],
    basePrice60min: 2800,
    techniques: 'Rhythmic strokes towards heart, scalp work',
    focusAreas: 'Full body + scalp',
    primaryBenefits: 'Nourishment, calm Vata, skin health',
    contraindications: 'Fever, indigestion, heavy meals prior',
    oilsProducts: 'Warm sesame/coconut oil; medicated oils as indicated',
    roomSetup: 'Heated table, ample towels',
    recommendedAddOns: 'Shirodhara (add-on)',
    category: 'wellness'
  },
  {
    code: 'LYB',
    name: 'Back, Neck & Shoulder Focus',
    style: 'Targeted clinical or relaxing',
    pressure: 3,
    durationOptions: [30, 45, 60],
    basePrice60min: 1900,
    techniques: 'Combination: Swedish + deep tissue',
    focusAreas: 'Upper back, neck, shoulders',
    primaryBenefits: 'Office tension relief, headache reduction',
    contraindications: 'Acute cervical injury',
    oilsProducts: 'Neutral oil/balm',
    roomSetup: 'Face cradle, hot towel for neck',
    recommendedAddOns: 'Scalp massage, cupping',
    category: 'therapeutic'
  },
  {
    code: 'BAL',
    name: 'Balinese Massage',
    style: 'Indonesian, rhythmic, aromatic',
    pressure: 3,
    durationOptions: [60, 75, 90],
    basePrice60min: 2600,
    techniques: 'Kneading, skin rolling, acupressure, long strokes',
    focusAreas: 'Full body',
    primaryBenefits: 'Relaxation + muscle work, circulation',
    contraindications: 'Fever, skin infections',
    oilsProducts: 'Frangipani/jasmine blends, coconut oil',
    roomSetup: 'Warm room, tropical aroma',
    recommendedAddOns: 'Body polish, flower foot bath',
    category: 'relaxation'
  },
  {
    code: 'CHR',
    name: 'Chair Massage (Corporate/Events)',
    style: 'Clothed, no oil',
    pressure: 3,
    durationOptions: [10, 15, 20, 30],
    basePrice60min: 1600,
    techniques: 'Compression, kneading, percussion',
    focusAreas: 'Back, neck, shoulders, arms',
    primaryBenefits: 'Quick relief, workplace wellness',
    contraindications: 'Severe back injury',
    oilsProducts: 'None',
    roomSetup: 'Portable chair',
    recommendedAddOns: 'Aromatherapy towelette',
    category: 'specialty'
  },
  {
    code: 'CPL',
    name: 'Couples Massage',
    style: 'Two therapists, same room',
    pressure: 2,
    durationOptions: [60, 75, 90],
    basePrice60min: 4180,
    techniques: 'Choose style per person',
    focusAreas: 'As requested',
    primaryBenefits: 'Shared relaxation experience',
    contraindications: 'As per chosen styles',
    oilsProducts: 'Neutral + requested aromas',
    roomSetup: 'Two tables, synchronized timing',
    recommendedAddOns: 'Rose petals, sparkling beverage',
    category: 'couples'
  },
  {
    code: 'CST',
    name: 'Craniosacral Therapy',
    style: 'Subtle, clothes-on',
    pressure: 1,
    durationOptions: [45, 60],
    basePrice60min: 2600,
    techniques: 'Gentle holds at cranium/sacrum, unwinding',
    focusAreas: 'Head, spine, sacrum',
    primaryBenefits: 'Nervous system downregulation, headache relief',
    contraindications: 'Recent skull/spine trauma, intracranial pressure issues',
    oilsProducts: 'None',
    roomSetup: 'Very quiet room',
    recommendedAddOns: 'Breathwork coaching',
    category: 'therapeutic'
  },
  {
    code: 'DPT',
    name: 'Deep Tissue Massage',
    style: 'Western therapeutic',
    pressure: 4,
    durationOptions: [45, 60, 75, 90],
    basePrice60min: 2500,
    techniques: 'Slow deep strokes, cross-fiber friction, sustained pressure',
    focusAreas: 'Neck, shoulders, back, hips, calves',
    primaryBenefits: 'Chronic tension release, posture improvement, mobility',
    contraindications: 'Acute injury, blood thinners, osteoporosis (caution), varicosities',
    oilsProducts: 'Low-slip oil/balm; warming liniment (optional)',
    roomSetup: 'Extra bolsters, adjustable table height',
    recommendedAddOns: 'Cupping, heat packs, myofascial release',
    category: 'therapeutic'
  },
  {
    code: 'FAC',
    name: 'Face Massage (Oil-free)',
    style: 'Gentle, lymph focused',
    pressure: 1,
    durationOptions: [30, 45],
    basePrice60min: 1800,
    techniques: 'Feather strokes, lymph strokes, acupressure',
    focusAreas: 'Jaw, sinuses, temples',
    primaryBenefits: 'Sinus relief, TMJ ease, glow',
    contraindications: 'Active acne flares, skin infections',
    oilsProducts: 'Hyaluronic gel or oil-free medium',
    roomSetup: 'Extra head support',
    recommendedAddOns: 'Cold jade roller',
    category: 'wellness'
  },
  {
    code: 'REF',
    name: 'Foot Reflexology',
    style: 'Zone therapy on feet (option: hands/ears)',
    pressure: 3,
    durationOptions: [30, 45, 60],
    basePrice60min: 1600,
    techniques: 'Thumb walking, holds on reflex points',
    focusAreas: 'Feet (and optional hands/ears)',
    primaryBenefits: 'Relaxation, perceived systemic balance',
    contraindications: 'Foot fractures, open sores, severe gout',
    oilsProducts: 'Foot cream/balm; sanitizer',
    roomSetup: 'Recliner or bed, warm towels',
    recommendedAddOns: 'Foot scrub, paraffin wrap',
    category: 'wellness'
  },
  {
    code: 'FHD',
    name: 'Four-Hand Massage',
    style: 'Two therapists, synchronized',
    pressure: 2,
    durationOptions: [60, 75, 90],
    basePrice60min: 4400,
    techniques: 'Mirrored Swedish/Balinese flow',
    focusAreas: 'Full body',
    primaryBenefits: 'Immersive relaxation',
    contraindications: 'Sensory overload sensitivity',
    oilsProducts: 'Aromatic blend',
    roomSetup: 'Large room, choreography',
    recommendedAddOns: 'Aromatherapy',
    category: 'specialty'
  },
  {
    code: 'HNS',
    name: 'Head & Scalp Ritual',
    style: 'Oil or oil-free, focused',
    pressure: 2,
    durationOptions: [30, 45, 60],
    basePrice60min: 1800,
    techniques: 'Circular scalp work, pressure points',
    focusAreas: 'Scalp, temples, neck',
    primaryBenefits: 'Calming, sleep support',
    contraindications: 'Scalp dermatitis (oil version)',
    oilsProducts: 'Warm oil (optional), towels',
    roomSetup: 'Towel wrap',
    recommendedAddOns: 'Face massage (oil-free)',
    category: 'relaxation'
  },
  {
    code: 'HST',
    name: 'Hot Stone Massage',
    style: 'Warm basalt stones with Swedish flow',
    pressure: 2,
    durationOptions: [60, 75, 90],
    basePrice60min: 2800,
    techniques: 'Stone placement, gliding strokes with stones',
    focusAreas: 'Back, legs, arms; full body',
    primaryBenefits: 'Deep relaxation, reduced muscle guarding',
    contraindications: 'Diabetes neuropathy, cardiovascular issues, pregnancy (abdomen)',
    oilsProducts: 'Heat-safe oil; sanitized basalt stones; heater 50-55°C',
    roomSetup: 'Stone warmer, towels for insulation',
    recommendedAddOns: 'Aromatherapy, foot scrub',
    category: 'specialty'
  },
  {
    code: 'JLR',
    name: 'Jet-Lag Recovery',
    style: 'Circulation + lymph + scalp',
    pressure: 2,
    durationOptions: [45, 60, 75],
    basePrice60min: 2500,
    techniques: 'Lymph strokes, foot/leg focus, scalp work',
    focusAreas: 'Feet, legs, neck, scalp',
    primaryBenefits: 'Reset circadian rhythm, reduce swelling',
    contraindications: 'DVT risk',
    oilsProducts: 'Refreshing mint/citrus (diluted)',
    roomSetup: 'Cooler room option',
    recommendedAddOns: 'Eye mask take-home',
    category: 'wellness'
  },
  {
    code: 'LOM',
    name: 'Lomi Lomi',
    style: 'Hawaiian long flowing strokes',
    pressure: 2,
    durationOptions: [60, 75, 90],
    basePrice60min: 2700,
    techniques: 'Forearm gliding, rhythmic movement',
    focusAreas: 'Full body, heart-centered flow',
    primaryBenefits: 'Deep relaxation, mind-body connection',
    contraindications: 'None specific beyond general',
    oilsProducts: 'Warm coconut oil',
    roomSetup: 'Warmth, continuous draping',
    recommendedAddOns: 'Sound bath mini (10 min)',
    category: 'relaxation'
  },
  {
    code: 'LYM',
    name: 'Lower-Body Recovery',
    style: 'Athlete legs + glutes focus',
    pressure: 3,
    durationOptions: [30, 45, 60],
    basePrice60min: 2000,
    techniques: 'Compression, stripping, stretching',
    focusAreas: 'Quads, hamstrings, calves, feet, glutes',
    primaryBenefits: 'DOMS relief, mobility',
    contraindications: 'DVT, acute strains',
    oilsProducts: 'Sports gel',
    roomSetup: 'Stretch straps',
    recommendedAddOns: 'Percussive therapy',
    category: 'therapeutic'
  },
  {
    code: 'LMD',
    name: 'Lymphatic Drainage (Manual)',
    style: 'Very light, rhythmic',
    pressure: 1,
    durationOptions: [45, 60, 75],
    basePrice60min: 2700,
    techniques: 'Vodder-inspired gentle strokes toward lymph nodes',
    focusAreas: 'Face/neck/abdomen/limbs as indicated',
    primaryBenefits: 'Edema reduction, detox support, post-op swelling (non-acute)',
    contraindications: 'Acute infection, heart failure, DVT, active cancer (unless cleared)',
    oilsProducts: 'Minimal/no oil',
    roomSetup: 'Warm room, quiet pace',
    recommendedAddOns: 'Cold gel for legs (seasonal)',
    category: 'therapeutic'
  },
  {
    code: 'MFR',
    name: 'Myofascial Release',
    style: 'Slow, sustained fascial holds',
    pressure: 3,
    durationOptions: [45, 60, 75, 90],
    basePrice60min: 2600,
    techniques: 'Skin rolling, fascial stretching, unwinding',
    focusAreas: 'Chronic tight chains (IT band, QL, pecs)',
    primaryBenefits: 'ROM gains, postural symmetry',
    contraindications: 'Fragile skin, acute inflammation',
    oilsProducts: 'Low/no oil for tissue engagement',
    roomSetup: 'Good therapist body mechanics space',
    recommendedAddOns: 'Postural assessment',
    category: 'therapeutic'
  },
  {
    code: 'PRN',
    name: 'Prenatal Massage (2nd/3rd Trimester)',
    style: 'Side-lying, pregnancy-safe',
    pressure: 2,
    durationOptions: [45, 60, 75],
    basePrice60min: 2600,
    techniques: 'Gentle Swedish, lymph support, light mobilizations',
    focusAreas: 'Low back, hips, legs, feet (avoid certain points)',
    primaryBenefits: 'Back/hip relief, edema support, relaxation',
    contraindications: 'First trimester (clinic policy), high-risk pregnancy, preeclampsia',
    oilsProducts: 'Neutral unscented oil; hypoallergenic',
    roomSetup: 'Pregnancy bolsters, side-lying pillows',
    recommendedAddOns: 'Foot soak, gentle scalp massage',
    category: 'specialty'
  },
  {
    code: 'SHI',
    name: 'Shiatsu',
    style: 'Japanese acupressure (clothed)',
    pressure: 3,
    durationOptions: [45, 60, 90],
    basePrice60min: 2400,
    techniques: 'Thumb/palm pressure, stretches, meridian-based sequence',
    focusAreas: 'Meridians; back, hips, neck',
    primaryBenefits: 'Energy flow, tension balance',
    contraindications: 'Acute illness, recent surgery',
    oilsProducts: 'No oil; light clothing',
    roomSetup: 'Mat or table with minimal slip',
    recommendedAddOns: 'Foot reflexology',
    category: 'wellness'
  },
  {
    code: 'SHD',
    name: 'Shirodhara (Add-on or Standalone)',
    style: 'Warm oil stream on forehead',
    pressure: 1,
    durationOptions: [30, 45, 60],
    basePrice60min: 3000,
    techniques: 'Continuous pour + scalp massage',
    focusAreas: 'Forehead, scalp, nervous system',
    primaryBenefits: 'Deep calm, sleep support',
    contraindications: 'Scalp skin conditions, oil sensitivity',
    oilsProducts: 'Lightly warmed sesame/coconut oil',
    roomSetup: 'Shirodhara pot/stand, oil catch basin',
    recommendedAddOns: 'Abhyanga combo',
    category: 'specialty'
  },
  {
    code: 'SPT',
    name: 'Sports Massage',
    style: 'Pre/post-event or maintenance',
    pressure: 3,
    durationOptions: [30, 45, 60, 75],
    basePrice60min: 2400,
    techniques: 'Compression, PNF stretching, friction, percussion',
    focusAreas: 'Sport-specific muscle groups',
    primaryBenefits: 'Recovery, injury prevention, performance readiness',
    contraindications: 'Acute strains/sprains, inflammation, fractures',
    oilsProducts: 'Light oil/gel; kinesiology tape (optional)',
    roomSetup: 'Brighter lighting, stretch space',
    recommendedAddOns: 'Percussive therapy, stretching block',
    category: 'therapeutic'
  },
  {
    code: 'SWD',
    name: 'Swedish Massage',
    style: 'Western (oil-based, long effleurage)',
    pressure: 2,
    durationOptions: [30, 45, 60, 75, 90],
    basePrice60min: 2200,
    techniques: 'Effleurage, petrissage, tapotement, friction, vibration',
    focusAreas: 'Full body; relaxation emphasis',
    primaryBenefits: 'Stress relief, improved circulation, light muscle tension relief',
    contraindications: 'Fever, acute infection, open wounds, severe varicose veins',
    oilsProducts: 'Sweet almond or grapeseed oil; calming essential oils (optional)',
    roomSetup: 'Warm room 24-26°C, soft lighting, calming music',
    recommendedAddOns: 'Aromatherapy, scalp massage, hot towels',
    category: 'relaxation'
  },
  {
    code: 'THA',
    name: 'Traditional Thai Massage',
    style: 'Mat-based, clothed, assisted stretches',
    pressure: 3,
    durationOptions: [60, 90, 120],
    basePrice60min: 2500,
    techniques: 'Compression, stretching, mobilization, acupressure',
    focusAreas: 'Whole body energy lines (Sen)',
    primaryBenefits: 'Flexibility, joint mobility, energy balance',
    contraindications: 'Recent surgery, herniated discs, severe hypertension',
    oilsProducts: 'No oil; loose clothing',
    roomSetup: 'Firm mat on floor, extra pillows',
    recommendedAddOns: 'Herbal compress (warm)',
    category: 'wellness'
  },
  {
    code: 'TRP',
    name: 'Trigger Point Therapy',
    style: 'Clinical point-specific release',
    pressure: 4,
    durationOptions: [30, 45, 60],
    basePrice60min: 2500,
    techniques: 'Ischemic compression, stripping, stretch',
    focusAreas: 'Upper traps, levator, glutes, calves',
    primaryBenefits: 'Headache relief, referred pain reduction',
    contraindications: 'Acute tear, uncontrolled BP',
    oilsProducts: 'Minimal oil, warming balm',
    roomSetup: 'Quiet, focused',
    recommendedAddOns: 'Heat pack, guided stretching',
    category: 'therapeutic'
  }
];

export const ADD_ON_SERVICES: AddOnService[] = [
  { code: 'CUP', name: 'Cupping Therapy', duration: 15, price: 800, description: 'Silicone/glass cups for myofascial release' },
  { code: 'GST', name: 'Gua Sha', duration: 15, price: 600, description: 'Scraping tool along fascia for trigger relief' },
  { code: 'SCL', name: 'Scalp Massage', duration: 15, price: 500, description: 'Circular scalp work and pressure points' },
  { code: 'ARO', name: 'Aromatherapy Enhancement', duration: 0, price: 300, description: 'Essential oil blend upgrade' },
  { code: 'HTP', name: 'Heat Pack', duration: 10, price: 400, description: 'Therapeutic heat application' },
  { code: 'FSC', name: 'Foot Scrub', duration: 15, price: 700, description: 'Exfoliating foot treatment' },
  { code: 'PAR', name: 'Paraffin Wrap', duration: 20, price: 900, description: 'Moisturizing paraffin treatment' },
  { code: 'STR', name: 'Stretching Session', duration: 15, price: 600, description: 'Guided therapeutic stretching' },
  { code: 'PRC', name: 'Percussive Therapy', duration: 10, price: 500, description: 'Mechanical massage device treatment' },
  { code: 'SND', name: 'Sound Bath Mini', duration: 10, price: 800, description: 'Tibetan singing bowl session' }
];

export const SERVICE_CATEGORIES = [
  { id: 'relaxation', name: 'Relaxation & Wellness', color: 'bg-green-100 text-green-700' },
  { id: 'therapeutic', name: 'Therapeutic & Clinical', color: 'bg-blue-100 text-blue-700' },
  { id: 'specialty', name: 'Specialty Treatments', color: 'bg-purple-100 text-purple-700' },
  { id: 'couples', name: 'Couples & Group', color: 'bg-pink-100 text-pink-700' },
  { id: 'wellness', name: 'Holistic Wellness', color: 'bg-yellow-100 text-yellow-700' }
];

export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  HALF_DAY: 'half_day',
  LEAVE: 'leave'
} as const;

export type AttendanceStatus = typeof ATTENDANCE_STATUS[keyof typeof ATTENDANCE_STATUS];

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
  location?: string;
}