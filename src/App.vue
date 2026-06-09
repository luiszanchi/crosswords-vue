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

    <div class="rotate-overlay" aria-hidden="true">
      <div class="rotate-overlay__content">
        <svg class="rotate-overlay__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M12 18h.01" />
          <path d="M17 8a5 5 0 0 0-9.33-2.5" stroke-linecap="round"/>
          <path d="M7.5 4.5 5 7l2.5 2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="rotate-overlay__text">Rotate your device for a better experience</p>
      </div>
    </div>

    <main class="app__main">
      <!-- Controls and word list side by side on top -->
      <div class="app__sidebar">
        <aside class="app__panel app__panel--controls">
          <GameControls />
        </aside>
        <aside class="app__panel app__panel--words">
          <WordList />
        </aside>
      </div>

      <section class="app__grid">
        <WordGrid />
      </section>
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

/* ── Main layout ── */
.app__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  flex: 1;
}

.app__sidebar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  width: 100%;
}

.app__panel {
  flex: 0 0 auto;
}

.app__grid {
  flex: 0 0 auto;
}

/* ── Rotate-device overlay (portrait mobile only) ── */
.rotate-overlay {
  display: none;
}

@media (max-width: 767px) and (orientation: portrait) {
  .rotate-overlay {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(44, 62, 80, 0.92);
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }

  .rotate-overlay__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    color: #fff;
    text-align: center;
    padding: 32px;
  }

  .rotate-overlay__icon {
    width: 72px;
    height: 72px;
    animation: rotate-hint 1.8s ease-in-out infinite;
  }

  .rotate-overlay__text {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
    max-width: 240px;
    line-height: 1.4;
    color: #ecf0f1;
  }

  @keyframes rotate-hint {
    0%, 100% { transform: rotate(0deg); }
    40%       { transform: rotate(90deg); }
    60%       { transform: rotate(90deg); }
  }
}
</style>
