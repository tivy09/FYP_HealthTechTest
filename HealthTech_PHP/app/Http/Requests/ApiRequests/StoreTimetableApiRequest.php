<?php

namespace App\Http\Requests\ApiRequests;

use App\Helpers\ApiRes;
use App\Models\Timetable;
use Illuminate\Foundation\Http\FormRequest;
use App\Exceptions\TimetableException;

class StoreTimetableApiRequest extends BaseClientApiRequest
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
        $timetable = Timetable::where('doctor_id', $this->doctor_id)->first();

        if ($timetable) {
            throw new TimetableException;
        }

        return [
            'doctor_id' => ['integer', 'required'],
            'su' => ['string', 'required'],
            'mo' => ['string', 'required'],
            'tu' => ['string', 'required'],
            'we' => ['string', 'required'],
            'th' => ['string', 'required'],
            'fr' => ['string', 'required'],
            'sa' => ['string', 'required'],
        ];
    }
}
