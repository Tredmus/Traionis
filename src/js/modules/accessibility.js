import { $, $doc, $body, classes } from '../includes/globals';

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

export function isTabbable($elem) {
	if(tabbableTags.some(selector => $elem.is(selector))) {
		return true;
	}

	if($elem.attr('tabindex')) {
		return true;
	}

	return false;
};

// Detect if the user navigates with a keyboard
$doc.on('keydown', event => {
	if(event.keyCode === 9) {
		$body.addClass(classes.keyboardUser);
	}
});

export function isKeyboardUser() {
	return $body.hasClass(classes.keyboardUser);
}
