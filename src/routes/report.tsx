import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Camera, LocateFixed, Send } from "lucide-react";
import { ForestMap } from "@/components/ForestMap";
import { useT } from "@/lib/i18n";
import { useReports, type ReportType } from "@/lib/reports";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Community Forest Report — VanRakshak-AI" },
      { name: "description", content: "Submit a geo-tagged forest observation with photos in under a minute." },
      { property: "og:title", content: "Report a forest issue — VanRakshak-AI" },
      { property: "og:description", content: "Tree cutting, fire, wildlife concerns — put them on the map." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportPage,
});

const TYPES: ReportType[] = ["deforestation", "fire", "wildlife", "encroachment", "dumping", "other"];

function compress(file: File): Promise<string> {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      const k = Math.min(1, 640 / img.width);
      c.width = img.width * k;
      c.height = img.height * k;
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      res(c.toDataURL("image/jpeg", 0.7));
    };
    img.src = URL.createObjectURL(file);
  });
}

function ReportPage() {
  const { t } = useT();
  const { reports, add } = useReports();
  const [name, setName] = useState("");
  const [type, setType] = useState<ReportType>("deforestation");
  const [desc, setDesc] = useState("");
  const [sev, setSev] = useState(3);
  const [pt, setPt] = useState<{ lat: number; lng: number } | null>(null);
  const [photo, setPhoto] = useState<string>();

  const gps = () =>
    navigator.geolocation.getCurrentPosition(
      (p) => setPt({ lat: +p.coords.latitude.toFixed(4), lng: +p.coords.longitude.toFixed(4) }),
      () => toast.error("Location permission denied — click on the map instead."),
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pt) { toast.error(t("pick_map")); return; }
    if (!name.trim() || desc.trim().length < 5) { toast.error(t("description")); return; }
    add({ name: name.trim().slice(0, 60), type, description: desc.trim().slice(0, 500), lat: pt.lat, lng: pt.lng, photo, severity: sev });
    toast.success(t("submitted"));
    setDesc(""); setPhoto(undefined); setPt(null);
  };

  const input = "w-full rounded-2xl border border-input bg-secondary px-4 py-3 outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <h1 className="text-5xl font-semibold">{t("rep_title")}</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">{t("rep_sub")}</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-border bg-card p-6">
          <label className="block text-sm">{t("your_name")}<input className={`${input} mt-1`} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} /></label>
          <div className="text-sm">
            {t("issue_type")}
            <div className="mt-2 flex flex-wrap gap-2">
              {TYPES.map((x) => (
                <button type="button" key={x} onClick={() => setType(x)} className={`rounded-full px-3 py-1.5 text-sm ${type === x ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{t("t_" + x)}</button>
              ))}
            </div>
          </div>
          <label className="block text-sm">{t("description")}<textarea className={`${input} mt-1 h-28`} value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={500} /></label>
          <label className="block text-sm">{t("severity")}: <span className="font-mono text-accent">{sev}/5</span>
            <input type="range" min={1} max={5} value={sev} onChange={(e) => setSev(+e.target.value)} className="mt-2 w-full accent-primary" />
          </label>
          <div className="text-sm">
            {t("location")}: <span className="font-mono text-primary">{pt ? `${pt.lat}, ${pt.lng}` : "—"}</span>
            <div className="mt-2 flex items-center gap-3">
              <button type="button" onClick={gps} className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2"><LocateFixed className="h-4 w-4" />{t("use_gps")}</button>
              <span className="text-muted-foreground">{t("pick_map")}</span>
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-input p-4 text-sm">
            <Camera className="h-5 w-5 text-primary" />
            {photo ? <img src={photo} alt="preview" className="h-16 rounded-lg" /> : t("photo")}
            <input type="file" accept="image/*" className="hidden" onChange={async (e) => e.target.files?.[0] && setPhoto(await compress(e.target.files[0]))} />
          </label>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground hover:brightness-110"><Send className="h-4 w-4" />{t("submit")}</button>
        </form>
        <div className="space-y-4">
          <ForestMap className="h-[420px] overflow-hidden rounded-3xl border border-border" showSites={false} reports={reports} onPick={setPt} picked={pt} basemap="streets" />
          <div className="rounded-3xl border border-border bg-card p-5">
            <p className="mb-3 font-semibold">{t("recent")}</p>
            <ul className="max-h-72 space-y-3 overflow-y-auto">
              {reports.slice(0, 8).map((r) => (
                <li key={r.id} className="flex gap-3 rounded-2xl bg-secondary p-3">
                  {r.photo && <img src={r.photo} alt="" className="h-14 w-14 rounded-xl object-cover" />}
                  <div className="text-sm">
                    <p className="font-semibold">{t("t_" + r.type)} <span className="font-mono text-accent">· {r.severity}/5</span></p>
                    <p className="text-muted-foreground">{r.description}</p>
                    <p className="text-xs text-muted-foreground">{r.name} · {new Date(r.createdAt).toLocaleDateString("en-IN")}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
