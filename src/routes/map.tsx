import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ForestMap } from "@/components/ForestMap";
import { useT } from "@/lib/i18n";
import { SITES, scoreSite } from "@/lib/data";
import { useReports } from "@/lib/reports";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Live GIS Map — VanRakshak-AI" },
      { name: "description", content: "Interactive map of forest risk zones and community reports across India." },
      { property: "og:title", content: "Live GIS Map — VanRakshak-AI" },
      { property: "og:description", content: "See forest condition, reported issues and restoration priority areas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { t, lang } = useT();
  const { reports } = useReports();
  const [showSites, setShowSites] = useState(true);
  const [showReports, setShowReports] = useState(true);
  const [basemap, setBasemap] = useState<"satellite" | "streets">("satellite");
  const [focus, setFocus] = useState<{ lat: number; lng: number } | null>(null);
  const labels = useMemo(() => {
    const ks = ["critical", "high", "moderate", "low", "t_deforestation", "t_fire", "t_wildlife", "t_encroachment", "t_dumping", "t_other"];
    return Object.fromEntries(ks.map((k) => [k, t(k)]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  const ranked = [...SITES].map((s) => ({ s, ...scoreSite(s) })).sort((a, b) => b.score - a.score);

  return (
    <div className="relative h-[100svh] pt-0">
      <ForestMap className="absolute inset-0 z-0" reports={reports} showSites={showSites} showReports={showReports} basemap={basemap} focus={focus} labels={labels} />
      <aside className="glass absolute bottom-4 left-4 top-24 z-[500] hidden w-80 flex-col overflow-hidden rounded-3xl md:flex">
        <div className="border-b border-border p-5">
          <h1 className="text-2xl font-semibold">{t("nav_map")}</h1>
          <div className="mt-4 space-y-2 text-sm">
            <p className="font-mono text-xs uppercase text-muted-foreground">{t("layers")}</p>
            <label className="flex items-center gap-2"><input type="checkbox" checked={showSites} onChange={(e) => setShowSites(e.target.checked)} className="accent-primary" /> {t("l_sites")}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={showReports} onChange={(e) => setShowReports(e.target.checked)} className="accent-primary" /> {t("l_reports")} ({reports.length})</label>
            <p className="pt-2 font-mono text-xs uppercase text-muted-foreground">{t("basemap")}</p>
            <div className="flex gap-2">
              {(["satellite", "streets"] as const).map((b) => (
                <button key={b} onClick={() => setBasemap(b)} className={`rounded-full px-3 py-1.5 ${basemap === b ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{t(b)}</button>
              ))}
            </div>
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto p-2">
          {ranked.map(({ s, score, priority }) => (
            <li key={s.id}>
              <button onClick={() => setFocus({ lat: s.lat, lng: s.lng })} className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left hover:bg-secondary">
                <span>
                  <span className="block font-semibold">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.state}</span>
                </span>
                <span className="font-mono text-lg font-semibold" style={{ color: `var(--risk-${priority})` }}>{score}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-border p-3 text-xs">
          {(["critical", "high", "moderate", "low"] as const).map((p) => (
            <span key={p} className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: `var(--risk-${p})` }} />{t(p)}</span>
          ))}
        </div>
      </aside>
    </div>
  );
}
