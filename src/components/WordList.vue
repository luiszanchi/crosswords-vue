<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'

const store = useGameStore()
</script>

<template>
  <div class="word-list">
    <div class="word-list__header">
      <h3 class="word-list__title">Words to Find</h3>
      <span class="word-list__progress">{{ store.progress }}</span>
    </div>

    <ul class="word-list__items">
      <li
        v-for="pw in store.placedWords"
        :key="pw.word"
        class="word-list__item"
        :class="{ 'word-list__item--found': pw.found }"
      >
        {{ pw.word }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.word-list {
  background: #fff;
  border: 2px solid #bdc3c7;
  border-radius: 8px;
  padding: 12px 16px;
  min-width: 160px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.word-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.word-list__title {
  margin: 0;
  font-size: 1rem;
  color: #2c3e50;
}

.word-list__progress {
  font-size: 0.95rem;
  font-weight: 700;
  color: #3498db;
  background: #eaf5ff;
  border-radius: 12px;
  padding: 2px 10px;
}

.word-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.word-list__item {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.88rem;
  font-weight: 600;
  color: #34495e;
  padding: 3px 8px;
  border-radius: 4px;
  background: #f0f3f4;
  transition: all 0.3s;
}

.word-list__item--found {
  text-decoration: line-through;
  color: #27ae60;
  background: #eafaf1;
}
</style>
