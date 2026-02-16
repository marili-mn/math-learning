<?php

declare(strict_types=1);

namespace App\Services;

/**
 * Senior-level Academic Service
 * Following @.agents/skills/laravel-specialist/references/eloquent.md
 */
class AcademicService
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function getCourses(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'Cálculo de Variaciones',
                'description' => 'Optimización de funcionales para trayectorias aeroespaciales.',
                'is_premium' => false,
                'thumbnail' => 'https://placehold.co/600x400?text=Calculo+I',
            ],
            [
                'id' => 2,
                'title' => 'Dinámica de Fluidos Avanzada',
                'description' => 'Simulación de flujos supersónicos y ecuaciones de Navier-Stokes.',
                'is_premium' => true,
                'thumbnail' => 'https://placehold.co/600x400?text=Fluidos+Premium',
            ]
        ];
    }

    /**
     * @param int $lessonId
     * @return array<string, mixed>
     */
    public function getLessonContent(int $lessonId): array
    {
        return [
            'id' => $lessonId,
            'title' => 'Análisis de Tensores en Estructuras',
            'type' => 'engineering_hybrid',
            'content' => [
                'video_url' => 'https://www.youtube.com/embed/f5fWk_vOPTY',
                'reading_material' => "Para analizar la deformación en el fuselaje, usamos el tensor de tensiones $\sigma_{ij}$. 

1. **Definición:** El tensor describe las fuerzas internas.
2. **Ecuación:** $\nabla \cdot \sigma + f = \rho \frac{\partial^2 u}{\partial t^2}$.",
                'quiz' => [
                    'question' => '¿Qué describe la divergencia del tensor de tensiones?',
                    'options' => ['Fuerzas internas', 'Velocidad angular', 'Presión atmosférica', 'Masa crítica'],
                    'correct_answer' => 0
                ]
            ],
            'context_for_ai' => 'Estudiante de ingeniería aeroespacial analizando mecánica de sólidos y tensores.'
        ];
    }
}
