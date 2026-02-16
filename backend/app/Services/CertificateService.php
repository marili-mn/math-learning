<?php

namespace App\Services;

class CertificateService
{
    /**
     * Genera un hash único para un certificado basado en el usuario y el curso.
     * Esto permite la validación externa (Auditoría).
     */
    public function generateCertificateHash(int $userId, int $courseId)
    {
        $salt = config('app.key');
        return hash('sha256', "user_{$userId}_course_{$courseId}_{$salt}");
    }

    public function verifyCertificate(string $hash)
    {
        // Lógica para buscar el hash en la DB y retornar el certificado legítimo.
        return true; 
    }
}
