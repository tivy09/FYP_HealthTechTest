<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Controller;
use App\Models\MedicalReport;
use App\Http\Requests\ApiRequests\StoreMedicalReportApiRequest;
use App\Http\Requests\UpdateMedicalReportRequest;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class MedicalReportApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get the all medical reports with relationship
        $medicalReports = MedicalReport::with(['patient', 'patient.avatar', 'doctor', 'doctor.avatar', 'appointment', 'medicines'])->get();

        foreach ($medicalReports as $medicalReport) {
            $medicalReport['medicine_name'] = $medicalReport->medicines->pluck('name')->toArray();

            $medicalReport['doctor']['avatar_url'] = $medicalReport->doctor->avatar->document->url ?? null;
            $medicalReport['doctor']['avatar_thumbnail'] = $medicalReport->doctor->avatar->document->thumbnail ?? null;
            $medicalReport['doctor']['avatar_preview'] = $medicalReport->doctor->avatar->document->preview ?? null;
            unset($medicalReport['doctor']['avatar']);

            $medicalReport['patient']['avatar_url'] = $medicalReport->patient->avatar->document->url ?? null;
            $medicalReport['patient']['avatar_thumbnail'] = $medicalReport->patient->avatar->document->thumbnail ?? null;
            $medicalReport['patient']['avatar_preview'] = $medicalReport->patient->avatar->document->preview ?? null;
            unset($medicalReport['patient']['avatar']);
        }

        return parent::resFormat(1651, null, [
            'medical_reports' => $medicalReports
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMedicalReportRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMedicalReportApiRequest $request)
    {
        DB::beginTransaction();
        try {
            $request['uid'] = $this->generateUID('MR');
            $medicalReport = MedicalReport::create($request->all());
            $medicalReport->medicines()->sync($request['medicines']);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Create Doctor Fail : {$e->getMessage()}");
            return parent::error();
        } finally {
            DB::commit();
            return parent::success(1652);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MedicalReport  $medicalReport
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $medicalReport = MedicalReport::with(['patient', 'patient.avatar', 'doctor', 'doctor.avatar', 'appointment', 'medicines'])->where('id', $id)->first();
        $medicalReport['medicine_name'] = $medicalReport->medicines->pluck('name')->toArray();

        $medicalReport['doctor']['avatar_url'] = $medicalReport->doctor->avatar->document->url ?? null;
        $medicalReport['doctor']['avatar_thumbnail'] = $medicalReport->doctor->avatar->document->thumbnail ?? null;
        $medicalReport['doctor']['avatar_preview'] = $medicalReport->doctor->avatar->document->preview ?? null;
        unset($medicalReport['doctor']['avatar']);

        $medicalReport['patient']['avatar_url'] = $medicalReport->patient->avatar->document->url ?? null;
        $medicalReport['patient']['avatar_thumbnail'] = $medicalReport->patient->avatar->document->thumbnail ?? null;
        $medicalReport['patient']['avatar_preview'] = $medicalReport->patient->avatar->document->preview ?? null;
        unset($medicalReport['patient']['avatar']);

        return parent::resFormat(1653, null, [
            'medical_report' => $medicalReport
        ]);
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

    public function getMedicalReportByPatientID($patientID)
    {
        $medicalReports = MedicalReport::with(['patient', 'patient.avatar', 'doctor', 'doctor.avatar', 'appointment', 'medicines'])->where('patient_id', $patientID)->get();

        foreach ($medicalReports as $medicalReport) {
            $medicalReport['medicine_name'] = $medicalReport->medicines->pluck('name')->toArray();

            $medicalReport['doctor']['avatar_url'] = $medicalReport->doctor->avatar->document->url ?? null;
            $medicalReport['doctor']['avatar_thumbnail'] = $medicalReport->doctor->avatar->document->thumbnail ?? null;
            $medicalReport['doctor']['avatar_preview'] = $medicalReport->doctor->avatar->document->preview ?? null;
            unset($medicalReport['doctor']['avatar']);

            $medicalReport['patient']['avatar_url'] = $medicalReport->patient->avatar->document->url ?? null;
            $medicalReport['patient']['avatar_thumbnail'] = $medicalReport->patient->avatar->document->thumbnail ?? null;
            $medicalReport['patient']['avatar_preview'] = $medicalReport->patient->avatar->document->preview ?? null;
            unset($medicalReport['patient']['avatar']);
        }


        return parent::resFormat(1654, null, [
            'medical_report' => $medicalReports
        ]);
    }
}
