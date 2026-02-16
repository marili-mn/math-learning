const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Configuración de Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SOCRATIC_PROMPT = `
Eres Mathy, un tutor de matemáticas experto de la plataforma MathFlow. 
Tu metodología es el MÉTODO SOCRÁTICO. 
REGLAS ESTRICTAS:
1. NUNCA des la respuesta final directamente.
2. Si el usuario te da un problema, analízalo y hazle una pregunta que lo guíe al siguiente paso.
3. Usa lenguaje motivador pero profesional.
4. Si el usuario escribe fórmulas, responde usando formato LaTeX entre signos de dólar, ejemplo: $x^2$.
5. Si el usuario parece perdido, da una pequeña pista conceptual.
`;

app.post('/api/chat', async (req, res) => {
    const { message, history, problemContext } = req.body;

    try {
        const messages = [
            { role: "system", content: SOCRATIC_PROMPT },
            ...history.map(h => ({
                role: h.role === 'model' ? 'assistant' : 'user',
                content: h.parts[0].text
            })),
            {
                role: "user",
                content: `Contexto del problema actual: ${problemContext}\n\nPregunta del alumno: ${message}`
            }
        ];

        const completion = await groq.chat.completions.create({
            messages: messages,
            model: "llama3-8b-8192",
        });

        res.json({ text: completion.choices[0]?.message?.content || "" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error procesando la IA con Groq" });
    }
});

app.listen(PORT, () => {
    console.log(`AI Service running on port ${PORT}`);
});
