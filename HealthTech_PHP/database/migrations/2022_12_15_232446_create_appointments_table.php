<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // IC是第一个输入的 当病人输入IC的时候 就会call search的API 看他有没有在医院的数据库里面
        // 有的话就直接显示他的名字电话号码那些 用户不必再次填写
        // 没有的话就需要一个一个填写
        Schema::create('appointments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->string('ic_no')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('address')->nullable();
            $table->date('appointment_date')->nullable();
            $table->time('appointment_time')->nullable();
            $table->boolean('is_comed')->default(0);
            $table->string('status')->default(1)->command('1 => Pending, 2 => Scheduled, 3 => Approved, 4 => Rejected, 5 => Canceled, 6 => Completed, 7 => Arrived, 8 => Ready');
            $table->unsignedBigInteger('department_id')->nullable();
            $table->foreign('department_id')->references('id')->on('departments');
            $table->unsignedBigInteger('doctor_id')->nullable();
            $table->foreign('doctor_id')->references('id')->on('doctors');
            $table->unsignedBigInteger('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('patients');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
