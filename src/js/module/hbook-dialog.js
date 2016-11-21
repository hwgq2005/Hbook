
/**
 * @authors H君
 * @date    2016-11-19 21:33:10
 * @version 1.0
 */

!function($) {

	"use strict";

	var Dialog=function(element, options){

		this.options=options;
		this.$element=$(element);
		this.init(this.options,this.$element);
		
	}

	// 初始化
	Dialog.prototype.init=function(options,elememt){

		var _self = this;

		//判断是否已经显示弹出框
		// if (options.backdrop) {
			this.$element.on('click', '[data-dialog="hide"]', function(){
				_self.hide(options,elememt);
			});
		// }
		options.modal == 'show' ? this.show(options,elememt) : this.hide(options,elememt);
		
	}

	// 显示弹出框
	Dialog.prototype.show=function(options,elememt){
		
		// options.backdrop ? this.backdrop(options,elememt) : '' ;
		this.backdrop(options,elememt)
		this.$element.addClass('in');
	}

	// 隐藏弹出框
	Dialog.prototype.hide=function(options,elememt){

		this.$element.removeClass('in');
		this.$element.off('click','[data-dialog="hide"]');

		this.$backdrop ? this.hideBackDrop(options) : '' ;
		
	}

	// 显示遮罩
	Dialog.prototype.backdrop=function(options,elememt){

		var elememtId = elememt.attr('id');
		
		this.$backdrop = $('<div class="dialog-backdrop"></div>')
		.appendTo(document.body)
		.addClass('in');

		$(document.body).addClass('dialog-open');
		options.backdrop = false;

	}

	// 隐藏遮罩
	Dialog.prototype.hideBackDrop = function(options){
		
		this.$backdrop.remove();
		this.$backdrop = null;
		options.backdrop = true;

		$(document.body).removeClass('dialog-open');
	}

	$.fn.dialog = function(option) {
		
		var element=this;
		var options = $.extend($.fn.dialog.defaults, option);

		return this.each(function () {
          	new Dialog(this, options);
		})
		
	}

	// 默认配置
	$.fn.dialog.defaults={
		modal:'show',  // 显示或者隐藏弹出框
		backdrop:true  // 是否出现遮罩
	}


}(window.jQuery);