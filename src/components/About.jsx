import { useEffect, useRef, useState } from "react";
import { Code2, Rocket, Sparkles } from "lucide-react";
import me from "../assets/me.png";
import meCartoon from "../assets/me-cartoon.png";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    iconClassName: "text-terminal-accent",
  },
  {
    icon: Rocket,
    title: "Performance",
    iconClassName: "text-terminal-text",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    iconClassName: "text-terminal-accent",
  },
];

const About = () => {
  const ref = useRef(null);
  const revealLayerRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [isImageHovered, setIsImageHovered] = useState(false);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const setRevealMask = (intensity = 1) => {
    if (!revealLayerRef.current) return;

    const { x, y } = pointerRef.current;
    const layer = revealLayerRef.current;

    if (intensity <= 0) {
      const hiddenMask =
        "radial-gradient(circle 0px at 50% 50%, transparent 100%, transparent 100%)";
      layer.style.webkitMaskImage = hiddenMask;
      layer.style.maskImage = hiddenMask;
      return;
    }

    const baseW = 146 * intensity;
    const baseH = 122 * intensity;
    const soft = 210 * intensity;
    const x2 = x + 40;
    const y2 = y - 22;
    const x3 = x - 36;
    const y3 = y + 28;

    const mask = [
      `radial-gradient(ellipse ${baseW}px ${baseH}px at ${x}px ${y}px, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.86) 48%, rgba(0,0,0,0.38) 70%, transparent 86%)`,
      `radial-gradient(circle ${baseW * 0.34}px at ${x2}px ${y2}px, rgba(0,0,0,0.72) 0%, transparent 80%)`,
      `radial-gradient(circle ${baseW * 0.28}px at ${x3}px ${y3}px, rgba(0,0,0,0.66) 0%, transparent 82%)`,
      `radial-gradient(circle ${soft}px at ${x}px ${y}px, rgba(0,0,0,0.22) 0%, transparent 88%)`,
    ].join(",");

    layer.style.webkitMaskImage = mask;
    layer.style.maskImage = mask;
  };

  const handleImageMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      setRevealMask(1);
      frameRef.current = null;
    });
  };

  const handleImageMouseEnter = (event) => {
    setIsImageHovered(true);

    if (revealLayerRef.current) {
      revealLayerRef.current.style.transition = "opacity 120ms ease-out";
      revealLayerRef.current.style.opacity = "1";
    }

    handleImageMouseMove(event);
    setRevealMask(1);
  };

  const handleImageMouseLeave = () => {
    setIsImageHovered(false);

    if (revealLayerRef.current) {
      revealLayerRef.current.style.transition = "opacity 220ms ease-out";
      revealLayerRef.current.style.opacity = "0";
    }

    setRevealMask(0);
  };

  return (
    <section
      id="about"
      ref={ref}
      className="flex min-h-screen items-center px-6 py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-12 text-center text-5xl font-bold md:text-6xl">
          <span className="text-gradient">
            Building Digital Experiences That Matter
          </span>
        </h2>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="group relative mx-auto w-full max-w-xs md:max-w-sm">
            <div
              className="relative aspect-[4/5] cursor-crosshair overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-terminal-accent/20 to-terminal-text/20 backdrop-blur-sm"
              onMouseMove={handleImageMouseMove}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
            >
              <img
                src={me}
                alt="Flávio Filho"
                className="h-full w-full rounded-2xl border-2 border-terminal-accent/20 object-cover object-top transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:border-terminal-accent/50 group-hover:brightness-110"
              />

              <div
                ref={revealLayerRef}
                className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-terminal-accent/20 bg-cover bg-top"
                style={{
                  backgroundImage: `url(${meCartoon})`,
                  WebkitMaskImage:
                    "radial-gradient(circle 0px at 50% 50%, transparent 100%, transparent 100%)",
                  maskImage:
                    "radial-gradient(circle 0px at 50% 50%, transparent 100%, transparent 100%)",
                  opacity: 0,
                  transition: "opacity 220ms ease-out",
                  willChange: "opacity, mask-image",
                }}
              />

              <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-terminal-accent/30 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-terminal-accent/90 backdrop-blur-sm transition-all duration-300 md:flex">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-terminal-accent" />
                {isImageHovered ? "Thanks for hovering" : "Hover me"}
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-terminal-accent/10 via-transparent to-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-terminal-accent/10 to-terminal-text/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-300">
              Passionate developer focused on creating innovative and functional
              digital experiences. Specialized in building modern web
              applications that combine elegant design with exceptional
              performance.
            </p>

            <p className="text-lg leading-relaxed text-gray-300">
              With software development experience, I work with the latest
              market technologies to deliver scalable, high-quality solutions.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/5 bg-gray-800/50 p-4 text-center transition-all duration-300 hover:scale-105 hover:border-terminal-accent/20 hover:bg-gray-700/50 hover:shadow-[0_0_25px_rgba(0,255,136,0.08)]"
                  >
                    <Icon
                      className={`mx-auto mb-2 ${item.iconClassName}`}
                      size={32}
                    />
                    <p className="text-sm text-gray-400">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
