<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGameStore } from './stores/gameStore'
import WordGrid from './components/WordGrid.vue'
import WordList from './components/WordList.vue'
import GameControls from './components/GameControls.vue'

const store = useGameStore()

onMounted(() => {
  store.newGame()
})

// Format elapsed seconds as mm:ss
const timerDisplay = computed(() => {
  const m = Math.floor(store.elapsed / 60).toString().padStart(2, '0')
  const s = (store.elapsed % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Word Search</h1>
      <div class="app__stats">
        <div class="stat">
          <span class="stat__label">Time</span>
          <span class="stat__value">{{ timerDisplay }}</span>
        </div>
        <div class="stat">
          <span class="stat__label">Score</span>
          <span class="stat__value">{{ store.score }}</span>
        </div>
        <div class="stat">
          <span class="stat__label">Progress</span>
          <span class="stat__value">{{ store.progress }}</span>
        </div>
      </div>
    </header>

    <main class="app__main">
      <!-- On mobile the grid renders first (order: 1),
           word list second (order: 2), controls last (order: 3).
           On desktop all three sit side by side. -->
      <aside class="app__panel app__panel--controls">
        <GameControls />
      </aside>

      <section class="app__grid">
        <WordGrid />
      </section>

      <aside class="app__panel app__panel--words">
        <WordList />
      </aside>
    </main>
  </div>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: #ecf0f1;
  color: #2c3e50;
  min-height: 100dvh;
}

/* ── App shell ── */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

/* ── Header ── */
.app__header {
  background: #2c3e50;
  color: #fff;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.app__title {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

.app__stats {
  display: flex;
  gap: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.stat__label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #95a5a6;
}

.stat__value {
  font-size: 1.1rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

/* ── Main layout: desktop (≥ 768px) ── */
.app__main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  flex: 1;
}

.app__panel {
  flex: 0 0 auto;
  width: 220px;
}

.app__grid {
  flex: 0 0 auto;
}

/* ── Mobile (< 768px): stack vertically, grid on top ── */
@media (max-width: 767px) {
  .app__main {
    flex-direction: column;
    align-items: center;
    padding: 12px;
    gap: 12px;
  }

  /* Grid first */
  .app__grid        { order: 1; }
  /* Word list second */
  .app__panel--words    { order: 2; width: 100%; max-width: 560px; }
  /* Controls last */
  .app__panel--controls { order: 3; width: 100%; max-width: 560px; }
}
</style>
