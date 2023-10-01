import { $, $doc, $body, $win, getHeaderHeight, hasFixedHeader, classes } from '../includes/globals';
import { toggleMenu } from './menu';
import { isTabbable, isKeyboardUser } from './accessibility';
import { debounce } from '../includes/debounce';
import '../includes/easing';
import { lenisObject } from './smooth-scrolling';

$win.on('load popstate hashchange', debounce(() => {
	const hash = window.location.hash;
	const href = window.location.href;
	const url = cleanURL(href, hash);

	if(!hash.length) {
		return;
	}

	if(url.length && !checkRedirect(url)) {
		return;
	}

	scrollByDataID(hash);
	toggleMenu(false);
}, 100));

$doc.on('click', '.js-top', event => {
	event.preventDefault();

	scrollToTop();
});

function checkRedirect(href) {
	if(!href) {
		return;
	}

	let currentUrl  = window.location.href;
	let currentHash = window.location.hash;

	currentUrl = cleanURL(currentUrl, currentHash);

	// Remove protocol from URLs
	href = href.replace(/(^\w+:|^)\/\//, '');
	currentUrl = currentUrl.replace(/(^\w+:|^)\/\//, '');

	if(href === currentUrl) {
		return true;
	}

	return false;
}

function cleanURL(url, hash) {
	if(!url) {
		return false;
	}

	if(hash) {
		url = url.replace(hash, '');
	};

	return url;
}

export function scrollByDataID(data, offset = -1) {
	if(!data) {
		return false;
	}

	data = data.replace(/^#/, '');
	const $data = $(`*[data-id="${data}"]`);

	if(!$data.length) {
		return;
	}

	scrollToElement($data, offset);
}

export function scrollToElement($elem, offset = -1) {
	if(!$elem.length) {
		return;
	}

	const dataTop = $elem.first().offset().top;

	scrollToPosition(dataTop, offset, $elem);
}

export function scrollToPosition(dataTop, offset = -1, $focusElement = '') {
	if(offset === -1) {
		offset = $win.height() * 0.03;
	}

	const scrollDifference = Math.abs(Math.round($win.scrollTop() - dataTop));
	const scrollMultiplier = scrollDifference * .75;
	const headerHeight = hasFixedHeader ? getHeaderHeight() : 0;
	const scrollDuration = Math.min(Math.max(400, scrollMultiplier), 800);
	let scrollTop = dataTop - headerHeight - offset;

	if(scrollTop + $win.height() > $doc.height()) {
		scrollTop = $doc.height() - $win.height();
	}

	if(scrollTop < 0) {
		scrollTop = 0;
	}

	lenisObject.scrollTo(scrollTop, {
		immediate: scrollDifference === 0,
		duration: scrollDuration / 1000,
		easing: $.easing.easeInOutExpo,
		lock: true,
		onComplete: () => {
			$body.removeClass(classes.isScrolling);
			$win.trigger('updatePageNavigation');

			if(!$focusElement.length) {
				return;
			}

			if(!isTabbable($focusElement) && isKeyboardUser()) {
				$focusElement.attr('tabindex', '-1');
				$focusElement.addClass('skipped-element');

				$focusElement[0].focus({ preventScroll: true });
			}
		}
	});
}

export function scrollToTop() {
	scrollToPosition(0, 0, $body);
}
