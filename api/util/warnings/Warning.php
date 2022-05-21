<?php

/**
 * Used to create error responses
 * 
 * Possible Warnings:
 * 1 - Failed to add card to database
 * 2 - No cards in database
 * 3 - Invalid Request was sent to an endpoint
 * 4 - Unauthorized Request was sent to an endpoint
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