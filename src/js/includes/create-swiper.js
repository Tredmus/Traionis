import { $, $win, classes } from './globals';
import merge from 'lodash/merge';
import Swiper from 'swiper';

Swiper.use([]);

/**
 * Create a swiper with optional navigation and pagination
 * The swiper can be disabled on breakpoint
 * Or can be reinitialized on the given breakpoint with different breakpointOptions
 */
export function createSwiper(args = {}) {
	const {
		$container,
		options: passedOptions = {},
		breakpoint = '',
		breakpointOptions: passedBreakpointOptions = {},
		forceInitialization = false
	} = args;

	const $slider = $container.find('.swiper');

	if(!$slider.length) {
		return;
	}

	if(!forceInitialization && $container.find('.swiper-slide').length <= 1) {
		return;
	}

	const $prevEl = $container.find('.js-slider-prev');
	const $nextEl = $container.find('.js-slider-next');
	const $pagination = $container.find('.swiper-pagination');

	let swiper = undefined;
	const defaultOptions = {
		slidesPerView: 'auto',
		on: {
			slideChange() {
				$win.trigger('updateAOS');
			}
		}
	};

	const objectIsEmpty = object => {
		return Object.keys(object).length === 0;
	};

	const enableSwiper = swiperOptions => {
		swiper = new Swiper($slider[0], swiperOptions);

		$container.addClass(classes.initialized);
	};

	const destroySwiper = () => {
		$container.removeClass(classes.initialized);

		if(swiper !== undefined) {
			swiper.destroy(true, true);
		}
	};

	if($prevEl.length && $nextEl.length) {
		defaultOptions.navigation = {
			prevEl: $prevEl[0],
			nextEl: $nextEl[0]
		};
	}

	if($pagination.length) {
		defaultOptions.pagination = {
			el: $pagination[0],
			clickable: true
		};
	}

	const options = merge({}, defaultOptions, passedOptions);
	const breakpointOptions = !objectIsEmpty(passedBreakpointOptions) ? merge({}, defaultOptions, passedBreakpointOptions) : {};
	const hasBreakpointOptions = !objectIsEmpty(breakpointOptions);

	if(breakpoint !== '') {
		const breakpointChecker = () => {
			destroySwiper();

			if(hasBreakpointOptions) {
				const swiperOptions = breakpoint.matches ? breakpointOptions : options;
				enableSwiper(swiperOptions);

				return;
			}

			if(breakpoint.matches) {
				enableSwiper(options);
			}
		};

		$(breakpoint).on('change', breakpointChecker);
		breakpointChecker();
	}
	else {
		enableSwiper(options);
	}

	return swiper;
}
