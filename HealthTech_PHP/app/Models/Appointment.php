<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \DateTimeInterface;

class Appointment extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $table = 'appointments';

    public const STATUS_SELECT = [
        '1' => 'Pending',
        '2' => 'Scheduled',
        '3' => 'Approved',
        '4' => 'Rejected',
        '5' => 'Canceled',
        '6' => 'Completed',
        '7' => 'Arrived',
        '8' => 'Ready',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'id',
        'name',
        'ic_no',
        'phone_number',
        'address',
        'appointment_date',
        'appointment_time',
        'is_comed',
        'status',
        'department_id',
        'doctor_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function departments()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function doctors()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    public function patients()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
}
