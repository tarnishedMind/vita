// Формируем событие загрузки файла и добавления полного блока записей из формы добавления в массив для передачи. Отправляем данные на сервер.
function setloadFileAndUpdateClickerEvent(page, hideFileLoadBlockId) {

// Событие получения файла
var files;
$('input[type="file"]').change(function(){
	files = this.files;
});

// Добавление данных на сервер
$('.update-btn').click(function( event ){
	event.stopPropagation(); // Остановка происходящего
	event.preventDefault();  // Полная остановка происходящего

	// Создадим данные формы и добавим в них данные файлов из files
	var data = new FormData();
	$(files).each(function( key, value ){
		data.append( key, value );
	});

	// Отправляем запрос
	$.ajax({
		url: '/adminPanel/php/file.php?uploadfiles',
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false, // Не обрабатываем файлы (Don't process the files)
		contentType: false, // Так jQuery скажет серверу что это строковой запрос
		success: function( respond, textStatus, jqXHR ){

			if( typeof respond.error === 'undefined' ){ // Файлы успешно загружены
				// выведем пути к загруженным файлам в блок '#'+hideFileLoadBlockId (value)
				var files_path = respond.files;
				$('#'+hideFileLoadBlockId).attr('value', files_path);
				// Разрешаем событие 'Добавить', и одновременно добавляем данные
				page.setUpdateClicker();
				$("#reload-btn").trigger('click');
			}
			else
				console.log('Ошибки ответа сервера: ' + respond.error );
		},
		error: function( jqXHR, textStatus, errorThrown ){
			console.log('Ошибки AJAX запроса: ' + textStatus );
		}
	});

});
}