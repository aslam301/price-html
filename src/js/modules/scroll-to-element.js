/**
 *  Internal dependencies.
 */
import scrollToElement from '../utils/scroll-to-element';

/**
 *  Vars.
 */
let timer = null;
let events = ['load', 'hashchange'];

for (let i = 0; i < events.length; i++) {
	window.addEventListener(events[i], function () {
		clearTimeout(timer);
		setАnchorLisener(document.getElementsByTagName('a'));
		setАnchorLisener(document.getElementsByTagName('button'));

		timer = setTimeout(function () {
			getValueToScroll(window.location.hash);
		}, 600);
	});
}

function setАnchorLisener($allLinks) {
	for (let i = 0; i < $allLinks.length; i++) {
		$allLinks[i].addEventListener('click', function (event) {
			if (this.dataset.scrollTo != undefined || this.href != undefined) {
				const value = this.href == undefined ? '#' + this.dataset.scrollTo : this.href;
				const result = getValueToScroll(value);

				if (result) {
					event.preventDefault();
				}
			}
		});
	}
}

function getValueToScroll(href) {
	if (href.indexOf('#') === -1) {
		return false;
	}

	const hash = href.split('#');
	const $id = document.querySelector('[data-id="' + hash[1] + '"]');

	if (!$id) {
		return false;
	}

	scrollToElement($id);

	history.replaceState(undefined, undefined, '#' + hash[1]);

	return true;
}
