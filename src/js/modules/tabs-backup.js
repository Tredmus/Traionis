import { $, $doc, classes } from '../includes/globals';

$doc.on('click', '.js-tabs .js-tabs-link', event => {
	event.preventDefault();

	const $target = $(event.currentTarget);
	const $wrapper = $target.closest('.js-tabs');
	const $nav = $wrapper.find('.js-tabs-nav');
	const $tabs = $wrapper.find('.js-tab');
	const index = $target.closest('li, .js-tab').index();
	const alreadyCurrent = $tabs.eq(index).hasClass(classes.current);
	const alreadyHidden = $tabs.eq(index).hasClass(classes.hidden)

	if(alreadyCurrent) {
		$tabs.eq(index).toggleClass(classes.hidden, alreadyCurrent && !alreadyHidden);
	}

	$nav.find('li').eq(index).addClass(classes.current).siblings().removeClass(classes.current);
	$tabs.eq(index).addClass(classes.current).siblings().removeClass(classes.current).removeClass(classes.hidden);
});
