<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\BaseController;
use App\Models\MedicineCategory;
use App\Http\Requests\ApiRequests\StoreMedicineCategoryApiRequest;
use App\Http\Requests\ApiRequests\UpdateMedicineCategoryApiRequest;
use App\Models\Medicine;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class MedicineCategoryApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medicine_categories = MedicineCategory::get();

        foreach ($medicine_categories as $medCat) {
            $medCat->status = MedicineCategory::STATUS_SELECT[$medCat->status];
            $medCat->name = $medCat->name;
            // $medCat->images_url = $medCat->images->document->url;
        }

        // $medicine_categories->makeHidden(['media', 'images', 'product_category', 'id']);

        return parent::resFormat(1101, null, [
            'medicine_categories' => $medicine_categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMedicineCategoryApiRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMedicineCategoryApiRequest $request)
    {
        try {
            DB::beginTransaction();
            MedicineCategory::create($request->all());
            DB::commit();
            return parent::success(1102);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Store Medicine Category Function Error(Admin/MedicineCategoryApiController)", ["request" => $request->validated(), 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MedicineCategory  $medicineCategory
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $medicineCategory = MedicineCategory::where(['id' => $id])->first();
        return parent::resFormat(1103, null, $medicineCategory);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMedicineCategoryApiRequest  $request
     * @param  \App\Models\MedicineCategory  $medicineCategory
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMedicineCategoryApiRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $medicineCategory = MedicineCategory::where('id', $id)->first();
            $medicineCategory->update($request->all());
            DB::commit();
            return parent::success(1104);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Update Medicine Category Function Error(Admin/MedicineCategoryApiController)", ["request" => $request->validated(), 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MedicineCategory  $medicineCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(MedicineCategory $medicineCategory)
    {
        DB::beginTransaction();
        try {
            $medicine = Medicine::where(['medicine_category_id' => $medicineCategory->id])->first();

            if ($medicine) {
                return parent::success(1108);
            }

            MedicineCategory::where(['id' => $medicineCategory->id])->delete();
            DB::commit();
            return parent::success(1105);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Delete Medicine Category Function Error(Admin/ProductCategoryApiController)", ["request" => $medicineCategory->id->validated(), 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    public function active($id)
    {
        DB::beginTransaction();
        try {
            $medicine_category = MedicineCategory::where(['id' => $id])->first();
            //get() -> []
            //first() -> {}
            $data = ['status' => 1];
            if ($medicine_category->status) { //  0 = false, 1 = true
                $data = ['status' => 0];
            }
            $medicine_category->update($data);
            DB::commit();
            return parent::success(1106);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("ActiveProductCategory Function Error(Admin/ProductCategoryApiController)", ["id" => $id, 'error' => $e->getMessage()]);
            return parent::error();
        }
    }
}
