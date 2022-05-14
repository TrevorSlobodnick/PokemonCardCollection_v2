<?php 

/**
 * A class that represents a User. 
 */
class User{
    public $firstName, $lastName, $email, $password;

    public function __construct($userData)
    {
        $this->firstName = $userData["first_name"];
        $this->lastName = $userData["last_name"];
        $this->email = $userData["email"];
        $this->password = $userData["password"];
    }
}

?>