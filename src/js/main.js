/**
 * 
 * @authors H君 (262281610@qq.com)
 * @date    2015-12-07 11:03:23
 * @version 1.0
 */
!function(window){

	'use strict';

	var $header = $("#header"),
		$dialog = $("#dialog"),
		$loginBtn = $("#login-btn");
		
	var hbook={

		// 初始化
		init:function(){

			hbook.bindEvent();
			hbook.valid();
			$('[data-toggle="tooltip"]').tooltip();
			hbook.page('.page');
			prettyPrint();

		},

		//事件绑定
		bindEvent:function(){

			 $header.find('.nav a').click(function() {
				var _id = $(this).attr('data-id'),
					  T = $('#'+_id).offset().top;

				$('body').stop().animate({
					scrollTop: T - 60
				},500, 'linear', function() {

				});
			})

			$dialog.click(function(){
				var aa=$('#modal').modal('show');
			})

			$loginBtn.click(function(event) {
				if ($('#login-form').valid()) {
					console.log($('#login-form').serialize())
				}
			});
			
		},
		
		//表单验证
		valid:function(){
			
			$("#login-form").validate({
				rules: {
					user: "required",
					password: {
						required: true,
						minlength: 6
					}
				},
				messages: {
					user: "不能为空",
					password: '密码至少6位数以上'
				}
			});
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

}(this);
	
