<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicalReportMedicinePivotTable extends Migration
{
    public function up()
    {
        Schema::create('medical_report_medicine', function (Blueprint $table) {
            $table->unsignedBigInteger('medical_report_id');
            $table->foreign('medical_report_id', 'medical_report_id_fk_4822204')->references('id')->on('medical_reports')->onDelete('cascade');
            $table->unsignedBigInteger('medicine_id');
            $table->foreign('medicine_id', 'medicine_id_fk_4822204')->references('id')->on('medicines')->onDelete('cascade');
        });
    }
}
