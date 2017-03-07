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
/**
 * @authors H君
 * @date    2017-02-09 14:26:44
 * @version 0.2.3
 */

(function (global, factory) {

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Modal = factory());
 
}(this, function () { 


	"use strict";

	// 版本号
	var Version = '0.2.3';

	// 弹框层级
	var modalIndex = 1050;

	var Modal = function(options) {

		// 默认配置
		var defaults = {
			id: 'modal' + new Date().getTime(),
			type: 0, // 0:弹出框 1:提示框 
			addClass: '', // 添加样式类名
			title: '提示',	// 标题
			width:500,  // 弹框宽度
			backdrop: true, // 是否出现遮罩
			confirmButton: true, // 确认按钮
			cancelButton: true, // 取消按钮
			confirmText:'确定', // 确认按钮文本
			ccancelText:'取消', // 取消按钮文本
			complete: function() {}, // 完成打开弹框后
			confirm: function() {}, // 确认按钮回调
			cancel: function() {} // 取消按钮回调
		}

		var options = extend(defaults, options);

		this.options = options;
		this.confirm = options.confirm;
		this.cancel = options.cancel;
		this.complete = options.complete;
		this.element = document.querySelectorAll('#' + options.id);
		this.init(this.options, this.element);

	}

	// 初始化
	Modal.prototype.init = function(options, element) {

		var _self = this;

		//判断id是否存在
		if (element.length <= 0) {
			modalIndex++;
			_self.show(options, element);
		}

	}

	// 显示弹出框
	Modal.prototype.show = function() {

		var _self = this,
			typeClass = null,
			options = _self.options;

		typeof options.addClass == 'string' ? options.addClass = options.addClass : options.addClass = '';

		// 创建弹框盒子
		var _html = '',
			modalHtml = document.createElement("div");

		modalHtml.id = options.id;
		modalHtml.className = 'modal ' + options.addClass;
		modalHtml.style.width =  options.width + 'px';
		modalHtml.style.marginLeft =  - (options.width / 2) + 'px';
		modalHtml.style.zIndex =  modalIndex - 1;

		// 弹框头部
		
		_html += '<div class="modal-header">' + options.title + '<a href="javascript:;" class="modal-close modal-close-' + options.id + '" >×</a></div>';
		

		// 弹框内容区域
		_html += '<div class="modal-body">' + options.content + '</div>';

		// 弹框尾部
		
		_html += '<div class="modal-footer modal-footer-right">' +
			'<div class="btn-group">';

		// 弹框确认按钮				
		if (options.confirmButton) {
			_html += '<a href="javascript:;" class="btn btn-primary modal-confirm-' + options.id + '" >'+options.confirmText+'</a>';
		}

		// 弹框取消按钮
		if (options.cancelButton && options.type != 1) {
			_html += '<a href="javascript:;" class="btn modal-cancel-' + options.id + '">'+options.ccancelText+'</a>';
		}
		_html += '</div></div>';
		

		modalHtml.innerHTML = _html;

		document.body.appendChild(modalHtml);
		addClass(modalHtml, 'in');

		if (typeof _self.complete == 'function') {
			_self.complete();
		}

		// 判断是否出现遮罩
		options.backdrop ? _self.backdrop(options) : '';

		//事件绑定
		_self.bindEvent(options);

	}

	// 隐藏弹出框
	Modal.prototype.hide = function(id) {

		var elememtId = id || this.options.id,
			modalElement = document.querySelector('#' + elememtId);

		document.body.removeChild(modalElement);

		document.querySelectorAll('.modal-backdrop-' + elememtId).length > 0 ? this.hideBackDrop(elememtId) : '';

	}

	// 显示遮罩
	Modal.prototype.backdrop = function(options) {

		var elememtId = options.id;

		if (document.querySelectorAll('.modal-backdrop-' + elememtId).length <= 0) {

			// 创建遮罩盒子
			var modalBackdrop = document.createElement("div");
			modalBackdrop.className = 'modal-backdrop modal-backdrop-' + elememtId;
			modalBackdrop.style.zIndex = modalIndex - 2 ;
			
			// 追加到body底部
			document.body.appendChild(modalBackdrop);
			addClass(document.body, 'modal-open');
			addClass(modalBackdrop, 'in');

		}

	}

	// 隐藏遮罩
	Modal.prototype.hideBackDrop = function(elememtId) {

		var _self = this,
			backdropElement = document.querySelector('.modal-backdrop-' + elememtId);

		document.body.removeChild(backdropElement);
		if (document.querySelectorAll('.modal-backdrop').length < 1) {
			removeClass(document.body, 'modal-open');
		}

	}


	// 绑定事件
	Modal.prototype.bindEvent = function(options) {

		var _self = this,
			elememtId = options.id;

		// 点击确认按钮
		var confirmElement = document.querySelectorAll('.modal-confirm-' + elememtId);
		if (confirmElement.length > 0) {
			confirmElement[0].onclick = function() {
				if (typeof _self.confirm == 'function') {
					_self.confirm();
					// _self.hide(elememtId);
				}
			}
		}

		// 点击取消按钮
		var cancelElement = document.querySelectorAll('.modal-cancel-' + elememtId);
		if (cancelElement.length > 0) {
			cancelElement[0].onclick = function() {
				if (typeof _self.cancel == 'function') {
					_self.cancel();
					_self.hide(elememtId);
				}
			}
		}

		// 关闭操作
		var closeElement = document.querySelectorAll('.modal-close-' + elememtId),
			backdropElement = document.querySelectorAll('.modal-backdrop-' + elememtId);
		if (closeElement.length > 0) {
			closeElement[0].onclick = function() {
				_self.hide(elememtId);
			}
		}
		if (backdropElement.length > 0) {
			backdropElement[0].onclick = function() {
				_self.hide(elememtId);
			}
		}

	}

	// 防止冒泡
	function stopEvent(e) {
		if (!e) var e = window.event;
		if (e.stopPropagation) {
			// 兼容火狐
			e.stopPropagation();
		} else if (e) {
			// 兼容IE
			window.event.cancelBubble = true;
		}
	}

	// 合并对象
	function extend(to, from) {
		for (var key in from) {
			to[key] = from[key];
		}
		return to;
	}

	// 判断是否存在class
	function hasClass(obj, cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}

	// 添加class
	function addClass(obj, cls) {
		if (!hasClass(obj, cls)) obj.className += " " + cls;
	}

	// 移除class
	function removeClass(obj, cls) {
		if (hasClass(obj, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			obj.className = obj.className.replace(reg, ' ');
		}
	}

	return function(option){
		new Modal(option);
	};

}));


