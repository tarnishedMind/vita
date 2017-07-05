<?php
	include_once("randomString.php");
	$string = 'Forming token error';
	if($_POST['req'] == "getToken")
		$string = random_string(20);
	echo $string;
?>