import { useRef, useState, useEffect } from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Search,
  Code,
  Zap,
  Layers,
  Settings,
  Briefcase,
  Database,
  Network,
  Cpu,
  Smartphone,
  Monitor,
} from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const floatingApps = [
  {
    icon: Code,
    className: "top-[-110px] left-1/2 -translate-x-1/2 [animation-delay:0s]",
  },
  { icon: Zap, className: "top-[-70px] right-[-90px] [animation-delay:1s]" },
  {
    icon: Layers,
    className: "bottom-[-85px] right-[-70px] [animation-delay:2s]",
  },
  {
    icon: Settings,
    className: "bottom-[-85px] left-[-70px] [animation-delay:3s]",
  },
  {
    icon: Briefcase,
    className: "top-[-70px] left-[-90px] [animation-delay:4s]",
  },
  {
    icon: Database,
    className: "top-[80px] right-[-130px] [animation-delay:0.5s]",
  },
  {
    icon: Network,
    className: "top-[80px] left-[-130px] [animation-delay:1.5s]",
  },
  {
    icon: Cpu,
    className: "bottom-[60px] right-[-130px] [animation-delay:2.5s]",
  },
  {
    icon: Smartphone,
    className: "bottom-[60px] left-[-130px] [animation-delay:3.5s]",
  },
  {
    icon: Monitor,
    className: "top-1/2 right-[-150px] -translate-y-1/2 [animation-delay:4.5s]",
  },
];

const contactResults = [
  {
    icon: Mail,
    title: "Email",
    subtitle: "flavio_contato@outlook.com",
    type: "Contact",
  },
  {
    icon: MapPin,
    title: "Location",
    subtitle: "Uberlândia, MG - Brazil",
    type: "Contact",
  },
  {
    icon: Clock,
    title: "Response Time",
    subtitle: "Within 24 hours",
    type: "Contact",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Send message instantly",
    type: "Contact",
    link: "https://wa.me/17997122611?text=Hi!%20I%E2%80%99d%20like%20to%20know%20more%20about%20your%20work%20and%20how%20we%20can%20work%20together",
  },
];

const revealSteps = [
  {
    target: ".contact-intro",
    from: { scale: 0.95, y: 16, duration: 0.75, stagger: 0.14 },
  },
];

const searchRevealSteps = [
  {
    target: ".contact-search",
    from: { scale: 0.9, filter: "blur(8px)", duration: 0.95 },
  },
];

const Contact = () => {
  const ref = useRef(null);
  const typingTimeoutRef = useRef(null);
  const revealTimeoutRef = useRef(null);

  const [isInView, setIsInView] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  useScrollReveal(ref, revealSteps);
  useScrollReveal(ref, searchRevealSteps, isInView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "-80px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const text = "contact";
    let currentIndex = 0;

    const type = () => {
      setDisplayedText(text.slice(0, currentIndex));
      currentIndex += 1;

      if (currentIndex <= text.length) {
        typingTimeoutRef.current = setTimeout(type, 95);
      } else {
        revealTimeoutRef.current = setTimeout(() => {
          setShowResults(true);
        }, 450);
      }
    };

    type();

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, [isInView]);

  return (
    <>
      <style>{`
        @keyframes appFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, 10px, 0) scale(1.02);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.45;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.65;
            transform: translate(-50%, -50%) scale(1.04);
          }
        }

        @keyframes blinkCursor {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }
      `}</style>

      <section
        id="contact"
        ref={ref}
        aria-labelledby="contact-title"
        className="flex min-h-screen items-center justify-center px-6 py-20"
      >
        <div className="mx-auto w-full max-w-5xl">
          <div>
            <h2
              id="contact-title"
              className="contact-intro mb-5 text-center text-4xl font-semibold leading-[1.1] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl"
            >
              Let&apos;s build something <span className="text-terminal-accent">great.</span>
            </h2>

            <p className="contact-intro mx-auto mb-16 max-w-2xl text-center text-base leading-relaxed text-slate-400 sm:text-lg">
              Let&apos;s work together on something amazing.
            </p>

            {isInView && (
              <div className="contact-search relative mx-auto flex w-fit flex-col items-center">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.08)_0%,rgba(0,255,136,0.03)_35%,transparent_70%)] blur-3xl animate-[pulseGlow_5s_ease-in-out_infinite]" />

                <div className="pointer-events-none absolute inset-0 hidden md:block">
                  {floatingApps.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={index}
                        className={`absolute flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-terminal-accent opacity-45 blur-[4px] backdrop-blur-xl animate-[appFloat_6s_ease-in-out_infinite] will-change-transform ${item.className}`}
                      >
                        <Icon size={34} className="opacity-70" />
                      </div>
                    );
                  })}
                </div>

                <div className="relative z-10 w-full max-w-[560px]">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                    <div className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-black/20 px-5 py-4">
                      <Search
                        className="shrink-0 text-terminal-accent"
                        size={20}
                      />

                      <div className="flex min-h-[28px] flex-1 items-center font-sans text-lg font-medium text-white">
                        <span>{displayedText}</span>
                        <span className="ml-1 inline-block h-5 w-[2px] animate-[blinkCursor_1s_steps(1)_infinite] bg-terminal-accent" />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-700 ${
                      showResults
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-3 opacity-0"
                    }`}
                  >
                    <div className="space-y-2">
                      {contactResults.map((result, index) => {
                        const Icon = result.icon;

                        const content = (
                          <div
                            className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 transition-all duration-500 hover:bg-white/[0.05] ${
                              showResults
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-3 opacity-0"
                            }`}
                            style={{
                              transitionDelay: `${index * 90}ms`,
                            }}
                          >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-terminal-accent/20 bg-gradient-to-br from-terminal-accent/15 to-terminal-accent/5">
                              <Icon
                                className="text-terminal-accent"
                                size={22}
                              />
                            </div>

                            <div className="flex-1">
                              <div className="mb-0.5 text-sm font-medium text-white">
                                {result.title}
                              </div>
                              <div className="text-xs text-white/60">
                                {result.subtitle}
                              </div>
                            </div>

                            <div className="shrink-0 text-[11px] uppercase tracking-[0.12em] text-white/35">
                              {result.type}
                            </div>
                          </div>
                        );

                        return result.link ? (
                          <a
                            key={result.title}
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            {content}
                          </a>
                        ) : (
                          <div key={result.title}>{content}</div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
