<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNoticeBoardsTable extends Migration
{
    public function up()
    {
        Schema::create('notice_boards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('description');
            $table->string('type')->nullable()->comment('1=dashboard, 2=doctor, 3=patient');
            $table->unsignedBigInteger('image_id')->comment('Image ID');
            $table->foreign('image_id')->references('id')->on('images');
            $table->boolean('status')->default(1)->comment('0=Inactive, 1=Active');
            $table->timestamps();
            $table->softDeletes();
        });
    }
}
