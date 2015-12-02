/*************************************
 	@authors H君 (262281610@qq.com)
	@date    2015-10-28 13:42:50
 	@version 1.0
	功能：分页
	pageCount：总页数
	current：当前页 
	showNum: 显示条数 
	callback：单击回调方法，p是当前页码
 ************************************/
// 调用方法：
// $(".tcdPageCode").createPage({
//       pageCount:10,
//      current:1,
//      callback:function(p){
//          //
//       }
// });
;
(function($) {
	var ms = {
		init: function(obj, args) {

			
			return (function() {
				ms.fillHtml(obj, args);
				ms.bindEvent(obj, args);
				if (typeof(args.callback) == "function") {
					args.callback(args.current,args.showNum);
				}
			})();
		},
		//填充html
		fillHtml: function(obj, args) {
			return (function() {
				obj.empty();
				//上一页
				if (args.current > 1) {
					obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
				} else {
					obj.remove('.prevPage');
					obj.append('<span class="disabled">上一页</span>');
				}
				//中间页码
				if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
					obj.append('<a href="javascript:;" class="tcdNumber">' + 1 + '</a>');
				}
				if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
					
					obj.append('<span >...</span>');
				}
				var start = args.current - 2,
					end = args.current + 2;
				if ((start > 1 && args.current < 4) || args.current == 1) {
					end++;
				}
				if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
					start--;
				}
				for (; start <= end; start++) {
					if (start <= args.pageCount && start >= 1) {
						if (start != args.current) {
							obj.append('<a href="javascript:;" class="tcdNumber">' + start + '</a>');
						} else {
							obj.append('<span class="current">' + start + '</span>');
						}
					}
				}
				if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5 ) {
					obj.append('<span >...</span>');
				}
				if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
					obj.append('<a href="javascript:;" class="tcdNumber">' + args.pageCount + '</a>');
				}
				//下一页
				if (args.current < args.pageCount) {
					obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
					// obj.append('<input type="text"  class="gotoInput"/>');
					// obj.append('<a href="javascript:;" class="gotoPage">跳转</a>');
				} else {
					obj.remove('.nextPage');
					obj.append('<span class="disabled">下一页</span>');
					// obj.append('<input type="text"  class="gotoInput"/>');
					// obj.append('<a href="javascript:;" class="gotoPage">跳转</a>');
				}
			})();
		},
		//绑定事件
		bindEvent: function(obj, args) {
			return (function() {
				obj.on("click", "a.tcdNumber", function() {
					var current = parseInt($(this).text());
					ms.fillHtml(obj, {
						"current": current,
						"pageCount": args.pageCount
					});
					if (typeof(args.callback) == "function") {
						args.callback(current,args.showNum);
					}
				});
				//上一页
				obj.on("click", "a.prevPage", function() {
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj, {
						"current": current - 1,
						"pageCount": args.pageCount
					});
					if (typeof(args.callback) == "function") {
						args.callback(current - 1,args.showNum);
					}
				});
				//下一页
				obj.on("click", "a.nextPage", function() {

					var current = parseInt(obj.children("span.current").text());

					ms.fillHtml(obj, {
						"current": current + 1,
						"pageCount": args.pageCount
					});
					if (typeof(args.callback) == "function") {
						args.callback(current + 1,args.showNum);
					}
				});
				//跳转到某页
				obj.on("click", "a.gotoPage", function() {
					var gotoPage=obj.children("input.gotoInput").val();
					if (gotoPage != '') {
						var current = parseInt(gotoPage);
						if (current) {
							console.log(current + '----------')
							console.log(args.pageCount + '总数')
							if (current <= args.pageCount) {
								ms.fillHtml(obj, {
									"current": current,
									"pageCount": args.pageCount
								});
								if (typeof(args.callback) == "function") {
									args.callback(current,args.showNum);
								}
							};
						};
						
					};
					

				});
			})();
		}
	}
	$.fn.createPage = function(options) {
		//默认参数
		var args = $.extend({
			pageCount: 10,
			current: 1,
			callback: function() {}
		}, options);
		ms.init(this, args);
	}
})(jQuery);