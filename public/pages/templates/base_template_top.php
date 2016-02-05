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
    <link rel="stylesheet" type="text/css" href="../../css/styles.min.css">
    <link rel="shortcut icon" href="../pictures/favicon.ico">
    <script src='../../js/index.min.js'></script>
  </head>
  <body>
    <nav class="top-bar" data-topbar>
      <ul class="title-area">
        <li class="name">
          <h1>
            <a href="<?php echo $path_home?>"><?php echo $appname ?></a>
          </h1>
        </li>
        <li class="toggle-topbar menu-icon"><a href="#"><span>menu</span></a></li>
      </ul>
      <section class="top-bar-section">
        <ul class="right">
          <li class="divider"></li>
          <li><a href="<?php echo $path_search?>">Search Restaurants</a></li>
          <li class="divider"></li>
          <li><a href="<?php echo $path_allergyinfo?>">Allergy Information</a></li>
          <li class="divider"></li>
          <li class="has-dropdown">
            <a href="#">Other</a>
            <ul class="dropdown">
              <li><label>Section Name</label></li>
              <li><a href="#">Dropdown Option</a></li>
              <li><a href="#">Dropdown Option</a></li>
              <li><a href="#">Dropdown Option</a></li>
              <li class="divider"></li>
              <li><label>Section Name</label></li>
              <li><a href="#">Dropdown Option</a></li>
              <li><a href="#">Dropdown Option</a></li>
              <li><a href="#">Dropdown Option</a></li>
              <li class="divider"></li>
            </ul>
          </li>
        </ul>
      </section>
    </nav>
