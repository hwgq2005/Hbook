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
	


=======
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
>>>>>>> 7e0128eea87f138419115e4fc744e9e21f9b98d8
