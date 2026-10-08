"use client";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,input,textarea,[data-cursor]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block">
        <motion.div
          animate={{ width: hover ? 64 : 34, height: hover ? 64 : 34, opacity: hover ? 0.9 : 0.6 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="-ml-[17px] -mt-[17px] rounded-full border border-gold bg-gold/10 mix-blend-difference"
          style={{ translateX: hover ? -15 : 0, translateY: hover ? -15 : 0 }}
        />
      </motion.div>
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block">
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold" />
      </motion.div>
    </>
  );
}
