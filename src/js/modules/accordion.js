import { $, $doc, classes, breakpoints } from '../includes/globals';
import { debounce } from '../includes/debounce';
import { scrollToElement } from './scroll-to';

$doc.on('click', '.js-accordion .js-accordion-toggle', event => {
	event.preventDefault();

	const $target = $(event.currentTarget);
	const { single: isSingle = false } = $target.closest('.js-accordion').data();

	$target.closest('.js-accordion-section').toggleClass(classes.current);

	if(!isSingle) {
		$target.closest('.js-accordion-section').siblings().removeClass(classes.current);
	}
});

$doc.on('transitionend', '.js-accordion', event => {
	if(!breakpoints.mobile.matches) {
		return;
	}

	const $target = $(event.originalEvent.target);
	const $accordionSection = $target.closest('.js-accordion-section');
	const isCurrentSection = $accordionSection.hasClass(classes.current);
	const isAnimation = event.originalEvent.propertyName === 'grid-template-rows';

	if(isCurrentSection && isAnimation) {
		scrollToElement($accordionSection);
	}
});
