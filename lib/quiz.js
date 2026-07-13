// =============================================================================
// You First — Estimate Quiz Configuration
// The full 12-step quiz + estimate calculator logic lives here.
// Edit any question, option or price without touching the component.
// =============================================================================

import { AREAS } from './content'

// Complete 12-step quiz definition.
// Each step has: id, title (question), info (why we're asking),
// type (single | multi | textblock | date-time | contact), options[]
export const QUIZ_STEPS = [
  {
    id: 'location',
    title: "Where is the home you're planning interiors for located?",
    info: 'This helps us match you with the best designers near your property.',
    type: 'location',
    // fields: searchInput, areaSelect (AREAS), pincode
  },
  {
    id: 'project_type',
    title: 'Are you looking for new home interiors, renovation or resale?',
    info: "We'll match you with designers who specialise in your specific need.",
    type: 'single',
    options: [
      { value: 'new', icon: '🏢', label: 'New Home Interiors', desc: 'A newly built bare shell property' },
      { value: 'renovation', icon: '🔧', label: 'Renovation', desc: 'Your home is lived-in and needs its interiors redone' },
      { value: 'resale', icon: '🏘️', label: 'Resale', desc: 'A previously owned property' },
    ],
  },
  {
    id: 'home_type',
    title: 'What kind of home do you own?',
    info: 'This helps us better understand the nature and scope of work.',
    type: 'single',
    options: [
      { value: 'apartment', icon: '🏬', label: 'An Apartment' },
      { value: 'villa', icon: '🏡', label: 'A Villa' },
      { value: 'house', icon: '🏠', label: 'An Independent House' },
    ],
  },
  {
    id: 'bhk_type',
    title: 'Select your BHK type',
    info: 'The configuration of your home helps us estimate scope and cost.',
    type: 'pills',
    options: [
      { value: '1BHK', label: '1 BHK' },
      { value: '2BHK', label: '2 BHK' },
      { value: '3BHK', label: '3 BHK' },
      { value: '4BHK', label: '4 BHK' },
      { value: '5BHK+', label: '5 BHK+' },
    ],
  },
  {
    id: 'scope_items',
    title: 'Tell us about the scope of your project?',
    info: 'The clearer your requirements, the better we can plan for you.',
    type: 'multi',
    options: [
      { value: 'modular_kitchen', icon: '🍳', label: 'Modular Kitchen' },
      { value: 'wardrobe', icon: '🚪', label: 'Modular Wardrobe / Storage' },
      { value: 'wall_panelling', icon: '🎨', label: 'Wall Solutions / Panelling' },
      { value: 'false_ceiling', icon: '⬜', label: 'False Ceiling' },
      { value: 'painting', icon: '🖌️', label: 'Painting' },
      { value: 'furniture', icon: '🪑', label: 'Furniture & Decor' },
      { value: 'tv_unit', icon: '📺', label: 'TV Unit / Pooja Unit' },
      { value: 'living_room', icon: '🛋️', label: 'Living Room Design' },
      { value: 'bedroom', icon: '🛏️', label: 'Bedroom Design' },
      { value: 'dining', icon: '🍽️', label: 'Dining Room Design' },
      { value: 'bathroom', icon: '🛁', label: 'Bathroom Design' },
      { value: 'full_home', icon: '🏠', label: 'Full Home Interiors' },
    ],
  },
  {
    id: 'budget_range',
    title: "What's the budget you have in mind?",
    info: 'Knowing this helps our designer suggest ideas that fit your needs right from the start.',
    type: 'pills',
    options: [
      { value: '30L+', label: 'Greater than ₹30 Lacs' },
      { value: '25-30L', label: '₹25L – ₹30L' },
      { value: '20-25L', label: '₹20L – ₹25L' },
      { value: '15-20L', label: '₹15L – ₹20L' },
      { value: '10-15L', label: '₹10L – ₹15L' },
      { value: '8-10L', label: '₹8L – ₹10L' },
      { value: '6-8L', label: '₹6L – ₹8L' },
      { value: '3-6L', label: '₹3L – ₹6L', recommended: true },
      { value: '1-3L', label: '₹1L – ₹3L' },
      { value: '<1L', label: 'Below ₹1L' },
    ],
  },
  {
    id: 'possession_timeline',
    title: 'By when are you expecting possession?',
    info: 'This helps us plan the project timeline and align the right team for you.',
    type: 'single',
    options: [
      { value: 'ready', icon: '✅', label: 'It is already ready', desc: "You've got the keys, ready to move in" },
      { value: '6months', icon: '📅', label: 'Within 6 months', desc: 'Property booked, awaiting possession' },
      { value: 'after_6months', icon: '⏳', label: 'After 6 months', desc: 'Property not yet finalised' },
    ],
  },
  {
    id: 'floor_plan',
    title: 'Do you have a floor plan to share?',
    info: 'Sharing your floor plan helps our designer be well prepared right from the first meeting.',
    type: 'floorplan',
    // yes -> expand upload, no -> "A professional can help you create a floor plan."
  },
  {
    id: 'preferred_language',
    title: "What's your preferred language for communication?",
    info: "We'll assign a designer who speaks your preferred language.",
    type: 'single',
    options: [
      { value: 'english', icon: 'Ab', label: 'English' },
      { value: 'hindi', icon: 'अ', label: 'Hindi' },
      { value: 'marathi', icon: 'म', label: 'Marathi' },
      { value: 'other', icon: '🌐', label: 'Other' },
    ],
  },
  {
    id: 'consultation_mode',
    title: 'What would be your preferred mode of consultation?',
    info: 'We recommend a site visit to experience the space. If not, we can connect virtually.',
    type: 'single',
    banner: 'We recommend a site visit for the most accurate estimate.',
    options: [
      { value: 'site_visit', icon: '📍', label: 'Site Visit', desc: 'We come to your home and meet in person', recommended: true },
      { value: 'virtual', icon: '💻', label: 'Virtual', desc: 'Video call with our designer' },
    ],
  },
  {
    id: 'schedule',
    title: 'When do you want to connect with our designer?',
    info: "Let us know and we'll plan the meeting as per your convenience.",
    type: 'schedule',
    timeSlots: ['10:00 AM – 12:00 PM', '1:00 PM – 3:00 PM', '4:00 PM – 6:00 PM', '7:00 PM – 8:00 PM'],
  },
  {
    id: 'contact',
    title: 'Your estimate is almost ready!',
    info: 'Enter your details to see your personalised budget range.',
    type: 'contact',
  },
]

