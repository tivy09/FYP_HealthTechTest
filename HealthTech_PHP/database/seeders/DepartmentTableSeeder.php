<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = [
            ['name' => 'Outpatient department', 'status' => rand(0, 1)],
            ['name' => 'Inpatient Service', 'status' => rand(0, 1)],
            ['name' => 'Medical Department', 'status' => rand(0, 1)],
            ['name' => 'Nursing Department', 'status' => rand(0, 1)],
            ['name' => 'Paramedical Department', 'status' => rand(0, 1)],
            ['name' => 'Physical Medicine and Rehabilitation Department', 'status' => rand(0, 1)],
            ['name' => 'Operation Theatre Complex', 'status' => rand(0, 1)],
            ['name' => 'Pharmacy Department', 'status' => rand(0, 1)],
            ['name' => 'Radiology Department', 'status' => rand(0, 1)],
            ['name' => 'Dietary Department', 'status' => rand(0, 1)],
            ['name' => 'Non-professional Services (Business Management)', 'status' => rand(0, 1)],
            ['name' => 'Medical Record Department', 'status' => rand(0, 1)],
            ['name' => 'Personnel Department', 'status' => rand(0, 1)],
        ];

        Department::insert($departments);
    }
}

// https://www.canestar.com/list-of-departments-in-hospital-and-its-functions----a-simple-learning-for-nurses..html
