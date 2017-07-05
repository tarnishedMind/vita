<?php
	require_once('CurlSend.php');
	try {
		$curl = new CurlSend();
		$json_string='{"id":2, "userValue":5. "userValueDate": "2017-05-01", "comment": "Комментарий", "userId":1, "userValueSliceId":1}';
		$obj=json_decode($json_string);
		$curl->configure('http://localhost2/values/values.php', $obj, 'Authorization: Admin 1', 'POST');
		echo $response = $curl->execute();
		$curl->close();
	} catch (Exception $exception) {
		die('An exception has been thrown: ' . $exception->getMessage());
	}
?>