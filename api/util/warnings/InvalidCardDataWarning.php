<?php 

require_once("Warning.php");

class InvalidCardDataWarning extends Warning{
    public function __construct(){
        parent::__construct("Could not create a Pokemon card with the data provided");
    }
}

?>