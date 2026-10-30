import { useEffect, useState } from "react";

const useMotionPreference = () => {
  const [motionEnabled, setMotionEnabled] = useState(
    () => document.documentElement.dataset.motion !== "reduced",
  );

  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? "full" : "reduced";
  }, [motionEnabled]);

  const toggleMotion = () => {
    const next = !motionEnabled;
    try { localStorage.setItem("portfolio-motion", next ? "full" : "reduced"); } catch { /* Storage can be unavailable. */ }
    document.documentElement.dataset.motion = next ? "full" : "reduced";
    setMotionEnabled(next);
  };

  return { motionEnabled, toggleMotion };
};

export default useMotionPreference;
