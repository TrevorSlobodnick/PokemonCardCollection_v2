<?php 

require_once("Warning.php");

class InvalidRequestWarning extends Warning{
    public function __construct(){
        parent::__construct("Invalid Request", 3);
    }
}

?>