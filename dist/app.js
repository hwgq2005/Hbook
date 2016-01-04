/**
 * 
 * @authors H君 (262281610@qq.com)
 * @date    2015-12-07 11:03:23
 * @version 1.0
 */

require.config({
	baseUrl: 'scripts',
	paths: {
		'jquery': 'lib/jquery/dist/jquery.min',
		'ejs': 'lib/ejs/ejs.min',
		'text': 'lib/text/text',
		'rejs': "lib/rejs",
		'prettify': 'component/prettify',
		'transition': 'component/bootstrap-transition',
		'scroll': 'lib/jquery.scrollTo/jquery.scrollTo.min',
		'carousel': 'component/owl-carousel/owl.carousel',
		'jpage': 'component/jquery.page',
		'modal': 'component/modal',
		'tooltip': 'component/tooltip',
		'popover': 'component/bootstrap-popover'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		tooltip: {
			deps: ['jquery'],
			exports: 'tooltip'
		},
		modal: {
			deps: ['jquery'],
			exports: 'modal'
		},
		transition: {
			deps: ['jquery', 'modal'],
			exports: 'transition'
		},
		carousel: {
			deps: ['jquery', 'css!../style/owl.carousel'],
			exports: 'carousel'
		},
		jpage: {
			deps: ['jquery'],
			exports: 'jpage'
		},
		scroll: {
			deps: ['jquery'],
			exports: 'scroll'
		},
		
	    ejs: {
	      exports: 'ejs'
	    }
		 
	},
	map: {
		'*': {
			'css': 'lib/require-css/css'
		}
	}

});
require(['main'], function(index) {
	index.initlalize();
})