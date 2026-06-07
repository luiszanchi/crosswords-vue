<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'
import type { Difficulty } from '../stores/gameStore'
import { wordThemes, themes } from '../data/wordLists'

const store = useGameStore()

const difficulties: Array<{ value: Difficulty; label: string }> = [
  { value: 'easy',   label: 'Easy (10×10)' },
  { value: 'medium', label: 'Medium (15×15)' },
  { value: 'hard',   label: 'Hard (20×20)' },
]
</script>

<template>
  <div class="controls">
    <div class="controls__group">
      <label class="controls__label">Difficulty</label>
      <div class="controls__buttons">
        <button
          v-for="d in difficulties"
          :key="d.value"
          class="btn"
          :class="{ 'btn--active': store.difficulty === d.value }"
          @click="store.setDifficulty(d.value)"
        >
          {{ d.label }}
        </button>
      </div>
    </div>

    <div class="controls__group">
      <label class="controls__label">Theme</label>
      <div class="controls__buttons">
        <button
          v-for="t in themes"
          :key="t"
          class="btn"
          :class="{ 'btn--active': store.theme === t }"
          @click="store.setTheme(t)"
        >
          {{ wordThemes[t].label }}
        </button>
      </div>
    </div>

    <button class="btn btn--primary btn--block" @click="store.newGame()">
      New Game
    </button>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #fff;
  border: 2px solid #bdc3c7;
  border-radius: 8px;
  padding: 14px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.controls__group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.controls__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.controls__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.btn {
  padding: 8px 14px;
  border: 2px solid #bdc3c7;
  border-radius: 6px;
  background: #f0f3f4;
  color: #34495e;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  /* larger tap target on mobile */
  min-height: 40px;
}

.btn:hover {
  background: #e8f4fd;
  border-color: #3498db;
  color: #2980b9;
}

.btn--active {
  background: #3498db;
  border-color: #2980b9;
  color: #fff;
}

.btn--primary {
  background: #2ecc71;
  border-color: #27ae60;
  color: #fff;
  font-size: 1rem;
  padding: 12px 16px;
}

.btn--primary:hover {
  background: #27ae60;
  border-color: #1e8449;
  color: #fff;
}

.btn--block {
  width: 100%;
}
</style>
