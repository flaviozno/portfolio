import { useRef, useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { skill: "JavaScript/TypeScript", level: 94 },
  { skill: "Node.js/NestJS", level: 92 },
  { skill: "React (MFE)", level: 90 },
  { skill: "Databases (SQL/NoSQL)", level: 86 },
  { skill: "Cloud & DevOps", level: 84 },
  { skill: "Microservices & Messaging", level: 91 },
  { skill: "Testing & Clean Architecture", level: 88 },
];

const TechStack = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tech"
      ref={ref}
      className="flex min-h-screen items-center justify-center px-6 py-20"
    >
      <div className="w-full max-w-6xl">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[rgba(5,8,16,0.3)] shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-[20px]">
          <div className="flex items-center gap-3 border-b border-white/5 bg-[linear-gradient(to_bottom,rgba(25,30,40,0.8),rgba(13,17,23,0.8))] px-6 py-3">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 font-mono text-sm text-gray-500">
              tech-stack.portfolio
            </span>
          </div>

          <div className="relative px-8 py-12">
            <div className="pointer-events-none absolute inset-0 opacity-30">
              <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-terminal-accent/10 blur-3xl" />
              <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-terminal-text/10 blur-3xl" />
            </div>

            <div
              className={`relative grid items-center gap-12 md:grid-cols-2 transition-all duration-1000 ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div
                className={`transition-all delay-150 duration-1000 ${
                  isInView ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              >
                <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <div className="mb-6">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-terminal-accent/70">
                      Professional Radar
                    </p>
                  </div>

                  <ResponsiveContainer width="100%" height={360}>
                    <RadarChart data={data}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis
                        dataKey="skill"
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                      />
                      <Radar
                        name="Skills"
                        dataKey="level"
                        stroke="#00ff88"
                        fill="#00ff88"
                        fillOpacity={0.22}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div
                className={`transition-all delay-300 duration-1000 ${
                  isInView
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                <div className="mb-8">
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-terminal-text/70">
                    Technologies
                  </p>
                  <h3 className="text-3xl font-bold text-white md:text-4xl">
                    Core Stack From Real Projects
                  </h3>
                  <p className="mt-3 max-w-lg text-gray-400">
                    Built in real-world production environments, with focus on
                    scalability, clean architecture, microservices, and
                    high-performance delivery.
                  </p>
                </div>

                <div className="space-y-5">
                  {data.map((item, index) => (
                    <div
                      key={item.skill}
                      className={`rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-700 hover:border-terminal-accent/20 hover:bg-white/[0.04] hover:shadow-[0_0_25px_rgba(0,255,136,0.05)] ${
                        isInView
                          ? "translate-x-0 opacity-100"
                          : "translate-x-6 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${250 + index * 120}ms`,
                      }}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-medium text-white">
                          {item.skill}
                        </span>
                        <span className="font-semibold text-terminal-accent">
                          {item.level}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-terminal-text to-terminal-accent transition-all duration-1000 ease-out"
                          style={{
                            width: isInView ? `${item.level}%` : "0%",
                            transitionDelay: `${400 + index * 120}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
