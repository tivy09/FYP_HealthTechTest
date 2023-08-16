<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $users = [
            [
                'uid'                   => app('App\Http\Controllers\BaseController')->generateUID('users'),
                'name'                  => 'Super Admin',
                'username'              => 'superadmin',
                'email'                 => 'superadmin@superadmin.com',
                'password'              => bcrypt('password'),
                'decrypt_key'           => app('App\Http\Controllers\BaseController')->generateKey(),
                'encrypt_key'           => app('App\Http\Controllers\BaseController')->generateKey(),
                'email_verified_at'     => null,
                'two_factor'            => 0,
                'two_factor_code'       => null,
                'two_factor_expires_at' => null,
                'remember_token'        => null,
                'phone_number'          => '+60181234569',
                'type'                  => 0,
                'avatar_id'             => rand(1, 20),
                'is_active'             => true
            ],
            [
                'uid'                   => app('App\Http\Controllers\BaseController')->generateUID('users'),
                'name'                  => 'Admin',
                'username'              => 'admin',
                'email'                 => 'admin@admin.com',
                'password'              => bcrypt('password'),
                'decrypt_key'           => app('App\Http\Controllers\BaseController')->generateKey(),
                'encrypt_key'           => app('App\Http\Controllers\BaseController')->generateKey(),
                'email_verified_at'     => null,
                'two_factor'            => 0,
                'two_factor_code'       => null,
                'two_factor_expires_at' => null,
                'remember_token'        => null,
                'username'              => 'Admin',
                'phone_number'          => '+60181234568',
                'type'                  => 1,
                'avatar_id'             => rand(1, 20),
                'is_active'             => true
            ],
            [
                'uid'                   => app('App\Http\Controllers\BaseController')->generateUID('users'),
                'name'                  => 'User',
                'username'              => 'user',
                'email'                 => 'user@user.com',
                'password'              => bcrypt('password'),
                'decrypt_key'           => app('App\Http\Controllers\BaseController')->generateKey(),
                'encrypt_key'           => app('App\Http\Controllers\BaseController')->generateKey(),
                'email_verified_at'     => null,
                'two_factor'            => 0,
                'two_factor_code'       => null,
                'two_factor_expires_at' => null,
                'remember_token'        => null,
                'username'              => 'user',
                'phone_number'          => '+60181234567',
                'avatar_id'             => rand(1, 20),
                'type'                  => 2,
                'is_active'             => true
            ],
        ];

        User::insert($users);
    }
}
