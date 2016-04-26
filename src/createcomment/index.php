<?php
require_once "../utilities/functions.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/*
  This file receives a SQL query in GET
  It runs the query, and returns the result as a JSON object
*/
$query = $_GET['query'];
$insertTest = substr($query, 0, 5);
if ($insertTest != "INSERT") {
  die("Error: Not an insert query");
}

$result = multiQueryMysql($query);

if($result) {
  $outp ='{"success" : "true", "result" : "'.$result.'"}';
} else {
  $outp ='{"success" : "false", "error" : "'.$result.'"}';
}

$outp ='{"records":['.$outp.']}';
echo($outp);

?>
