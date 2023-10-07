import { $, $doc } from '../includes/globals';
import { debounce } from '../includes/debounce';
import { scrollToElement } from './scroll-to';
import '../includes/max-height';
import TypeIt from 'typeit';

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

$doc.on('click', '.js-plan-btn', event => {
	const $target = $(event.currentTarget);

	const { message = '' } = $target.data();
	const $messageBox = $('.js-contact-message');
	const $contactSection = $('.js-section-contact');
	const messages = [...document.querySelectorAll('.js-plan-btn')].map(elem => $(elem).data('message'));
	const messageBoxIsAlreadyACustomMessage = messages.some(item => item === $messageBox.val());

	if(messageBoxIsAlreadyACustomMessage) {
		$messageBox.val('');
	}

	scrollToElement($contactSection, -1, addCustomMessage);

	function addCustomMessage() {
		if($messageBox.val().length || !message.length) {
			return;
		}

		new TypeIt($messageBox[0], {
			strings: message,
			lifeLike: true,
			speed: 25,
			afterComplete() {
				$messageBox.focus();
			}
		}).go();
	}
});
