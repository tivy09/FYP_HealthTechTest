<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);

Route::redirect('/', '/login');
Route::get('/home', function () {
    if (session('status')) {
        return redirect()->route('admin.home')->with('status', session('status'));
    }

    return redirect()->route('admin.home');
});

Auth::routes(['register' => false]);

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'namespace' => 'Admin', 'middleware' => ['auth', '2fa']], function () {
    Route::get('/', 'HomeController@index')->name('home');
    // Permissions
    Route::resource('permissions', 'PermissionsController', ['except' => ['create', 'store', 'edit', 'update', 'destroy']]);

    // Roles
    Route::resource('roles', 'RolesController', ['except' => ['destroy']]);

    // Users
    Route::delete('users/destroy', 'UsersController@massDestroy')->name('users.massDestroy');
    Route::post('users/active', 'UsersController@active')->name('users.active');
    Route::post('users/inactive', 'UsersController@inactive')->name('users.inactive');
    Route::resource('users', 'UsersController');

    // Audit Logs
    Route::resource('audit-logs', 'AuditLogsController', ['except' => ['create', 'store', 'edit', 'update', 'destroy']]);

    // User Login Log
    Route::delete('user-login-logs/destroy', 'UserLoginLogController@massDestroy')->name('user-login-logs.massDestroy');
    Route::resource('user-login-logs', 'UserLoginLogController');

    // Global Settings
    Route::delete('global-settings/destroy', 'GlobalSettingsController@massDestroy')->name('global-settings.massDestroy');
    Route::post('global-settings/custom_edit', 'GlobalSettingsController@custom_edit')->name('global-settings.custom_edit');
    Route::resource('global-settings', 'GlobalSettingsController');

    // Language
    Route::delete('languages/destroy', 'LanguageController@massDestroy')->name('languages.massDestroy');
    Route::resource('languages', 'LanguageController');

    // Countries
    Route::delete('countries/destroy', 'CountriesController@massDestroy')->name('countries.massDestroy');
    Route::post('countries/media', 'CountriesController@storeMedia')->name('countries.storeMedia');
    Route::post('countries/ckmedia', 'CountriesController@storeCKEditorImages')->name('countries.storeCKEditorImages');
    Route::post('countries/active', 'CountriesController@active')->name('countries.active');
    Route::post('countries/inactive', 'CountriesController@inactive')->name('countries.inactive');
    Route::resource('countries', 'CountriesController');

    // Image
    Route::delete('images/destroy', 'ImageController@massDestroy')->name('images.massDestroy');
    Route::post('images/media', 'ImageController@storeMedia')->name('images.storeMedia');
    Route::post('images/ckmedia', 'ImageController@storeCKEditorImages')->name('images.storeCKEditorImages');
    Route::resource('images', 'ImageController');

    // Laravel Passport
    Route::delete('laravel-passports/destroy', 'LaravelPassportController@massDestroy')->name('laravel-passports.massDestroy');
    Route::resource('laravel-passports', 'LaravelPassportController');

    // Notice Board
    Route::delete('notice-boards/destroy', 'NoticeBoardController@massDestroy')->name('notice-boards.massDestroy');
    Route::post('notice-boards/media', 'NoticeBoardController@storeMedia')->name('notice-boards.storeMedia');
    Route::post('notice-boards/ckmedia', 'NoticeBoardController@storeCKEditorImages')->name('notice-boards.storeCKEditorImages');
    Route::resource('notice-boards', 'NoticeBoardController');

    // Product Category
    Route::resource('product-category', 'ProductCategoryController');
    Route::post('product-category/destroy', 'ProductCategoryController@massDestroy')->name('product-category.massDestroy');
    Route::post('product-category/active', 'ProductCategoryController@active')->name('product-category.active');
    Route::post('product-category/inactive', 'ProductCategoryController@inactive')->name('product-category.inactive');

    // Product
    Route::resource('product', 'ProductController');
    Route::post('product/destroy', 'ProductController@massDestroy')->name('product.massDestroy');
    Route::post('product/multi_update_is_active', 'ProductController@multi_update_is_active')->name('product.multi_update_is_active');
    Route::post('product/media', 'ProductController@storeMedia')->name('product.storeMedia');
    Route::post('product/ckmedia', 'ProductController@storeCKEditorImages')->name('product.storeCKEditorImages');

    // Department
    Route::resource('departments', 'DepartmentController');
    Route::delete('departments/destroy', 'DepartmentController@massDestroy')->name('departments.massDestroy');
    Route::post('departments/active', 'DepartmentController@active')->name('departments.active');
    Route::post('departments/inactive', 'DepartmentController@inactive')->name('departments.inactive');

    // Doctor
    Route::resource('doctors', 'DoctorController');
    Route::resource('nurses', 'NursesController');
    Route::resource('patients', 'PatientsController');

    // medicine
    Route::resource('medicines', 'medicineController');
    Route::resource('medicine_categories', 'medicineCategoryController');
});
Route::group(['prefix' => 'profile', 'as' => 'profile.', 'namespace' => 'Auth', 'middleware' => ['auth', '2fa']], function () {
    // Change password
    if (file_exists(app_path('Http/Controllers/Auth/ChangePasswordController.php'))) {
        Route::get('password', 'ChangePasswordController@edit')->name('password.edit');
        Route::post('password', 'ChangePasswordController@update')->name('password.update');
        Route::post('profile', 'ChangePasswordController@updateProfile')->name('password.updateProfile');
        Route::post('profile/destroy', 'ChangePasswordController@destroy')->name('password.destroyProfile');
        Route::post('profile/two-factor', 'ChangePasswordController@toggleTwoFactor')->name('password.toggleTwoFactor');
    }
});
Route::group(['namespace' => 'Auth', 'middleware' => ['auth', '2fa']], function () {
    // Two Factor Authentication
    if (file_exists(app_path('Http/Controllers/Auth/TwoFactorController.php'))) {
        Route::get('two-factor', 'TwoFactorController@show')->name('twoFactor.show');
        Route::post('two-factor', 'TwoFactorController@check')->name('twoFactor.check');
        Route::get('two-factor/resend', 'TwoFactorController@resend')->name('twoFactor.resend');
    }
});
