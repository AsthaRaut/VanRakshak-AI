import { createFileRoute, Link } from "@tanstack/react-router";
import { Satellite, Users, Cpu, Map, Sprout, Activity, ArrowRight, Flame, ShieldCheck, Building2, GraduationCap } from "lucide-react";
import heroImg from "@/assets/hero-forest.jpg";
import communityImg from "@/assets/community.jpg";
import satImg from "@/assets/satellite.jpg";
import fireImg from "@/assets/fire.jpg";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import { useT } from "@/lib/i18n";
import { SITES, scoreSite } from "@/lib/data";
import { useReports } from "@/lib/reports";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VanRakshak-AI — Forest Restoration Intelligence for India" },
      { name: "description", content: "Satellite signals, GIS maps and community reports showing where India's forests need restoration first." },
      { property: "og:title", content: "VanRakshak-AI — Every forest has a pulse" },
      { property: "og:description", content: "Monitor degradation, map risk and prioritise restoration across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useT();
  const { reports } = useReports();
  const area = SITES.reduce((a, s) => a + s.areaKm2, 0);
  const critical = SITES.filter((s) => scoreSite(s).priority === "critical").length;

  const chain = [
    { i: Satellite, k: "c1" }, { i: Users, k: "c2" }, { i: Cpu, k: "c3" }, { i: Activity, k: "c4" }, { i: Map, k: "c5" },
  ];
  const features = [
    { i: Activity, k: "f1", img: fireImg, to: "/monitor" },
    { i: Map, k: "f2", img: satImg, to: "/map" },
    { i: Cpu, k: "f3", to: "/insights" },
    { i: Users, k: "f4", img: communityImg, to: "/report" },
    { i: Sprout, k: "f5", to: "/insights" },
  ] as const;

  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <video autoPlay muted loop playsInline poster={heroImg} className="absolute inset-0 h-full w-full object-cover">
          <source src={heroVideo.url} type="video/mp4" />
        </video>
        <div className="bg-hero-fade absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40">
          <span className="rise glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
            <span className="pulse-dot h-2 w-2 rounded-full bg-primary" /> {t("hero_tag")}
          </span>
          <h1 className="rise mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl" style={{ animationDelay: ".1s" }}>
            {t("hero_title")}
          </h1>
          <p className="rise mt-6 max-w-2xl text-lg text-cream/80" style={{ animationDelay: ".2s" }}>{t("hero_sub")}</p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: ".3s" }}>
            <Link to="/map" className="shadow-glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110">
              {t("cta_map")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/report" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">{t("cta_report")}</Link>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border md:grid-cols-4">
            {[
              [SITES.length, t("stat_sites")],
              [area.toLocaleString("en-IN"), t("stat_area")],
              [reports.length, t("stat_reports")],
              [critical, t("stat_critical")],
            ].map(([v, l]) => (
              <div key={String(l)} className="glass rounded-none border-0 p-5">
                <div className="font-mono text-3xl font-semibold text-primary">{v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-glow px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-semibold md:text-5xl">{t("chain_title")}</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">{t("chain_sub")}</p>
          <div className="mt-12 grid gap-3 md:grid-cols-5">
            {chain.map(({ i: I, k }, idx) => (
              <div key={k} className="relative rounded-3xl border border-border bg-card p-6">
                <span className="font-mono text-xs text-muted-foreground">0{idx + 1}</span>
                <I className="mt-6 h-8 w-8 text-primary" />
                <p className="mt-4 font-semibold">{t(k)}</p>
                {idx < 4 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-primary p-1 text-primary-foreground md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-semibold md:text-5xl">{t("f_title")}</h2>
          <div className="mt-12 grid auto-rows-[260px] gap-4 md:grid-cols-6">
            {features.map((f, idx) => {
              const span = ["md:col-span-4", "md:col-span-2 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-6"][idx];
              const I = f.i;
              return (
                <Link key={f.k} to={f.to} className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-7 ${span}`}>
                  {"img" in f && f.img && (
                    <>
                      <img src={f.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-70" />
                      <div className="bg-hero-fade absolute inset-0" />
                    </>
                  )}
                  <div className="relative flex h-full flex-col justify-end">
                    <I className="mb-auto h-9 w-9 text-primary" />
                    <h3 className="text-2xl font-semibold">{t(f.k)}</h3>
                    <p className="mt-2 max-w-md text-sm text-cream/75">{t(f.k + "d")}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border py-6">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl text-muted-foreground">
          {[...SITES, ...SITES].map((s, i) => {
            const { score, priority } = scoreSite(s);
            return (
              <span key={i} className="flex items-center gap-3">
                <Flame className="h-5 w-5" style={{ color: `var(--risk-${priority})` }} /> {s.name}, {s.state}
                <span className="font-mono text-base" style={{ color: `var(--risk-${priority})` }}>{score}</span>
              </span>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-2xl text-4xl font-semibold md:text-5xl">{t("impact_title")}</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { i: ShieldCheck, k: "i1" }, { i: Sprout, k: "i2" }, { i: Users, k: "i3" }, { i: GraduationCap, k: "i4" },
            ].map(({ i: I, k }) => (
              <div key={k} className="rounded-3xl border border-border bg-card p-6">
                <I className="h-7 w-7 text-accent" />
                <h3 className="mt-5 text-xl font-semibold">{t(k)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(k + "d")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
          <img src={communityImg} alt="Community planting saplings" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="bg-hero-fade absolute inset-0" />
          <div className="relative flex min-h-[420px] flex-col justify-end p-10">
            <Building2 className="hidden" />
            <h2 className="max-w-xl text-4xl font-semibold md:text-5xl">{t("join_title")}</h2>
            <p className="mt-3 max-w-lg text-cream/80">{t("join_sub")}</p>
            <Link to="/report" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground">
              {t("cta_report")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
