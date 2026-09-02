// src/app/data/campaignDeals.ts
//
// Single source of truth for Launch Exclusive and One Season Off (Clearance)
// campaign pricing on the MY site. Never hardcode srp/promo in the
// components that consume this — that's what caused the PDP price
// mismatch bug previously.
//
// PRICING RULE: `srp` = the live price shown on the product page
// (ostsome-my.netlify.app), NOT always the sheet's "SRP" column — the two
// sometimes differ (e.g. Arzopa A1 GAMUT: sheet says RM499, live site
// shows RM549) and the live price is what a customer will actually see
// struck-through, so it has to match. `promo` = the sheet's Launch
// Price / Clearance Price column, always.
//
// Handles verified directly against live product pages on
// ostsome-my.netlify.app via screenshot (Sep 2, 2026).

export type CampaignDeal = {
  handle: string;
  name: string;
  label: string;
  srp: number;
  promo: number;
};

// ─── LAUNCH EXCLUSIVE ────────────────────────────────────────────────────

const LAUNCH_DEALS: CampaignDeal[] = [
  {
    handle: 'arzopa-a1-gamut-15-6-fhd-1080p-portable-monitor-with-smart-cover',
    name: 'ARZOPA A1 GAMUT 15.6" FHD 1080P Portable Monitor with Smart Cover',
    label: 'Launch Exclusive',
    srp: 549,
    promo: 499,
  },
  {
    handle: 'arzopa-a1t-15-6-fhd-1080p-portable-monitor-with-touchscreen-arzopa-portable-monitor',
    name: 'ARZOPA A1T 15.6" FHD 1080P Portable Monitor with Touchscreen',
    label: 'Launch Exclusive',
    srp: 749,
    promo: 699,
  },
  {
    handle: 'sennheiser-momentum-5-wireless-noise-canceling-headphones',
    name: 'Sennheiser Momentum 5 Wireless Noise-Canceling Headphones — Denim',
    label: 'Launch Exclusive',
    srp: 1999,
    promo: 1899,
  },
];

export const LAUNCH_FEATURED_HANDLES = LAUNCH_DEALS.map(d => d.handle);

// ─── CLEARANCE (One Season Off) ─────────────────────────────────────────
//
// DATA GAP, resolved Sep 2 2026: Mr. Boh's sheet lists 7 SKUs, but only 3
// real Shopify products exist. "Cleer ARC 3 Music" (Black/Apricot/Light
// Green) and "Music Pro" (Black) are ONE product
// (cleer-ai-open-bluetooth-earbuds-cleer-arc-3-music-music-pro) with 4
// color variants, not 4 separate products. "Sennheiser CX80U" White and
// Sakura are ONE product (sennheiser-cx-80u-wired-earphones) with color
// variants too. Do not re-split these into multiple entries — the PDP is
// a single page with a color swatch selector for each.
//
// Note: the sheet lists a different SRP for Cleer "Music Pro - Black"
// (RM1399) vs. the other 3 Music colors (RM1199), but since it's the same
// Shopify product/base price, the live PDP shows RM1199 — flagged for
// Mr. Boh to confirm if Music Pro should actually be priced differently.

const CLEARANCE_DEALS: CampaignDeal[] = [
  {
    handle: 'turtle-beach-afterglow-wave-wired-controller-for-pc',
    name: 'Turtle Beach XB Afterglow Wave Wired Controller',
    label: 'Clearance',
    srp: 219,
    promo: 149,
  },
  {
    handle: 'cleer-ai-open-bluetooth-earbuds-cleer-arc-3-music-music-pro',
    name: 'Cleer AI Open Bluetooth Earbuds - Cleer ARC 3 Music',
    label: 'Clearance',
    srp: 1199,
    promo: 299,
  },
  {
    handle: 'sennheiser-cx-80u-wired-earphones',
    name: 'Sennheiser CX80U Wired Earphones',
    label: 'Clearance',
    srp: 199,
    promo: 129,
  },
];

export const CLEARANCE_FEATURED_HANDLES = CLEARANCE_DEALS.map(d => d.handle);

// ─── Lookups ─────────────────────────────────────────────────────────────

const ALL_DEALS: CampaignDeal[] = [...LAUNCH_DEALS, ...CLEARANCE_DEALS];

export function getCampaignDeal(handle: string): CampaignDeal | undefined {
  return ALL_DEALS.find(d => d.handle === handle);
}

export function getDealsByCampaign(campaign: 'launch' | 'clearance'): CampaignDeal[] {
  return campaign === 'launch' ? LAUNCH_DEALS : CLEARANCE_DEALS;
}