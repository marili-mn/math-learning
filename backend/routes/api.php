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

    // Certificación (Nuevo)
    Route::post('/certificate/claim', function() {
        return response()->json([
            'status' => 'issued',
            'certificate_id' => 'MATH-' . strtoupper(uniqid()),
            'issued_at' => now()->toIso8601String(),
            'student' => 'Nahuel Marcilli'
        ]);
    });

    // Rutas de Negocio / Pagos
    Route::post('/subscribe', [PaymentController::class, 'subscribe']);

});
