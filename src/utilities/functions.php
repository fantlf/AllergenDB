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

?>
