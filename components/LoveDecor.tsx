"use client";

import { motion } from "framer-motion";

const HEARTS = [
  { left: "8%", top: "18%", size: "text-lg", delay: 0 },
  { left: "16%", top: "34%", size: "text-xl", delay: 0.3 },
  { left: "27%", top: "24%", size: "text-2xl", delay: 0.5 },
  { left: "39%", top: "16%", size: "text-lg", delay: 0.8 },
  { left: "51%", top: "30%", size: "text-xl", delay: 1.1 },
  { left: "63%", top: "20%", size: "text-2xl", delay: 1.4 },
  { left: "74%", top: "36%", size: "text-lg", delay: 1.7 },
  { left: "86%", top: "22%", size: "text-xl", delay: 2.0 },
  { left: "12%", top: "70%", size: "text-xl", delay: 2.2 },
  { left: "30%", top: "82%", size: "text-lg", delay: 2.5 },
  { left: "49%", top: "72%", size: "text-2xl", delay: 2.8 },
  { left: "68%", top: "84%", size: "text-lg", delay: 3.1 },
  { left: "84%", top: "74%", size: "text-xl", delay: 3.4 },
];

export function LoveDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[18] overflow-hidden">
      {HEARTS.map((h, idx) => (
        <motion.span
          key={`bg-heart-${idx}`}
          className={`absolute ${h.size} text-rose-300/55`}
          style={{ left: h.left, top: h.top }}
          animate={{
            y: [0, -10 - (idx % 3) * 4, 0],
            x: [0, idx % 2 === 0 ? 6 : -6, 0],
            opacity: [0.25, 0.6, 0.25],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 3 + (idx % 4) * 0.45,
            repeat: Infinity,
            ease: "easeInOut",
            delay: h.delay,
          }}
        >
          ❤
        </motion.span>
      ))}

    </div>
  );
}

interface LovePlaneProps {
  visible: boolean;
}

export function LovePlane({ visible }: LovePlaneProps) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[90] overflow-hidden"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="absolute top-10 flex items-center gap-2"
        initial={{ x: "-35vw" }}
        animate={{ x: "120vw" }}
        transition={{
          duration: 16,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <motion.span
          className="text-2xl"
          animate={{ y: [0, -2, 0, 2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ✈
        </motion.span>
        <motion.div
          className="rounded-full border border-rose-300/60 bg-white/75 px-3 py-1 text-rose-700 text-sm shadow-sm"
          animate={{ y: [0, 2, 0, -2, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          i love you
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

