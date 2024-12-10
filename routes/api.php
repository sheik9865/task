<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrainingScheduleController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);
// Route::middleware('auth:sanctum')->
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function () {
    // Course CRUD Routes
    Route::prefix('courses')->group(function () {
        Route::get('/', [CourseController::class, 'index']);
        Route::post('/', [CourseController::class, 'store']);
        Route::get('/{id}', [CourseController::class, 'show']);
        Route::put('/{id}', [CourseController::class, 'update']);
        Route::delete('/{id}', [CourseController::class, 'destroy']);
    });

    // Student CRUD Routes
    Route::prefix('students')->group(function () {
        Route::get('/', [StudentController::class, 'index']);
        Route::post('/', [StudentController::class, 'store']);
        Route::get('/{id}', [StudentController::class, 'show']);
        Route::put('/{id}', [StudentController::class, 'update']);
        Route::delete('/{id}', [StudentController::class, 'destroy']);
    });

    // Training Schedules
    Route::prefix('schedules')->group(function () {
        // Route::get('/', [TrainingScheduleController::class, 'getSchedules']);
        // Route::post('/', [TrainingScheduleController::class, 'createSchedule']);
        Route::get('/', [TrainingScheduleController::class, 'index']);
        Route::post('/', [TrainingScheduleController::class, 'store']);
        Route::get('/{id}', [TrainingScheduleController::class, 'show']);
        Route::put('/{id}', [TrainingScheduleController::class, 'update']);
        Route::delete('/{id}', [TrainingScheduleController::class, 'destroy']);
    });

    // Opt-In / Opt-Out
    Route::post('/opt-in', [EnrollmentController::class, 'optIn']);
    Route::post('/opt-out', [EnrollmentController::class, 'optOut']);
});

