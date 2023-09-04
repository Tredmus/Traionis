import { $, $win } from '../includes/globals';

$win.on('load resize orientationChange updateVariables', () => {
	$(':root').css({
		'--vh': `${$win.innerHeight() * 0.01}px`,
	});
});
