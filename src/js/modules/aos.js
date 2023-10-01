import { $, $win } from '../includes/globals';
import AOS from 'aos';
import imagesLoaded from 'imagesloaded';

AOS.init({
	offset: 150,
	duration: 1000,
	easing: 'ease',
	once: true,
});

$win.on('load updateAOS', () => AOS.refresh());
imagesLoaded('body', () => AOS.refresh());
