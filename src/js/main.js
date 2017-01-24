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
		$checkBox = $("#check-box"),
		$loginBtn = $("#login-btn");

	var $backToTop = $('#backToTop');	

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

				$('body,html').stop().animate({
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

			$checkBox.on('click', 'a', function(event) {
				var $this = $(this),
					color = $this.data('color');

				$checkBox.find('label').each(function(index, el) {
					$(el).removeClass('box-primary box-success box-warning box-danger  box-violet box-black box-grey')
						 .addClass(color);
				});
			});

			// 导航下拉
			$('.navbar-toggle').click(function(event) {
				$(this).toggleClass('collapsed');
				$(this).parent().next('.collapse').toggleClass('in');
			});

			//弹窗
			$('#dialog-btn').click(function(event) {
				var aaa=$('#dialog1').dialog({
					modal:'show'
				});
				console.log(aaa)
			});
			$('#confirm').click(function(event) {
				$('#dialog1').dialog({
					modal:'hide'
				});
				$('#dialog2').dialog({
					modal:'show'
				});
			});

			//滚动文档
			$(window).on('scroll', function(event) {
				var scrollTopVal = $(window).scrollTop();
				if(scrollTopVal > 200){
					$backToTop.addClass('in');
				}else{
					$backToTop.removeClass('in');
				}
			});

			//回到顶部
			$backToTop.click(function(event) {
				$('body,html').stop().animate({scrollTop: 0
				},500, 'linear', function() {});
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

		},

		
		
		
		
	};

	window.hbook=hbook.init;

}(this);
	
