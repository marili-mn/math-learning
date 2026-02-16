<template>
  <div class="classroom-root" :class="isDark ? 'theme-dark' : 'theme-light'">
    
    <!-- Top Bar -->
    <header class="top-nav">
      <div class="nav-left">
        <span class="brand">MATHFLOW_ACADEMY</span>
        <span class="separator">//</span>
        <span class="course-name">{{ lesson?.title || 'CARGANDO...' }}</span>
      </div>
      
      <div class="nav-right">
        <button class="theme-btn" @click="toggleTheme" title="Cambiar Tema">
          {{ isDark ? '☀' : '☾' }}
        </button>
        <button class="premium-btn" @click="goToPremium">
          ★ UPGRADE
        </button>
      </div>
    </header>

    <!-- Main Workspace -->
    <div class="workspace" :class="{ 'chat-expanded': isChatMaximized }">
      
      <!-- Contenido (Scrollable) -->
      <main class="content-stage">
        <div class="video-wrapper">
          <iframe :src="lesson?.content.video_url" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="intel-body" v-if="lesson">
          <div class="doc-header">BRIEFING TÉCNICO</div>
          <div class="markdown-content" v-html="renderMarkdown(lesson.content.reading_material)"></div>

          <div class="validation-zone" :class="{ completed: lessonCompleted }">
            <div class="zone-label">{{ lessonCompleted ? 'OBJETIVO CUMPLIDO' : 'VALIDACIÓN REQUERIDA' }}</div>
            <h3 class="quiz-q">{{ lesson.content.quiz.question }}</h3>
            <div class="options-grid">
              <button v-for="(opt, idx) in lesson.content.quiz.options" 
                      :key="idx" @click="checkAnswer(idx)" 
                      class="opt-btn">
                {{ opt }}
              </button>
            </div>
          </div>
        </div>
      </main>

      <!-- Chat (Fixed Full Height) -->
      <aside class="chat-sidebar" :class="{ 'maximized': isChatMaximized }">
        <div class="chat-header">
          <div class="agent-status"><span class="dot"></span> MATHY_AGENT</div>
          <button @click="isChatMaximized = !isChatMaximized" class="max-btn" title="Maximizar/Minimizar">
            {{ isChatMaximized ? '⤢' : '⤡' }}
          </button>
        </div>

        <div class="chat-viewport" ref="chatBox">
          <div v-for="(msg, i) in chatHistory" :key="i" :class="['msg-row', msg.role]">
            <div class="msg-meta">{{ msg.role === 'user' ? 'PILOT' : 'SYSTEM' }}</div>
            <div class="msg-bubble" v-html="renderMarkdown(msg.text)"></div>
          </div>
          <div v-if="loadingIA" class="msg-row agent blink">COMPUTING...</div>
        </div>

        <div class="chat-input-area">
          <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Consulta..." :disabled="loadingIA" />
          <button @click="sendMessage">➤</button>
        </div>
      </aside>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { AcademicAPI, AIAPI } from '../services/api';
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const isDark = ref(true);
const lesson = ref(null);
const chatHistory = ref([{ role: 'model', text: 'ENLACE ESTABLECIDO.' }]);
const userInput = ref('');
const loadingIA = ref(false);
const lessonCompleted = ref(false);
const chatBox = ref(null);
const isChatMaximized = ref(false);

const renderMarkdown = (text) => {
  if (!text) return '';
  let processed = text.replace(/\$([^$]+)\$/g, (m, f) => {
    try { return katex.renderToString(f, { throwOnError: false }); } catch { return m; }
  });
  return marked.parse(processed);
};

onMounted(async () => {
  try {
    const res = await AcademicAPI.getLesson(1);
    lesson.value = res.data;
  } catch (e) {
    console.error("Failed to load lesson", e);
    // Mock for demo if API fails
    lesson.value = {
        title: 'DINÁMICA DE FLUIDOS',
        content: {
            video_url: 'https://www.youtube.com/embed/I3GWzXRectE?autoplay=1&mute=1',
            reading_material: '# Introducción\nLa dinámica de fluidos estudia el movimiento de los fluidos.',
            quiz: {
                question: '¿Cuál es la ecuación de continuidad?',
                options: ['A1V1 = A2V2', 'F = ma', 'E = mc^2'],
                correct_answer: 0
            }
        },
        context_for_ai: 'Curso de física básica.'
    };
  }
});

