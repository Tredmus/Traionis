import imagesLoaded from 'imagesloaded';
import { $ } from '../includes/globals';

$('.js-responsive-images').each((i, container) => {
	imagesLoaded(container, () => {
		$(container).find('img, svg').each((i, image) => {
			const $image = $(image);
			const width = image?.naturalWidth || $image.width();
			const height = image?.naturalHeight || $image.height();

			$image.css({
				'--width': `${width}px`,
				'--height': `${height}px`
			});
		});
	});
});
