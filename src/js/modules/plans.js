import { $ } from '../includes/globals';
import { debounce } from '../includes/debounce';
import '../includes/max-height';

const plansObserver = new ResizeObserver(debounce(() => {
	const $plans = $('.js-plan');
	const $titles = $plans.find('.plan__title');
	const $prices = $plans.find('.plan__pricing');
	const $entries = $plans.find('.plan__text');

	if($titles.length) {
		$plans.css({ '--title-height': `${$titles.maxHeight()}px` });
	}

	if($prices.length) {
		$plans.css({ '--pricing-height': `${$prices.maxHeight()}px` });
	}

	if($entries.length) {
		$plans.css({ '--entry-height': `${$entries.maxHeight()}px` });
	}
}, 100));

$('.js-plan').each((i, plan) => plansObserver.observe(plan));
