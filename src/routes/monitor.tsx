import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useT } from "@/lib/i18n";
import { MONTHS, SITES, scoreSite } from "@/lib/data";
import satImg from "@/assets/satellite.jpg";

export const Route = createFileRoute("/monitor")({
  head: () => ({
    meta: [
      { title: "Forest Monitoring Dashboard — VanRakshak-AI" },
      { name: "description", content: "Vegetation, fire and habitat indicator trends for India's forest landscapes." },
      { property: "og:title", content: "Forest Monitoring — VanRakshak-AI" },
      { property: "og:description", content: "Twelve-month NDVI and fire trends per landscape." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Monitor,
});

const tip = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--foreground)" };

function Monitor() {
  const { t } = useT();
  const [id, setId] = useState(SITES[0]!.id);
  const s = SITES.find((x) => x.id === id)!;
  const { score, priority } = scoreSite(s);
  const series = MONTHS.map((m, i) => ({ m, ndvi: (s.trend[i] ?? 0) / 100, fires: s.fires[i] ?? 0 }));
  const radar = [
    { k: t("veg_loss"), v: s.vegetationLoss },
    { k: t("fire"), v: s.fireImpact },
    { k: t("habitat"), v: s.habitatDisturbance },
    { k: t("community"), v: s.communitySignal },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-semibold">{t("mon_title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("mon_sub")}</p>
        </div>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">{t("select_site")}</span>
          <select value={id} onChange={(e) => setId(e.target.value)} className="rounded-full border border-input bg-card px-4 py-2.5 outline-none">
            {SITES.map((x) => <option key={x.id} value={x.id}>{x.name} — {x.state}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        <div className="relative overflow-hidden rounded-3xl border border-border p-6 md:row-span-2">
          <img src={satImg} alt="NDVI satellite view" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="relative">
            <p className="font-mono text-xs uppercase text-muted-foreground">{t("risk")}</p>
            <p className="mt-2 font-mono text-7xl font-semibold" style={{ color: `var(--risk-${priority})` }}>{score}</p>
            <span className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase text-primary-foreground" style={{ background: `var(--risk-${priority})` }}>{t(priority)}</span>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between"><dt>{t("ndvi")}</dt><dd className="font-mono">{s.ndvi}</dd></div>
              <div className="flex justify-between"><dt>km²</dt><dd className="font-mono">{s.areaKm2}</dd></div>
              <div className="flex justify-between"><dt>{t("fire_alerts")}</dt><dd className="font-mono">{s.fires.reduce((a, b) => a + b, 0)}</dd></div>
            </dl>
          </div>
        </div>
        <Card title={t("ndvi_trend")} className="md:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={series}>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--chart-1)" stopOpacity={0.6} /><stop offset="1" stopColor="var(--chart-1)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={["auto", "auto"]} />
              <Tooltip contentStyle={tip} />
              <Area dataKey="ndvi" stroke="var(--chart-1)" strokeWidth={2} fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card title={t("priority")}>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radar}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="k" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
              <Radar dataKey="v" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card title={t("fire_alerts")} className="md:col-span-3">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={series}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={tip} cursor={{ fill: "var(--secondary)" }} />
              <Bar dataKey="fires" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        {radar.map((r) => (
          <div key={r.k} className="rounded-3xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{r.k}</p>
            <p className="mt-1 font-mono text-3xl font-semibold">{r.v}</p>
            <div className="mt-3 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${r.v}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-border bg-card p-5 ${className}`}>
      <p className="mb-3 text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}
