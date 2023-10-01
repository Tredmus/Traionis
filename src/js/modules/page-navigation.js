import { $, $win, $body, classes, hasFixedHeader, getHeaderHeight } from '../includes/globals';

initPageNavigation();

function initPageNavigation() {
	const $nav = $('.js-page-navigation');

	if(!$nav.length) {
		return;
	}

	updateNavActive($nav);
	$win.on('load updatePageNavigation scroll resize orientationchange', () => updateNavActive($nav));

	function updateNavActive($nav) {
		if($body.hasClass(classes.isScrolling)) {
			return;
		}

		const $sections = $('section[data-id]');

		if(!$sections.length) {
			return;
		}

		const headerHeight = hasFixedHeader ? getHeaderHeight() : 0;
		const offset = $win.height() / 4;
		const scrollTop = $win.scrollTop() + headerHeight + offset + 1;
		const scrollBottom = $win.scrollTop() + $win.height();

		const setActiveLink = id => {
			const $link = $nav.find(`a[href="#${id}"]`);

			if(!id.length || !$link.length) {
				$nav.find('li').removeClass(classes.current);

				return;
			}

			$link
				.first()
					.closest('li')
					.addClass(classes.current)
						.siblings()
						.removeClass(classes.current);
		}

		setActiveLink('');

		$sections.each((i, section) => {
			const $section = $(section);
			const { id = '' } = $section.data();
			const sectionTop = section.offsetTop - parseInt($section.css('margin-top')) - 1;
			const sectionBottom = section.offsetTop + $section.innerHeight();
			const isVisible = sectionTop < scrollTop && sectionBottom > sectionTop;

			if(isVisible) {
				setActiveLink(id);
			}
		});

		$nav.trigger('updateMagicLine');
	}
}
