import { $, $doc, classes } from '../includes/globals';

$doc.on('click', '.js-accordion .js-accordion-toggle', event => {
	event.preventDefault();

	const $target = $(event.currentTarget);
	const { single: isSingle = false } = $target.closest('.js-accordion').data();

	$target.closest('.accordion__section').toggleClass(classes.current);

	if(!isSingle) {
		$target.closest('.accordion__section').siblings().removeClass(classes.current);
	}
});
