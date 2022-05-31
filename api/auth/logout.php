<?php

require_once("../util/Response.php");

session_start();
if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $_SESSION = array();
    session_destroy();
    echo json_encode(new Response(true, $_SESSION));
}

?>