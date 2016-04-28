/**
 * 
 * @authors H君 (262281610@qq.com)
 * @date    2015-12-07 11:03:23
 * @version 1.0
 */
;(function(window){

	'use strict';

	var hbook={

		// 初始化
		init:function(){

			hbook.template();
			prettyPrint();

		},

		//事件绑定
		template:function(){

			$('#header .nav a').click(function() {
				var _id = $(this).attr('data-id');
				var T=$('#'+_id).offset().top;
				$('body').animate({
					scrollTop: T - 60
				},500, 'linear', function() {

				});
			})

			$('#dialog').click(function(){
				var aa=$('#modal').modal('show');
			})

			$('[data-toggle="tooltip"]').tooltip();
			hbook.page('.page');
		},
		
		// 分页
		page:function(element){

			$(element).page({
				pageCount: 26,
				current: 1,
				showNum: 10,
				callback: function(tPage) {
					console.log(tPage);
				}
			});

		}
	};

	window.hbook=hbook.init;

}(this))
	
