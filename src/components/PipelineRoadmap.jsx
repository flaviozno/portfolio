import { useEffect, useMemo, useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  GitBranchIcon,
  Code2,
  Package,
  Rocket,
  CheckCircle2,
  LoaderCircle,
  Sparkles,
  ServerCog,
} from "lucide-react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const stages = [
  {
    key: "code",
    title: "Profile",
    subtitle: "Presenting who I am and how I build products",
    icon: Code2,
  },
  {
    key: "experience",
    title: "Experience",
    subtitle: "Organizing career path, impact, and key deliveries",
    icon: GitBranchIcon,
  },
  {
    key: "projects",
    title: "Projects",
    subtitle:
      "Publishing projects with clear storytelling, performance, and polished presentation",
    icon: Package,
  },
  {
    key: "publish",
    title: "Publishing",
    subtitle: "Connecting domain, hosting, and online presence",
    icon: ServerCog,
  },
  {
    key: "deploy",
    title: "Live",
    subtitle: "My resume goes live for you to follow in real time",
    icon: Rocket,
  },
];

const PipelineRoadmap = () => {
  const [progress, setProgress] = useState(0);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const totalStages = stages.length;

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const viewport = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight - viewport;

      const raw = fullHeight > 0 ? scrollTop / fullHeight : 0;
      const normalized = clamp(raw, 0, 1);

      setProgress(normalized);

      const atEnd = normalized >= 0.985;

      if (atEnd && !deploying && !deployed) {
        setDeploying(true);

        setTimeout(() => {
          setDeploying(false);
          setDeployed(true);
        }, 1800);
      }

      if (normalized < 0.94 && deployed) {
        setDeployed(false);
      }

      if (normalized < 0.96 && deploying) {
        setDeploying(false);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [deploying, deployed]);

  const activeStageIndex = useMemo(() => {
    return Math.min(Math.floor(progress * totalStages), totalStages - 1);
  }, [progress, totalStages]);

  const percent = Math.round(progress * 100);

  return (
    <>
      <style>{`
        @keyframes pipelineFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes pulseNode {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.24);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 0 14px rgba(0, 255, 136, 0);
          }
        }

        @keyframes glowFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes deployPop {
          0% {
            transform: scale(0.88);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes rocketLaunch {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          30% {
            transform: translateY(-8px) scale(1.05);
          }
          100% {
            transform: translateY(-44px) scale(1.12);
            opacity: 0;
          }
        }
      `}</style>

      <div
        className={`pointer-events-none fixed z-[60] right-3 sm:right-4 md:right-5 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:right-3 xl:right-4 hidden sm:block ${isCollapsed ? "bottom-4 sm:bottom-5" : "bottom-8 sm:bottom-10 md:bottom-12"}`}
      >
        <div className="relative">
          <div
            className={`absolute inset-0 bg-terminal-accent/10 blur-xl transition-all duration-300 ${
              isCollapsed ? "rounded-[1.5rem]" : "rounded-[1.75rem]"
            }`}
          />

          <div
            className={`pointer-events-auto relative flex flex-col overflow-hidden border border-white/10 bg-[#050810]/75 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition-all duration-300 ${
              isCollapsed
                ? "w-[68px] sm:w-[76px] md:w-[80px] gap-2 sm:gap-2.5 rounded-2xl sm:rounded-[1.5rem] p-2 sm:p-2.5"
                : "w-[calc(100vw-24px)] max-w-[300px] sm:w-[280px] md:w-[300px] lg:w-[272px] xl:w-[290px] gap-3 sm:gap-4 rounded-[1.5rem] sm:rounded-[1.75rem] p-3 sm:p-3.5"
            }`}
          >
            <div
              className={`flex items-center ${isCollapsed ? "flex-col justify-center gap-2" : "justify-between gap-2"}`}
            >
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <p className="mb-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-terminal-accent/70 truncate">
                    Portfolio Deploy
                  </p>
                </div>
              )}

              <div
                className={`flex shrink-0 items-center ${isCollapsed ? "flex-col gap-2 w-full" : "gap-1.5"}`}
              >
                <div
                  className={`flex items-center justify-center rounded-lg sm:rounded-xl border border-terminal-accent/20 bg-terminal-accent/10 text-terminal-accent animate-[glowFloat_4s_ease-in-out_infinite] ${isCollapsed ? "h-8 w-8 sm:h-9 sm:w-9" : "h-7 w-7 sm:h-8 sm:w-8"}`}
                >
                  {deployed ? (
                    <CheckCircle2 size={15} />
                  ) : deploying ? (
                    <LoaderCircle size={15} className="animate-spin" />
                  ) : (
                    <Sparkles size={14} />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsCollapsed((current) => !current)}
                  className={`flex items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-terminal-accent/30 hover:text-terminal-accent ${isCollapsed ? "h-8 w-8 sm:h-9 sm:w-9" : "h-7 w-7 sm:h-8 sm:w-8"}`}
                  aria-label={
                    isCollapsed ? "Expand timeline" : "Collapse timeline"
                  }
                  title={isCollapsed ? "Expand" : "Collapse"}
                >
                  {isCollapsed ? (
                    <ChevronsLeft
                      size={13}
                      className="sm:w-[14px] sm:h-[14px]"
                    />
                  ) : (
                    <ChevronsRight
                      size={13}
                      className="sm:w-[14px] sm:h-[14px]"
                    />
                  )}
                </button>
              </div>
            </div>

            {!isCollapsed && (
              <div className="rounded-xl sm:rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2.5 sm:px-3.5 sm:py-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-white/45 truncate">
                    Deployment progress
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-terminal-accent shrink-0">
                    {percent}%
                  </span>
                </div>

                <div className="relative h-1.5 sm:h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,rgba(0,255,136,0.18),rgba(0,255,136,0.95),rgba(147,255,209,0.7),rgba(0,255,136,0.18))] bg-[length:200%_100%]"
                    style={{
                      width: `${percent}%`,
                      animation: "pipelineFlow 2.2s linear infinite",
                    }}
                  />
                </div>
              </div>
            )}

            <div
              className={`relative ${isCollapsed ? "pl-0" : "pl-[18px] sm:pl-5"}`}
            >
              <div
                className={`absolute top-2 w-[2px] sm:w-[3px] rounded-full bg-white/6 ${
                  isCollapsed
                    ? "left-1/2 h-[calc(100%-16px)] -translate-x-1/2"
                    : "left-[13px] sm:left-[14px] h-[calc(100%-16px)]"
                }`}
              />

              <div
                className={`absolute top-2 w-[2px] sm:w-[3px] rounded-full bg-[linear-gradient(180deg,rgba(0,255,136,1),rgba(0,255,136,0.08))] shadow-[0_0_18px_rgba(0,255,136,0.35)] transition-all duration-500 ${
                  isCollapsed
                    ? "left-1/2 -translate-x-1/2"
                    : "left-[13px] sm:left-[14px]"
                }`}
                style={{ height: `${Math.max(progress * 100, 4)}%` }}
              />

              <div
                className={
                  isCollapsed
                    ? "space-y-2 sm:space-y-2.5"
                    : "space-y-2 sm:space-y-2.5"
                }
              >
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  const stageProgress = progress * totalStages;
                  const isCompleted = stageProgress > index + 0.45;
                  const isActive = activeStageIndex === index && !deployed;
                  const isDeployNode = stage.key === "deploy";

                  const stateClasses = isCompleted
                    ? "border-terminal-accent/20 bg-terminal-accent/[0.08]"
                    : isActive
                      ? "border-terminal-accent/30 bg-white/[0.05]"
                      : "border-white/6 bg-white/[0.02]";

                  return (
                    <div
                      key={stage.key}
                      className={`group relative rounded-xl sm:rounded-2xl border transition-all duration-500 ${stateClasses} ${
                        isCollapsed
                          ? "mx-auto flex items-center justify-center w-[48px] sm:w-[52px] md:w-[56px] px-0 py-2 sm:py-2.5"
                          : "flex items-start gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5"
                      }`}
                      title={isCollapsed ? stage.title : undefined}
                    >
                      {!isCollapsed && (
                        <div
                          className={`absolute top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 -left-[9px] sm:-left-[10px] rounded-full border transition-all duration-500 ${
                            isCompleted
                              ? "border-terminal-accent bg-terminal-accent shadow-[0_0_18px_rgba(0,255,136,0.45)]"
                              : isActive
                                ? "border-terminal-accent bg-[#050810] animate-[pulseNode_1.8s_ease-in-out_infinite]"
                                : "border-white/15 bg-[#0a101a]"
                          }`}
                        />
                      )}
                      <div
                        className={`shrink-0 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all duration-500 ${
                          isCollapsed
                            ? "h-8 w-8 sm:h-9 sm:w-9 mt-0"
                            : "h-7 w-7 sm:h-8 sm:w-8 mt-0.5"
                        } ${
                          isCompleted
                            ? "border-terminal-accent/25 bg-terminal-accent/10 text-terminal-accent"
                            : isActive
                              ? "border-terminal-accent/25 bg-terminal-accent/10 text-terminal-accent shadow-[0_0_18px_rgba(0,255,136,0.16)]"
                              : "border-white/10 bg-white/[0.03] text-white/55"
                        }`}
                      >
                        {isDeployNode && deploying ? (
                          <Rocket
                            size={14}
                            className="animate-[rocketLaunch_1.2s_ease-in-out_infinite]"
                          />
                        ) : isCompleted ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Icon size={14} />
                        )}
                      </div>

                      {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                          <div className="mb-0.5 sm:mb-1 flex items-center justify-between gap-1.5 sm:gap-2">
                            <h4 className="text-[13px] sm:text-[14px] font-semibold text-white truncate">
                              {stage.title}
                            </h4>

                            <span
                              className={`shrink-0 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] ${
                                isCompleted
                                  ? "bg-terminal-accent/15 text-terminal-accent"
                                  : isActive
                                    ? "bg-white/8 text-white/70"
                                    : "bg-white/5 text-white/35"
                              }`}
                            >
                              {isCompleted
                                ? "done"
                                : isActive
                                  ? "running"
                                  : "queued"}
                            </span>
                          </div>

                          <p className="text-[11px] sm:text-xs leading-relaxed text-white/60 line-clamp-2">
                            {stage.subtitle}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {!isCollapsed && !deployed && (
              <div className="rounded-xl sm:rounded-2xl border border-white/8 bg-white/[0.03] p-2.5 sm:p-3.5">
                <div className="mb-1.5 sm:mb-2 flex items-center justify-between gap-2">
                  <span className="text-[9px] sm:text-xs uppercase tracking-[0.16em] text-white/45">
                    Status
                  </span>

                  <span
                    className={`font-mono text-[10px] sm:text-xs shrink-0 ${
                      deployed
                        ? "text-terminal-accent"
                        : deploying
                          ? "text-yellow-300"
                          : "text-white/60"
                    }`}
                  >
                    {deployed
                      ? "cv: online"
                      : deploying
                        ? "publishing..."
                        : `stage: ${stages[activeStageIndex]?.title ?? "start"}`}
                  </span>
                </div>

                <div className="text-[11px] sm:text-sm leading-relaxed text-white/70">
                  {deployed
                    ? "My resume has been published and you are now viewing the live final version."
                    : deploying
                      ? "You reached the final step and the deployment is happening now."
                      : "Your scroll is driving each step of my resume publication in real time."}
                </div>
              </div>
            )}

            {deployed && !isCollapsed && (
              <div className="rounded-xl sm:rounded-2xl border border-terminal-accent/20 bg-terminal-accent/[0.08] p-2.5 sm:p-3.5 animate-[deployPop_0.45s_ease-out]">
                <div className="mb-1 flex items-center gap-2 text-terminal-accent">
                  <Rocket size={13} className="sm:w-[14px] sm:h-[14px]" />
                  <span className="text-xs sm:text-sm font-semibold">
                    Resume published
                  </span>
                </div>

                <p className="text-[11px] sm:text-sm text-white/75">
                  You followed the process and now my portfolio is officially
                  live.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PipelineRoadmap;
