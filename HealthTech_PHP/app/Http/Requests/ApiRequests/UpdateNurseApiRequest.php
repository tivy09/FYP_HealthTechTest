<?php

namespace App\Http\Requests\ApiRequests;

use App\Models\Nurse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UpdateNurseApiRequest extends BaseClientApiRequest
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
        $nurseId = $this->route('nurse');

        return [
            'department_id' => ['integer', 'required'],
            'avatar_id'     => ['integer', 'nullable'],
            'email'         => ['required', 'unique:users,email,' . $nurseId->user_id],
            'phone_number'  => ['required', 'unique:users,phone_number,' . $nurseId->user_id],
            'ic_number'     => [
                'required',
                Rule::unique('nurses', "ic_number")->ignore($this->route('nurse'), 'id')
            ],
        ];
    }
}
