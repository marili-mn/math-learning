# MathFlow Replica - EdTech Fullstack + AI

Este repositorio es una Prueba de Concepto (PoC) avanzada de la plataforma MathFlow, diseñada bajo principios de **Ciberseguridad**, **Arquitectura de Microservicios** y **Pedagogía Socrática Asistida por IA**.

## 🛠️ Stack Tecnológico Orquestado

| Componente | Tecnología | Responsabilidad |
| :--- | :--- | :--- |
| **Backend** | Laravel 11 (PHP 8.2) | Core de negocio, Auth, Pagos y Persistencia (Service Layer Pattern). |
| **AI Service** | Node.js (Express) | Proxy seguro para Gemini AI con lógica de tutoría socrática. |
| **Classroom** | Vue 3 | App de aprendizaje con renderizado LaTeX y chat de IA contextual. |
| **Landing** | React | Sitio de conversión con validación de seguridad en pagos (Luhn). |
| **Infra** | Docker & Compose | Orquestación y aislamiento de entornos. |

## 📐 Patrones de Diseño Implementados

*   **Skinny Controllers / Fat Services:** Toda la lógica de negocio reside en `app/Services`, facilitando la auditoría y el mantenimiento.
*   **Socratic Proxy Pattern:** El servicio de IA actúa como un mediador que inyecta contexto académico y guardrails pedagógicos antes de consultar al LLM.
*   **Secure-by-Design:** Validación de integridad en pagos y certificaciones mediante algoritmos matemáticos y hashing.

## 🚀 Cómo ejecutar la Demo

1.  **Requisitos:** Docker & Docker Compose.
2.  **Configuración:** Clonar `.env.example` en cada servicio y añadir `GEMINI_API_KEY`.
3.  **Encendido:**
    ```bash
    docker-compose up -d
    ```
4.  **Acceso:**
    *   Backend API: `http://localhost:8000`
    *   AI Service: `http://localhost:3001`
    *   Classroom (Vue): `http://localhost:5173`
    *   Landing (React): `http://localhost:5174`

---
*Desarrollado por Nahuel Marcilli - Senior Fullstack Engineer & Security Auditor.*
