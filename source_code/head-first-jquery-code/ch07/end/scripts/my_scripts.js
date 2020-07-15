$(document).ready(function(){

	var clix = [0,0,0,0]; // head,eyes,nose,mouth
	var distance = 367;
	var num_monsters = 10;

	var int1, int2, int3;
	
	function runLightning(){
		int1 = setInterval( function() {
					lightning_one();
				}, 	
				4000
			);
		
		int2 = setInterval( function() {
					lightning_two();
				}, 	
				5000
			);
		int3 = setInterval( function() {
					lightning_three();
				}, 	
				7000
			);
	}
	
	function stopMe()
	{
	   window.clearInterval(int1);
	   window.clearInterval(int2);
	   window.clearInterval(int3);

	}
	function lightning_one(){
		$("#container #lightning1").fadeIn(250).fadeOut(250);
	};
	
	function lightning_two(){
		$("#container #lightning2").fadeIn("fast").fadeOut("fast");
	};
	
	function lightning_three(){
		$("#container #lightning3").fadeIn("fast").fadeOut("fast");
	};

	window.onblur = stopMe;
	window.onfocus = runLightning;
	runLightning();
	
	$("#head").click( function(){
		moveMe(0, this)
	});//end click function
	
	$("#eyes").click( function(){
		moveMe(1, this)
	} );//end click function
	
	$("#nose").click( function(){
		moveMe(2, this)
	});//end click function
	
	$("#mouth").click( function(){
		moveMe(3, this)
	});//end click function
	
	$("#btnRandom").click( randomize );
	
	$("#btnReset").click( reset );
	
	function moveMe(i, obj){
		
		if (clix[i] < 9){
			$(obj).animate({left:"-=367px"},500);
			clix[i] = clix[i]+1;
		}else{
			clix[i] = 0;
			$(obj).animate({left:"0px"},500);
		}
	}
	
	function reset(){
		$(".face").each(function(index){
			var move_to = clix[index] * distance;
			clix[index] = 0;
			$(this).animate({left:"+="+move_to+"px"},500);
		});
	}
	
	function getRandom(num){
		var my_random_num = Math.floor(Math.random()*num);
		return my_random_num;
	}

	function randomize(){
		$(".face").each(function(index){
			var target_position = parseInt( (getRandom(num_monsters) + clix[index]) % num_monsters); 
			var current_position = clix[index] ;
			
			clix[index] = target_position;
			
			if( target_position > current_position ) {
				var move_to = (target_position - (current_position % distance) ) * distance; 
				$(this).animate({left:"-="+move_to+"px"},500);
			}else if( target_position < current_position ){
				var move_to = ( (current_position % distance) - target_position) * distance; 
				$(this).animate({left:"+="+move_to+"px"},500);
			}else{
				// They are the same - Don't move it.
			}
		});
	};	
	
});//end doc.onready function
