<?php 

require_once("Warning.php");

class UnauthorizedRequestWarning extends Warning{
    public function __construct(){
        parent::__construct("You are not authorized to access this resource.");
    }
}

?>