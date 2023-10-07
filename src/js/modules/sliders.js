import { $, classes, breakpoints } from '../includes/globals';
import { createSwiper } from '../includes/create-swiper';

$('.js-slider-services').each((i, container) => {
	const $container = $(container);

	const swiper = createSwiper({
		$container,
		options: {
			grabCursor: true,
			slideToClickedSlide: true,
			on: {
				init(swiper) {
					updateCurrentSlide(swiper);
				}
			}
		},
		breakpoint: breakpoints.smallDesktop
	});

	updateCurrentSlide(swiper);
	$container.on('updateSlider', () => updateCurrentSlide(swiper));

	function updateCurrentSlide(swiper) {
		if(!swiper) {
			return;
		}

		const $currentService = $container.find(`.js-service.${classes.current}`);
		const currentServiceIndex = $currentService.closest('.swiper-slide').index();

		swiper.slideTo(currentServiceIndex);
	}
});
