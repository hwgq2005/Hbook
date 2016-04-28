
/**
 * @authors H君
 * @date    2016-04-27 18:35:42
 * @version 1.0
 * 
 */
;(function($) {

	"use strict";

	var formControl=$('.form-line-input .form-control');

	formControl.on('focus',function(){
		var $self = $(this);
		$self.addClass('edited');
	}).on('blur',function(){
		var $self = $(this),
			val   = $.trim($self.val());
		if (!val) {
			$self.removeClass('edited');	
		}
	})
	
}(window.jQuery));