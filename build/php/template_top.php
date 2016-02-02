<?php
  require_once 'functions.php';
  if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang='en-US'>
  <head>
    <title>Allergy Database</title>
    <meta charset = "UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="restaurant, allergy, allergen, food, options">
    <meta name="content" content="A database for various allergies and restaurants in Boone">
    <link rel="stylesheet" type="text/css" href="../css/styles.css">
    <link rel="shortcut icon" href="../pictures/favicon.ico">
    <link rel="stylesheet" type="text/css" href="../../node_modules/foundation/scss/foundation.css">
    <script src='../../node_modules/jquery/dist/jquery.js'></script>
  </head>
  <body>
    <p>From the template</p>
