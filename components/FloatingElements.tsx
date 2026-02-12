"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  computeAvoidanceTarget,
  lerpOffset,
  useMousePositionRef,
  type Position,
} from "@/hooks/useMouseAvoidance";
import { IMAGE_FILENAMES, getImageSrc } from "@/lib/image-list";

const HEART = "❤";
const NUM_IMAGES = 12;
const NUM_HEARTS = 8;

/** Speed range: % of viewport per second (so they move in all directions) */
const MIN_SPEED = 6;
const MAX_SPEED = 14;

function useRandomPositions(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      })),
    [count]
  );
}

function wrap(v: number, min: number, max: number): number {
  const range = max - min;
  return min + ((((v - min) % range) + range) % range);
}

interface FloatingElementsProps {
  dimmed: boolean;
  /** Opacity when dimmed (e.g. 0.4 for card view, 0.22 for NYC view) */
  dimmedOpacity?: number;
}

export function FloatingElements({ dimmed, dimmedOpacity = 0.4 }: FloatingElementsProps) {
  const mouseRef = useMousePositionRef();
  const lastOffsetsRef = useRef<Record<string, Position>>({});
  const itemRefsRef = useRef<Record<string, HTMLElement | null>>({});
  const positionsRef = useRef<Record<string, { x: number; y: number }>>({});
  const velocitiesRef = useRef<Record<string, { vx: number; vy: number }>>({});
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const imageIndices = useMemo(
    () =>
      Array.from({ length: NUM_IMAGES }, (_, i) =>
        Math.floor((i * IMAGE_FILENAMES.length) / NUM_IMAGES)
      ),
    []
  );
  const imagePositions = useRandomPositions(NUM_IMAGES);
  const heartPositions = useRandomPositions(NUM_HEARTS);

  const setRef = useCallback((id: string, el: HTMLElement | null) => {
    itemRefsRef.current[id] = el;
  }, []);

  const ids = useMemo(
    () => [
      ...imageIndices.map((_, i) => `img-${i}`),
      ...Array.from({ length: NUM_HEARTS }, (_, i) => `heart-${i}`),
    ],
    [imageIndices]
  );

  useLayoutEffect(() => {
    ids.forEach((id, i) => {
      lastOffsetsRef.current[id] = { x: 0, y: 0 };
      const positions = i < NUM_IMAGES ? imagePositions : heartPositions;
      const j = i < NUM_IMAGES ? i : i - NUM_IMAGES;
      positionsRef.current[id] = { ...(positions[j] ?? { x: 50, y: 50 }) };
      const angle = Math.random() * Math.PI * 2;
      const speed =
        MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
      velocitiesRef.current[id] = {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });
  }, [ids, imagePositions, heartPositions]);

  useEffect(() => {
    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      const mouse = mouseRef.current;

      ids.forEach((id) => {
        const el = itemRefsRef.current[id];
        if (!el) return;

        const pos = positionsRef.current[id];
        const vel = velocitiesRef.current[id];
        if (!pos || !vel) return;

        pos.x = wrap(pos.x + vel.vx * dt, 0, 100);
        pos.y = wrap(pos.y + vel.vy * dt, 0, 100);

        el.style.left = `${pos.x}%`;
        el.style.top = `${pos.y}%`;

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const target = computeAvoidanceTarget(cx, cy, mouse.x, mouse.y);
        const last = lastOffsetsRef.current[id] ?? { x: 0, y: 0 };
        const lerped = lerpOffset(last, target);
        lastOffsetsRef.current[id] = lerped;
        el.style.transform = `translate(-50%, -50%) translate(${lerped.x}px, ${lerped.y}px)`;
      });
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ids, mouseRef]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: dimmed ? dimmedOpacity : 1,
          filter: dimmed ? "blur(2px)" : "blur(0px)",
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {imageIndices.map((idx, i) => {
          const id = `img-${i}`;
          const pos = imagePositions[i] ?? { x: 50, y: 50 };
          const filename = IMAGE_FILENAMES[idx];
          return (
            <div
              key={id}
              ref={(el) => setRef(id, el)}
              className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                willChange: "transform, left, top",
              }}
            >
              <Image
                src={getImageSrc(filename)}
                alt=""
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          );
        })}
        {Array.from({ length: NUM_HEARTS }, (_, i) => {
          const id = `heart-${i}`;
          const pos = heartPositions[i] ?? { x: 50, y: 50 };
          return (
            <span
              key={id}
              ref={(el) => setRef(id, el)}
              className="absolute text-xl sm:text-2xl md:text-3xl opacity-90 drop-shadow-sm"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                willChange: "transform, left, top",
              }}
            >
              {HEART}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
