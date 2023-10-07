import jQuery from 'jquery';

export const $ = jQuery;
export const $win = $(window);
export const $doc = $(document);
export const $body = $('body');
export const $header = $('.js-header');

export const breakpoints = {
	mobileSmall: window.matchMedia('(max-width: 374px)'),
	mobileSmallAlt: window.matchMedia('(max-width: 424px)'),
	mobileMedium: window.matchMedia('(max-width: 575px)'),
	mobile: window.matchMedia('(max-width: 767px)'),
	tablet: window.matchMedia('(max-width: 1023px)'),
	smallDesktop: window.matchMedia('(max-width: 1199px)'),
	largeDesktop: window.matchMedia('(max-width: 1399px)'),
	extraLargeDesktop: window.matchMedia('(max-width: 1599px)')
};

export const classes = {
	loading: 'is-loading',
	current: 'is-current',
	active: 'is-active',
	opened: 'is-opened',
	hovered: 'is-hovered',
	animated: 'is-animated',
	disabled: 'is-disabled',
	expanded: 'is-expanded',
	hidden: 'is-hidden',
	visible: 'is-visible',
	initialized: 'is-initialized',
	single: 'is-single',
	scrollLock: 'scroll-lock',
	menuOpen: 'menu-opened',
	swiperButtonDisabled: 'swiper-button-disabled',
	scrolled: 'has-scrolled',
	isScrolling: 'is-scrolling',
	keyboardUser: 'is-keyboard-user',
	submitted: 'is-submitted',
	error: 'is-error'
};

export const getHeaderHeight = () => $header.length ? $header.innerHeight() : 0;
export const hasFixedHeader = true;
