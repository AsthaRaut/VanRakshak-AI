import { useEffect, useState, useCallback } from "react";

export type ReportType = "deforestation" | "fire" | "wildlife" | "encroachment" | "dumping" | "other";

export interface CommunityReport {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  lat: number;
  lng: number;
  photo?: string | undefined;
  createdAt: string;
  severity: number; // 1-5
}

const KEY = "vanrakshak.reports.v1";
const EVT = "vanrakshak:reports";

const SEED: CommunityReport[] = [
  { id: "s1", name: "Ramesh Oraon", type: "deforestation", description: "Fresh tree stumps near the mine boundary, around 40 sal trees cut.", lat: 22.78, lng: 82.62, createdAt: "2026-10-08T06:20:00Z", severity: 5 },
  { id: "s2", name: "Lakshmi D.", type: "fire", description: "Smoke seen on the eastern ridge since morning.", lat: 21.88, lng: 86.4, createdAt: "2026-10-09T11:05:00Z", severity: 4 },
  { id: "s3", name: "Forest Watch Club", type: "dumping", description: "Construction debris dumped inside the green belt.", lat: 28.4, lng: 77.12, createdAt: "2026-10-10T09:40:00Z", severity: 3 },
  { id: "s4", name: "Anil Mondal", type: "wildlife", description: "Mangrove die-back, crabs and birds have reduced.", lat: 21.9, lng: 88.85, createdAt: "2026-10-11T04:15:00Z", severity: 4 },
];

function read(): CommunityReport[] {
  if (typeof window === "undefined") return SEED;
  try {
    const v = localStorage.getItem(KEY);
    return v ? JSON.parse(v) : SEED;
  } catch {
    return SEED;
  }
}

export function useReports() {
  const [reports, setReports] = useState<CommunityReport[]>(SEED);
  useEffect(() => {
    setReports(read());
    const h = () => setReports(read());
    window.addEventListener(EVT, h);
    return () => window.removeEventListener(EVT, h);
  }, []);
  const add = useCallback((r: Omit<CommunityReport, "id" | "createdAt">) => {
    const next = [{ ...r, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...read()];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      localStorage.setItem(KEY, JSON.stringify(next.map((x) => ({ ...x, photo: undefined }))));
    }
    window.dispatchEvent(new Event(EVT));
  }, []);
  return { reports, add };
}

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
