
/**
 * @authors H君
 * @date    2016-04-21 11:22:04
 * @version 1.0
 */

!function($) {

	"use strict";

	var Dialog=function(element, options){
		this.options=options;
		this.$element=$(element);
		this.init(this.options,this.$element);
		
	}

	Dialog.prototype.init=function(options,elememt){

		var _self = this;
		options.modal == 'show' ? this.show(options) : this.hide(options);

		
		this.$element.on('click', '[data-dialog="hide"]', function(){
			_self.hide(options);
		});
	}

	Dialog.prototype.show=function(options){
		
		options.backdrop ? this.backdrop(options) : '' ;
		this.$element.addClass('in');
	}

	Dialog.prototype.hide=function(options){
		this.$element.removeClass('in');
		console.log(this)
		this.$backdrop.remove();
		this.$backdrop = null;

		options.backdrop = true;
		this.$element.off('click','[data-dialog="hide"]');
	}

	Dialog.prototype.backdrop=function(options){
		var _self = this;
		_self.$backdrop = $('<div class="dialog-backdrop"></div>');
		
		$('body').append(_self.$backdrop).addClass('dialog-open');
		_self.$backdrop.addClass('in');
		options.backdrop = false;

	}




	$.fn.dialog = function(option) {
		//默认参数
		var element=this;
		var options = $.extend($.fn.dialog.defaults, option);

		return this.each(function () {
           new Dialog(this, options);
		})
		
	}

	$.fn.dialog.defaults={
		modal:'show',
		backdrop:true
	}


}(window.jQuery);