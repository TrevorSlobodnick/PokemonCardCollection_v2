<?php 

/**
 * The class used to format output back to the frontend
 */
class Response{
    public $completed;
    public $data;

    /**
     * Create the Response object to send back to the front end
     * @param Boolean $completed true if the "task" was successful, false if an error was received
     * @param Object|Array $data the object or array to send back to the frontend
     */
    public function __construct($completed, $data){
        $this->completed = $completed;
        $this->data = $data;
    }
}

?>