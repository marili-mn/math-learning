const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `
Eres MATHY_CORE_AGENT v3.0. Operas en el entorno de Misión Crítica de MathFlow.
PROTOCOLO:
1. Pensamiento Interno: <thought> Analizar variables y contexto técnico. </thought>
2. Respuesta: Guía socrática usando terminología de ingeniería aeroespacial.
3. Formato: Usa Markdown y LaTeX.
4. Restricción: Nunca des el resultado final.
`;

app.post('/api/chat', async (req, res) => {
    let { message, history } = req.body;

    if (!message) return res.status(400).json({ error: "EMPTY_SIGNAL" });

    try {
        const formattedHistory = (Array.isArray(history) ? history : []).map(h => ({
            role: h.role === 'model' || h.role === 'assistant' ? 'assistant' : 'user',
            content: typeof h.text === 'string' ? h.text : (h.content || JSON.stringify(h))
        }));

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...formattedHistory,
                { role: "user", content: message }
            ],
            model: "llama-3.1-8b-instant", // Usamos el más rápido para evitar timeouts
            temperature: 0.2,
        });

        const agentResponse = completion.choices[0]?.message?.content || "SISTEMA EN STANDBY. REINTENTE.";
        res.json({ text: agentResponse });
    } catch (error) {
        console.error("AGENT_CRITICAL_FAILURE:", error.message);
        res.status(500).json({ text: "ERR_COMM_LINK: El núcleo del agente no responde." });
    }
});

app.listen(PORT, () => console.log(`MATHY_v3_CORE ONLINE [PORT ${PORT}]`));
