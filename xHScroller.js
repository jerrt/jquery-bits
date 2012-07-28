;(function($) {
/*
Notes: set "active" data attr for keyboard shortcuts to work.
add a "parentSelector" data attr to let it know which container to slideup.
*/

    $.xHScroller = function(container, options) {
        var defaults = {
			sliderClass : 'horiz-slider',
			itemsPerScroll: 2,
			kineticScrollPadding: 25
        }

        var scroller = this;

        scroller.settings = {}
		
		var $container = $(container),
		    $slider = $container.find('ul'),
			sliderWidth, itemWidth, maxScroll, leftArrow, rightArrow;
				
        var init = function() {
            scroller.settings = $.extend({}, defaults, options);
			itemWidth = parseInt($slider.find('li:first-child').outerWidth()) + 1;
			
			scroller.setWidth();
			$slider.addClass(scroller.settings.sliderClass);
			
			leftArrow = $('<div />', {class : 'scroller-left-arrow hidden arrow'});
			rightArrow = $('<div />', {class : 'scroller-right-arrow arrow'});
			
			$container.append(leftArrow).append(rightArrow);
			
			leftArrow.click(moveRight);
			rightArrow.click(moveLeft);
			
			$(document).keyup(function (e) {
				if ($container.data('active') == true) {
					if(e.which == 37) leftArrow.click();
					if(e.which == 39) rightArrow.click();
				}
			});
        }
		
		var moveLeft = function() {
			var leftOffset = parseInt($slider.css('left')) - ( itemWidth * scroller.settings.itemsPerScroll );
			moveSlider(leftOffset);
		}
		
		var moveRight = function() {
			var leftOffset = parseInt($slider.css('left')) + ( itemWidth * scroller.settings.itemsPerScroll );
			moveSlider(leftOffset);
		}
		
		var moveSlider = function(left) {
			left = itemWidth * Math.round(left / itemWidth);
			
			if (left >= 0) { //don't go too far left
				left = scroller.settings.kineticScrollPadding; 
				setTimeout(function(){$slider.css('left', 0);}, 400)
			}
			
			maxScroll = 0 - sliderWidth +parseInt($container.width());
			if (left <= maxScroll) { //don't go too far right
				left = maxScroll - scroller.settings.kineticScrollPadding;
				setTimeout(function(){$slider.css('left', maxScroll);}, 400)
			}
						
			$slider.css('left', left);
			scroller.toggleArrows(left);
		}
		
		scroller.toggleArrows = function(offset) {
			rightArrow.show().removeClass('hidden');
			leftArrow.show().removeClass('hidden');

			if (offset >= 0) {
				leftArrow.addClass('hidden');
				setTimeout(function(){leftArrow.hide()}, 400);
			}
			if (offset <= maxScroll) {
				rightArrow.addClass('hidden');
				setTimeout(function(){rightArrow.hide()}, 400);
			}
			
		}
		
		scroller.setWidth = function() {
			sliderWidth = itemWidth * $container.find('li').length;
						
			$slider.width(sliderWidth + 4); // pad for highlight borders etc.
		}
		
		scroller.reset = function() {
			//moveSlider(0);
			$slider.css('left', 0);
		}

        init();

    }

})(jQuery);;