import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

const aiService = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 15000 // Aumentamos el tiempo de espera para respuestas complejas
});

export const AcademicAPI = {
    getCourses: () => api.get('/courses'),
    getLesson: (id) => api.get(`/lessons/${id}`),
    completeLesson: (id, quizData) => api.post(`/lessons/${id}/complete`, quizData)
};

export const AIAPI = {
    chat: (message, history, problemContext) => 
        aiService.post('/chat', { message, history, problemContext })
};
