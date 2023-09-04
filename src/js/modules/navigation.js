import { $, $win, $doc, $body, classes, breakpoints } from '../includes/globals';
import { ScrollController } from '../includes/scroll-controller';

const $menu      = $('.js-menu'),
	  breakpoint = breakpoints.smallDesktop;

$doc.on('click', '.js-menu-toggle', toggleMenu);

$(breakpoint).on('change', resetMenuOnBreakpoint);

$menu.on('click', '> .menu-item-has-children > a', function(event) {
	event.stopPropagation();

	const $this   = $(event.target),
		  $parent = $this.closest('.menu-item-has-children');

	if($parent.hasClass(classes.current)) return;

	event.preventDefault();

	$parent
		.toggleClass(classes.current)
		.siblings()
			.removeClass(classes.current);
});

function toggleMenu() {
	$body.toggleClass(classes.menuOpen);
	ScrollController.toggleScroll(!$body.hasClass(classes.menuOpen));
}

function resetMenuOnBreakpoint() {
	if(!$body.hasClass(classes.menuOpen)) return;

	ScrollController.toggleScroll(!breakpoint.matches);
}
