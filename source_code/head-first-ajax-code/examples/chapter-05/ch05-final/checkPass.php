<?php

sleep(1);

$password = $_REQUEST["password"];
if (preg_match("/^.*(?=.{6,})(?=.*[0-9])(?=.*[a-zA-Z]).*$/", $password) === 0) {
  echo "denied";
} else {
  echo "okay";
}

?>
