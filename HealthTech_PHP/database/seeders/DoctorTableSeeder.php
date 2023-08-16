<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Doctor;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class DoctorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        for ($i = 1; $i <= 50; $i++) {
            $first_name = $faker->firstName;
            $last_name = $faker->lastName;
            $phone_number = '+601' . rand(2, 9) . $faker->randomNumber(7);
            $phone_number_emergency = '+601' . rand(2, 9) . $faker->randomNumber(7);

            $users = [
                'uid'                   => app('App\Http\Controllers\BaseController')->generateUID('users'),
                'name'                  => $first_name . ' ' . $last_name,
                'username'              => $first_name . $last_name,
                'email'                 => $first_name . $faker->randomNumber(5) . '@email.com',
                'password'              => bcrypt('password'),
                'phone_number'          => $phone_number,
                'type'                  => 3,
                'avatar_id'             => rand(1, 20),
                'is_active'             => true,
                'created_at'            => Carbon::now()->addDay($i),
                'updated_at'            => Carbon::now()->addDay($i),
            ];

            $users = User::create($users);
            $user_id = $users->id;

            $doctors = [
                'ic_number' => $faker->randomNumber(5),
                'first_name' => $first_name,
                'last_name' => $last_name,
                'marital_status' => rand(0, 1),
                'address' => $faker->address,
                'gender' => rand(0, 1),
                'status' => rand(0, 1),
                'emergency_contact_name' => $faker->name,
                'emergency_contact_phone_number' => $phone_number_emergency,
                'home_phone_number' => $phone_number,
                'occupation' => $faker->jobTitle,
                'department_id' => rand(1, 13),
                'avatar_id' => rand(1, 20),
                'user_id' => $user_id,
            ];

            Doctor::create($doctors);
        }
    }
}
