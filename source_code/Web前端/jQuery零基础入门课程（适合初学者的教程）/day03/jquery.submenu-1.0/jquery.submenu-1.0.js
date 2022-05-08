//以成员函数的形式进行扩展，定义插件

(function($){
	$.fn.extend({
		submenu:function(){
			//此处的this表示调用submenu()方法的jQuery对象
			this.addClass("submenu");
			this.find("ul>li>div").hide();
			this.find("ul>li").on({
				"mouseover":function(){
					//此处的this表示事件源，是DOM对象
					$(this).find("div").show();
				},
				"mouseout":function(){
					$(this).find("div").hide();
				}
			});
			return this; //返回当前对象，支持链接操作
		}
	});
})(jQuery);