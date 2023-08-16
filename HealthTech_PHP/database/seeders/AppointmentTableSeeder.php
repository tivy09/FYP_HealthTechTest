<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Appointment;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class AppointmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $appointments = [];

        for ($i = 0; $i < 50; $i++) {
            $appointment = [
                'name' => $faker->name,
                'ic_no' => $faker->randomNumber(5),
                'phone_number' => '+601' . rand(2, 9) . $faker->randomNumber(7),
                'address' => $faker->address,
                'appointment_date' => Carbon::now()->addDay($i)->toDateTimeString(),
                'appointment_time' => Carbon::now()->addMinutes($i * 60)->format('H:i'),
                'is_comed' => rand(0, 1),
                'status' => rand(1, 8),
                'department_id' => rand(1, 13),
                'doctor_id' => rand(1, 50),
                'created_at' => Carbon::now()->addDay($i),
                'updated_at' => Carbon::now()->addDay($i),
            ];

            array_push($appointments, $appointment);
        }

        Appointment::insert($appointments);
    }
}
