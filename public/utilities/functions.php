<?php
include("access.txt");

function queryMysql($query) {
	global $connection;
	$result = $connection->query ( $query );
	if (! $result)
		return $connection->error;
	return $result;
}

function multiQueryMysql($query) {
	global $connection;
	$result = $connection->multi_query ( $query );
	if (! $result)
		return $connection->error;
	return $result;
}


function sanitizeString($var) {
	global $connection;
	$var = strip_tags ( $var );
	$var = htmlentities ( $var );
	$var = stripslashes ( $var );
	return $connection->real_escape_string ( $var );
}
function convertPass($pass) {
	$salt1 = "qm&h";
	$salt2 = "pg!@";
	$string = hash ( 'ripemd128', "$salt1$pass$salt2" );
	return $string;
}
function nameTest($name) {
	if (! preg_match ( "/^[a-zA-Z ]*$/", $name ))
		return false;
	else
		return true;
}
function passwordLenTest($pass) {
	$temp = strlen ( $pass );
	$min = 6;
	if ($temp < $min)
		return false;
	else
		return true;
}
function passwordCharTest($pass) {
	if (! preg_match ( "/^[a-zA-Z0-9]*$/", $pass ))
		return false;
	else
		return true;
}
?>
