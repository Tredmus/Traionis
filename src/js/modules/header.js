import { $, $body, $header, getHeaderHeight, classes } from '../includes/globals';

initHeader();

function initHeader() {
	if(!$header.length) {
		return;
	}

	// Add header height variable
	const headerResizeObserver = new ResizeObserver(() => {
		$(':root').css({
			'--header-height': `${getHeaderHeight()}px`
		});
	}).observe($header[0]);

	// Toggle header sticky class
	const intercept = document.createElement('div');
	intercept.setAttribute('data-header-observer-intercept', '');
	$header.before(intercept);

	const headerIntersectionObserver = new IntersectionObserver(([entry]) => {
		$body.toggleClass(classes.scrolled, !entry.isIntersecting);
	}, {
		rootMargin: `50px 0px 0px 0px`,
	}).observe(intercept);
}
