$(document).ready(function(){

	var map;
	var info_window = new google.maps.InfoWindow({content: ''});
	var markersArray = [];
	var bounds = new google.maps.LatLngBounds();

	function initialize(){
		var lat = 45.519098;
		var lng = -122.672138;
		
		var latlng = new google.maps.LatLng(lat,lng);
		var mapOpts = {
			zoom: 13,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.HYBRID
		};
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOpts);
		
		if ( $('#ddlTypes').length ) {
			// Populate the dropdown list
			getAllTypes();
		}else{
			// Populate the list of sightings
			getAllSightings();
		}
    }
    
    function getAllSightings(){
    	$.getJSON("service.php?action=getAllSightings", function(json) {
			if (json.sightings.length > 0) {
				$('#sight_list').empty();	
				
				$.each(json.sightings,function() {
					var info = 'Date: ' +  this['date'] + ', Type: ' +  this['type'];
					
					var $li = $("<li />");
					$li.html(info);
					$li.addClass("sightings");
					$li.attr('id', this['id']) ;
					$li.click(function(){
						getSingleSighting( this['id'] );		
					});
					$li.appendTo("#sight_list");	
				});
			}
		});
    }
	
	function getSingleSighting(id){
	
    	$.getJSON("service.php?action=getSingleSighting&id="+id, function(json) {
			if (json.sightings.length > 0) {
				
				$.each(json.sightings,function() {
					var loc = new google.maps.LatLng(this['lat'], this['long']);
				
					var my_marker = new google.maps.Marker({
						position: loc, 
						map: map,
						title:this['type'] 
					}); 
					map.setCenter(loc, 20);
				});
			}
		});	
	}

    function getAllTypes(){
    	$.getJSON("service.php?action=getSightingsTypes", function(json_types) {
			if (json_types.creature_types.length > 0) {
				
				$.each(json_types.creature_types,function() {
					var info =  this['type'];
					var $li = $("<option />");
					$li.html(info);
					$li.appendTo("#ddlTypes");	
				});
			}
		});
    }	

    function getSightingsByType(type){
    	$.getJSON("service.php?action=getSightingsByType&type="+type, function(json) {
			if (json.sightings.length > 0) {
				$('#sight_list').empty();	
				
				$.each(json.sightings,function() {
					add_sighting(this);
				});
				map.fitBounds(bounds);
			}
		});
    }	
    
    $('#ddlTypes').change(function() {
    	if($(this).val() != ""){
  			clearOverlays();
  			getSightingsByType( $(this).val() );
  		}
	});
	
	function add_sighting(cryptid) {
	
		var loc = new google.maps.LatLng(cryptid['lat'], cryptid['long']);
		
		var info = 'Distance: ' +  cryptid['distance'] + '<br>';
		info += ' Height: ' +  cryptid['height'] + ', Weight: ' +  cryptid['weight'] + ', Color: ' +  cryptid['color'] + '<br>';
		info += 'Latitude: ' +  cryptid['lat'] + ', Longitude: ' +  cryptid['long'];
		
		var opts = {
			map: map, 
			position: loc, 
			clickable: true
		};
		
		var marker = new google.maps.Marker(opts);
		marker.note = 'Date: ' +  cryptid['date'] + ', Type: ' +  cryptid['type'];
		markersArray.push(marker);
		google.maps.event.addListener(marker, 'click', function() {
			info_window.content = info;
			info_window.open(map, marker);
		});
		
		var $li = $("<li />");
		$li.html('Date: ' +  cryptid['date'] + ', Type: ' +  cryptid['type']);
		$li.addClass("sightings");
		$li.click(function(){
			info_window.content = info;
			info_window.open(map, marker);		
		});
		$li.appendTo("#sight_list");	
		bounds.extend(loc);
		return marker;
	}
	
	function clearOverlays() {
		if (markersArray) {
			for (i in markersArray) {
				markersArray[i].setMap(null);
			}
			markersArray.length = 0;
			bounds = null;
			bounds = new google.maps.LatLngBounds();
		}
	}

    initialize();
    
});//end doc ready