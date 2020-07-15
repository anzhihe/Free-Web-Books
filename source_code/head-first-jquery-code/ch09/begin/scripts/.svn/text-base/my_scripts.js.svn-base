$(document).ready(function(){

	var FREQ = 10000 ;
	var repeat = true;
	
	function showFrequency(){
		$("#freq").html( "Page refreshes every " + FREQ/1000 + " second(s).");
	}
	
	function startAJAXcalls(){
	
		if(repeat){
			setTimeout( function() {
					getXMLRacers();
					startAJAXcalls();
				}, 	
				FREQ
			);
		}
	}
	
	function getXMLRacers(){
		$.ajax({
			url: "finishers.xml",
			cache: false,
			dataType: "xml",
			success:  function(xml){
				
				$('#finishers_m').empty();
				$('#finishers_f').empty();
				$('#finishers_all').empty();
				
				$(xml).find("runner").each(function() {
					var info = '<li>Name: ' + $(this).find("fname").text() + ' ' + $(this).find("lname").text() + '. Time: ' + $(this).find("time").text() + '</li>';
					if( $(this).find("gender").text() == "m" ){
						$('#finishers_m').append( info );
					}else if ( $(this).find("gender").text() == "f" ){
						$('#finishers_f').append( info );
					}else{  }
					$('#finishers_all').append( info );
				});
				
				getTimeAjax();
			}
		});
	}

	function getTimeAjax(){
		var time = "";
		$.ajax({
			url: "time.php",
			cache: false,
			success: function(data){
				$('#updatedTime').html(data);
			}
		});
	}
	
	$("#btnStop").click(function(){
		repeat = false;
		$("#freq").html( "Updates paused." );
	});

	$("#btnStart").click(function(){
		repeat = true;
		startAJAXcalls();
		showFrequency();
	});	

	showFrequency();
	getXMLRacers();
	startAJAXcalls();
});
