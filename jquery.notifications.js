;(function($) {
	
	$.xNotifications = function(options) {
	
		var defaults = {
			mask  : true,
			maskColor: 'rgba(255,255,255, 0.75)',
			title: 'Notice',
			content: '&nbsp;',
			image: '',
			slideFrom: ''
		}
		
		var plugin = this;
		
		plugin.box = $('<div />').addClass('notification-box');
		plugin.title = $('<h3 />');
		plugin.content = $('<div />').addClass('content');
		plugin.imageWrapper = $('<div />').addClass('image-wrap');
		plugin.image = $('<img />');
		plugin.mask = $('<div />').addClass('notification-mask');

		plugin.settings = {};
		
		var init = function() {
			plugin.settings = $.extend({}, defaults, options);
			$('body').css('position', 'relative');
			plugin.box.css({ position : 'absolute', zIndex : 9999, display : 'none'});
			plugin.mask.css({ position : 'absolute', top : 0, left : 0, zIndex : 9990, width : '100%', height : '100%', backgroundColor : plugin.settings.maskColor })
			
			plugin.box.append(plugin.image).append(plugin.title).append(plugin.content);
			plugin.box.children('img').wrap(plugin.imageWrapper);
			
			plugin.title.html(plugin.settings.title);
			plugin.content.html(plugin.settings.content);
			plugin.image.attr('src', plugin.settings.image);
			
			if ($(plugin.settings.slideFrom).length > 0) {
				var pos = $(plugin.settings.slideFrom).position();
				plugin.showNotification(pos.top);
			} else {
				plugin.showNotification();
			}
		}
		
		plugin.showNotification = function(top) {
			if (plugin.settings.mask) plugin.mask.appendTo('body').fadeIn(500);
			$('body').append(plugin.box);
			if (top > 0) { plugin.box.slideDown(); } else { plugin.box.fadeIn(800); };
			
			var viewportHeight = $(window).height();
			var viewportWidth = $(window).width();
			
			var boxX = (viewportWidth / 2);
			boxX = boxX - (plugin.box.outerWidth(true) / 2);
			
			var boxY = (viewportHeight / 2);
			boxY = boxY - (plugin.box.outerHeight(true) / 2);
			
			if (top > 0) {
				boxY = top;
			}

			
			plugin.box.css({ top : boxY, left : boxX });
			
		}
		
		plugin.trash = function(data) {
			console.log('sadfdasf');
			plugin.mask.fadeOut();
			plugin.box.fadeOut('slow', function() {$(this).remove() })
		}
		
		init();
	}
	
})(jQuery);