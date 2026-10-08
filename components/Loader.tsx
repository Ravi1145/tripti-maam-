"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    let seen = false;
    try { seen = !!sessionStorage.getItem("tt-loaded"); } catch (e) { seen = false; }
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem("tt-loaded", "1"); } catch (e) { /* ignore */ }
    }, seen ? 0 : 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-teal-950"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9 }} className="font-serif text-7xl text-gold-light">
            TT
          </motion.div>
          <motion.div initial={{ width: 0 }} animate={{ width: 160 }} transition={{ duration: 1.4, delay: 0.3 }} className="mt-6 h-px bg-gold" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-5 text-xs uppercase tracking-[0.4em] text-ivory/70">
            Tripta Tarunesh
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
