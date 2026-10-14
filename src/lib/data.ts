import { computeRisk, priorityOf, type Indicators, type Priority } from "./risk";

export interface ForestSite extends Indicators {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  areaKm2: number;
  ndvi: number;
  trend: number[]; // NDVI x100, last 12 months
  fires: number[]; // fire alerts per month
}

const raw: Omit<ForestSite, "trend" | "fires">[] = [
  { id: "simlipal", name: "Similipal", state: "Odisha", lat: 21.85, lng: 86.35, areaKm2: 2750, ndvi: 0.58, vegetationLoss: 62, fireImpact: 88, habitatDisturbance: 55, communitySignal: 48 },
  { id: "sundarbans", name: "Sundarbans", state: "West Bengal", lat: 21.95, lng: 88.9, areaKm2: 4260, ndvi: 0.61, vegetationLoss: 70, fireImpact: 10, habitatDisturbance: 78, communitySignal: 60 },
  { id: "jim-corbett", name: "Corbett Landscape", state: "Uttarakhand", lat: 29.53, lng: 78.77, areaKm2: 1318, ndvi: 0.66, vegetationLoss: 38, fireImpact: 74, habitatDisturbance: 42, communitySignal: 36 },
  { id: "hasdeo", name: "Hasdeo Arand", state: "Chhattisgarh", lat: 22.75, lng: 82.6, areaKm2: 1700, ndvi: 0.52, vegetationLoss: 86, fireImpact: 30, habitatDisturbance: 90, communitySignal: 84 },
  { id: "western-ghats", name: "Kodagu Ghats", state: "Karnataka", lat: 12.42, lng: 75.74, areaKm2: 2100, ndvi: 0.74, vegetationLoss: 30, fireImpact: 18, habitatDisturbance: 40, communitySignal: 24 },
  { id: "kaziranga", name: "Kaziranga", state: "Assam", lat: 26.58, lng: 93.17, areaKm2: 1030, ndvi: 0.71, vegetationLoss: 22, fireImpact: 12, habitatDisturbance: 46, communitySignal: 20 },
  { id: "aravalli", name: "Aravalli Belt", state: "Haryana", lat: 28.35, lng: 77.15, areaKm2: 880, ndvi: 0.34, vegetationLoss: 80, fireImpact: 40, habitatDisturbance: 72, communitySignal: 66 },
  { id: "satpura", name: "Satpura", state: "Madhya Pradesh", lat: 22.5, lng: 78.3, areaKm2: 1427, ndvi: 0.63, vegetationLoss: 35, fireImpact: 58, habitatDisturbance: 30, communitySignal: 22 },
  { id: "nilgiri", name: "Nilgiri Biosphere", state: "Tamil Nadu", lat: 11.4, lng: 76.7, areaKm2: 5520, ndvi: 0.77, vegetationLoss: 18, fireImpact: 22, habitatDisturbance: 26, communitySignal: 14 },
  { id: "tadoba", name: "Tadoba-Andhari", state: "Maharashtra", lat: 20.25, lng: 79.37, areaKm2: 1727, ndvi: 0.6, vegetationLoss: 44, fireImpact: 64, habitatDisturbance: 38, communitySignal: 40 },
  { id: "dampa", name: "Dampa Reserve", state: "Mizoram", lat: 23.7, lng: 92.4, areaKm2: 500, ndvi: 0.69, vegetationLoss: 56, fireImpact: 70, habitatDisturbance: 34, communitySignal: 28 },
  { id: "gir", name: "Gir Forest", state: "Gujarat", lat: 21.13, lng: 70.82, areaKm2: 1412, ndvi: 0.48, vegetationLoss: 40, fireImpact: 26, habitatDisturbance: 52, communitySignal: 30 },
];

function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

export const SITES: ForestSite[] = raw.map((r, idx) => {
  const rnd = seeded(idx + 7);
  const base = r.ndvi * 100;
  const trend = Array.from({ length: 12 }, (_, m) =>
    Math.round(base + 10 - (r.vegetationLoss / 100) * m * 1.3 + (rnd() - 0.5) * 6 + Math.sin(m / 2) * 4),
  );
  const fires = Array.from({ length: 12 }, (_, m) => {
    const season = m >= 1 && m <= 4 ? 1.8 : 0.4;
    return Math.round((r.fireImpact / 10) * season * (0.6 + rnd()));
  });
  return { ...r, trend, fires };
});

export const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export function scoreSite(s: Indicators): { score: number; priority: Priority } {
  const score = computeRisk(s);
  return { score, priority: priorityOf(score) };
}
