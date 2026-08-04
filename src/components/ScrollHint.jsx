import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const ScrollHint = () => {
  const [showHint, setShowHint] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const updateHint = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setShowHint(false);
        return;
      }

      const scrollProgress = scrollTop / maxScroll;
      setShowHint(scrollProgress < 0.93);
    };

    const scheduleHint = (delay = 280) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(updateHint, delay);
    };

    const handleScroll = () => {
      setShowHint(false);
      scheduleHint();
    };

    scheduleHint(300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHint);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHint);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleContinue = () => {
    setShowHint(false);

    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const nextSection = sections.find(
      (section) => section.getBoundingClientRect().top > 120,
    );

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollBy({
      top: window.innerHeight * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-5 left-1/2 z-[9999] -translate-x-1/2 transition-[opacity,transform] duration-300 ease-out sm:bottom-7 ${
        showHint
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={handleContinue}
        className="scroll-hint-button group relative flex h-12 min-w-[174px] items-center justify-between gap-4 overflow-hidden rounded-full border border-white/[0.13] bg-[#090d15]/70 py-1.5 pl-5 pr-2 text-left shadow-[0_16px_50px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#0d121d]/80 hover:shadow-[0_20px_60px_rgba(0,0,0,0.46)] focus:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-terminal-bg"
        aria-label="Continue to the next section"
      >
        <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <span className="relative text-[13px] font-medium text-white/70 transition-colors duration-300 group-hover:text-white">
          Keep exploring
        </span>

        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/75 ring-1 ring-inset ring-white/[0.07] transition-colors duration-300 group-hover:bg-white/[0.11] group-hover:text-terminal-accent">
          <ChevronDown className="scroll-hint-chevron h-[17px] w-[17px]" />
        </span>

        <span className="pointer-events-none absolute bottom-0 left-1/2 h-px w-14 -translate-x-1/2 bg-terminal-accent/35 opacity-60 blur-[0.5px] transition-all duration-300 group-hover:w-20 group-hover:opacity-100" />
      </button>

      <style>{`
        @keyframes scrollHintNudge {
          0%, 100% {
            opacity: 0.55;
            transform: translateY(-2px);
          }
          45% {
            opacity: 1;
            transform: translateY(3px);
          }
        }

        .scroll-hint-chevron {
          animation: scrollHintNudge 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-hint-chevron {
            animation: none;
          }

          .scroll-hint-button {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollHint;
