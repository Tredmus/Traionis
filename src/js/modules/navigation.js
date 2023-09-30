import { $, $doc, $body, classes, breakpoints } from '../includes/globals';
import { ScrollController } from '../includes/scroll-controller';

const breakpoint = breakpoints.tablet;

$doc.on('click', '.js-menu-toggle', event => {
	event.stopPropagation();
	toggleMenu();
});

$(breakpoint).on('change', resetMenuOnBreakpoint);

export function toggleMenu(state = () => $body.hasClass(classes.menuOpen)) {
	$body.toggleClass(classes.menuOpen, state);
	ScrollController.toggleScroll(!$body.hasClass(classes.menuOpen));
}

function resetMenuOnBreakpoint() {
	if(!$body.hasClass(classes.menuOpen)) {
		return;
	}

	ScrollController.toggleScroll(!breakpoint.matches);
}
