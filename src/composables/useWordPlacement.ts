import type { Cell, PlacedWord, Direction } from '../stores/gameStore'

interface PlacementResult {
  grid: Cell[][]
  placed: PlacedWord[]
}

type Delta = { dr: number; dc: number }

const DIRECTIONS: Record<Direction, Delta> = {
  horizontal: { dr: 0, dc: 1 },
  vertical:   { dr: 1, dc: 0 },
  diagonal:   { dr: 1, dc: 1 },
}

// Check whether a word fits in the grid without conflicting letters
function canPlace(grid: Cell[][], word: string, row: number, col: number, delta: Delta, size: number): boolean {
  for (let i = 0; i < word.length; i++) {
    const r = row + i * delta.dr
    const c = col + i * delta.dc
    if (r < 0 || r >= size || c < 0 || c >= size) return false
    const existing = grid[r][c].letter
    if (existing && existing !== word[i]) return false
  }
  return true
}

// Write a word into the grid and record its cell list
function writeWord(
  grid: Cell[][],
  word: string,
  row: number,
  col: number,
  delta: Delta,
  wordIndex: number
): Array<{ row: number; col: number }> {
  const cells: Array<{ row: number; col: number }> = []
  for (let i = 0; i < word.length; i++) {
    const r = row + i * delta.dr
    const c = col + i * delta.dc
    grid[r][c].letter = word[i]
    grid[r][c].wordIndices.push(wordIndex)
    cells.push({ row: r, col: c })
  }
  return cells
}

// Try to place one word; return true on success
function tryPlace(
  grid: Cell[][],
  word: string,
  size: number,
  wordIndex: number,
  placed: PlacedWord[]
): boolean {
  const directionKeys = Object.keys(DIRECTIONS) as Direction[]
  // Shuffle directions for variety
  const shuffled = directionKeys.sort(() => Math.random() - 0.5)

  // Try up to 50 random positions per direction
  for (const dir of shuffled) {
    const delta = DIRECTIONS[dir]
    for (let attempt = 0; attempt < 50; attempt++) {
      const row = Math.floor(Math.random() * size)
      const col = Math.floor(Math.random() * size)
      if (canPlace(grid, word, row, col, delta, size)) {
        const cells = writeWord(grid, word, row, col, delta, wordIndex)
        placed.push({ word, row, col, direction: dir, found: false, cells })
        return true
      }
    }
  }
  return false
}

// Main entry: place as many words from the pool as possible
export function placeWords(grid: Cell[][], pool: string[], size: number): PlacementResult {
  const placed: PlacedWord[] = []
  for (const word of pool) {
    tryPlace(grid, word, size, placed.length, placed)
  }
  return { grid, placed }
}
