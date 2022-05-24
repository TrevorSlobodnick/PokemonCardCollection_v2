<?php 

require_once("Warning.php");

class ExistingUserWarning extends Warning{
    public function __construct(){
        parent::__construct("Account with this email already exists");
    }
}

?>