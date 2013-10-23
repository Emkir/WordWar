<?php
$array= array();
$file=file('./dictionary.txt');
foreach ($file as $line){
	$line=substr($line,0,-2); //cut \n
	$len=strlen($line);
	if(!array_key_exists($len,$array)){
		$array[$len]=array();
	}
	array_push($array[$len],$line);
	unset($line);
}
unset($file);

exit (json_encode($array));

