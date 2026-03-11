# Task Index

## Dashboard

| Phase | Name | Total | Done | In Progress | Pending | Blocked |
|-------|------|-------|------|-------------|---------|---------|
| 0 | Project Setup | 7 | 7 | 0 | 0 | 0 |
| 1 | DB + Seed Iyilestirme | 3 | 3 | 0 | 0 | 0 |
| 2 | Haber Modulu | 4 | 4 | 0 | 0 | 0 |
| 3 | Harita Modulu | 4 | 4 | 0 | 0 | 0 |
| 4 | Stabilite & UX | 4 | 4 | 0 | 0 | 0 |
| 5 | SEO & Production | 4 | 4 | 0 | 0 | 0 |
| 6 | Polish & Launch Readiness | 4 | 4 | 0 | 0 | 0 |
| 7 | Final Launch Prep | 3 | 3 | 0 | 0 | 0 |
| **Total** | | **33** | **33** | **0** | **0** | **0** |

**Progress**: 33/33 (100%)

---

## Phase 0: Project Setup

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-001 | Monorepo + tooling init | devops | S | DONE | - |
| TASK-002 | Meta directories (tasks, plans, docs, config) | docs | S | DONE | - |
| TASK-003 | .claude/ hooks, commands, settings | devops | M | DONE | TASK-001 |
| TASK-004 | CLAUDE.md master configuration | docs | M | DONE | TASK-002 |
| TASK-005 | Docker dev environment | devops | M | DONE | TASK-001 |
| TASK-006 | Lint, format, TypeScript config | devops | S | DONE | TASK-001 |
| TASK-007 | Git repo init + first commit | devops | S | DONE | TASK-001..006 |

---

## Phase 1: DB + Seed Iyilestirme

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-008 | SQLite → PostgreSQL gecisi | database | M | DONE | TASK-007 |
| TASK-009 | Seed verisi zenginlestirme | database | M | DONE | TASK-008 |
| TASK-010 | Prisma migration workflow | database | S | DONE | TASK-008 |

---

## Phase 2: Haber Modulu Iyilestirme

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-011 | RSS/NewsAPI fetcher test ve duzeltme | backend | M | DONE | TASK-008 |
| TASK-012 | AI ozet sistemi (OpenAI) | backend | M | DONE | TASK-011 |
| TASK-013 | Cron scheduler production-ready | backend | S | DONE | TASK-011 |
| TASK-014 | Haber listesi UI iyilestirme | frontend | M | DONE | TASK-011 |

---

## Phase 3: Harita Modulu Iyilestirme

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-015 | Kendi Leaflet haritasi (iframe yerine) | frontend | L | DONE | TASK-008 |
| TASK-016 | Harita clustering ve performans | frontend | M | DONE | TASK-015 |
| TASK-017 | Olay detay popup/panel | frontend | M | DONE | TASK-015 |
| TASK-018 | Harita zaman slider'i | frontend | M | DONE | TASK-015 |

---

## Phase 4: Stabilite & UX Iyilestirme

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-019 | Ana sayfa error boundary'leri | frontend | M | DONE | - |
| TASK-020 | API route validation (Zod) | backend | S | DONE | - |
| TASK-021 | Timeline & raporlar error state | frontend | S | DONE | - |
| TASK-022 | TensionIndex skorlama algoritmasi | frontend | S | DONE | - |

---

## Phase 5: SEO & Production Readiness

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-023 | SEO metadata & Open Graph | frontend | S | DONE | - |
| TASK-024 | sitemap.xml & robots.txt | frontend | S | DONE | - |
| TASK-025 | Loading states (loading.tsx) | frontend | S | DONE | - |
| TASK-026 | Ana sayfa SSR optimizasyonu | frontend | M | DONE | TASK-023 |

---

## Phase 6: Polish & Launch Readiness

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-027 | 404 sayfasi + hata sayfalari | frontend | S | DONE | - |
| TASK-028 | Gorsel optimizasyonu (next/image) | frontend | M | DONE | - |
| TASK-029 | Erisilebirlik (a11y) duzeltmeleri | frontend | M | DONE | - |
| TASK-030 | Canli yayin & raporlar entegrasyonu | frontend | M | DONE | - |

---

## Phase 7: Final Launch Prep

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-031 | Favicon & OG image | frontend | S | DONE | - |
| TASK-032 | Production console cleanup | frontend | S | DONE | - |
| TASK-033 | Performans & build dogrulama | devops | S | DONE | TASK-032 |
