<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \DateTimeInterface;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory;
    use SoftDeletes;

    public const MARITAL_STATUS_SELECT = [
        '0' => 'Single',
        '1' => 'Marital',
    ];

    public const GENDER_SELECT = [
        '0' => 'Male',
        '1' => 'Female',
    ];

    public $table = 'patients';

    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'uid',
        'ic_number',
        'first_name',
        'last_name',
        'email',
        'marital_status',
        'address',
        'gender',
        'emergency_contact_name',
        'emergency_contact_phone_number',
        'phone_number',
        'user_id',
        'avatar_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function avatar()
    {
        return $this->belongsTo(Image::class, 'avatar_id');
    }
}
