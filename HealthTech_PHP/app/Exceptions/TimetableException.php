<?php

namespace App\Exceptions;

use Exception;

class TimetableException extends Exception
{

    public function __construct($message = "Timetable duplicate, please use update function", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
