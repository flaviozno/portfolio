import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal(sectionRef, steps, refreshKey) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        steps.forEach(({ target, from, each = false, start = "top 90%", end = "top 55%" }) => {
          const elements = gsap.utils.toArray(target, sectionRef.current);
          const groups = each ? elements.map((element) => [element]) : [elements];

          groups.forEach((group) => {
            if (!group.length) return;

            gsap.from(group, {
              ...from,
              ease: "none",
              scrollTrigger: {
                trigger: group[0],
                start,
                end,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });
          });
        });
      },
      sectionRef,
    );

    return () => media.revert();
  }, [sectionRef, steps, refreshKey]);
}
