import { $, $win, $body, classes } from '../includes/globals';

let scrollTop = $win.scrollTop();

const checkScroll = () => {
	scrollTop = $win.scrollTop();

	$body.toggleClass(classes.hasScrolled, scrollTop > 0);
};

checkScroll();

$win.on('load scroll', checkScroll);

$win.on('load', () => {
	$body.addClass(classes.pageLoaded);
});
