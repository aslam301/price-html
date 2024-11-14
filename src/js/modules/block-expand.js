/**
 *  Internal dependencies.
 */
import className from '../utils/constant-names';

/**
 * Vars.
 */
const element = 'js-block-expand';
const $element = document.getElementsByClassName(element);
const length = $element.length;

if (length) {
	for (let i = 0; i < length; i++) {
		const $linkExpand = $element[i].getElementsByClassName('js__expand');

		for (let j = 0; j < $linkExpand.length; j++) {
			$linkExpand[j].addEventListener('click', function (event) {
				event.preventDefault();

				this.closest('.' + element).classList.toggle(className.Active);
			});
		}
	}
}
