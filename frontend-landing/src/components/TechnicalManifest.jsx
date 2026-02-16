import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const docs = {
  'README.md': `# MathFlow Replica - EdTech Fullstack + AI

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

*   **Skinny Controllers / Fat Services:** Toda la lógica de negocio reside en \`app/Services\`, facilitando la auditoría y el mantenimiento.
*   **Socratic Proxy Pattern:** El servicio de IA actúa como un mediador que inyecta contexto académico y guardrails pedagógicos antes de consultar al LLM.
*   **Secure-by-Design:** Validación de integridad en pagos y certificaciones mediante algoritmos matemáticos y hashing.`,

  'ARCHITECTURE.md': `# Architecture & Security Notes: MathFlow Replica

## 🛡️ Implementación del Perfil de Auditor

Este proyecto ha sido construido bajo la premisa de que **"el código es el primer perímetro de defensa"**.

### 1. Desacoplamiento de Lógica de Negocio (Service Layer)
Se ha implementado una capa de servicios en Laravel para evitar que los controladores manejen lógica sensible.
*   \`PaymentService\`: Centraliza la validación de fraude y procesamiento.
*   \`AcademicService\`: Actúa como la "Single Source of Truth" para el contenido, previniendo inyecciones de material no auditado.

### 2. Integridad de la IA (Socratic Guardrails)
El \`ai-service\` implementa una arquitectura de proxy. El frontend **nunca** habla directamente con Gemini. Esto permite:
*   **Sanitización de Prompts:** Evita ataques de "Prompt Injection".
*   **Inyección de Contexto:** El backend provee el \`context_for_ai\`, asegurando que la IA no alucine fuera del currículo académico.

### 3. Validación de Certificación
Se ha diseñado un sistema de hashing para que los certificados sean verificables fuera de la plataforma, usando SHA-256 basado en el ID de usuario y la clave de aplicación.`,

  'SCALABILITY.md': `# Scalability & AI Roadmap: MathFlow

Propuesta estratégica para la evolución técnica de la plataforma, enfocada en optimización de costos, persistencia y ciberseguridad avanzada.

## Fase 1: Persistencia y Auditoría (Corto Plazo)
*   **Audit Log de IA:** Implementar una base de datos (PostgreSQL) para registrar cada interacción alumno-tutor.
*   **Rate Limiting Dinámico:** Protección contra ataques DoS que puedan inflar los costos de la API de Gemini.

## Fase 2: Optimización de Costos y Rendimiento (Medio Plazo)
*   **Semantic Caching (Redis):** Si varios alumnos hacen preguntas similares sobre un mismo problema matemático, el sistema devolverá una respuesta cacheada previamente validada.
*   **Function Calling:** Integrar capacidades de ejecución de código para que la IA pueda resolver y verificar cálculos complejos.

## Fase 3: Privacidad y Soberanía de Datos (Largo Plazo)
*   **Hybrid AI Model:** Explorar el uso de modelos locales (como Llama 3 o Mixtral) para tareas básicas de tutoría.
*   **Cifrado End-to-End:** Implementar capas de cifrado en la persistencia de los chats.`,

  'ACADEMIC_FLOW.md': `# Academic Flow & Certification Logic

## 1. El Ciclo de Aprendizaje
El flujo se ha implementado de la siguiente manera:
1.  **Carga Contextual:** El \`AcademicController\` sirve la lección.
2.  **Renderizado Híbrido:** Vue 3 procesa el video y el texto (preparado para KaTeX).
3.  **Asistencia Activa:** Si el alumno tiene dudas, el chat de IA ya conoce el \`problemContext\` de la lección actual.
4.  **Validación de Comprensión:** Un mini-quiz al final de cada lección dispara el \`ProgressService\`.

## 2. Persistencia y Mocks
El contenido académico se sirve mediante Mocks estructurados en el \`AcademicService\`, mientras que el progreso del usuario y los hashes de certificación están preparados para persistencia real.`
};

const TechnicalManifest = () => {
  const [activeTab, setActiveTab] = useState('README.md');

  return (
    <div className="manifest-wrapper">
      <div className="manifest-sidebar">
        <h3>SYSTEM_DOCS</h3>
        {Object.keys(docs).map(fileName => (
          <button 
            key={fileName} 
            onClick={() => setActiveTab(fileName)}
            className={`doc-tab ${activeTab === fileName ? 'active' : ''}`}
          >
            {fileName}
          </button>
        ))}
      </div>
      <div className="manifest-viewer">
        <div className="viewer-header">
          <span>FILE: {activeTab}</span>
          <span>READ_ONLY</span>
        </div>
        <div className="markdown-body">
          <ReactMarkdown>{docs[activeTab]}</ReactMarkdown>
        </div>
      </div>

      <style>{`
        .manifest-wrapper { display: flex; height: 100%; border: 1px solid rgba(255,255,255,0.1); background: #050505; }
        
        .manifest-sidebar { 
          width: 250px; 
          border-right: 1px solid rgba(255,255,255,0.1); 
          padding: 1.5rem; 
          display: flex; 
          flex-direction: column; 
          gap: 0.5rem;
        }
        .manifest-sidebar h3 { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 0.2em; margin-bottom: 1rem; font-weight: 900; }
        
        .doc-tab { 
          background: transparent; 
          border: 1px solid transparent; 
          color: rgba(255,255,255,0.6); 
          text-align: left; 
          padding: 10px; 
          font-family: 'JetBrains Mono', monospace; 
          font-size: 11px; 
          cursor: pointer;
          border-radius: 4px;
        }
        .doc-tab:hover { background: rgba(255,255,255,0.05); color: white; }
        .doc-tab.active { background: rgba(255,255,255,0.1); color: white; border-color: rgba(255,255,255,0.2); }

        .manifest-viewer { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        
        .viewer-header {
          padding: 10px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          display: flex;
          justify-content: space-between;
          background: #000;
        }

        .markdown-body { padding: 3rem; overflow-y: auto; color: #d4d4d4; font-size: 14px; line-height: 1.7; }
        .markdown-body h1 { font-size: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; margin-bottom: 1.5rem; color: white; }
        .markdown-body h2 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; color: white; }
        .markdown-body h3 { font-size: 1.2rem; margin-top: 1.5rem; color: white; }
        .markdown-body p { margin-bottom: 1rem; }
        .markdown-body ul { padding-left: 1.5rem; margin-bottom: 1rem; }
        .markdown-body li { margin-bottom: 0.5rem; }
        .markdown-body strong { color: white; font-weight: 700; }
        .markdown-body code { background: rgba(255,255,255,0.1); padding: 2px 5px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
      `}</style>
    </div>
  );
};

export default TechnicalManifest;
