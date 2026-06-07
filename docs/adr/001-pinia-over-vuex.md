# ADR 001 — Pinia over Vuex

**Status:** Accepted

## Context

The app needs a reactive global store to hold grid data, word lists, selection state, and game flags. Vue 3's ecosystem offers Vuex 4 (the historical standard) and Pinia (the new official recommendation).

## Decision

Use **Pinia**.

## Reasons

- **Composition API native.** Pinia stores are written with `ref` and `computed` — the same primitives used in `<script setup>` components — so there is no mental-model shift between store code and component code.
- **No mutations boilerplate.** Vuex requires separate `state`, `mutations`, `actions`, and `getters` sections. Pinia collapses these into a single `setup` function: state is `ref()`, getters are `computed()`, actions are plain functions.
- **First-class TypeScript.** Store types are inferred without extra type-annotation overhead.
- **Officially recommended.** Pinia is the recommended state library for new Vue 3 projects per the Vue core team.

## Trade-offs

Vuex has a larger ecosystem of tutorials and Stack Overflow answers. Teams migrating from Vue 2 may find Vuex more familiar. Neither concern applies here (greenfield Vue 3 project).
