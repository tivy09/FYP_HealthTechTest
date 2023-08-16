<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Doctor;
use App\Http\Requests\ApiRequests\StoreDoctorApiRequest;
use App\Http\Requests\ApiRequests\UpdateDoctorApiRequest;
use App\Http\Requests\ApiRequests\UpdateDoctorPasswordApiRequests;
use App\Http\Controllers\BaseController;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class DoctorApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $doctors = Doctor::with(['users', 'departments', 'avatar', 'departments.images'])->get();

        foreach ($doctors as $doctor) {
            $doctor['avatar_url'] = $doctor->avatar->document->url ?? null;
            $doctor['avatar_thumbnail'] = $doctor->avatar->document->thumbnail ?? null;
            $doctor['avatar_preview'] = $doctor->avatar->document->preview ?? null;
            $doctor['departments']['image_url'] = $doctor->departments->images->document->url ?? null;
            $doctor['departments']['image_thumbnail'] = $doctor->departments->images->document->thumbnail ?? null;
            $doctor['departments']['image_preview'] = $doctor->departments->images->document->preview ?? null;

            unset($doctor['departments']['images']);
        }

        $doctors->makeHidden(['avatar', 'media', 'avavar_id']);

        return parent::resFormat(1301, null, [
            'doctors' => $doctors
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDoctorApiRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDoctorApiRequest $request)
    {
        DB::beginTransaction();
        try {
            $userData = [
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'uid' => $this->generateUID("DOC"),
                'phone_number' => $request->phone_number,
                'type' => 3,
            ];
            $user = User::create($userData);

            $request['user_id'] = $user->id;

            Doctor::create($request->all());
            DB::commit();
            return parent::success(1302);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Create Doctor Fail : {$e->getMessage()}");
            return parent::error();
        }
        return 'success';
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Doctor  $doctor
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $doctor = Doctor::with(['users', 'departments', 'avatar', 'departments.images'])->where(['id' => $id])->first();

        if (!$doctor) {
            return parent::success(1408);
        }

        $doctor['avatar_url'] = $doctor->avatar->document->url ?? null;
        $doctor['avatar_thumbnail'] = $doctor->avatar->document->thumbnail ?? null;
        $doctor['avatar_preview'] = $doctor->avatar->document->preview ?? null;
        $doctor['departments']['image_url'] = $doctor->departments->images->document->url ?? null;
        $doctor['departments']['image_thumbnail'] = $doctor->departments->images->document->thumbnail ?? null;
        $doctor['departments']['image_preview'] = $doctor->departments->images->document->preview ?? null;

        unset($doctor['departments']['images']);

        $doctor->makeHidden(['avatar', 'media', 'avavar_id']);

        return parent::resFormat(1303, null, [
            'doctors' => $doctor
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDoctorRequest  $request
     * @param  \App\Models\Doctor  $doctor
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDoctorApiRequest $request, Doctor $doctor)
    {
        DB::beginTransaction();
        try {
            $user = User::where('id', $doctor->user_id)->first();
            $user->update([
                'email' => $request->email,
                'phone_number' => $request->phone_number,
            ]);

            $doctor->update($request->validated());
            DB::commit();
            return parent::success(1304);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Update Doctor Fail : {$e->getMessage()}");
            return parent::error();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Doctor  $doctor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Doctor $doctor)
    {
        //
    }

    /**
     * Active the specified resource from storage.
     */
    public function active($id)
    {
        DB::beginTransaction();
        try {
            $doctor = Doctor::where(['id' => $id])->first();

            $data = ['status' => 1];
            if ($doctor->status) {
                $data = ['status' => 0];
            }

            $doctor->update($data);
            DB::commit();

            return parent::success(1306);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Active Doctor Function Error(Admin/DoctorApiController)", ["id" => $id, 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    /**
     * Update Doctor account password and username
     */
    public function checkDoctor($email)
    {
        $doctor = User::where(['email' => $email, 'type' => 3])->first();

        if ($doctor) {
            return parent::success(1307);
        } else {
            return parent::success(1308);
        }
    }

    public function updateDoctorPassword(UpdateDoctorPasswordApiRequests $request)
    {
        // update username and password to user table using email as condition
        $user = User::where(['email' => $request->email])->first();
        if (!$user) {
            return parent::success(1308);
        }
        $user->update($request->all());
        return parent::success(1309);
    }

    public function getDoctorFromDepartmentID($departmentID)
    {
        $doctors = Doctor::with(['avatar'])->where(['department_id' => $departmentID, 'status' => 1])->get();

        foreach ($doctors as $doctor) {
            if ($doctor->avatar) {
                $doctor['avatar_url'] = $doctor->avatar->document->url;
                $doctor['avatar_thumbnail'] = $doctor->avatar->document->thumbnail;
                $doctor['avatar_preview'] = $doctor->avatar->document->preview;
            } else {
                $doctor['avatar_url'] = null;
                $doctor['avatar_thumbnail'] = null;
                $doctor['avatar_preview'] = null;
            }
        }

        $doctors->makeHidden([
            'avatar', 'media', 'avavar_id', 'ic_number',
            'user_id', 'department_id', 'marital_status', 'address',
            'gender', 'emergency_contact_name', 'emergency_contact_phone_number',
            'occupation', 'home_phone_number', 'status'
        ]);

        return parent::resFormat(1301, null, [
            'doctors' => $doctors
        ]);
    }
}
