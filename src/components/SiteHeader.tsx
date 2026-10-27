import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Languages, Menu, X, Trees } from "lucide-react";
import { LANGS, useT, type Lang } from "@/lib/i18n";

const NAV = [
  { to: "/", k: "nav_home" },
  { to: "/map", k: "nav_map" },
  { to: "/monitor", k: "nav_monitor" },
  { to: "/insights", k: "nav_insights" },
  { to: "/about", k: "nav_about" },
] as const;

export function SiteHeader() {
  const { t, lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-[1000] px-3 pt-3">
      <div className="glass mx-auto flex max-w-7xl items-center gap-4 rounded-full px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Trees className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold">
            VanRakshak<span className="text-primary">-AI</span>
          </span>
        </Link>
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {t(n.k)}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <label className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-sm">
            <Languages className="h-4 w-4 text-primary" />
            <span className="sr-only">Language</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="cursor-pointer bg-transparent text-foreground outline-none [&>option]:bg-card"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </label>
          <Link to="/report" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110 sm:inline-flex">
            {t("cta_report")}
          </Link>
          <button className="rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="glass mx-auto mt-2 max-w-7xl rounded-3xl p-3 lg:hidden">
          {[...NAV, { to: "/report", k: "nav_report" } as const].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 hover:bg-secondary">
              {t(n.k)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <p className="font-display text-base text-foreground">VanRakshak<span className="text-primary">-AI</span> · Team TerraPulse · Navgurukul</p>
        <p className="max-w-xl">{t("footer")}</p>
      </div>
    </footer>
  );
}
