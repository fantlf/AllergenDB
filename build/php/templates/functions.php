<?php
// functions.php
$dbhost  = 'localhost';
$dbname  = 'allergendb';
$dbuser  = 'allergen_team';
$dbpass  = 'dbpass';
$appname = 'Allergy Database';
$tagline = 'A';

$connection = new mysqli ( $dbhost, $dbuser, $dbpass, $dbname );
if ($connection->connect_error)
	die ( $connection->connect_error );

function checkForErrors($pass,$pass2,$email,$email2) {
	$error = "";
	if ($pass != $pass2)
		$error = "Passwords must match";
	else if ($email != $email2)
		$error = "Email addresses must match";
	else if (!filter_var($email, FILTER_VALIDATE_EMAIL))
		$error = "Invalid email format";
	else if (!passwordCharTest($temp))
		$error = "Your password may only contain numbers and letters";
	else if (!passwordLenTest($temp))
		$error = "Your password must be at least six characters long";
	return $error;
}
function createTable($name, $query) {
	queryMysql ( "CREATE TABLE IF NOT EXISTS $name($query)" );
	echo "Table '$name' created or already exists.<br>";
}
function queryMysql($query) {
	global $connection;
	$result = $connection->query ( $query );
	if (! $result)
		die ( $connection->error );
	return $result;
}
function destroySession() {
	$_SESSION = array ();

	if (session_id () != "" || isset ( $_COOKIE [session_name ()] ))
		setcookie ( session_name (), '', time () - 2592000, '/' );

	session_destroy ();
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
