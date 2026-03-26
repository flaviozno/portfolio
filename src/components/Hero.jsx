import {
  Computer,
  Link,
  Mail,
  Code,
  Zap,
  Users,
  Award,
  MapPin,
  Languages,
} from "lucide-react";

const widgets = [
  {
    label: "Current Role",
    value: "NTT DATA",
    icon: Code,
    className: "top-[10%] left-[5%] w-[140px] [animation-delay:0s]",
  },
  {
    label: "Experience",
    value: "5+ yrs",
    icon: Zap,
    className: "top-[15%] right-[8%] w-[140px] [animation-delay:1s]",
  },
  {
    label: "Education",
    value: "BSc + MBA",
    icon: Users,
    className: "bottom-[20%] left-[10%] w-[140px] [animation-delay:2s]",
  },
  {
    label: "Hackathon Awards",
    value: "Top 3 x2",
    icon: Award,
    className: "bottom-[25%] right-[10%] w-[140px] [animation-delay:1.5s]",
  },
  {
    label: "Location",
    value: "Uberlândia, BR",
    icon: MapPin,
    className: "top-[32%] left-[18%] w-[160px] [animation-delay:2.6s]",
  },
  {
    label: "Languages",
    value: "EN + PT",
    icon: Languages,
    className: "bottom-[38%] right-[20%] w-[140px] [animation-delay:3.1s]",
  },
];

const socialLinks = [
  {
    href: "#experience",
    title: "Portfolio",
    icon: Computer,
  },
  {
    href: "https://www.linkedin.com/in/flaviozno/",
    title: "LinkedIn",
    icon: Link,
    external: true,
  },
  {
    href: "#contact",
    title: "Contact",
    icon: Mail,
  },
];

const Hero = () => {
  const handleSocialClick = (event, item) => {
    if (item.external) {
      return;
    }

    if (!item.href.startsWith("#")) {
      return;
    }

    event.preventDefault();

    const target = document.querySelector(item.href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes chevron-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        @keyframes widget-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
      `}</style>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {widgets.map((widget) => {
            const Icon = widget.icon;

            return (
              <div
                key={widget.label}
                className={`pointer-events-auto absolute rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl animate-[widget-float_6s_ease-in-out_infinite] ${widget.className}`}
              >
                <div className="mb-1 text-[11px] uppercase tracking-[0.5px] text-white/60">
                  {widget.label}
                </div>
                <div className="text-lg font-bold text-[#00ff88]">
                  {widget.value}
                </div>
                <Icon className="absolute right-3 top-3 h-5 w-5 text-white/40" />
              </div>
            );
          })}
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <div className="relative">
            <h1 className="mb-6 text-6xl font-bold opacity-0 md:text-8xl [animation:fadeInDown_0.8s_ease-out_forwards]">
              <span className="text-gradient glow">Flávio Filho</span>
            </h1>

            <p className="mb-8 font-mono text-xl text-gray-400 opacity-0 md:text-2xl [animation:fadeInUp_0.8s_ease-out_0.2s_forwards]">
              Software Developer & Tech Enthusiast
            </p>

            <div className="mb-12 flex justify-center gap-6 opacity-0 [animation:fadeInUp_0.8s_ease-out_0.4s_forwards]">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    title={item.title}
                    onClick={(event) => handleSocialClick(event, item)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group relative overflow-hidden rounded-lg bg-gray-800/50 p-3 transition-all duration-300 hover:scale-110 hover:-rotate-3 hover:bg-[#00ff88]/15 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                    <Icon
                      className="relative z-10 text-terminal-accent"
                      size={24}
                    />
                  </a>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center gap-2 opacity-0 [animation:fadeInUp_0.8s_ease-out_1.2s_forwards]">
              <span className="text-xs uppercase tracking-[1px] text-white/60">
                Scroll to discover more{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[float-slow_6s_ease-in-out_infinite]">
          <Zap
            className="text-terminal-text animate-[chevron-bounce_2s_ease-in-out_infinite]"
            size={48}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
