import { DepthZone } from "@/components/depth/DepthZone";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Founder } from "@/components/sections/Founder";
import { Hero } from "@/components/sections/Hero";
import { Offerings } from "@/components/sections/Offerings";
import { Process } from "@/components/sections/Process";
import { WorkZone } from "@/components/sections/WorkZone";

/**
 * The descent.
 *
 *   SURFACE   0m       waterline — brand and claim above, sounding into blue
 *   SHALLOWS  −40m     light still reaching — the two problems, and how we work
 *   MID       −200m    light fading, particulate thickening — the one project
 *   DEEP      −1,000m  no daylight, lamp on — the questions before the call
 *   ABYSS     −4,000m  the floor — who you're working with, then the decision
 *
 * The plunge is the waterline below the first viewport — a living silhouette
 * in the shallows, not a fold. Shallows tucks under the extra band so the
 * crests show water, not sky.
 */
export function HomePage() {
  return (
    <>
      <Hero />

      {/* Tucked under the hero by the waterline overlap so crest bites reveal
          this band (shafts and all) rather than the dusk token. Padding is
          grown by the same amount so content stays where it was. */}
      <DepthZone
        zone="shallows"
        padding="none"
        id="offerings"
        overflow="visible"
        className="relative z-0 -mt-[var(--hero-waterline-overlap)] pb-20 pt-[calc(var(--hero-waterline-overlap)+5.5rem)] sm:pb-28 sm:pt-[calc(var(--hero-waterline-overlap)+7rem)]"
      >
        <Offerings />
      </DepthZone>

      <DepthZone
        zone="mid"
        padding="none"
        id="work"
        blendFrom="shallows"
        className="pb-20 pt-16 sm:pb-28 sm:pt-24"
      >
        <WorkZone />
        {/* Proof, then procedure. Someone holding three proposals wants to see
            that you can build the thing before hearing how the work is run. */}
        <Process />
      </DepthZone>

      <DepthZone
        zone="deep"
        padding="none"
        blendFrom="mid"
        className="pb-20 pt-16 sm:pb-28 sm:pt-24"
      >
        <Faq />
      </DepthZone>

      <DepthZone
        zone="abyss"
        padding="none"
        blendFrom="deep"
        className="pb-20 pt-16 sm:pb-28 sm:pt-24"
      >
        <div id="about" className="scroll-mt-[var(--header-h)]">
          <Founder />
        </div>
        <Contact />
      </DepthZone>
    </>
  );
}
