import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates: Record<string, string> = {

  // ── RTX 5060 — CYCLONE ───────────────────────────────────────────────────

  'msi-geforce-rtx-5060-8g-cyclone': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'CYCLONE Cooling | Circular thermal design dissipates heat from GPU and components',
    'Custom Fan with optimised blade design for greater airflow and air pressure',
    'Solid Backplate increases card rigidity to prevent bending',
    'Custom PCB with hardened circuits and optimised trace routing for reliability',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-cyclone-oc': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'CYCLONE Cooling | Circular thermal design dissipates heat from GPU and components',
    'Custom Fan with optimised blade design for greater airflow and air pressure',
    'Solid Backplate increases card rigidity to prevent bending',
    'Custom PCB with hardened circuits and optimised trace routing for reliability',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5060 — GAMING ────────────────────────────────────────────────────

  'msi-geforce-rtx-5060-8g-gaming': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'TWIN FROZR 10 | Superior dual-fan cooling with enhanced blade design',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-gaming-oc': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'TWIN FROZR 10 | Superior dual-fan cooling with enhanced blade design',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5060 — GAMING TRIO ───────────────────────────────────────────────

  'msi-geforce-rtx-5060-8g-gaming-trio': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-gaming-trio-oc': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-gaming-trio-oc-white': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | White OC',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-gaming-trio-white': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | White Edition',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5060 — INSPIRE 2X ────────────────────────────────────────────────

  'msi-geforce-rtx-5060-8g-inspire-2x': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'STORMFORCE Dual Fan | Seven blades, claw texture and circular arc for airflow',
    'Heat Pipes for efficient thermal energy transfer away from the GPU',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center: prioritise full performance in GAMING mode or low noise in SILENT mode',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-inspire-2x-oc': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'STORMFORCE Dual Fan | Seven blades, claw texture and circular arc for airflow',
    'Heat Pipes for efficient thermal energy transfer away from the GPU',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center: prioritise full performance in GAMING mode or low noise in SILENT mode',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  // ── RTX 5060 — INSPIRE ITX ───────────────────────────────────────────────

  'msi-geforce-rtx-5060-8g-inspire-itx': [
    'GeForce RTX 5060 8GB GDDR7 | Blackwell & DLSS 4 | Compact ITX form factor',
    'STORMFORCE Single Fan | Copper-Core Sunflower Radiator for consistent cooling',
    'Copper-Core Sunflower Radiator with high-conductivity copper core',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'Smallest RTX 5060 card at 145 × 120 × 45 mm — ideal for mini-ITX builds',
    'MSI Center: prioritise full performance in GAMING mode or low noise in SILENT mode',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-inspire-itx-oc': [
    'GeForce RTX 5060 8GB GDDR7 | Blackwell & DLSS 4 | Compact ITX OC Edition',
    'STORMFORCE Single Fan | Copper-Core Sunflower Radiator for consistent cooling',
    'Copper-Core Sunflower Radiator with high-conductivity copper core',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'Smallest RTX 5060 card at 145 × 120 × 45 mm — ideal for mini-ITX builds',
    'MSI Center: prioritise full performance in GAMING mode or low noise in SILENT mode',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  // ── RTX 5060 — SHADOW 2X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5060-8g-shadow-2x': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'TORX Fan 5.0 | Ring-arc-linked blades stabilise and maintain high-pressure airflow',
    'Heat Pipes for efficient thermal energy transfer away from the GPU',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-shadow-2x-oc': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'TORX Fan 5.0 | Ring-arc-linked blades stabilise and maintain high-pressure airflow',
    'Heat Pipes for efficient thermal energy transfer away from the GPU',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  // ── RTX 5060 — VENTUS 2X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5060-8g-ventus-2x': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Heat Pipes for efficient thermal energy transfer away from the GPU',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-ventus-2x-oc': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Heat Pipes for efficient thermal energy transfer away from the GPU',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-ventus-2x-oc-white': [
    'GeForce RTX 5060 8GB GDDR7 | Blackwell architecture & DLSS 4 | White OC Edition',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Heat Pipes for efficient thermal energy transfer away from the GPU',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-ventus-2x-white': [
    'GeForce RTX 5060 8GB GDDR7 | Blackwell architecture & DLSS 4 | White Edition',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Heat Pipes for efficient thermal energy transfer away from the GPU',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  // ── RTX 5060 — VENTUS 3X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5060-8g-ventus-3x': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5060-8g-ventus-3x-oc': [
    'GeForce RTX 5060 8GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  // ── RTX 5070 — GAMING DUKE 3X ────────────────────────────────────────────

  'msi-geforce-rtx-5070-12g-gaming-duke-3x': [
    'GeForce RTX 5070 12GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'DUKE 3X Cooling | Circular fan design concentrates airflow into the heatsink',
    'Circular arcs connect fan blade tips boosting air pressure and thermal efficiency',
    'Solid Baseplate transfers heat from GPU to all heat pipes for better cooling',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-gaming-duke-3x-oc': [
    'GeForce RTX 5070 12GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'DUKE 3X Cooling | Circular fan design concentrates airflow into the heatsink',
    'Circular arcs connect fan blade tips boosting air pressure and thermal efficiency',
    'Solid Baseplate transfers heat from GPU to all heat pipes for better cooling',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-gaming-duke-3x-oc-white': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell architecture & DLSS 4 | White OC Edition',
    'DUKE 3X Cooling | Circular fan design concentrates airflow into the heatsink',
    'Circular arcs connect fan blade tips boosting air pressure and thermal efficiency',
    'Solid Baseplate transfers heat from GPU to all heat pipes for better cooling',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-gaming-duke-3x-white': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell architecture & DLSS 4 | White Edition',
    'DUKE 3X Cooling | Circular fan design concentrates airflow into the heatsink',
    'Circular arcs connect fan blade tips boosting air pressure and thermal efficiency',
    'Solid Baseplate transfers heat from GPU to all heat pipes for better cooling',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5070 — GAMING TRIO ───────────────────────────────────────────────

  'msi-geforce-rtx-5070-12g-gaming-trio': [
    'GeForce RTX 5070 12GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-gaming-trio-oc': [
    'GeForce RTX 5070 12GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-gaming-trio-oc-white': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell architecture & DLSS 4 | White OC Edition',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-gaming-trio-white': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell architecture & DLSS 4 | White Edition',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5070 — INSPIRE 3X ────────────────────────────────────────────────

  'msi-geforce-rtx-5070-12g-inspire-3x': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready Enthusiast Card',
    'STORMFORCE Triple Fan | Seven blades, claw texture and circular arc for airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'WAVE-CURVED 3.0 fin edges for improved airflow efficiency and reduced noise',
    'AIR ANTEGRADE FIN with V-shaped cutout to optimise airflow passthrough',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-inspire-3x-oc': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready OC Edition',
    'STORMFORCE Triple Fan | Seven blades, claw texture and circular arc for airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'AIR ANTEGRADE FIN with V-shaped cutout to optimise airflow passthrough',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5070 — SHADOW 2X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5070-12g-shadow-2x': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready Enthusiast Card',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-shadow-2x-oc': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready OC Edition',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  // ── RTX 5070 — SHADOW 3X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5070-12g-shadow-3x': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready Enthusiast Card',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-shadow-3x-oc': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready OC Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  // ── RTX 5070 — VANGUARD ──────────────────────────────────────────────────

  'msi-geforce-rtx-5070-12g-vanguard-oc': [
    'GeForce RTX 5070 12GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-vanguard-soc': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell architecture & DLSS 4 | Super OC',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-vanguard-soc-launch-edition': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SOC Launch Edition',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5070 — VENTUS 2X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5070-12g-ventus-2x': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready Enthusiast Card',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipe with square design maximises contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-ventus-2x-oc': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready OC Edition',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipe with square design maximises contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-ventus-2x-oc-white': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready White OC Edition',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipe with square design maximises contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-ventus-2x-white': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready White Edition',
    'TORX Fan 5.0 Dual Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipe with square design maximises contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5070 — VENTUS 3X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5070-12g-ventus-3x': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready Enthusiast Card',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipe with square design maximises contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5070-12g-ventus-3x-oc': [
    'GeForce RTX 5070 12GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready OC Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipe with square design maximises contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5080 — EXPERT ────────────────────────────────────────────────────

  'msi-geforce-rtx-5080-16g-expert': [
    'GeForce RTX 5080 16GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'FLOW FROZR 2 | Push-pull dual-fan system with Vapor Chamber for silent cooling',
    'Push Pull Airflow: two fans work collaboratively to reduce heat buildup',
    'Aluminum Die-Casting enhances structural integrity with flow-through ventilation',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-expert-oc': [
    'GeForce RTX 5080 16GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'FLOW FROZR 2 | Push-pull dual-fan system with Vapor Chamber for silent cooling',
    'Push Pull Airflow: two fans work collaboratively to reduce heat buildup',
    'Aluminum Die-Casting enhances structural integrity with flow-through ventilation',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5080 — GAMING TRIO ───────────────────────────────────────────────

  'msi-geforce-rtx-5080-16g-gaming-trio': [
    'GeForce RTX 5080 16GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-gaming-trio-oc': [
    'GeForce RTX 5080 16GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-gaming-trio-oc-white': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell architecture & DLSS 4 | White OC Edition',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-gaming-trio-white': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell architecture & DLSS 4 | White Edition',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5080 — INSPIRE 3X ────────────────────────────────────────────────

  'msi-geforce-rtx-5080-16g-inspire-3x': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready Enthusiast Card',
    'STORMFORCE Triple Fan | Seven blades, claw texture and circular arc for airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'WAVE-CURVED 3.0 fin edges for improved airflow efficiency and reduced noise',
    'AIR ANTEGRADE FIN with V-shaped cutout to optimise airflow passthrough',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-inspire-3x-oc': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready OC Edition',
    'STORMFORCE Triple Fan | Seven blades, claw texture and circular arc for airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'AIR ANTEGRADE FIN with V-shaped cutout to optimise airflow passthrough',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5080 — SHADOW 3X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5080-16g-shadow-3x': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready Enthusiast Card',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-shadow-3x-oc': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready OC Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Reinforcing Backplate with airflow vent allows exhaust air to pass directly through',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  // ── RTX 5080 — SUPRIM LIQUID ─────────────────────────────────────────────

  'msi-geforce-rtx-5080-16g-suprim-liquid-oc': [
    'GeForce RTX 5080 16GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'SUPRIM LIQUID | Hybrid air + liquid cooling for unparalleled silent performance',
    'Advanced Performance Pump with automotive-grade coolant for optimal flow',
    'Patented Water Block cools GPU and VRAM to lower temperatures',
    'Micro-fin Copper Base immersed in liquid stream for efficient heat transfer',
    'Dual BIOS: choose full performance GAMING mode or low noise SILENT mode',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-suprim-liquid-soc': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell architecture & DLSS 4 | Super OC',
    'SUPRIM LIQUID | Hybrid air + liquid cooling for unparalleled silent performance',
    'Advanced Performance Pump with automotive-grade coolant for optimal flow',
    'Patented Water Block cools GPU and VRAM to lower temperatures',
    'Micro-fin Copper Base immersed in liquid stream for efficient heat transfer',
    'Dual BIOS: choose full performance GAMING mode or low noise SILENT mode',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5080 — SUPRIM ────────────────────────────────────────────────────

  'msi-geforce-rtx-5080-16g-suprim-oc': [
    'GeForce RTX 5080 16GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Dual BIOS: choose full performance GAMING mode or low noise SILENT mode',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-suprim-soc': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell architecture & DLSS 4 | Super OC',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Dual BIOS: choose full performance GAMING mode or low noise SILENT mode',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5080 — VANGUARD ──────────────────────────────────────────────────

  'msi-geforce-rtx-5080-16g-vanguard-oc': [
    'GeForce RTX 5080 16GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-vanguard-soc': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell architecture & DLSS 4 | Super OC',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-vanguard-soc-launch-edition': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SOC Launch Edition',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5080 — VENTUS 3X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5080-16g-ventus-3x': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready Enthusiast Card',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-ventus-3x-oc': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready OC Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-ventus-3x-oc-plus': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready OC PLUS Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-ventus-3x-oc-white': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready White OC Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-ventus-3x-plus': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready PLUS Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5080-16g-ventus-3x-white': [
    'GeForce RTX 5080 16GB GDDR7 | Blackwell & DLSS 4 | SFF-Ready White Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'Zero Frozr: fans stop completely at low temperatures to eliminate noise',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5090 — GAMING TRIO ───────────────────────────────────────────────

  'msi-geforce-rtx-5090-32g-gaming-trio': [
    'GeForce RTX 5090 32GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'Dual BIOS: choose full performance GAMING mode or low noise SILENT mode',
  ].join('\n'),

  'msi-geforce-rtx-5090-32g-gaming-trio-oc': [
    'GeForce RTX 5090 32GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'TRI FROZR 4 | Upgraded triple-fan cooling with superior airflow control',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'Dual BIOS: choose full performance GAMING mode or low noise SILENT mode',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5090 — SUPRIM LIQUID ─────────────────────────────────────────────

  'msi-geforce-rtx-5090-32g-suprim-liquid-oc': [
    'GeForce RTX 5090 32GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'SUPRIM LIQUID | Hybrid air + liquid cooling for unparalleled silent performance',
    'Advanced Performance Pump with automotive-grade coolant for optimal flow',
    'Patented Water Block with special waterway cools GPU and VRAM',
    'Micro-fin Copper Base immersed in liquid stream for efficient heat transfer',
    '360mm Aluminum Radiator with STORMFORCE Fan for superior cooling performance',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  'msi-geforce-rtx-5090-32g-suprim-liquid-soc': [
    'GeForce RTX 5090 32GB GDDR7 | Blackwell architecture & DLSS 4 | Super OC',
    'SUPRIM LIQUID | Hybrid air + liquid cooling for unparalleled silent performance',
    'Advanced Performance Pump with automotive-grade coolant for optimal flow',
    'Patented Water Block with special waterway cools GPU and VRAM',
    'Micro-fin Copper Base immersed in liquid stream for efficient heat transfer',
    '360mm Aluminum Radiator with STORMFORCE Fan for superior cooling performance',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5090 — SUPRIM ────────────────────────────────────────────────────

  'msi-geforce-rtx-5090-32g-suprim-oc': [
    'GeForce RTX 5090 32GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'Wave Curved 4.0 precision-engineered fin edges enhance airflow and reduce turbulence',
  ].join('\n'),

  'msi-geforce-rtx-5090-32g-suprim-soc': [
    'GeForce RTX 5090 32GB GDDR7 | Blackwell architecture & DLSS 4 | Super OC',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Metal Backplate with airflow vents and thermal pads enhances cooling',
    'Dual BIOS: choose full performance GAMING mode or low noise SILENT mode',
    'MSI Center & Afterburner software for real-time monitoring and overclocking',
  ].join('\n'),

  // ── RTX 5090 — VANGUARD ──────────────────────────────────────────────────

  'msi-geforce-rtx-5090-32g-vanguard-oc': [
    'GeForce RTX 5090 32GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'Wave Curved 4.0 precision-engineered fin edges enhance airflow and reduce turbulence',
  ].join('\n'),

  'msi-geforce-rtx-5090-32g-vanguard-soc': [
    'GeForce RTX 5090 32GB GDDR7 | Blackwell architecture & DLSS 4 | Super OC',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'Wave Curved 4.0 precision-engineered fin edges enhance airflow and reduce turbulence',
  ].join('\n'),

  'msi-geforce-rtx-5090-32g-vanguard-soc-launch-edition': [
    'GeForce RTX 5090 32GB GDDR7 | Blackwell & DLSS 4 | SOC Launch Edition',
    'HYPER FROZR | Advanced thermal design for unparalleled cooling and quiet operation',
    'STORMFORCE Fan: seven blades, claw texturing and circular arc for optimal airflow',
    'Advanced Vapor Chamber swiftly transfers heat from GPU and VRAM to core pipe',
    'Square-shaped Core Pipes maximise heat dissipation with the Vapor Chamber',
    'Filled Fins cover core pipes to reduce turbulence and enhance cooling',
    'Wave Curved 4.0 precision-engineered fin edges enhance airflow and reduce turbulence',
  ].join('\n'),

  // ── RTX 5090 — VENTUS 3X ─────────────────────────────────────────────────

  'msi-geforce-rtx-5090-32g-ventus-3x': [
    'GeForce RTX 5090 32GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),

  'msi-geforce-rtx-5090-32g-ventus-3x-oc': [
    'GeForce RTX 5090 32GB GDDR7 | NVIDIA Blackwell architecture & DLSS 4 | OC Edition',
    'TORX Fan 5.0 Triple Fan | Ring-arc-linked blades stabilise high-pressure airflow',
    'Nickel-plated Copper Baseplate swiftly captures heat from GPU and memory',
    'Core Pipes with square design maximise contact with the GPU baseplate',
    'Metal Backplate strengthens the card while airflow vent reduces excess heat',
    'MSI Center software for real-time monitoring, tweaking and optimisation',
    'Afterburner software for full overclocking control and system monitoring',
  ].join('\n'),
}

export async function GET() {
  await connectDB()
  const results = []

  for (const [slug, shortDescription] of Object.entries(updates)) {
    const res = await Product.updateOne(
      { brandSlug: 'msi', slug },
      { $set: { shortDescription } }
    )
    results.push({ slug, updated: res.modifiedCount > 0 })
  }

  return NextResponse.json({ total: results.length, results })
}
