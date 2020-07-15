<?php

$takenUsernames = array ('bill', 'ted', 'sam');

sleep(1);

if ($_REQUEST['username'] == '') {
	echo 'denied';
} else if (in_array( $_REQUEST['username'], $takenUsernames )) {
	echo 'denied';
} else {
	echo 'okay';
}

?>
