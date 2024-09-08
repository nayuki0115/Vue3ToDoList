<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<section class="layout">
  <header class="header">
    <h1>Vue3 To Do List</h1>
  </header>
  <main class="main">
    <RouterView />
  </main>
  <footer class="footer"> 
    Annie Wu 2024 @ copyright
  </footer>
</section>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Roboto&display=swap');

body {
  margin: 0;
  font-family: 'Roboto', 'Noto Sans TC', sans-serif;
}

.layout {
  width: 100%;
  display: grid;
  grid:
    "header" auto
    "main" 1fr
    "footer" auto
    / 100%;
  min-height: 100vh;
}

.header { 
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  position: sticky;
  top: 0;
  background-color: rgba(255, 192, 203, 0.7);
  z-index: 1000;
}

.main { 
  grid-area: main;
  padding: 20px;
}

.footer { 
  grid-area: footer;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 200, 221, 0.7); /* #ffc8dd with 70% opacity */
  padding: 10px 20px;
  text-align: center;
}

.header h1, .footer {
  margin: 0;
}
</style>
