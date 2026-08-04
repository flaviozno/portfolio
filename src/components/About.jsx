import { useEffect, useRef, useState } from "react";
import {
  Braces,
  Gauge,
  MapPin,
  Radio,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import me from "../assets/me.png";
import meCartoon from "../assets/me-cartoon.png";

const principles = [
  {
    icon: Braces,
    title: "Clarity first",
    description: "Clean code and decisions that are easy to understand.",
    iconClassName: "bg-cyan-400/15 text-cyan-300",
  },
  {
    icon: Gauge,
    title: "Built to perform",
    description: "Fast, reliable experiences made for real-world use.",
    iconClassName: "bg-emerald-400/15 text-emerald-300",
  },
  {
    icon: WandSparkles,
    title: "Thoughtful details",
    description: "Small interactions that make a product feel natural.",
    iconClassName: "bg-violet-400/15 text-violet-300",
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const revealLayerRef = useRef(null);
  const lensRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [isPortraitActive, setIsPortraitActive] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "-40px" },
    );

    if (section) observer.observe(section);

    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const renderLens = () => {
    const layer = revealLayerRef.current;
    const lens = lensRef.current;
    if (!layer || !lens) return;

    const { x, y } = pointerRef.current;
    const mask = `radial-gradient(circle 118px at ${x}px ${y}px, #000 0%, rgba(0,0,0,.98) 63%, rgba(0,0,0,.55) 77%, transparent 100%)`;

    layer.style.webkitMaskImage = mask;
    layer.style.maskImage = mask;
    lens.style.transform = `translate3d(${x - 118}px, ${y - 118}px, 0)`;
    frameRef.current = null;
  };

  const updatePointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(renderLens);
    }
  };

  const activatePortrait = (event) => {
    setIsPortraitActive(true);
    updatePointer(event);
  };

  const deactivatePortrait = () => {
    setIsPortraitActive(false);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-24 sm:px-6 lg:py-32"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-x-20 lg:gap-y-9">
          <div
            className={`about-reveal order-2 lg:order-1 lg:row-span-2 lg:self-center ${
              isInView ? "about-reveal-visible" : ""
            }`}
            style={{ "--about-delay": "140ms" }}
          >
            <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
              <div
                data-scroll-journey-end
                className="group relative aspect-[13/16] cursor-none touch-pan-y overflow-hidden rounded-[30px] border border-white/10 bg-[#111827] shadow-[0_32px_80px_rgba(0,0,0,0.38)]"
                onPointerMove={updatePointer}
                onPointerEnter={activatePortrait}
                onPointerLeave={deactivatePortrait}
                onPointerDown={activatePortrait}
                onPointerUp={deactivatePortrait}
                onPointerCancel={deactivatePortrait}
              >
                <img
                  src={me}
                  alt="Flavio Filho"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />

                <div
                  ref={revealLayerRef}
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-cover bg-top transition-opacity duration-200 ${
                    isPortraitActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundImage: `url(${meCartoon})`,
                    WebkitMaskImage:
                      "radial-gradient(circle 0px at 50% 50%, transparent 100%)",
                    maskImage:
                      "radial-gradient(circle 0px at 50% 50%, transparent 100%)",
                    willChange: "opacity, mask-image",
                  }}
                />

                <div
                  ref={lensRef}
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-0 top-0 h-[236px] w-[236px] rounded-full border border-white/35 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.2)] transition-opacity duration-200 ${
                    isPortraitActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ willChange: "transform, opacity" }}
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/65 to-transparent" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      Flávio Filho
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
                      <MapPin className="h-3.5 w-3.5" />
                      Uberlândia, Brazil
                    </p>
                  </div>

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white/80 backdrop-blur-xl"
                    title="Live portrait"
                  >
                    <Radio
                      className={`h-4 w-4 transition-colors ${
                        isPortraitActive
                          ? "text-terminal-accent"
                          : "text-white/80"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`about-reveal order-1 lg:order-2 ${
              isInView ? "about-reveal-visible" : ""
            }`}
            style={{ "--about-delay": "40ms" }}
          >
            <div className="mb-5 flex items-center gap-2 font-mono text-xs text-terminal-accent">
              <Sparkles className="h-3.5 w-3.5" />
              01 / About me
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              I like making complex things easier to use.
            </h2>

            <p className="max-w-2xl text-xl leading-relaxed text-white/85 sm:text-2xl">
              <span className="mt-7 block">
                I am a software developer who enjoys shaping complex
                requirements into clear, useful products.
              </span>
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              From interface details to distributed services, I work across the
              stack with the same goal: building software that feels considered,
              performs well, and remains easy to evolve.
            </p>
          </div>

          <div
            className={`about-reveal order-3 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] backdrop-blur-xl lg:order-3 ${
              isInView ? "about-reveal-visible" : ""
            }`}
            style={{ "--about-delay": "300ms" }}
          >
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group flex items-center gap-4 border-b border-white/[0.07] px-4 py-4 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.045] sm:px-5"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] ${item.iconClassName}`}
                  >
                    <Icon className="h-[19px] w-[19px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/90 sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-white/40">
                      {item.description}
                    </p>
                  </div>
                  <span className="ml-auto hidden h-1.5 w-1.5 shrink-0 rounded-full bg-white/15 transition-all duration-300 group-hover:bg-terminal-accent group-hover:shadow-[0_0_10px_rgba(0,212,255,0.65)] sm:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        #about .about-reveal {
          opacity: 0;
          transform: translateY(24px);
        }

        #about .about-reveal-visible {
          animation: aboutEnter 760ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--about-delay, 0ms);
        }

        @keyframes aboutEnter {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #about .about-reveal,
          #about .about-reveal-visible {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
