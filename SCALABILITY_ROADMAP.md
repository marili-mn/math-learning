# Scalability & AI Roadmap: MathFlow

Propuesta estratégica para la evolución técnica de la plataforma, enfocada en optimización de costos, persistencia y ciberseguridad avanzada.

## Fase 1: Persistencia y Auditoría (Corto Plazo)
*   **Audit Log de IA:** Implementar una base de datos (PostgreSQL) para registrar cada interacción alumno-tutor. Esto permitirá:
    *   Análisis de progreso del estudiante.
    *   Detección de intentos de "engañar" a la IA (Jailbreaking).
    *   Optimización de prompts basada en datos reales.
*   **Rate Limiting Dinámico:** Protección contra ataques DoS que puedan inflar los costos de la API de Gemini.

## Fase 2: Optimización de Costos y Rendimiento (Medio Plazo)
*   **Semantic Caching (Redis):** Si varios alumnos hacen preguntas similares sobre un mismo problema matemático, el sistema devolverá una respuesta cacheada previamente validada, reduciendo la latencia y el consumo de tokens.
*   **Function Calling:** Integrar capacidades de ejecución de código para que la IA pueda resolver y verificar cálculos complejos internamente antes de guiar al alumno.

## Fase 3: Privacidad y Soberanía de Datos (Largo Plazo)
*   **Hybrid AI Model:** Explorar el uso de modelos locales (como Llama 3 o Mixtral) para tareas básicas de tutoría, reservando Gemini/OpenAI para razonamiento complejo, reduciendo la dependencia de proveedores externos y mejorando la privacidad de los datos de los menores.
*   **Cifrado End-to-End:** Implementar capas de cifrado en la persistencia de los chats para cumplir con normativas internacionales de protección de datos educativos.

---
"La meta es construir una plataforma donde la innovación pedagógica y la seguridad técnica converjan."
