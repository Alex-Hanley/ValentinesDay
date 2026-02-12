"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface ValentineQuestionProps {
  visible: boolean;
  onYes: () => void;
}

const HEARTS = [
  { left: "10%", top: "16%", size: "text-xl" },
  { left: "22%", top: "28%", size: "text-2xl" },
  { left: "35%", top: "14%", size: "text-lg" },
  { left: "48%", top: "24%", size: "text-2xl" },
  { left: "62%", top: "18%", size: "text-xl" },
  { left: "76%", top: "26%", size: "text-2xl" },
  { left: "88%", top: "16%", size: "text-lg" },
  { left: "14%", top: "70%", size: "text-2xl" },
  { left: "30%", top: "82%", size: "text-xl" },
  { left: "50%", top: "74%", size: "text-2xl" },
  { left: "68%", top: "84%", size: "text-lg" },
  { left: "84%", top: "72%", size: "text-xl" },
];

export function ValentineQuestion({ visible, onYes }: ValentineQuestionProps) {
  const [noPosition, setNoPosition] = useState({ x: 50, y: 55 });
  const [phase, setPhase] = useState<"grow" | "settled">("grow");
  const [noEscaping, setNoEscaping] = useState(false);

  const moveNo = useCallback(() => {
    setNoPosition({
      x: 12 + Math.random() * 76,
      y: 25 + Math.random() * 50,
    });
  }, []);

  const handleNoClick = useCallback(() => {
    if (!noEscaping) setNoEscaping(true);
    moveNo();
  }, [moveNo, noEscaping]);

  useEffect(() => {
    if (!visible) {
      setPhase("grow");
      setNoEscaping(false);
      return;
    }
    const t = setTimeout(() => setPhase("settled"), 1200);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[59] pointer-events-none"
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {HEARTS.map((h, idx) => (
          <motion.span
            key={`heart-${idx}`}
            className={`absolute ${h.size} text-rose-300/70`}
            style={{ left: h.left, top: h.top }}
            animate={{
              y: [0, -10 - (idx % 4) * 2, 0],
              x: [0, (idx % 2 === 0 ? 4 : -4), 0],
              opacity: [0.35, 0.75, 0.35],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.4 + (idx % 4) * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.06,
            }}
          >
            ❤
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="w-full max-w-2xl rounded-3xl border border-rose-200/60 bg-white/90 shadow-2xl backdrop-blur-sm px-8 py-12 sm:px-12 sm:py-16 text-center pointer-events-auto"
          initial={{ scale: 0.15 }}
          animate={{
            scale: visible ? (phase === "settled" ? 0.9 : 0.95) : 0.15,
          }}
          transition={{
            duration: phase === "grow" ? 1 : 0.25,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-rose-900 tracking-tight">
            WILL YOU BE MY VALENTINE?
          </p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{
              opacity: visible && phase === "settled" ? 1 : 0,
            }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.button
              type="button"
              className="rounded-xl bg-rose-500 px-8 py-3 text-white font-semibold shadow-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onYes}
            >
              Yes
            </motion.button>
            {!noEscaping && (
              <motion.button
                type="button"
                className="rounded-xl border-2 border-rose-300 bg-white/90 px-6 py-2.5 text-rose-700 font-medium hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300 cursor-pointer whitespace-nowrap shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNoClick}
              >
                No
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* No button starts inline; after first click it runs around screen */}
      <motion.div
        className="fixed z-[62] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        initial={false}
        animate={{
          left: `${noPosition.x}%`,
          top: `${noPosition.y}%`,
          opacity: visible && phase === "settled" && noEscaping ? 1 : 0,
        }}
        transition={{
          left: { type: "spring", stiffness: 400, damping: 30 },
          top: { type: "spring", stiffness: 400, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <motion.button
          type="button"
          className="pointer-events-auto rounded-xl border-2 border-rose-300 bg-white/90 px-6 py-2.5 text-rose-700 font-medium hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300 cursor-pointer whitespace-nowrap shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNoClick}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          No
        </motion.button>
      </motion.div>
    </>
  );
}
