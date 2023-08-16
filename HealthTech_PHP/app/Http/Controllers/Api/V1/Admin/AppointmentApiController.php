<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\BaseController;
use App\Models\Appointment;
use App\Http\Requests\ApiRequests\StoreAppointmentApiRequest;
use App\Http\Requests\ApiRequests\UpdateAppointmentStatusRequest;
use App\Http\Requests\ApiRequests\GetAppointmentListApiRequest;
use App\Models\Patient;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class AppointmentApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $appointments = Appointment::with(['doctors', 'doctors.avatar', 'departments', 'departments.images', 'patients', 'patients.avatar'])->get();

        foreach ($appointments as $appointment) {
            $appointment['doctors']['image_url'] = $appointment->doctors->avatar->document->url ?? null;
            $appointment['doctors']['image_thumbnail'] = $appointment->doctors->avatar->document->thumbnail ?? null;
            $appointment['doctors']['image_preview'] = $appointment->doctors->avatar->document->preview ?? null;
            unset($appointment['doctors']['avatar']);

            $appointment['departments']['image_url'] = $appointment->departments->images->document->url ?? null;
            $appointment['departments']['image_thumbnail'] = $appointment->departments->images->document->thumbnail ?? null;
            $appointment['departments']['image_preview'] = $appointment->departments->images->document->preview ?? null;
            unset($appointment['departments']['images']);

            if ($appointment->patient_id != null) {
                $appointment['patients']['image_url'] = $appointment->patients->avatar->document->url ?? null;
                $appointment['patients']['image_thumbnail'] = $appointment->patients->avatar->document->thumbnail ?? null;
                $appointment['patients']['image_preview'] = $appointment->patients->avatar->document->preview ?? null;

                unset($appointment['patients']['avatar']);
            }
        }

        return parent::resFormat(1551, null, ['appointments' => $appointments]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAppointmentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function addAppointment(StoreAppointmentApiRequest $request)
    {
        DB::beginTransaction();

        try {
            $appointment = Appointment::create($request->all());

            $patient = Patient::where('ic_number', $appointment->ic_no)->first();

            if ($patient) {
                $appointment->patient_id = $patient->id;
                $appointment->save();
                DB::commit();

                return parent::resFormat(1552, null, [
                    'user_id' => $patient->user_id,
                ]);
            } else {
                DB::commit();
                return parent::success(1558);
            }
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Create Appointment Fail : {$e->getMessage()}, Request: {" . json_encode($request->all()) . "}");
            return parent::error();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $appointment = Appointment::with(['doctors', 'doctors.avatar', 'departments', 'departments.images', 'patients', 'patients.avatar'])->where('id', $id)->first();

        if ($appointment->doctors) {
            $appointment['doctors']['image_url'] = $appointment->doctors->avatar->document->url ?? null;
            $appointment['doctors']['image_thumbnail'] = $appointment->doctors->avatar->document->thumbnail ?? null;
            $appointment['doctors']['image_preview'] = $appointment->doctors->avatar->document->preview ?? null;
            unset($appointment->doctors->avatar);
        }

        if ($appointment->departments) {
            $appointment['departments']['image_url'] = $appointment->departments->images->document->url ?? null;
            $appointment['departments']['image_thumbnail'] = $appointment->departments->images->document->thumbnail ?? null;
            $appointment['departments']['image_preview'] = $appointment->departments->images->document->preview ?? null;
            unset($appointment->departments->images);
        }

        if ($appointment->patients) {
            $appointment['patients']['image_url'] = $appointment->patients->avatar->document->url ?? null;
            $appointment['patients']['image_thumbnail'] = $appointment->patients->avatar->document->thumbnail ?? null;
            $appointment['patients']['image_preview'] = $appointment->patients->avatar->document->preview ?? null;
            unset($appointment->patients->avatar);
        }

        $appointment->makeHidden(['created_at', 'updated_at', 'deleted_at']);

        return parent::resFormat(1556, null, [
            'appointment' => $appointment
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAppointmentRequest  $request
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAppointmentStatusRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(UpdateAppointmentStatusRequest $request)
    {
        DB::beginTransaction();

        if ($request->status <= 0 || $request->status > 8) {
            return parent::success(1554);
        }

        try {
            $appointment = Appointment::find($request->id);
            $appointment->status = $request->status;
            $appointment->save();

            DB::commit();
            return parent::success(1553);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Update Appointment Status Error: {$e->getMessage()}, Request: {" . json_encode($request->all()) . "}");
            return parent::error();
        }
    }

    public function getAppointmentList(GetAppointmentListApiRequest $request)
    {
        $appointments = Appointment::where('ic_no', $request->decode_data)->get();

        return parent::resFormat(1555, null, [
            'appointments' => $appointments
        ]);
    }


    public function getAppointmentListByDoctorID($doctor_id)
    {
        $appointments = Appointment::with(['patients', 'departments'])->where('doctor_id', $doctor_id)->get();

        foreach ($appointments as $appointment) {
            $appointment['department_name'] = $appointment->departments->name;

            if ($appointment->patients) {
                $appointment['patients']['image_url'] = $appointment->patients->avatar->document->url ?? null;
                $appointment['patients']['image_thumbnail'] = $appointment->patients->avatar->document->thumbnail ?? null;
                $appointment['patients']['image_preview'] = $appointment->patients->avatar->document->preview ?? null;
                unset($appointment->patients->avatar);
            }
        }

        $appointments->makeHidden(['created_at', 'updated_at', 'deleted_at']);

        return parent::resFormat(1557, null, [
            'appointments' => $appointments
        ]);
    }

    public function getPatientByAppointment($doctor_id)
    {
        $appointments = Appointment::where('doctor_id', $doctor_id)->get('ic_no');
        $patients = Patient::with(['avatar'])->whereIn('ic_number', $appointments)->get();

        foreach ($patients as $patient) {
            if ($patient->avatar) {
                $patient['image_url'] = $patient->avatar->document->url ?? null;
                $patient['image_thumbnail'] = $patient->avatar->document->thumbnail ?? null;
                $patient['image_preview'] = $patient->avatar->document->preview ?? null;
                unset($patient->avatar);
            }
        }

        return parent::resFormat(1559, null, [
            'patients' => $patients
        ]);
    }

    public function getAppointmentByDepartmentID($departmentID)
    {
        $appointments = Appointment::with(['patients', 'doctors', 'departments'])->where('department_id', $departmentID)->get();

        foreach ($appointments as $appointment) {
            $appointment['doctor_name'] = $appointment->doctors->name;

            if ($appointment->patients) {
                $appointment['patients']['image_url'] = $appointment->patients->avatar->document->url ?? null;
                $appointment['patients']['image_thumbnail'] = $appointment->patients->avatar->document->thumbnail ?? null;
                $appointment['patients']['image_preview'] = $appointment->patients->avatar->document->preview ?? null;
                unset($appointment->patients->avatar);
            }
        }

        $appointments->makeHidden(['created_at', 'updated_at', 'deleted_at']);

        return parent::resFormat(1561, null, [
            'appointments' => $appointments
        ]);
    }

    public function getAppointmentByPatientID($patientID)
    {
        $appointments = Appointment::with(['patients', 'doctors', 'departments'])->where('patient_id', $patientID)->get();

        foreach ($appointments as $appointment) {
            $appointment['doctor_name'] = $appointment->doctors->name;

            if ($appointment->patients) {
                $appointment['patients']['image_url'] = $appointment->patients->avatar->document->url ?? null;
                $appointment['patients']['image_thumbnail'] = $appointment->patients->avatar->document->thumbnail ?? null;
                $appointment['patients']['image_preview'] = $appointment->patients->avatar->document->preview ?? null;
                unset($appointment->patients->avatar);
            }
        }

        $appointments->makeHidden(['created_at', 'updated_at', 'deleted_at']);

        return parent::resFormat(1560, null, [
            'appointments' => $appointments
        ]);
    }
}
