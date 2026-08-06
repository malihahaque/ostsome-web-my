// ─── CAMPAIGN DEAL PRICING (Launch Exclusive "Early Bird" + Clearance "One Season Off") ──
//
// Single source of truth for the promo/srp figures used by:
//   - LaunchExclusive.tsx / LaunchExclusivePage.tsx   ("Early Bird")
//   - OneSeasonOff.tsx / OneSeasonOffPage.tsx           ("Clearance")
//   - ProductDetail.tsx (PDP)
//
// These figures come from the brand manager's pricing sheet, NOT from
// products.ts / Shopify admin. products.ts price/comparePrice should NOT be
// relied on for these two campaigns — that mismatch (PDP showing a
// different price than the campaign card) is exactly the bug this file
// fixes. Update the arrays below whenever the sheet changes; every surface
// that shows a campaign price should import from here instead of keeping
// its own copy.
//
// ⚠️ REBUILT FOR MY — this file previously carried the SG fork's entries
// unchanged (BUTTONS, LOONA, KOSPET, MOBILE PIXELS, ROCCAT, HOHEM,
// DOMETIC, EDIZARD), none of which are stocked in the MY store. Replaced
// with the 10 SKUs (3 Launch, 7 Clearance) nominated on Mr. Boh's MY
// pricing sheet. Prices are already in RM — do not re-convert.
//
// ⚠️ NONE OF THE HANDLES BELOW HAVE BEEN VERIFIED AGAINST LIVE SHOPIFY.
// Arzopa, TurtleBeach, and Cleer had zero live MY inventory as of this
// sheet — the MY team has been asked to add it. Run
// scripts/update-campaign-prices.js --dry-run against the MY store
// (once that inventory lands) and correct any handle/SKU that doesn't
// match — this is the same workflow the old SG entries in this file's
// git history were cleaned up with.
//
// ⚠️ CHECKOUT: run scripts/update-campaign-prices.js (without --dry-run)
// against Shopify so the variant price/compareAtPrice actually match what's
// in this file — this file only controls what's DISPLAYED, not what Shopify
// charges.
//
// ⚠️ ARZOPA A1 GAMUT and A1T both show SRP = Launch Price on Mr. Boh's
// sheet (0% off) — flagged for him, may be a sheet gap.

export type CampaignType = 'launch' | 'clearance';

export interface CampaignDeal {
  handle: string;
  campaign: CampaignType;
  label: string;
  name: string;
  srp: number;
  promo: number;
  /**
   * Shopify SKU(s) this promo price applies to — every colour/variant
   * SKU that shares this exact price. Verified against live Shopify via
   * scripts/update-campaign-prices.js --dry-run on 28 Jul 2026.
   */
  skus?: string[];
}

// ── Launch Exclusive ("Early Bird") ──
//
// MY-SPECIFIC — rebuilt from scratch. The previous entries here were
// leftover from the SG fork (BUTTONS, LOONA, KOSPET, MOBILE PIXELS —
// none of these brands are stocked in the MY store) and pointed at
// products that don't exist in this catalog. Replaced with the 3 SKUs
// nominated on Mr. Boh's pricing sheet for MY.
//
// ⚠️ ALL HANDLES BELOW ARE UNVERIFIED GUESSES based on typical Shopify
// slug conventions — none of these have been confirmed against live
// Shopify yet (Arzopa and this specific Sennheiser Momentum 5 colorway
// were pending MY team upload as of this sheet). Run
// scripts/update-campaign-prices.js --dry-run against the MY store
// before this goes live, same as the SG workflow this file was built
// around. Update handles/skus here with whatever the dry-run confirms.
//
// ⚠️ ARZOPA A1 GAMUT and A1T both show SRP = Launch Price on the sheet
// (i.e. 0% off) — flagged for Mr. Boh, may be a sheet gap rather than
// intentional no-discount launch pricing.
const LAUNCH_DEALS: Omit<CampaignDeal, 'campaign'>[] = [
  { handle: 'arzopa-a1-gamut-15-6-fhd-portable-monitor-with-smart-cover', label: 'ARZOPA', name: 'A1 GAMUT 15.6" FHD 1080P Portable Monitor with Smart Cover', srp: 499, promo: 499, skus: ['AR-A1 GAMUT'] },
  { handle: 'arzopa-a1t-15-6-fhd-portable-monitor-with-touchscreen', label: 'ARZOPA', name: 'A1T 15.6" FHD 1080P Portable Monitor with Touchscreen', srp: 699, promo: 699, skus: ['AR-A1T'] },
  { handle: 'sennheiser-momentum-5-wireless-denim', label: 'SENNHEISER', name: 'Momentum 5 Wireless Noise-Canceling Headphones - Denim', srp: 1999, promo: 1899, skus: ['800080'] },
];

