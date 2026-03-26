import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

const commands = [
  { text: "$ ssh deploy@portfolio.flavio.dev", delay: 0 },
  { text: "Connecting to server...", delay: 180 },
  { text: "Connection established ✓", delay: 340 },
  { text: "$ git pull origin main", delay: 540 },
  { text: "Fetching latest changes...", delay: 700 },
  { text: "Installing dependencies...", delay: 920 },
  { text: "> yarn install", delay: 1060 },
  { text: "✓ Dependencies installed", delay: 1260 },
  { text: "$ yarn build", delay: 1460 },
  { text: "Building application...", delay: 1600 },
  { text: "✓ Build successful", delay: 1860 },
  { text: "Deploy complete! Redirecting...", delay: 1860 },
];

const TerminalLoader = () => {
  const [visibleCommands, setVisibleCommands] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timeouts = commands.map((cmd) =>
      setTimeout(() => {
        setVisibleCommands((prev) => [...prev, cmd.text]);
      }, cmd.delay),
    );

    return () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCommands]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-terminal-bg z-50">
      <div className="w-full max-w-3xl mx-4">
        <div className="bg-[#0d1117] rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
          <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-gray-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 ml-4 text-gray-400 text-sm">
              <Terminal size={16} />
              <span>deploy@portfolio</span>
            </div>
          </div>

          <div
            className="p-6 font-mono text-sm h-96 overflow-auto"
            ref={scrollRef}
          >
            {visibleCommands.map((cmd, index) => (
              <div key={index} className="mb-2">
                <span
                  className={
                    cmd.startsWith("$")
                      ? "text-terminal-accent"
                      : cmd.includes("✓")
                        ? "text-terminal-text"
                        : "text-gray-400"
                  }
                >
                  {cmd}
                  {index === visibleCommands.length - 1 && (
                    <span className="terminal-cursor ml-1"></span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;
