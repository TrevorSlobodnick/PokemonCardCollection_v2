<?php

/**
 * Used to create error responses
 */
class Warning implements JsonSerializable{
    private $message;

    public function __construct($message){
        $this->message = $message;
    }

    public function jsonSerialize(){
        $props = get_object_vars($this);
        return $props;
    }
}

?>