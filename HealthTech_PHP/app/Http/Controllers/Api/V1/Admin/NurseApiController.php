<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\BaseController;
use App\Models\Nurse;
use App\Http\Requests\ApiRequests\StoreNurseApiRequest;
use App\Http\Requests\ApiRequests\UpdateNurseApiRequest;
use App\Http\Requests\ApiRequests\UpdateNursePasswordApiRequests;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class NurseApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $nurses = Nurse::with(['users', 'departments', 'avatar', 'departments.images'])->get();

        foreach ($nurses as $nurse) {
            $nurse['avatar_url'] = $nurse->avatar->document->url ?? null;
            $nurse['avatar_thumbnail'] = $nurse->avatar->document->thumbnail ?? null;
            $nurse['avatar_preview'] = $nurse->avatar->document->preview ?? null;
            $nurse['departments']['image_url'] = $nurse->departments->images->document->url ?? null;
            $nurse['departments']['image_thumbnail'] = $nurse->departments->images->document->thumbnail ?? null;
            $nurse['departments']['image_preview'] = $nurse->departments->images->document->preview ?? null;

            unset($nurse['departments']['images']);
        }

        $nurses->makeHidden(['avatar', 'media', 'avavar_id']);

        return parent::resFormat(1401, null, [
            'nurses' => $nurses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreNurseApiRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreNurseApiRequest $request)
    {
        DB::beginTransaction();
        try {
            $userData = [
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'uid' => $this->generateUID("NUR"),
                'phone_number' => $request->phone_number,
                'type' => 4,
            ];
            $user = User::create($userData);

            $request['user_id'] = $user->id;

            Nurse::create($request->all());
            DB::commit();
            return parent::success(1402);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Create Nurse Fail : {$e->getMessage()}");
            return parent::error();
        }
        return 'success';
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Nurse  $nurse
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $nurse = Nurse::with(['users', 'departments', 'avatar', 'departments.images'])->where(['id' => $id])->first();

        // check if nurse is not exist
        if (!$nurse) {
            return parent::success(1408);
        }

        $nurse['avatar_url'] = $nurse->avatar->document->url ?? null;
        $nurse['avatar_thumbnail'] = $nurse->avatar->document->thumbnail ?? null;
        $nurse['avatar_preview'] = $nurse->avatar->document->preview ?? null;
        $nurse['departments']['image_url'] = $nurse->departments->images->document->url ?? null;
        $nurse['departments']['image_thumbnail'] = $nurse->departments->images->document->thumbnail ?? null;
        $nurse['departments']['image_preview'] = $nurse->departments->images->document->preview ?? null;

        unset($nurse['departments']['images']);

        $nurse->makeHidden(['avatar', 'media', 'avavar_id']);

        return parent::resFormat(1403, null, [
            'nurses' => $nurse
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateNurseApiRequest  $request
     * @param  \App\Models\Nurse  $nurse
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateNurseApiRequest $request, Nurse $nurse)
    {
        DB::beginTransaction();
        try {
            $user = User::where('id', $nurse->user_id)->first();
            $user->update([
                'email' => $request->email,
                'phone_number' => $request->phone_number,
            ]);

            $nurse->update($request->validated());
            DB::commit();
            return parent::success(1404);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Update Nurse Fail : {$e->getMessage()}");
            return parent::error();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Nurse  $nurse
     * @return \Illuminate\Http\Response
     */
    public function destroy(Nurse $nurse)
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
            $nurse = Nurse::where(['id' => $id])->first();

            $data = ['status' => 1];
            if ($nurse->status) {
                $data = ['status' => 0];
            }

            $nurse->update($data);
            DB::commit();

            return parent::success(1406);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Active Nurse Function Error(Admin/NurseApiController)", ["id" => $id, 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    /**
     * Update Nurse account password and username
     */
    public function checkNurse($email)
    {
        $nurse = User::where(['email' => $email, 'type' => 4])->first();

        if ($nurse) {
            return parent::success(1407);
        } else {
            return parent::success(1408);
        }
    }

    public function updateNursePassword(UpdateNursePasswordApiRequests $request)
    {
        // update username and password to user table using email as condition
        $user = User::where(['email' => $request->email])->first();
        if (!$user) {
            return parent::success(1408);
        }
        $user->update($request->all());
        return parent::success(1409);
    }
}
