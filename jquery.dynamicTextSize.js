;(function($) {

   $.dynamicTextSize = function(el, options) {

      var defaults = {
         originalSize	: parseInt(el.css('fontSize')),
		 minSize		: 17
      }

      var plugin = this;
	  var textLen = 0;
	  var fontSizes = {};

      plugin.settings = {}

      var init = function() {
         plugin.settings = $.extend({}, defaults, options);
         plugin.el = el;
		 
		 plugin.el.keyup(function() {
			shrinkToFill($(this));
		 })
      }

		var measureText = function(content, size) {
			var id = 'text-width-tester',
				$tag = $('#' + id);
			if (!$tag.length) {
				$tag = $('<span id="' + id + '" style="display:none;position:absolute;top:0;font-size:' + size + ';">' + content + '</span>');
				$('body').append($tag);
			} else {
				$tag.css({fontSize:size}).html(content);
			}

			return {
				width: $tag.width(),
				height: $tag.height()
			}
		}
		
		var shrinkToFill = function($input) {
			var fontSize = parseInt($input.css('fontSize'));
			var maxWidth = $input.width() - 15;
			var textWidth = measureText($input.val(), $input.css('fontSize')).width;
			
			console.log(textLen);
			console.log($input.val().length);
			
			if (textLen < $input.val().length) {
				if (textWidth > maxWidth) {
					fontSize = fontSize * ( maxWidth / textWidth );
					
					if (fontSize < plugin.settings.minSize) fontSize = plugin.settings.minSize;
					
					predictedSize = measureText($input.val(), $input.css('fontSize', fontSize));
					if ( predictedSize < maxWidth ) {
						$input.css({fontSize:fontSize});
						console.log(fontSize);
					};
					
				} 
				
				textLen = $input.val().length;
			} else {
				if (textWidth < maxWidth) {
					fontSize = fontSize * ( maxWidth / textWidth );
					
					if (fontSize > plugin.settings.originalSize) fontSize = plugin.settings.originalSize;
					
					predictedSize = measureText($input.val(), $input.css('fontSize', fontSize));
					if ( predictedSize < maxWidth ) {
						$input.css({fontSize:fontSize});
						console.log(fontSize);
					};
				}
				
				textLen = $input.val().length;
			}
			
		}
		
		init();
   }

})(jQuery);