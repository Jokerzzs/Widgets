'use strict';
var NFCTool = {};
!$(function ($, NFCTool) {
    NFCTool.slide = function (container, options) {
        var options = options || {},
			autoMoudel = null,
			isAuto = options.auto,
			speedTime = options.time,
			delay = options.delay,
			slideLength = container.css('width'),
			activePict = $('#myCarousel').find('div.active'),
			activeLi = $('.carousel-indicators').find('li.active'),
			tempPict = null,
			tempLi = null,
			canPlay = 0,
			fontsize = parseInt($(".text-content").css('font-size').replace('px', ''));

        if (!container) return;

        //$(window).resize(function () {
        //    slideLength = $('#carouselBody').css('width');
        //})

        function init() {
            container.find('.prev').bind('click', function () {
                prev();
            });

            container.find('.next').bind('click', function () {
                next();
            });

            $("li[data-target='carouselBody']").click(function () {
                var to = $(this).attr('data-slide-to');
                tempPict = $('div.item').eq(to),
				tempLi = $('.carousel-indicators li').eq(to);
                stopPlay();
                canPlay++;
                if (activeLi.attr('data-slide-to') > to) {
                    slideMoving(slideLength, '-' + slideLength);
                }
                else if (activeLi.attr('data-slide-to') < to) {
                    slideMoving('-' + slideLength, slideLength);
                }
                else {
                    canPlay = 0;
                }
            });

            autoPlay();
        }

        function prev() {
            canPlay++;
            targetItem('prev');
            if (tempPict === null || tempPict.length === 0) {
                tempPict = $('div.item').eq($('div.item').length - 1);
                tempLi = $('.carousel-indicators li').eq($('.carousel-indicators li').length - 1);
            }
            slideMoving(tempPict.css('width'), '-' + tempPict.css('width'));
        }

        function next() {
            canPlay++;
            targetItem('next');
            if (tempPict === null || tempPict.length === 0) {
                tempPict = $('div.item').eq(0);
                tempLi = $('.carousel-indicators li').eq(0);
            }
            slideMoving('-' + tempPict.css('width'), tempPict.css('width'));
        }

        function targetItem(direction) {
            stopPlay();
            if (direction === 'prev') {
                tempPict = activePict.prev();
                tempLi = activeLi.prev();
            }
            else {
                tempPict = activePict.next();
                tempLi = activeLi.next();
            }
        }

        function slideMoving(distance, position) {
            if (canPlay === 1 && $('.item').length > 1) {
                tempPict.addClass('active');
                wordLimit();
                tempPict.css('left', position);
                activePict.animate({ left: distance }, delay);
                tempPict.animate({ left: '0px' }, delay, function () {
                    activePict.removeClass('active');
                    activeLi.removeClass('active');
                    tempLi.addClass('active');
                    activePict = tempPict;
                    activeLi = tempLi;
                    canPlay = 0;
                    autoPlay();
                });
            }
        }

        function autoPlay() {
            if (isAuto) {
                autoMoudel = setInterval(function () { next(); }, speedTime);
            }
        }

        function stopPlay() {
            clearInterval(autoMoudel);
        }

        function wordLimit() {
            var $div = $(".text-content div", tempPict);
            while ($div.height() > fontsize * 2 * 1.4) {
                $div.text($div.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            };
        }

        return init();
        //return {
        //    init: function () { init(); }
        //}
    }
}(jQuery, NFCTool))


