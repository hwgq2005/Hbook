/**
 * @authors H君
 * @date    2017-02-14 14:32:34
 * @version 0.1.8
 * 
 */

(function (global, factory) {

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());

}(this, function () { 

	"use strict";

	// 版本号
	var Version = '0.1.8';
	
	var Tip = function(element,options) {

		this.id = null;
		this.$element = $(element);
		this.init(this.$element,options);

	}
	
	// 初始化
	Tip.prototype.init = function($element,options){

		var _self = this ;
		if(typeof options == 'object'){
			_self.bindEvent($element);
		}else if(typeof options == 'string'){
			if (options == 'show') {
				setTimeout(function(){
					_self.show($element);
				},0)
			}else if (options == 'hide') {
				_self.hide($element);
			}
		}

	}

	// 显示提示
	Tip.prototype.show = function($element){
		
		var $tip = null,
			$tipWidth = null,
			$tipHeight = null,
			style = {},
			_top = $element.offset().top ,
			_left = $element.offset().left ,
			elementWidth = $element.outerWidth(),  // 当前对象外部宽度
			elementHeight = $element.outerHeight(); // 当前对象外部高度

		var title = $element.data('title'),
			placement = $element.data('placement');

		this.id = 'tip' + new Date().getTime();
		$element.attr('data-id',this.id);

		$tip = $('<div class="tip '+placement+'" role="tip" id="'+this.id+'">'+
					  '<div class="tip-arrow"></div>'+
					  '<div class="tip-inner">'+title+'</div>'+
					'</div>');

		$('body').append($tip);

		$tipWidth = $tip.outerWidth(); //提示框外部宽度
		$tipHeight = $tip.outerHeight();  //提示框外部高度
		if (placement == 'top') {
			style.top = _top - $tipHeight + 'px';
			style.left = _left + (elementWidth / 2) - ($tipWidth / 2) + 'px';
		}else if (placement == 'bottom') {
			style.top = _top + elementHeight  + 'px';
			style.left = _left + (elementWidth / 2) - ($tipWidth / 2) + 'px';
		}else if (placement == 'left') {
			style.top = _top + (elementHeight / 2)  - ($tipHeight / 2) + 'px' ;
			style.left = _left - $tipWidth  + 'px';
		}else if (placement == 'right') {
			style.top = _top + (elementHeight / 2)  - ($tipHeight / 2) + 'px' ;
			style.left = _left + elementWidth  + 'px';
		}
		$tip.css(style).addClass('in');

	}

	// 隐藏提示
	Tip.prototype.hide = function($element){

		var id = $element.attr('data-id');
		$element.removeAttr('data-id');
		$('#'+id).remove();

	}

	// 绑定事件
	Tip.prototype.bindEvent = function($element){

		var _self = this;
		$element.hover(function() {
			_self.show($element);
		}, function() {
			_self.hide($element);
		});
		
	}

	$.fn.tip = function(option) {

		//默认参数
		var options = null;
		if(typeof option == 'object'){
			options = $.extend($.fn.tip.defaults, option);
		}else if(typeof option == 'string'){
			options = option;
		}
		return this.each(function () {
           new Tip(this, options);
		})
		
	}

	//默认配置
	$.fn.tip.defaults = {
		
	}


}));