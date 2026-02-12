"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  visible: boolean;
  showClickMe?: boolean;
  clicked?: boolean;
  onClickMe?: () => void;
}

export function GlassCard({
  visible,
  showClickMe = false,
  clicked = false,
  onClickMe,
}: GlassCardProps) {
  return (
    <motion.div
      className={`fixed inset-0 flex flex-col items-center justify-center p-4 z-20 ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      initial={false}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.article
          className="w-full max-w-md rounded-3xl border border-white/40 bg-white/25 shadow-glass backdrop-blur-xl px-8 py-12 text-center pointer-events-none"
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={
            visible
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  boxShadow: "0 8px 32px 0 rgba(255, 182, 193, 0.18)",
                }
              : { opacity: 0, y: 80, scale: 0.95 }
          }
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            boxShadow: "0 12px 48px 0 rgba(255, 182, 193, 0.28)",
          }}
        >
          <div className="relative">
            <motion.span
              className="absolute -top-2 -left-4 text-lg opacity-70"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ❤️
            </motion.span>
            <motion.span
              className="absolute -top-2 -right-4 text-lg opacity-70"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              ❤️
            </motion.span>
          </div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-rose-900/90 tracking-tight"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% auto",
              backgroundImage:
                "linear-gradient(90deg, #881337 0%, #be123c 25%, #881337 50%, #be123c 75%, #881337 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            HAILEY!
          </motion.h1>
        </motion.article>

        {/* "Click me" block — floats under the card */}
        {showClickMe && (
          <motion.button
            type="button"
            className="rounded-2xl border border-rose-300/60 bg-white/40 backdrop-blur-md px-6 py-3 text-rose-800 font-medium shadow-md hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-rose-400/50 transition-colors min-w-[140px] cursor-pointer select-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!clicked && onClickMe) onClickMe();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!clicked && onClickMe) onClickMe();
            }}
            disabled={clicked}
          >
            {clicked ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                ✓ Got it!
              </motion.span>
            ) : (
              "click me"
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