// ==== Estimate calculator ====
// Base price by BHK (Essential package): min and max in rupees.
const BHK_BASE = {
  '1BHK':  { min: 350000,  max: 500000  },
  '2BHK':  { min: 700000,  max: 1000000 },
  '3BHK':  { min: 1200000, max: 1800000 },
  '4BHK':  { min: 1800000, max: 2800000 },
  '5BHK+': { min: 2800000, max: 4500000 },
}

// Package multiplier applied to base BHK price.
const PACKAGE_MULT = { essential: 1, premium: 1.5, luxe: 2.2 }

// Add-on cost per selected scope item (beyond standard rooms).
const SCOPE_ADDONS = {
  false_ceiling:  80000,
  modular_kitchen: 120000,
  wardrobe:        60000,
  wall_panelling:  50000,
  painting:        40000,
  tv_unit:         35000,
}

// Derive package tier from budget range. Higher budgets => luxe/premium.
function packageFromBudget(budget) {
  if (['30L+', '25-30L', '20-25L'].includes(budget)) return 'luxe'
  if (['15-20L', '10-15L', '8-10L'].includes(budget)) return 'premium'
  return 'essential'
}

/**
 * Given the full quiz answers object, return {min, max, packageTier}
 * in whole rupees. Used by the results screen and stored in DB.
 */
export function calculateEstimate(answers) {
  const bhk = answers.bhk_type || '2BHK'
  const base = BHK_BASE[bhk] || BHK_BASE['2BHK']
  const tier = packageFromBudget(answers.budget_range)
  const mult = PACKAGE_MULT[tier] || 1

  let min = Math.round(base.min * mult)
  let max = Math.round(base.max * mult)

  const scope = Array.isArray(answers.scope_items) ? answers.scope_items : []
  scope.forEach((s) => {
    const add = SCOPE_ADDONS[s]
    if (add) { min += add; max += add }
  })

  return { min, max, packageTier: tier }
}

// Helper to format rupees as ₹XL / ₹XLakhs display
export function formatLakh(rupees) {
  const lakhs = rupees / 100000
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(1)}Cr`
  if (lakhs >= 10) return `₹${Math.round(lakhs)}L`
  return `₹${lakhs.toFixed(1)}L`
}
