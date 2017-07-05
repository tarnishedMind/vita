<?php
	// включаем отображение всех ошибок, кроме E_NOTICE
    error_reporting(E_WARNING);
    ini_set('display_errors', 1);
	
	class CurlSend {
		private $request;
		private $url;
		
		/* Настройка Curl -запроса.
		 * @param $url - целевой url-адрес.
		 * @param $urlParameters - массив параметров в формате 'key' => 'value'.
		 * @param $method - 'GET', 'POST', 'PUT', 'DELETE' (по умолчанию - 'POST').
		 */
		public function configure($url, $urlParameters = [], $urlHeader = '', $method = 'GET') {
			// Указание опций для контекста потока
			$options = array (
				'http' => array (
					'method' => $method,
					'header' => $urlHeader,
					'content' => json_encode($urlParameters)
				)
			);
			 
			// Создание контекста потока
			$this->request = stream_context_create($options);
			$this->url = ($method == 'GET')? (($urlParameters != null)? $url.'?'.http_build_query($urlParameters) : $url): $url;
		}
		
		/* Выполняем Curl-запрос в соответствии с параметрами конфигурации.
		 * @return возвращает значение функции file_get_contents() - ответ или FALSE. 
		 * @throws Exception, если возникла ошибка при исполнении.
		 */
		public function execute() {
			// Отправка данных и получение результата
			$result = file_get_contents($this->url, 0, $this->request);
			$this->throwExceptionIfError($result);
			return $result;
		}
		
		/* Проверяем, правильность отработки функций при заданных параметрах. 
		 * @param $success была ли функция выполнена успешно или нет.
		 * @throws Exception, если функция не выполнена. Исключение с сообщением об ошибке лежит в E_WARNING.
		 */
		protected function throwExceptionIfError($success) {
			if (!$success) {
				set_error_handler('myHandler', E_WARNING);
			}
		}
		
		// Собственный обработчик ошибок E_WARNING
		private function myHandler($level, $message, $file, $line, $context) {
			// в зависимости от типа ошибки формируем заголовок сообщения
			switch ($level) {
				case E_WARNING:
					$type = 'Warning';
					break;
				default;
					// это не E_WARNING обработка ложится на сам PHP
					return false;
			}
			echo $type.': '.$message;
			// сообщаем, что мы обработали ошибку, и дальнейшая обработка не требуется
			return true;
		}		
		
		/* Формируем строку параметров GET.
		 * @param $parameters массив параметров.
		 * @return Parameters в формате GET: '?key1=value1&key2=value2'
		 */
		protected function stringifyParameters($parameters) {
			$parameterString = '?';
			foreach ($parameters as $key => $value) {
				$key = urlencode($key);
				$value = urlencode($value);
				$parameterString .= "$key=$value&";
			}
			rtrim($parameterString, '&');
			return $parameterString;
		}
	}
?>