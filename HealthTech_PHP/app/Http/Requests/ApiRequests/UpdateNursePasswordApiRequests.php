<?php

namespace App\Http\Requests\ApiRequests;

use Faker\Provider\Base;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateNursePasswordApiRequests extends BaseClientApiRequest
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
            "email"     => "required",
            'username'  => ['required', 'unique:users,username,' . Auth::id()],
            "password"  => "required|min:8",
        ];
    }
}
