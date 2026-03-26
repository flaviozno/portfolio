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

      <div className="pointer-events-none fixed right-2 top-1/2 z-[60] hidden -translate-y-1/2 xl:block">
        <div className="relative origin-right scale-[0.88]">
          <div
            className={`absolute inset-0 bg-terminal-accent/10 blur-xl transition-all duration-300 ${
              isCollapsed ? "rounded-[1.5rem]" : "rounded-[1.75rem]"
            }`}
          />

          <div
            className={`pointer-events-auto relative flex overflow-hidden border border-white/10 bg-[#050810]/75 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition-all duration-300 ${
              isCollapsed
                ? "w-[92px] flex-col gap-3 rounded-[1.5rem] p-3"
                : "w-[272px] flex-col gap-4 rounded-[1.75rem] p-3.5"
            }`}
          >
            <div
              className={`flex items-start ${isCollapsed ? "justify-center" : "justify-between"}`}
            >
              {!isCollapsed && (
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-terminal-accent/70">
                    Portfolio Deploy
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    Resume Deployment
                  </h3>
                </div>
              )}

              <div
                className={`flex items-center ${isCollapsed ? "flex-col gap-2" : "gap-2"}`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-terminal-accent/20 bg-terminal-accent/10 text-terminal-accent animate-[glowFloat_4s_ease-in-out_infinite]">
                  {deployed ? (
                    <CheckCircle2 size={18} />
                  ) : deploying ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <Sparkles size={17} />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsCollapsed((current) => !current)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-terminal-accent/30 hover:text-terminal-accent"
                  aria-label={
                    isCollapsed ? "Expand timeline" : "Collapse timeline"
                  }
                  title={isCollapsed ? "Expand" : "Collapse"}
                >
                  {isCollapsed ? (
                    <ChevronsLeft size={16} />
                  ) : (
                    <ChevronsRight size={16} />
                  )}
                </button>
              </div>
            </div>

            {!isCollapsed && (
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3.5 py-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.16em] text-white/45">
                    Deployment progress
                  </span>
                  <span className="font-mono text-sm text-terminal-accent">
                    {percent}%
                  </span>
                </div>

                <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
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

            <div className={`relative ${isCollapsed ? "pl-0" : "pl-5"}`}>
              <div
                className={`absolute top-2 w-[3px] rounded-full bg-white/6 ${
                  isCollapsed
                    ? "left-1/2 h-[calc(100%-16px)] -translate-x-1/2"
                    : "left-[14px] h-[calc(100%-16px)]"
                }`}
              />

              <div
                className={`absolute top-2 w-[3px] rounded-full bg-[linear-gradient(180deg,rgba(0,255,136,1),rgba(0,255,136,0.08))] shadow-[0_0_18px_rgba(0,255,136,0.35)] transition-all duration-500 ${
                  isCollapsed ? "left-1/2 -translate-x-1/2" : "left-[14px]"
                }`}
                style={{
                  height: `${Math.max(progress * 100, 4)}%`,
                }}
              />

              <div className={isCollapsed ? "space-y-2.5" : "space-y-3"}>
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  const stageProgress = progress * totalStages;
                  const isCompleted = stageProgress > index + 0.45;
                  const isActive = activeStageIndex === index && !deployed;
                  const isDeployNode = stage.key === "deploy";

                  return (
                    <div
                      key={stage.key}
                      className={`group relative rounded-2xl border transition-all duration-500 ${
                        isCollapsed
                          ? `mx-auto flex w-[56px] items-center justify-center px-0 py-2.5 ${
                              isCompleted
                                ? "border-terminal-accent/20 bg-terminal-accent/[0.08]"
                                : isActive
                                  ? "border-terminal-accent/30 bg-white/[0.05]"
                                  : "border-white/6 bg-white/[0.02]"
                            }`
                          : `${
                              isCompleted
                                ? "border-terminal-accent/20 bg-terminal-accent/[0.08]"
                                : isActive
                                  ? "border-terminal-accent/30 bg-white/[0.05]"
                                  : "border-white/6 bg-white/[0.02]"
                            } flex items-start gap-3 px-3 py-2.5`
                      }`}
                      title={isCollapsed ? stage.title : undefined}
                    >
                      <div
                        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border transition-all duration-500 ${
                          isCollapsed
                            ? "left-1/2 -translate-x-1/2"
                            : "left-[-10px]"
                        } ${
                          isCompleted
                            ? "border-terminal-accent bg-terminal-accent shadow-[0_0_18px_rgba(0,255,136,0.45)]"
                            : isActive
                              ? "border-terminal-accent bg-[#050810] animate-[pulseNode_1.8s_ease-in-out_infinite]"
                              : "border-white/15 bg-[#0a101a]"
                        }`}
                      />

                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ${
                          isCompleted
                            ? "border-terminal-accent/25 bg-terminal-accent/10 text-terminal-accent"
                            : isActive
                              ? "border-terminal-accent/25 bg-terminal-accent/10 text-terminal-accent shadow-[0_0_18px_rgba(0,255,136,0.16)]"
                              : "border-white/10 bg-white/[0.03] text-white/55"
                        }`}
                      >
                        {isDeployNode && deploying ? (
                          <Rocket
                            size={16}
                            className="animate-[rocketLaunch_1.2s_ease-in-out_infinite]"
                          />
                        ) : isCompleted ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <Icon size={16} />
                        )}
                      </div>

                      {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <h4 className="text-[15px] font-semibold text-white">
                              {stage.title}
                            </h4>

                            <span
                              className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.14em] ${
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

                          <p className="text-xs leading-relaxed text-white/60">
                            {stage.subtitle}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {!isCollapsed && (
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.16em] text-white/45">
                    Status
                  </span>

                  <span
                    className={`font-mono text-xs ${
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

                <div className="text-sm leading-relaxed text-white/70">
                  {deployed
                    ? "My resume has been published and you are now viewing the live final version."
                    : deploying
                      ? "You reached the final step and the deployment is happening now."
                      : "Your scroll is driving each step of my resume publication in real time."}
                </div>
              </div>
            )}

            {deployed && !isCollapsed && (
              <div className="rounded-2xl border border-terminal-accent/20 bg-terminal-accent/[0.08] p-3.5 animate-[deployPop_0.45s_ease-out]">
                <div className="mb-1 flex items-center gap-2 text-terminal-accent">
                  <Rocket size={14} />
                  <span className="text-sm font-semibold">Resume published</span>
                </div>

                <p className="text-sm text-white/75">
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
