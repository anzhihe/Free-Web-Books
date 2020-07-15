$(document).ready(function(){

	var FREQ = 10000 ;
	var repeat = true;

	showFrequency();
	getDBRacers();
	startAJAXcalls();
	
	function showFrequency(){
		$("#freq").html( "Page refreshes every " + FREQ/1000 + " second(s).");
	}
	
	function startAJAXcalls(){
	
		if(repeat){
			setTimeout( function() {
					getDBRacers();
					startAJAXcalls();
				}, 	
				FREQ
			);
		}
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

	function getDBRacers(){
		$.getJSON("service.php?action=getRunners", function(json) {
			if (json.runners.length > 0) {
				$('#finishers_m').empty();
				$('#finishers_f').empty();
				$('#finishers_all').empty();	
				
				$.each(json.runners,function() {
					var info = '<li>Name: ' +  this['fname'] + ' ' +  this['lname'] + '. Time: ' +  this['time'] + '</li>';
					if(this['gender'] == 'm'){
						$('#finishers_m').append( info );
					}else if(this['gender'] == 'f'){
						$('#finishers_f').append( info );
					}else{}
					$('#finishers_all').append( info );
				});
			}
		});
		getTimeAjax();
	}
	
	$("#addRunner").submit(function(){
		return false;
	});
	
	$('#btnSave').click(function() {

		var data = $("#addRunner :input").serializeArray();

		$.post($("#addRunner").attr('action'), data, function(json){
			
			if (json.status == "fail") {
				alert(json.message);
			}
			if (json.status == "success") {
				alert(json.message);
				clearInputs();
			}
		}, "json");

	});	

	function clearInputs(){
		$("#txtFirstName").val('');
		$("#txtLastName").val('');
		$("#ddlGender").val('');
		$("#txtMinutes").val('');
		$("#txtSeconds").val('');
	}	
	
});
