<?php 

require_once("Warning.php");

class AddToDatabaseWarning extends Warning{
    public function __construct(){
        parent::__construct("Failed to add card to database", 1);
    }
}

?>