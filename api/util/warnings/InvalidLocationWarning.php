<?php 

require_once("Warning.php");

class InvalidLocationWarning extends Warning{
    public function __construct(){
        parent::__construct("Invalid location provided");
    }
}

?>