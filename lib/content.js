
// =============================================================================
// You First — Central Content File
// Everything the business owner might want to change lives HERE.
// Update phone / email / prices / testimonials / areas / categories in this file
// and the whole website updates automatically. No component edits required.
// =============================================================================

export const BRAND = {
  name: 'You First',
  tagline: 'Boutique interior design studio for Pune homeowners.',
  phone: '+91 95452 50565',
  phoneRaw: '919545250565',
  phoneTel: '+919545250565',
  email: 'hello@youfirst.design',
  address: 'Office No. 404, 4th Floor, 1MG Road, beside George Restaurant, Hulshur, Camp, Pune, Maharashtra 411001',
  addressShort: '1MG Road, Camp, Pune',
  mapsUrl: 'https://maps.google.com/?daddr=Office+No.404,+4th+Floor,+1MG+Road,+beside+George+Restaurant,+Hulshur,+Camp,+Pune,+Maharashtra+411001',
  mapsEmbed: 'https://maps.google.com/maps?q=Office+No.404,+4th+Floor,+1MG+Road,+beside+George+Restaurant,+Camp,+Pune,+Maharashtra+411001&output=embed',
  whatsappMsg: "Hi, I'm interested in interior design for my home in Pune.",
  whatsappLink: 'https://wa.me/919545250565?text=' + encodeURIComponent("Hi, I'm interested in interior design for my home in Pune."),
  logoText: { first: 'YOU', accent: 'FIRST' },
  socials: {
    instagram: 'https://www.instagram.com/_you_1st_/',
    instagramHandle: '@_you_1st_',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },
  hours: {
    weekdays: 'Monday – Saturday: 10:00 AM – 7:00 PM',
    sunday: 'Sunday: By Appointment Only',
  },
}

// Pune areas we serve — used across dropdowns, footer, area landing pages
export const AREAS = [
  'Baner', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 'Balewadi',
  'Undri', 'Hadapsar', 'Aundh', 'Koregaon Park', 'Magarpatta',
  'Kalyani Nagar', 'Pashan', 'Pimple Saudagar', 'Sus Road', 'NIBM Road', 'Other'
]

