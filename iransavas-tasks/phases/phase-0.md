# Phase 0: Project Setup

## TASK-001: Monorepo + Tooling Init

**Agent**: devops
**Complexity**: S
**Status**: DONE
**Dependencies**: -

### Description
Initialize the monorepo structure with the chosen package manager and build tool.

### Acceptance Criteria
- [x] Package manager initialized (pnpm)
- [x] Workspace configuration set up (pnpm-workspace.yaml)
- [x] Build tool configured (Next.js)
- [x] Root package.json with workspace scripts

---

## TASK-002: Meta Directories

**Agent**: docs
**Complexity**: S
**Status**: DONE
**Dependencies**: -

### Description
Create the project management directories for tasks, docs, config, and plans.

### Acceptance Criteria
- [x] `iransavas-tasks/` with task-index.md, phases/, active/
- [x] `iransavas-docs/` with MEMORY.md, CHANGELOG.md
- [x] `iransavas-config/` with workflow.md, conventions.md, tech-stack.md, agent-instructions.md
- [x] `iransavas-plans/` directory created

---

## TASK-003: Claude Code Setup

**Agent**: devops
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-001

### Description
Set up .claude/ directory with hooks, commands, and settings.

### Acceptance Criteria
- [x] protect-files.sh hook working
- [x] 5 slash commands created (cold-start, git-full, turn-off, local-testing, new-project)
- [x] settings.local.json configured with permissions and hooks

---

## TASK-004: CLAUDE.md Configuration

**Agent**: docs
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-002

### Description
Write the master CLAUDE.md with project info, conventions, and references.

### Acceptance Criteria
- [x] Project description and workspace layout
- [x] Slash commands documented
- [x] Code conventions summarized
- [x] Reference directories table
- [x] Hooks documented

---

## TASK-005: Docker Dev Environment

**Agent**: devops
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-001

### Description
Create Docker Compose configuration for development services.

### Acceptance Criteria
- [x] docker-compose.yml with PostgreSQL 16 service
- [x] Health checks configured (pg_isready)
- [x] Ports documented (5432)
- [x] Volume mounts for data persistence (pgdata)

---

## TASK-006: Lint, Format, TypeScript Config

**Agent**: devops
**Complexity**: S
**Status**: DONE
**Dependencies**: TASK-001

### Description
Configure ESLint, Prettier (or Biome), and TypeScript base configuration.

### Acceptance Criteria
- [x] ESLint configured (.eslintrc.json, next/core-web-vitals)
- [x] Prettier configured (.prettierrc, format scripts)
- [x] TypeScript strict mode enabled (tsconfig.json)
- [x] Lint passing cleanly

---

## TASK-007: Git Repo Init + First Commit

**Agent**: devops
**Complexity**: S
**Status**: DONE
**Dependencies**: TASK-001..006

### Description
Initialize git repository, create .gitignore, and make the first commit.

### Acceptance Criteria
- [x] .gitignore with common patterns (node_modules, .env, dist, etc.)
- [x] All Phase 0 files committed
- [x] Remote repository connected (if applicable)
- [x] First push successful
