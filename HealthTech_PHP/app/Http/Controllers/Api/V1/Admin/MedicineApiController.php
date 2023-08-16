<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\BaseController;
use App\Models\Medicine;
use App\Http\Requests\ApiRequests\StoreMedicineApiRequest;
use App\Http\Requests\ApiRequests\UpdateMedicineApiRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class MedicineApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medicines = Medicine::with(['medicine_category'])->get();

        return parent::resFormat(1051, null, [
            'medicines' => $medicines
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMedicineRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMedicineApiRequest $request)
    {
        DB::beginTransaction();

        try {
            $request['uid'] = $this->generateUid('MEDICINE');
            Medicine::create($request->all());
            DB::commit();
            return parent::resFormat(1052);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Store Medicine Function Error(Admin/MedicineApiController)", ["request" => $request->validated(), 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Medicine  $medicine
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $medicine = Medicine::with(['medicine_category'])->where('id', $id)->first();

        return parent::resFormat(1053, null, [
            'medicine' => $medicine
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMedicineRequest  $request
     * @param  \App\Models\Medicine  $medicine
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMedicineApiRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $medicine = Medicine::where('id', $id)->first();
            $medicine->update($request->all());
            DB::commit();
            return parent::resFormat(1054);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Update Medicine Function Error(Admin/MedicineApiController)", ["request" => $request->validated(), 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Medicine  $medicine
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // delete function
        DB::beginTransaction();
        try {
            $medicine = Medicine::where('id', $id)->first();
            $medicine->delete();
            DB::commit();
            return parent::resFormat(1055);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Delete Medicine Function Error(Admin/MedicineApiController)", ['error' => $e->getMessage()]);
            return parent::error();
        }
    }

    public function active($id)
    {
        DB::beginTransaction();
        try {
            $medicine = Medicine::where(['id' => $id])->first();
            //get() -> []
            //first() -> {}
            $data = ['status' => 1];
            if ($medicine->status) { //  0 = false, 1 = true
                $data = ['status' => 0];
            }
            $medicine->update($data);
            DB::commit();
            return parent::success(1056);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Active Medicine Function Error(Admin/MedicineApiController)", ["id" => $id, 'error' => $e->getMessage()]);
            return parent::error();
        }
    }
}