/**
 * @authors H君
 * @date    2017-02-13 15:51:41
 * @version 0.1.6
 */

(function (global, factory) {

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());

}(this, function () { 

	"use strict";
	
	// 版本号
	var Version = '0.1.6';

	var Page = function(element, options){

		this.options = options;
		this.$element = $(element);
		this.init();

	}

	// 初始化
	Page.prototype.init = function(){

		this.create(this.$element, this.options);
		this.bindEvent(this.$element, this.options);

	}

	// 创建分页
	Page.prototype.create = function(element,options){

		element.addClass('page').empty();
			
		//上一页
		if (options.current > 1) {
			element.append('<a href="javascript:;" class="prevPage">&laquo;</a>');
		} else {
			element.remove('.prevPage');
			element.append('<span class="disabled">&laquo;</span>');
		}
		
		//中间页码
		if (options.current != 1 && options.current >= 4 && options.pageCount != 4) {
			element.append('<a href="javascript:;" class="number">' + 1 + '</a>');
		}
		if (options.current - 2 > 2 && options.current <= options.pageCount && options.pageCount > 5) {
			
			element.append('<span class="more">...</span>');
		}

		var start = options.current - 2,
			end   = options.current + 2;
		if ((start > 1 && options.current < 4) || options.current == 1) {
			end++;
		}
		if (options.current > options.pageCount - 4 && options.current >= options.pageCount) {
			start--;
		}
		for (; start <= end; start++) {
			if (start <= options.pageCount && start >= 1) {
				if (start != options.current) {
					element.append('<a href="javascript:;" class="number">' + start + '</a>');
				} else {
					element.append('<span class="current">' + start + '</span>');
				}
			}
		}
		if (options.current + 2 < options.pageCount - 1 && options.current >= 1 && options.pageCount > 5 ) {
			element.append('<span class="more">...</span>');
		}
		if (options.current != options.pageCount && options.current < options.pageCount - 2 && options.pageCount != 4) {
			element.append('<a href="javascript:;" class="number">' + options.pageCount + '</a>');
		}

		//下一页
		if (options.current < options.pageCount) {
			element.append('<a href="javascript:;" class="nextPage">&raquo;</a>');
			// element.append('<input type="text"  class="gotoInput"/>');
			// element.append('<a href="javascript:;" class="gotoPage">跳转</a>');
		} else {
			element.remove('.nextPage');
			element.append('<span class="disabled">&raquo;</span>');
			// element.append('<input type="text"  class="gotoInput"/>');
			// element.append('<a href="javascript:;" class="gotoPage">跳转</a>');
		}
	}

	// 绑定事件
	Page.prototype.bindEvent = function(){

		var _self=this;

		_self.$element.off('click');

		_self.$element.on("click", "a.number", function() {
			var current = parseInt($(this).text());
			_self.create(_self.$element, {
				"current": current,
				"pageCount": _self.options.pageCount
			});
			if (typeof(_self.options.callback) == "function") {
				_self.options.callback(current);
			}
		});

		//上一页
		_self.$element.on("click", "a.prevPage", function() {
			var current = parseInt(_self.$element.children("span.current").text());
			_self.create(_self.$element, {
				"current": current - 1,
				"pageCount": _self.options.pageCount
			});
			if (typeof(_self.options.callback) == "function") {
				_self.options.callback(current - 1);
			}
		});

		//下一页
		_self.$element.on("click", "a.nextPage", function() {

			var current = parseInt(_self.$element.children("span.current").text());
			_self.create(_self.$element, {
				"current": current + 1,
				"pageCount": _self.options.pageCount
			});
			if (typeof(_self.options.callback) == "function") {
				_self.options.callback(current + 1);
			}
		});

		//跳转到某页
		_self.$element.on("click", "a.gotoPage", function() {
			var gotoPage=_self.$element.children("input.gotoInput").val();
			if (gotoPage != '') {
				var current = parseInt(gotoPage);
				if (current) {
					if (current <= _self.options.pageCount) {
						_self.create(_self.$element, {
							"current": current,
							"pageCount": _self.options.pageCount
						});
						if (typeof(_self.options.callback) == "function") {
							_self.options.callback(current);
						}
					};
				};
				
			};
		});
		
	}
	
	$.fn.page = function(option) {
		//默认参数
		var element=this;
		var options = $.extend($.fn.page.defaults, option);

		return this.each(function () {
           new Page(this, options);
		})
		
	}

	$.fn.page.defaults={
		current   : 1,  //当前页
		pageCount : 10, //总条数
		callback  : function(thisPage) {} //回调函数
	}

}));
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