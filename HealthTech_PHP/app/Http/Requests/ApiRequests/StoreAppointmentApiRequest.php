<?php

namespace App\Http\Requests\ApiRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentApiRequest extends BaseClientApiRequest
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
        return [
            'name' => [
                'string',
                'required',
            ],
            'ic_no' => [
                'string',
                'required',
            ],
            'phone_number' => [
                'string',
                'required',
            ],
            'department_id' => [
                'required',
            ],
            'doctor_id' => [
                'required',
            ],
            'appointment_date' => [
                'required',
                'date_format:' . config('panel.date_format'),
            ],
            'appointment_time' => [
                'required',
                'date_format:' . 'H:i',
            ],
        ];
    }
}
