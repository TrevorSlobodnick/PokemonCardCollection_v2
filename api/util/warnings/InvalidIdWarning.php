<?php 

require_once("Warning.php");

class InvalidIdWarning extends Warning{
    public function __construct(){
        parent::__construct("Invalid id provided");
    }
}

?>