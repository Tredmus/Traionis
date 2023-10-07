import { $, $doc, classes } from '../includes/globals';

$doc.on('click', '.js-services .js-service .js-service-toggle', event => {
	event.preventDefault();

	const $target = $(event.currentTarget);
	const $service = $target.closest('.js-service');
	const $parent = $target.closest('.js-services');
	const $services = $parent.find('.js-service');
	const $slider = $target.closest('.js-slider-services');
	const { service = '' } = $service.data();
	const $servicesDetails = $parent.find(`.js-service-tab`);
	const $serviceDetails = $parent.find(`.js-service-tab[data-service="${service}"]`);

	if(!service.length || !$serviceDetails.length) {
		return;
	}

	$services.removeClass(classes.current);
	$service.addClass(classes.current);

	$servicesDetails.removeClass(classes.current);
	$serviceDetails.addClass(classes.current);

	$slider.trigger('updateSlider');
});
