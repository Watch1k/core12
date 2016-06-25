head.ready(function() {

	// slider
	(function () {
		var slider = $('.js-slider'),
			list   = slider.find('.js-slider-list'),
			nav    = slider.find('.js-slider-nav');
		if (slider.length) {
			list.slick({
				dots: true,
				prevArrow: '<button type="button" class="slick-prev"><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-left"></use></svg></button>',
				nextArrow: '<button type="button" class="slick-next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-right"></use></svg></button>'
			});
			var dots   = slider.find('.slick-dots'),
				prev   = slider.find('.slick-prev'),
				next   = slider.find('.slick-next');
			nav.append(prev);
			nav.append(dots);
			nav.append(next);
		}
	}());

	// popup
	(function () {
		var popup     = $('.js-popup'),
			popupBtn  = $('.js-popup-btn');
			container = $('.js-popup-container'),
			join      = $('.js-join'),
			joinBtn   = $('.js-join-btn');

		popupBtn.on('click', function () {
			var data = $(this).data('popup');
			popup.hide();
			$('.' + data).show();
			return false;
		});
		$(document).on('click', function () {
			popup.hide();
		});
		container.on('click', function (event) {
			event.stopPropagation();
		});
		joinBtn.on('click', function () {
			var posTop = join.offset().top;
			popup.hide();
			$('html, body').animate({
				scrollTop: posTop
			}, 400);
			return false;
		});
	}());

	// slider
	(function () {
		var res  = $('.js-res'),
			list = res.find('.js-res-list'),
			nav  = res.find('.js-res-nav');
		if (res.length) {
			list.slick({
				dots: true,
				prevArrow: '<button type="button" class="slick-prev"><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-left"></use></svg></button>',
				nextArrow: '<button type="button" class="slick-next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-right"></use></svg></button>'
			});
			var prev   = res.find('.slick-prev'),
				next   = res.find('.slick-next');
			nav.append(prev);
			nav.append(next);
		}

		var dots   = res.find('.slick-dots'),
				prev   = res.find('.slick-prev'),
				next   = res.find('.slick-next');
		nav.append(prev);
		nav.append(dots);
		nav.append(next);
	}());

	// lang
	(function () {
		var lang = $('.js-lang');
		lang.on('click', function () {
			lang.parent().toggleClass('active');
		});
	}());

	// els
	(function () {
		var els   = $('.js-els'),
			more  = els.find('.js-els-more'),
			close = els.find('.js-els-close');
		more.on('click', function () {
			$(this).parents('.js-els-item').addClass('active');
			return false;
		});
		close.on('click', function () {
			$(this).parents('.js-els-item').removeClass('active');
			return false;
		});
	}());

	// tabs
	(function () {
		var tabs = $('.js-tabs'),
			btn  = tabs.find('.js-tabs-btn'),
			item = tabs.find('.js-tabs-item');
		btn.on('click', function () {
			var _this = $(this),
					factor = _this.parent().index() * _this.parent().children().length,
				index = _this.index();
			btn.removeClass('active');
			_this.addClass('active');
			item.hide();
			item.eq(index + factor).show();
			return false;
		}).first().trigger('click');
	}());
	
	// popup
	(function () {
		var popup    = $('.js-popup'),
			popupBtn = $('.js-popup-btn'),
			wrap     = $('.js-popup-wrap');
		popupBtn.on('click', function () {
			var data = $(this).data('popup');
			popup.removeClass('active');
			$('.' + data).addClass('active');
			return false;
		});
		$(document).on('click', function () {
			popup.removeClass('active');
		});
		wrap.on('click', function (event) {
			event.stopPropagation();
		});
	}());

	// change DOM position
	function changeDOM() {
		if ($(window).width() < 1024) {
			$('.action__col_2').prependTo($('.action'));
			$('.questions__wrap').appendTo($('.wrapper'));
			$('.questions__wrap').wrap('<div class="questions__popup"></div>');
			$('.questions__popup').append('<button class="popup__close"> <svg class="icon icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-close"></use></svg></button>');
		}
	};

	(function () {
		$(document).on('click', '.questions__popup .popup__close', function () {
			$(this).parent().fadeOut();
		});
		$(document).on('click touchstart', function(e) {
			if ( ($(e.target).closest('.questions__wrap').length === 0) && ($(e.target).closest('.js-tabs-btn').length === 0) ) {
				$('.questions__popup').fadeOut();
			}
		});

	}());

	function initQuestions() {
		if ($(window).width() < 1024) {
			$('.questions__btn').each(function () {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				}
			});
		}
	};

	function showQuestions() {
		if ($(window).width() < 1024) {
			$('.questions__btn').on('click', function () {
				$('.questions__popup').fadeIn();
			});
		}
	};

	changeDOM();
	initQuestions();
	showQuestions();

	$(window).resize(function () {
		changeDOM();
		initQuestions();
		showQuestions();
	});

});