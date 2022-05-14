<?php 

require_once("Warning.php");

class NoCardsWarning extends Warning{
    public function __construct(){
        parent::__construct("No cards found", 2);
    }
}

?>