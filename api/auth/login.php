<?php 

    // header('Access-Control-Allow-Origin: *');

    require_once("../models/User.php");
    require_once("../util/Database.php");
    require_once("../util/Response.php");
    require_once("../util/warnings/InvalidRequestWarning.php");
    require_once("../util/warnings/InvalidCredentialsWarning.php");
    require_once("../util/warnings/UnauthorizedRequestWarning.php");

    session_start();
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_SESSION["user"])){
            echo json_encode(new Response(true, $_SESSION["user"]));
        }
        else{
            echo json_encode(new Response(false, new UnauthorizedRequestWarning()));
        }
    }
    elseif($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(isset($_SESSION["user"])){
            return json_encode($_SESSION["user"]);
        }
        else{
            $dbc = Database::getInstance();
            $sql = "SELECT * FROM users WHERE email = :email;";
            $email = $_POST["email"];
            $bindVals = ['email' => $email];
            $userData = $dbc->fetch($sql, $bindVals);
            if($userData == false){
                //email wasn't found
                echo json_encode(new Response(false, new InvalidCredentialsWarning()));
            }
            else{
                //email was found, now check if passwords match
                $password = $_POST["password"];
                $hash = $userData["password"];
                $match = password_verify($password, $hash);
                if($match){
                    //the password entered is the same as the one in the db
                    $user = new User($userData);
                    $_SESSION["user"] = $user;
                    echo json_encode(new Response(true, $_SESSION["user"]));
                }
                else{
                    //password is incorrect
                    echo json_encode(new Response(false, new InvalidCredentialsWarning()));
                }
            }
        }
    }
    else{
        echo json_encode(new Response(false, new InvalidRequestWarning()));
    }
?>