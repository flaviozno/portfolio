import { useRef, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Brain,
  Cpu,
  Trophy,
  Sparkles,
} from "lucide-react";

const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Federal University of Uberlandia, Uberlandia",
    period: "Jun 2019 - Sep 2025",
    description: "Undergraduate degree focused on core computer science and software engineering foundations.",
    color: "from-[#003d1f] via-[#002813] to-[#001a0d]",
    accent: "#00ff88",
  },
  {
    degree: "MBA in Software Architecture, Data Science and Cybersecurity",
    institution: "Pontificia Universidade Catolica de Campinas, Campinas",
    period: "Feb 2026 - Feb 2027",
    description: "Graduate specialization program combining architecture strategy, data-driven systems, and cybersecurity practices.",
    color: "from-[#002d15] via-[#001c0d] to-[#000f07]",
    accent: "#00d974",
  },
  {
    degree: "Linux Professional Institute LE-1",
    institution: "Linux Professional Institute",
    period: "Feb 2022 - Never Expires",
    description: "Professional Linux certification focused on administration, command line, and system fundamentals.",
    color: "from-[#004d26] via-[#002c15] to-[#001a0d]",
    accent: "#1aff88",
  },
  {
    degree: "The Complete Node.js Developer Course",
    institution: "Udemy",
    period: "Aug 2023 - Never Expires",
    description: "Comprehensive Node.js training covering APIs, asynchronous flows, and production-ready backend development.",
    color: "from-[#00361b] via-[#002311] to-[#00160b]",
    accent: "#2cff9a",
  },
  {
    degree: "Web Front-End Fundamentals: HTML, CSS and JS + 10 Projects",
    institution: "Udemy",
    period: "Nov 2020 - Never Expires",
    description: "Front-end fundamentals and practical project-based training focused on modern web interfaces.",
    color: "from-[#004323] via-[#002914] to-[#00170c]",
    accent: "#46ffab",
  },
];

const floatingIcons = [
  {
    icon: Code2,
    size: 120,
    className: "top-[10%] left-[5%] [animation-delay:0s]",
  },
  {
    icon: Brain,
    size: 150,
    className: "top-[58%] right-[10%] [animation-delay:1.2s]",
  },
  {
    icon: Cpu,
    size: 100,
    className: "bottom-[15%] left-[18%] [animation-delay:2.2s]",
  },
  {
    icon: Trophy,
    size: 140,
    className: "top-[24%] right-[18%] [animation-delay:0.6s]",
  },
  {
    icon: Sparkles,
    size: 110,
    className: "bottom-[18%] right-[14%] [animation-delay:1.8s]",
  },
];

const Education = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % education.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + education.length) % education.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const current = education[currentSlide];

  return (
    <>
      <style>{`
        @keyframes driftSoft {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(10px, -14px, 0) rotate(6deg);
          }
        }

        @keyframes pulseSoft {
          0%, 100% {
            transform: scale(1);
            opacity: 0.08;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.14;
          }
        }
      `}</style>

      <section
        id="education"
        ref={ref}
        className="flex min-h-screen items-center px-6 py-20"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div
            className={`transition-all duration-1000 ${
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="mb-20 text-center text-5xl font-bold md:text-6xl">
              <span className="text-gradient">Education & Courses</span>
            </h2>

            <div className="relative">
              <div
                key={currentSlide}
                className={`relative h-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ${current.color} shadow-[0_25px_80px_rgba(0,0,0,0.32)] transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(0,255,136,0.08),transparent_30%)]" />

                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
                  {floatingIcons.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={index}
                        className={`absolute opacity-[0.07] blur-[2px] animate-[driftSoft_12s_ease-in-out_infinite] ${item.className}`}
                      >
                        <Icon size={item.size} className="text-white" />
                      </div>
                    );
                  })}

                  <div className="absolute -left-16 -top-16 h-[260px] w-[260px] rounded-full bg-white/10 blur-[70px] animate-[pulseSoft_9s_ease-in-out_infinite]" />
                  <div className="absolute -bottom-12 -right-12 h-[220px] w-[220px] rounded-full bg-terminal-accent/10 blur-[70px] animate-[pulseSoft_10s_ease-in-out_infinite]" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white md:p-14">
                  <div className="relative">
                    <div className="absolute right-0 top-0 text-6xl font-black leading-none text-white/10 md:text-8xl">
                      {String(currentSlide + 1).padStart(2, "0")}
                    </div>

                    <div className="max-w-3xl transition-all duration-500">
                      <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                        {current.period}
                      </p>

                      <h3 className="mb-5 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
                        {current.degree}
                      </h3>

                      <p className="text-xl font-semibold text-white/85 md:text-2xl">
                        {current.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <p className="max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                      {current.description}
                    </p>

                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-md">
                      <div
                        className="h-2.5 w-2.5 rounded-full shadow-[0_0_18px_rgba(0,255,136,0.45)]"
                        style={{ backgroundColor: current.accent }}
                      />
                      <span className="text-sm font-medium text-white/70">
                        Academic Timeline
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.08]"
                    onClick={prevSlide}
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.08]"
                    onClick={nextSlide}
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                <div className="flex flex-1 items-center justify-center gap-3">
                  {education.map((_, index) => {
                    const isActive = index === currentSlide;

                    return (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-10 bg-white shadow-[0_0_18px_rgba(255,255,255,0.22)]"
                            : "w-2.5 bg-white/25 hover:bg-white/45"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    );
                  })}
                </div>

                <div className="text-right font-mono text-sm text-white/45">
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(education.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;