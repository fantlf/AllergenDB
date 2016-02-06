<?php
require_once '../templates/paths.php';
$path_signin = './';
require_once '../templates/base_template_top.php'
?>
<!-- Beginning of Body -->
<?php
$error=$user=$pass="";
if (isset ($_POST['email']))
{
	$email = sanitizeString($_POST ['email']);
	$pass = sanitizeString($_POST ['pass']);
	$string = convertPass($pass);
	$result = signin($email,$pass);
	if (is_array($result)) {
		$_SESSION['type'] = $result[0];
		$_SESSION['email'] = $result[1];
		$_SESSION['fname'] = $result[2];
		$_SESSION['sname'] = $result[3];
		echo "<script>window.location = 'home.php';</script>";
	}
	else
		echo "<script>erroralert('$result')</script>";
}
?>
<link rel="stylesheet" type="text/css" href="css/signin.css">
<div id="outer">
	<form id="signin" method='post' action="signin.php">
		<fieldset>
			<legend>Sign in</legend>
			<div style="text-align:center">
			<span class="fieldname">
				<Label for="email">Email </label><input type='text' size=30
					name='email' id='email' placeholder='email eddress' required>
			</span><br>
			<span class="fieldname" style="top:15px;">
				<Label for="password">Password </label><input type='password' size=30
					name='pass' id='pass' placeholder='password' required>
			</span><br><br><br>
			<span class="submit">
				<input type='submit' value='Log In'>
			</span>
			<span id="newacc"><br><br><br><br>Don't have an account with us yet? <a href="signup.php" id="signuplink">Sign up!</a></span>
			</div>
		</fieldset>
	</form>
</div>
</body>
</html>

<!-- End of Body -->
<?php require_once '../templates/base_template_bottom.php' ?>
