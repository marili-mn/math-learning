<?php

namespace App\Services;

use Exception;

class ProgressService
{
    /**
     * Registra la finalización de una lección y evalúa el puntaje.
     */
    public function recordCompletion(int $userId, int $lessonId, array $quizData)
    {
        // En un entorno real, aquí se guardaría en la tabla 'user_progress'
        // Validamos si el puntaje es suficiente (ej. > 70%)
        $score = $this->calculateScore($quizData);

        return [
            'user_id' => $userId,
            'lesson_id' => $lessonId,
            'score' => $score,
            'completed_at' => now(),
            'is_passed' => $score >= 70,
        ];
    }

    private function calculateScore(array $quizData)
    {
        // Lógica de validación de respuestas
        return $quizData['correct_answers'] / $quizData['total_questions'] * 100;
    }
}
