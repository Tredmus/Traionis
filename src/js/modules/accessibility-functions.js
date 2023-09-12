import { $, $doc } from '../includes/globals';

// Test Focusing of Elements
// document.addEventListener('focus', event => {
//     console.log(event.target);
// }, true);

export const tabbableTags = [
	'a',
	'button',
	'input',
	'textarea',
	'select',
];

// Skip links
$doc.on('click', '.js-skip-link', function(event) {
	event.preventDefault();

	const $hash = $(this.hash);

	if($hash.length) {
		if(!isTabbable($hash)) {
			$hash.attr('tabindex', '-1');
			$hash.addClass('skipped-element');
		}

		$hash.focus();
	}
});

export function isTabbable($elem) {
	if(tabbableTags.some(selector => $elem.is(selector))) {
		return true;
	}

	if($elem.attr('tabindex')) {
		return true;
	}

	return false;
};
