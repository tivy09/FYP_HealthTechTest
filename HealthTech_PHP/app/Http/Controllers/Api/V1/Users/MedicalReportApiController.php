<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Http\Controllers\Controller;
use App\Models\MedicalReport;
use App\Http\Requests\StoreMedicalReportRequest;
use App\Http\Requests\UpdateMedicalReportRequest;

class MedicalReportApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMedicalReportRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMedicalReportRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MedicalReport  $medicalReport
     * @return \Illuminate\Http\Response
     */
    public function show(MedicalReport $medicalReport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMedicalReportRequest  $request
     * @param  \App\Models\MedicalReport  $medicalReport
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMedicalReportRequest $request, MedicalReport $medicalReport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MedicalReport  $medicalReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(MedicalReport $medicalReport)
    {
        //
    }
}
