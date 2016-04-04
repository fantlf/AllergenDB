<?php
require_once "utilities/functions.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$query = "SELECT fname, sname, email FROM user";
$result = queryMysql($query);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"fname":"' . $rs["fname"] . '", ';
    $outp .= '"sname":"'  . $rs["sname"] . '", ';
    $outp .= '"email":"'  . $rs["email"] . '"} ';
}
$outp ='{"records":['.$outp.']}';
echo($outp);
?>
