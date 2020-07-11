<?php
if ($_POST) {
	$firstname = $_POST["firstname"];
	$lastname = $_POST["lastname"];
?>

<!DOCTYPE html>
<html> 
<head> 
<meta name="robots" content="noindex,  nofollow">
<meta charset="utf-8">
<title>Head First HTML and CSS Chapter 14 Contest</title> 
<style type="text/css">
img {
	float: left;
	margin-right: 20px;
}
div {
	padding-top: 40px;
}
</style>
</head>
<body>

<p>
<img src="http://headfirstlabs.com/Images/hfguy.jpg" alt="Head First Guy">
</p>

<div>
<p>
Thanks, <strong><?php print($firstname); print(" "); print($lastname); ?></strong>,
for entering the Head First HTML and CSS Chapter 14 contest.
</p>
<p>
If you win something, you'll be the first to know.
</p>
</div>


</body> 
</html>


<?php

}

?>
