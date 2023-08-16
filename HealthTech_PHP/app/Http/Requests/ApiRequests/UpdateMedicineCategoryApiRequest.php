<?php

namespace App\Http\Requests\ApiRequests;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicineCategoryApiRequest extends BaseClientApiRequest
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
                Rule::unique('medicine_categories', 'name')->ignore($this->route('medicineCategory'), 'id'),
            ],
        ];
    }
}
