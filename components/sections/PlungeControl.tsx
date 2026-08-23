"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

import { EASE_DESCENT } from "@/lib/depth";
import { useCopy } from "@/lib/locale-context";
import { dispatchPlungeImpact, PLUNGE_IMPACT_MS } from "@/lib/plunge";

/** Ease-out: moves on the first frame, settles at the end. */
function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/**
 * The invite past the fold.
 *
 * Copy stays neutral — the descent is never named. Idle state is a sounding
 * line: accent travels top → bottom so the control reads as something to
 * press. On click: splash the surface, then scroll once that break has played
 * out (button only — ordinary scroll never fires the splash).
 */
export function PlungeControl({ className = "" }: { className?: string }) {
  const copy = useCopy();
  const reduced = useReducedMotion();
  const [plunging, setPlunging] = useState(false);
  const busy = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function plunge() {
    if (busy.current) return;
    busy.current = true;

    const hero = document.querySelector<HTMLElement>('[data-zone="surface"]');
    const dest = hero
      ? Math.max(
          0,
          hero.getBoundingClientRect().bottom +
            window.scrollY -
            window.innerHeight * 0.28,
        )
      : (() => {
          const target = document.getElementById("offerings");
          if (!target) return window.scrollY;
          const header = document.querySelector("header");
          const pad = header?.getBoundingClientRect().height ?? 72;
          return Math.max(
            0,
            target.getBoundingClientRect().top + window.scrollY - pad,
          );
        })();

    if (reduced) {
      window.scrollTo({ top: dest, behavior: "instant" });
      busy.current = false;
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    dispatchPlungeImpact(
      rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
      rect ? rect.bottom : window.innerHeight * 0.72,
    );
    setPlunging(true);

    window.setTimeout(() => {
      const from = window.scrollY;
      const distance = dest - from;
      const duration = 1200;
      const started = performance.now() - 16;

      const tick = (now: number) => {
        const t = Math.min(1, (now - started) / duration);
        // Must be instant — html { scroll-behavior: smooth } would otherwise
        // ease every frame and fight the authored dive.
        window.scrollTo({
          top: from + distance * easeOutCubic(t),
          behavior: "instant",
        });
        if (t < 1) {
          requestAnimationFrame(tick);
          return;
        }
        busy.current = false;
        setPlunging(false);
      };

      tick(performance.now());
    }, PLUNGE_IMPACT_MS);
  }

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={plunge}
        disabled={plunging}
        aria-label={copy.hero.ctaContinue}
        className={`group relative flex flex-col items-center gap-3 text-label uppercase tracking-[0.2em] focus-visible:outline-none ${className}`.trim()}
        style={{
          color: "color-mix(in srgb, var(--color-ink) 78%, rgb(58 104 148))",
        }}
        initial={false}
        animate={
          plunging
            ? { y: 72, opacity: 0, scale: 0.9 }
            : { y: 0, opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.28, ease: EASE_DESCENT }}
      >
        <span className="transition-colors duration-300 [transition-timing-function:var(--ease-descent)] group-hover:text-[var(--color-accent-hi)] group-focus-visible:text-[var(--color-accent-hi)]">
          {copy.hero.ctaContinue}
        </span>

        {/* Sounding line — accent runs top → bottom as the click cue. */}
        <span
          aria-hidden="true"
          className="relative flex h-[4.75rem] w-11 flex-col items-center"
        >
          <span
            className="absolute top-0 bottom-3 left-1/2 w-px -translate-x-1/2"
            style={{
              background:
                "color-mix(in srgb, var(--color-ink) 22%, transparent)",
            }}
          />
          {!reduced && !plunging && (
            <motion.span
              className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 rounded-full"
              style={{
                height: "38%",
                background:
                  "linear-gradient(to bottom, transparent, var(--color-accent-hi))",
              }}
              animate={{ y: ["0%", "175%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.85,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.12, 0.78, 1],
              }}
            />
          )}
          {reduced && (
            <span
              className="absolute left-1/2 top-[18%] h-[42%] w-[2px] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--color-accent-hi))",
              }}
            />
          )}

          <motion.span
            className="absolute bottom-0 flex h-10 w-10 items-center justify-center rounded-[5px] transition-colors duration-300 [transition-timing-function:var(--ease-descent)] group-hover:border-[var(--color-accent-hi)] group-focus-visible:border-[var(--color-accent-hi)]"
            style={{
              border: "1px solid var(--zone-line-strong)",
              background:
                "color-mix(in srgb, var(--color-zone-surface) 55%, transparent)",
            }}
            animate={
              reduced || plunging
                ? { y: 0 }
                : { y: [0, 4, 0] }
            }
            transition={
              reduced || plunging
                ? { duration: 0.2 }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="transition-colors duration-300 group-hover:text-[var(--color-accent-hi)] group-focus-visible:text-[var(--color-accent-hi)]"
            >
              <path
                d="M2.5 5.25 7 9.75l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </motion.span>
        </span>
      </motion.button>

      {plunging &&
        !reduced &&
        typeof document !== "undefined" &&
        createPortal(
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[45]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.38, 0.5, 0] }}
            transition={{
              duration: (PLUNGE_IMPACT_MS + 1200) / 1000,
              times: [0, 0.22, 0.58, 1],
              ease: EASE_DESCENT,
            }}
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgb(13 27 46 / 0) 0%, rgb(31 62 112 / 0.4) 36%, rgb(31 62 112 / 0.78) 70%, rgb(20 42 78 / 0.88) 100%)",
            }}
          />,
          document.body,
        )}
    </>
  );
}
