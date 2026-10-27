import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-forest.jpg";
import fireImg from "@/assets/fire.jpg";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VanRakshak-AI by Team TerraPulse" },
      { name: "description", content: "The team, problem, data and roadmap behind VanRakshak-AI, a Code4Nature (FES) prototype." },
      { property: "og:title", content: "About VanRakshak-AI" },
      { property: "og:description", content: "Team TerraPulse, Navgurukul — forest restoration decision support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const TEAM = [
  { n: "Astha Yuvraj Raut", r: "Team Lead" },
  { n: "Nishu Kumari", r: "Member" },
  { n: "Swati Wadekar", r: "Member" },
  { n: "Prathibha Maurya", r: "Member" },
];

function About() {
  const { t } = useT();
  return (
    <div className="pb-20">
      <section className="relative h-[60vh] overflow-hidden">
        <img src={heroImg} alt="Indian forest at dawn" className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-hero-fade absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
          <h1 className="text-5xl font-semibold md:text-6xl">{t("about_title")}</h1>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-16 md:grid-cols-2">
        <div className="space-y-6 text-lg leading-relaxed text-cream/85">
          <h2 className="text-3xl font-semibold text-foreground">Problem</h2>
          <p>Forest degradation appears through vegetation loss, deforestation, fires and habitat disturbance — hard to monitor consistently across large, changing landscapes. Local observations are often informal. The gap is turning these signals into one clear, location-based view of where restoration is most needed.</p>
          <h2 className="text-3xl font-semibold text-foreground">Approach</h2>
          <p>Data → insight → priority → action. VanRakshak-AI integrates satellite indicators, community reports and weighted risk analysis into a single restoration priority map.</p>
          <h2 className="text-3xl font-semibold text-foreground">Data & stack</h2>
          <p>Inputs: remote-sensing / NDVI indicators, fire data, geospatial boundaries, environmental observations and community reports. Runs on any laptop or phone with internet. The prototype uses representative sample data; verified datasets (e.g. Sentinel-2, FIRMS fire alerts) and stronger ML models can be connected as it matures.</p>
        </div>
        <div className="space-y-6">
          <img src={fireImg} alt="Forest fire" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="font-mono text-xs uppercase text-muted-foreground">Team TerraPulse · Navgurukul</p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {TEAM.map((m) => (
                <li key={m.n} className="rounded-2xl bg-secondary p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">{m.n[0]}</span>
                  <p className="mt-3 font-semibold">{m.n}</p>
                  <p className="text-xs text-muted-foreground">{m.r}</p>
                </li>
              ))}
            </ul>
            <a href="mailto:astharaut25@navgurukul.org" className="mt-4 inline-block text-sm text-primary">astharaut25@navgurukul.org</a>
          </div>
        </div>
      </div>
    </div>
  );
}
