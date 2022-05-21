<?php 

require_once("Warning.php");

class NoDataWarning extends Warning{
    public function __construct(){
        parent::__construct("No data provided.");
    }
}

?>