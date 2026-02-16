<?php

namespace App\Services;

class AcademicService
{
    /**
     * Retorna el catálogo de cursos disponibles (Mocks).
     */
    public function getCourses()
    {
        return [
            [
                'id' => 1,
                'title' => 'Introducción a las Ecuaciones',
                'description' => 'Aprende las bases de las ecuaciones de primer grado.',
                'is_premium' => false,
                'thumbnail' => 'https://placehold.co/600x400?text=Ecuaciones+Gratis',
            ],
            [
                'id' => 2,
                'title' => 'Cálculo Diferencial Avanzado',
                'description' => 'Domina las derivadas y sus aplicaciones en la vida real.',
                'is_premium' => true,
                'thumbnail' => 'https://placehold.co/600x400?text=Calculo+Premium',
            ]
        ];
    }

    /**
     * Retorna el contenido de una lección específica.
     */
    public function getLessonContent(int $lessonId)
    {
        // Mock de contenido de lección con soporte para video, texto y quiz
        return [
            'id' => $lessonId,
            'title' => 'Ecuaciones de Primer Grado - Parte 1',
            'type' => 'hybrid', // Video + Lectura + Quiz
            'content' => [
                'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Link de ejemplo
                'reading_material' => "Para resolver una ecuación como $2x + 5 = 15$, debemos despejar la variable $x$. 

 1. Restamos 5 en ambos lados: $2x = 10$. 
 2. Dividimos por 2: $x = 5$.",
                'quiz' => [
                    'question' => '¿Cuál es el valor de x en $3x - 9 = 0$?',
                    'options' => ['x = 2', 'x = 3', 'x = 4', 'x = 9'],
                    'correct_answer' => 1 // x = 3
                ]
            ],
            'context_for_ai' => 'El alumno está aprendiendo a despejar variables en ecuaciones lineales simples.'
        ];
    }
}
