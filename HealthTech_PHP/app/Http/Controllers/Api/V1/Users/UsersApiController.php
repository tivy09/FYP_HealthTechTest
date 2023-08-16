<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Http\Controllers\BaseController;
use App\Http\Requests\ApiRequests\UserRegisterRequest;
use App\Http\Requests\ApiRequests\UserLoginRequest;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Nurse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Exception;

class UsersApiController extends BaseController
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

    public function register(UserRegisterRequest $request)
    {
        DB::beginTransaction();
        try {
            $request['uid'] = $this->generateUID('users');
            $request['is_active'] = 1;
            $request['name'] = $request['first_name'] . ' ' . $request['last_name'];
            $user = User::create($request->all());
            $user->roles()->sync(2);
            $request['user_id'] = $user->id;

            if ($user->type == 3) {
                Doctor::create($request->all());
            } else if ($user->type == 4) {
                Nurse::create($request->all());
            } else if ($user->type == 5) {
                Patient::create($request->all());
            } else {
                return parent::resFormat(704);
            }

            DB::commit();
            return parent::success(700);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("UserRegister 出错", ["request" => $request->validated(), 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    public function login(UserLoginRequest $request)
    {
        try {
            $user = User::where('username', $request['input'])->orWhere('email', $request['input'])->first();

            if (empty($user)) {
                return parent::resFormat(701);
            }

            $loginData = [];
            $loginData['email'] = $user->email;
            $loginData['password'] = $request->password;

            if (!auth()->attempt($loginData)) {
                return parent::resFormat(703);
            }

            if ($user->type == 3) {
                $doctor = Doctor::with(['avatar'])->where('user_id', $user->id)->first();
                $user['first_name'] = $doctor->first_name;
                $user['last_name'] = $doctor->last_name;

                $user['avatar_url'] = $doctor->avatar->document->url ?? null;
                $user['avatar_thumbnail'] = $doctor->avatar->document->thumbnail ?? null;
                $user['avatar_preview'] = $doctor->avatar->document->preview ?? null;
            } else if ($user->type == 4) {
                $nurse = Nurse::with(['avatar', 'departments'])->where('user_id', $user->id)->first();
                $user['first_name'] = $nurse->first_name;
                $user['last_name'] = $nurse->last_name;
                $user['department_id'] = $nurse->departments->id;

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

            $accessToken = auth()->user()->createToken('authToken')->accessToken;

            return parent::resFormat(702, null, [
                'user' => $user,
                'token' => $accessToken
            ]);
        } catch (Exception $e) {
            Log::channel("api")->error("UserLogin 出错", ["request" => $request->validated(), 'error' => $e->getMessage()]);
            return parent::error();
        }
    }

    public function login_doctor(UserLoginRequest $request)
    {
        return $request->all();
    }

    public function login_nurse(UserLoginRequest $request)
    {
        return $request->all();
    }

    public function login_patient(UserLoginRequest $request)
    {
        return $request->all();
    }
}
