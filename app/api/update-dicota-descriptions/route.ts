import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates: Record<string, string> = {

  // ── Sleeves ───────────────────────────────────────────────────────────────

  'base-xx-laptop-sleeve-13-133-black': [
    'Laptop sleeve for 13–13.3" notebooks',
    'Robust PU foam with high-quality metal zipper',
    'Elastic material adapts perfectly to the laptop',
    'Reliable protection against scratches and minor damage',
    'Lightweight and slim design',
    'Easy slip-in and out access',
    'Compatible with most 13" notebooks',
  ].join('\n'),

  'base-xx-laptop-sleeve-14-141-black': [
    'Laptop sleeve for 14–14.1" notebooks',
    'Robust PU foam with high-quality metal zipper',
    'Elastic material adapts perfectly to the laptop',
    'Reliable protection against scratches and minor damage',
    'Lightweight and slim design',
    'Easy slip-in and out access',
    'Compatible with most 14" notebooks',
  ].join('\n'),

  'dicota-perfect-skin-13-133': [
    'Neoprene sleeve for 13–13.3" notebooks',
    'Lightweight, water-repellent design',
    'Robust and elastic synthetic neoprene',
    'Perfect fit like a second skin',
    'Double protection against scratches',
    'Reliably protects against scratches and minor damage',
    'Water-repellent material for all-weather travel',
  ].join('\n'),

  'dicota-skin-base-13-141-red': [
    'Neoprene sleeve for 13–14.1" notebooks',
    'Water-repellent, lightweight design',
    'Robust elastic synthetic neoprene — fits like a second skin',
    'Zipper with inner padding to protect against scratches',
    'Ensures optimum protection against scratches and minor damage',
    'Available in four sizes and three colour variants',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'dicota-skin-base-15-156-grey': [
    'Neoprene sleeve for 15–15.6" notebooks',
    'Water-repellent, lightweight design',
    'Robust elastic synthetic neoprene — fits like a second skin',
    'Zipper with inner padding to protect against scratches',
    'Ensures optimum protection against scratches and minor damage',
    'Available in four sizes and three colour variants',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'dicota-skin-flow-13-141-anthracite-blue': [
    'Neoprene sleeve for 13–14.1" notebooks',
    'Robust highly elastic neoprene with soft nylex lining',
    'Fits your notebook like a second skin',
    'Reliably protects against scratches and minor damage',
    'Lightweight design',
    'Available in two sizes and three colours',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'dicota-skin-urban-16-anthracite': [
    'Neoprene sleeve for up to 16" notebooks',
    'Soft faux fur lining protects against dust and scratches',
    'Made of robust elastic neoprene — fits like a second skin',
    'Chic, modern design',
    'Available in four sizes and two colours',
    'Note: not compatible with Apple M1 chip MacBooks',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'dicota-smart-skin-13-133': [
    'Neoprene sleeve for 13–13.3" notebooks',
    'Front zip pocket for mobile accessories',
    'Robust elastic neoprene — fits like a second skin',
    'Soft Nylex interior lining',
    'Padded carrying handles',
    'Lightweight and slim profile',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'dicota-ultra-skin-plus-pro-13-133': [
    'Premium neoprene sleeve for 13–13.3" notebooks',
    'Double zip for mobile charging while stored',
    'Compact and particularly lightweight design',
    'Perfect fit with flexible neoprene',
    'Padded carrying handles for comfortable transport',
    'Faux fur lining protects against scratches',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'laptop-sleeve-base-13-141-grey': [
    'Neoprene sleeve for 13–14.1" notebooks',
    'Robust elastic neoprene — fits like a second skin',
    'Optimal protection against scratches and minor damage',
    'Zipper with special inner surface to prevent scratches',
    'Lightweight design',
    'Available in four sizes and three colour variations',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'laptop-sleeve-flow-13-141-anthraciteblue': [
    'Neoprene sleeve for 13–14.1" notebooks',
    'Robust highly elastic neoprene with soft nylex lining',
    'Fits like a second skin for precise protection',
    'Best protection against scratches and minor damage',
    'Feather-light design',
    'Available in two sizes and three colours',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'laptop-sleeve-perfect-13-133': [
    'Neoprene sleeve for 13–13.3" notebooks',
    'Lightweight, water-repellent design',
    'Robust elastic neoprene — adapts like a second skin',
    'Optimal protection against scratches and minor damage',
    'Zipper with extra padding to prevent scratches',
    'Lightweight design',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'laptop-sleeve-plus-pro-13-133': [
    'Premium neoprene sleeve for 13–13.3" notebooks',
    'Double zip for mobile charging while stored',
    'Ultra slim and lightweight design',
    'Perfect fit with elastic neoprene',
    'Padded carrying handles for comfortable transport',
    'Soft faux fur lining guards against scratches',
    'Flexible front pocket for accessories',
  ].join('\n'),

  'laptop-sleeve-plus-pro-14-141': [
    'Premium neoprene sleeve for 14–14.1" notebooks',
    'Double zip for mobile charging while stored',
    'Ultra slim and lightweight design',
    'Perfect fit with elastic neoprene',
    'Padded carrying handles for comfortable transport',
    'Soft faux fur lining guards against scratches',
    'Flexible front pocket for accessories',
  ].join('\n'),

  'laptop-sleeve-smart-13-133': [
    'Neoprene sleeve for 13–13.3" notebooks',
    'Zip front pocket for mobile accessories',
    'Robust elastic neoprene — fits like a second skin',
    'Soft Nylex interior lining',
    'Padded handles for comfortable carrying',
    'Lightweight and slim profile',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'laptop-sleeve-smart-14-141': [
    'Neoprene sleeve for 14–14.1" notebooks',
    'Zip front pocket for mobile accessories',
    'Robust elastic neoprene — fits like a second skin',
    'Soft Nylex interior lining',
    'Padded handles for comfortable carrying',
    'Lightweight and slim profile',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'laptop-sleeve-urban-16-anthracite': [
    'Neoprene sleeve for up to 16" notebooks',
    'Soft faux fur lining protects against dust and scratches',
    'Made of durable elastic neoprene — fits like a second skin',
    'Stylish design',
    'Available in four sizes and two colours',
    'Lightweight and slim profile',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'perfect-skin-14-141': [
    'Neoprene sleeve for 14–14.1" notebooks',
    'Lightweight, water-repellent design',
    'Robust elastic neoprene — adapts like a second skin',
    'Optimal protection against scratches and minor damage',
    'Zipper with extra padding to prevent scratches',
    'Lightweight design',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'ultra-skin-pro-13-133': [
    'Premium neoprene sleeve for 13–13.3" notebooks',
    'Double zip for mobile charging while stored',
    'Ultra slim and lightweight design',
    'Perfect fit with elastic neoprene',
    'Soft faux fur lining guards against scratches',
    'Flexible front pocket for accessories',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  // ── Slim Cases ────────────────────────────────────────────────────────────

  'base-xx-laptop-slim-case-10-125-black': [
    'Slim laptop case for 10–12.5" notebooks',
    'All-round padding with front accessory pocket',
    'Cushioned padded notebook compartment',
    'Front pocket with workstation for mobile accessories',
    'High-quality metal components',
    'Comfortable carrying handle',
    'Removable shoulder strap included',
  ].join('\n'),

  'dicota-code-slim-case-11-blue': [
    'Slim laptop case for 11–13.3" notebooks',
    'Water-repellent, padded & lockable compartment',
    'Padded lockable notebook compartment',
    'Pocket for tablets up to 10.5"',
    'Extra compartment for music devices with headphone outlet',
    'Adjustable shoulder straps',
    'Easily accessible side compartments',
  ].join('\n'),

  'dicota-slim-case-edge-10-116-red': [
    'Slim laptop case for 10–11.6" notebooks',
    'EVA foam for superior shock protection',
    'Superior shock protection for MacBook or Ultrabook',
    'Outer compartment for mobile accessories',
    'Document compartment with zipper on the back',
    'Removable shoulder strap',
    'Padded carry handles and water-repellent material',
  ].join('\n'),

  'dicota-slim-case-edge-10-116-grey': [
    'Slim laptop case for 10–11.6" notebooks',
    'EVA foam for superior shock protection',
    'Superior shock protection for MacBook or Ultrabook',
    'Outer compartment for mobile accessories',
    'Document compartment with zipper on the back',
    'Removable shoulder strap',
    'Padded carry handles and water-repellent material',
  ].join('\n'),

  'laptop-case-slim-eco-base-13-141': [
    'Eco slim laptop case for 13–14.1" notebooks',
    'Made from 4 recycled PET bottles',
    'Padded notebook compartment with high-quality metal features',
    'Front pocket with storage for mobile accessories',
    'Document compartment on the back',
    'Comfortable padded handle',
    'Removable, adjustable shoulder strap',
  ].join('\n'),

  'laptop-case-slim-eco-base-13-141-grey': [
    'Eco slim laptop case for 13–14.1" notebooks',
    'Made from 4 recycled PET bottles',
    'Padded notebook compartment with high-quality metal features',
    'Front pocket with storage for mobile accessories',
    'Document compartment on the back',
    'Comfortable padded handle',
    'Removable, adjustable shoulder strap',
  ].join('\n'),

  'laptop-case-slim-eco-base-15-156': [
    'Eco slim laptop case for 15–15.6" notebooks',
    'Made from 4.5 recycled PET bottles',
    'Padded notebook compartment with high-quality metal features',
    'Front pocket with storage for mobile accessories',
    'Document compartment on the back',
    'Comfortable padded handle',
    'Removable, adjustable shoulder strap',
  ].join('\n'),

  'laptop-case-slim-eco-pro-12-141': [
    'Eco pro slim case for 12–14.1" notebooks',
    'Memory Foam & EVA frame for maximum protection',
    'Lockable cushioned compartment with fitall & anti-slip system',
    'Cushioned pocket for tablets up to 10.5"',
    'Open document compartment on the rear',
    'Adjustable shoulder strap with anti-slip padding',
    'Comfortable carry handles made of real leather',
  ].join('\n'),

  'eco-slim-case-base-13-141-blue': [
    'Eco slim laptop case for 13–14.1" notebooks',
    'Made from 4 recycled PET bottles',
    'Padded notebook compartment with high-quality metal features',
    'Front pocket with storage for mobile accessories',
    'Document compartment on the back',
    'Comfortable padded handle',
    'Removable, adjustable shoulder strap',
  ].join('\n'),

  // ── Laptop Bags ───────────────────────────────────────────────────────────

  'dicota-eco-top-traveller-pro-12-141': [
    'Eco pro laptop bag for 12–14.1" notebooks',
    'Made from 23 recycled PET bottles',
    'Lockable cushioned compartment with Memory Foam & EVA frame',
    'EVA moulded slip pocket for tablets up to 12.9"',
    'High-quality metal features',
    'Spacious front pocket with workstation for accessories',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'dicota-eco-top-traveller-base-15-173': [
    'Eco laptop bag for 15–17.3" notebooks',
    'Made from 11 recycled PET bottles',
    'Padded notebook compartment with high-density foam (HDF)',
    'Storage space for documents',
    'Front pocket with storage for mobile accessories',
    'Suitcase fixation strap',
    'Removable, adjustable shoulder strap',
  ].join('\n'),

  'laptop-bag-eco-top-traveller-base-13-141': [
    'Eco laptop bag for 13–14.1" notebooks',
    'Made from 8 recycled PET bottles',
    'Padded notebook compartment with high-density foam (HDF)',
    'Neoprene padded handle for comfort',
    'Front pocket with storage for mobile accessories',
    'Suitcase fixation strap',
    'Removable, adjustable shoulder strap',
  ].join('\n'),

  'laptop-bag-eco-top-traveller-base-15-156': [
    'Eco laptop bag for 15–15.6" notebooks',
    'Made from 9 recycled PET bottles',
    'Padded notebook compartment with high-density foam (HDF)',
    'Neoprene padded handle for comfort',
    'Front pocket with storage for mobile accessories',
    'Suitcase fixation strap',
    'Removable, adjustable shoulder strap',
  ].join('\n'),

  'eco-multi-base-14-156': [
    'Eco multi laptop bag for 14–15.6" notebooks',
    'Made from 9 recycled PET bottles',
    'Padded notebook compartment with metal frame for extra protection',
    'Notebook security strap',
    'Document compartment on the back',
    'Front pocket with storage for mobile accessories',
    'Removable, adjustable shoulder strap',
  ].join('\n'),

  'eco-multi-base-14-156-red': [
    'Eco multi laptop bag for 14–15.6" notebooks',
    'Made from 9 recycled PET bottles',
    'Padded notebook compartment with metal frame for extra protection',
    'Notebook security strap',
    'Document compartment on the back',
    'Front pocket with storage for mobile accessories',
    'Removable, adjustable shoulder strap',
  ].join('\n'),

  'dicota-eco-multi-scale-12-141': [
    'Eco multi laptop bag for 12–14.1" notebooks',
    'Made from 8 recycled PET bottles',
    'Lockable padded laptop compartment with HDF & metal frame',
    'Slip pocket for tablets up to 12.9"',
    'Front pocket with workstation for accessories',
    'External document compartment on the back',
    'Removable padded shoulder strap',
  ].join('\n'),

  'dicota-eco-multi-pro-13-156': [
    'Eco pro multi bag for 13–15.6" notebooks',
    'Made from 11 recycled PET bottles',
    'Lockable cushioned compartment with HDF & reinforced frame',
    'Padded slip pocket for tablets up to 12.9"',
    'Front compartment with workstation for accessories',
    'Two document compartments at the rear',
    'Trolley belt and water-repellent material',
  ].join('\n'),

  // ── Backpacks ─────────────────────────────────────────────────────────────

  'backpack-spin-14-156': [
    'Laptop backpack for 14–15.6" notebooks',
    'Water-repellent, durable material with padded compartment',
    'Padded, lockable notebook compartment',
    'Tablet slot for tablets up to 10.5"',
    'Pocket for music devices with headphone outlet',
    'Easy access side pockets',
    'Adjustable shoulder straps',
  ].join('\n'),

  'dicota-backpack-eco-14-156': [
    'Eco laptop backpack for 14–15.6" notebooks',
    'Made from 5 recycled PET bottles',
    'Removable notebook bag with HDF protective padding',
    'Integrated rain cover included',
    'Ergonomic back padding made of breathable material',
    'Front pocket with key fob & accessory workstation',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'dicota-eco-backpack-scale-13-156': [
    'Eco backpack for 13–15.6" notebooks',
    'Made from 12 recycled PET bottles — 19.5L storage',
    'Lockable notebook compartment with HDF protective padding',
    'Padded compartment for tablets up to 12.9"',
    'Spacious main compartment with expandable inner pocket',
    'Ergonomic back padding with padded shoulder straps',
    'Trolley fastening strap & water-repellent material',
  ].join('\n'),

  'dicota-backpack-go-13-156-black': [
    'Active laptop backpack for 13–15.6" notebooks',
    'HDF-padded anti-theft notebook compartment in back panel',
    'Expandable main compartment with elastic mesh side pockets',
    'Ergonomic back cushioning',
    'Cushioned shoulder straps with adjustable chest belt',
    'Made from water-repellent materials',
    'Rain cover with reflective logo included',
  ].join('\n'),

  'laptop-backpack-go-13-156-light-grey': [
    'Active laptop backpack for 13–15.6" notebooks',
    'HDF-padded anti-theft notebook compartment in back panel',
    'Expandable main compartment with elastic mesh side pockets',
    'Ergonomic back cushioning',
    'Cushioned shoulder straps with adjustable chest belt',
    'Made from water-repellent materials',
    'Rain cover with reflective logo included',
  ].join('\n'),

  'dicota-backpack-move-13-156-black': [
    'Active laptop backpack for 13–15.6" notebooks',
    'YKK Quick & Easy Lock System',
    'HDF-padded notebook compartment & tablet slot up to 10.5"',
    'Side pocket for power bank to charge on the go',
    'Front adjustable straps for jackets or yoga mats',
    'Ergonomic back padding with adjustable chest strap',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'laptop-backpack-move-13-156': [
    'Active laptop backpack for 13–15.6" notebooks',
    'YKK Quick & Easy Lock System',
    'HDF-padded notebook compartment & tablet slot up to 10.5"',
    'Side pocket for power bank to charge on the go',
    'Front adjustable straps for jackets or yoga mats',
    'Ergonomic back padding with adjustable chest strap',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'laptop-backpack-move-13-156-light-grey': [
    'Active laptop backpack for 13–15.6" notebooks',
    'YKK Quick & Easy Lock System',
    'HDF-padded notebook compartment & tablet slot up to 10.5"',
    'Side pocket for power bank to charge on the go',
    'Front adjustable straps for jackets or yoga mats',
    'Ergonomic back padding with adjustable chest strap',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'dicota-backpack-universal-14-156': [
    'Universal laptop backpack for 14–15.6" notebooks',
    'Removable HDF-padded notebook sleeve',
    'Generous main compartment with document subdivisions',
    'Adjustable shoulder straps',
    'Side pockets with headphone cable outlet',
    'Front pocket with reflective strips',
    'Water-repellent for all-weather travel',
  ].join('\n'),

  'dicota-backpack-solid-grey-for-156-inch-laptop': [
    'Laptop backpack for up to 15.6" notebooks',
    'Adjustable shoulder straps with easy access side pockets',
    'Single pen loop for convenience',
    'Sky blue 210D contrast lining',
    'Front zip pocket for quick access',
    'Padded notebook compartment',
    'Durable, water-repellent material',
  ].join('\n'),

  'dicota-d31760-backpack-for-156-inch-laptop': [
    'Laptop backpack for up to 15.6" notebooks',
    'Hidden notebook compartment with surrounding padding',
    'Modern design with exciting material combination',
    'Generous expandable main compartment',
    'Practical side access to main compartment',
    'Comfortable padded shoulder straps',
    'Durable, water-repellent material',
  ].join('\n'),

  // ── Trolleys & Rollers ───────────────────────────────────────────────────

  'dicota-backpack-roller-pro-15-173': [
    'Laptop roller backpack for 15–17.3" notebooks',
    'IATA hand luggage compliant',
    'Lockable HDF-padded notebook compartment with fastening straps',
    'Padded tablet pocket up to 12.9" & RFID passport protection',
    'Intelligent inner cable routing for on-the-go charging',
    'Spacious main compartment with clothing fastening straps',
    'Front compartment with key fob & accessory pockets',
  ].join('\n'),

  'dicota-cabin-roller-pro-14-156': [
    'Laptop cabin roller for 14–15.6" notebooks',
    'IATA hand luggage compliant with TSA lock',
    'Removable padded notebook case with tablet compartment up to 12.9"',
    'Lockable front compartment for quick notebook access at security',
    'Trolley strap attaches notebook case to telescopic handle',
    'Passport & ticket pocket with inner cable compartment',
    'Generous main compartment with clothing & toiletry organisation',
  ].join('\n'),

  'dicota-top-traveller-roller-pro-14-156': [
    'Laptop roller for 14–15.6" notebooks',
    'Interchangeable wheels & integrated telescopic handle',
    'Front pocket for power supply and cables',
    'Length-adjustable padded shoulder strap with anti-slip',
    'Carry handles made of genuine leather',
    'Trolley strap and waterproof bag bottom',
    'Address tag included & water-repellent material',
  ].join('\n'),

  // ── Privacy Filters ───────────────────────────────────────────────────────

  'dicota-secret-2-way-magnetic-macbook-12': [
    'Privacy filter for MacBook 12" | ±30° side vision limit',
    '48% blue light reduction | touch-capable',
    'Two-way privacy protection (left & right)',
    'Clear view and accurate colour reproduction at all times',
    'Reduces fingerprints and scratches',
    'High scratch resistance, reversible glossy or matte side',
    'Immediate magnetic adhesion and detachment',
  ].join('\n'),

  'dicota-secret-2-way-magnetic-macbook-air-13macbook-pro-13macbook-pro-retina-13-2012-2015': [
    'Privacy filter for MacBook Air/Pro 13" | ±30° side vision limit',
    '48% blue light reduction | touch-capable',
    'Two-way privacy protection (left & right)',
    'Clear view and accurate colour reproduction at all times',
    'Reduces fingerprints and scratches',
    'High scratch resistance, reversible glossy or matte side',
    'Immediate magnetic adhesion and detachment',
  ].join('\n'),

  'dicota-secret-2-way-magnetic-macbook-pro-13': [
    'Privacy filter for MacBook Pro 13" | ±30° side vision limit',
    '48% blue light reduction | touch-capable',
    'Two-way privacy protection (left & right)',
    'Clear view and accurate colour reproduction at all times',
    'Reduces fingerprints and scratches',
    'High scratch resistance, reversible glossy or matte side',
    'Immediate magnetic adhesion and detachment',
  ].join('\n'),

  'dicota-secret-2-way-magnetic-macbook-pro-15macbook-pro-retina-15-2012-2015': [
    'Privacy filter for MacBook Pro 15" | ±30° side vision limit',
    '48% blue light reduction | touch-capable',
    'Two-way privacy protection (left & right)',
    'Clear view and accurate colour reproduction at all times',
    'Reduces fingerprints and scratches',
    'High scratch resistance, reversible glossy or matte side',
    'Immediate magnetic adhesion and detachment',
  ].join('\n'),

  'dicota-secret-2-way-magnetic-surface-pro4surface-pro-2017': [
    'Privacy filter for Surface Pro 4 / 2017 | ±30° side vision limit',
    '48% blue light reduction | touch-capable',
    'Two-way privacy protection (left & right)',
    'Clear view and accurate colour reproduction at all times',
    'Reduces fingerprints and scratches',
    'High scratch resistance, reversible glossy or matte side',
    'Immediate magnetic adhesion and detachment',
  ].join('\n'),

  'dicota-secret-2-way-magnetic-ipad-20172018airair2': [
    'Privacy filter for iPad 2017/2018/Air/Air 2 | ±30° side vision limit',
    '48% blue light reduction | touch-capable',
    'Two-way privacy protection (left & right)',
    'Clear view and accurate colour reproduction at all times',
    'Reduces fingerprints and scratches',
    'High scratch resistance, reversible glossy or matte side',
    'Immediate magnetic adhesion and detachment',
  ].join('\n'),

  'dicota-secret-2-way-magnetic-ipad-pro-129': [
    'Privacy filter for iPad Pro 12.9" | ±30° side vision limit',
    '48% blue light reduction | touch-capable',
    'Two-way privacy protection (left & right)',
    'Clear view and accurate colour reproduction at all times',
    'Reduces fingerprints and scratches',
    'High scratch resistance, reversible glossy or matte side',
    'Immediate magnetic adhesion and detachment',
  ].join('\n'),

  // ── Accessories ───────────────────────────────────────────────────────────

  'dicota-accessory-pouch-eco-move-large': [
    'Large eco accessory pouch for travel & business',
    'Main compartment with elastic straps for cables & power bank',
    'Functional interior keeps essentials organised',
    'Suitable for business, travel and gaming accessories',
    'Compact and lightweight design',
    'Durable, water-repellent material',
    'Available in multiple sizes',
  ].join('\n'),

  'dicota-accessory-pouch-eco-move-medium': [
    'Medium eco accessory pouch for travel & business',
    'Main compartment with elastic straps for cables & power bank',
    'Functional interior keeps essentials organised',
    'Suitable for business, travel and gaming accessories',
    'Compact and lightweight design',
    'Durable, water-repellent material',
    'Available in multiple sizes',
  ].join('\n'),

  'dicota-accessory-pouch-eco-move-small': [
    'Small eco accessory pouch for travel & business',
    'Main compartment with elastic straps for cables & power bank',
    'Functional interior keeps essentials organised',
    'Suitable for business, travel and gaming accessories',
    'Compact and lightweight design',
    'Durable, water-repellent material',
    'Available in multiple sizes',
  ].join('\n'),

  'dicota-portable-stand-for-laptop-and-tablet': [
    'Universal aluminium laptop & tablet stand',
    '7 adjustable heights for ergonomic working anywhere',
    'Made from high-quality aluminium',
    'Open back prevents device overheating',
    'Silicone pads prevent scratching and slipping',
    'Compact and lightweight for portability',
    'Universally compatible with laptops and tablets',
  ].join('\n'),

  // ── Docking Stations ─────────────────────────────────────────────────────

  'dicota-usb-c-11-in-1-docking-station-5k-hdmidp-pd-100w-uk': [
    '11-in-1 USB-C docking station | Up to 5K/60Hz',
    '100W Power Delivery passthrough',
    '1× DisplayPort + 1× HDMI — dual 4K/60Hz or single 5K/60Hz',
    '5× USB-A + 1× USB-C ports',
    'Compatible with USB-C and Thunderbolt™ laptops & tablets',
    'Note: macOS does not support MST dual-monitor output',
    'Plug-and-play, no driver required',
  ].join('\n'),

  'dicota-usb-c-12-in-1-docking-station-5k-hdmidp-pd-100w-uk': [
    '12-in-1 USB-C docking station | Up to three monitors',
    '100W Power Delivery passthrough',
    '2× DisplayPort + 3× HDMI — supports up to 4K/60Hz',
    '3× USB 3.1 + 2× USB-C (10Gbps) ports',
    'Compatible with USB 3.0, USB-C & Thunderbolt™ 3/4 laptops',
    'Gigabit Ethernet (10/100/1000 Mbps)',
    '3.5mm combo audio jack for headset or speakers',
  ].join('\n'),

  'dicota-usb-c-portable-docking-4-in-1-with-hdmi': [
    '4-in-1 portable USB-C docking | HDMI 4K output',
    'Ultra compact — only 59g with hidden foldable cable',
    'Plug and play, no drivers required',
    'HDMI with 4K resolution support',
    'USB-C with PD 3.0 or data transmission',
    'USB-A with BC 1.2 and data transmission',
    'RJ45 wired network connection',
  ].join('\n'),

  'dicota-usb-c-portable-hub-4-in-1': [
    '4-in-1 portable USB-C hub',
    'Ultra compact — only 57g with hidden foldable cable',
    'Plug and play, no drivers required',
    '1× USB-C PD 3.0 charging or data transfer',
    '1× USB-C data transfer up to 5Gbps',
    '1× USB-A data transfer up to 5Gbps',
    'USB-A with BC 1.2 charging support',
  ].join('\n'),

  // ── Chargers ─────────────────────────────────────────────────────────────

  'dicota-universal-car-notebook-charger-usb-c': [
    'USB-C car charger | Up to 45W output',
    '12/24V car socket adapter with dual USB ports',
    '1× USB-C (5–20V, up to 3A) + 1× USB-A (5V, up to 2.4A)',
    'Automatic output voltage & current adjustment',
    'Includes USB-C cable & 7 notebook connector tips',
    'Compatible with Acer, ASUS, Dell, Fujitsu, HP, Lenovo & more',
    'Protection against overcurrent, overvoltage & overheating',
  ].join('\n'),

  'dicota-universal-travel-notebook-charger-usb-c-45w': [
    'Universal travel charger | 45W USB-C output',
    '3 interchangeable plugs covering 200+ countries',
    'USB-C output for notebooks, tablets & smartphones',
    '3× USB-A outputs usable simultaneously',
    'Worldwide power compatibility',
    'Protection against overcurrent, overvoltage & overheating',
    'Compact travel-ready design',
  ].join('\n'),

  // ── Webcam & Mouse ───────────────────────────────────────────────────────

  'dicota-webcam-pro-plus-full-hd': [
    'Full HD 1080p webcam | Built-in digital microphone',
    'Privacy cover & 360° rotation',
    'Plug & play — no additional software required',
    '5m microphone range, 30fps frame rate',
    'USB 2.0, 1.5m cable included',
    'Flexible mounting — desktop, table or tripod',
    'Swivel up/down and 360° rotatable',
  ].join('\n'),

  'dicota-wireless-mouse-comfort': [
    'Wireless comfort mouse | 2.4GHz technology',
    'Nano receiver, plug & play — no software required',
    '1000 DPI optical sensor',
    'Suitable for left and right-handed users',
    '3 buttons with scroll wheel & middle click',
    'On/Off button to save battery life',
    'Runs on one AA battery (included)',
  ].join('\n'),
}

export async function GET() {
  await connectDB()
  const results = []

  for (const [slug, shortDescription] of Object.entries(updates)) {
    const res = await Product.updateOne(
      { brandSlug: 'dicota', slug },
      { $set: { shortDescription } }
    )
    results.push({ slug, updated: res.modifiedCount > 0 })
  }

  return NextResponse.json({ total: results.length, results })
}
