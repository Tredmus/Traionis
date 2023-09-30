import { $, $doc, $win, getHeaderHeight, hasFixedHeader } from '../includes/globals';
import { toggleMenu } from './navigation';
import '../includes/easing';

$win.on('load popstate hashchange', () => {
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
});

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

	scrollToPosition(dataTop, offset);
}

export function scrollToPosition(dataTop, offset = -1) {
	if(offset === -1) {
		offset = $win.height() * 0.03;
	}

	const scrollDifference = Math.abs(Math.round($win.scrollTop() - dataTop));
	const scrollMultiplier = scrollDifference * .75;
	const headerHeight = hasFixedHeader ? getHeaderHeight() : 0;
	const scrollDuration = scrollDifference === 0 ? 10 : Math.min(Math.max(300, scrollMultiplier), 600);
	let scrollTop = dataTop - headerHeight - offset;

	if(scrollTop + $win.height() > $doc.height()) {
		scrollTop = $doc.height() - $win.height();
	}

	if(scrollTop < 0) {
		scrollTop = 0;
	}

	$('html, body').stop().animate({
		scrollTop,
	}, scrollDuration, 'easeInOutExpo');
}

export function scrollToTop() {
	scrollToPosition(0);
}
