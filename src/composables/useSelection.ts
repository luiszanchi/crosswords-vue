import { ref } from 'vue'
import { useGameStore } from '../stores/gameStore'

export function useSelection() {
  const store = useGameStore()

  const isDragging = ref(false)
  // Anchor is the first cell the user pressed on
  const anchor = ref<{ row: number; col: number } | null>(null)
  // Current end of selection
  const cursor = ref<{ row: number; col: number } | null>(null)

  // Derive the cells between anchor and cursor in a straight line
  function computeSelectedCells(
    from: { row: number; col: number },
    to: { row: number; col: number }
  ): Array<{ row: number; col: number }> {
    const dr = to.row - from.row
    const dc = to.col - from.col
    const steps = Math.max(Math.abs(dr), Math.abs(dc))
    if (steps === 0) return [from]

    // Only accept horizontal, vertical, or 45° diagonal lines
    const isDiagonal = Math.abs(dr) === Math.abs(dc)
    const isHorizontal = dr === 0
    const isVertical = dc === 0
    if (!isDiagonal && !isHorizontal && !isVertical) {
      // Snap to the dominant axis
      if (Math.abs(dr) > Math.abs(dc)) {
        return computeSelectedCells(from, { row: to.row, col: from.col })
      } else {
        return computeSelectedCells(from, { row: from.row, col: to.col })
      }
    }

    const stepR = steps === 0 ? 0 : Math.round(dr / steps)
    const stepC = steps === 0 ? 0 : Math.round(dc / steps)
    const cells: Array<{ row: number; col: number }> = []
    for (let i = 0; i <= steps; i++) {
      cells.push({ row: from.row + i * stepR, col: from.col + i * stepC })
    }
    return cells
  }

  function updateSelection() {
    if (!anchor.value || !cursor.value) return
    store.selectedCells = computeSelectedCells(anchor.value, cursor.value)
  }

  // --- Mouse handlers ---
  function onMouseDown(row: number, col: number) {
    if (store.gameWon) return
    isDragging.value = true
    anchor.value = { row, col }
    cursor.value = { row, col }
    updateSelection()
  }

  function onMouseEnter(row: number, col: number) {
    if (!isDragging.value) return
    cursor.value = { row, col }
    updateSelection()
  }

  function onMouseUp() {
    if (!isDragging.value) return
    isDragging.value = false
    store.validateSelection(store.selectedCells)
    // Clear selection after brief delay so user sees the highlight
    setTimeout(() => {
      store.selectedCells = []
    }, 400)
    anchor.value = null
    cursor.value = null
  }

  // --- Touch handlers ---
  // We need to map touch coordinates to cell row/col via element hit-testing
  function getCellFromTouch(e: TouchEvent): { row: number; col: number } | null {
    const touch = e.touches[0] ?? e.changedTouches[0]
    const el = document.elementFromPoint(touch.clientX, touch.clientY)
    if (!el) return null
    const rowAttr = (el as HTMLElement).dataset.row
    const colAttr = (el as HTMLElement).dataset.col
    if (rowAttr === undefined || colAttr === undefined) return null
    return { row: parseInt(rowAttr), col: parseInt(colAttr) }
  }

  function onTouchStart(e: TouchEvent) {
    if (store.gameWon) return
    e.preventDefault()
    const cell = getCellFromTouch(e)
    if (!cell) return
    isDragging.value = true
    anchor.value = cell
    cursor.value = cell
    updateSelection()
  }

  function onTouchMove(e: TouchEvent) {
    if (!isDragging.value) return
    e.preventDefault()
    const cell = getCellFromTouch(e)
    if (!cell) return
    cursor.value = cell
    updateSelection()
  }

  function onTouchEnd(e: TouchEvent) {
    if (!isDragging.value) return
    e.preventDefault()
    isDragging.value = false
    store.validateSelection(store.selectedCells)
    setTimeout(() => {
      store.selectedCells = []
    }, 400)
    anchor.value = null
    cursor.value = null
  }

  return {
    isDragging,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
