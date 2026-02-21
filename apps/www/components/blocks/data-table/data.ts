type DealStage = "Active" | "Contract" | "Discovery" | "Pilot";
type DealRegion = "APAC" | "Europe" | "LATAM" | "North America";
type DealPriority = "Low" | "Medium" | "High";
export type Action = { id: number; name: string; url: string; owner: string };

export type DealRow = {
  account_name: string;
  annual_value: number;
  id: number;
  owner: string;
  priority: DealPriority;
  region: DealRegion;
  renewal_date: string;
  seats: number;
  stage: DealStage;
  select?: string;
  action?: Action;
};

const ACCOUNT_PREFIXES = [
  "Atlas",
  "Beacon",
  "Cascade",
  "Nimbus",
  "Orion",
  "Pioneer",
  "Summit",
  "Vertex",
  "Quantum",
  "Nova",
  "Echo",
  "Horizon",
  "Zenith",
  "Apex",
  "Vortex",
];

export const OWNER_NAMES = [
  "Alex Rivera",
  "Casey Morgan",
  "Jamie Chen",
  "Jordan Lee",
  "Morgan Patel",
  "Riley Kim",
  "Sam Bennett",
  "Taylor Brooks",
  "Avery West",
  "Cameron Silva",
  "Drew Parker",
  "Quinn Hayes",
];

export const REGIONS: readonly DealRegion[] = [
  "North America",
  "Europe",
  "APAC",
  "LATAM",
];

export const STAGES: readonly DealStage[] = [
  "Discovery",
  "Pilot",
  "Contract",
  "Active",
];

export const STAGE_STYLES: Record<DealStage, string> = {
  Active: "bg-emerald-500/10 text-emerald-500",
  Contract: "bg-blue-500/10 text-blue-500",
  Discovery: "bg-slate-500/10 text-slate-500",
  Pilot: "bg-pink-500/10 text-pink-500",
};

export const PRIORITIES: readonly DealPriority[] = ["Low", "Medium", "High"];

export const PRIORITIES_STYLES: Record<DealPriority, string> = {
  High: "bg-red-500/10 text-red-500",
  Low: "bg-muted text-muted-foreground",
  Medium: "bg-yellow-500/10 text-yellow-500",
};

export const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

export const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const DEAL_ROWS = generateDeals(240);

// Simple seeded random to provide varied data, improved to prevent clustering
function srng(seed: number) {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  const x = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  return x;
}

function generateDeals(count: number): DealRow[] {
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);
  const pastWindowDays = 730;

  return Array.from({ length: count }, (_, index) => {
    const r1 = srng(index * 1.1);
    const r2 = srng(index * 2.2);
    const r3 = srng(index * 3.3);
    const r4 = srng(index * 4.4);
    const r5 = srng(index * 5.5);
    const r6 = srng(index * 6.6);
    const r7 = srng(index * 7.7);

    const renewalDate = new Date(baseDate);
    const recencyWeight = r1 ** 2.8;
    const offsetDays = -Math.floor(recencyWeight * pastWindowDays);
    renewalDate.setDate(baseDate.getDate() + offsetDays);

    return {
      account_name: `${ACCOUNT_PREFIXES[Math.floor(r2 * ACCOUNT_PREFIXES.length)]} Systems ${String.fromCharCode(
        65 + Math.floor(r3 * 26),
      )}`,
      annual_value: 5000 + Math.floor(r4 * 245000), // Random value between 5k and 250k
      id: 1001 + index,
      owner: OWNER_NAMES[Math.floor(r5 * OWNER_NAMES.length)],
      priority: PRIORITIES[Math.floor(r6 * PRIORITIES.length)],
      region: REGIONS[Math.floor(r7 * REGIONS.length)],
      renewal_date: formatISODate(renewalDate),
      seats: 5 + Math.floor(srng(index * 8.8) * 195), // 5 to 200 seats
      stage: STAGES[Math.floor(srng(index * 9.9) * STAGES.length)],
    };
  });
}

function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
