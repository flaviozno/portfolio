import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal(sectionRef, steps, refreshKey) {
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const media = gsap.matchMedia();

    media.add(
      { all: "all", reduceMotion: "(prefers-reduced-motion: reduce)" },
      ({ conditions }) => {
        steps.forEach(({ target, from, each = false, start = "top 80%" }) => {
          const elements = gsap.utils.toArray(target, sectionRef.current);
          const groups = each ? elements.map((element) => [element]) : [elements];

          groups.forEach((group, index) => {
            if (!group.length) return;

            const bounds = group[0].getBoundingClientRect();
            if (bounds.bottom <= 0) return;

            const entrance = conditions.reduceMotion
              ? { autoAlpha: 0, duration: 0.35 }
              : typeof from === "function"
                ? from(index, group[0])
                : from;
            const {
              duration = 0.8,
              stagger = 0,
              ease = "power3.out",
              ...initial
            } = entrance;
            const startingValues = { autoAlpha: 0, ...initial };
            const restingValues = { autoAlpha: 1 };

            for (const property of ["x", "y", "rotation"]) {
              if (property in startingValues) restingValues[property] = 0;
            }
            if ("scale" in startingValues) restingValues.scale = 1;
            if ("filter" in startingValues) restingValues.filter = "blur(0px)";
            if ("clipPath" in startingValues) {
              restingValues.clipPath = "inset(0% 0% 0% 0%)";
            }

            gsap.set(group, startingValues);

            const animation = gsap.to(group, {
              ...restingValues,
              duration,
              stagger,
              ease,
              clearProps: "all",
              paused: true,
            });

            if (bounds.top < window.innerHeight * 0.8) {
              animation.play();
            } else {
              ScrollTrigger.create({
                trigger: group[0],
                start,
                once: true,
                onEnter: () => animation.play(),
              });
            }
          });
        });
      },
      sectionRef,
    );

    return () => media.revert();
  }, [sectionRef, steps, refreshKey]);
}
