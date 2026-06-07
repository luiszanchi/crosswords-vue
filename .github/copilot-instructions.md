# GitHub Copilot Instructions

## Commands

```bash
npm run dev        # start Vite dev server
npm run build      # type-check then bundle for production
npm run preview    # serve the production build locally
npm run typecheck  # vue-tsc --noEmit (no test runner configured)
```

There is no linter or test suite. Type-checking is the primary correctness gate.

## Store ownership

All game state lives in `src/stores/gameStore.ts` (Pinia). This is the single source of truth for:
- The grid (`Cell[][]`) and placed words (`PlacedWord[]`)
- Selection state (`selectedCells`, `highlightedWordIndices`)
- Timer, score, and game-over flags

Components **read** store state reactively and **write** only through store actions (`newGame`, `validateSelection`, `setDifficulty`, `setTheme`). Never introduce component-local state for game data.

## No external UI framework

The project uses plain CSS only — no Tailwind, no component library, no UI framework. Keep it that way. Style with scoped `<style>` blocks inside `.vue` files.

## Key files

| File | Role |
|------|------|
| `src/stores/gameStore.ts` | Single source of truth for all game state |
| `src/composables/useWordPlacement.ts` | Pure word-placement logic, no Vue reactivity |
| `src/composables/useSelection.ts` | Bridges DOM drag events to store state |
| `src/data/wordLists.ts` | Word themes — add new themes here |
| `src/components/WordGrid.vue` | Grid renderer; touch handlers at container level |
| `src/components/WordCell.vue` | Per-cell renderer; derives all state from store |
