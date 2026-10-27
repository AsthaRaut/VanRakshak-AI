import { useEffect, useRef } from "react";
import type * as L from "leaflet";
import { SITES, scoreSite } from "@/lib/data";
import type { Priority } from "@/lib/risk";
const HEX: Record<Priority, string> = { critical: "#e5484d", high: "#f08c3a", moderate: "#e8d36a", low: "#6fd38a" };
import type { CommunityReport } from "@/lib/reports";

interface Props {
  reports?: CommunityReport[];
  showSites?: boolean;
  showReports?: boolean;
  basemap?: "satellite" | "streets";
  onPick?: (p: { lat: number; lng: number }) => void;
  picked?: { lat: number; lng: number } | null;
  focus?: { lat: number; lng: number; zoom?: number } | null;
  className?: string;
  labels?: Record<string, string>;
}

const TILES = {
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  streets: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

export function ForestMap({ reports = [], showSites = true, showReports = true, basemap = "satellite", onPick, picked, focus, className, labels = {} }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const lib = useRef<typeof L | null>(null);
  const tile = useRef<L.TileLayer | null>(null);
  const siteLayer = useRef<L.LayerGroup | null>(null);
  const repLayer = useRef<L.LayerGroup | null>(null);
  const pickLayer = useRef<L.LayerGroup | null>(null);
  const pickCb = useRef(onPick);
  pickCb.current = onPick;

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((mod) => {
      const Lf = (mod as unknown as { default: typeof L }).default ?? (mod as unknown as typeof L);
      if (cancelled || !el.current || map.current) return;
      lib.current = Lf;
      const m = Lf.map(el.current, { center: [22.5, 80], zoom: 5, zoomControl: true, attributionControl: true });
      map.current = m;
      siteLayer.current = Lf.layerGroup().addTo(m);
      repLayer.current = Lf.layerGroup().addTo(m);
      pickLayer.current = Lf.layerGroup().addTo(m);
      m.on("click", (e: L.LeafletMouseEvent) => pickCb.current?.({ lat: +e.latlng.lat.toFixed(4), lng: +e.latlng.lng.toFixed(4) }));
      draw();
    });
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function draw() {
    const Lf = lib.current;
    const m = map.current;
    if (!Lf || !m) return;
    tile.current?.remove();
    tile.current = Lf.tileLayer(TILES[basemap], { attribution: basemap === "satellite" ? "Esri World Imagery" : "© OpenStreetMap © CARTO", maxZoom: 18 }).addTo(m);
    siteLayer.current?.clearLayers();
    if (showSites) {
      SITES.forEach((s) => {
        const { score, priority } = scoreSite(s);
        const c = HEX[priority];
        const radius = Math.sqrt(s.areaKm2) * 420;
        Lf.circle([s.lat, s.lng], { radius, color: c, weight: 2, fillColor: c, fillOpacity: 0.28 })
          .bindPopup(
            `<div style="min-width:180px"><div style="font-weight:700;font-size:15px">${s.name}</div><div style="opacity:.7">${s.state} · ${s.areaKm2} km²</div><div style="margin-top:8px;font-size:22px;font-weight:800;color:${c}">${score}<span style="font-size:12px;opacity:.7"> / 100</span></div><div style="text-transform:uppercase;font-size:11px;letter-spacing:.08em;color:${c}">${labels[priority] ?? priority}</div><div style="margin-top:6px;font-size:12px">NDVI ${s.ndvi}</div></div>`,
          )
          .addTo(siteLayer.current!);
      });
    }
    repLayer.current?.clearLayers();
    if (showReports) {
      reports.forEach((r) => {
        Lf.circleMarker([r.lat, r.lng], { radius: 7, color: "#fff", weight: 2, fillColor: "#f08c3a", fillOpacity: 1 })
          .bindPopup(
            `<div style="max-width:220px">${r.photo ? `<img src="${r.photo}" style="width:100%;border-radius:8px;margin-bottom:6px"/>` : ""}<b>${escape(labels["t_" + r.type] ?? r.type)}</b><div style="font-size:12px;margin:4px 0">${escape(r.description)}</div><div style="font-size:11px;opacity:.7">${escape(r.name)} · ${new Date(r.createdAt).toLocaleDateString()}</div></div>`,
          )
          .addTo(repLayer.current!);
      });
    }
    pickLayer.current?.clearLayers();
    if (picked) Lf.circleMarker([picked.lat, picked.lng], { radius: 10, color: "#c6f04a", weight: 3, fillOpacity: 0.4 }).addTo(pickLayer.current!);
  }

  useEffect(draw, [reports, showSites, showReports, basemap, picked, labels]);
  useEffect(() => {
    if (focus && map.current) map.current.flyTo([focus.lat, focus.lng], focus.zoom ?? 9, { duration: 1.2 });
  }, [focus]);

  return <div ref={el} className={className} />;
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
