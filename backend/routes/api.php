<?php

use App\Http\Controllers\AuthController;

use App\Http\Controllers\ArtisanController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public routes
Route::get('/artisans', [ArtisanController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Artisan Routes
    Route::get('/artisan/profile', [ArtisanController::class, 'getProfile']);
    Route::post('/artisan/profile', [ArtisanController::class, 'updateProfile']);
    Route::post('/artisan/services', [ArtisanController::class, 'addService']);
});

Route::get('/test', function () {
    return response()->json(['message' => 'Connected to Artisan Platform Backend']);
});
