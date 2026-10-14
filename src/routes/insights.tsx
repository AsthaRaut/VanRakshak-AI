import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, MessageSquare } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SITES } from "@/lib/data";
import { computeRisk, priorityOf, communitySignalFromReports } from "@/lib/risk";
import { distanceKm, useReports } from "@/lib/reports";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Restoration Priority — VanRakshak-AI" },
      { name: "description", content: "Forest landscapes ranked by degradation risk with recommended restoration actions." },
      { property: "og:title", content: "Restoration Priority — VanRakshak-AI" },
      { property: "og:description", content: "Where restoration should begin, and what to do there." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Insights,
});

function Insights() {
  const { t } = useT();
  const { reports } = useReports();
  const rows = SITES.map((s) => {
    const nearby = reports.filter((r) => distanceKm(s, r) < 60).length;
    const communitySignal = Math.max(s.communitySignal, communitySignalFromReports(nearby));
    const score = computeRisk({ ...s, communitySignal });
    return { s, nearby, score, priority: priorityOf(score) };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <h1 className="text-5xl font-semibold">{t("ins_title")}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{t("ins_sub")}</p>
      <p className="mt-4 font-mono text-xs text-muted-foreground">score = 0.35·{t("veg_loss")} + 0.25·{t("fire")} + 0.20·{t("habitat")} + 0.20·{t("community")}</p>
      <ol className="mt-10 space-y-3">
        {rows.map(({ s, nearby, score, priority }, i) => (
          <li key={s.id} className="grid items-center gap-4 rounded-3xl border border-border bg-card p-5 md:grid-cols-[3rem_1.4fr_5rem_2fr]">
            <span className="font-mono text-2xl text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-xl font-semibold">{s.name}</p>
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{s.state}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{nearby} {t("nearby_reports")}</span>
              </p>
            </div>
            <div>
              <p className="font-mono text-3xl font-semibold" style={{ color: `var(--risk-${priority})` }}>{score}</p>
              <p className="text-xs uppercase" style={{ color: `var(--risk-${priority})` }}>{t(priority)}</p>
            </div>
            <div className="text-sm">
              <p className="font-mono text-xs uppercase text-muted-foreground">{t("action")}</p>
              <p className="mt-1">{t("a_" + priority)}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link to="/map" className="mt-10 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">{t("cta_map")}</Link>
    </div>
  );
}
