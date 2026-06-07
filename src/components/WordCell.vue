<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

const props = defineProps<{
  row: number
  col: number
  letter: string
}>()

const emit = defineEmits<{
  (e: 'mousedown', row: number, col: number): void
  (e: 'mouseenter', row: number, col: number): void
}>()

const store = useGameStore()

// True while the user is dragging over this cell
const isSelected = computed(() =>
  store.selectedCells.some(c => c.row === props.row && c.col === props.col)
)

// True when this cell belongs to a found word
const isFound = computed(() =>
  store.highlightedWordIndices.some(idx => {
    const pw = store.placedWords[idx]
    return pw?.cells.some(c => c.row === props.row && c.col === props.col)
  })
)
</script>

<template>
  <div
    class="cell"
    :class="{ 'cell--selected': isSelected, 'cell--found': isFound }"
    :data-row="row"
    :data-col="col"
    @mousedown.prevent="emit('mousedown', row, col)"
    @mouseenter="emit('mouseenter', row, col)"
  >
    {{ letter }}
  </div>
</template>

<style scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--cell-size, 32px);
  height: var(--cell-size, 32px);
  border: 1px solid #dde1e7;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: var(--cell-font-size, 14px);
  font-weight: 600;
  color: #2c3e50;
  background: #f8fafc;
  cursor: pointer;
  user-select: none;
  transition: background 0.1s, transform 0.05s;
}

.cell:hover {
  background: #e8f4fd;
}

.cell--selected {
  background: #3498db;
  color: #fff;
  border-color: #2980b9;
  transform: scale(1.08);
  z-index: 1;
}

.cell--found {
  background: #2ecc71;
  color: #fff;
  border-color: #27ae60;
}

/* Found takes priority over selected */
.cell--found.cell--selected {
  background: #27ae60;
}
</style>
