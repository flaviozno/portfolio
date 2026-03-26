import { useRef } from "react";
import { Code2, Rocket, Sparkles } from "lucide-react";

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
          <div className="group relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-terminal-accent/20 to-terminal-text/20 backdrop-blur-sm">
              <img
                src="https://github.com/flaviozno.png"
                alt="Flávio Filho"
                className="h-full w-full rounded-2xl border-2 border-terminal-accent/20 object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-terminal-accent/50 group-hover:brightness-110"
              />

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
