import { $, $doc, $win, getHeaderHeight, hasFixedHeader } from '../includes/globals';
import { debounce } from '../includes/debounce';
import { toggleMenu } from './navigation';
import '../includes/easing';

$win.on('load', debounce(() => {
	const hash = window.location.hash;

	if(!hash.length) {
		return;
	}

	scrollByDataID(hash);
}, 100));

$doc.on('click', 'a[href*="#"]:not([href="#"])', function(event) {
	const $link = $(this);
	const hash = this.hash;
	const href = $(this).attr('href');
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
		offset = $win.height() * 0.05;
	}

	const top = $win.scrollTop();
	const scrollDifference = Math.abs(Math.round(top - dataTop));
	const scrollMultiplier = scrollDifference * .75;
	const headerHeight = hasFixedHeader ? getHeaderHeight() : 0;

	let scrollDuration = 0;
	let scrollTop = dataTop - headerHeight - offset;

	if(scrollTop + $win.height() > $doc.height()) {
		scrollTop = $doc.height() - $win.height();
	}

	if(scrollTop < 0) {
		scrollTop = 0;
	}

	if(scrollDifference === 0) {
		scrollDuration = 10;
	}
	else if(scrollDifference <= 200) {
		scrollDuration = 150;
	}
	else {
		scrollDuration = Math.min(Math.max(300, scrollMultiplier), 600);
	}

	$('html, body').stop().animate({
		scrollTop,
	}, scrollDuration, 'easeInOutExpo');
}

export function scrollToTop() {
	scrollToPosition(0);
}
