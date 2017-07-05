<?
	include("./CurlSend.php");
	
	function jsonRequest($url, $type, $header, $jsonString){
		try {
			$curl = new CurlSend();
			$curl->configure($url, $jsonString, $header, $type);
			$response = $curl->execute();
		} catch (Exception $exception) {
			$response = 'An exception has been thrown: ' . $exception->getMessage();
		}
		return $response;
		$curl->close();
	}
	
	echo jsonRequest($_POST['url'], $_POST['type'], $_POST['header'], $_POST['request']);
?>