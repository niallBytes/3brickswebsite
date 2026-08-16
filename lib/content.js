
// =============================================================================
// 3 Bricks — Central Content File
// Everything the business owner might want to change lives HERE.
// Update phone / email / prices / testimonials / areas / categories in this file
// and the whole website updates automatically. No component edits required.
// =============================================================================

export const BRAND = {
  name: '3 Bricks',
  tagline: 'Interior Designers & Architects. Pune.',
  phone: '+91 95452 50565',
  phoneRaw: '919545250565',
  phoneTel: '+919545250565',
  email: 'hello@3bricksinteriors.com',
  address: 'Office No. 404, 4th Floor, 1MG Road, beside George Restaurant, Hulshur, Camp, Pune, Maharashtra 411001',
  addressShort: '1MG Road, Camp, Pune',
  mapsUrl: 'https://maps.google.com/?daddr=Office+No.404,+4th+Floor,+1MG+Road,+beside+George+Restaurant,+Hulshur,+Camp,+Pune,+Maharashtra+411001',
  mapsEmbed: 'https://maps.google.com/maps?q=Office+No.404,+4th+Floor,+1MG+Road,+beside+George+Restaurant,+Camp,+Pune,+Maharashtra+411001&output=embed',
  whatsappMsg: "Hi, I'm interested in interior design for my home in Pune.",
  whatsappLink: 'https://wa.me/919545250565?text=' + encodeURIComponent("Hi, I'm interested in interior design for my home in Pune."),
  logoText: { first: '3', accent: 'Bricks' },
  socials: {
    instagram: 'https://www.instagram.com/3bricksinteriors/',
    instagramHandle: '@3bricksinteriors',
    facebook: 'https://facebook.com/3bricksinteriors',
    youtube: 'https://youtube.com/@3bricksinteriors',
    linkedin: 'https://linkedin.com/company/3bricksinteriors',
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
    hook: "Baner's growing families choose 3 Bricks for on-time delivery and honest pricing.",
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
    hook: 'Wakad IT professionals rely on 3 Bricks for modular kitchens and on-time delivery.',
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
    hook: "Kharadi's Godrej and Magarpatta owners partner with 3 Bricks for elegant, editorial interiors.",
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
    hook: "Hinjewadi's IT corridor chooses 3 Bricks for practical, warm homes delivered on time.",
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
    hook: 'Viman Nagar homeowners get personal, refined interior design with 3 Bricks.',
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
    hook: "Balewadi's growing residential belt trusts 3 Bricks for warm, on-time interiors.",
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
    hook: 'Undri families choose 3 Bricks for practical, value-first interior design.',
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
    hook: 'Magarpatta and Amanora residents love 3 Bricks for on-time, honest interior design.',
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
    hook: "Aundh's premium high-rises trust 3 Bricks for editorial, warm interiors delivered on time.",
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
    hook: "Koregaon Park's boutique clientele picks 3 Bricks for personal, luxurious interior design.",
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
    hook: "Magarpatta City families choose 3 Bricks for warm, on-time interior design.",
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
    hook: "Kalyani Nagar homeowners rely on 3 Bricks for elegant, thoughtful interior design.",
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
    hook: 'Pashan\u2019s IT and academic families choose 3 Bricks for practical, warm interior design.',
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
    hook: "Pimple Saudagar's growing residential belt trusts 3 Bricks for on-time, honest home interiors.",
    points: [
      'Popular with young Pune families',
      'Value-first Essential and Signature packages',
      'Local carpentry team \u2014 faster delivery',
      'Free site visit anywhere in Pimple Saudagar',
    ],
  },
  {
  slug: 'sus-road',
  name: 'Sus Road',
  builders: ['Kolte Patil', 'Nyati Group', 'Rohan Builders'],
  hook: 'Sus Road homeowners choose 3 Bricks for on-time, personal interior design.',
  points: [
    'Experienced in Sus Road and Pashan belt projects',
    'Free site visit at your Sus Road home',
    'On-time delivery guarantee',
    'One dedicated designer throughout',
  ],
},
{
  slug: 'nibm-road',
  name: 'NIBM Road',
  builders: ['Nyati Group', 'Kolte Patil', 'Puraniks'],
  hook: 'NIBM Road homeowners trust 3 Bricks for transparent, on-time interior design.',
  points: [
    'Experienced in NIBM Road and Kondhwa area projects',
    'Free site visit at your NIBM Road home',
    'On-time delivery guarantee',
    'One dedicated designer throughout',
  ],
},
]

