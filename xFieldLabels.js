;(function($) {
/*
* Generates field labels for input fields which get faded off on click
* Required label text to be data attribute "label" of target input. Input parent should also be receptive to absolutely positioned elements.
*/
$.fn.xFieldLabels = function( options ) {  
	
	return this.each(function() {
		
		var $this = $(this);	
		$this.id = this.id;
		
		
		var $label = $('<label />').addClass('inline-label').attr('for', $this.id).attr('id', 'label-for-'+$this.id).html($this.data('label'));
		if ($this.siblings('label#label-for-'+$this.id).length < 1) {
			$this.parent().append($label);
		}
		
		if ($this.val() !== '') {
			$label.hide();
		}
		
		if ($this.hasClass('search')) {
			$clear = $('<div />').addClass('clear-icon');
			if ($this.siblings('.clear-icon').length < 1) {
				$clear.appendTo($this.parent()).hide();
			}
			
			$clear.click(function(){
				$this.val('').blur().focus();
			});
		}
		
		$this.keydown(function(){
			$label.fadeOut(150);
			if (typeof $clear != 'undefined') $clear.fadeIn();
		});
		
		$this.focus(function(){
			if ($this.val() !== '') {
				$label.fadeOut();
			}
		});
		
		$this.blur(function(){
			var $blockingElems = $this.parent().find('.reaction');
			if (($this.val() == '') && ($blockingElems.length == 0)) {
				$label.fadeIn();
				console.log($label);
				if (typeof $clear != 'undefined') $clear.fadeOut();
			}
		});
		
	});

};

})(jQuery);;