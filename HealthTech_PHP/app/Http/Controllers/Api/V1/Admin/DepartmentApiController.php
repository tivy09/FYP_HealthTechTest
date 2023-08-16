<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Department;
use App\Http\Controllers\BaseController;
use App\Http\Requests\ApiRequests\StoreDepartmentApiRequest;
use App\Http\Requests\ApiRequests\UpdateDepartmentApiRequest;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class DepartmentApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departments = Department::with(['images'])->get();

        foreach ($departments as $department) {
            if ($department->images) {
                $department['images_url'] = $department->images->document->url;
                $department['images_thumbnail'] = $department->images->document->thumbnail;
                $department['images_preview'] = $department->images->document->preview;
            } else {
                $department['images_url'] = null;
                $department['images_thumbnail'] = null;
                $department['images_preview'] = null;
            }
        }

        $departments->makeHidden(['images', 'media', 'image_id']);

        return parent::resFormat(1201, null, [
            'departments' => $departments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDepartmentApiRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDepartmentApiRequest $request)
    {
        DB::beginTransaction();
        try {
            Department::create($request->validated());
            DB::commit();
            return parent::success(1202);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Create Department Fail : {$e->getMessage()}");
            return parent::error();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function show(Department $department)
    {
        $department = Department::with(['images'])->where(['id' => $department->id])->first();

        if ($department->images) {
            $department['images_url'] = $department->images->document->url;
            $department['images_thumbnail'] = $department->images->document->thumbnail;
            $department['images_preview'] = $department->images->document->preview;
        } else {
            $department['images_url'] = null;
            $department['images_thumbnail'] = null;
            $department['images_preview'] = null;
        }

        $department->makeHidden(['images', 'media', 'image_id']);

        return parent::resFormat(1203, null, [
            'departments' => $department
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDepartmentApiRequest  $request
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDepartmentApiRequest $request, Department $department)
    {
        DB::beginTransaction();
        try {
            $department->update($request->validated());
            DB::commit();
            return parent::success(1204);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Update Department Fail : {$e->getMessage()}");
            return parent::error();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function destroy(Department $department)
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
            $department = Department::where(['id' => $id])->first();

            $data = ['status' => 1];
            if ($department->status) {
                $data = ['status' => 0];
            }

            $department->update($data);
            DB::commit();

            return parent::success(1206);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Active Department Function Error(Admin/ProductCategoryApiController)", ["id" => $id, 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    public function getDepartment()
    {
        $departments = Department::where(['status' => 1])->get();
        $departments->makeHidden(['images', 'media', 'image_id', 'status']);

        return parent::resFormat(1201, null, [
            'departments' => $departments
        ]);
    }
}
