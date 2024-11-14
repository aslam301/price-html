/**
 * External dependencies.
 */
import { tns } from 'tiny-slider/src/tiny-slider';

/**
 *  Internal dependencies.
 */
import className from '../utils/constant-names';

/**
 * Vars.
 */
const element = 'js-slider-brands';
const $element = document.getElementsByClassName(element);
const length = $element.length;

if (length) {
	for (let i = 0; i < length; i++) {
		const $slider = tns({
			container: $element[i].getElementsByClassName('js__slides')[0],
			loop: false,
			items: 7,
			gutter: 26,
			nav: false,
			speed: 400,
			mouseDrag: true,
			responsive: {
				0: {
					disable: true,
				},
				768: {
					items: 3,
					gutter: 20,
					disable: false,
				},
				985: {
					items: 4,
					gutter: 26,
				},
				1024: {
					items: 5,
				},
				1100: {
					items: 6,
				},
				1300: {
					items: 7,
				},
			},
		});

		$slider.events.on('transitionStart', () => {
			$element[i].classList.add(className.IsAnimate);
		});

		$slider.events.on('transitionEnd', () => {
			$element[i].classList.remove(className.IsAnimate);
		});
	}
}
