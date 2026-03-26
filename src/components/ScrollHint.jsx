import { useEffect, useRef, useState } from "react";

const ScrollHint = () => {
  const [showHint, setShowHint] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const updateHint = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = docHeight - windowHeight;

      if (maxScroll <= 0) {
        setShowHint(false);
        return;
      }

      const scrollPercent = (scrollTop / maxScroll) * 100;
      setShowHint(scrollPercent > 10 && scrollPercent < 90);
    };

    const handleScroll = () => {
      setShowHint(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        updateHint();
      }, 1200);
    };

    updateHint();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHint);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHint);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2 transition-all duration-500 md:bottom-10 ${
        showHint
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center gap-4 rounded-full border border-white/10 bg-black/20 px-6 py-4 shadow-[0_0_40px_rgba(0,255,136,0.08)] backdrop-blur-2xl">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-terminal-accent/5 via-white/[0.02] to-terminal-text/5" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative z-10 eye-shell">
            <div className="eye animate-[blink_4.5s_ease-in-out_infinite]">
              <div className="iris animate-[lookDown_2.8s_ease-in-out_infinite]">
                <div className="pupil" />
                <div className="eye-glow" />
                <div className="eye-shine" />
              </div>
            </div>
          </div>

          <div className="relative z-10 eye-shell">
            <div className="eye animate-[blink_4.5s_ease-in-out_infinite_0.2s]">
              <div className="iris animate-[lookDown_2.8s_ease-in-out_infinite_0.15s]">
                <div className="pupil" />
                <div className="eye-glow" />
                <div className="eye-shine" />
              </div>
            </div>
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-white/45">
          keep scrolling
        </span>
      </div>

      <style>{`
        .eye-shell {
          position: relative;
          filter: drop-shadow(0 0 14px rgba(0, 255, 136, 0.12));
        }

        .eye {
          position: relative;
          width: 42px;
          height: 26px;
          border-radius: 9999px;
          border: 1.5px solid rgba(255, 255, 255, 0.14);
          background:
            radial-gradient(circle at 50% 35%, rgba(255,255,255,0.22), transparent 45%),
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)),
            rgba(0, 255, 136, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow:
            inset 0 1px 8px rgba(255,255,255,0.06),
            inset 0 -6px 14px rgba(0,0,0,0.18),
            0 0 18px rgba(0,255,136,0.06);
          transform-origin: center;
        }

        .iris {
          position: relative;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background:
            radial-gradient(circle at 35% 35%, #7affc1 0%, #00ff88 45%, #00c96d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 16px rgba(0,255,136,0.28),
            inset 0 0 10px rgba(255,255,255,0.12);
          transform: translateY(3px);
        }

        .pupil {
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: #020617;
          box-shadow: inset 0 0 4px rgba(255,255,255,0.08);
        }

        .eye-glow {
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          box-shadow: 0 0 16px rgba(0,255,136,0.18);
          pointer-events: none;
        }

        .eye-shine {
          position: absolute;
          top: 2px;
          left: 3px;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.85);
          filter: blur(0.2px);
        }

        @keyframes blink {
          0%, 43%, 47%, 100% {
            transform: scaleY(1);
          }
          45% {
            transform: scaleY(0.08);
          }
        }

        @keyframes lookDown {
          0%, 100% {
            transform: translateY(2px);
          }
          50% {
            transform: translateY(6px);
          }
        }

        @media (max-width: 768px) {
          .eye {
            width: 36px;
            height: 22px;
          }

          .iris {
            width: 14px;
            height: 14px;
          }

          .pupil {
            width: 6px;
            height: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollHint;