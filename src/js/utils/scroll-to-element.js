/**
 * Scroll to specific DOM element
 *
 * @return {true or false}
 */
const scrollToElement = ($element = '') => {
	if (typeof $element == 'undefined' && $element == null) {
		return false;
	}

	const $wpAdmin = document.getElementById('wpadminbar');
	const _offset = parseInt($element.getBoundingClientRect().top, 10) + window.scrollY;
	const _wpAdmin = typeof $wpAdmin != 'undefined' && $wpAdmin != null ? parseInt($wpAdmin.offsetHeight, 10) : 0;
	const _marginTop = parseInt($element.style.marginTop, 10);
	const _paddingTop = parseInt($element.style.paddingTop, 10);
	const _moreOffset = _marginTop > 0 && _paddingTop == 0 ? _marginTop : 0;

	window.scrollTo({
		top: _offset - _wpAdmin - _moreOffset,
		left: 0,
		behavior: 'smooth',
	});
};

export default scrollToElement;
