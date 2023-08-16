<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'system', 'as' => 'api.admin.'], function () {
    Route::group(['namespace' => 'Api\V1\Admin', 'middleware' => ['auth:api']], function () {
        Route::POST('image-store', 'ImageApiController@StoreImage');
    });
});

Route::group(['prefix' => 'admin', 'as' => 'api.admin.', 'namespace' => 'Api\V1\Admin'], function () {
    Route::POST('addAppointment', 'AppointmentApiController@addAppointment');
    Route::GET('getDepartmentList', 'DepartmentApiController@getDepartment');
    Route::GET('getDoctorsList/{departmentID}', 'DoctorApiController@getDoctorFromDepartmentID');

    Route::group(['middleware' => ['auth:api']], function () {
        Route::GET('/user', function (Request $request) {
            return $request->user();
        });

        // Permissions
        Route::apiResource('permissions', 'PermissionsApiController', ['except' => ['store', 'update', 'destroy']]);

        // Roles
        Route::apiResource('roles', 'RolesApiController', ['except' => ['destroy']]);

        // Users
        Route::apiResource('users', 'UsersApiController');
        Route::get('get-all-users', 'UsersApiController@getAllUsers');
        Route::get('get-userInfo', 'UsersApiController@getUserByAuthId');
        Route::post('update-userInfo', 'UsersApiController@udpateUserInfo');
        Route::post('check-oldPassword', 'UsersApiController@checkOldPassword');
        Route::post('update-password', 'UsersApiController@updateUserPassword');

        // User Login Log
        Route::apiResource('user-login-logs', 'UserLoginLogApiController');

        // Language
        Route::apiResource('languages', 'LanguageApiController');

        // Image
        Route::POST('images/media', 'ImageApiController@storeMedia')->name('images.storeMedia');
        Route::POST('images/user-ic-receipt', 'ImageApiController@store_user_ic_request');
        Route::POST('images/user-avater-receipt', 'ImageApiController@store_user_avater_request');
        Route::apiResource('images', 'ImageApiController');

        // Notice Board
        Route::POST('notice-boards/media', 'NoticeBoardApiController@storeMedia')->name('notice-boards.storeMedia');
        Route::apiResource('noticeBoards', 'NoticeBoardApiController');
        Route::POST('active-noticeBoards/{id}', 'NoticeBoardApiController@active');

        // Countries
        Route::apiResource('countries', 'CountriesApiController');

        // Medicine
        Route::apiResource('medicines', 'MedicineApiController');
        Route::POST('active-medicine/{id}', 'MedicineApiController@active');

        // Medicine Category
        Route::apiResource('medicineCategories', 'MedicineCategoryApiController');
        Route::POST('active-medicine-category/{id}', 'MedicineCategoryApiController@active');

        // Department
        Route::apiResource('departments', 'DepartmentApiController');
        Route::POST('active-department/{id}', 'DepartmentApiController@active');

        // Doctor
        Route::apiResource('doctors', 'DoctorApiController');
        Route::POST('active-doctor/{id}', 'DoctorApiController@active');
        Route::GET('check-doctor/{email}', 'DoctorApiController@checkDoctor');
        Route::POST('update-doctor-password', 'DoctorApiController@updateDoctorPassword');

        // Nurse
        Route::apiResource('nurses', 'NurseApiController');
        Route::POST('active-nurse/{id}', 'NurseApiController@active');
        Route::GET('check-nurse/{email}', 'NurseApiController@checkNurse');
        Route::POST('update-nurse-password', 'NurseApiController@updateNursePassword');

        // Patient
        Route::apiResource('patients', 'PatientApiController');

        // Appointment
        Route::apiResource('appointments', 'AppointmentApiController');
        Route::POST('update-status', 'AppointmentApiController@updateStatus');
        Route::POST('get-AppointmentList', 'AppointmentApiController@getAppointmentList');
        Route::GET('get-AppointmentListByDoctorID/{doctorID}', 'AppointmentApiController@getAppointmentListByDoctorID');
        Route::GET('get-AppointmentListResponsePatient/{doctorID}', 'AppointmentApiController@getPatientByAppointment');
        Route::GET('get-AppointmentListByDepartment/{departmentID}', 'AppointmentApiController@getAppointmentByDepartmentID');
        Route::GET('get-AppointmentListByPatientID/{patientID}', 'AppointmentApiController@getAppointmentByPatientID');

        // Timetable
        Route::apiResource('timetables', 'TimetableApiController');

        // Medical Report
        Route::apiResource('medical-reports', 'MedicalReportApiController');
        Route::GET('get-medicalReportsByPatientID/{patientID}', 'MedicalReportApiController@getMedicalReportByPatientID');
    });
});

Route::group(['prefix' => 'login', 'as' => 'api.admin.', 'namespace' => 'Api\V1\Users'], function () {
    Route::POST('doctors', 'UsersApiController@login_doctor')->middleware(['users.checkLogin']);
    Route::POST('nurses', 'UsersApiController@login_nurse')->middleware(['users.checkLogin']);
    Route::POST('patients', 'UsersApiController@login_patient')->middleware(['users.checkLogin']);
});

Route::group(['prefix' => 'users', 'as' => 'api.users.', 'namespace' => 'Api\V1\Users'], function () {

    // Client Register and Login
    Route::POST('user-register', 'UsersApiController@register');
    Route::POST('user-login', 'UsersApiController@login');

    Route::group(['middleware' => ['auth:api', 'scope:view-user']], function () {
        Route::GET('/user', function (Request $request) {
            return $request->user();
        });
    });
});
