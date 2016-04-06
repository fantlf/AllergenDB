<?php
require_once "utilities/functions.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$query = $_GET['query'];
$outp = "";
$result = queryMysql($query);
while($rs = $result->fetch_array(MYSQLI_NUM)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"col0":"' . $rs[0] . '", ';
    for ($i = 1; $i < count($rs) - 1; $i++) {
      $outp .= '"col' . $i . '":"' . $rs[$i] . '", ';
    }
    $outp .= '"col' . (count($rs)-1) . '":"' . $rs[count($rs)-1] . '"} ';
}
$outp ='{"records":['.$outp.']}';
echo($outp);
?>
