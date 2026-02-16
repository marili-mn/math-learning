<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\AcademicController;
use App\Http\Controllers\Api\v1\PaymentController;

Route::prefix('v1')->group(function () {
    
    // Rutas Académicas
    Route::get('/courses', [AcademicController::class, 'index']);
    Route::get('/lessons/{id}', [AcademicController::class, 'show']);
    Route::post('/lessons/{id}/complete', [AcademicController::class, 'storeProgress']);

    // Rutas de Negocio / Pagos
    // El PaymentController también delegará en el PaymentService que creamos
    Route::post('/subscribe', [PaymentController::class, 'subscribe']);

});
