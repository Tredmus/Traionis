import { DepthZone } from "@/components/depth/DepthZone";
import { ZoneThreshold } from "@/components/depth/ZoneThreshold";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
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
 *   DEEP      −1,000m  no daylight, lamp on — what that actually involves
 *   ABYSS     −4,000m  the floor — who you're working with, then the decision
 *
 * The plunge is the waterline below the first viewport — a living silhouette
 * in the shallows, not a fold. Shallows tucks under the extra band so the
 * crests show water, not sky.
 */
export default function HomePage() {
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
        className="relative z-0 -mt-[var(--hero-waterline-overlap)] pb-32 pt-[calc(var(--hero-waterline-overlap)+7rem)] sm:pb-44 sm:pt-[calc(var(--hero-waterline-overlap)+9rem)]"
      >
        <ZoneThreshold zone="shallows" />
        <Offerings />
        <Process />
      </DepthZone>

      <DepthZone
        zone="mid"
        padding="none"
        id="work"
        blendFrom="shallows"
        className="pb-32 pt-28 sm:pb-44 sm:pt-36"
      >
        <ZoneThreshold zone="mid" />
        <WorkZone />
      </DepthZone>

      <DepthZone
        zone="deep"
        padding="none"
        blendFrom="mid"
        className="pb-32 pt-28 sm:pb-44 sm:pt-36"
      >
        <ZoneThreshold zone="deep" />
        <Capabilities />
      </DepthZone>

      <DepthZone
        zone="abyss"
        padding="none"
        blendFrom="deep"
        className="pb-32 pt-28 sm:pb-44 sm:pt-36"
      >
        <ZoneThreshold zone="abyss" />
        <Founder />
        <Contact />
      </DepthZone>
    </>
  );
}
