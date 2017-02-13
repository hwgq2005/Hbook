/**
 * @authors H君
 * @date    2017-02-13 15:51:41
 * @version 0.1.5
 * 
 */

(function (global, factory) {

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());

}(this, function () { 

	"use strict";

	// 版本号
	var Version = '0.1.5';
	
	var $formControl=$('.form-line-input .form-control');
	var $checkControl=$('.checkbox,.radio');

	// 文本框
	$formControl.on('focus',function(){
		var $self = $(this);
		$self.addClass('edited');
	})
	.on('blur',function(){
		var $self = $(this),
			val   = $.trim($self.val());

		val ? '' : $self.removeClass('edited');
	})
	
	// 复选框
	$checkControl.on('change', 'input[type=checkbox],input[type=radio]', function(event) {
		var $self = $(this);

		$self.parent().hasClass('radio') ? $(this).parent().siblings('.radio').removeClass('active') : '';
		$(this).parent().toggleClass('active');
	});

}));