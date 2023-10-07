import { $ } from './globals';

$.fn.maxHeight = function() {
	return Math.max(...this.map((i, elem) => {
		$(elem).height('auto');

		const height = elem.scrollHeight;

		$(elem).height('');

		return height;
	}));
}
