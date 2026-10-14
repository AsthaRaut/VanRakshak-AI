export type Priority = "critical" | "high" | "moderate" | "low";

export interface Indicators {
  vegetationLoss: number; // 0-100
  fireImpact: number; // 0-100
  habitatDisturbance: number; // 0-100
  communitySignal: number; // 0-100
}

export const WEIGHTS = {
  vegetationLoss: 0.35,
  fireImpact: 0.25,
  habitatDisturbance: 0.2,
  communitySignal: 0.2,
} as const;

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function computeRisk(i: Indicators): number {
  const s =
    clamp(i.vegetationLoss) * WEIGHTS.vegetationLoss +
    clamp(i.fireImpact) * WEIGHTS.fireImpact +
    clamp(i.habitatDisturbance) * WEIGHTS.habitatDisturbance +
    clamp(i.communitySignal) * WEIGHTS.communitySignal;
  return Math.round(s);
}

export function priorityOf(score: number): Priority {
  if (score >= 70) return "critical";
  if (score >= 50) return "high";
  if (score >= 30) return "moderate";
  return "low";
}

/** Each community report adds 12 points of community signal, capped at 100. */
export function communitySignalFromReports(count: number): number {
  return clamp(count * 12);
}

export const priorityColor: Record<Priority, string> = {
  critical: "var(--risk-critical)",
  high: "var(--risk-high)",
  moderate: "var(--risk-moderate)",
  low: "var(--risk-low)",
};
