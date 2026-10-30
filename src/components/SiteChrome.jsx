import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion as Motion } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { setLanguage } from "../i18n";

const navItems = [
  { id: "services", label: "nav.services" },
  { id: "about", label: "nav.about" },
  { id: "experience", label: "nav.experience" },
  { id: "work", label: "nav.work" },
  { id: "contact", label: "nav.contact" },
];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-line bg-surface p-1" role="group" aria-label={t("nav.language")}>
      {[{ code: "pt-BR", label: "PT" }, { code: "en", label: "EN" }].map(({ code, label }) => (
        <button key={code} type="button" onClick={() => setLanguage(code)} aria-pressed={i18n.language === code}
          className={`min-h-8 min-w-9 rounded-full px-2 text-[11px] font-semibold tracking-wide ${i18n.language === code ? "bg-ink text-canvas" : "text-muted hover:text-ink"}`}>
          {label}
        </button>
      ))}
    </div>
  );
};

const ThemeToggle = ({ theme, onToggle, motionEnabled }) => {
  const { t } = useTranslation();
  return (
    <Motion.button type="button" onClick={onToggle} whileHover={motionEnabled ? { rotate: 12 } : undefined} whileTap={motionEnabled ? { scale: 0.9 } : undefined}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink hover:border-accent"
      aria-label={t(theme === "light" ? "nav.themeDark" : "nav.themeLight")}>
      {theme === "light" ? <Moon size={17} strokeWidth={1.7} /> : <Sun size={17} strokeWidth={1.7} />}
    </Motion.button>
  );
};

const MotionToggle = ({ motionEnabled, onToggle }) => {
  const { t } = useTranslation();
  const label = t(motionEnabled ? "nav.motionReduce" : "nav.motionEnable");

  return (
    <Motion.button type="button" onClick={onToggle} aria-label={t("nav.motionSetting")} title={label} aria-pressed={motionEnabled}
      whileHover={motionEnabled ? { rotate: 12, scale: 1.06 } : undefined} whileTap={motionEnabled ? { scale: .92 } : undefined}
      className={`relative grid h-10 w-10 place-items-center rounded-full border bg-surface ${motionEnabled ? "border-accent/50 text-accent" : "border-line text-muted"}`}>
      <span className="absolute inset-[5px] rounded-full border border-current opacity-25" aria-hidden="true" />
      <Sparkles size={17} strokeWidth={1.7} aria-hidden="true" />
      <span className={`absolute right-0 top-0 h-1.5 w-1.5 rounded-full ${motionEnabled ? "bg-accent" : "bg-muted"}`} aria-hidden="true" />
    </Motion.button>
  );
};

export const Header = ({ theme, onToggleTheme, motionEnabled, onToggleMotion }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-28% 0px -62% 0px" });
    navItems.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    firstLinkRef.current?.focus();
    const onEscape = (event) => {
      if (event.key === "Escape") { setIsOpen(false); menuButtonRef.current?.focus(); }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-xl">
      <div data-site-header-bar className="container-page flex h-[72px] items-center justify-between gap-5">
        <a href="#top" className="inline-flex shrink-0 items-center gap-3" onClick={closeMenu} aria-label={t("nav.top")}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm font-bold italic text-canvas">ff.</span>
          <span className="hidden font-display text-sm font-bold tracking-[-.04em] sm:inline">Flávio Filho</span>
        </a>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label={t("nav.primary")}>
          {navItems.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}
              className={`text-xs font-medium transition-colors hover:text-accent xl:text-sm ${active === id ? "text-accent" : "text-muted"}`}>
              {t(label)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block"><LanguageSwitcher /></div>
          <MotionToggle motionEnabled={motionEnabled} onToggle={onToggleMotion} />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} motionEnabled={motionEnabled} />
          <Motion.a href="#contact" whileHover={motionEnabled ? { y: -2 } : undefined} whileTap={motionEnabled ? { scale: 0.97 } : undefined}
            className="hidden min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-xs font-semibold text-canvas md:inline-flex">
            {t("nav.contact")} <ArrowUpRight size={15} />
          </Motion.a>
          <button ref={menuButtonRef} type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-controls="mobile-navigation"
            aria-label={t(isOpen ? "nav.close" : "nav.menu")}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink lg:hidden">
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Motion.nav id="mobile-navigation" aria-label={t("nav.mobile")} initial={motionEnabled ? { opacity: 0, y: -12 } : false} animate={{ opacity: 1, y: 0 }} exit={motionEnabled ? { opacity: 0, y: -12 } : undefined} transition={{ duration: motionEnabled ? .2 : 0 }}
            className="absolute inset-x-0 top-full border-t border-line bg-canvas px-5 pb-6 pt-3 shadow-sm lg:hidden">
            {navItems.map(({ id, label }, index) => (
              <a key={id} ref={index === 0 ? firstLinkRef : undefined} href={`#${id}`} onClick={closeMenu}
                className="block border-b border-line py-3 font-display text-xl text-ink">{t(label)}</a>
            ))}
            <div className="mt-5 sm:hidden"><LanguageSwitcher /></div>
          </Motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-line py-8">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="#top" className="font-display text-xl font-bold tracking-[-.05em]">Flávio Filho<span className="text-accent">.</span></a>
          <p className="mt-2 text-xs text-muted">{t("footer.line")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted">
          <a href="https://www.linkedin.com/in/flaviozno/" target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a>
          <a href="mailto:flavio_contato@outlook.com" className="hover:text-accent">Email</a>
          <a href="#top" className="hover:text-accent">{t("footer.back")} ↑</a>
          <span>© {new Date().getFullYear()} · {t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
};
