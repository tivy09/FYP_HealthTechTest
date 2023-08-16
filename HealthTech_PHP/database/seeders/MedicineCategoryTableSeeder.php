<?php

namespace Database\Seeders;

use App\Models\MedicineCategory;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class MedicineCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categiors = [
            [
                'name'      => 'Digestive System',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Circulatory System',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Central Nervous System',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Pain and Consciousness',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Musculoskeletal Disorders',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Eyes',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Ears, Nose and Pharynx',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Respiratory System',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Endocrine System',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Reproductive System and Urinary System',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Birth Control',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Obstetrics and Gynecology',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Skin',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Infection and Infection',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Immune System',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Allergic Diseases',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Nutrition',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Tumor Diseases',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Medical Diagnosis',
                'status'    => rand(0, 1),
            ],
            [
                'name'      => 'Euthanasia',
                'status'    => rand(0, 1),
            ],
        ];

        MedicineCategory::insert($categiors);
    }
}
