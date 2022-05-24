<?php 

    header('Access-Control-Allow-Origin: *');

    require_once("../models/User.php");
    require_once("../util/Database.php");
    require_once("../util/Response.php");

    session_start();
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_SESSION["user"])){
            echo json_encode(new Response(true, $_SESSION["user"]));
        }
        else{
            echo json_encode(new Response(false, ""));
        }
    }
    else if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(isset($_SESSION["user"])){
            return json_encode($_SESSION["user"]);
        }
        else{
            $dbc = Database::getInstance();
            $sql = "SELECT * FROM users WHERE email = :email AND password = :password;";
            $email = $_POST["email"];
            $password = $_POST["password"];
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            password_verify($password, $hashedPassword);
            $bindVals = ['email' => $_POST["email"], 'password' => $_POST["password"]];
            $userData = $dbc->fetch($sql, $bindVals);
            if($userData == false){
                //no user was found
                echo json_encode(new Response(false, ""));
            }
            else{
                $user = new User($userData);
                $_SESSION["user"] = $user;
                echo json_encode(new Response(true, $_SESSION["user"]));
            }
        }
    }
?>