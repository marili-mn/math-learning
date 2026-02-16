# Architecture & Security Notes: MathFlow Replica

## 🛡️ Implementación del Perfil de Auditor

Este proyecto ha sido construido bajo la premisa de que **"el código es el primer perímetro de defensa"**.

### 1. Desacoplamiento de Lógica de Negocio (Service Layer)
Se ha implementado una capa de servicios en Laravel para evitar que los controladores manejen lógica sensible.
*   `PaymentService`: Centraliza la validación de fraude y procesamiento.
*   `AcademicService`: Actúa como la "Single Source of Truth" para el contenido, previniendo inyecciones de material no auditado.

### 2. Integridad de la IA (Socratic Guardrails)
El `ai-service` implementa una arquitectura de proxy. El frontend **nunca** habla directamente con Gemini. Esto permite:
*   **Sanitización de Prompts:** Evita ataques de "Prompt Injection".
*   **Inyección de Contexto:** El backend provee el `context_for_ai`, asegurando que la IA no alucine fuera del currículo académico.

### 3. Validación de Certificación
Se ha diseñado un sistema de hashing para que los certificados sean verificables fuera de la plataforma, usando SHA-256 basado en el ID de usuario y la clave de aplicación.

---
*Actualizado: 15 de febrero de 2026.*
