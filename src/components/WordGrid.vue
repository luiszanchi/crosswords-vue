<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { useSelection } from '../composables/useSelection'
import WordCell from './WordCell.vue'

const store = useGameStore()
const {
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
} = useSelection()

// Track window width reactively so cellSize updates on orientation change / resize
const windowWidth = ref(window.innerWidth)
const handleResize = () => { windowWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))

const cellSize = computed(() => {
  // 16px side padding on each side, 8px grid padding on each side, 2px border each side
  const occupied = (16 + 8 + 2) * 2
  const available = Math.min(560, windowWidth.value - occupied)
  const size = Math.floor(available / store.gridSize)
  return Math.max(20, Math.min(40, size))
})

const fontSize = computed(() => Math.max(10, cellSize.value - 14))
</script>

<template>
  <div class="grid-wrapper">
    <div
      class="grid"
      :style="{
        '--cell-size': cellSize + 'px',
        '--cell-font-size': fontSize + 'px',
        gridTemplateColumns: `repeat(${store.gridSize}, ${cellSize}px)`,
      }"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
      v-on="{
        touchstart: onTouchStart,
        touchmove: onTouchMove,
        touchend: onTouchEnd,
      }"
    >
      <WordCell
        v-for="cell in store.grid.flat()"
        :key="`${cell.row}-${cell.col}`"
        :row="cell.row"
        :col="cell.col"
        :letter="cell.letter"
        @mousedown="onMouseDown"
        @mouseenter="onMouseEnter"
      />
    </div>

    <div v-if="store.gameWon" class="overlay overlay--won">
      <p>You found all words!</p>
      <p class="overlay__sub">Score: {{ store.score }}</p>
    </div>
  </div>
</template>

<style scoped>
.grid-wrapper {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.grid {
  display: grid;
  gap: 2px;
  padding: 8px;
  background: #fff;
  border: 2px solid #bdc3c7;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  touch-action: none;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: 700;
  gap: 8px;
}

.overlay--won {
  background: rgba(39, 174, 96, 0.9);
  color: #fff;
}

.overlay__sub {
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
