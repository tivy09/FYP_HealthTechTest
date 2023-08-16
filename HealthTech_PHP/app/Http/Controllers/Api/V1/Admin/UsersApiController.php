<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\ApiRequests\UpdateUserInforRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\Doctor;
use App\Models\Nurse;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;
// use Illuminate\Contracts\Auth\Access\Gate;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
// use Illuminate\Auth\Access\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Exception;

class UsersApiController extends BaseController
{
    /**
     * @title Get All Users
     * @description Authentication Token
     * @author 开发者
     * @url /api/admin/users
     * @method GET
     *
     * @return Data:users
     */
    public function index()
    {
        // abort_if(Gate::denies('user_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new UserResource(User::with(['roles'])->get());
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->all());
        $user->roles()->sync($request->input('roles', []));

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(User $user)
    {
        abort_if(Gate::denies('user_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new UserResource($user->load(['roles']));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->all());
        $user->roles()->sync($request->input('roles', []));

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function destroy(User $user)
    {
        abort_if(Gate::denies('user_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $user->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @title Get All Users
     * @description Authentication Token
     * @url /api/admin/users/get-all-users
     * @method GET
     *
     * @return Data:users
     */
    public function getAllUsers()
    {
        $users = User::where('id', '!=', 1)->get();
        $users->makeHidden([
            'roles', 'permissions', 'remember_token', 'created_at', 'updated_at',
            'deleted_at', 'email_verified_at', 'avatar', 'avatar_id', 'media', 'media_id'
        ]);
        return parent::resFormat(707, null, [
            'users' => $users
        ]);
    }

    /**
     * @title Get User By Auth Id
     * @description Authentication Token
     * @url /api/admin/users/get-user-by-auth-id
     * @method GET
     *
     * @return Data:users
     */
    public function getUserByAuthId()
    {
        $user = User::find(Auth::id());
        // $user->makeHidden([
        //     'roles', 'permissions', 'remember_token', 'created_at', 'updated_at',
        //     'deleted_at', 'email_verified_at', 'avatar', 'avatar_id', 'media', 'media_id'
        // ]);

        if ($user->type == 3) {
            $doctor = Doctor::with(['avatar'])->where('user_id', $user->id)->first();
            $user['first_name'] = $doctor->first_name;
            $user['last_name'] = $doctor->last_name;

            $user['avatar_url'] = $doctor->avatar->document->url ?? null;
            $user['avatar_thumbnail'] = $doctor->avatar->document->thumbnail ?? null;
            $user['avatar_preview'] = $doctor->avatar->document->preview ?? null;
        } else if ($user->type == 4) {
            $nurse = Nurse::with(['avatar'])->where('user_id', $user->id)->first();
            $user['first_name'] = $nurse->first_name;
            $user['last_name'] = $nurse->last_name;

            $user['avatar_url'] = $nurse->avatar->document->url ?? null;
            $user['avatar_thumbnail'] = $nurse->avatar->document->thumbnail ?? null;
            $user['avatar_preview'] = $nurse->avatar->document->preview ?? null;
        } else if ($user->type == 5) {
            $patient = Patient::with(['avatar'])->where('user_id', $user->id)->first();
            $user['first_name'] = $patient->first_name;
            $user['last_name'] = $patient->last_name;

            $user['avatar_url'] = $patient->avatar->document->url ?? null;
            $user['avatar_thumbnail'] = $patient->avatar->document->thumbnail ?? null;
            $user['avatar_preview'] = $patient->avatar->document->preview ?? null;
        }

        return parent::resFormat(702, null, [
            'user' => $user
        ]);
    }

    /**
     * @title Update User Info
     * @description Authentication Token
     * @url /api/admin/users/update-user-info
     * @method POST
     *
     * @param UpdateUserInforRequest $request
     * @return Data:users
     */
    public function udpateUserInfo(UpdateUserInforRequest $request)
    {
        DB::beginTransaction();

        try {
            $user = User::where('id', Auth::id())->first();

            if ($user->type == 3) {
                $doctor = Doctor::where('user_id', $user->id)->first();
                $doctor->first_name = $request->first_name;
                $doctor->last_name = $request->last_name;
                $doctor->avatar_id = $request->avatar_id;
                $doctor->save();
            } else if ($user->type == 4) {
                $nurse = Nurse::where('user_id', $user->id)->first();
                $nurse->first_name = $request->first_name;
                $nurse->last_name = $request->last_name;
                $nurse->avatar_id = $request->avatar_id;
                $nurse->save();
            } else if ($user->type == 5) {
                $patient = Patient::where('user_id', $user->id)->first();
                $patient->first_name = $request->first_name;
                $patient->last_name = $request->last_name;
                $patient->avatar_id = $request->avatar_id;
                $patient->save();
            }

            $user->name = $request->first_name . ' ' . $request->last_name;
            $user->update($request->validated());
            $user->save();

            DB::commit();
            return parent::success(704);
        } catch (\Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Update User Information Error: {$e->getMessage()}, Request: {" . json_encode($request->all()) . "}");
            return parent::error();
        }
    }

    /**
     * @title Check Old Password
     * @description Authentication Token
     * @url /api/admin/users/check-old-password
     * @method POST
     *
     * @param Request $request
     * @return Data:users
     */
    public function checkOldPassword(Request $request)
    {
        $user = User::where('id', Auth::id())->first()->makeVisible('password');

        if (Hash::check($request->old_password, $user->password)) {
            return parent::success(708);
        } else {
            return parent::success(706);
        }
    }

    /**
     * @title Update User Password
     * @description Authentication Token
     * @url /api/admin/users/update-user-password
     * @method POST
     *
     * @return Data:users
     */
    public function updateUserPassword()
    {
        DB::beginTransaction();
        try {
            $user = User::where('id', Auth::id())->first();
            $user->update([
                'password' => bcrypt(request()->password)
            ]);

            DB::commit();
            return parent::success(705);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Update New Password: {$e->getMessage()}");
            return parent::error();
        }
    }
}
