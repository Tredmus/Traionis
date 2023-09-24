import { $ } from '../includes/globals';
import { debounce } from '../includes/debounce';
import '../includes/max-height';

const plansObserver = new ResizeObserver(debounce(() => {
	const $plans = $('.js-plan');
	const $titles = $plans.find('.plan__title');
	const $prices = $plans.find('.plan__pricing');
	const $entries = $plans.find('.plan__entry');

	$plans.css({
		'--title-height': `${$titles.maxHeight()}px`,
		'--pricing-height': `${$prices.maxHeight()}px`,
		'--entry-height': `${$entries.maxHeight()}px`,
	});
}, 100));

// plansObserver.observe(document.documentElement)

$('.js-plan').each((i, plan) => plansObserver.observe(plan))
