/** Button-only surface break. Normal scroll never fires this. */
export const PLUNGE_IMPACT_EVENT = "traionis:plunge-impact";

/** How long the canvas splash runs — scroll waits for this to finish. */
export const PLUNGE_IMPACT_MS = 560;

export type PlungeImpactDetail = {
  clientX: number;
  clientY: number;
};

export function dispatchPlungeImpact(clientX: number, clientY: number) {
  window.dispatchEvent(
    new CustomEvent<PlungeImpactDetail>(PLUNGE_IMPACT_EVENT, {
      detail: { clientX, clientY },
    }),
  );
}
