<?php
	include "qrlib.php";
	include "./../randomString.php";
	
	$requestStr = file_get_contents('php://input');	
	$requestArr = json_decode($request);	
	$response = array('fileUrl' => '');	
	
	$PNG_TEMP_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
	
	if (!file_exists($PNG_TEMP_DIR))
        mkdir($PNG_TEMP_DIR);
	
	//$filename = $PNG_TEMP_DIR.random_string(6,array('low','upp','num')).'.png';	
	//QRcode::png($requestArr->data, $filename, $requestArr->level, $requestArr->size, $requestArr->size);
	
	$response['fileUrl'] = ($requestArr->level=='L');

	echo json_encode($response);