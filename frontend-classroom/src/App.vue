<script setup>
import LearningSession from './components/LearningSession.vue'
</script>

<template>
  <main class="embedded-classroom">
    <LearningSession />
  </main>
</template>

<style>
/* Reset total para integración en Iframe */
body, html { 
  margin: 0; 
  padding: 0; 
  background: transparent !important; 
  overflow: hidden; 
}
.embedded-classroom {
  height: 100vh;
  width: 100%;
}
/* Forzar estilos de scroll para que no se vean feos */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
</style>
