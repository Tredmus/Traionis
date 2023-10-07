import Lenis from '@studio-freight/lenis';
import '../includes/easing';

export const lenisObject = new Lenis({
	lerp: 0.2
});

requestAnimationFrame(raf);

function raf(time) {
	lenisObject.raf(time);

	requestAnimationFrame(raf);
}
