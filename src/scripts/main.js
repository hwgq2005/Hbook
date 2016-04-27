/**
 * 
 * @authors H君 (262281610@qq.com)
 * @date    2015-12-07 11:03:23
 * @version 1.0
 */
;(function(global){

	'use strict';

	var index={};

	//初始化模板
	index.init=function(){
		index.template();
		prettyPrint();
	}


	//加载模板
	index.template=function(){
		$('#header .nav a').click(function() {
			var action = $(this).attr('data-id');
			$.scrollTo('#' + action, 500)
		})
		$('#dialog').click(function(){
			var aa=$('#modal').modal('show');
		})
		$('[data-toggle="tooltip"]').tooltip();
		index.page('.page');
	}

	//分页
	index.page=function(element){
		
		$(element).page({
			pageCount: 26,
			current: 1,
			showNum: 10,
			callback: function(tPage) {
				console.log(tPage);
			}
		});

	}

	global.index=index.init;

}(this))
	
