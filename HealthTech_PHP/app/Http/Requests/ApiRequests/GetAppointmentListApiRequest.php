<?php

namespace App\Http\Requests\ApiRequests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Encryption\Decrypt as Decrypt;

class GetAppointmentListApiRequest extends BaseClientApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $this->merge([
            'decode_data' => Decrypt::decrypt2($this->encrypted_field)
        ]);

        return [
            // 'ic_no' => [
            //     'required',
            //     'string',
            // ],
            'encrypted_field' => [
                'required',
            ],
        ];
    }
}
