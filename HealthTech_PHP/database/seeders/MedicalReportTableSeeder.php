<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use App\Models\MedicalReport;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MedicalReportTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        DB::beginTransaction();

        try {
            for ($i = 0; $i < 50; $i++) {
                $medicalReportArray = [
                    'uid' => app('App\Http\Controllers\BaseController')->generateUID('MR'),
                    'patient_id' => rand(1, 50),
                    'doctor_id' => rand(1, 50),
                    'appointment_id' => rand(1, 50),
                    'description' => $faker->paragraph,
                    'sensitive_matters' => $faker->paragraph,
                    'status' => rand(0, 1),
                    'created_at' => Carbon::now()->addDay($i),
                    'updated_at' => Carbon::now()->addDay($i),
                ];

                $medicalReport = MedicalReport::create($medicalReportArray);
                $medicalReport->medicines()->sync($this->generateRandomIntArray(rand(3, 5), 1, 5));
            }
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        } finally {
            DB::commit();
        }
    }

    function generateRandomIntArray($minValue, $maxValue)
    {
        $randomArray = array();
        for ($i = 0; $i < 50; $i++) {
            $randomArray[] = rand($minValue, $maxValue);
        }
        return $randomArray;
    }
}
