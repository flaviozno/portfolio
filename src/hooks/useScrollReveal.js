import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const revealStyles = {
  heading: { x: -38, y: 12, duration: .9, start: "top 82%" },
  rise: { y: 24, duration: .72 },
  "from-left": { x: -38, duration: .78 },
  "from-right": { x: 38, duration: .78 },
  card: { y: 46, scale: .96, duration: .82 },
  "row-left": { x: -26, y: 8, duration: .7, start: "top 90%" },
  "row-right": { x: 26, y: 8, duration: .7, start: "top 90%" },
  scale: { y: 26, scale: .95, duration: .85 },
  step: { y: 32, scale: .97, duration: .72 },
  contact: { y: 46, scale: .98, duration: .95, start: "top 84%" },
};

const useScrollReveal = (sectionRef, refreshKey, motionEnabled) => {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !motionEnabled) return;
    const elements = gsap.utils.toArray("[data-reveal]", section);
    const compact = window.matchMedia("(max-width: 639px)").matches;

    const context = gsap.context((self) => {
      elements.forEach((element) => {
        const variant = revealStyles[element.dataset.reveal] || revealStyles.rise;
        const { duration, start = "top 88%", ...initial } = variant;
        const order = Number(element.dataset.revealOrder || 0);
        const from = compact
          ? { ...initial, x: 0, y: initial.y ? initial.y * .6 : 18, scale: initial.scale ? Math.max(initial.scale, .98) : 1 }
          : initial;

        ScrollTrigger.create({
          trigger: element,
          start,
          once: true,
          onEnter: () => self.add(() => {
            gsap.fromTo(element,
              { autoAlpha: 0, ...from },
              { autoAlpha: 1, x: 0, y: 0, scale: 1, duration, delay: order * .065, ease: "power3.out", clearProps: "all" },
            );

            element.querySelectorAll("[data-mark]").forEach((mark) => {
              const length = mark.getTotalLength();
              gsap.fromTo(mark,
                { strokeDasharray: length, strokeDashoffset: length },
                { strokeDashoffset: 0, duration: 1.05, delay: .28 + order * .065, ease: "power2.out", clearProps: "strokeDasharray,strokeDashoffset" },
              );
            });
          }),
        });
      });
    }, section);

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(frame);
      context.revert();
      gsap.set(elements, { clearProps: "all" });
    };
  }, [sectionRef, refreshKey, motionEnabled]);
};

export default useScrollReveal;
