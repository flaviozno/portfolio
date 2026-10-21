import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import me from "../assets/me.png";
import meCartoon from "../assets/me-cartoon.png";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { number: "01", title: "Interfaces", description: "Clear, responsive experiences built with React and TypeScript." },
  { number: "02", title: "Services", description: "Dependable APIs and business logic across Node.js and Java." },
  { number: "03", title: "Delivery", description: "Maintainable systems shaped with testing and team collaboration." },
];

const LENS_RADIUS = 118;

const About = () => {
  const sectionRef = useRef(null);
  const revealLayerRef = useRef(null);
  const lensRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [isPortraitActive, setIsPortraitActive] = useState(false);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".about-eyebrow",
            start: "top 90%",
            end: "top 24%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .from(".about-eyebrow", { autoAlpha: 0, y: 18, duration: 0.55 })
          .from(".about-heading", { autoAlpha: 0, y: 42, duration: 0.9 }, "-=0.2")
          .from(".about-copy", { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.12 }, "-=0.65")
          .from(".about-actions", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.25");

        gsap.from(".about-portrait", {
          autoAlpha: 0,
          y: 54,
          scale: 0.96,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-portrait",
            start: "top 90%",
            end: "top 48%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray(".about-capability", sectionRef.current).forEach((item) => {
          gsap.from(item, {
            autoAlpha: 0,
            y: 28,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              end: "top 63%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        });
      },
      sectionRef,
    );

    return () => {
      media.revert();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const renderLens = () => {
    const layer = revealLayerRef.current;
    const lens = lensRef.current;
    if (!layer || !lens) return;

    const { x, y } = pointerRef.current;
    const mask = `radial-gradient(circle ${LENS_RADIUS}px at ${x}px ${y}px, #000 0%, rgba(0,0,0,.98) 63%, rgba(0,0,0,.55) 77%, transparent 100%)`;
    layer.style.webkitMaskImage = mask;
    layer.style.maskImage = mask;
    lens.style.transform = `translate3d(${x - LENS_RADIUS}px, ${y - LENS_RADIUS}px, 0)`;
    frameRef.current = null;
  };

  const updatePointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    if (!frameRef.current) frameRef.current = requestAnimationFrame(renderLens);
  };

  const activatePortrait = (event) => {
    setIsPortraitActive(true);
    updatePointer(event);
  };

  const deactivatePortrait = () => setIsPortraitActive(false);
  const handlePointerUp = (event) => {
    if (event.pointerType !== "mouse") deactivatePortrait();
  };

  return (
    <section id="about" ref={sectionRef} aria-labelledby="about-title" className="relative isolate overflow-hidden px-5 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_36%,rgba(0,212,255,0.07),transparent_42%)]" />
      <div className="mx-auto w-full max-w-6xl">
        <div className="mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16 xl:gap-24">
          <div className="max-w-2xl">
            <p className="about-copy mb-5 text-sm font-medium uppercase tracking-[0.16em] text-white/55">Software Developer · NTT DATA</p>
            <h2 id="about-title" className="about-heading max-w-[680px] text-[clamp(2.75rem,5.1vw,4.75rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-white">
              Making complex systems feel <span className="text-terminal-accent">simple.</span>
            </h2>
            <p className="about-copy mt-8 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              I&apos;m Flávio, a developer who turns demanding requirements into clear interfaces and dependable software.
            </p>
            <p className="about-copy mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              I work across React frontends, Node.js and Java services, and automation. I care about the details people see and the systems that keep everything working behind the scenes.
            </p>
            <div className="about-actions mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#experience" className="group inline-flex items-center gap-3 rounded-full bg-terminal-accent px-5 py-3 text-sm font-semibold text-[#07121b] transition-colors hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-terminal-accent">
                Explore my experience <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terminal-accent">
                Get in touch <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div className="about-portrait relative mx-auto w-full max-w-[440px] lg:mr-0">
            <div className="absolute -right-3 -top-3 bottom-3 left-3 rounded-[25px] border border-terminal-accent/25 sm:-right-4 sm:-top-4 sm:bottom-4 sm:left-4" />
            <div data-scroll-journey-end className="group relative aspect-[3/4] cursor-crosshair touch-pan-y overflow-hidden rounded-[22px] border border-white/15 bg-[#252b32] shadow-[0_32px_80px_rgba(0,0,0,0.42)]" onPointerMove={updatePointer} onPointerEnter={activatePortrait} onPointerLeave={deactivatePortrait} onPointerDown={activatePortrait} onPointerUp={handlePointerUp} onPointerCancel={deactivatePortrait}>
              <img src={me} alt="Portrait of Flávio Filho" className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
              <div ref={revealLayerRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-cover bg-top transition-opacity duration-200 ${isPortraitActive ? "opacity-100" : "opacity-0"}`} style={{ backgroundImage: `url(${meCartoon})`, WebkitMaskImage: "radial-gradient(circle 0px at 50% 50%, transparent 100%)", maskImage: "radial-gradient(circle 0px at 50% 50%, transparent 100%)", willChange: "opacity, mask-image" }} />
              <div ref={lensRef} aria-hidden="true" className={`pointer-events-none absolute left-0 top-0 h-[236px] w-[236px] rounded-full border border-white/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.2)] transition-opacity duration-200 ${isPortraitActive ? "opacity-100" : "opacity-0"}`} style={{ willChange: "transform, opacity" }} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                <div>
                  <p className="text-lg font-semibold text-white">Flávio Filho</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/75"><MapPin className="h-3.5 w-3.5" />Uberlândia, Brazil</p>
                </div>
                <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/80 backdrop-blur-md"><span className="hidden sm:inline">Hover to reveal</span><span className="sm:hidden">Touch to reveal</span></span>
              </div>
            </div>
            <p className="about-meta mt-4 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">A little personality, behind the portrait</p>
          </div>
        </div>

        <div className="mt-20 grid border-y border-white/10 md:grid-cols-3 lg:mt-24">
          {capabilities.map((item) => (
            <div key={item.number} className="about-capability flex gap-5 border-b border-white/10 py-7 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <span className="pt-1 font-mono text-xs text-terminal-accent/80">{item.number}</span>
              <div><h3 className="text-lg font-semibold text-white">{item.title}</h3><p className="mt-2 max-w-[260px] text-sm leading-relaxed text-slate-400">{item.description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
