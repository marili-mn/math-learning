<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Rules\LuhnRule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Procesa el enrolamiento del estudiante tras validar el pago.
     * 
     * Buenas prácticas aplicadas:
     * - Validación desacoplada en Custom Rule.
     * - Tipado estricto.
     * - Manejo de logs para auditoría (crucial en pagos).
     */
    public function processEnrollment(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'card_number' => ['required', 'string', new LuhnRule()],
            'student_id'  => ['required', 'integer', 'exists:users,id'],
            'amount'      => ['required', 'numeric', 'min:1'],
        ]);

        try {
            // Aquí iría la llamada a una pasarela real (Stripe/Conekta)
            // Por ahora simulamos el éxito del negocio.
            
            Log::info("Pago validado para el estudiante ID: {$validated['student_id']}");

            return response()->json([
                'status' => 'success',
                'message' => 'Enrolamiento completado exitosamente.',
                'data' => [
                    'transaction_id' => bin2hex(random_bytes(8)),
                    'enrolled_at' => now()->toDateTimeString(),
                ]
            ], 201);

        } catch (\Exception $e) {
            Log::error("Error en proceso de pago: " . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo procesar el enrolamiento.'
            ], 500);
        }
    }
}
