<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class PermissionsTableSeeder extends Seeder
{
    public function run()
    {

        Schema::disableForeignKeyConstraints();
        \DB::table('permissions')->truncate();
        Schema::enableForeignKeyConstraints();

        $permissions = [
            ['title' => 'user_management_access', 'type'  => 'management'],
            ['title' => 'permission_show', 'type'  => 'permission'],
            ['title' => 'permission_access', 'type'  => 'permission'],
            ['title' => 'role_create', 'type'  => 'role'],
            ['title' => 'role_edit', 'type'  => 'role'],
            ['title' => 'role_show', 'type'  => 'role'],
            ['title' => 'role_access', 'type'  => 'role'],
            ['title' => 'user_create', 'type'  => 'user'],
            ['title' => 'user_edit', 'type'  => 'user'],
            ['title' => 'user_show', 'type'  => 'user'],
            ['title' => 'user_delete', 'type'  => 'user'],
            ['title' => 'user_access', 'type'  => 'user'],
            ['title' => 'audit_log_show', 'type'  => 'audit_log'],
            ['title' => 'audit_log_access', 'type'  => 'audit_log'],
            ['title' => 'user_login_log_create', 'type'  => 'user_login_log'],
            ['title' => 'user_login_log_edit', 'type'  => 'user_login_log'],
            ['title' => 'user_login_log_show', 'type'  => 'user_login_log'],
            ['title' => 'user_login_log_delete', 'type'  => 'user_login_log'],
            ['title' => 'user_login_log_access', 'type'  => 'user_login_log'],
            ['title' => 'system_settings_menu_access', 'type'  => 'management'],
            ['title' => 'global_setting_create', 'type'  => 'global_setting'],
            ['title' => 'global_setting_edit', 'type'  => 'global_setting'],
            ['title' => 'global_setting_show', 'type'  => 'global_setting'],
            ['title' => 'global_setting_delete', 'type'  => 'global_setting'],
            ['title' => 'global_setting_access', 'type'  => 'global_setting'],
            ['title' => 'language_create', 'type'  => 'language'],
            ['title' => 'language_edit', 'type'  => 'language'],
            ['title' => 'language_show', 'type'  => 'language'],
            ['title' => 'language_delete', 'type'  => 'language'],
            ['title' => 'language_access', 'type'  => 'language'],
            ['title' => 'country_create', 'type'  => 'country'],
            ['title' => 'country_edit', 'type'  => 'country'],
            ['title' => 'country_show', 'type'  => 'country'],
            ['title' => 'country_delete', 'type'  => 'country'],
            ['title' => 'country_access', 'type'  => 'country'],
            ['title' => 'image_create', 'type'  => 'image'],
            ['title' => 'image_edit', 'type'  => 'image'],
            ['title' => 'image_show', 'type'  => 'image'],
            ['title' => 'image_delete', 'type'  => 'image'],
            ['title' => 'image_access', 'type'  => 'image'],
            ['title' => 'laravel_passport_create', 'type'  => 'laravel_passport'],
            ['title' => 'laravel_passport_edit', 'type'  => 'laravel_passport'],
            ['title' => 'laravel_passport_show', 'type'  => 'laravel_passport'],
            ['title' => 'laravel_passport_delete', 'type'  => 'laravel_passport'],
            ['title' => 'laravel_passport_access', 'type'  => 'laravel_passport'],
            ['title' => 'notice_board_create', 'type'  => 'notice_board'],
            ['title' => 'notice_board_edit', 'type'  => 'notice_board'],
            ['title' => 'notice_board_show', 'type'  => 'notice_board'],
            ['title' => 'notice_board_delete', 'type'  => 'notice_board'],
            ['title' => 'notice_board_access', 'type'  => 'notice_board'],
            ['title' => 'department_create', 'type'  => 'department'],
            ['title' => 'department_edit', 'type'  => 'department'],
            ['title' => 'department_show', 'type'  => 'department'],
            ['title' => 'department_delete', 'type'  => 'department'],
            ['title' => 'department_access', 'type'  => 'department'],
            ['title' => 'doctor_create', 'type'  => 'doctor'],
            ['title' => 'doctor_edit', 'type'  => 'doctor'],
            ['title' => 'doctor_show', 'type'  => 'doctor'],
            ['title' => 'doctor_delete', 'type'  => 'doctor'],
            ['title' => 'doctor_access', 'type'  => 'doctor'],
            ['title' => 'nurse_create', 'type'  => 'nurse'],
            ['title' => 'nurse_edit', 'type'  => 'nurse'],
            ['title' => 'nurse_show', 'type'  => 'nurse'],
            ['title' => 'nurse_delete', 'type'  => 'nurse'],
            ['title' => 'nurse_access', 'type'  => 'nurse'],
            ['title' => 'patient_create', 'type'  => 'patient'],
            ['title' => 'patient_edit', 'type'  => 'patient'],
            ['title' => 'patient_show', 'type'  => 'patient'],
            ['title' => 'patient_delete', 'type'  => 'patient'],
            ['title' => 'patient_access', 'type'  => 'patient'],
            ['title' => 'medicine_category_create', 'type'  => 'medicine_category'],
            ['title' => 'medicine_category_edit', 'type'  => 'medicine_category'],
            ['title' => 'medicine_category_show', 'type'  => 'medicine_category'],
            ['title' => 'medicine_category_delete', 'type'  => 'medicine_category'],
            ['title' => 'medicine_category_access', 'type'  => 'medicine_category'],
            ['title' => 'medicine_create', 'type'  => 'medicine'],
            ['title' => 'medicine_edit', 'type'  => 'medicine'],
            ['title' => 'medicine_show', 'type'  => 'medicine'],
            ['title' => 'medicine_delete', 'type'  => 'medicine'],
            ['title' => 'medicine_access', 'type'  => 'medicine'],
            ['title' => 'profile_password_edit', 'type'  => 'profile'],
        ];

        Permission::insert($permissions);
    }
}
