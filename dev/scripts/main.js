/**
 * 
 * @authors H君 (262281610@qq.com)
 * @date    2015-12-07 11:03:23
 * @version 1.0
 */
;(function(global){
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
		$('[data-toggle="tooltip"]').tooltip();
		this.page('.jpage');
	}

	//分页
	index.page=function(element){
		$(element).createPage({
			pageCount: 26,
			current: 1,
			showNum: 10,
			callback: function(tPage, sNum) {
				console.log('分页');
			}
		});
	}


	global.index=index;
}(this))
	


