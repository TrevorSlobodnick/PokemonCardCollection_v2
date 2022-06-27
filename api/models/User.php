<?php

require_once("../util/Util.php");

/**
 * A class that represents a User. 
 */
class User implements JsonSerializable{
    public $id, $email;
    private $password;

    public function __construct($userData)
    {
        $this->id = $userData["id"];
        $this->email = $userData["email"];
        $this->password = $userData["password"];
    }

    public function jsonSerialize(){
        $props = Util::getPublicProperties($this);
        return $props;
    }
}

?>