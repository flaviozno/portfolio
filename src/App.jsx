import ScrollHint from "./components/ScrollHint";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none z-0"></div>
      <div className="relative z-10">
        <main className="relative">
          <Hero />
          <About />
          <TechStack />
          <Experience />
          <Education />
          <Contact />
          <ScrollHint />
        </main>
      </div>
    </div>
  );
}

export default App;
