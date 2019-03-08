<?php
    error_reporting(-1); // reports all errors
    ini_set("display_errors", "1"); // shows all errors
    ini_set("log_errors", 1);
    ini_set("error_log", "/tmp/php-error.log");
    //echo 'test';
    $str_json = file_get_contents('php://input');
     //$str_json =  $_POST["myData"];
     $fp = fopen("communitycrit_revised.json", 'w');
     fwrite($fp, $str_json);
     fclose($fp);
	//file_put_contents("communitycrit_revised.json", $str_json);

?>