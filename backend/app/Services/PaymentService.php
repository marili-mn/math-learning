<?php

namespace App\Services;

use App\Rules\LuhnRule;
use Illuminate\Support\Facades\Validator;
use Exception;

class PaymentService
{
    /**
     * Procesa la suscripción de un estudiante.
     * Mantiene la lógica fuera del controlador.
     */
    public function processSubscription(array $data, $user)
    {
        $this->validatePaymentData($data);

        // Aquí iría la integración con un Gateway real (Stripe/PayPal)
        // Por ahora, simulamos el éxito si el número de tarjeta pasa Luhn.
        
        try {
            $user->update([
                'is_premium' => true,
                'subscription_expires_at' => now()->addMonth(),
            ]);

            return [
                'status' => 'success',
                'message' => 'Suscripción activada correctamente.',
            ];
        } catch (Exception $e) {
            throw new Exception("Error al procesar el pago: " . $e->getMessage());
        }
    }

    private function validatePaymentData(array $data)
    {
        $validator = Validator::make($data, [
            'card_number' => ['required', new LuhnRule()],
            'exp_month' => 'required|digits:2',
            'exp_year' => 'required|digits:4',
            'cvv' => 'required|digits:3',
        ]);

        if ($validator->fails()) {
            throw new Exception("Datos de tarjeta inválidos.");
        }
    }
}
