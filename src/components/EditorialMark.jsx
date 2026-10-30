import { motion as Motion } from "motion/react";

const pathProps = {
  d: "M2 10 C26 3 51 13 98 5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  vectorEffect: "non-scaling-stroke",
};

const EditorialMark = ({ children, immediate = false, motionEnabled = true, inverted = false }) => (
  <span className="relative inline-block whitespace-nowrap">
    {children}
    <svg viewBox="0 0 100 15" preserveAspectRatio="none" aria-hidden="true" focusable="false"
      className={`pointer-events-none absolute -bottom-[.12em] left-0 h-[.18em] w-full overflow-visible ${inverted ? "text-canvas" : "text-accent"}`}>
      {immediate ? (
        <Motion.path {...pathProps} initial={motionEnabled ? { pathLength: 0 } : false} animate={{ pathLength: 1 }}
          transition={{ duration: motionEnabled ? 1.05 : 0, delay: motionEnabled ? .7 : 0, ease: "easeOut" }} />
      ) : <path {...pathProps} data-mark />}
    </svg>
  </span>
);

export const MarkedEnding = ({ text, inverted = false }) => {
  const lastSpace = text.lastIndexOf(" ");
  const leading = lastSpace < 0 ? "" : text.slice(0, lastSpace + 1);
  const ending = text.slice(lastSpace + 1);

  return <>{leading}<EditorialMark inverted={inverted}>{ending}</EditorialMark></>;
};

export default EditorialMark;
