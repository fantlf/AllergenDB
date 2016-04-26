<?php
require_once "../utilities/functions.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/*
  This file receives a SQL query in GET
  It runs the query, and returns the result as a JSON object
*/
$query = $_GET['query'];
$selectTest = substr($query, 0, 6);
if ($selectTest != "SELECT") {
  die("Error: Not a select query");
}
$attrs = extractAttributes($query);
$result = queryMysql($query);
$outp = "";

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{';
    for ($i = 0; $i < count($rs); $i++) {
      $outp .= '"' . $attrs[$i] . '":"' . $rs[$attrs[$i]] . '"';
      if($i != count($rs) - 1) $outp .= ',';
    }
    $outp .= '}';
}

$outp ='{"records":['.$outp.']}';
echo($outp);

function extractAttributes($query) {
  $pattern = '/SELECT [\w,\s*]+ FROM/';
  preg_match($pattern, $query, $matches);
  $temp = $matches[0];
  $temp = str_replace(" ", "", $temp);
  $temp = substr($temp, 6, (count($temp) - 5));
  $temp = explode(",",$temp);
  return $temp;
}
?>
