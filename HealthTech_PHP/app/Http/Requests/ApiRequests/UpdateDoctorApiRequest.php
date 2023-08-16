<?php

namespace App\Http\Requests\ApiRequests;

use App\Models\Doctor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UpdateDoctorApiRequest extends BaseClientApiRequest
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
        $doctorId = $this->route('doctor');

        $doctors = Doctor::find($doctorId);

        foreach ($doctors as $doctor) {
            $userID = $doctor->user_id;
        }

        return [
            'department_id' => ['integer', 'required'],
            'avatar_id'     => ['integer', 'nullable'],
            'email'         => ['required', 'unique:users,email,' . $userID],
            'phone_number'  => ['required', 'unique:users,phone_number,' . $userID],
            'ic_number'     => [
                'required',
                Rule::unique('doctors', "ic_number")->ignore($this->route('doctor'), 'id')
            ],
        ];
    }
}
