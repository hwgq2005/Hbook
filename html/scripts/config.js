/**
 * 
 * @authors H君
 * @date    2015-12-07 11:03:23
 * @version 1.0
 */

require.config({
	baseUrl:'html/scripts',
	paths: {
		'jquery': 'lib/jquery',
		'ejs':'lib/ejs.min',
		'text':'lib/text',
		'prettify':'component/prettify',
		'transition':'component/bootstrap-transition',
		'scroll':'component/jquery.scrollTo',
		'carousel':'component/owl-carousel/owl.carousel',
		'jpage':'component/jquery.page',
		'modal':'component/modal',
		'tooltip':'component/tooltip',
		'popover':'component/bootstrap-popover'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		tooltip:{
			deps: ['jquery'],
			exports: 'tooltip'
		},
		carousel:{
			deps: ['jquery'],
			exports: 'carousel'
		},
		jpage:{
			deps: ['jquery'],
			exports: 'jpage'
		},
		scroll:{
			deps: ['jquery'],
			exports: 'scroll'
		}
	}
});
require(['main'],function(index){
	index.initlalize();
})