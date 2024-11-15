/**
 * External dependencies.
 */
import Isotope from 'isotope-layout';

/**
 * Vars.
 */
const element = 'js-grid-isotope';
const $element = document.getElementsByClassName(element);
const length = $element.length;
const iso = [];
const triggerEventName = 'ajax-products-loaded';
const events = ['load', triggerEventName];
const classNameContents = '.js__items';
const classNameContent = '.js__item';
const classNameActions = '.js__actions';
const classNameAction = '.js__action';
const classNameCategory = '.js__categories';

if (length) {
	// Category Filter Ajax
	$('body').on('click', classNameCategory + ' a', function (event) {
		event.preventDefault();

		const $this = $(this);
		const $parent = $this.parent();

		$parent.addClass('current').siblings().removeClass('current');

		setAjax(this, 'category');
	});

	// Show More Ajax Link
	$('body').on('click', '.' + element + ' ' + classNameAction, function (event) {
		event.preventDefault();

		setAjax(this, 'more');
	});

	for (let i = 0; i < length; i++) {
		const $isotope = $element[i].getElementsByClassName('js__items')[0];

		$element[i].dataset.index = i;

		iso[i] = new Isotope($isotope, {
			itemSelector: '.grid-flex__col',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-flex__col-sizer',
			},
		});
	}

	for (let i = 0; i < events.length; i++) {
		window.addEventListener(events[i], function () {
			for (let j = 0; j < length; j++) {
				iso[j].layout();
			}
		});
	}
}

function setAjax(theElement, theType) {
	const $this = $(theElement);
	const $parent = $this.parents('.' + element);
	const parentId = '#' + $parent.attr('id');
	const index = parseInt($parent.data('index'), 10);
	const $id = $(parentId);
	const href = $this.attr('href');
	const settings = {
		url: href,
	};

	if (!$id.length) {
		return false;
	}

	if (theType == 'category') {
		iso[index].remove($id.find(classNameContent));
	}

	$id.find(classNameAction).remove();
	$id.attr('data-loading', true);

	$.ajax(settings).done(function (response) {
		const $response = $(response);
		const $content = $response.find(classNameContents);
		const $btnMore = $response.find(classNameAction);

		iso[index].insert($content);

		if ($btnMore.length) {
			$parent.find(classNameActions).html($btnMore);
		}

		setTimeout(function () {
			$id.attr('data-loading', false);
		}, 400);
	});
}
