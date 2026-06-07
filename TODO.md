# TODO — Project Documentation

## Mermaid diagrams in CLAUDE.md

- [x] Replace the ASCII data-flow diagram with a Mermaid `flowchart LR`
- [x] Add a sequence diagram for the drag-selection → `validateSelection` flow
- [x] Add a state diagram for game states (`idle → playing → won`)

## GitHub Copilot

- [x] Create `.github/copilot-instructions.md` mirroring the key sections of CLAUDE.md
  - Commands (dev, build, typecheck)
  - Store ownership rules (all game state lives in `gameStore`)
  - No external UI framework constraint

## Cursor IDE

- [x] Create `.cursor/rules/architecture.mdc` with high-level architecture rules
- [x] Create `.cursor/rules/conventions.mdc` for code style conventions
  (Composition API only, pure logic in composables, no component-local state for game data)

## Architecture Decision Records

- [x] Create `docs/adr/` folder
- [x] `001-pinia-over-vuex.md` — why Pinia
- [x] `002-no-ui-framework.md` — why plain CSS
- [x] `003-word-placement-algorithm.md` — placement strategy and known edge cases
  (50-attempt cap per direction, words silently dropped if all attempts fail)

## Word Lists

- [x] Translate all word themes in `src/data/wordLists.ts` from Portuguese to English
