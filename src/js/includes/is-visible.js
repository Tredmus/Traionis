import { $ } from './globals';

$.fn.visible = function(partial, offset = 100) {
	let $t            = $(this),
		$w            = $(window),
		viewTop       = $w.scrollTop() - offset,
		viewBottom    = viewTop + $w.innerHeight() + offset,
		_top          = $t.offset().top,
		_bottom       = _top + $t.innerHeight(),
		compareTop    = partial === true ? _bottom : _top,
		compareBottom = partial === true ? _top : _bottom;

	return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};