async function sendMessage() {
  if (!userInput.value.trim() || loadingIA.value) return;
  const msg = userInput.value;
  chatHistory.value.push({ role: 'user', text: msg });
  userInput.value = '';
  loadingIA.value = true;
  await nextTick(); if(chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight;

  try {
    const res = await AIAPI.chat(msg, chatHistory.value.slice(-6), lesson.value?.context_for_ai);
    let clean = res.data.text.replace(/<thought>[\s\S]*?<\/thought>/g, '').trim();
    chatHistory.value.push({ role: 'model', text: clean });
  } catch {
    chatHistory.value.push({ role: 'model', text: 'Simulación: Respuesta del agente sobre "' + msg + '"' });
  } finally {
    loadingIA.value = false;
    await nextTick(); if(chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
}

function checkAnswer(idx) {
  if (idx === lesson.value.content.quiz.correct_answer) lessonCompleted.value = true;
}

// Funciones de Puente con React
function toggleTheme() {
  isDark.value = !isDark.value;
  window.parent.postMessage('toggle-theme', '*');
}

function goToPremium() {
  window.parent.postMessage('go-premium', '*');
}

// Listen for theme changes from parent
window.addEventListener('message', (event) => {
    if (event.data === 'toggle-theme') {
        isDark.value = !isDark.value;
    }
});
</script>

<style scoped>
/* Theme Variables */
.theme-dark { --bg-main: #000; --bg-panel: #0a0a0a; --text: #fff; --border: rgba(255,255,255,0.1); --chat-bg: #050505; }
.theme-light { --bg-main: #fff; --bg-panel: #f4f4f5; --text: #000; --border: rgba(0,0,0,0.1); --chat-bg: #fff; }

.classroom-root {
  height: 100vh; width: 100%; display: flex; flex-direction: column;
  background: var(--bg-main); color: var(--text); font-family: 'Inter', sans-serif;
}

.top-nav {
  height: 60px; border-bottom: 1px solid var(--border); display: flex;
  align-items: center; justify-content: space-between; padding: 0 2rem;
  background: var(--bg-panel); flex-shrink: 0;
}

.brand { font-weight: 900; letter-spacing: 0.1em; }
.nav-right { display: flex; gap: 10px; }
.theme-btn, .premium-btn { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 5px 10px; cursor: pointer; font-size: 10px; font-weight: 800; }
.premium-btn { background: #eab308; color: black; border: none; }

.workspace {
  flex: 1; display: grid; grid-template-columns: 1fr 400px; overflow: hidden;
  transition: grid-template-columns 0.3s ease;
  position: relative;
}

.content-stage { overflow-y: auto; padding: 2rem; padding-bottom: 4rem; }
.video-wrapper { aspect-ratio: 16/9; background: #000; margin-bottom: 2rem; border: 1px solid var(--border); }
iframe { width: 100%; height: 100%; }

.intel-body { max-width: 800px; margin: 0 auto; }
.markdown-content { font-size: 14px; line-height: 1.6; margin-bottom: 2rem; }

/* Chat Sidebar Fixes */
.chat-sidebar {
  border-left: 1px solid var(--border);
  background: var(--chat-bg);
  display: flex; flex-direction: column;
  height: 100%;
  max-height: 100vh; /* Ensure it doesn't exceed viewport */
  transition: all 0.3s ease;
  z-index: 50;
  box-shadow: -5px 0 20px rgba(0,0,0,0.1);
  overflow: hidden; /* Prevent sidebar itself from scrolling */
}

.chat-sidebar.maximized {
  position: absolute;
  top: 0;
  right: 0;
  width: 70%; /* Wider width when maximized */
  height: 100vh; /* Full viewport height */
  border-left: 1px solid var(--border);
  box-shadow: -10px 0 50px rgba(0,0,0,0.5);
}

.chat-header { 
    padding: 1rem; border-bottom: 1px solid var(--border); font-size: 10px; font-weight: 800; letter-spacing: 0.1em; 
    display: flex; justify-content: space-between; align-items: center;
}
.dot { display: inline-block; width: 6px; height: 6px; background: #00ff41; border-radius: 50%; margin-right: 5px; }

.max-btn {
    background: transparent; border: none; color: var(--text); cursor: pointer; font-size: 14px; opacity: 0.5; transition: opacity 0.2s;
}
.max-btn:hover { opacity: 1; }

.chat-viewport {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 2rem;
  display: flex; flex-direction: column; gap: 1rem;
  min-height: 0; /* Important for nested flex scroll */
}

.msg-row { font-size: 13px; /* Slightly larger text */ }
.msg-meta { font-size: 9px; opacity: 0.5; margin-bottom: 4px; font-weight: 700; }
.msg-bubble { padding: 12px; background: rgba(125,125,125,0.08); border-radius: 6px; line-height: 1.5; }

.chat-input-area {
  padding: 1.5rem; border-top: 1px solid var(--border);
  display: flex; gap: 10px; background: var(--bg-panel);
}
.chat-input-area input { flex: 1; background: transparent; border: 1px solid var(--border); padding: 12px; color: var(--text); outline: none; }
.chat-input-area button { background: var(--text); color: var(--bg-main); border: none; padding: 0 20px; font-weight: 900; cursor: pointer; }

@media (max-width: 900px) {
  .workspace { grid-template-columns: 1fr; }
  .chat-sidebar { display: none; }
  .chat-sidebar.maximized { display: flex; width: 100%; }
}
</style>
