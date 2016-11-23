
/**
 * @authors H君
 * @date    2016-04-21 11:22:04
 * @version 1.0
 * 
 * 分页功能
 * @param  {[type]} current   [当前页]
 * @return {[type]} showNum   [显示条数 ]
 * @return {[type]} pageCount [总页数]
 * @return {[type]} callback  [单击回调方法，返回当前页]
 */

!function($) {
	"use strict";

	var Page=function(element, options){
		this.options=options;
		this.$element=$(element);
		this.init();

	}

	Page.prototype = {

		init:function(){
			this.getDom(this.$element, this.options);
			this.bindEvent(this.$element, this.options);
		},

		getDom:function(element,options){
			
			element.empty();
			
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
		
		},

		bindEvent:function(){
			var _self=this;

			_self.$element.off('click');			
			_self.$element.on("click", "a.number", function() {
				var current = parseInt($(this).text());
				_self.getDom(_self.$element, {
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
				_self.getDom(_self.$element, {
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
				_self.getDom(_self.$element, {
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
							_self.getDom(_self.$element, {
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
		current   : 1,
		pageCount : 10,
		callback  : function() {}
	}


	
}(window.jQuery);