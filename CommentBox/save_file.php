<?php
 $str_json = file_get_contents('php://input');
 $fp = fopen('sample.json', 'w');
 fwrite($fp,$str_json);
 fclose($fp);
?>