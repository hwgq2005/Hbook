/**
 * 
 * @authors H君 (262281610@qq.com)
 * @date    2015-12-07 11:03:23
 * @version 1.0
 */

define([
	'require',
	'jquery',
	'prettify',
	'scroll',
	'tooltip',
	'modal',
	'transition',
	'carousel',
	'jpage',
	// 'ejs',
	'rejs!../template/index'
], function(require,$, prettify, scroll, tooltip, modal, transition, carousel, jpage, indexTmp) {

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
			name: 'Hbook',
			num:100
		}
		// var _html = ejs.render(indexTmp(), data);
		var _html = indexTmp(data);
		$('#content').html(_html);
		$('[data-toggle="tooltip"]').tooltip();
		this.page('.jpage');
		this.carousel('#owl-demo');
	}

	//分页
	index.page=function(element){
		$(element).createPage({
			pageCount: 26,
			current: 1,
			showNum: 10,
			callback: function(tPage, sNum) {
				console.log(tPage);
			}
		});
	}

	//轮播
	index.carousel=function(element){
		$(element).owlCarousel({
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