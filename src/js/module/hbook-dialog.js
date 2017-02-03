
/**
 * @authors H君
 * @date    2016-11-19 21:33:10
 * @version 1.0
 */

!function(window,$) {

	"use strict";
	// 默认配置
	

	window.dialogIndex = 1050;

	var Dialog=function(options){

		var defaults={
			title:'提示',
			type:0, 	    // 0:有头部和尾部 1:没有头部 2:没有尾部 3：没有头尾 
			backdrop:true,  // 是否出现遮罩
			confirmButton:true,  //确认按钮
			cancelButton:true,	 //取消按钮
			confirm:function(){},
			cancel:function(){}
		}

		var options = $.extend(defaults, options);

		this.options=options;
		this.confirm=options.confirm;
		this.cancel=options.cancel;
		this.$element=$('#'+options.id);
		this.init(this.options,this.$element);
		
	}

	// 初始化
	Dialog.prototype.init=function(options,$element){

		var _self = this;

		if ($element.length <= 0) {
			dialogIndex ++ ;
			_self.show(options,$element);
		}
		
	}

	// 显示弹出框
	Dialog.prototype.show=function(){
		
		var _self = this,
			options = _self.options;

		var typeClass = '';	
		if (options.type == 1){
			typeClass = 'dialog-tip' ; 
		}
		var _html = '<div class="dialog '+typeClass+'" id="'+options.id+'" style="z-index:'+(dialogIndex - 1)+'">';

		if ( (options.type == 0 || options.type == 2) && options.type != 3) {
			_html += 	'<div class="dialog-header">'+options.title+'<a href="javascript:;" class="dialog-close dialog-close-'+options.id+'" ><i class="fa fa-close font-16"></i></a></div>';
		}
			_html += 	'<div class="dialog-body">'+options.content+'</div>';
		if (options.type != 2 && options.type != 3) {
			_html +=	'<div class="dialog-footer dialog-footer-right">'+
							'<div class="btn-group">';

			if (options.confirmButton){
				_html +=		'<a href="javascript:;" class="btn btn-primary dialog-confirm-'+options.id+'" >确认</a>';
			}				
			
			if (options.cancelButton){
				_html +=		'<a href="javascript:;" class="btn dialog-cancel-'+options.id+'">取消</a>';
			}		
				_html +=		 '</div>'+
							'</div>'+
						'</div>';
		}			
			
		$(_html).appendTo(document.body).addClass('in');

		_self.$element = $(_html);
		_self.backdrop(options);
		_self.bindEvent(options);

	}

	// 隐藏弹出框
	Dialog.prototype.hide=function(id){

		var elememtId = id || this.options.id;
		$('#'+elememtId).removeClass('in').remove();
		$('.dialog-backdrop-'+elememtId).length > 0 ? this.hideBackDrop(elememtId) : '' ;
		
	}

	// 显示遮罩
	Dialog.prototype.backdrop=function(options){

		var elememtId = options.id;

		if ($('.dialog-backdrop-'+elememtId).length <= 0) {
			$('<div class="dialog-backdrop dialog-backdrop-'+elememtId+'" style="z-index:'+(dialogIndex-2)+'"></div>')
			.appendTo(document.body)
			.addClass('in');

			$(document.body).addClass('dialog-open');
		}

	}

	// 隐藏遮罩
	Dialog.prototype.hideBackDrop = function(elememtId){

		var _self = this; 

		$('.dialog-backdrop-'+elememtId).remove();

		if ($('.dialog-backdrop').length < 1) {
			$(document.body).removeClass('dialog-open');
		}
		
	}


	// 绑定事件
	Dialog.prototype.bindEvent=function(options){

		var _self = this,
			elememtId = options.id;
		
		// 点击确认按钮
		$('.dialog-confirm-'+elememtId+'').click(function(){
			if (typeof _self.confirm == 'function') {
				_self.confirm();
			}
		})

		// 点击取消按钮
		$('.dialog-cancel-'+elememtId+'').click(function(){

			if (typeof _self.cancel == 'function') {
				_self.cancel();
				_self.hide(elememtId);
			}
		})

		// 关闭操作
		$('.dialog-backdrop-' + elememtId + ',.dialog-close-'+elememtId+'').click(function(){
			_self.hide(elememtId);
		})

	}
	
	function stopEvent(e){_

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

	window.Dialog = Dialog; 

}(window,window.jQuery);