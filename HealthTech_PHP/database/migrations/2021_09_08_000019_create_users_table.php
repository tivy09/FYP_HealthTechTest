<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uid')->nullable()->unique();
            $table->string('name')->nullable();
            $table->string('username')->nullable();
            $table->string('email')->nullable()->unique();
            $table->string('phone_number')->nullable();
            $table->string('password')->nullable();
            $table->string('decrypt_key')->unique()->nullable();
            $table->string('encrypt_key')->unique()->nullable();
            $table->string('type')->nullable();
            $table->datetime('email_verified_at')->nullable();
            $table->boolean('two_factor')->default(0)->nullable();
            $table->string('two_factor_code')->nullable();
            $table->datetime('two_factor_expires_at')->nullable();
            $table->string('remember_token')->nullable();
            $table->boolean('is_active')->default(0);
            $table->unsignedBigInteger('avatar_id')->nullable();
            $table->foreign('avatar_id')->references('id')->on('images');
            $table->timestamps();
            $table->softDeletes();
        });
    }
}
