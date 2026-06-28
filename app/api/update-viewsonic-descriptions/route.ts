import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates: Record<string, string> = {

  // ── Interactive Displays ──────────────────────────────────────────────────

  'viewsonic-ifp105s': [
    '105" 5K interactive display | 40-point multi-touch',
    'Quad-core processor with Android OS',
    '5120 × 2160 resolution',
    'myViewBoard™ digital whiteboard software',
    'Wireless content sharing via ViewBoard® Cast',
    'Eye-care certified panel',
    '3-year standard limited warranty',
  ].join('\n'),

  'viewsonic-ifp4320': [
    '43" 4K interactive display | 10-point touch',
    'USB-C single-cable connectivity',
    'myViewBoard™ whiteboard & wireless casting',
    'In-cell touch technology for smooth writing',
    'Wireless content sharing & remote management',
    'Slim and space-saving design',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp5550-3': [
    '55" 4K interactive display | dual-pen support',
    'Ultra Fine Touch for pen-on-paper experience',
    'myViewBoard® native whiteboarding app',
    'Synchronous dual-pen writing performance',
    'ViewBoard® Cast 4-way split screen sharing',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp6532': [
    '65" 4K interactive display | Ultra Fine Touch',
    'myViewBoard™ whiteboard, casting & remote management',
    'Pen-on-paper writing experience',
    'Android 9.0 powered by quad-core CPU',
    'Front-facing dual speakers',
    'Low blue light certified',
    'Eye-care certified display',
  ].join('\n'),

  'viewsonic-ifp6550-3': [
    '65" 4K interactive display | dual-pen support',
    'Ultra Fine Touch for pen-on-paper experience',
    'myViewBoard® native whiteboarding app',
    'Synchronous dual-pen writing performance',
    'ViewBoard® Cast 4-way split screen sharing',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp6550-5': [
    '65" 4K interactive display | 40-point touch',
    'Android 11 octa-core CPU',
    'Ultra Fine Touch for pen-on-paper experience',
    'myViewBoard whiteboard with classroom tools',
    'Screen share via USB-C or wirelessly',
    'myViewBoard Manager for remote control',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp6551': [
    '65" 4K interactive display | Ultra Fine Touch',
    'myViewBoard™ whiteboard & wireless casting',
    'Dual-pen writing performance',
    'ViewBoard® Cast 4-way split screen sharing',
    'Front-facing dual speakers',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp6552': [
    '65" 4K interactive display | 33-point touch',
    'USB-C single-cable plug-and-play',
    'Dual-pen with naturally smooth writing',
    'myViewBoard Manager for remote management',
    'Industry-leading audio & eye-care technology',
    'Angular design with shortcut keys',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp6552-1a': [
    '65" 4K interactive display | 33-point touch',
    'Dual-pen capability',
    'Ultra Fine Touch & palm awareness technology',
    '2 × 15W front-facing speakers',
    'myViewBoard™ whiteboard software',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp6562': [
    '65" 4K interactive display | 20-point UFT+ touch',
    'USB-C with 65W fast charge',
    'Compatible ViewSonic conference camera & speakerphone',
    'vCastSender & myViewBoard Display',
    'myViewBoard Manager for centralized IT management',
    'Comprehensive I/O ports',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp6570': [
    '65" 4K interactive display | PCAP touch',
    'Smart Active Pen for natural writing',
    'Azure-certified IoT sensor hub',
    'Skype for Business certified FHD camera',
    'USB-C single-cable content sharing',
    'Workplace management sensors built-in',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp7532': [
    '75" 4K interactive display | Ultra Fine Touch',
    'myViewBoard™ whiteboard, casting & remote management',
    'Pen-on-paper writing experience',
    'Android 9.0 powered by quad-core CPU',
    'Front-facing dual speakers',
    'Low blue light certified',
    'Eye-care certified display',
  ].join('\n'),

  'viewsonic-ifp7550-3': [
    '75" 4K interactive display | dual-pen support',
    'Ultra Fine Touch for pen-on-paper experience',
    'myViewBoard® native whiteboarding app',
    'Synchronous dual-pen writing performance',
    'ViewBoard® Cast 4-way split screen sharing',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp7550-5': [
    '75" 4K interactive display | 40-point touch',
    'Android 11 octa-core CPU',
    'Ultra Fine Touch for pen-on-paper experience',
    'myViewBoard whiteboard with classroom tools',
    'Screen share via USB-C or wirelessly',
    'myViewBoard Manager for remote control',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp7552': [
    '75" 4K interactive display | 33-point touch',
    'USB-C single-cable plug-and-play',
    'Dual-pen with naturally smooth writing',
    'myViewBoard Manager for remote management',
    'Industry-leading audio & eye-care technology',
    'Angular design with shortcut keys',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp7552-1a': [
    '75" 4K interactive display | 33-point touch',
    'Dual-pen capability',
    'Ultra Fine Touch & palm awareness technology',
    '2 × 15W front-facing speakers',
    'myViewBoard™ whiteboard software',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp7562': [
    '75" 4K interactive display | 20-point UFT+ touch',
    'USB-C with 65W fast charge',
    'Compatible ViewSonic conference camera & speakerphone',
    'vCastSender & myViewBoard Display',
    'myViewBoard Manager for centralized IT management',
    'Comprehensive I/O ports',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp8630': [
    '86" 4K interactive display | Ultra Fine Touch',
    'myViewBoard™ digital whiteboard software',
    'Dual-pen with 3mm/8mm diameter pen tips',
    'Wireless presentation across devices',
    'Ambient light sensor',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp8632': [
    '86" 4K interactive display | Ultra Fine Touch',
    'myViewBoard™ whiteboard, casting & remote management',
    'Pen-on-paper writing experience',
    'Android 9.0 powered by quad-core CPU',
    'Front-facing dual speakers',
    'Low blue light certified',
    'Eye-care certified display',
  ].join('\n'),

  'viewsonic-ifp8650-3': [
    '86" 4K interactive display | dual-pen support',
    'Ultra Fine Touch for pen-on-paper experience',
    'myViewBoard® native whiteboarding app',
    'Synchronous dual-pen writing performance',
    'ViewBoard® Cast 4-way split screen sharing',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp8650-5': [
    '86" 4K interactive display | 40-point touch',
    'Android 11 octa-core CPU',
    'Ultra Fine Touch for pen-on-paper experience',
    'myViewBoard whiteboard with classroom tools',
    'Screen share via USB-C or wirelessly',
    'myViewBoard Manager for remote control',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp8652': [
    '86" 4K interactive display | 33-point touch',
    'USB-C single-cable plug-and-play',
    'Dual-pen with naturally smooth writing',
    'myViewBoard Manager for remote management',
    'Industry-leading audio & eye-care technology',
    'Angular design with shortcut keys',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp8652-1a': [
    '86" 4K interactive display | 33-point touch',
    'Dual-pen capability',
    'Ultra Fine Touch & palm awareness technology',
    '2 × 15W front-facing speakers',
    'myViewBoard™ whiteboard software',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp8662': [
    '86" 4K interactive display | 20-point UFT+ touch',
    'USB-C with 65W fast charge',
    'Compatible ViewSonic conference camera & speakerphone',
    'vCastSender & myViewBoard Display',
    'myViewBoard Manager for centralized IT management',
    'Comprehensive I/O ports',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp8670': [
    '86" 4K interactive display | PCAP touch',
    'Smart Active Pen for natural writing',
    'Azure-certified IoT sensor hub',
    'Skype for Business certified FHD camera',
    'USB-C single-cable content sharing',
    'Workplace management sensors built-in',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp9850-3': [
    '98" 4K interactive display | Ultra Fine Touch',
    'myViewBoard™ digital whiteboard software',
    'ViewBoard® Cast 4-way split screen sharing',
    'SmartPort™ shared front USB ports',
    '2.0 stereo sound system',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-ifp9850-4': [
    '98" 4K interactive display | Ultra Fine Touch',
    'USB-C single-cable connectivity',
    'Native whiteboarding for annotation & collaboration',
    'Wireless content sharing with 4-way split screen',
    'myViewBoard Manager for display management',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-mini-ifp2410': [
    '24" interactive front-facing display',
    'Built-in myViewBoard® digital whiteboard software',
    'ViewBoard® Cast streaming software',
    'Designed for teaching & collaboration',
    'Compact, space-saving form factor',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  'viewsonic-viewboard-ifp6551': [
    '65" 4K interactive display | Ultra Fine Touch',
    'myViewBoard™ whiteboard & wireless casting',
    'Dual-pen writing performance',
    'ViewBoard® Cast 4-way split screen sharing',
    'Front-facing dual speakers',
    'Eye-care certified display',
    'Low blue light certified',
  ].join('\n'),

  // ── Professional Monitors ────────────────────────────────────────────────

  'viewsonic-vp2756-2k': [
    '27" QHD 2560×1440 IPS | Pantone validated',
    'USB-C with 60W charging + daisy chain',
    'Factory pre-calibrated Delta E < 2 colour accuracy',
    '100% sRGB wide colour gamut',
    'Auto Pivot ergonomic stand',
    'CAD/CAM & portrait mode support',
    'TÜV certified blue light filter',
  ].join('\n'),

  'viewsonic-vp2756-4k': [
    '27" 4K UHD 3840×2160 IPS | Pantone validated',
    'USB-C with 60W charging + daisy chain',
    'Factory pre-calibrated Delta E < 2 colour accuracy',
    '100% sRGB wide colour gamut',
    'Auto Pivot ergonomic stand',
    'CAD/CAM & portrait mode support',
    'TÜV certified blue light filter',
  ].join('\n'),

  'viewsonic-vp2768a': [
    '27" 2K QHD | Pantone validated, Delta E < 2',
    'Built-in docking station with USB-C',
    '100% sRGB colour accuracy',
    'Daisy chain display support',
    'Ergonomic stand with tilt, swivel & height adjust',
    'Eye-care technology with flicker-free panel',
    'Factory pre-calibrated',
  ].join('\n'),

  'viewsonic-vp3256-4k': [
    '32" 4K UHD IPS | Pantone validated, 100% sRGB',
    'Factory pre-calibrated for Delta E < 2',
    'ColorPro 32 professional colour monitor',
    'USB-C connectivity with power delivery',
    'Ergonomic stand with full adjustment',
    'Eye-care technology with flicker-free panel',
    'HDR10 support',
  ].join('\n'),

  // ── Business Monitors ────────────────────────────────────────────────────

  'viewsonic-va2215-h': [
    '22" FHD IPS | HDMI & VGA inputs',
    '75Hz Adaptive Sync for smooth visuals',
    'Eye-care technology for comfortable viewing',
    'Eco-mode for low energy consumption',
    'ViewMode colour rendering options',
    'Flicker-free panel',
    'Slim, space-saving design',
  ].join('\n'),

  'viewsonic-va2406-h': [
    '24" FHD VA panel | HDMI & VGA inputs',
    '75Hz refresh rate with Adaptive Sync',
    'SuperClear® VA for rich contrast',
    'Eye-care technology for comfortable viewing',
    'Eco-mode for low energy consumption',
    'ViewMode colour rendering options',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-va2432-h-w': [
    '24" FHD IPS | 1ms (MPRT) response time',
    '75Hz refresh rate with Adaptive Sync',
    'SuperClear® IPS panel',
    'Three-sided frameless design',
    'HDMI & VGA inputs',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-va2432-mh': [
    '24" FHD IPS | Dual integrated speakers',
    '75Hz refresh rate with Adaptive Sync',
    'SuperClear® IPS for wide-angle colours',
    'Three-sided frameless design',
    'HDMI & VGA inputs',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-va2432-mhd': [
    '24" IPS | DisplayPort, HDMI & speakers',
    '75Hz refresh rate with Adaptive Sync',
    'Built-in Low Blue Light screen',
    'SuperClear® IPS panel',
    'Three-sided frameless design',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-va2709u-4k': [
    '27" 4K UHD IPS | USB-C with 65W power delivery',
    'DisplayPort & HDMI inputs',
    'SuperClear® IPS panel',
    'Eye-care technology for comfortable viewing',
    'Flicker-free panel',
    'Three-sided frameless design',
    'VESA mount compatible',
  ].join('\n'),

  'viewsonic-va2715-mh': [
    '27" FHD IPS | HDMI & VGA inputs',
    '75Hz FreeSync for smooth visuals',
    'Eye-care technology for comfortable viewing',
    'Eco-mode for low energy consumption',
    'ViewMode colour rendering options',
    'Flicker-free panel',
    'Slim, space-saving design',
  ].join('\n'),

  'viewsonic-va2732-h': [
    '27" FHD IPS | 75Hz refresh rate',
    'Adaptive Sync to eliminate screen tearing',
    'SuperClear® IPS panel',
    'Built-in Low Blue Light screen',
    'HDMI & VGA inputs',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-va3209-2k-mhd': [
    '32" QHD 2560×1440 IPS | HDR10 support',
    '75Hz variable refresh rate',
    'SuperClear® IPS panel',
    'HDMI & DisplayPort inputs',
    'HDR10 for stellar contrast & colour accuracy',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-va3209-mh': [
    '32" FHD IPS | Three-sided borderless bezel',
    '75Hz variable refresh rate',
    'SuperClear® IPS panel',
    'Eye-care technology for comfortable viewing',
    'HDMI & VGA inputs',
    'Flicker-free panel',
    'Slim, space-saving design',
  ].join('\n'),

  'viewsonic-va3209u-4k': [
    '32" 4K UHD IPS | USB-C connectivity',
    'SuperClear® IPS technology',
    'Frameless bezel design',
    'HDMI, DisplayPort & VGA inputs',
    'Eye-care technology',
    'Flicker-free panel',
    'VESA mount compatible',
  ].join('\n'),

  // ── Ergonomic/Professional Business Monitors ────────────────────────────

  'viewsonic-vg1655': [
    '16" FHD portable monitor',
    'USB-C & mini HDMI connectivity',
    'Flexible display setup at any angle',
    'Compact, lightweight & highly portable',
    'Sturdy and durable design',
    'Eye-care technology',
    'Plug-and-play, no driver required',
  ].join('\n'),

  'viewsonic-vg2448': [
    '24" FHD IPS | SuperClear IPS technology',
    'vDisplay Manager software (free download)',
    'HDMI, DisplayPort & VGA inputs',
    'Narrow bezel design',
    'Versatile ergonomic stand',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vg2455': [
    '24" FHD IPS | USB-C single-cable solution',
    'SuperClear® IPS technology',
    'Frameless bezel design',
    'HDMI, DisplayPort & VGA inputs',
    'Ergonomic stand with full adjustment',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vg2709-2k-mhdu': [
    '27" QHD 2560×1440 IPS | Dual 2.5W speakers',
    '75Hz refresh rate with Adaptive Sync',
    'SuperClear® IPS panel',
    'USB-C connectivity',
    'HDMI & DisplayPort inputs',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vg2740v': [
    '27" FHD IPS | Built-in FHD webcam & microphone',
    'Adjustable vertical angles for better framing',
    'Webcam slide cover for privacy',
    'Quick release ergonomic stand',
    'Minimized total cost of ownership',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vg2748': [
    '27" FHD IPS | Versatile ergonomic stand',
    'vDisplay Manager software (free download)',
    'HDMI, DisplayPort & VGA inputs',
    'SuperClear® IPS technology',
    'Narrow bezel design',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vg2755': [
    '27" FHD IPS | USB-C single-cable solution',
    'SuperClear® IPS technology',
    'Frameless bezel design',
    'HDMI, DisplayPort & VGA inputs',
    'Ergonomic stand with full adjustment',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vx3276-mhd-3': [
    '32" FHD IPS | HDR10 support',
    '75Hz refresh rate with Adaptive Sync',
    'SuperClear® IPS technology',
    'Frameless bezel with metallic triangle stand',
    'HDMI, DisplayPort & VGA inputs',
    'Flicker-free & blue light filter',
    'Eye-care technology',
  ].join('\n'),

  // ── Gaming Monitors ──────────────────────────────────────────────────────

  'viewsonic-vx2418c': [
    '24" FHD curved gaming | 165Hz refresh rate',
    '1ms (MPRT) response time',
    '1500R curved screen for immersion',
    'AMD FreeSync Premium',
    'Full HD resolution',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vx2428': [
    '24" FHD Fast IPS gaming | 165Hz refresh rate',
    '0.5ms MPRT response time',
    'AMD FreeSync™ Premium',
    'VESA AdaptiveSync & ClearMR certified',
    'HDR10 support',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vx2476-sh': [
    '24" FHD IPS | 75Hz refresh rate',
    'SuperClear® IPS for vivid wide-angle visuals',
    'Frameless bezel with stylish stand',
    'VGA & dual HDMI inputs',
    'ViewMode pre-calibrated colour modes',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vx2719-pc-mhd': [
    '27" FHD curved gaming | 240Hz refresh rate',
    '1ms (MPRT) response time',
    '1500R curved screen for immersive visuals',
    'AMD FreeSync Premium',
    'Full HD resolution',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vx2728': [
    '27" FHD Fast IPS gaming | 165Hz refresh rate',
    'HDR10 support',
    '0.5ms MPRT response time',
    'VESA ClearMR for motion clarity',
    'AMD FreeSync™ Premium',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vx2728-2k': [
    '27" QHD Fast IPS gaming | 165Hz refresh rate',
    '0.5ms MPRT response time',
    'AMD FreeSync™ Premium',
    'VESA AdaptiveSync & ClearMR certified',
    'HDR10 support',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vx2728j': [
    '27" FHD Fast IPS gaming | 165Hz refresh rate',
    '0.5ms MPRT response time',
    'HDR10 support',
    'VESA ClearMR for motion clarity',
    'Eye-care technology',
    'Flicker-free panel',
    'VESA mount compatible',
  ].join('\n'),

  'viewsonic-vx2776-sh': [
    '27" FHD IPS | 75Hz refresh rate',
    'SuperClear® IPS panel',
    'Frameless bezel with stylish stand',
    'HDMI & VGA inputs',
    'Eye-care technology',
    'Flicker-free panel',
    'VESA mount compatible',
  ].join('\n'),

  'viewsonic-vx3219-pc-mhd': [
    '32" FHD curved gaming | 240Hz refresh rate',
    '1ms (MPRT) response time',
    '1500R curved screen for immersive visuals',
    'AMD FreeSync™ Premium',
    'Full HD resolution',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-vx3418-2kpc': [
    '34" ultrawide QHD curved | 144Hz refresh rate',
    '1ms (MPRT) response time',
    '21:9 aspect ratio, 1500R curved screen',
    'Adaptive™ Sync to prevent tearing',
    'HDR10 support',
    'Adjustable ergonomic stand',
    'Eye-care technology',
  ].join('\n'),

  'viewsonic-xg251g': [
    '25" FHD IPS gaming | 360Hz refresh rate',
    '1ms GTG response time',
    'Sleek, pro-level design',
    'G-Sync Compatible',
    'Eye-care technology',
    'Flicker-free panel',
    'VESA mount compatible',
  ].join('\n'),

  // ── Touch Monitors ───────────────────────────────────────────────────────

  'viewsonic-td1655': [
    '16" FHD portable touch monitor',
    'USB-C one-cable for audio, video, power & touch',
    'Works at any angle — flexible display setup',
    'Compact, lightweight & highly portable',
    'Sturdy and durable design',
    'Plug-and-play, no driver required',
    'Eye-care technology',
  ].join('\n'),

  'viewsonic-td2223': [
    '22" FHD 10-point touch monitor',
    'SuperClear® IPS technology',
    'HDMI, DisplayPort & VGA inputs',
    '50M:1 dynamic contrast ratio',
    'Plug-and-play USB touch interface',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-td2455': [
    '24" FHD 10-point touch | USB-C one-cable',
    'DisplayPort out for daisy chain',
    'Smooth and accurate touch experience',
    'Highly adjustable working angles',
    'Versatile touch for various applications',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  'viewsonic-td2760': [
    '27" FHD 10-point touch monitor',
    'SuperClear® IPS technology',
    'HDMI, DisplayPort & VGA inputs',
    '50M:1 dynamic contrast ratio',
    'Plug-and-play USB touch interface',
    'Eye-care technology',
    'Flicker-free panel',
  ].join('\n'),

  // ── Projectors ───────────────────────────────────────────────────────────

  'viewsonic-ls750wu': [
    '5,000 ANSI lumens | Laser phosphor, 20,000hrs',
    '1.3× optical zoom, 360° projection',
    'WUXGA (1920×1200) resolution',
    '2nd generation laser phosphor light source',
    'Cos-engineered optics for uniformity',
    'Network management ready',
    'ENERGY STAR compliant',
  ].join('\n'),

  'viewsonic-ls831wu': [
    '4,500 ANSI lumens | Ultra short throw 0.25 ratio',
    'Laser phosphor, 20,000hrs lifespan',
    'WUXGA (1920×1200) resolution',
    '360° projection capability',
    '2nd generation laser phosphor light source',
    'Network management ready',
    'ENERGY STAR compliant',
  ].join('\n'),

  'viewsonic-ls920wu': [
    '6,000 ANSI lumens | Laser phosphor, 20,000hrs',
    '1.6× optical zoom with wide H/V lens shift',
    'WUXGA (1920×1200) resolution',
    '360° projection capability',
    '2nd generation laser phosphor light source',
    'Network management ready',
    'ENERGY STAR compliant',
  ].join('\n'),

  'viewsonic-m1-plus-g2': [
    'Smart portable projector | Wi-Fi & Bluetooth',
    '360° smart stand with ceiling projection',
    'Integrated Harman Kardon speakers',
    'CinematicColor™ technology',
    'Built-in battery for wireless use',
    'Instant auto-focus',
    'Compact, travel-ready design',
  ].join('\n'),

  'viewsonic-m2e': [
    'Portable 1080p projector | Only 1kg',
    'Instant auto-focus & auto-keystone',
    'Cinema SuperColor+™ technology',
    'Harman Kardon speakers built-in',
    'Wi-Fi & Bluetooth connectivity',
    'USB-C power input',
    'Compact, travel-ready design',
  ].join('\n'),

  'viewsonic-px701hd': [
    '3,500 ANSI lumens | 1080p home projector',
    'SmartEco+ energy-efficient mode',
    'Vertical lens shift for flexible placement',
    'vColorTuner & customised user modes',
    'Dual HDMI inputs & USB power',
    'Eye-care technology',
    'Low input lag for gaming',
  ].join('\n'),

  'viewsonic-px748-4k': [
    'True 4K HDR | 4,000 ANSI lumens',
    'USB-C direct big-screen streaming',
    '4.2ms ultra-fast input lag',
    '240Hz frame interpolation support',
    'vColorTuner for colour customisation',
    'Dual HDMI 2.0 inputs',
    'ENERGY STAR compliant',
  ].join('\n'),

  'viewsonic-x10-4k-plus': [
    '4K UHD LED smart projector',
    'Built-in Harman Kardon speakers',
    '125% Rec.709 Cinema SuperColor™',
    'Voice control & smart functionality',
    'Bluetooth & Wi-Fi connectivity',
    'LED light source, long lifespan',
    'Compact, portable design',
  ].join('\n'),

  'viewsonic-x100-4k-plus': [
    'True 4K UHD LED | 30,000hrs lifespan',
    'Cinema SuperColor+™ 125% Rec.709',
    'Wide H/V lens shift for flexible setup',
    '2nd generation LED light source',
    'Smart functionality with voice control',
    'Wi-Fi & Bluetooth connectivity',
    'ENERGY STAR compliant',
  ].join('\n'),

  'viewsonic-x1000-4k-plus': [
    'True 4K ultra short throw | 100" from 38cm',
    'Cinema SuperColor+™ 125% Rec.709',
    '2nd generation LED, 30,000hrs lifespan',
    'HDR10 support',
    'Smart functionality with voice control',
    'Wi-Fi & Bluetooth connectivity',
    'ENERGY STAR compliant',
  ].join('\n'),

  // ── Commercial Displays ──────────────────────────────────────────────────

  'viewsonic-cde4320': [
    '43" 4K commercial display | Slim even bezel',
    'USB playback for photos, music & video',
    'Easy multi-screen setups',
    'Remote configuration management',
    'Multiple HDMI device control',
    'Android-powered with network management',
    '24/7 operation ready',
  ].join('\n'),

  'viewsonic-cde5520': [
    '55" 4K commercial display | Wireless content sharing',
    'Easy multi-screen setups',
    'USB playback for photos, music & video',
    'Remote configuration & content management',
    'Multiple HDMI device control',
    'Android-powered with network management',
    '24/7 operation ready',
  ].join('\n'),

  'viewsonic-cde6520': [
    '65" 4K commercial display | Wireless presentation',
    'Easy cast across devices & rooms',
    'OPS PC slot for multitasking',
    'USB flash drive plug-and-play',
    'Slim bezel for clean installations',
    'Android-powered with network management',
    '24/7 operation ready',
  ].join('\n'),

  'viewsonic-cde7520': [
    '75" 4K commercial display | Wireless presentation',
    'Easy cast across devices & rooms',
    'OPS PC slot for multitasking',
    'USB flash drive plug-and-play',
    'Slim bezel for clean installations',
    'Android-powered with network management',
    '24/7 operation ready',
  ].join('\n'),

  'viewsonic-ep5540': [
    '55" 4K digital ePoster | Embedded media player',
    '16GB internal storage',
    'USB multimedia playback',
    'LAN function for web access',
    'Expandable external media player holder',
    'Remote management via RS232/LAN',
    'Slim, freestanding design',
  ].join('\n'),

  'viewsonic-ep5542': [
    '55" 4K digital ePoster | Freestanding design',
    'Built-in quad-core media player',
    'Effortless device & content management',
    'Exceptional picture quality',
    'Total remote control via RS232 over LAN',
    'Slim modern chassis',
    '24/7 operation ready',
  ].join('\n'),

  'viewsonic-ep5542t': [
    '55" 4K touch digital ePoster | 10-point IR touch',
    'Embedded media player & 16GB storage',
    'USB multimedia playback',
    'Remote settings management',
    'Infrared touch for interactive use',
    'Slim, freestanding design',
    '24/7 operation ready',
  ].join('\n'),

  // ── Collaboration Accessories ────────────────────────────────────────────

  'viewsonic-vb-aud-201': [
    '360° omnidirectional speakerphone | 6m coverage',
    '4 array microphones with AEC & noise reduction',
    '340g portable design, 24-hour battery',
    'USB & Bluetooth connectivity',
    'Compatible with all major conferencing platforms',
    'Plug-and-play setup',
    'LED indicator ring',
  ].join('\n'),

  'viewsonic-vb-cam-001': [
    'FHD webcam with built-in stereo microphone',
    'Automatic noise reduction & backlight compensation',
    'Multi-purpose bracket for flexible mounting',
    'Plug-and-play USB connectivity',
    'Compatible with Windows, macOS & Linux',
    'Light correction technology',
    'Compact, portable design',
  ].join('\n'),

  'viewsonic-vb-cam-002': [
    'Full HD 1080p webcam with privacy cover',
    'Built-in stereo microphone with noise reduction',
    'Plug-and-play USB connectivity',
    'Compatible with Windows & macOS',
    'Built-in lens privacy cover for security',
    'Auto light correction',
    'Compact, portable design',
  ].join('\n'),

  'viewsonic-vb-cam-201': [
    '4K UHD conference camera | 121° wide-angle FOV',
    'AI voice tracking & auto-framing',
    '4 array microphones with AEC/ANS',
    '5× digital zoom',
    'USB-C & USB-A connectivity',
    'Plug-and-play setup',
    'Compatible with all major conferencing platforms',
  ].join('\n'),

  'viewsonic-vb-vis-002': [
    '8MP autofocus document camera | 8× digital zoom',
    'Scan, record & livestream up to A3 materials',
    'Real-time annotation',
    'USB connectivity, plug-and-play',
    'Compatible with all major conferencing platforms',
    'Compact, foldable design',
    'Works with Windows & macOS',
  ].join('\n'),

  'viewsonic-vb-wps-001': [
    'Wireless presentation dongle | One-click sharing',
    'USB-C or HDMI connectivity',
    'Secure data protection',
    'Multi-device collaboration',
    'Plug-and-play, no software required',
    'Compatible with Windows & macOS',
    'Compact, portable design',
  ].join('\n'),

  'viewsonic-vb-wps-003': [
    'Wireless presentation dongle | One-click sharing',
    'USB-C or HDMI connectivity',
    'Secure data protection',
    'Multi-device collaboration',
    'Plug-and-play, no software required',
    'Compatible with Windows & macOS',
    'Compact, portable design',
  ].join('\n'),

  'viewsonic-vbd100': [
    'Interactive whiteboard extension via HDMI',
    'Annotation & multimedia import tools',
    'Screen capture & recording',
    'Extends any display to an interactive board',
    'Plug-and-play USB connectivity',
    'Works with Windows & macOS',
    'Compact, portable design',
  ].join('\n'),

  'viewsonic-vsb050': [
    'USB wireless adapter for ViewSonic displays',
    'Enables wireless content sharing',
    'Plug-and-play USB connectivity',
    'Compatible with ViewSonic collaboration devices',
    'Compact dongle design',
    'Secure wireless connection',
    'No software installation required',
  ].join('\n'),

  // ── Slot-in PCs ──────────────────────────────────────────────────────────

  'viewsonic-vpc12-wpo-11': [
    'Slot-in OPS PC | Intel Core i5-7200U vPro',
    'Intel HD Graphics 620, Max 4096×2304@60Hz',
    '64GB total available graphics memory',
    'TPM security chip',
    'Windows 10 Pro',
    'Designed for ViewBoard interactive displays',
    'Compact OPS form factor',
  ].join('\n'),

  'viewsonic-vpc12-wpo-16': [
    'Slot-in OPS PC | Intel Core i5-8259U',
    'Intel HD Graphics 655, Max 4096×2304@60Hz',
    'High definition audio stereo',
    'Windows 10 Pro',
    'Designed for ViewBoard interactive displays',
    'Compact OPS form factor',
    'Plug-and-play installation',
  ].join('\n'),

  'viewsonic-vpc27-s53-01-1b': [
    'Slot-in OPS PC | Intel 10th Gen Core processor',
    '16GB DDR4 memory',
    'Improved system stability, security & thermal management',
    'Designed for ViewBoard interactive & commercial displays',
    'Windows 10 Pro',
    'Compact OPS form factor',
    'Plug-and-play installation',
  ].join('\n'),

  'viewsonic-vpc27-w53-o1-1b': [
    'Slot-in OPS PC | Intel 10th Gen Core processor',
    'Designed for ViewBoard interactive & commercial displays',
    'Improved system stability & thermal management',
    'Windows 10 Pro',
    '16GB DDR4 memory',
    'Compact OPS form factor',
    'Plug-and-play installation',
  ].join('\n'),
}

export async function GET() {
  await connectDB()
  const results = []

  for (const [slug, shortDescription] of Object.entries(updates)) {
    const res = await Product.updateOne(
      { brandSlug: 'viewsonic', slug },
      { $set: { shortDescription } }
    )
    results.push({ slug, updated: res.modifiedCount > 0 })
  }

  return NextResponse.json({ total: results.length, results })
}
