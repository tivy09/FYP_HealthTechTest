<?php

namespace App\Http\Requests\ApiRequests;

use App\Models\NoticeBoard;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreNoticeBoardRequest extends BaseClientApiRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => [
                'string',
                'required'
            ],
            'description' => [
                'string',
                'required'
            ],
            'type' => [
                'string',
                'required'
            ],
            'status' => [
                'string',
                'required'
            ],
            'image_id' => [
                'integer',
                'required'
            ],
        ];
    }
}
