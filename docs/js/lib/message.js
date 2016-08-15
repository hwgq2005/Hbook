
;(function(){

	$.validator.setDefaults({
	    success : $.noop,
	    onkeyup : false,
	    ignore  : '.ignore',

	    /*验证调用*/
	    errorPlacement: function(error, element) {
	       
	        var $formsGroup = $(element).closest('.form-group');

	        if (error.is(':empty')) {

	            // 验证通过
	            $formsGroup.removeClass('has-error');
	            $formsGroup.find('.help-block').html('');

	        } else {
	        	
	            // 验证出错
	            $formsGroup.addClass('has-error');
	            $formsGroup.find('.help-block').html(error[0].innerHTML);
	        }

	    }
	});
}())
