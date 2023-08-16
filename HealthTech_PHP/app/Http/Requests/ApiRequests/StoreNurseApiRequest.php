<?php

namespace App\Http\Requests\ApiRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNurseApiRequest extends BaseClientApiRequest
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
            'department_id' => ['integer', 'required'],
            'avatar_id' => ['integer', 'required'],
            'email' => ['required', 'unique:users'],
            'phone_number' => ['required', 'unique:users'],
            'ic_number' => ['required', 'unique:nurses'],
        ];
    }
}
