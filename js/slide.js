'use strict';
var NFCTool = {};
!$(function($,NFCTool){
	NFCTool.slide = function(container,options){
		var options = options ||{},
			autoMoudel = null,
			isAuto = options.auto,
			speedTime = options.time,
			delay = options.delay,
			slideLength = container.css('width'),
			activePict = $('.acs-carousel-body').find('div.active'),
			activeLi = $('.acs-carousel-indicators').find('li.active'),
			tempPict = null,
			tempLi = null,
			canPlay = 0;
		
		if(!container) return;
		
		$(window).resize(function(){
			slideLength = container.css('width');
			if($(window).width() < 769){
				$("#mobiledes-title").text($(".acs-carouseltext-title",$(activePict)).text());
				$("#mobiledes-content").text($(".acs-carouseltext-content",$(activePict)).text());
			}
		})
		
		function init(){
			autoPlay();
			if($(window).width() < 769){
				$("#mobiledes-title").text($(".acs-carouseltext-title",$(activePict)).text());
				$("#mobiledes-content").text($(".acs-carouseltext-content",$(activePict)).text());
			}
			container.find('.acs-carousel-arrow-left').bind('click',function(){
				prev();
			});
			
			container.find('.acs-carousel-arrow-right').bind('click',function(){
				next();
			});
			
			$("li[data-target='newsslider']").click(function(){
				var  to = $(this).attr('data-slide-to');
				tempPict = $('div.acs-carousel-bodyitem').eq(to),
				tempLi = $('.acs-carousel-indicators li').eq(to);
				stopPlay();
				canPlay ++;
				if(activeLi.attr('data-slide-to') > to){
					slideMoving(slideLength,'-'+ slideLength);
				}
				else if(activeLi.attr('data-slide-to') < to){
					slideMoving('-'+ slideLength,slideLength );
				}
				else{
					canPlay =0;
				}
			});
		}
	
		function prev(){
			canPlay ++;
			targetItem('prev');
			if(tempPict === null || tempPict.length === 0){
				tempPict = $('div.acs-carousel-bodyitem').eq($('div.acs-carousel-bodyitem').length-1);
				tempLi = $('.acs-carousel-indicators li').eq($('.acs-carousel-indicators li').length-1);
			}
			slideMoving('100%','-'+ '100%');
		}
		
		function next(){
			canPlay ++;
			targetItem('next');
			if(tempPict === null || tempPict.length === 0){
				tempPict = $('div.acs-carousel-bodyitem').eq(0);
				tempLi = $('.acs-carousel-indicators li').eq(0);
			}
			
			slideMoving('-'+ '100%','100%' );
		}
		
		function targetItem(direction){
			stopPlay();
			if(direction === 'prev'){
				tempPict = activePict.prev();
				tempLi = activeLi.prev();
			}
			else{
				tempPict = activePict.next();
				tempLi = activeLi.next();
			}
		}
		
		function slideMoving(distance,position){
			if($(window).width() < 769){
				$("#mobiledes-title").text($(".acs-carouseltext-title",$(tempPict)).text());
				$("#mobiledes-content").text($(".acs-carouseltext-content",$(tempPict)).text());
			}
			if(canPlay ===1){
				tempPict.addClass('active');
				tempPict.css('left',position);
				activePict.animate({left:distance},delay);
				tempPict.animate({left:'0px'},delay,function(){
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
	
		function autoPlay(){
			if(isAuto){
				autoMoudel = setInterval(function(){next();},speedTime);
			}
		}
	
		function stopPlay(){
			clearInterval(autoMoudel);
		}
		
		
		return {
			init:function(){init();}
		}
	}	
}(jQuery,NFCTool))


