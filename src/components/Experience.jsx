import { useRef, useEffect, useState } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Software Developer",
    company: "NTT DATA",
    location: "Uberlandia, Brazil",
    period: "May 2025 - Present",
    description:
      "Development of new features for the payments calendar across backend and frontend. Built microservices with JavaScript, implemented business rules, wrote tests, and participated in refinements. On the frontend, developed with React in a Micro Frontends architecture to deliver modular and high-performance interfaces. Also improved manual processes and automations connected to Salesforce, including data processing and transformation for correct system behavior. Developed and maintained automation microservices with Spring Batch focused on large-scale processing and operational efficiency.",
    stack:
      "Node, Java, TypeScript, Git, Azure, Microservices, BFF, MFE, Willix, MongoDB, RabbitMQ, Docker",
  },
  {
    title: "Full Stack Developer",
    company: "Algar Tech",
    location: "Uberlandia, Brazil",
    period: "Apr 2024 - May 2025",
    description:
      "Supported legacy systems and developed new solutions. Built categorizers with Node.js, NestJS, and JavaScript, and created interfaces with React and Vue. Worked with AWS services such as S3 and Lambda, and supported systems built in Java and .NET, contributing to maintenance, improvements, and new features.",
    stack:
      "Git, Lambda, CloudFront, S3, CodeCommit, Keycloak, Tailwind CSS, Node, React, Vue, NestJS, .NET, TypeORM, SQL Server, PostgreSQL, MongoDB",
  },
  {
    title: "Software Developer",
    company: "Eventz",
    location: "Mexico",
    period: "Oct 2023 - Apr 2024",
    description:
      "Focused on the development and improvement of a web platform. Used Laravel on the backend and Vue on the frontend, contributing to new features and enhancements to existing ones. Maintained and evolved the system to improve performance, usability, and code organization.",
    stack: "Laravel, Vue, MySQL, Tailwind CSS, Git",
  },
  {
    title: "Full Stack Developer",
    company: "NDM Advogados",
    location: "Uberlandia, Brazil",
    period: "May 2022 - Feb 2023",
    description:
      "Contributed to the development and improvement of a web platform for administrators and end users. Used React, Node.js, and PostgreSQL for frontend and backend features. Implemented new functionalities, fixed bugs, and improved system performance and usability while collaborating with the team on scalable solutions.",
    stack: "React, Node.js, PostgreSQL, S3, Redux, Sequelize, Docker, Git",
  },
  {
    title: "Intern - Research and Innovation",
    company: "BRAIN",
    location: "Uberlandia, Brazil",
    period: "Jun 2021 - May 2022",
    description:
      "Contributed to the development and improvement of web platforms using React and Node.js. Worked with AWS services such as S3 and EC2, and participated in the implementation of an IMS network using Asterisk and OpenIMS. Combined development and research activities focused on innovative solutions.",
    stack: "S3, EC2, React, Node, Asterisk, OpenIMS",
  },
  {
    title: "Intern Front-End Developer",
    company: ".ASCII",
    location: "Uberlandia, Brazil",
    period: "Jun 2020 - Jun 2022",
    description: "Created and improved websites for clients.",
    stack: "React, HTML5, CSS, JavaScript, Git, Figma",
  },
];

const floatingQueries = [
  "SELECT * FROM jobs WHERE company = 'Tech Innovations'",
  "db.experiences.find({status: 'active', years: {$gte: 2}})",
  "SELECT title, company FROM roles ORDER BY start_date DESC",
  "db.developers.aggregate([{$match: {active: true}}])",
  "SELECT * FROM experience WHERE skill = 'React'",
  "db.jobs.find({location: {$in: ['São Paulo', 'Remote']}})",
  "SELECT COUNT(*) FROM experience WHERE years_exp > 0",
  "db.roles.find({}).limit(10)",
];

const queryPositions = [
  "top-[10%] left-[5%] [animation-delay:0s]",
  "top-[40%] right-[8%] [animation-delay:3s]",
  "bottom-[25%] left-[12%] [animation-delay:6s]",
  "top-[55%] right-[15%] [animation-delay:2s]",
  "bottom-[15%] right-[10%] [animation-delay:4s]",
  "top-[25%] left-[20%] [animation-delay:5s]",
  "bottom-[30%] right-[5%] [animation-delay:1s]",
  "top-[70%] left-[15%] [animation-delay:3.5s]",
];

