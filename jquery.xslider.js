(function( $ ){
	$.fn.xSlider = function(options) {
		var settings = {
			'refreshBtn'	: '#refresh',
			'leftarrow' 	: '.left-arrow',
			'rightarrow' 	: '.right-arrow',
			'images' 		: '.slider .images',
			'speed'			: 800,
			'scrollDist'	: 200,
			'highlightColor': '#ccc'
		};
		
		return this.each(function() {        
			if ( options ) { 
				$.extend( settings, options );
			};
			
			var opts = options;
			
			var container 		= $(this);
			var refreshBtn 		= $(settings.refreshBtn);
			var leftArrow 		= $(settings.leftarrow);
			var rightArrow 		= $(settings.rightarrow);
			var images 			= $(settings.images);
			var imagesWidth		= 0;
			var sliderWidth 	= 0;
			var initBorderColor = images.find('img').css('borderTopColor');
			var viewerWidth		= 0;
			
			refreshBtn.click(function(){
				images.empty();
				images.append('<span class="loading">Loading...</span>');
				loadImg();	
			});
			
			container.load(init());
			
			function init() {
				imagesWidth = 0;
				leftArrow.fadeOut().addClass('slider-arrow');
				rightArrow.fadeOut().addClass('slider-arrow');
				
				images.children().each(function() {
					imagesWidth += $(this).outerWidth( true );
				});
				images.width(imagesWidth);
				
				viewerWidth = parseInt(container.width());
			};
			
			container.hover(function(){
				$(this).find('.slider-arrow').fadeIn();
			}, function(){
				$(this).find('.slider-arrow').fadeOut();
			});
			
			images.find('img').live({
				mouseover: function() {
					//$(this).animate({ borderTopColor: settings.highlightColor, borderLeftColor: settings.highlightColor, borderRightColor: settings.highlightColor, borderBottomColor: settings.highlightColor }, 'fast');
					$(this).css('z-index','100').animate({boxShadow: '0 0 4px rgba(0,0,0,0.5)'});
				},
				mouseout: function() {
					$(this).css('z-index','1').animate({boxShadow: 'none'});
					//$(this).animate({ borderTopColor: initBorderColor, borderLeftColor: initBorderColor, borderRightColor: initBorderColor, borderBottomColor: initBorderColor}, 'fast');
				}
			});
			
			leftArrow.click(slideLeft);
			rightArrow.click(slideRight);
			
			function slideLeft() {
				var currentX = parseInt(images.css('left').replace('px', ''));
				if (currentX < -settings.scrollDist) {
					images.animate({'left' : (currentX + settings.scrollDist)+'px' }, settings.speed);
				} else {
					images.animate({'left' : '10px' }, (settings.speed / 2), function() {
						$(this).animate({'left' : '0px' }, (settings.speed / 2));
					});
				};
				
			};
			
			function slideRight() {
				var currentX = parseInt(images.css('left').replace('px', ''));
				if ((currentX - settings.scrollDist + imagesWidth) > (viewerWidth)) {
					images.animate({'left' : (currentX - settings.scrollDist)+'px' }, settings.speed);
				} else {
					images.animate({'left' : ( viewerWidth - imagesWidth - 10)+'px' }, (settings.speed / 2), function() {
						$(this).animate({'left' : (viewerWidth - imagesWidth)+'px' }, (settings.speed / 2));
					});
				};
			};
			
			function loadImg() {
				$.getJSON('source.php', function(data) {
					images.empty();
					var pics = [];
					$.each(data, function(key, val) {
					  
					  timthumbUrl = 'timthumb.php?w=80&h=80&src='
					  
					  $('<img />')
						  .attr('src', timthumbUrl+val.url)
						  .attr('title', val.name)
						  .load(function(){
							  images.append( $(this) );
							  console.log('image added');
							  init();
						  });
					  });
					
				});
			};
			
		});

	};
		
})( jQuery );