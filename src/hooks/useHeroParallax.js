import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useHeroParallax = (sectionRef, imageRef, motionEnabled) => {
  useLayoutEffect(() => {
    if (!motionEnabled || !sectionRef.current || !imageRef.current) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => {
      const context = gsap.context(() => {
        gsap.to(imageRef.current, {
          yPercent: -3,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: .7,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
      return () => context.revert();
    });

    return () => media.revert();
  }, [sectionRef, imageRef, motionEnabled]);
};

export default useHeroParallax;
