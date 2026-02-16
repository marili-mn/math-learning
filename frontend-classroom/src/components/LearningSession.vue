<template>
  <div class="learning-container">
    <!-- Panel Izquierdo: Contenido -->
    <div class="content-panel" v-if="lesson">
      <h2>{{ lesson.title }}</h2>
      <div class="video-wrapper">
        <iframe :src="lesson.content.video_url" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="reading-material" v-html="formattedReading"></div>
      
      <div class="quiz-section" v-if="!lessonCompleted">
        <h3>Quiz de Validación</h3>
        <p>{{ lesson.content.quiz.question }}</p>
        <button v-for="(opt, idx) in lesson.content.quiz.options" 
                :key="idx" 
                @click="checkAnswer(idx)">
          {{ opt }}
        </button>
      </div>
    </div>

    <!-- Panel Derecho: Mathy -->
    <div class="ai-panel">
      <h3>Tutor Mathy</h3>
      <div class="chat-history">
        <div v-for="(msg, i) in chatHistory" :key="i" :class="msg.role">
          <strong>{{ msg.role === 'user' ? 'Tú' : 'Mathy' }}:</strong>
          <p>{{ msg.text }}</p>
        </div>
      </div>
      <div class="chat-input">
        <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Pregúntale algo a Mathy..." />
        <button @click="sendMessage" :disabled="loadingIA">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { AcademicAPI, AIAPI } from '../services/api';

const lesson = ref(null);
const chatHistory = ref([]);
const userInput = ref('');
const loadingIA = ref(false);
const lessonCompleted = ref(false);

const formattedReading = computed(() => {
  // Aquí se integraría KaTeX para renderizar el LaTeX
  return lesson.value?.content.reading_material.replace(/\$/g, ''); 
});

onMounted(async () => {
  const res = await AcademicAPI.getLesson(1);
  lesson.value = res.data;
});

async function sendMessage() {
  if (!userInput.value || loadingIA.value) return;
  
  const userMsg = userInput.value;
  chatHistory.value.push({ role: 'user', text: userMsg });
  userInput.value = '';
  loadingIA.value = true;

  try {
    const res = await AIAPI.chat(
      userMsg, 
      chatHistory.value.slice(-4), // Enviamos parte del historial
      lesson.value.context_for_ai
    );
    chatHistory.value.push({ role: 'model', text: res.data.text });
  } catch (e) {
    console.error("Error con la IA", e);
  } finally {
    loadingIA.value = false;
  }
}

async function checkAnswer(idx) {
  if (idx === lesson.value.content.quiz.correct_answer) {
    alert("¡Correcto!");
    await AcademicAPI.completeLesson(lesson.value.id, { correct_answers: 1, total_questions: 1 });
    lessonCompleted.value = true;
  } else {
    alert("Casi... ¡Pregúntale a Mathy por una pista!");
  }
}
</script>

<style scoped>
.learning-container { display: flex; height: 90vh; gap: 20px; padding: 20px; }
.content-panel { flex: 2; overflow-y: auto; border-right: 1px solid #eee; padding-right: 20px; }
.ai-panel { flex: 1; display: flex; flex-direction: column; background: #f9f9f9; padding: 15px; border-radius: 8px; }
.chat-history { flex-grow: 1; overflow-y: auto; margin-bottom: 10px; }
.user { text-align: right; color: #2c3e50; }
.model { text-align: left; color: #42b983; }
.video-wrapper iframe { width: 100%; height: 315px; border-radius: 8px; }
</style>
