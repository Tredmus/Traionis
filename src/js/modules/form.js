import { $, $doc, classes } from '../includes/globals';

const successMessage = 'Thank you for contacting us! We will be in touch shortly.'
const errorMessage = 'An error occurred while processing the form. Please try again.';

$doc.on('submit', '.js-form', event => {
	event.preventDefault();

	const form = event.currentTarget;
	const $form = $(event.currentTarget);
	const formData = new FormData(form);

	$form.addClass(classes.loading);

	fetch('/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(formData).toString(),
	})
	.then(response => {
		const isSuccess = response.ok;

		if(isSuccess) {
			$form.closest('.js-form-parent').addClass(classes.submitted).html(`<p>${successMessage}</p>`)

			return;
		}

		addFormMessage($form, 'error', errorMessage);
	})
	.catch(() => {
		addFormMessage($form, 'error', errorMessage);
	})
	.finally(() => {
		$form.removeClass(classes.loading);
	});
});

function addFormMessage($form, state, message) {
	const $message = $form.find('.form__message').length ? $form.find('.form__message') : $(document.createElement('div'));

	$message.addClass('form__message').toggleClass(classes.error, state === 'error');
	$message.html(`<p>${message}</p>`);

	$form.prepend($message);
}