// ── Clearance ("One Season Off") ──
//
// MY-SPECIFIC — rebuilt from scratch. Previous entries were SG-fork
// leftovers (MOBILE PIXELS, ROCCAT, HOHEM, DOMETIC, EDIZARD — none
// stocked in MY) pointing at nonexistent products. Replaced with the
// 7 SKUs nominated on Mr. Boh's pricing sheet for MY.
//
// ⚠️ ALL HANDLES BELOW ARE UNVERIFIED GUESSES — TurtleBeach and Cleer
// had 0 live products in the MY store as of this sheet; MY team was
// asked to add this inventory. Run scripts/update-campaign-prices.js
// --dry-run against the MY store once that's done, and correct any
// handle here that doesn't match — same workflow as the SG entries
// this file used to contain.
const CLEARANCE_DEALS_SOURCE: Omit<CampaignDeal, 'campaign'>[] = [
  { handle: 'turtle-beach-xb-afterglow-wave-wired-controller-blue', label: 'TURTLE BEACH', name: "XB Afterglow Wave Wired Controller 'Blue'", srp: 199, promo: 149, skus: ['TBC-2002-25'] },
  { handle: 'cleer-arc-3-music-black', label: 'CLEER', name: 'ARC 3 Music Open-Ear Bluetooth Earbuds - Black', srp: 1199, promo: 299, skus: ['CL-6938741700467'] },
  { handle: 'cleer-arc-3-music-apricot', label: 'CLEER', name: 'ARC 3 Music Open-Ear Bluetooth Earbuds - Apricot', srp: 1199, promo: 299, skus: ['CL-6938741700504'] },
  { handle: 'cleer-arc-3-music-light-green', label: 'CLEER', name: 'ARC 3 Music Open-Ear Bluetooth Earbuds - Light Green', srp: 1199, promo: 299, skus: ['CL-6938741700511'] },
  { handle: 'cleer-arc-3-music-pro-black', label: 'CLEER', name: 'ARC 3 Music Pro Open-Ear Bluetooth Earbuds - Black', srp: 1399, promo: 299, skus: ['CL-6938741700801'] },
  { handle: 'sennheiser-cx80u-white', label: 'SENNHEISER', name: 'CX80U - White', srp: 199, promo: 129, skus: ['800151'] },
  { handle: 'sennheiser-cx80u-sakura', label: 'SENNHEISER', name: 'CX80U - Sakura', srp: 199, promo: 129, skus: ['800152'] },
];

export const CAMPAIGN_DEALS: CampaignDeal[] = [
  ...LAUNCH_DEALS.map(d => ({ ...d, campaign: 'launch' as const })),
  ...CLEARANCE_DEALS_SOURCE.map(d => ({ ...d, campaign: 'clearance' as const })),
];

// handle -> deal(s). Most handles map to exactly one deal; a few map to
// several — see the DATA GAP note at the top of this file.
const dealsByHandle: Record<string, CampaignDeal[]> = {};
for (const deal of CAMPAIGN_DEALS) {
  (dealsByHandle[deal.handle] ??= []).push(deal);
}

/**
 * Returns the active campaign deal for a product handle, or undefined if
 * it's not currently part of Launch Exclusive or Clearance.
 *
 * If a handle has multiple deals (see DATA GAP note at top of file), this
 * returns the FIRST one as a best-effort default — it will not
 * necessarily match the variant the customer has selected.
 */
export function getCampaignDeal(handle: string): CampaignDeal | undefined {
  return dealsByHandle[handle]?.[0];
}

/** True if this handle has more than one deal entry (the ambiguous case). */
export function hasAmbiguousCampaignDeal(handle: string): boolean {
  return (dealsByHandle[handle]?.length ?? 0) > 1;
}

/**
 * All deal entries for one campaign, in original sheet order. Duplicates
 * for the ambiguous multi-variant handles (see DATA GAP note above) are
 * preserved on purpose — this is what a "view all deals" page should
 * render, one card per entry.
 */
export function getDealsByCampaign(campaign: CampaignType): CampaignDeal[] {
  return CAMPAIGN_DEALS.filter(d => d.campaign === campaign);
}

// ── Homepage teaser subsets ──
// The homepage sections only show a curated handful of each campaign, not
// every deal. These lists are the "which ones" — order here is the order
// they appear on the homepage.

export const LAUNCH_FEATURED_HANDLES: string[] = [
  'arzopa-a1-gamut-15-6-fhd-portable-monitor-with-smart-cover',
  'arzopa-a1t-15-6-fhd-portable-monitor-with-touchscreen',
  'sennheiser-momentum-5-wireless-denim',
];

// 5 of the 7 full Clearance deals — leaving out the Cleer Apricot and
// Light Green variants here since Black covers the brand on the
// homepage teaser; all 7 still show on the full OneSeasonOffPage.
export const CLEARANCE_FEATURED_HANDLES: string[] = [
  'turtle-beach-xb-afterglow-wave-wired-controller-blue',
  'cleer-arc-3-music-black',
  'cleer-arc-3-music-pro-black',
  'sennheiser-cx80u-white',
  'sennheiser-cx80u-sakura',
];