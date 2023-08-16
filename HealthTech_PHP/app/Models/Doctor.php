<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \DateTimeInterface;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctor extends Model
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

    public $table = 'doctors';

    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'ic_number',
        'first_name',
        'last_name',
        'marital_status',
        'address',
        'gender',
        'emergency_contact_name',
        'emergency_contact_phone_number',
        'occupation',
        'home_phone_number',
        'status',
        'department_id',
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

    public function departments()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
