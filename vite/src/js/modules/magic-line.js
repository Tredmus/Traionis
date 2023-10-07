import { $, $body, classes } from '../includes/globals';

const magicLineResizeObserver = new ResizeObserver(entries => {
	entries.forEach(entry => $(entry.target).trigger('updateMagicLine'));
});

initMagicLine();

function initMagicLine() {
	const $elements = $(`.js-magic-line:not(.${classes.initialized})`);

	$elements.each((i, elem) => {
		magicLineResizeObserver.observe(elem);

		const $elem = $(elem);
		const $line = $elem.find('.js-magic-line-elem');

		$elem.on('updateMagicLine', updateMagicLine);

		$elem.find('a').hover(
			event => {
				$(event.currentTarget).closest('li').addClass(classes.hovered).siblings().removeClass(classes.hovered);
				$elem.trigger('updateMagicLine');
			},
			event => {
				$(event.currentTarget).closest('li').removeClass(classes.hovered);

				if($body.hasClass(classes.isScrolling)) {
					return;
				}

				$elem.trigger('updateMagicLine');
			}
		);

		$elem.find('a').click(() => $body.addClass(classes.isScrolling));

		function updateMagicLine() {
			const $current = $elem.find(`li.${classes.current}`);
			const $hovered = $elem.find(`li.${classes.hovered}`);

			if($hovered.length) {
				$line.css({
					'--magic-line-width': `${parseFloat($hovered.innerWidth()).toFixed(2)}px`,
					'--magic-line-offset': `${parseFloat($hovered.position().left).toFixed(2)}px`,
				});

				return;
			}

			if(!$current.length) {
				const previousWidth = parseFloat($line.css('--magic-line-width'));
				const previousOffset = parseFloat($line.css('--magic-line-offset'));

				$line.css({
					'--magic-line-width': `0px`,
					'--magic-line-offset': `${parseFloat(previousOffset + ( previousWidth / 2 )).toFixed(2)}px`,
				});

				return;
			}

			const currentWidth = parseFloat($current.innerWidth()).toFixed(2);
			const currentOffset = parseFloat($current.position().left).toFixed(2);

			$line.attr({
				'data-line-original-width': `${currentWidth}px`,
				'data-line-original-offset': `${currentOffset}px`,
			});

			$line.css({
				'--magic-line-width': `${currentWidth}px`,
				'--magic-line-offset': `${currentOffset}px`,
			});
		}
	});

	$elements.addClass(classes.initialized);
}
