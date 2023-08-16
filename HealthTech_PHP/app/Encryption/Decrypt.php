<?php

namespace App\Encryption;

use App\Http\Controllers\BaseController;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class Decrypt extends BaseController
{
    public static function decrypt2($encrypted, Validator $validator = null)
    {
        $statusCode = 9999;

        $errorResponse = [
            'status_code' => $statusCode, // 9999
            'error' => 'Decryption failed.',
            'message' => 'The provided encrypted data is invalid.',
        ];

        $data = base64_decode($encrypted);

        // Check for the warning for invalid base64 strings
        $error = error_get_last();
        if ($error !== null) {
            dd($statusCode, 'else');
        }

        // Check for invalid characters (only for ic_no)
        if (preg_match('/[^a-zA-Z0-9]/', $data)) {
            Log::channel("api")->error("Decrypt Fail, Request: {$data}");

            throw new \Illuminate\Validation\ValidationException(
                $validator,
                new JsonResponse($errorResponse, 400)
            );
        } else {
            return $data;
        }
    }
}
