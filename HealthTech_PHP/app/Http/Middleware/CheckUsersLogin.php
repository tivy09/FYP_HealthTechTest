<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUsersLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (empty($request->type)) {
            return response()->json(array(
                'status'   => 422,
                'message'  => 'The given data was invalid.',
                'response' => [
                    'msg' => 'The type field is required.'
                ]
            ));
        }

        if ($request->path() == 'api/login/doctors' && $request->type != 3) {
            return response()->json(array(
                'status'   => 425,
                'message'  => 'Wrong API Access',
                'response' => [
                    'msg' => 'This is the Doctors Login API'
                ]
            ));
        }

        if ($request->path() == 'api/login/nurses' && $request->type != 4) {
            return response()->json(array(
                'status'   => 425,
                'message'  => 'Wrong API Access',
                'response' => [
                    'msg' => 'This is the Nurses Login API'
                ]
            ));
        }

        if ($request->path() == 'api/login/patients' && $request->type != 5) {
            return response()->json(array(
                'status'   => 425,
                'message'  => 'Wrong API Access',
                'response' => [
                    'msg' => 'This is the Patients Login API'
                ]
            ));
        }

        return $next($request);
    }
}