// Only these areas get a dedicated landing page at /interior-designer-<slug>-pune
export const AREA_PAGES = [
  {
    slug: 'baner',
    name: 'Baner',
    builders: ['Kolte Patil', 'Bramha Corp', 'Rohan Builders', 'Paranjape Schemes'],
    hook: "Baner's growing families choose You First for on-time delivery and honest pricing.",
    points: [
      'Trusted by 40+ families in Baner high-rises',
      'Familiar with Kolte Patil, Bramha, Rohan floor plans',
      'Local vendors mean faster execution',
      'Weekend site visits available',
    ],
  },
  {
    slug: 'wakad',
    name: 'Wakad',
    builders: ['Pride World City', 'Kolte Patil', 'Balaji Symphony', 'Rohan Abhilasha'],
    hook: 'Wakad IT professionals rely on You First for modular kitchens and on-time delivery.',
    points: [
      'Popular with IT couples and young families',
      'Compact 2BHK modular kitchen specialists',
      'Warranty-backed carpentry and finishes',
      'Free 3D render in 7 days',
    ],
  },
  {
    slug: 'kharadi',
    name: 'Kharadi',
    builders: ['Godrej', 'Magarpatta City', 'Panchshil', 'Kolte Patil'],
    hook: "Kharadi's Godrej and Magarpatta owners partner with You First for elegant, editorial interiors.",
    points: [
      'Experienced in Godrej Rejuve and Panchshil towers',
      'Japandi and contemporary style specialists',
      'Dedicated designer, no rotating juniors',
      'On-site project supervisor',
    ],
  },
  {
    slug: 'hinjewadi',
    name: 'Hinjewadi',
    builders: ['Shapoorji Pallonji', 'Pride Purple', 'Xrbia', 'Kolte Patil Life Republic'],
    hook: "Hinjewadi's IT corridor chooses You First for practical, warm homes delivered on time.",
    points: [
      'Trusted by IT professionals in Hinjewadi phase 1, 2, 3',
      'Familiar with Shapoorji, Life Republic, Xrbia floor plans',
      'Fast turnaround for possession-ready flats',
      'Weekend and evening consultations',
    ],
  },
  {
    slug: 'viman-nagar',
    name: 'Viman Nagar',
    builders: ['Kolte Patil', 'Nyati Group', 'Marvel Realtors', 'Panchshil'],
    hook: 'Viman Nagar homeowners get personal, refined interior design with You First.',
    points: [
      '10 minutes from Pune airport',
      'Popular with NRI clients returning to Pune',
      'Luxury finishes and imported hardware available',
      'Warranty on carpentry and modular units',
    ],
  },
  {
    slug: 'balewadi',
    name: 'Balewadi',
    builders: ['Kumar Properties', 'Kolte Patil', 'Nyati', 'Godrej'],
    hook: "Balewadi's growing residential belt trusts You First for warm, on-time interiors.",
    points: [
      'Local team based near Balewadi high street',
      'Experienced with High Street 2 and Nyati Skyland',
      'Modular kitchen + wardrobe combo packages',
      'Weekend consultations available',
    ],
  },
  {
    slug: 'undri',
    name: 'Undri',
    builders: ['Nyati Group', 'Puraniks', 'Kolte Patil'],
    hook: 'Undri families choose You First for practical, value-first interior design.',
    points: [
      'Budget-friendly Essential and Signature packages',
      'Familiar with Nyati Elysia and Puraniks projects',
      'Local carpentry team, faster delivery',
      'Free site visit anywhere in Undri',
    ],
  },
  {
    slug: 'hadapsar',
    name: 'Hadapsar',
    builders: ['Magarpatta City', 'Amanora', 'Kumar Properties'],
    hook: 'Magarpatta and Amanora residents love You First for on-time, honest interior design.',
    points: [
      'Experienced in Magarpatta and Amanora towers',
      'Full-home 3D renders in 7 days',
      'Weekly photo updates during execution',
      'Warranty on modular units and carpentry',
    ],
  },
  {
    slug: 'aundh',
    name: 'Aundh',
    builders: ['Rohan Builders', 'Kolte Patil', 'Marvel Realtors', 'Kumar Properties'],
    hook: "Aundh's premium high-rises trust You First for editorial, warm interiors delivered on time.",
    points: [
      'Popular with families and long-term Pune residents',
      'Experienced with Rohan Ipsita and similar towers',
      'Classic and contemporary styles both handled',
      'Weekend consultations available',
    ],
  },
  {
    slug: 'koregaon-park',
    name: 'Koregaon Park',
    builders: ['Panchshil', 'Marvel Realtors', 'Kolte Patil'],
    hook: "Koregaon Park's boutique clientele picks You First for personal, luxurious interior design.",
    points: [
      'Luxury finishes and imported hardware available',
      'Discreet, respectful project management',
      'Fluent English + Hindi + Marathi designers',
      'Bespoke carpentry and lighting design',
    ],
  },
  {
    slug: 'magarpatta',
    name: 'Magarpatta',
    builders: ['Magarpatta City', 'Amanora'],
    hook: "Magarpatta City families choose You First for warm, on-time interior design.",
    points: [
      'Experienced with all Magarpatta towers and layouts',
      'Family-friendly, durable finishes',
      'Weekend site visits available',
      'Full-home 3D renders in 7 days',
    ],
  },
  {
    slug: 'kalyani-nagar',
    name: 'Kalyani Nagar',
    builders: ['Marvel Realtors', 'Kolte Patil', 'Panchshil'],
    hook: "Kalyani Nagar homeowners rely on You First for elegant, thoughtful interior design.",
    points: [
      'Trusted by NRI clients and professionals',
      'Luxury and premium package specialists',
      'Warranty on modular units and carpentry',
      'Dedicated designer, no rotating juniors',
    ],
  },
  {
    slug: 'pashan',
    name: 'Pashan',
    builders: ['Kolte Patil', 'Nyati Group', 'Rohan Builders'],
    hook: 'Pashan\u2019s IT and academic families choose You First for practical, warm interior design.',
    points: [
      'Convenient for Pashan\u2013Sus and NCL area residents',
      'Compact 2BHK and 3BHK expertise',
      'On-time delivery guarantee',
      'Warranty-backed carpentry and finishes',
    ],
  },
  {
    slug: 'pimple-saudagar',
    name: 'Pimple Saudagar',
    builders: ['Kolte Patil', 'Rohan Builders', 'Pride Purple', 'Kumar Properties'],
    hook: "Pimple Saudagar's growing residential belt trusts You First for on-time, honest home interiors.",
    points: [
      'Popular with young Pune families',
      'Value-first Essential and Signature packages',
      'Local carpentry team \u2014 faster delivery',
      'Free site visit anywhere in Pimple Saudagar',
    ],
  },
]

