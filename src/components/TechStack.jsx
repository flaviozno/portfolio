import { useEffect, useRef, useState } from "react";
import {
  Boxes,
  Braces,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Layers3,
  PanelTop,
  ServerCog,
  Sparkles,
} from "lucide-react";

const stackGroups = [
  {
    id: "frontend",
    label: "Frontend",
    eyebrow: "Interfaces",
    title: "Frontend systems",
    description:
      "Modular, accessible interfaces designed to stay fast as products grow.",
    icon: PanelTop,
    accent: "cyan",
    technologies: ["React", "TypeScript", "Micro Frontends", "Vue", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    eyebrow: "Services",
    title: "Backend development",
    description:
      "Reliable services with clear boundaries, thoughtful APIs, and maintainable business rules.",
    icon: ServerCog,
    accent: "green",
    technologies: ["Node.js", "NestJS", "Java", "Spring Batch", "Laravel", ".NET"],
  },
  {
    id: "architecture",
    label: "Architecture",
    eyebrow: "Structure",
    title: "Distributed architecture",
    description:
      "Systems organized for independent delivery, resilience, and long-term evolution.",
    icon: Boxes,
    accent: "violet",
    technologies: ["Microservices", "BFF", "RabbitMQ", "Clean Architecture", "REST APIs"],
  },
  {
    id: "data-cloud",
    label: "Data & Cloud",
    eyebrow: "Infrastructure",
    title: "Data and cloud",
    description:
      "Practical infrastructure and data choices for production workloads at different scales.",
    icon: Cloud,
    accent: "blue",
    technologies: ["PostgreSQL", "MongoDB", "SQL Server", "AWS", "Azure", "Docker"],
  },
  {
    id: "quality",
    label: "Quality",
    eyebrow: "Delivery",
    title: "Quality and delivery",
    description:
      "A delivery workflow centered on predictable changes, useful tests, and team clarity.",
    icon: Check,
    accent: "amber",
    technologies: ["Automated Testing", "Git", "CI/CD", "Code Review", "Agile Delivery"],
  },
];

const accentStyles = {
  cyan: {
    icon: "bg-cyan-400/10 text-cyan-300 ring-cyan-300/15",
    dot: "bg-cyan-300",
    glow: "from-cyan-400/10",
  },
  green: {
    icon: "bg-emerald-400/10 text-emerald-300 ring-emerald-300/15",
    dot: "bg-emerald-300",
    glow: "from-emerald-400/10",
  },
  violet: {
    icon: "bg-violet-400/10 text-violet-300 ring-violet-300/15",
    dot: "bg-violet-300",
    glow: "from-violet-400/10",
  },
  blue: {
    icon: "bg-blue-400/10 text-blue-300 ring-blue-300/15",
    dot: "bg-blue-300",
    glow: "from-blue-400/10",
  },
  amber: {
    icon: "bg-amber-400/10 text-amber-300 ring-amber-300/15",
    dot: "bg-amber-300",
    glow: "from-amber-400/10",
  },
};

const TechStack = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [activeGroup, setActiveGroup] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-80px" },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const selectedGroup = stackGroups.find((group) => group.id === activeGroup);
  const SelectedIcon = selectedGroup?.icon;

  return (
    <section
      id="tech"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-4 py-24 sm:px-6"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[120px]" />

      <div
        className={`relative mx-auto w-full max-w-6xl transition-all duration-1000 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="mb-10 max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-white/45">
            <Sparkles className="h-3.5 w-3.5 text-terminal-accent" />
            Technical toolkit
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
            Built for the real world.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            A production-minded stack for building dependable products — from
            interface details to distributed services.
          </p>
        </div>

        <div className="overflow-hidden rounded-[26px] border border-white/[0.12] bg-[#0b101b]/80 shadow-[0_32px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="relative flex h-12 items-center border-b border-white/[0.08] bg-white/[0.035] px-4 sm:px-5">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
            </div>

            <div className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-2 text-xs font-medium text-white/45">
              <Layers3 className="h-3.5 w-3.5" />
              Stack
            </div>
          </div>

          <div className="grid min-h-[590px] md:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="border-b border-white/[0.08] bg-white/[0.025] p-3 md:border-b-0 md:border-r md:p-4">
              <div className="mb-4 hidden items-center gap-3 px-2 py-3 md:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-terminal-text/90 to-terminal-accent/90 text-[#061019] shadow-[0_8px_22px_rgba(0,212,255,0.14)]">
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90">Working set</p>
                  <p className="text-[11px] text-white/35">Production toolkit</p>
                </div>
              </div>

              <nav
                className="flex gap-1.5 overflow-x-auto pb-1 md:block md:space-y-1 md:overflow-visible md:pb-0"
                aria-label="Stack categories"
              >
                <button
                  type="button"
                  onClick={() => setActiveGroup("overview")}
                  aria-pressed={activeGroup === "overview"}
                  className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors md:w-full ${
                    activeGroup === "overview"
                      ? "bg-white/[0.1] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                      : "text-white/50 hover:bg-white/[0.045] hover:text-white/80"
                  }`}
                >
                  <Braces className="h-4 w-4 text-terminal-accent" />
                  Overview
                </button>

                {stackGroups.map((group) => {
                  const Icon = group.icon;
                  const styles = accentStyles[group.accent];

                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setActiveGroup(group.id)}
                      aria-pressed={activeGroup === group.id}
                      className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors md:w-full ${
                        activeGroup === group.id
                          ? "bg-white/[0.1] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                          : "text-white/50 hover:bg-white/[0.045] hover:text-white/80"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {group.label}
                      <span
                        className={`ml-auto hidden h-1.5 w-1.5 rounded-full md:block ${styles.dot}`}
                      />
                    </button>
                  );
                })}
              </nav>

              <div className="mt-auto hidden px-3 pb-1 pt-24 md:block">
                <p className="text-[11px] leading-relaxed text-white/28">
                  A focused toolkit, selected through hands-on product work.
                </p>
              </div>
            </aside>

            <div className="relative overflow-hidden p-5 sm:p-7 lg:p-9">
              {activeGroup === "overview" ? (
                <div key="overview" className="animate-[techFade_420ms_ease-out]">
                  <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-terminal-text/70">
                        Overview
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        Tools that work well together.
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/38">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.7)]" />
                      Production experience
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {stackGroups.map((group, index) => {
                      const Icon = group.icon;
                      const styles = accentStyles[group.accent];

                      return (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => setActiveGroup(group.id)}
                          className={`group relative overflow-hidden rounded-2xl border border-white/[0.075] bg-white/[0.025] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.045] ${
                            index === stackGroups.length - 1
                              ? "sm:col-span-2"
                              : ""
                          }`}
                        >
                          <div
                            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.glow} via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                          />
                          <div className="relative mb-5 flex items-start justify-between">
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${styles.icon}`}
                            >
                              <Icon className="h-[18px] w-[18px]" />
                            </span>
                            <ChevronRight className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/50" />
                          </div>
                          <div className="relative">
                            <p className="font-medium text-white/90">{group.label}</p>
                            <p className="mt-2 line-clamp-1 text-sm text-white/38">
                              {group.technologies.slice(0, 4).join(" · ")}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div
                  key={selectedGroup.id}
                  className="animate-[techFade_420ms_ease-out]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveGroup("overview")}
                    className="mb-7 flex items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-white/65"
                  >
                    <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                    All disciplines
                  </button>

                  <div className="mb-10 max-w-2xl">
                    <span
                      className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${accentStyles[selectedGroup.accent].icon}`}
                    >
                      <SelectedIcon className="h-6 w-6" />
                    </span>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/35">
                      {selectedGroup.eyebrow}
                    </p>
                    <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                      {selectedGroup.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
                      {selectedGroup.description}
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
                    {selectedGroup.technologies.map((technology, index) => (
                      <div
                        key={technology}
                        className="flex items-center gap-4 border-b border-white/[0.06] px-4 py-3.5 last:border-b-0 sm:px-5"
                      >
                        <span className="w-5 font-mono text-[11px] text-white/20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-white/80">
                          {technology}
                        </span>
                        <span
                          className={`ml-auto h-1.5 w-1.5 rounded-full ${accentStyles[selectedGroup.accent].dot}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex h-9 items-center justify-between border-t border-white/[0.07] bg-black/15 px-4 text-[10px] text-white/25 sm:px-5">
            <span>{activeGroup === "overview" ? "5 disciplines" : selectedGroup.label}</span>
            <span>Designed through practice</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes techFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          #tech * { animation-duration: 0.01ms !important; }
        }

        #tech nav {
          scrollbar-width: none;
        }

        #tech nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
