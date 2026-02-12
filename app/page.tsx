"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Fireworks } from "@/components/Fireworks";
import { FloatingElements } from "@/components/FloatingElements";
import { GlassCard } from "@/components/GlassCard";
import { ImageCarousel } from "@/components/ImageCarousel";
import { LoveDecor, LovePlane } from "@/components/LoveDecor";
import { ValentineQuestion } from "@/components/ValentineQuestion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const CARD_AT_MS = 7_000;
const CLICK_ME_AT_MS = 8_000;
const WHITE_FADE_MS = 600;
const NYC_FADE_MS = 1200;
const BUBBLE_AFTER_NYC_MS = 3000;
const SAD_TEXT_DURATION_MS = 5000;
const FADE_TO_PINK_MS = 1200;
const TEASER_DELAY_MS = 500;
const TEASER_DURATION_MS = 4000;
const TEASER_FADE_MS = 600;
const VALENTINE_BOX_DELAY_MS = 800;
const FIREWORKS_DURATION_MS = 2600;

export default function ValentinePage() {
  const [mounted, setMounted] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [clickMeVisible, setClickMeVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [whiteOpacity, setWhiteOpacity] = useState(0);
  const [nycVisible, setNycVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [transitioningToPink, setTransitioningToPink] = useState(false);
  const [pinkOnly, setPinkOnly] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [teaserFadingOut, setTeaserFadingOut] = useState(false);
  const [valentineVisible, setValentineVisible] = useState(false);
  const [fireworksVisible, setFireworksVisible] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const nycRevealStartRef = useRef<number | null>(null);
  const bubbleShownAtRef = useRef<number | null>(null);
  const hasTriggeredClickRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setDimmed(true);
      setCardVisible(true);
    }, CARD_AT_MS);
    const t2 = setTimeout(() => setClickMeVisible(true), CLICK_ME_AT_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleClickMe = useCallback(() => {
    if (hasTriggeredClickRef.current) return;
    hasTriggeredClickRef.current = true;
    setClicked(true);
    setWhiteOpacity(1);
    setTimeout(() => {
      setNycVisible(true);
      nycRevealStartRef.current = Date.now();
    }, WHITE_FADE_MS);
  }, []);

  useEffect(() => {
    if (!nycVisible) return;
    const t = setTimeout(() => setWhiteOpacity(0), 50);
    return () => clearTimeout(t);
  }, [nycVisible]);

  // Bubble 3s after NYC
  useEffect(() => {
    if (!nycVisible || !nycRevealStartRef.current) return;
    const elapsed = Date.now() - nycRevealStartRef.current;
    const delay = Math.max(0, BUBBLE_AFTER_NYC_MS - elapsed);
    const t = setTimeout(() => {
      setBubbleVisible(true);
      bubbleShownAtRef.current = Date.now();
    }, delay);
    return () => clearTimeout(t);
  }, [nycVisible]);

  // 5s after "I'm sad..." → fade to light pink (no NYC, no floaters)
  useEffect(() => {
    if (!bubbleVisible || !bubbleShownAtRef.current) return;
    const t = setTimeout(() => {
      setTransitioningToPink(true);
      setTimeout(() => {
        setPinkOnly(true);
        setNycVisible(false);
        setBubbleVisible(false);
        setTransitioningToPink(false);
      }, FADE_TO_PINK_MS);
    }, SAD_TEXT_DURATION_MS);
    return () => clearTimeout(t);
  }, [bubbleVisible]);

  // Teaser "But I still want to ask you..." after pink only
  useEffect(() => {
    if (!pinkOnly) return;
    const t1 = setTimeout(() => setTeaserVisible(true), TEASER_DELAY_MS);
    return () => clearTimeout(t1);
  }, [pinkOnly]);

  // Teaser stays 4s then fade out, then show Valentine box
  useEffect(() => {
    if (!teaserVisible) return;
    const t = setTimeout(() => {
      setTeaserFadingOut(true);
      setTimeout(() => {
        setTeaserVisible(false);
        setTeaserFadingOut(false);
        setTimeout(() => setValentineVisible(true), VALENTINE_BOX_DELAY_MS);
      }, TEASER_FADE_MS);
    }, TEASER_DURATION_MS);
    return () => clearTimeout(t);
  }, [teaserVisible]);

  const handleYes = useCallback(() => {
    setValentineVisible(false);
    setFireworksVisible(true);
    setTimeout(() => {
      setFireworksVisible(false);
      setCarouselVisible(true);
    }, FIREWORKS_DURATION_MS);
  }, []);

  const showFloaters = !pinkOnly;
  const showPinkBg = !nycVisible && !pinkOnly;
  const lightPinkOpacity = transitioningToPink || pinkOnly ? 1 : 0;

  return (
    <main className="relative min-h-screen">
      <LoveDecor />

      {/* Animated pink background — hidden when NYC or when we have plain light pink */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: showPinkBg ? 1 : 0 }}
        transition={{ duration: NYC_FADE_MS / 1000, ease: "easeOut" }}
      >
        <AnimatedBackground />
      </motion.div>

      {/* Plain light pink — visible only after fade from NYC */}
      <motion.div
        className="fixed inset-0 z-[32] pointer-events-none bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100"
        initial={false}
        animate={{ opacity: lightPinkOpacity }}
        transition={{ duration: FADE_TO_PINK_MS / 1000, ease: "easeOut" }}
        aria-hidden
      />

      {/* Initial fade-in */}
      <motion.div
        className="fixed inset-0 z-30 pointer-events-none bg-gradient-to-br from-pink-100 to-rose-200"
        initial={{ opacity: 1 }}
        animate={{ opacity: mounted ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        aria-hidden
      />

      {showFloaters && (
        <FloatingElements
          dimmed={dimmed}
          dimmedOpacity={nycVisible ? 0.22 : 0.4}
        />
      )}
      <GlassCard
        visible={cardVisible && !clicked}
        showClickMe={clickMeVisible && !clicked}
        clicked={clicked}
        onClickMe={handleClickMe}
      />

      {/* White fade overlay (after click) */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none bg-white"
        initial={false}
        animate={{ opacity: whiteOpacity }}
        transition={{
          duration:
            whiteOpacity === 1 ? WHITE_FADE_MS / 1000 : NYC_FADE_MS / 1000,
          ease: "easeInOut",
        }}
        aria-hidden
      />

      {/* NYC background */}
      <motion.div
        className="fixed inset-0 z-[35] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity:
            transitioningToPink ? 0 : nycVisible ? 1 : 0,
        }}
        transition={{ duration: FADE_TO_PINK_MS / 1000, ease: "easeOut" }}
      >
        <Image
          src="/images/nyc.png"
          alt=""
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </motion.div>

      {/* "I'm sad..." text — fades out with NYC when transitioningToPink */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity:
            transitioningToPink ? 0 : bubbleVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="rounded-2xl bg-pink-100/90 px-8 py-6 sm:px-10 sm:py-8 shadow-lg border border-pink-200/50 max-w-3xl">
          <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-rose-900/95 leading-tight">
            I&apos;m sad you will be in New York this Valentine&apos;s day
          </p>
        </div>
      </motion.div>

      {/* Teaser: "But I still want to ask you..." */}
      <motion.div
        className="fixed inset-0 z-[55] flex items-center justify-center p-4 pointer-events-none"
        initial={false}
        animate={{
          opacity: teaserFadingOut ? 0 : teaserVisible ? 1 : 0,
        }}
        transition={{ duration: TEASER_FADE_MS / 1000, ease: "easeOut" }}
      >
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm px-8 py-6 sm:px-12 sm:py-8 shadow-xl border border-rose-200/60 max-w-lg">
          <p className="font-display text-2xl sm:text-3xl text-center text-rose-900 leading-relaxed">
            But I still want to ask you...
          </p>
        </div>
      </motion.div>

      <ValentineQuestion visible={valentineVisible} onYes={handleYes} />
      <Fireworks visible={fireworksVisible} />
      <ImageCarousel visible={carouselVisible} />
      <LovePlane visible={carouselVisible} />
    </main>
  );
}