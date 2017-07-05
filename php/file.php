<?php
	$data = array();// Переменная ответа

	if( isset( $_GET['uploadfiles'] ) ){
		$error = false;
		$files = array();
		
		$uploaddir = './../imgs/uploads/';
		// Создадим папку если её нет
		if( ! is_dir( $uploaddir ) ) mkdir( $uploaddir, 0777 );

		// переместим файлы из временной директории в указанную
		foreach( $_FILES as $file ){
			if( move_uploaded_file( $file['tmp_name'], $uploaddir . basename($file['name']) ) ){
				$path = realpath( $uploaddir . $file['name'] );
				$pos = strpos($path, "adminPanel");
				$files[] = 'http://'.$_SERVER['SERVER_NAME'].substr($path, $pos-1);
			}
			else{
				$error = true;
			}
		}

		$data = $error ? array('error' => 'Ошибка загрузки файлов.') : array('files' => $files );
		echo json_encode( $data );
	}
?>