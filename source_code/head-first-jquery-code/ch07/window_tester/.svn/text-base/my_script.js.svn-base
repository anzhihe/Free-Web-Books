$(document).ready(function(){
	
//Keep track of when a visitor leaves the window and when they return

	window.onblur = blurMe;
	window.onfocus = focusMe;
	
	function blurMe() {
		var t=new Date();
		$("ul.myList").append("<li class='blurItem'>You left this window at "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"</li>");
		
	}
	
	function focusMe() {
		var t=new Date();
		$("ul.myList").append("<li class='focusItem'>You came back to this window at "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"</li>");

	}
	
});//end doc.onready function

