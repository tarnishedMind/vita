<?php
	include_once("randomString.php");
	include_once("./qrcode/qrlib.php");
	header('Access-Control-Allow-Origin: *');

	if(isset($_POST['data']) && isset($_POST['level']) && isset($_POST['size'])){
		$PNG_TEMP_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'qr'.DIRECTORY_SEPARATOR;
	
		if (!file_exists($PNG_TEMP_DIR))
			mkdir($PNG_TEMP_DIR);
		
		$filenamesArr = [];
		foreach($_POST['data'] as $str){
			$filename = $PNG_TEMP_DIR.random_string(6,array('low','upp','num')).'.png';	
			QRcode::png($str, $filename, $_POST['level'], $_POST['size'], $_POST['size']);
			//$filename = str_replace("\/","\\\\", $filename)
			$filenamesArr[] = $filename;
		}
		
		echo json_encode($filenamesArr);
	}
	else echo 'Ошибка формирования QR изображения. Получены неверные входные параметры.'
?>