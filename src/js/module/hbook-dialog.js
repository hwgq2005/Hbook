
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
		this.$backdrop = null;
		this.init(this.options,this.$element);
		
	}

	// 初始化
	Dialog.prototype.init=function(options,elememt){

		var _self = this;

		
		
		options.modal == 'show' ? this.show(options,elememt) : this.hide(options,elememt);

		_self.bindEvent(options,elememt);
		
	}

	// 显示弹出框
	Dialog.prototype.show=function(options,elememt){
		
		this.backdrop(options,elememt)
		this.$element.addClass('in');
	}

	// 隐藏弹出框
	Dialog.prototype.hide=function(options,elememt){

		var elememtId = elememt.attr('id');

		this.$element.removeClass('in');
		this.$element.off('click','[data-dialog="hide"]');

		$('.dialog-backdrop-'+elememtId).length > 0 ? this.hideBackDrop(options,elememt) : '' ;


		
	}

	// 显示遮罩
	Dialog.prototype.backdrop=function(options,elememt){

		var elememtId = elememt.attr('id');
		
		if ($('.dialog-backdrop-'+elememtId).length <= 0) {
			this.$backdrop = $('<div class="dialog-backdrop dialog-backdrop-'+elememtId+'" ></div>')
			.appendTo(document.body)
			.addClass('in');

			$(document.body).addClass('dialog-open');
			options.backdrop = false;
		}
		

	}

	// 隐藏遮罩
	Dialog.prototype.hideBackDrop = function(options,elememt){

		var elememtId = elememt.attr('id');

		$('.dialog-backdrop-'+elememtId).remove();
		this.$backdrop = null;
		options.backdrop = true;

		$(document.body).removeClass('dialog-open');
	}


	// 绑定事件
	Dialog.prototype.bindEvent=function(options,elememt){

		var _self = this ;
		var elememtId = elememt.attr('id');

		// 点击文档外关闭弹框
		$(document).on('click', '.dialog-backdrop-' + elememtId, function(event) {
			_self.hide(options,elememt);
		});

		// 判断是否已经显示弹出框
		_self.$element.on('click', '[data-dialog="hide"]', function(){
			_self.hide(options,elememt);
		});

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

	

	function stopEvent(e){

		if (!e) var e = window.event;
		if (e.stopPropagation) { 
			// 兼容火狐
			e.stopPropagation(); 
		} 
		else if (e) { 
			// 兼容IE
			window.event.cancelBubble = true; 
		}

	}



}(window.jQuery);