<?php

require_once("Warning.php");

class InvalidCredentialsWarning extends Warning{
    public function __construct(){
        parent::__construct("The email or password you entered is incorrect");
    }
}

?>
