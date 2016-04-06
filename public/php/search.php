<?php
require_once "utilities/functions.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$query = $_GET['query'];
$queryType = substr($query, 0, 1);
if ($queryType[0] == 'S' || $queryType[0] == 's') { // SELECT
  $attributes = getAttributes($query);
  $outp = "";
  $result = queryMysql($query);
  while($rs = $result->fetch_array(MYSQLI_NUM)) {
      if ($outp != "") {$outp .= ",";}
      $outp .= '{"' . $attributes[0] . '":"' . $rs[0] . '", ';
      for ($i = 1; $i < count($rs) - 1; $i++) {
        $outp .= '"' .$attributes[$i] . '":"' . $rs[$i] . '", ';
      }
      $outp .= '"' . $attributes[count($rs) - 1] . '":"' . $rs[count($rs)-1] . '"} ';
  }
  $outp ='{"records":['.$outp.']}';
  echo($outp);
}

function getAttributes($query) {
  preg_match('/SELECT(?s)(.*)FROM/', $query, $matches);
  //echo("$matches[0]\n");
  $temp = str_replace(" ", "", $matches[0]);
  //echo("$temp\n");
  $temp = substr($temp, 6, strlen($temp)-10);
  //echo("$temp\n");
  return explode(",", $temp);
}
?>
