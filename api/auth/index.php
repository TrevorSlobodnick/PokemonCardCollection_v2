<?php 

    require_once("../util/User.php");
    require_once("../models/User.php");

    session_start();
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_SESSION["user"])){
            return json_encode(true);
        }
        else{
            return json_encode(false);
        }
    }
    else if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(isset($_SESSION["user"])){
            return json_encode($_SESSION["user"]);
        }
        else{
            $dbc = Database::getInstance();
            $sql = "SELECT * FROM users WHERE email = :email AND password = :password;";
            $bindVals = ['email' => $_POST["email"], 'password' => $_POST["password"]];
            $userData = $dbc->fetch($sql, $bindVals);
            if($userData == false){
                //no user was found
                return json_encode(false);
            }
            else{
                $user = new User($userData);
                $_SESSION["user"] = $user;
                return json_encode(true);
            }
        }
    }
?>