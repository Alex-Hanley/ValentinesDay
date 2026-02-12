"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getImageSrc, IMAGE_FILENAMES } from "@/lib/image-list";

interface ImageCarouselProps {
  visible: boolean;
}

export function ImageCarousel({ visible }: ImageCarouselProps) {
  const images = useMemo(
    () => IMAGE_FILENAMES.filter((name) => !/^nyc\./i.test(name)),
    []
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible || images.length === 0) return;
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(t);
  }, [visible, images.length]);

  if (images.length === 0) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[85] flex items-center justify-center p-4"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, idx) => (
          <motion.span
            key={`mem-heart-${idx}`}
            className="absolute text-rose-300/55"
            style={{
              left: `${8 + (idx % 8) * 12}%`,
              top: `${12 + Math.floor(idx / 8) * 48}%`,
              fontSize: `${16 + (idx % 3) * 8}px`,
            }}
            animate={{
              y: [0, -8 - (idx % 4) * 2, 0],
              x: [0, idx % 2 === 0 ? 5 : -5, 0],
              opacity: [0.2, 0.55, 0.2],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.4 + (idx % 5) * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.07,
            }}
          >
            ❤
          </motion.span>
        ))}
      </div>

      <div className="w-full max-w-4xl rounded-3xl bg-white/80 backdrop-blur-md border border-pink-200/60 shadow-2xl p-4 sm:p-6">
        <p className="text-center text-rose-800 font-display text-2xl sm:text-3xl mb-4">
          Our Memories
        </p>

        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-pink-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={images[index]}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
            >
              <Image
                src={getImageSrc(images[index])}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            className="rounded-lg px-4 py-2 bg-rose-100 text-rose-700 hover:bg-rose-200"
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
          >
            Prev
          </button>
          <span className="text-rose-700/80 text-sm">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            className="rounded-lg px-4 py-2 bg-rose-100 text-rose-700 hover:bg-rose-200"
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}

