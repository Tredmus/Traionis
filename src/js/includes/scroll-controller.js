import { $body, classes } from './globals';

export const ScrollController = {
	$body,
	scrollLockClass: classes.scrollLock,
	enableScroll: function() { this.$body.removeClass(this.scrollLockClass); },
	disableScroll: function() { this.$body.addClass(this.scrollLockClass); },
	toggleScroll: function(state = null) {
		if(state === null) {
			return;
		}

		state ? this.enableScroll() : this.disableScroll();
	},
};