// Design Ideas categories — used for mega menu, hub page, and dynamic category pages
// Each category has a slug (URL), name, icon, hero image, and a set of gallery images.
export const DESIGN_CATEGORIES = [
  { slug: 'modular-kitchen', name: 'Modular Kitchen Designs', short: 'Modular Kitchens', intro: 'Modular kitchens tailored for Pune apartments — L-shape, straight, U-shape and parallel layouts that fit how you cook.', hero: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=80', imgs: ['1484154218962-a197022b5858', '1602028915047-37269d1a73f7', '1622372738946-62e02505feb3', '1588854337236-6889d631faa8', '1600684388091-627109f3cd60', '1601760561441-16420502c7e0', '1502005097973-6a7082348e28', '1586208958839-06c17cacdf08', '1682662045846-77f6e1ce55b4', '1538944570562-2c9cb7857097', '1635321350281-e2a91ecffd00', '1588854337115-1c67d9247e4d', '1571843439991-dd2b8e051966', '1755771984341-546c2a04f236', '1721522281546-977a5d878fec', '1668642244016-bcc611e3139f'] },
  { slug: 'wardrobe', name: 'Wardrobe Designs', short: 'Wardrobes', intro: 'Modular wardrobes that maximise storage in compact Pune bedrooms — sliding, hinged, walk-in.', hero: 'https://images.unsplash.com/photo-1672137233327-37b0c1049e77?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', imgs: ['1649361811423-a55616f7ab11', '1643949914877-b20f30792c1e', '1611048268330-53de574cae3b', '1708397016786-8916880649b8', '1631889993877-71e193bf79b8', '1662454419622-a41092ecd245', '1722349674028-a148f4364e43', '1631048499455-4f9e26f23b9f', '1530411554903-7e745b9f1f6d', '1738229115082-b5647ffb3503', '1721742604452-87a1daf6f5c4', '1737898422812-54c83e3811ff', '1765766600589-ddad380d6534', '1774301211236-dab64d553241', '1778731660303-1fa5ede75477'] },
  { slug: 'living-room', name: 'Living Room Designs', short: 'Living Rooms', intro: 'Warm, editorial living rooms designed for how families in Pune actually live and entertain.', hero: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80', imgs: ['1583847268964-b28dc8f51f92', '1631679706909-1844bbd07221', '1618220179428-22790b461013', '1616047006789-b7af5afb8c20', '1598928506311-c55ded91a20c', '1564078516393-cf04bd966897', '1632829882891-5047ccc421bc', '1615800002234-05c4d488696c', '1560448204-e02f11c3d0e2', '1554995207-c18c203602cb', '1600121848594-d8644e57abab', '1560185007-cde436f6a4d0', '1633505899118-4ca6bd143043', '1600494448850-6013c64ba722'] },
  { slug: 'master-bedroom', name: 'Master Bedroom Designs', short: 'Master Bedrooms', intro: 'Restful master bedrooms with smart storage and warm lighting — designed for real Pune apartments.', hero: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80', imgs: ['1616594039964-ae9021a400a0', '1560185893-a55cbc8c57e8', '1616486029423-aaa4789e8c9a', '1598928636135-d146006ff4be', '1562438668-bcf0ca6578f0', '1595526051245-4506e0005bd0', '1578683010236-d716f9a3f461', '1560448205-4d9b3e6bb6db', '1521783988139-89397d761dce', '1611048268428-c7dddc465ee7', '1758448755969-8791367cf5c5', '1765279333918-949ddcb655ba', '1772563214602-3c6434766700', '1784653549308-e69b05d0ef82', '1768487422639-7ba3900d0f02'] },
  { slug: 'false-ceiling', name: 'False Ceiling Designs', short: 'False Ceilings', intro: 'False ceiling designs that work for typical 9–10 ft Pune apartments — tray, coffered, cove and minimal.', hero: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&w=1600&q=80', imgs: ['1627383838166-6e697cd673c3', '1582203423341-64b918240e25', '1746439307632-cba0f8effbed', '1705909944158-5325de9bb3a7', '1660492039236-4e660d5a1a14', '1731922422051-e2a6e90ca718', '1613908141043-8f7241569066', '1694658459782-af318c6264c4', '1730166890479-25abed996fc8', '1750420556288-d0e32a6f517b', '1679121877287-0dbb1d68f44c', '1659500700617-f24938613e1b', '1758639351463-d345439f6850', '1785232273548-4beae5334903', '1646120706933-e8823da0d823'] },
  { slug: 'tv-unit', name: 'TV Unit Designs', short: 'TV Units', intro: 'Wall-mounted, floating and full-wall TV units designed for Pune living rooms.', hero: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1600&q=80', imgs: ['1567690187548-f07b1d7bf5a9', '1743435009576-1beabc1043bd', '1761330439671-a7f20c285c5e', '1584280795027-321f4d68e77b', '1720247520881-672bc136da8a', '1774716925888-190de2471de2', '1586024486164-ce9b3d87e09f', '1548780364-65517933892b', '1558888401-3cc1de77652d', '1633604712918-6ab1173d0ecd', '1634045924031-98026a4557c4', '1663811397219-c572550dffc5', '1667510436110-79d3dabc2008', '1724582586470-85422853ad61', '1745429523637-60f5986cc1db'] },
  { slug: 'bathroom', name: 'Bathroom Designs', short: 'Bathrooms', intro: 'Compact, luxurious bathroom designs for Pune apartments — with practical storage and premium finishes.', hero: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80', imgs: ['1584622650111-993a426fbf0a', '1631889993959-41b4e9c6e3c5', '1620626011761-996317b8d101', '1507652313519-d4e9174996dd', '1661107259637-4e1c55462428', '1643949719317-4342d8d4031e', '1629079447777-1e605162dc8d', '1576698483491-8c43f0862543', '1733426107854-ee00a25d72a7', '1600488999585-e4364713b90a', '1521783593447-5702b9bfd267', '1650894622076-e09ab837c502', '1631048499052-e6d9f305d2c0', '1638799869566-b17fa794c4de', '1644421439741-712c7fde7e95'] },
  { slug: 'balcony', name: 'Balcony Designs', short: 'Balconies', intro: 'Cosy Pune balcony makeovers — planter walls, deck flooring, comfortable seating.', hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80', imgs: ['1776363116182-51694a04a1d5', '1758988736359-2cfd8bc6929c', '1774685110793-e427dfa87467', '1777578443991-247f584159f5', '1616593969747-4797dc75033e', '1524549207884-e7d1130ae2f3', '1486484290742-0ce4eb743a34', '1621045081424-97aa08903f76', '1613013441633-785518cf90b3', '1537289865689-48454e64980b', '1667992403195-d2241a40ca2d', '1615880484746-a134be9a6ecf', '1590788519418-13477cec9650', '1719266084633-24981ecdc417'] },
  { slug: 'dining-room', name: 'Dining Room Designs', short: 'Dining Rooms', intro: 'Elegant dining room and dining nook designs for Pune apartments and villas.', hero: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80', imgs: ['1616486886892-ff366aa67ba4', '1617806118233-18e1de247200', '1604578762246-41134e37f9cc', '1617098709804-705581f844eb', '1505409628601-edc9af17fda6', '1602872030490-4a484a7b3ba6',
  '1615968679312-9b7ed9f04e79', '1723750290151-164cb19ebab7', '1634392885534-7655859fb2f8', '1636138388621-258a72ecb07e', '1683735669803-2cf67a3edda5', '1636138389529-d35a2a348dc1',
  '1600488999806-8efb986d87b1', '1656403002413-2ac6137237d6'] },
  { slug: 'foyer', name: 'Foyer Designs', short: 'Foyers', intro: 'Warm and welcoming foyer entryways — shoe storage, mirror walls and lighting for Pune homes.', hero: 'https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1600&q=80', imgs: ['1689263132088-c9d2233ca5b1', '1688741663046-d4b95efb3bd9', '1689307127721-bc2da981b5a6', '1648960456182-00643d5d20eb', '1630703125789-6416b14d1705', '1696158773201-b726a0ce6d6e',
  '1613618912478-8e320bec495a', '1712875652475-f91f0adbdc6a', '1585865173329-2d15a94195b1', '1652217353201-377dbed608d5', '1705209393441-508fb3a0fde2', '1774192620890-f61475279725',
  '1666880521091-704fe682c175', '1758194090785-8e09b7288199', '1611818827819-a9589c551b97'] },
  { slug: 'home-office', name: 'Home Office Designs', short: 'Home Offices', intro: 'Productive, quiet home office nooks and full rooms for Pune IT professionals working from home.', hero: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80', imgs: ['1518455027359-f3f8164ba6bd', '1600494603989-9650cf6ddd3d', '1666876644556-05f782fe49da', '1737233030536-247c1379d82c', '1614691421377-8b2c81605bf0', '1737305457553-d6427adfdc8f',
  '1651602855717-9f79c72893cc', '1737305467768-cfcbf106a535', '1737305457496-dc7503cdde1e', '1715985160276-ea5dbd92b2a8', '1646592491560-e121e097dcf2', '1646592491963-07ff7e7c31f7',
  '1609798310302-2cd56312db02', '1666876744043-ac474c8026af', '1696087225391-eb97abf5ba20'] },
  { slug: 'pooja-room', name: 'Pooja Room Designs', short: 'Pooja Rooms', intro: 'Sacred, well-lit pooja room designs — traditional and contemporary options for Pune homes.', hero: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80', imgs: ['1618220179428-22790b461013', '1618221639244-c1a8502c0eb9', '1618220252344-9cbaebb4d8f2', '1618221118493-9cfa1a1c00da', '1618221469555-7f3ad97540d6', '1616486701797-0f33f61038ec', '1616486338812-3dadae4b4ace', '1616627988079-4b5aca7b3f0a', '1615873968403-89e068629265', '1618220179428-22790b461013', '1618221639244-c1a8502c0eb9', '1618220252344-9cbaebb4d8f2', '1618221118493-9cfa1a1c00da', '1618221469555-7f3ad97540d6', '1616486701797-0f33f61038ec', '1616486338812-3dadae4b4ace'] },
  { slug: 'wall-decor', name: 'Wall Decor Ideas', short: 'Wall Decor', intro: 'Feature walls, panelling, gallery walls and more — warm ideas for Pune living rooms and bedrooms.', hero: 'https://images.unsplash.com/photo-1616486701797-0f33f61038ec?auto=format&fit=crop&w=1600&q=80', imgs: ['1534349762230-e0cadf78f5da', '1513519245088-0e12902e5a38', '1707348102631-5a4c0a6eed6f', '1634120830231-4d9dabb67e2d', '1616258417209-66c77488f9a1', '1612316704779-3ee09c51944d',
  '1652290010337-3ec7a16af624', '1770381142493-075344e6fc9b', '1562447141-a74eb07ec5cb', '1638191727024-1d286393f165', '1701421052582-9f6935aff566', '1734470793522-8a990afdcf72',
  '1656147173067-2022b4ab3cc6', '1771847572663-07ce9c200fc1', '1773291934391-41f0229765f8'] },
  { slug: 'flooring', name: 'Flooring Designs', short: 'Flooring', intro: 'Vinyl, laminate, wood, tile and marble flooring inspiration for Pune apartments.', hero: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=80', imgs: ['1581858726788-75bc0f6a952d', '1706629503586-2731f65587ae', '1585128792020-803d29415281', '1613621792067-8e28d16b735c', '1599031628962-1f6755a3b1b5', '1598718544285-7180f670198b',
  '1630699376289-b62375a35505', '1563219125-1db796e20ff2', '1600328604921-300918f36018', '1548268364-3acee266b695', '1611646586402-86f9a3fc582b', '1708540084677-dc5838b37627',
  '1600494448868-9fbd1ac2d9f5', '1566272726777-91f06285e3c9', '1560185007-cde436f6a4d0'] },
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
  { key: 'essential', label: 'Smart & Functional', name: 'Essential', price: '₹4.5L', note: 'starting', feats: ['Kitchen + Wardrobes', 'Basic lighting design', 'Standard finishes', '45–55 day delivery'] },
  { key: 'signature', label: 'Elevated & Customised', name: 'Signature', price: '₹5.8L', note: 'starting', feats: ['Everything in Essential', 'Full home 3D + moodboard', 'Premium finishes', 'Custom carpentry', 'Dedicated designer'], featured: true },
  { key: 'premium', label: 'Luxury & Bespoke', name: 'Premium', price: '₹6.8L', note: 'starting', feats: ['Everything in Signature', 'Imported hardware', 'Bespoke furniture', 'Smart home wiring', 'Site manager onsite'] },
]
