<?php
$maxlength=0;
$array= array();

$file=file('./ODS6.txt');

foreach ($file as $line){
	$line=substr($line,0,-2); //cut \n
	$len=strlen($line);
	if ($len > $maxlength){
		$maxlength=$len;
	}
	if(!array_key_exists($len,$array)){
		$array[$len]=array();
	}
	array_push($array[$len],$line);
	unset($line);
}
unset($file);

exit (json_encode($array));

