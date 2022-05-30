<?php

class Util
{
    public static function getPublicProperties($obj){
        return get_object_vars($obj);
    }
}

?>