<?php
require_once "../utilities/functions.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/*
	Types of Valid Queries
	SELECT
	INSERT
	UPDATE
	BEGIN; INSERT
	BEGIN; SELECT
	BEGIN; UPDATE

	Return Syntax
	JSON Object
	{Records : [
		{},
		{}...
	]}

	Object with property Records which is an array of objects.
	There will always be at least one object in that array, even if the query fails

	For Select Queries:
		Objects in the records array will have the properties specified in the query, which correspond to thei results.
		ie: Select a, b, c FROM ....
		will return like this
		{Records : [
			{a : "result1vala", b : "result1valb", c : "result1valc"},
			...for each result
		]}

	For Insert and Update Queries:
		There will be one object in the records array. It will have two properies: success and message.
		If the query is successful, then success will be true and message will say "Successfully Added Data" or "Successfully Updated Data"
		If the query is failed, then success will be false and message will say "Error Adding Data" or "Error Updating Data"
*/

/*
	Code for checking if 'query' is the only thing in the get array.
	If it's not there, or if smoething else is there, die.
*/
/*
	Code for checking the query to make sure it is a valid query
*/
/*
	Code for determining the type of query, then call the proper handler for that type
*/
$query = $_GET['query'];
if(invalidQuery($query)) {
	$outp ='{"records":['."Invalid Query".']}';
	echo($outp);
	die("invalidQuery")
}
//echo $query;
$insertTest = substr($query, 0, 5);
//echo $insertTest;
$outp = "";

if ($insertTest == "BEGIN") {
	$result = multiQueryMysql($query);
	if($result) {
	  $outp ='{"result" : "'.$result.'"}';
	}
} else if ($insertTest == "SELEC") {
	$attrs = extractAttributes($query);
	$result = queryMysql($query);
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{';
	    for ($i = 0; $i < count($rs); $i++) {
	      $outp .= '"' . $attrs[$i] . '":"' . fix($rs[$attrs[$i]]) . '"';
	      if($i != count($rs) - 1) $outp .= ',';
	    }
   		$outp .= '}';
   	}
} else if ($insertTest == "INSER") {
	$result = queryMysql($query);
	$outp ='{"result" : "'.$result.'"}';
} else {
	$outp = "Error";
}

$outp ='{"records":['.$outp.']}';
echo($outp);


// Private Functions
function extractAttributes($query) {
  $pattern = '/SELECT [\w,\s*]+ FROM/';
  preg_match($pattern, $query, $matches);
  $temp = $matches[0];
  $temp = str_replace(" ", "", $temp);
  $temp = substr($temp, 6, (count($temp) - 5));
  $temp = explode(",",$temp);
  return $temp;
}

function fix($string) {
  $string = escapeDoubleQuotes($string);
  $string = removeSpecials($string);
  return $string;
}

function escapeDoubleQuotes($string) {
  $string = str_replace("\"", "\\\"", $string);
  return $string;
}

function removeSpecials($string) {
  $string = str_replace("\t", " ", $string);
  $string = str_replace("\n", " ", $string);
  $string = str_replace("\r", " ", $string);
  $string = str_replace("\0", " ", $string);
  $string = str_replace("\x0B", " ", $string);
  return $string;
}
?>
