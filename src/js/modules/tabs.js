import { $, $doc, classes } from '../includes/globals';

$doc.on('click', '.js-tabs .js-tabs-link', event => {
	event.preventDefault();

	const $target = $(event.currentTarget);
	const $wrapper = $target.closest('.js-tabs');
	const $nav = $wrapper.find('.js-tabs-nav');
	const $tabs = $wrapper.find('.js-tab');
	const index = $target.closest('li', '.js-tab').index();

	$nav.find('li').eq(index).addClass(classes.current).siblings().removeClass(classes.current);
	$tabs.eq(index).addClass(classes.current).siblings().removeClass(classes.current);
});
