import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import portrait from "../assets/me.webp";
import EditorialMark, { MarkedEnding } from "./EditorialMark";
import useHeroParallax from "../hooks/useHeroParallax";
import useScrollReveal from "../hooks/useScrollReveal";

const SectionHeading = ({ eyebrow, first, second, intro, id }) => (
  <div data-reveal="heading" className="max-w-3xl">
    <p className="eyebrow mb-5">{eyebrow}</p>
    <h2 id={id} className="section-title text-balance">{first} <span className="serif-italic text-accent"><MarkedEnding text={second} /></span></h2>
    {intro && <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">{intro}</p>}
  </div>
);

const ActionLink = ({ href, children, secondary = false, external = false, motionEnabled }) => {
  return (
    <Motion.a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      whileHover={motionEnabled ? { y: -3 } : undefined} whileTap={motionEnabled ? { scale: .98 } : undefined}
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-semibold sm:px-6 ${secondary ? "border border-line bg-transparent text-ink hover:border-accent" : "bg-ink text-canvas hover:bg-accent hover:text-canvas"}`}>
      {children}<ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
    </Motion.a>
  );
};

export const Hero = ({ motionEnabled }) => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  useHeroParallax(sectionRef, imageRef, motionEnabled);
  const entrance = (delay = 0) => !motionEnabled ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: .75, delay, ease: [0.22, 1, 0.36, 1] } };
  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden border-b border-line">
      <div className="container-page grid min-h-[670px] items-center gap-11 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,.88fr)] lg:gap-16 lg:py-20">
        <div className="relative z-10 max-w-[780px]">
          <Motion.p {...entrance(0)} className="eyebrow mb-7 flex items-center gap-3"><span className="inline-block h-[1px] w-9 bg-accent" />{t("hero.eyebrow")}</Motion.p>
          <Motion.h1 {...entrance(.1)} className="font-display text-[clamp(2.7rem,6.1vw,6.7rem)] font-bold leading-[1.13] tracking-[-.07em] text-balance">
            {t("hero.lineOne")}<br className="hidden sm:block" /> {t("hero.lineTwo")} <span className="block font-normal italic text-accent"><EditorialMark immediate motionEnabled={motionEnabled}>{t("hero.lineThree")}</EditorialMark></span>
          </Motion.h1>
          <Motion.p {...entrance(.23)} className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">{t("hero.description")}</Motion.p>
          <Motion.div {...entrance(.34)} className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="#contact" motionEnabled={motionEnabled}>{t("hero.primary")}</ActionLink>
            <ActionLink href="#services" secondary motionEnabled={motionEnabled}>{t("hero.secondary")}</ActionLink>
          </Motion.div>
          <Motion.a {...entrance(.45)} href="#services" className="mt-14 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[.17em] text-muted hover:text-accent">
            <ArrowDown size={15} />{t("hero.scroll")}
          </Motion.a>
        </div>
        <Motion.div {...entrance(.18)} className="relative mx-auto w-full max-w-[440px] lg:mr-0">
          <div className="absolute -left-4 -top-4 h-full w-full border border-accent/35 sm:-left-6 sm:-top-6" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden bg-line">
            <img ref={imageRef} src={portrait} alt={t("hero.portraitAlt")} width="832" height="1280" fetchPriority="high" decoding="async" className="h-full w-full object-cover object-top" />
          </div>
          <div className="absolute -bottom-5 right-0 min-w-[230px] border border-line bg-surface px-5 py-4 shadow-sm sm:-right-5">
            <p className="font-display text-base font-bold tracking-[-.04em]">{t("hero.portraitLabel")}</p>
            <p className="mt-1 text-xs text-muted">{t("hero.portraitNote")}</p>
          </div>
          <span className="absolute -right-5 top-5 hidden -rotate-90 text-[10px] font-semibold uppercase tracking-[.25em] text-muted xl:block">01 / 06</span>
        </Motion.div>
      </div>
    </section>
  );
};

export const Services = ({ motionEnabled }) => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  useScrollReveal(ref, i18n.language, motionEnabled);
  const items = t("services.items", { returnObjects: true });
  return (
    <section id="services" ref={ref} aria-labelledby="services-title" className="section-space">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="services-title" eyebrow={t("services.eyebrow")} first={t("services.titleOne")} second={t("services.titleTwo")} intro={t("services.intro")} />
          <span className="hidden pb-2 text-xs font-medium text-muted lg:block">01 — 07 / {t("nav.services")}</span>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {items.map((item, index) => (
            <div key={item.title} data-reveal="card" data-reveal-order={index % 3} className={index === 0 || index === 6 ? "lg:col-span-2" : ""}>
            <Motion.article whileHover={motionEnabled ? { y: -5 } : undefined}
              className={`group flex min-h-[235px] h-full flex-col justify-between border border-line p-6 sm:p-7 ${index === 0 || index === 6 ? "bg-accentsoft" : "bg-surface"}`}>
              <div className="flex items-start justify-between">
                <span className="font-display text-sm italic text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-accent transition-colors group-hover:border-accent" aria-hidden="true"><ArrowUpRight size={16} /></span>
              </div>
              <div className="max-w-lg">
                <h3 className="font-display text-[clamp(1.25rem,2vw,1.8rem)] font-bold leading-snug tracking-[-.04em]">{item.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-muted">{item.description}</p>
              </div>
            </Motion.article>
            </div>
          ))}
        </div>
        <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:gap-20">
          <div data-reveal="from-left" className="max-w-2xl">
            <p className="eyebrow mb-5">{t("services.openEyebrow")}</p>
            <h3 className="font-display text-[clamp(2rem,3.7vw,3.6rem)] leading-[1.2] tracking-[-.055em] text-balance">
              {t("services.openTitleOne")} <span className="serif-italic text-accent"><MarkedEnding text={t("services.openTitleTwo")} /></span>
            </h3>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted">{t("services.openBody")}</p>
            <div className="mt-7"><ActionLink href="#contact" motionEnabled={motionEnabled}>{t("services.openCta")}</ActionLink></div>
          </div>
          <div data-reveal="from-right" className="self-end border-l-2 border-accent/45 pl-6 sm:pl-8">
            <p className="eyebrow mb-4">{t("services.aiEyebrow")}</p>
            <h4 className="font-display text-xl font-bold leading-snug tracking-[-.04em] sm:text-2xl">{t("services.aiTitle")}</h4>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">{t("services.aiBody")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const About = ({ motionEnabled }) => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  useScrollReveal(ref, i18n.language, motionEnabled);
  return (
    <section id="about" ref={ref} aria-labelledby="about-title" className="section-space border-y border-line bg-surface">
      <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
        <div>
          <SectionHeading id="about-title" eyebrow={t("about.eyebrow")} first={t("about.titleOne")} second={t("about.titleTwo")} />
          <p data-reveal="from-left" className="mt-9 max-w-xl font-display text-xl leading-[1.6] tracking-[-.03em] sm:text-2xl"><MarkedEnding text={t("about.lead")} /></p>
          <p data-reveal="from-left" className="mt-6 max-w-xl text-base leading-8 text-muted">{t("about.body")}</p>
          <p data-reveal="rise" className="mt-7 text-xs font-semibold uppercase tracking-[.15em] text-accent">{t("about.note")}</p>
        </div>
        <div data-reveal="from-right" className="self-end border-t border-line lg:mt-24">
          <p className="eyebrow py-5">{t("about.capabilitiesLabel")}</p>
          {t("about.capabilities", { returnObjects: true }).map((item, index) => (
            <div key={item} className="flex items-center gap-5 border-t border-line py-5 sm:py-6">
              <span className="font-display text-sm italic text-accent">0{index + 1}</span>
              <span className="flex-1 font-display text-lg tracking-[-.03em] sm:text-xl">{item}</span>
              <ArrowUpRight size={16} className="text-accent" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Experience = ({ motionEnabled }) => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  useScrollReveal(ref, i18n.language, motionEnabled);
  const roles = t("experience.roles", { returnObjects: true });
  const education = t("experience.education", { returnObjects: true });
  return (
    <section id="experience" ref={ref} aria-labelledby="experience-title" className="section-space">
      <div className="container-page">
        <SectionHeading id="experience-title" eyebrow={t("experience.eyebrow")} first={t("experience.titleOne")} second={t("experience.titleTwo")} intro={t("experience.intro")} />
        <div className="mt-12 border-t border-line">
          {roles.map((item, index) => (
            <article key={item.company} data-reveal={index % 2 ? "row-right" : "row-left"} className="grid gap-3 border-b border-line py-7 sm:grid-cols-[175px_minmax(0,1fr)] sm:gap-8 sm:py-9 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div className="flex items-center gap-3 self-start text-xs text-muted sm:block">
                <span className="font-display italic text-accent sm:block">{String(index + 1).padStart(2, "0")}</span>
                <span className="sm:mt-3 sm:block">{item.period}</span>
              </div>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:gap-10">
                <div><h3 className="font-display text-xl font-bold tracking-[-.04em] sm:text-2xl">{item.company}</h3><p className="mt-2 text-sm text-accent">{item.role}</p></div>
                <div><p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">{item.description}</p><p className="mt-4 text-xs leading-6 text-ink/70">{item.detail}</p></div>
              </div>
            </article>
          ))}
        </div>
        <div data-reveal="scale" className="mt-16 grid gap-5 border-t border-line pt-7 sm:grid-cols-[175px_1fr_1fr] lg:grid-cols-[220px_1fr_1fr]">
          <p className="eyebrow">{t("experience.educationLabel")}</p>
          {education.map((item) => <div key={item.title} className="border-l border-line pl-5">
            <h3 className="font-display text-base font-bold leading-7 tracking-[-.03em]">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.school}</p>
            <p className="mt-2 text-xs text-accent">{item.period}</p>
          </div>)}
        </div>
      </div>
    </section>
  );
};

export const Work = ({ motionEnabled }) => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  useScrollReveal(ref, i18n.language, motionEnabled);
  return (
    <section id="work" ref={ref} aria-labelledby="work-title" className="section-space border-y border-line bg-surface">
      <div className="container-page">
        <SectionHeading id="work-title" eyebrow={t("work.eyebrow")} first={t("work.titleOne")} second={t("work.titleTwo")} intro={t("work.intro")} />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {t("work.items", { returnObjects: true }).map((item, index) => (
            <div key={item.number} data-reveal="card" data-reveal-order={index}>
            <Motion.article whileHover={motionEnabled ? { y: -5 } : undefined} className="group flex min-h-[330px] h-full flex-col border border-line bg-canvas p-6 sm:p-8">
              <div className="flex items-center justify-between"><span className="font-display text-5xl italic tracking-[-.08em] text-accent/35">{item.number}</span><ArrowUpRight size={18} className="text-accent" aria-hidden="true" /></div>
              <div className="mt-auto">
                <p className="eyebrow mb-3">{item.category}</p>
                <h3 className="font-display text-2xl font-bold leading-snug tracking-[-.045em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
                <p className="mt-6 border-t border-line pt-4 text-xs leading-6 text-accent">{item.stack}</p>
              </div>
            </Motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Process = ({ motionEnabled }) => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  useScrollReveal(ref, i18n.language, motionEnabled);
  return (
    <section id="process" ref={ref} aria-labelledby="process-title" className="section-space">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={t("process.eyebrow")} first={t("process.titleOne")} second={t("process.titleTwo")} />
        <div className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {t("process.steps", { returnObjects: true }).map((step, index) => (
            <div key={step.title} data-reveal="step" data-reveal-order={index} className="border-b border-line py-7 sm:px-5 sm:first:pl-0 lg:border-r lg:last:border-r-0 lg:last:pr-0">
              <span className="font-display text-sm italic text-accent">0{index + 1} / 04</span>
              <h3 className="mt-7 font-display text-2xl font-bold tracking-[-.05em]">{step.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-7 text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Contact = ({ motionEnabled }) => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  useScrollReveal(ref, i18n.language, motionEnabled);
  return (
    <section id="contact" ref={ref} aria-labelledby="contact-title" className="section-space bg-ink text-canvas">
      <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div data-reveal="contact">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.24em] text-canvas/65 sm:text-xs">{t("contact.eyebrow")}</p>
          <h2 id="contact-title" className="section-title text-balance">{t("contact.titleOne")} <span className="serif-italic"><MarkedEnding text={t("contact.titleTwo")} inverted /></span></h2>
        </div>
        <div data-reveal="from-right" className="lg:pb-2">
          <p className="max-w-md text-base leading-8 text-canvas/70 sm:text-lg">{t("contact.description")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="mailto:flavio_contato@outlook.com" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-canvas px-5 py-3 text-sm font-semibold text-ink hover:opacity-80"><Mail size={17} />{t("contact.email")}<ArrowUpRight size={16} /></a>
            <a href="https://wa.me/17997122611" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-canvas/45 px-5 py-3 text-sm font-semibold text-canvas hover:border-canvas"><MessageCircle size={17} />{t("contact.whatsapp")}</a>
          </div>
          <a href="https://www.linkedin.com/in/flaviozno/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm text-canvas/70 hover:text-canvas">{t("contact.linkedin")} <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
};
