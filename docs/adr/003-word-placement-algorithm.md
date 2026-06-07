# ADR 003 — Word placement algorithm

**Status:** Accepted

## Context

Words must be placed on a 2-D letter grid without conflicting letters. Placement must feel random (different layouts each game) and complete in a negligible amount of time on the client.

## Decision

Use **random-position sampling with a per-direction attempt cap of 50**.

The algorithm in `src/composables/useWordPlacement.ts`:

1. Shuffle the three supported directions (horizontal, vertical, diagonal).
2. For each direction, sample up to 50 random `(row, col)` starting positions.
3. Accept the first position where the word fits without conflicting letters (a shared letter at a crossing cell is allowed if the letters match).
4. If no position works across all directions and all 50 attempts each, the word is **silently dropped** from the puzzle.

## Reasons

- **Simplicity.** A constraint-satisfaction or backtracking approach would guarantee placement but add significant complexity. At typical grid sizes (10–20) and word counts (6–15), random sampling finds a valid placement on the first few attempts in practice.
- **Predictable performance.** The worst case is `3 directions × 50 attempts × word_count` collision checks, each `O(word_length)`. For the largest config (hard: 20×20, 15 words), this is at most 2,250 checks — imperceptible on the main thread.

## Known edge cases

- **Silent word drops.** If the grid is highly packed and a word cannot be placed, it is silently omitted. The player sees fewer words than the nominal count for the difficulty. This is visible via `placedWords.length < pool.length`. A mitigation would be to retry `newGame()` automatically when the drop rate exceeds a threshold, but this has not been implemented.
- **Diagonal only goes top-left → bottom-right.** The `DIRECTIONS` map encodes `{ dr: 1, dc: 1 }` only. Reverse-diagonal (`dr: 1, dc: -1`) is not supported, which slightly reduces placement variety on dense grids.
- **No minimum spacing.** Two words can share a crossing cell as long as the letter matches, but there is no constraint preventing words from running parallel and immediately adjacent, which can make them harder to distinguish visually.
