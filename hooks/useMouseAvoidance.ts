"use client";

import { useEffect, useRef } from "react";

const INFLUENCE_RADIUS = 200;
const MAX_OFFSET = 48;

export interface Position {
  x: number;
  y: number;
}

/** Ref that holds current mouse position. No re-renders on move. */
export function useMousePositionRef() {
  const ref = useRef<Position>({ x: -10000, y: -10000 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current.x = e.clientX;
      ref.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return ref;
}

const SMOOTHING = 0.08;

/**
 * Compute target avoidance offset from element center and mouse position.
 * Call from a single rAF loop and lerp stored offsets with SMOOTHING for smooth motion.
 */
export function computeAvoidanceTarget(
  centerX: number,
  centerY: number,
  mouseX: number,
  mouseY: number
): Position {
  const dx = centerX - mouseX;
  const dy = centerY - mouseY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;

  if (dist > INFLUENCE_RADIUS) return { x: 0, y: 0 };
  const force = 1 - dist / INFLUENCE_RADIUS;
  const magnitude = force * MAX_OFFSET;
  return {
    x: (dx / dist) * magnitude,
    y: (dy / dist) * magnitude,
  };
}

export function lerpOffset(
  current: Position,
  target: Position,
  smoothing: number = SMOOTHING
): Position {
  return {
    x: current.x + (target.x - current.x) * smoothing,
    y: current.y + (target.y - current.y) * smoothing,
  };
}
