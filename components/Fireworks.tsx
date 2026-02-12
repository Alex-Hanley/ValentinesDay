"use client";

import { AnimatePresence, motion } from "framer-motion";

interface FireworksProps {
  visible: boolean;
}

const BURSTS = [
  { x: 20, y: 30, color: "#fb7185", delay: 0 },
  { x: 50, y: 20, color: "#f43f5e", delay: 0.15 },
  { x: 80, y: 32, color: "#ec4899", delay: 0.3 },
  { x: 30, y: 65, color: "#fda4af", delay: 0.45 },
  { x: 70, y: 62, color: "#f472b6", delay: 0.6 },
];

export function Fireworks({ visible }: FireworksProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[80] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {BURSTS.map((burst, burstIdx) => (
            <div
              key={`burst-${burstIdx}`}
              className="absolute"
              style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
            >
              {Array.from({ length: 14 }).map((_, particleIdx) => {
                const angle = (particleIdx / 14) * Math.PI * 2;
                const distance = 70 + (particleIdx % 4) * 16;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                return (
                  <motion.span
                    key={`p-${burstIdx}-${particleIdx}`}
                    className="absolute block rounded-full"
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: burst.color,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: [0, tx],
                      y: [0, ty],
                      opacity: [1, 0],
                      scale: [1, 0.2],
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      delay: burst.delay,
                      repeat: 2,
                      repeatDelay: 0.35,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

