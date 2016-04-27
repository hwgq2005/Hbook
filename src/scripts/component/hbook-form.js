
/**
 * @authors H君
 * @date    2016-04-27 18:35:42
 * @version 1.0
 * 
 */

var Form=function() {

	"use strict";

	var formControl=$('.form-control');

	

	formControl.on('change',function(){
		var $self=$(this);
		$self.addClass('edited');

	})

	formControl.on('blur',function(){
		var $self = $(this),
			val   = $.trim($self.val());
		if (!val) {
			$self.removeClass('edited');	
		}
		
	})

	
}();