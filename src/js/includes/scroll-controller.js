import { $body, classes } from './globals';
import { toggleScroll } from '../modules/smooth-scrolling';

export const ScrollController = {
	$body,
	scrollLockClass: classes.scrollLock,
	lenisToggleScroll: toggleScroll,
	enableScroll: function() {
		this.$body.removeClass(this.scrollLockClass);

		this.lenisToggleScroll(true);
	},
	disableScroll: function() {
		this.$body.addClass(this.scrollLockClass);

		this.lenisToggleScroll(false);
	},
	toggleScroll: function(state = null) {
		if(state === null) {
			return;
		}

		state ? this.enableScroll() : this.disableScroll();
	},
};
