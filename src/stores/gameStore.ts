import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Theme } from '../data/wordLists'
import { wordThemes } from '../data/wordLists'
import { placeWords } from '../composables/useWordPlacement'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type Direction = 'horizontal' | 'vertical' | 'diagonal'

export interface PlacedWord {
  word: string
  row: number
  col: number
  direction: Direction
  found: boolean
  // cell coordinates that belong to this word
  cells: Array<{ row: number; col: number }>
}

export interface Cell {
  letter: string
  row: number
  col: number
  // indices of words that pass through this cell
  wordIndices: number[]
}

const DIFFICULTY_SIZE: Record<Difficulty, number> = {
  easy: 10,
  medium: 15,
  hard: 20,
}

const DIFFICULTY_WORDS: Record<Difficulty, number> = {
  easy: 6,
  medium: 10,
  hard: 15,
}

const POINTS_PER_WORD = 100
const RANDOM_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomLetter() {
  return RANDOM_LETTERS[Math.floor(Math.random() * RANDOM_LETTERS.length)]
}

export const useGameStore = defineStore('game', () => {
  // --- settings ---
  const difficulty = ref<Difficulty>('medium')
  const theme = ref<Theme>('animals')

  // --- grid state ---
  const gridSize = ref(15)
  const grid = ref<Cell[][]>([])
  const placedWords = ref<PlacedWord[]>([])

  // --- selection state (written by useSelection, read here) ---
  const selectedCells = ref<Array<{ row: number; col: number }>>([])
  const highlightedWordIndices = ref<number[]>([]) // found words indices for highlight

  // --- game state ---
  const score = ref(0)
  const elapsed = ref(0)
  const gameWon = ref(false)
  let timerInterval: ReturnType<typeof setInterval> | null = null

  // --- computed ---
  const foundCount = computed(() => placedWords.value.filter(w => w.found).length)
  const totalWords = computed(() => placedWords.value.length)
  const progress = computed(() => `${foundCount.value}/${totalWords.value}`)

  function buildEmptyGrid(size: number): Cell[][] {
    return Array.from({ length: size }, (_, r) =>
      Array.from({ length: size }, (_, c) => ({
        letter: '',
        row: r,
        col: c,
        wordIndices: [],
      }))
    )
  }

  function fillRandomLetters(g: Cell[][]) {
    for (const row of g) {
      for (const cell of row) {
        if (!cell.letter) cell.letter = randomLetter()
      }
    }
  }

  function startTimer() {
    stopTimer()
    timerInterval = setInterval(() => {
      elapsed.value++
    }, 1000)
  }

  function stopTimer() {
    if (timerInterval !== null) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  function newGame() {
    stopTimer()
    gameWon.value = false
    score.value = 0
    elapsed.value = 0
    selectedCells.value = []
    highlightedWordIndices.value = []

    const size = DIFFICULTY_SIZE[difficulty.value]
    const wordCount = DIFFICULTY_WORDS[difficulty.value]
    gridSize.value = size

    const pool = [...wordThemes[theme.value].words]
      .sort(() => Math.random() - 0.5)
      .slice(0, wordCount)
      .filter(w => w.length <= size)

    const emptyGrid = buildEmptyGrid(size)
    const result = placeWords(emptyGrid, pool, size)
    placedWords.value = result.placed
    fillRandomLetters(result.grid)
    grid.value = result.grid

    startTimer()
  }

  // Called by useSelection after a drag ends
  function validateSelection(cells: Array<{ row: number; col: number }>) {
    if (cells.length < 2) return

    // Build the selected string forward and backward
    const forward = cells.map(c => grid.value[c.row][c.col].letter).join('')
    const backward = [...forward].reverse().join('')

    for (let i = 0; i < placedWords.value.length; i++) {
      const pw = placedWords.value[i]
      if (pw.found) continue
      if (pw.word === forward || pw.word === backward) {
        // verify the cells match
        const selected = new Set(cells.map(c => `${c.row},${c.col}`))
        const wordCells = new Set(pw.cells.map(c => `${c.row},${c.col}`))
        if (selected.size === wordCells.size && [...selected].every(k => wordCells.has(k))) {
          pw.found = true
          score.value += POINTS_PER_WORD
          highlightedWordIndices.value = [...highlightedWordIndices.value, i]
          if (foundCount.value === totalWords.value) {
            stopTimer()
            gameWon.value = true
          }
          return
        }
      }
    }
  }

  function setDifficulty(d: Difficulty) {
    difficulty.value = d
  }

  function setTheme(t: Theme) {
    theme.value = t
  }

  return {
    difficulty,
    theme,
    gridSize,
    grid,
    placedWords,
    selectedCells,
    highlightedWordIndices,
    score,
    elapsed,
    gameWon,
    foundCount,
    totalWords,
    progress,
    newGame,
    validateSelection,
    setDifficulty,
    setTheme,
    stopTimer,
  }
})
