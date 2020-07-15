<?php
	date_default_timezone_set('America/Los_Angeles');
if($_POST){
	if ($_POST['action'] == 'addSighting') {
	
		$date = $_POST['sighting_date'] ;
		$type = htmlspecialchars($_POST['creature_type']);
		$distance = htmlspecialchars($_POST['creature_distance']);
		$weight = htmlspecialchars($_POST['creature_weight']);
		$height = htmlspecialchars($_POST['creature_height']);
		$color = htmlspecialchars($_POST['creature_color_rgb']);
		$lat = htmlspecialchars($_POST['sighting_latitude']);
		$long = htmlspecialchars($_POST['sighting_longitude']);
		
		$my_date = date('Y-m-d', strtotime($date));
		
		if($type == ''){
			$type = "Other";
		}
		
		$query = "INSERT INTO sightings (sighting_date, creature_type, creature_distance, creature_weight, creature_height, creature_color, sighting_latitude, sighting_longitude) ";
		$query .= "VALUES ('$my_date', '$type', '$distance', '$weight', '$height', '$color', '$lat', '$long') ";

		$result = db_connection($query);
		
		if ($result) {
			$msg = "Creature added successfully";
			success($msg);
		} else {
			fail('Insert failed.');
		}
		exit;
	}
}	
	function db_connection($query) {
		mysql_connect('127.0.0.1', 'crypto_db_user', 'crypto_db_password')
			OR die(fail('Could not connect to database.'));
		mysql_select_db('hfjq_sightings');

		return mysql_query($query);
	}
	
	function fail($message) {
		die(json_encode(array('status' => 'fail', 'message' => $message)));
	}
	function success($message) {
		die(json_encode(array('status' => 'success', 'message' => $message)));
	}
?>