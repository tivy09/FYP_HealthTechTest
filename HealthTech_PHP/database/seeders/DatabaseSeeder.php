<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            PermissionsTableSeeder::class,
            RolesTableSeeder::class,
            PermissionRoleTableSeeder::class,
            ImageTableSeeder::class,
            UsersTableSeeder::class,
            RoleUserTableSeeder::class,
            CountriesTableSeeder::class,
            GlobalSettingTableSeeder::class,
            DepartmentTableSeeder::class,
            MedicineCategoryTableSeeder::class,
            MedicineTableSeeder::class,
            NoticeBoardTableSeeder::class,
            DoctorTableSeeder::class,
            NurseTableSeeder::class,
            PatientTableSeeder::class,
            AppointmentTableSeeder::class,
            MedicalReportTableSeeder::class,
        ]);
    }
}
