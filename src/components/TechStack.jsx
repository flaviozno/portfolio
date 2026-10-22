import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const strengths = [
  {
    number: "01",
    name: "React",
    description: "Modular interfaces that make complex workflows easier to use.",
  },
  {
    number: "02",
    name: "Node.js",
    description: "APIs and automation that keep product logic moving reliably.",
  },
  {
    number: "03",
    name: "Java",
    description: "Services and batch processing built for demanding operations.",
  },
];

const revealSteps = [
  {
    target: ".tech-intro > *",
    from: { y: 30, duration: 0.75, stagger: 0.14 },
  },
  {
    target: ".tech-card",
    from: { clipPath: "inset(0% 100% 0% 0%)", x: -12, duration: 0.7 },
    each: true,
  },
  {
    target: ".tech-link",
    from: { x: 18, duration: 0.55 },
  },
];

const TechStack = () => {
  const ref = useRef(null);
  useScrollReveal(ref, revealSteps);

  return (
    <section
      id="tech"
      ref={ref}
      aria-labelledby="tech-title"
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-24 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_35%,rgba(0,212,255,0.055),transparent_44%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="tech-intro max-w-3xl">
          <h2
            id="tech-title"
            className="text-4xl font-semibold leading-[1.1] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl"
          >
            Built across the whole product.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            From clear React interfaces to dependable Node.js and Java services.
          </p>
        </div>

        <div className="tech-panel mt-14 border-y border-white/10 sm:mt-16">
          {strengths.map((strength) => (
            <div
              key={strength.name}
              className="tech-card grid grid-cols-[32px_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-white/10 py-7 last:border-b-0 md:grid-cols-[42px_220px_minmax(0,1fr)] md:items-center md:gap-x-7 md:py-9"
            >
              <span className="row-span-2 self-start pt-1 font-mono text-xs text-terminal-accent/80 md:row-span-1">
                {strength.number}
              </span>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                {strength.name}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                {strength.description}
              </p>
            </div>
          ))}
        </div>

        <div className="tech-link mt-8 flex justify-end">
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terminal-accent"
          >
            See my experience
            <ArrowUpRight className="h-4 w-4 text-terminal-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
