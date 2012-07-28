/*
 * Completely re-done jquery tooltip plugin.
 */
 
;(function($) {
		
	$.tooltip = {
		blocked: false,
		settings: {
			fade: 400,
			class: "jqtooltip"
		}
	};
	
	$.fn.extend({
		tooltip: function(settings) {
			//settings = $.extend({}, $.tooltip.defaults, settings);
			return this.each(function() {
					this.tooltipText = this.title;
					$(this).removeAttr("title");
					this.alt = "";
				})
				.mouseenter(show)
				.mouseleave(hide);
		}
	});
	
	function createTip(text) {
		var elem = $('<div />').addClass($.tooltip.settings.class).text(text);
		return elem;
	}
	
	function show() {
		if ( $(this).parent().find('.'+$.tooltip.settings.class).length == 0 ) {
			var tip = createTip(this.tooltipText);
			$(this).after(tip);
			tip.hide().fadeIn($.tooltip.settings.fade);
		}
	}
		
	function hide() {
		$(this).parent().find('.'+$.tooltip.settings.class).fadeOut($.tooltip.settings.class, function(){ $(this).remove(); })
	}
	
})(jQuery);
