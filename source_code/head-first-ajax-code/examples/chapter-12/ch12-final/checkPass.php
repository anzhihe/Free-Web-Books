<?php

sleep(1);

if (strlen($_REQUEST['password']) > 5) {
	echo 'okay';
} else {
	echo 'denied';
}

?>