import { $, $doc, classes } from '../includes/globals';

$doc.on('click', '.js-solutions .js-solution .js-solution-toggle', event => {
	event.preventDefault();

	const $target = $(event.currentTarget);
	const $solution = $target.closest('.js-solution');
	const $parent = $target.closest('.js-solutions');
	const $solutions = $parent.find('.js-solution');
	const $slider = $target.closest('.js-slider-solutions');
	const { solution = '' } = $solution.data();
	const $solutionsDetails = $parent.find(`.js-solution-tab`);
	const $solutionDetails = $parent.find(`.js-solution-tab[data-solution="${solution}"]`);

	if(!solution.length || !$solutionDetails.length) {
		return;
	}

	$solutions.removeClass(classes.current);
	$solution.addClass(classes.current);

	$solutionsDetails.removeClass(classes.current);
	$solutionDetails.addClass(classes.current);

	$slider.trigger('updateSlider');
});
