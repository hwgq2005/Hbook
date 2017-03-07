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
