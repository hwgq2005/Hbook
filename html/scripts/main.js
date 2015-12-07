/**
 * 
 * @authors H君
 * @date    2015-12-07 11:03:23
 * @version 1.0
 */

define([
	'jquery',
	'prettify',
	'scroll',
	'tooltip',
	'modal',
	'transition',
	'carousel',
	'jpage',
	'ejs',
	'text!../template/index.ejs'
], function($, prettify, scroll, tooltip, modal, transition, carousel, jpage, EJS, indexTmp) {

	var index={};

	//初始化模板
	index.initlalize=function(){
		this.template();
		prettyPrint();
	}

	//加载模板
	index.template=function(){
		$('#header .nav a').click(function() {
			var action = $(this).attr('data-id');
			$.scrollTo('#' + action, 500)
		})
		var data = {
			num: 5
		}
		var _html = ejs.render(indexTmp, data);
		$('#content').html(_html);
		$('[data-toggle="tooltip"]').tooltip();
		this.page();
		this.carousel();
	}

	//分页
	index.page=function(){
		$(".jpage").createPage({
			pageCount: 26,
			current: 1,
			showNum: 10,
			callback: function(tPage, sNum) {
				console.log(tPage);
			}
		});
	}

	//轮播
	index.carousel=function(){
		$("#owl-demo").owlCarousel({
			slideSpeed: 300,
			paginationSpeed: 400,
			autoPlay: true,
			items: 1, 
			itemsDesktop: false,
			itemsDesktopSmall: false,
			itemsTablet: false,
			itemsMobile: false
		});
	}

	return index;
});