import { $, $doc, $win, getHeaderHeight, hasFixedHeader, classes, breakpoints } from '../includes/globals';
import { debounce } from '../includes/debounce';
import { scrollToElement, scrollToPosition } from './scroll-to';

$doc.on('click', '.js-accordion .js-accordion-toggle', event => {
	event.preventDefault();

	const $target = $(event.currentTarget);
	const $accordion = $target.closest('.js-accordion');
	const $accordionSection = $target.closest('.js-accordion-section');
	const scrollPositionFix = fixScrollPosition($target);
	const { single: isSingle = false } = $accordion.data();

	$accordionSection.toggleClass(classes.current);

	if(!isSingle) {
		$accordionSection.siblings().removeClass(classes.current);
	}

	if(scrollPositionFix) {
		scrollToPosition(scrollPositionFix);
	}
});

function fixScrollPosition($target) {
	const $accordionSection = $target.closest('.js-accordion-section');
	const isCurrentSection = !$accordionSection.hasClass(classes.current);

	// No fixes needed
	if(!isCurrentSection) {
		return false;
	}

	const $accordion = $target.closest('.js-accordion');
	const $prevCurrentSection = $accordion.find(`.js-accordion-section.${classes.current}`);
	const targetIndex = $accordionSection.index();
	const prevCurrentSectionIndex = $prevCurrentSection.index();
	const prevCurrentAccordionContentHeight = $prevCurrentSection.length && (prevCurrentSectionIndex < targetIndex) ? $prevCurrentSection.find('.js-accordion-content')[0].scrollHeight : 0;
	const accordionSectionActualOffset = $accordionSection.offset().top - prevCurrentAccordionContentHeight;
	const headerHeight = hasFixedHeader ? getHeaderHeight() : 0;
	const viewTop = $win.scrollTop() + headerHeight;
	const viewBottom = viewTop + $win.height();
	const actualOffsetIsVisible = viewTop < accordionSectionActualOffset && viewBottom > accordionSectionActualOffset;

	if(actualOffsetIsVisible) {
		return false;
	}

	return accordionSectionActualOffset;
}
