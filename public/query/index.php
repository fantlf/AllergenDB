<?php
require_once "../utilities/functions.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$query = $_GET['query'];
echo $query;
$insertTest = substr($query, 0, 5);
echo $insertTest;
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
