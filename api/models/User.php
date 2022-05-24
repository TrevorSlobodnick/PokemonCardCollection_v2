<?php 

/**
 * A class that represents a User. 
 */
class User implements JsonSerializable{
    public $id, $email, $password;

    public function __construct($userData)
    {
        $this->id = $userData["id"];
        $this->email = $userData["email"];
        $this->password = $userData["password"];
    }

    public function jsonSerialize(){
        $props = get_object_vars($this);
        return $props;
    }
}

?>