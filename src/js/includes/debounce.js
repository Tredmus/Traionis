export function debounce(fn, wait = 200) {
	let timeout = null;

	return function() {
		let context = this;
		let args = arguments;

		clearTimeout(timeout);

		timeout = setTimeout(function() {
			fn.apply(context, args);
		}, wait);
	};
};
