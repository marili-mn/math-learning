# Academic Flow & Certification Logic (Current Implementation)

## 1. El Ciclo de Aprendizaje
El flujo se ha implementado de la siguiente manera:
1.  **Carga Contextual:** El `AcademicController` sirve la lección.
2.  **Renderizado Híbrido:** Vue 3 procesa el video y el texto (preparado para KaTeX).
3.  **Asistencia Activa:** Si el alumno tiene dudas, el chat de IA ya conoce el `problemContext` de la lección actual.
4.  **Validación de Comprensión:** Un mini-quiz al final de cada lección dispara el `ProgressService`.

## 2. Persistencia y Mocks
Para esta fase de la PoC, el contenido académico se sirve mediante Mocks estructurados en el `AcademicService`, mientras que el progreso del usuario y los hashes de certificación están preparados para persistencia real.

## 3. Emisión de Certificados
El sistema evalúa el cumplimiento del 100% de las lecciones y un score mínimo del 80% para habilitar la generación del certificado seguro.
