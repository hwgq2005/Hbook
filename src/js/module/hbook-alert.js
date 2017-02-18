/**
 * @authors H君
 * @date    2017-02-17 21:07:00
 * @version 0.2.0
 * 
 */

(function (global, factory) {

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());

}(this, function () { 

	"use strict";

	// 版本号
	var Version = '0.2.0';
	
	var Alert = function(element,options) {

		this.id = null;
		this.$element = $(element);
		this.init(this.$element,options);

	}
	
	// 初始化
	Alert.prototype.init = function($element,options){

		var _self = this ;
		if(typeof options == 'object'){
			_self.bindEvent($element);
		}else if(typeof options == 'string'){
			if (options == 'hide') {
				_self.hide($element);
			}
		}

	}

	// 隐藏警告框
	Alert.prototype.hide = function($element){
		$element.remove();
	}

	// 绑定事件
	Alert.prototype.bindEvent = function($element){

		$element.find('[data-alert="close"]').click(function(event) {
			$(this).closest('.alert').remove();
		});
	}

	$.fn.alert = function(option) {

		//默认参数
		var options = null;
		if(typeof option == 'object'){
			options = $.extend($.fn.alert.defaults, option);
		}else if(typeof option == 'string'){
			options = option;
		}
		return this.each(function () {
           new Alert(this, options);
		})
		
	}

	//默认配置
	$.fn.alert.defaults = {
		
	}

}));