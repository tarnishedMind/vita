<?php
	// �������� ����������� ���� ������, ����� E_NOTICE
    error_reporting(E_WARNING);
    ini_set('display_errors', 1);
	
	class CurlSend {
		private $request;
		private $url;
		
		/* ��������� Curl -�������.
		 * @param $url - ������� url-�����.
		 * @param $urlParameters - ������ ���������� � ������� 'key' => 'value'.
		 * @param $method - 'GET', 'POST', 'PUT', 'DELETE' (�� ��������� - 'POST').
		 */
		public function configure($url, $urlParameters = [], $urlHeader = '', $method = 'GET') {
			// �������� ����� ��� ��������� ������
			$options = array (
				'http' => array (
					'method' => $method,
					'header' => $urlHeader,
					'content' => json_encode($urlParameters)
				)
			);
			 
			// �������� ��������� ������
			$this->request = stream_context_create($options);
			$this->url = ($method == 'GET')? (($urlParameters != null)? $url.'?'.http_build_query($urlParameters) : $url): $url;
		}
		
		/* ��������� Curl-������ � ������������ � ����������� ������������.
		 * @return ���������� �������� ������� file_get_contents() - ����� ��� FALSE. 
		 * @throws Exception, ���� �������� ������ ��� ����������.
		 */
		public function execute() {
			// �������� ������ � ��������� ����������
			$result = file_get_contents($this->url, 0, $this->request);
			$this->throwExceptionIfError($result);
			return $result;
		}
		
		/* ���������, ������������ ��������� ������� ��� �������� ����������. 
		 * @param $success ���� �� ������� ��������� ������� ��� ���.
		 * @throws Exception, ���� ������� �� ���������. ���������� � ���������� �� ������ ����� � E_WARNING.
		 */
		protected function throwExceptionIfError($success) {
			if (!$success) {
				set_error_handler('myHandler', E_WARNING);
			}
		}
		
		// ����������� ���������� ������ E_WARNING
		private function myHandler($level, $message, $file, $line, $context) {
			// � ����������� �� ���� ������ ��������� ��������� ���������
			switch ($level) {
				case E_WARNING:
					$type = 'Warning';
					break;
				default;
					// ��� �� E_WARNING ��������� ������� �� ��� PHP
					return false;
			}
			echo $type.': '.$message;
			// ��������, ��� �� ���������� ������, � ���������� ��������� �� ���������
			return true;
		}		
		
		/* ��������� ������ ���������� GET.
		 * @param $parameters ������ ����������.
		 * @return Parameters � ������� GET: '?key1=value1&key2=value2'
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