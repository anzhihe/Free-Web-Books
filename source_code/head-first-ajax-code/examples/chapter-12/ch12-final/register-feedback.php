<?php sleep(10); 

echo "<h1>Welcome to Mike's!</h1>";
echo "<p>Here's what you entered, " . $_REQUEST['firstname'] . ":</p>";
echo "<p>Username: " . $_REQUEST['username'] . "</p>";
echo "<p>Name: " . $_REQUEST['firstname'] . " " . $_REQUEST['lastname'] . "</p>";
echo "<p>Email: " . $_REQUEST['email'] . "</p>";

?>

<h2><a href="#">Read Reviews</a></h2>
<h2><a href="#">Write Reviews</a></h2>

<div id="coverBar">
	<img src="images/coverMatrix.jpg" width="82" height="115" style="left: 0px;" onclick="alert('Our movie reviews are coming soon. Check back often!')"; />
	<img src="images/coverDeadRingers.jpg" width="82" height="115" style="left: 88px;" onclick="alert('Our movie reviews are coming soon. Check back often!')"; />
	<img src="images/coverDrStrangelove.jpg" width="82" height="115" style="left: 176px;" onclick="alert('Our movie reviews are coming soon. Check back often!')"; />
	<img src="images/coverFuturama.jpg" width="82" height="115" style="left: 264px;" onclick="alert('Our movie reviews are coming soon. Check back often!')"; />
	<img src="images/coverHolyGrail.jpg" width="82" height="115" style="left: 356px;" onclick="alert('Our movie reviews are coming soon. Check back often!')"; />
	<img src="images/coverRaisingArizona.jpg" width="82" height="115" style="left: 444px;" onclick="alert('Our movie reviews are coming soon. Check back often!')"; />
	<img src="images/coverRobotChicken.jpg" width="82" height="115" style="left: 532px;" onclick="alert('Our movie reviews are coming soon. Check back often!')"; />
</div>
