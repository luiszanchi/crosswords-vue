# ADR 002 — No external UI framework

**Status:** Accepted

## Context

A word-search game requires a precise, grid-based layout with per-cell hover and selection states. Common UI frameworks (Vuetify, PrimeVue, Quasar, Tailwind UI) provide general-purpose components that don't map to this domain.

## Decision

Use **plain CSS** in scoped `<style>` blocks. No component library, no utility-class framework.

## Reasons

- **No impedance mismatch.** The core UI primitive is an `N×N` grid of letter cells. CSS Grid handles this in a few lines; adapting a framework's `<DataTable>` or flex utilities to the same result adds indirection with no gain.
- **Bundle size.** A word-search game needs no modals, data tables, date pickers, or form controls. Importing a framework to use 2% of it is wasteful.
- **Touch handling requires custom code anyway.** The drag-selection mechanic (`touch-action: none`, container-level touch listeners, `elementFromPoint` hit-testing) is not provided by any UI framework and must be hand-written regardless.
- **Responsive sizing is one computed property.** `cellSize` is derived from `window.innerWidth` in `WordGrid.vue` — a utility framework would not simplify this.

## Trade-offs

Accessibility helpers (focus management, ARIA roles) must be implemented manually. This is an acceptable cost for the current scope of the project.
