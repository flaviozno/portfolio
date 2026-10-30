import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MotionConfig } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header, Footer } from "./components/SiteChrome";
import { Hero, Services, About, Experience, Work, Process, Contact } from "./components/Sections";
import useTheme from "./hooks/useTheme";
import useMotionPreference from "./hooks/useMotionPreference";
import useSectionNavigation from "./hooks/useSectionNavigation";

const App = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { motionEnabled, toggleMotion } = useMotionPreference();
  useSectionNavigation(motionEnabled);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t("meta.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t("meta.title"));
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t("meta.description"));
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", i18n.language === "pt-BR" ? "pt_BR" : "en_US");
  }, [i18n.language, t]);

  useEffect(() => {
    let active = true;
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; };
  }, [i18n.language, motionEnabled]);

  return (
    <MotionConfig reducedMotion={motionEnabled ? "never" : "always"}>
      <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-surface focus:p-3">{t("hero.secondary")}</a>
      <Header theme={theme} onToggleTheme={toggleTheme} motionEnabled={motionEnabled} onToggleMotion={toggleMotion} />
      <main>
        <Hero key={motionEnabled ? "full" : "reduced"} motionEnabled={motionEnabled} />
        <Services motionEnabled={motionEnabled} />
        <About motionEnabled={motionEnabled} />
        <Experience motionEnabled={motionEnabled} />
        <Work motionEnabled={motionEnabled} />
        <Process motionEnabled={motionEnabled} />
        <Contact motionEnabled={motionEnabled} />
      </main>
      <Footer />
    </MotionConfig>
  );
};

export default App;
