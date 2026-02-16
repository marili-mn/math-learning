<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __construct(
        protected PaymentService $paymentService
    ) {}

    public function subscribe(Request $request)
    {
        try {
            // El controlador solo delega y captura excepciones.
            $result = $this->paymentService->processSubscription(
                $request->all(),
                auth()->user() ?? \App\Models\User::first() // Mock user para la prueba
            );

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 422);
        }
    }
}