const Experience = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 3;

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

  const offset = (currentPage - 1) * itemsPerPage;
  const visibleExperiences = experiences.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(experiences.length / itemsPerPage);

  const handlePageChange = (page) => {
    setIsLoading(true);

    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <style>{`
        @keyframes floatQuery {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.09;
          }
          25% {
            transform: translateY(-40px) translateX(30px) rotate(2deg);
            opacity: 0.07;
          }
          50% {
            transform: translateY(-80px) translateX(-40px) rotate(-2deg);
            opacity: 0.09;
          }
          75% {
            transform: translateY(-40px) translateX(50px) rotate(1deg);
            opacity: 0.08;
          }
        }
      `}</style>

      <section
        id="experience"
        ref={ref}
        className="relative flex min-h-screen items-center px-6 py-20"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {floatingQueries.map((query, index) => (
            <div
              key={query}
              className={`absolute whitespace-nowrap font-mono text-sm leading-relaxed text-terminal-accent opacity-[0.08] blur-[2px] animate-[floatQuery_20s_ease-in-out_infinite] ${queryPositions[index]}`}
            >
              {query}
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <div
            className={`transition-all duration-1000 ${
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="mb-16 text-center text-5xl font-bold md:text-6xl">
              <span className="text-gradient">Career Journey</span>
            </h2>

            {isInView && (
              <>
                <div className="mb-6 overflow-x-auto rounded-xl border border-terminal-accent/20 bg-terminal-accent/5 px-4 py-3 font-mono text-sm text-terminal-accent shadow-[0_0_20px_rgba(0,255,136,0.04)]">
                  SELECT * FROM experience WHERE status = 'active' ORDER BY date
                  DESC LIMIT {itemsPerPage} OFFSET {offset};
                </div>

                <div className="mb-8 font-mono text-sm text-gray-500">
                  ({` Showing ${visibleExperiences.length} of ${experiences.length} rows `})
                </div>
              </>
            )}

            <div
              className={`relative transition-opacity duration-300 ${
                isLoading ? "opacity-60" : "opacity-100"
              }`}
            >
              <div className="space-y-8">
                {visibleExperiences.map((exp, index) => (
                  <div
                    key={`${exp.title}-${currentPage}-${index}`}
                    className={`group relative transition-all duration-700 ${
                      isInView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${250 + index * 120}ms`,
                    }}
                  >
                    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-terminal-accent/40 hover:shadow-[0_10px_40px_rgba(0,255,136,0.08)]">
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-terminal-accent">
                            {exp.title}
                          </h3>

                          <div className="flex items-center gap-2 font-medium text-terminal-text">
                            <Briefcase size={18} />
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-right">
                          <div className="flex items-center justify-end gap-2 text-gray-400">
                            <Calendar size={16} />
                            <span className="text-sm">{exp.period}</span>
                          </div>

                          <div className="flex items-center justify-end gap-2 text-gray-400">
                            <MapPin size={16} />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="leading-relaxed text-gray-300">
                        {exp.description}
                      </p>

                      <p className="mt-4 font-mono text-xs text-terminal-accent/85">
                        Stack: {exp.stack}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/10 backdrop-blur-[2px]">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-terminal-accent/20 border-t-terminal-accent" />
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="rounded-lg border border-terminal-accent bg-terminal-accent/10 px-4 py-2 font-mono text-sm text-terminal-accent transition-all duration-300 hover:bg-terminal-accent/20 hover:shadow-[0_0_12px_rgba(0,255,136,0.18)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={isLoading}
                    className={`min-w-[42px] rounded-lg border px-4 py-2 font-mono text-sm transition-all duration-300 ${
                      currentPage === page
                        ? "border-terminal-accent bg-terminal-accent text-[#050810] shadow-[0_0_16px_rgba(0,255,136,0.2)]"
                        : "border-terminal-accent bg-terminal-accent/10 text-terminal-accent hover:bg-terminal-accent/20 hover:shadow-[0_0_12px_rgba(0,255,136,0.18)]"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="rounded-lg border border-terminal-accent bg-terminal-accent/10 px-4 py-2 font-mono text-sm text-terminal-accent transition-all duration-300 hover:bg-terminal-accent/20 hover:shadow-[0_0_12px_rgba(0,255,136,0.18)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;