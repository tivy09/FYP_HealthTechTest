<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PatientsReport;
use App\Http\Requests\StorePatientsReportRequest;
use App\Http\Requests\UpdatePatientsReportRequest;

class PatientsReportController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePatientsReportRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePatientsReportRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PatientsReport  $patientsReport
     * @return \Illuminate\Http\Response
     */
    public function show(PatientsReport $patientsReport)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PatientsReport  $patientsReport
     * @return \Illuminate\Http\Response
     */
    public function edit(PatientsReport $patientsReport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePatientsReportRequest  $request
     * @param  \App\Models\PatientsReport  $patientsReport
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePatientsReportRequest $request, PatientsReport $patientsReport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PatientsReport  $patientsReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(PatientsReport $patientsReport)
    {
        //
    }
}
