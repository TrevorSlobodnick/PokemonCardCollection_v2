<?php

/**
 * Used to create error responses
 * 
 * CODES:
 * 0 - Unknown,
 * 1 - Failed to add card to database
 * 2 - No cards in database
 */
class Warning implements JsonSerializable{
    private $message;
    private $code;

    public function __construct($message, $code){
        $this->message = $message;
        $this->code = $code;
    }

    public function jsonSerialize(){
        $props = get_object_vars($this);
        return $props;
    }
}

?>