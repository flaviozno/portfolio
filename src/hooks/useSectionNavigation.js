import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const useSectionNavigation = (motionEnabled) => {
  useEffect(() => {
    let activeTween;

    const focusSection = (section) => {
      const heading = section.querySelector("h1, h2") || section;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    };

    const onAnchorClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!anchor || (anchor.target && anchor.target !== "_self")) return;

      const id = anchor.getAttribute("href")?.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (!section) return;

      event.preventDefault();
      activeTween?.kill();
      if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);

      const headerHeight = document.querySelector("[data-site-header-bar]")?.getBoundingClientRect().height || 72;
      const destination = Math.max(0, window.scrollY + section.getBoundingClientRect().top - headerHeight - 16);

      if (!motionEnabled) {
        window.scrollTo(0, destination);
        focusSection(section);
        return;
      }

      const distance = Math.abs(destination - window.scrollY);
      activeTween = gsap.to(window, {
        scrollTo: { y: destination, autoKill: true },
        duration: Math.min(1.55, Math.max(.65, distance / 1500)),
        ease: "power2.inOut",
        onComplete: () => focusSection(section),
      });
    };

    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      activeTween?.kill();
    };
  }, [motionEnabled]);
};

export default useSectionNavigation;
