<?php
require_once "utilities/functions.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if (!isset($_GET['key'])) {
  die();
}
$key  = $_GET['key'];
if ($key != $realkey) {
  die();
}
$user = $_GET['user'];
$pass = $_GET['pass'];

if ($queryType[0] == 'S' || $queryType[0] == 's') {
  $attributes = getAttributes($query);
  $outp = "";
  $result = queryMysql($query);
  while($rs = $result->fetch_array(MYSQLI_NUM)) {
      if ($outp != "") {$outp .= ",";}
      $outp .= '{';
      for ($i = 0; $i < count($rs) - 1; $i++) {
        $outp .= '"' .$attributes[$i] . '":"' . $rs[$i] . '", ';
      }
      $outp .= '"' . $attributes[count($rs) - 1] . '":"' . $rs[count($rs)-1] . '"} ';
  }
  $outp ='{"records":['.$outp.']}';
  echo($outp);
}

function getAttributes($query) {
  preg_match('/SELECT(?s)(.*)FROM/', $query, $matches);
  $temp = str_replace(" ", "", $matches[0]);
  $temp = substr($temp, 6, strlen($temp)-10);
  return explode(",", $temp);
}
?>
