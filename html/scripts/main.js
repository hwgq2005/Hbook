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
	'carousel',
	'jpage',
	'ejs',
	'text!../template/index.ejs'
], function($, prettify, scroll, tooltip, carousel, jpage, EJS, indexTmp) {
	var init = function() {
		var proScroll = function() {
			$('#header .nav a').click(function() {
				var action = $(this).attr('data-id');
				$.scrollTo('#' + action, 500)
			})
		}
		proScroll();
		var data = {
			num: 5
		}
		var _html = ejs.render(indexTmp, data);
		$('#content').html(_html);
		prettyPrint();
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
		// $('#example').popover('show');
		$('[data-toggle="tooltip"]').tooltip();
		$(".jpage").createPage({
			pageCount: 26,
			current: 1,
			showNum: 10,
			callback: function(tPage, sNum) {
				console.log(tPage);
			}
		});
	};
	return {
		initlalize: init
	}
});