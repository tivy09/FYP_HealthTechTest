<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\BaseController;
use App\Models\Patient;
use App\Models\Doctor;
use App\Http\Requests\ApiRequests\StorePatientApiRequest;
use App\Http\Requests\ApiRequests\UpdatePatientApiRequest;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class PatientApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $patients = Patient::with(['avatar'])->get();

        foreach ($patients as $patient) {
            $patient['avatar_url'] = $patient->avatar->document->url ?? null;
            $patient['avatar_thumbnail'] = $patient->avatar->document->thumbnail ?? null;;
            $patient['avatar_preview'] = $patient->avatar->document->preview ?? null;;
        }

        $patients->makeHidden(['avatar', 'media', 'avavar_id']);

        return parent::resFormat(1501, null, [
            'patients' => $patients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorepatientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePatientApiRequest $request)
    {
        DB::beginTransaction();
        try {
            $request['uid'] = $this->generateUID("PAT");
            Patient::create($request->all());
            DB::commit();
            return parent::success(1502);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Create Patient Fail : {$e->getMessage()}");
            return parent::error();
        }
        return 'success';
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $patient = Patient::with(['avatar'])->where('id', $id)->first();

        if ($patient->avatar) {
            $patient['avatar_url'] = $patient->avatar->document->url;
            $patient['avatar_thumbnail'] = $patient->avatar->document->thumbnail;
            $patient['avatar_preview'] = $patient->avatar->document->preview;
        } else {
            $patient['avatar_url'] = null;
            $patient['avatar_thumbnail'] = null;
            $patient['avatar_preview'] = null;
        }

        $patient->makeHidden(['avatar', 'media', 'avavar_id']);

        return parent::resFormat(1503, null, [
            'patient' => $patient
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePatientRequest  $request
     * @param  \App\Models\patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePatientApiRequest $request, Patient $patient)
    {
        // Update information of patient, same with the doctor
        DB::beginTransaction();
        try {
            $patient->update($request->all());
            DB::commit();
            return parent::success(1504);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Update Patient Fail : {$e->getMessage()}");
            return parent::error();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function destroy(Patient $patient)
    {
        //
    }
}
