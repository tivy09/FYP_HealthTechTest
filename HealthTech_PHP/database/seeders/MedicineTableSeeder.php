<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Medicine;
use Faker\Generator as Faker;

class MedicineTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $medicine = [
            [
                'uid' => $faker->uuid,
                'name' => 'Paracetamol',
                'amount' => 100,
                'price' => 10000,
                'status' => 1,
                'medicine_category_id' => rand(1, 20),
            ],
            [
                'uid' => $faker->uuid,
                'name' => 'Panadol',
                'amount' => 100,
                'price' => 10000,
                'status' => 1,
                'medicine_category_id' => rand(1, 20),
            ],
            [
                'uid' => $faker->uuid,
                'name' => 'Vitamin C',
                'amount' => 100,
                'price' => 10000,
                'status' => 1,
                'medicine_category_id' => rand(1, 20),
            ],
            [
                'uid' => $faker->uuid,
                'name' => 'Vitamin B',
                'amount' => 100,
                'price' => 10000,
                'status' => 1,
                'medicine_category_id' => rand(1, 20),
            ],
            [
                'uid' => $faker->uuid,
                'name' => 'Vitamin A',
                'amount' => 100,
                'price' => 10000,
                'status' => 1,
                'medicine_category_id' => rand(1, 20),
            ],
        ];

        Medicine::insert($medicine);
    }
}
