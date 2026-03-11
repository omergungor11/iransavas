# Phase 1: DB + Seed Iyilestirme

## TASK-008: SQLite → PostgreSQL gecisi

**Agent**: database
**Complexity**: M
**Status**: PENDING
**Dependencies**: TASK-007

### Description
Prisma schema'yi PostgreSQL provider'a cevir, docker-compose ile PG ayaga kaldir, migration olustur.

### Acceptance Criteria
- [ ] schema.prisma provider: "postgresql"
- [ ] docker-compose up ile PG calisiyor
- [ ] .env DATABASE_URL PostgreSQL'e isaret ediyor
- [ ] `npx prisma db push` basarili
- [ ] Prisma client generate basarili

---

## TASK-009: Seed verisi zenginlestirme

**Agent**: database
**Complexity**: M
**Status**: PENDING
**Dependencies**: TASK-008

### Description
Mevcut seed.ts'i gozden gecir, eksik alanlari doldur, daha fazla realistik veri ekle.

### Acceptance Criteria
- [ ] 100+ haber makalesi (Turkce + Ingilizce)
- [ ] 80+ savas olaylari (farkli tipler ve siddetler)
- [ ] 30+ kayip raporu (tarih bazli, farkli bolgeler)
- [ ] 50+ zaman cizelgesi girdisi
- [ ] 10+ rapor (haftalik, aylik, ozel)
- [ ] Seed calisiyor: `pnpm db:seed`

---

## TASK-010: Prisma migration workflow

**Agent**: database
**Complexity**: S
**Status**: PENDING
**Dependencies**: TASK-008

### Description
Prisma migration'larini kur — dev ve prod icin ayri workflow.

### Acceptance Criteria
- [ ] `npx prisma migrate dev` calisiyor
- [ ] prisma/migrations/ dizini olustu
- [ ] package.json'a `db:migrate` script eklendi
- [ ] .gitignore'da dev.db hala ignored
