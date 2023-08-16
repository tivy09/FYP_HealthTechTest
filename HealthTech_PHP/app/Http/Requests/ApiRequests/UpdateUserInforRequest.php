<?php

namespace App\Http\Requests\ApiRequests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateUserInforRequest extends BaseClientApiRequest
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
            'phone_number' => [
                'string',
                'required',
                Rule::unique('users', "phone_number")->ignore(Auth::id(), 'id'),
            ],
            'username' => [
                'string',
                'required',
                Rule::unique('users', "username")->ignore(Auth::id(), 'id'),
            ],
            'first_name' => [
                'string',
                'required',
            ],
            'last_name' => [
                'string',
                'required',
            ],
            'email' => [
                'required',
                Rule::unique('users', "email")->ignore(Auth::id(), 'id'),
            ],
        ];
    }
}
