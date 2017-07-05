<?php
	/* random_string
		* @param $length - длина новой строки
		* @param $case - массив типов: "low", "upp", "num", "spec". Пустой массив - используются все типы.
		* @return $rand_str - случайная строка
	*/
	function random_string($length, array $case = array()) {
		
		define ("LOWER", "abcdefghijklmnopqrstuvwxyz");
		define ("UPPER", "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		define ("NUMBER", "1234567890");
		define ("SPECIAL", "^@*+-+%()!?");

		$nChars—;
		$symbols = array();
		if (in_array("low", $case))
		$symbols[] = LOW;
		if (in_array("upp", $case))
		$symbols[] = UPP;
		if (in_array("num", $case))
		$symbols[] = NUM;
		if (in_array("spec", $case))
		$symbols[] = SPEC;
		if (count($symbols) == 0)
		$symbols = array(LOWER, UPPER, NUMBER, SPECIAL);

		$rand_str = "";
		for ($i = 0; $i <= $length; $i++) {
			$id = rand(0, count($symbols) - 1);
			$source_str = $symbols[$id];
			$rand_str .= $source_str{ rand(0, strlen($source_str) - 1) };
		}
		
		return $rand_str;
	}
?>