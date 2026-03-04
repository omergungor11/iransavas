# Code Conventions

## TypeScript
- strict mode, noUncheckedIndexedAccess
- `any` yasak, `unknown` kullan
- Interface > type (obje tipleri icin)
- Enum yerine `as const` kullan

## Dosya Isimlendirme
- Dosyalar: `kebab-case.ts`
- Component'ler: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Types: `kebab-case.types.ts`

## Component Yapisi
- Server Components default
- "use client" sadece gerektiginde
- Props interface'i component dosyasinda tanimla

## API Response Format
```typescript
// Basarili
{ data: T, meta?: { total: number, page: number } }

// Hata
{ error: { statusCode: number, code: string, message: string } }
```

## Git Commit
```
feat(TASK-XXX): yeni ozellik
fix(TASK-XXX): bug duzeltme
refactor(TASK-XXX): refactoring
docs(TASK-XXX): dokumantasyon
chore(TASK-XXX): tooling/config
```

## Styling
- Tailwind CSS utility-first
- shadcn/ui component'leri customize et
- Dark theme default, `dark:` prefix ile
- Responsive: mobile-first (sm, md, lg, xl)
