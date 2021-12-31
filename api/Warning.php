<?php

/**
 * Used to create error responses
 * 
 * CODES:
 * 0 - Unknown,
 * 1 - Failed to add card to database
 */
class Warning{
    public $message;
    public $code;

    const UnknownError = new self("Unknown Error", 0);
    const AddToDatabaseError = new self("Failed to add card to database", 1);
    const NoCardsError = new self("There are no cards in your collection", 2);

    public function __construct($message, $code){
        $this->message = $message;
        $this->code = $code;
    }
}

?>