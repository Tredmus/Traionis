import Lenis from '@studio-freight/lenis';

export const lenisObject = new Lenis();

requestAnimationFrame(raf);

function raf(time) {
	lenisObject.raf(time);

	requestAnimationFrame(raf);
}

export function toggleScroll(state) {
	if(state) {
		lenisObject.start();

		return;
	}

	lenisObject.stop();
}