// Design Ideas categories — used for mega menu, hub page, and dynamic category pages
// Each category has a slug (URL), name, icon, hero image, and a set of gallery images.
export const DESIGN_CATEGORIES = [
  { slug: 'modular-kitchen', name: 'Modular Kitchen Designs', short: 'Modular Kitchens', intro: 'Modular kitchens tailored for Pune apartments — L-shape, straight, U-shape and parallel layouts that fit how you cook.', hero: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=80', imgs: ['1600489000022-c2086d79f9d4', '1556909114-f6e7ad7d3136', '1622372738946-62e02505feb3', '1590487988256-9ed24133863e', '1600585154340-be6161a56a0c', '1600607687939-ce8a6c25118c', '1600566753190-17f0baa2a6c8', '1556909195-b1f65b1a4074', '1616486338812-3dadae4b4ace', '1584622650111-993a426fbf0a', '1583847268964-b28dc8f51f92', '1618221639244-c1a8502c0eb9', '1586023492125-27b2c045efd7', '1600607687920-4e2a09cf159d', '1600585152220-90363fe7e115', '1560448204-e02f11c3d0e2'] },
  { slug: 'wardrobe', name: 'Wardrobe Designs', short: 'Wardrobes', intro: 'Modular wardrobes that maximise storage in compact Pune bedrooms — sliding, hinged, walk-in.', hero: 'https://images.unsplash.com/photo-1616627052149-22c4f8a6316e?auto=format&fit=crop&w=1600&q=80', imgs: ['1616627052149-22c4f8a6316e', '1615873968403-89e068629265', '1618221469555-7f3ad97540d6', '1616486338812-3dadae4b4ace', '1615874959474-d609969a20ed', '1590725140246-20acdee442be', '1616627988079-4b5aca7b3f0a', '1615529182904-14819c35db37', '1616486701797-0f33f61038ec', '1616627988079-4b5aca7b3f0a', '1615873968403-89e068629265', '1616486338812-3dadae4b4ace', '1616486701797-0f33f61038ec', '1615874959474-d609969a20ed', '1618220179428-22790b461013', '1590725140246-20acdee442be'] },
  { slug: 'living-room', name: 'Living Room Designs', short: 'Living Rooms', intro: 'Warm, editorial living rooms designed for how families in Pune actually live and entertain.', hero: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80', imgs: ['1618221195710-dd6b41faaea6', '1583847268964-b28dc8f51f92', '1616047006789-b7af5afb8c20', '1631679706909-1844bbd07221', '1586023492125-27b2c045efd7', '1493663284031-b7e3aefcae8e', '1567767292278-a4f21aa2d36e', '1618220179428-22790b461013', '1616486701797-0f33f61038ec', '1616486338812-3dadae4b4ace', '1560448204-e02f11c3d0e2', '1616627988079-4b5aca7b3f0a', '1600607687939-ce8a6c25118c', '1560185127-6ed189bf02f4', '1560185893-a55cbc8c57e8', '1600607687920-4e2a09cf159d'] },
  { slug: 'master-bedroom', name: 'Master Bedroom Designs', short: 'Master Bedrooms', intro: 'Restful master bedrooms with smart storage and warm lighting — designed for real Pune apartments.', hero: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80', imgs: ['1615874959474-d609969a20ed', '1616627052149-22c4f8a6316e', '1616486701797-0f33f61038ec', '1615529182904-14819c35db37', '1616486338812-3dadae4b4ace', '1618221469555-7f3ad97540d6', '1616627988079-4b5aca7b3f0a', '1590725140246-20acdee442be', '1615873968403-89e068629265', '1611145367651-6303b0b2b7f9', '1618220252344-9cbaebb4d8f2', '1618221469555-7f3ad97540d6', '1616486701797-0f33f61038ec', '1615874959474-d609969a20ed', '1616627988079-4b5aca7b3f0a', '1590725140246-20acdee442be'] },
  { slug: 'false-ceiling', name: 'False Ceiling Designs', short: 'False Ceilings', intro: 'False ceiling designs that work for typical 9–10 ft Pune apartments — tray, coffered, cove and minimal.', hero: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&w=1600&q=80', imgs: ['1618221118493-9cfa1a1c00da', '1618220179428-22790b461013', '1618221469555-7f3ad97540d6', '1618221118493-9cfa1a1c00da', '1618220252344-9cbaebb4d8f2', '1618221639244-c1a8502c0eb9', '1618221118493-9cfa1a1c00da', '1618220252344-9cbaebb4d8f2', '1618221469555-7f3ad97540d6', '1618220179428-22790b461013', '1618221639244-c1a8502c0eb9', '1618221118493-9cfa1a1c00da', '1618220179428-22790b461013', '1618220252344-9cbaebb4d8f2', '1618221469555-7f3ad97540d6', '1618221639244-c1a8502c0eb9'] },
  { slug: 'tv-unit', name: 'TV Unit Designs', short: 'TV Units', intro: 'Wall-mounted, floating and full-wall TV units designed for Pune living rooms.', hero: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1600&q=80', imgs: ['1567767292278-a4f21aa2d36e', '1560185127-6ed189bf02f4', '1560185893-a55cbc8c57e8', '1600607687920-4e2a09cf159d', '1560448204-e02f11c3d0e2', '1616627988079-4b5aca7b3f0a', '1600607687939-ce8a6c25118c', '1493663284031-b7e3aefcae8e', '1618221195710-dd6b41faaea6', '1583847268964-b28dc8f51f92', '1616047006789-b7af5afb8c20', '1631679706909-1844bbd07221', '1586023492125-27b2c045efd7', '1618220179428-22790b461013', '1616486701797-0f33f61038ec', '1616486338812-3dadae4b4ace'] },
  { slug: 'bathroom', name: 'Bathroom Designs', short: 'Bathrooms', intro: 'Compact, luxurious bathroom designs for Pune apartments — with practical storage and premium finishes.', hero: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80', imgs: ['1552321554-5fefe8c9ef14', '1600566753086-00f18fe6ba3d', '1552321554-5fefe8c9ef14', '1584622650111-993a426fbf0a', '1600566753086-00f18fe6ba3d', '1552321554-5fefe8c9ef14', '1584622650111-993a426fbf0a', '1600566753086-00f18fe6ba3d', '1552321554-5fefe8c9ef14', '1584622650111-993a426fbf0a', '1600566753086-00f18fe6ba3d', '1552321554-5fefe8c9ef14', '1584622650111-993a426fbf0a', '1600566753086-00f18fe6ba3d', '1552321554-5fefe8c9ef14', '1584622650111-993a426fbf0a'] },
  { slug: 'balcony', name: 'Balcony Designs', short: 'Balconies', intro: 'Cosy Pune balcony makeovers — planter walls, deck flooring, comfortable seating.', hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80', imgs: ['1600585154526-990dced4db0d', '1600585154340-be6161a56a0c', '1600607687920-4e2a09cf159d', '1560448204-e02f11c3d0e2', '1600585152220-90363fe7e115', '1600607687939-ce8a6c25118c', '1560185893-a55cbc8c57e8', '1560185127-6ed189bf02f4', '1567767292278-a4f21aa2d36e', '1600585154340-be6161a56a0c', '1600607687920-4e2a09cf159d', '1560448204-e02f11c3d0e2', '1600585152220-90363fe7e115', '1600607687939-ce8a6c25118c', '1560185893-a55cbc8c57e8', '1560185127-6ed189bf02f4'] },
  { slug: 'dining-room', name: 'Dining Room Designs', short: 'Dining Rooms', intro: 'Elegant dining room and dining nook designs for Pune apartments and villas.', hero: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80', imgs: ['1617806118233-18e1de247200', '1617228069096-4638a7ffc906', '1618221639244-c1a8502c0eb9', '1600585154340-be6161a56a0c', '1600607687920-4e2a09cf159d', '1493663284031-b7e3aefcae8e', '1618221195710-dd6b41faaea6', '1583847268964-b28dc8f51f92', '1616047006789-b7af5afb8c20', '1631679706909-1844bbd07221', '1586023492125-27b2c045efd7', '1617806118233-18e1de247200', '1617228069096-4638a7ffc906', '1618221639244-c1a8502c0eb9', '1600585154340-be6161a56a0c', '1600607687920-4e2a09cf159d'] },
  { slug: 'foyer', name: 'Foyer Designs', short: 'Foyers', intro: 'Warm and welcoming foyer entryways — shoe storage, mirror walls and lighting for Pune homes.', hero: 'https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1600&q=80', imgs: ['1618221469555-7f3ad97540d6', '1618220179428-22790b461013', '1618220252344-9cbaebb4d8f2', '1618221118493-9cfa1a1c00da', '1618221639244-c1a8502c0eb9', '1616486701797-0f33f61038ec', '1616486338812-3dadae4b4ace', '1616627988079-4b5aca7b3f0a', '1615873968403-89e068629265', '1590725140246-20acdee442be', '1616627052149-22c4f8a6316e', '1618221469555-7f3ad97540d6', '1618220179428-22790b461013', '1618220252344-9cbaebb4d8f2', '1618221118493-9cfa1a1c00da', '1618221639244-c1a8502c0eb9'] },
  { slug: 'home-office', name: 'Home Office Designs', short: 'Home Offices', intro: 'Productive, quiet home office nooks and full rooms for Pune IT professionals working from home.', hero: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80', imgs: ['1497366811353-6870744d04b2', '1497366216548-37526070297c', '1524758631624-e2822e304c36', '1497215728101-856f4ea42174', '1497366754035-f200968a6e72', '1500673922987-e212871fec22', '1524758631624-e2822e304c36', '1497215728101-856f4ea42174', '1497366754035-f200968a6e72', '1500673922987-e212871fec22', '1497366811353-6870744d04b2', '1497366216548-37526070297c', '1524758631624-e2822e304c36', '1497215728101-856f4ea42174', '1497366754035-f200968a6e72', '1500673922987-e212871fec22'] },
  { slug: 'pooja-room', name: 'Pooja Room Designs', short: 'Pooja Rooms', intro: 'Sacred, well-lit pooja room designs — traditional and contemporary options for Pune homes.', hero: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80', imgs: ['1618220179428-22790b461013', '1618221639244-c1a8502c0eb9', '1618220252344-9cbaebb4d8f2', '1618221118493-9cfa1a1c00da', '1618221469555-7f3ad97540d6', '1616486701797-0f33f61038ec', '1616486338812-3dadae4b4ace', '1616627988079-4b5aca7b3f0a', '1615873968403-89e068629265', '1618220179428-22790b461013', '1618221639244-c1a8502c0eb9', '1618220252344-9cbaebb4d8f2', '1618221118493-9cfa1a1c00da', '1618221469555-7f3ad97540d6', '1616486701797-0f33f61038ec', '1616486338812-3dadae4b4ace'] },
  { slug: 'wall-decor', name: 'Wall Decor Ideas', short: 'Wall Decor', intro: 'Feature walls, panelling, gallery walls and more — warm ideas for Pune living rooms and bedrooms.', hero: 'https://images.unsplash.com/photo-1616486701797-0f33f61038ec?auto=format&fit=crop&w=1600&q=80', imgs: ['1616486701797-0f33f61038ec', '1616486338812-3dadae4b4ace', '1618221469555-7f3ad97540d6', '1618221118493-9cfa1a1c00da', '1618220179428-22790b461013', '1618220252344-9cbaebb4d8f2', '1616627988079-4b5aca7b3f0a', '1615873968403-89e068629265', '1611145367651-6303b0b2b7f9', '1618220252344-9cbaebb4d8f2', '1616486701797-0f33f61038ec', '1616486338812-3dadae4b4ace', '1618221469555-7f3ad97540d6', '1618221118493-9cfa1a1c00da', '1618220179428-22790b461013', '1618220252344-9cbaebb4d8f2'] },
  { slug: 'flooring', name: 'Flooring Designs', short: 'Flooring', intro: 'Vinyl, laminate, wood, tile and marble flooring inspiration for Pune apartments.', hero: 'https://images.unsplash.com/photo-1600607687644-c7f34b6b1feb?auto=format&fit=crop&w=1600&q=80', imgs: ['1600607687644-c7f34b6b1feb', '1600607687920-4e2a09cf159d', '1600607687939-ce8a6c25118c', '1560448204-e02f11c3d0e2', '1560185127-6ed189bf02f4', '1560185893-a55cbc8c57e8', '1567767292278-a4f21aa2d36e', '1618220179428-22790b461013', '1618221469555-7f3ad97540d6', '1600607687644-c7f34b6b1feb', '1600607687920-4e2a09cf159d', '1600607687939-ce8a6c25118c', '1560448204-e02f11c3d0e2', '1560185127-6ed189bf02f4', '1560185893-a55cbc8c57e8', '1567767292278-a4f21aa2d36e'] },
]

// Helper to convert Unsplash short id to full URL
export const unsplash = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// Blog posts — content lives here as MDX-style structured JSON.
// Each post: slug, title, category, excerpt, image, readTime, publishedAt, sections[]
// Sections types: h2, h3, p (paragraph), img, table, cta
export const BLOG_POSTS = [
  {
    slug: '2bhk-interior-design-cost-pune-2025',
    title: '2BHK Interior Design Cost in Pune 2025 — Complete Guide',
    category: 'Cost Guides',
    excerpt: 'Everything you need to know about pricing your 2BHK interior design in Pune — with room-wise breakdowns and package comparisons.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    readTime: 8,
    publishedAt: '2025-06-01',
    sections: [
      { type: 'p', text: 'If you just got possession of a 2BHK in Pune — be it Baner, Wakad, Kharadi or Hinjewadi — the first question that hits you is: how much will this cost? Here is a transparent, area-by-area guide to what a 2BHK interior design project actually costs in Pune in 2025.' },
      { type: 'h2', text: 'The short answer — average cost' },
      { type: 'p', text: 'A well-designed 2BHK in Pune ranges anywhere from ₹8L to ₹18L depending on the level of finish, materials and how much civil work is needed. Most families end up between ₹9L and ₹12L for a beautiful, on-time job.' },
      { type: 'h2', text: 'Cost breakdown by room' },
      { type: 'h3', text: 'Living Room — ₹1.8L to ₹3.5L' },
      { type: 'p', text: 'Includes TV unit, sofa, coffee table, false ceiling, painting, curtains and lighting. Feature wall and panelling adds ₹50,000–₹70,000.' },
      { type: 'h3', text: 'Kitchen — ₹2.5L to ₹5L' },
      { type: 'p', text: 'A quality modular kitchen with soft-close hardware, chimney provision and warranty typically starts at ₹2.5L. Add a pantry unit or tall unit and you land around ₹4–₹5L.' },
      { type: 'h3', text: 'Master Bedroom — ₹1.5L to ₹3L' },
      { type: 'p', text: 'Wardrobe (sliding or hinged), bed with storage, side tables, painting, curtains and false ceiling. Loft storage adds another ₹30,000.' },
      { type: 'h3', text: 'Second Bedroom — ₹1.2L to ₹2L' },
      { type: 'p', text: 'Slightly compact than the master. Often designed as a kids room, guest room or home office.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=80', caption: '2BHK living room in Baner — Signature package' },
      { type: 'h2', text: 'What actually affects the price?' },
      { type: 'p', text: 'Three things move the number the most: 1) Material grade (BWP plywood vs regular MDF), 2) Finish (matte laminate vs acrylic vs PU paint), 3) Civil work (breaking walls, changing plumbing, waterproofing).' },
      { type: 'h2', text: 'Essential vs Signature vs Premium' },
      { type: 'p', text: 'Essential = the basics done well: ₹7L–₹10L. Signature = premium materials + custom carpentry + dedicated designer: ₹10L–₹14L. Premium = imported hardware, bespoke everything: ₹15L+.' },
      { type: 'h2', text: 'Getting the best value in Pune' },
      { type: 'p', text: 'Insist on itemised quotes, ask for photos of similar past projects, never pay full advance, and be wary of “showroom pricing”. Get a real site visit — no serious designer prices without seeing your flat.' },
      { type: 'cta', label: 'Get a free estimate for your 2BHK →' },
    ],
  },
  {
    slug: 'japandi-vs-contemporary-pune-apartments',
    title: 'Japandi vs Contemporary — Which Style Works for Pune Apartments?',
    category: 'Design Styles',
    excerpt: 'Two of the most popular styles in Pune homes right now. Which one actually suits your flat — and your lifestyle?',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1600&q=80',
    readTime: 6,
    publishedAt: '2025-05-20',
    sections: [
      { type: 'p', text: 'Two styles dominate the Pune interior design conversation in 2025: Japandi (Japanese + Scandinavian minimalism) and Contemporary (clean lines with warm luxury). Both look stunning on Instagram — but which one actually works in a real Pune flat?' },
      { type: 'h2', text: 'What is Japandi?' },
      { type: 'p', text: 'Japandi is a marriage of Japanese wabi-sabi and Scandinavian hygge — warm woods, cream walls, low profile furniture, natural fabrics, minimal decor. It emphasises calm and space.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=1400&q=80', caption: 'Japandi living room, Kharadi' },
      { type: 'h2', text: 'What is Contemporary?' },
      { type: 'p', text: 'Contemporary uses cleaner lines, mixed materials (metal, wood, marble), warm neutrals with bolder accent walls, and slightly more visible ornamentation than Japandi.' },
      { type: 'h2', text: 'Which Pune areas prefer which?' },
      { type: 'p', text: 'Baner, Kharadi and Aundh residents lean Japandi for its calm, editorial feel. Hinjewadi, Wakad and Undri families lean contemporary for its livability and family-friendly durability.' },
      { type: 'h2', text: 'Cost difference' },
      { type: 'p', text: 'Japandi often costs 10–15% more per sqft because of the higher-grade natural finishes and custom carpentry.' },
      { type: 'cta', label: 'Not sure which style suits you? Get a free consultation →' },
    ],
  },
  {
    slug: 'modular-kitchen-designs-indian-homes',
    title: '15 Modular Kitchen Designs for Indian Homes — 2025 Ideas',
    category: 'Room Ideas',
    excerpt: 'L-shape, U-shape, parallel, island — real Pune kitchen layouts with photos, dimensions and honest costs.',
    image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=80',
    readTime: 10,
    publishedAt: '2025-05-10',
    sections: [
      { type: 'p', text: 'A modular kitchen is often the single biggest interior decision in an Indian home. Here are 15 layouts that actually work in Pune apartments, with honest costs and pros/cons for each.' },
      { type: 'h2', text: '1. Straight kitchen (₹2.5L–4L)' },
      { type: 'p', text: 'Perfect for 1BHK flats and compact 2BHKs. All appliances and cabinets along one wall. Efficient and clean.' },
      { type: 'h2', text: '2. L-shape kitchen (₹3L–5L)' },
      { type: 'p', text: 'Most popular in Pune 2BHK/3BHK. Two adjacent walls give you working triangle plus room for a small dining nook.' },
      { type: 'h2', text: '3. Parallel / Galley (₹3.5L–5.5L)' },
      { type: 'p', text: 'Two facing counters. Great for cooking-heavy families. Needs at least 6ft clearance between counters.' },
      { type: 'h2', text: '4. U-shape (₹4L–7L)' },
      { type: 'p', text: 'Three walls of storage and counter space. Only works in larger 3BHK/4BHK kitchens.' },
      { type: 'h2', text: '5. Island kitchen (₹6L–₹12L)' },
      { type: 'p', text: 'Standalone counter in the middle. Requires an open kitchen layout — more common in Kharadi and Baner villas.' },
      { type: 'cta', label: 'Get a free modular kitchen quote for your Pune home →' },
    ],
  },
  {
    slug: 'false-ceiling-designs-living-room',
    title: '12 False Ceiling Designs for Living Rooms — Ideas with Costs',
    category: 'Room Ideas',
    excerpt: 'From cove lighting to tray ceilings — 12 real ideas that work in typical 9–10ft Pune apartment ceilings.',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&w=1600&q=80',
    readTime: 7,
    publishedAt: '2025-04-28',
    sections: [
      { type: 'p', text: 'False ceilings can transform how a Pune apartment feels — but only if you pick the right style for your ceiling height. Here are 12 that actually work in most Pune flats.' },
      { type: 'h2', text: 'Peripheral cove ceiling — ₹80–₹110 per sqft' },
      { type: 'p', text: 'Only the edges are covered with a cove light strip. Feels open, adds elegance. Ideal for 9ft ceilings.' },
      { type: 'h2', text: 'Tray ceiling — ₹110–₹150 per sqft' },
      { type: 'p', text: 'Central portion recessed, feels grand. Great for 10ft+ ceilings and formal living rooms.' },
      { type: 'h2', text: 'Coffered ceiling — ₹180–₹240 per sqft' },
      { type: 'p', text: 'Grid of recessed panels. Statement-making, works best in villas.' },
      { type: 'cta', label: 'Get a false ceiling estimate for your Pune home →' },
    ],
  },
  {
    slug: 'how-to-choose-interior-designer-pune',
    title: 'How to Choose an Interior Designer in Pune — 10 Questions to Ask',
    category: 'How-To',
    excerpt: 'Red flags, honest questions and what real transparency looks like when hiring an interior designer in Pune.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
    readTime: 9,
    publishedAt: '2025-04-15',
    sections: [
      { type: 'p', text: 'Pune has hundreds of interior design firms — from big-brand players to freelance designers. Here are 10 questions that separate the ones you can trust from the ones you cannot.' },
      { type: 'h2', text: '1. Will the same designer work with me from day one to handover?' },
      { type: 'p', text: 'Big brands often rotate account managers and juniors. Ask specifically who your point of contact will be for the entire project.' },
      { type: 'h2', text: '2. Can I see 3 recent projects in my area?' },
      { type: 'p', text: 'A serious Pune designer should be able to show 3 recent (last 6 months) projects in your area — with real photos, not renders.' },
      { type: 'h2', text: '3. What is your delivery timeline — in writing?' },
      { type: 'p', text: 'Get a written timeline before signing. Ask what penalty they pay if they miss it.' },
      { type: 'h2', text: '4. Can I see an itemised quote?' },
      { type: 'p', text: 'Beware of lump-sum quotes. Every item — plywood grade, laminate brand, hardware brand, labour — should be listed.' },
      { type: 'cta', label: 'Talk to a designer who answers these clearly →' },
    ],
  },
  {
    slug: 'new-possession-flat-interior-checklist-pune',
    title: 'New Possession Flat Interior Design Checklist — Pune Edition',
    category: 'How-To',
    excerpt: 'From possession day to move-in — a step by step checklist for Pune homeowners doing interiors for the first time.',
    image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=1600&q=80',
    readTime: 8,
    publishedAt: '2025-04-01',
    sections: [
      { type: 'p', text: 'Got the keys and now feeling overwhelmed? Here is a 12-week checklist most Pune families follow — from possession day to moving in.' },
      { type: 'h2', text: 'Week 1 — Builder handover checks' },
      { type: 'p', text: 'Test every switch, tap, flush, door lock. Take photos of any snag. Do NOT sign the possession letter until the builder has closed critical snags.' },
      { type: 'h2', text: 'Week 2 — Get 3 designer quotes' },
      { type: 'p', text: 'Meet at least 3 designers. Have them come to your flat, not you to their office.' },
      { type: 'h2', text: 'Week 3–4 — Finalise design and pay 30% advance' },
      { type: 'p', text: 'Never pay more than 30% upfront. Rest should be milestone-linked.' },
      { type: 'h2', text: 'Week 5–10 — Execution' },
      { type: 'p', text: 'Expect weekly photo updates. Visit site at least once every 10 days.' },
      { type: 'h2', text: 'Week 11 — Handover walkthrough' },
      { type: 'p', text: 'Do a thorough walkthrough, prepare a snag list, hold back 5% final payment until snags are closed.' },
      { type: 'cta', label: 'Get your possession-ready 12-week plan →' },
    ],
  },
]

export const BLOG_CATEGORIES = ['All', 'Room Ideas', 'Cost Guides', 'Design Styles', 'Vastu Tips', 'How-To']

// Pricing tiers used across pricing section and quiz results
export const PRICING = [
  { key: 'essential', label: 'Studio / 1BHK', name: 'Essential', price: '₹4.5L', note: 'starting', feats: ['Kitchen + Wardrobes', 'Basic lighting design', 'Standard finishes', '45–55 day delivery'] },
  { key: 'signature', label: '2BHK', name: 'Signature', price: '₹9L', note: 'starting', feats: ['Everything in Essential', 'Full home 3D + moodboard', 'Premium finishes', 'Custom carpentry', 'Dedicated designer'], featured: true },
  { key: 'premium', label: '3BHK & above', name: 'Premium', price: '₹18L', note: 'starting', feats: ['Everything in Signature', 'Imported hardware', 'Bespoke furniture', 'Smart home wiring', 'Site manager onsite'] },
]
