<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project Directory Conventions

### Directory Structure

```
pulse-merchant-portal/
├── next.config.ts                       # Next config (root)
├── components.json                      # Shadcn config
├── eslint.config.mjs
├── tsconfig.json                        # Path aliases live here (@/*, @features/*, @common/*)
├── package.json / pnpm-lock.yaml
├── CLAUDE.md / README.md / DEVELOPMENT.md
│
├── public/                              # Served as-is at root URL (root, NOT inside src/)
│
└── src/                                 # srcDir — all app code lives here
    ├── app/                             # App Router root (file-based routing)
    │   ├── layout.tsx                   # Root layout
    │   ├── providers.tsx                # Client providers (Zustand, theme, etc.)
    │   ├── global-error.tsx             # Global error boundary
    │   ├── not-found.tsx                # Global 404
    │   ├── globals.css
    │   │
    │   ├── route-name/
    │   │   └── page.tsx                 # Static route
    │   └── route-name/
    │       └── [param]/
    │           └── page.tsx             # Dynamic route
    │
    ├── assets/                          # Build-time assets (imported, not served)
    │
    ├── common/                          # Shared cross-feature code
    │   ├── api/                         # API utils/abstractions
    │   │   └── index.ts                 # Barrel
    │   ├── layouts/                     # app layouts
    │   ├── components/                  # Reusable UI
    │   │   ├── FormInputs/              # React Hook Form + Zod wrappers
    │   │   │   └── index.ts             # Barrel re-exports each input
    │   │   ├── ui/                      # Shadcn primitives (kept flat per shadcn-ui CLI)
    │   │   │   ├── button.tsx
    │   │   │   ├── dialog.tsx
    │   │   │   └── index.ts             # Barrel → import { Button, Dialog } from '@common/components/ui'
    │   │   └── [SharedComponent]/       # Same module shape as feature components
    │   ├── hooks/                       # Reusable hooks
    │   │   └── index.ts
    │   └── utils/                       # Utils, constants
    │       └── index.ts
    │
    ├── features/                        # Feature-scoped modules (primary pattern)
    │   └── [feature-group]/             # Optional grouping dir (e.g. analytics/)
    │       └── [feature-name]/          # e.g. dashboard/
    │           ├── components/
    │           │   ├── index.ts         # Barrel re-exporting each component
    │           │   └── [ComponentName]/ # PascalCase module dir
    │           │       ├── index.ts                       # Barrel → re-exports ComponentName
    │           │       ├── [ComponentName].tsx            # Core component
    │           │       ├── [ComponentName].helpers.ts     # Pure functions
    │           │       ├── [ComponentName].hooks.ts       # Component-scoped hooks
    │           │       ├── [ComponentName].constants.ts   # SNAKE_CASE_CAPS values
    │           │       └── [ComponentName].types.ts       # I*/T*/E* defs (no constants)
    │           ├── containers/          # Page-glue, no business logic
    │           │   ├── index.ts
    │           │   └── [ContainerName]/
    │           │       ├── index.ts
    │           │       └── [ContainerName].tsx
    │           ├── hooks/               # Feature-scoped hooks
    │           │   └── index.ts
    │           └── stores/              # Feature-scoped Zustand stores (optional)
    │               └── index.ts
    │
    ├── stores/                          # Global Zustand stores
    │   └── index.ts
    │
    ├── middleware.ts                    # Next middleware (single root file)
    │
    └── types/                           # Global shared types
        └── index.ts
```

### Path aliases (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@app/*": ["src/app/*"],
      "@common/*": ["src/common/*"],
      "@features/*": ["src/features/*"],
      "@stores/*": ["src/stores/*"],
      "@assets/*": ["src/assets/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

### Module conventions

- **Component module** (`src/features/<group>/<feat>/components/<Name>/`): `index.ts`, `.tsx`, `.helpers.ts`, `.hooks.ts`, `.constants.ts`, `.types.ts`. Add only files needed. The `index.ts` re-exports the named component (`export { ComponentName } from './ComponentName'`).
- **Container module** (`containers/<Name>/<Name>.tsx`): wires components to page, no logic.
- **Page → Container → Component** flow. `app/<route>/page.tsx` imports the container; container composes components.
- **Barrel files**: every folder with consumable exports has `index.ts`. Always import via the alias + barrel — never reach into deep paths.
  - ✅ `import { Dashboard } from '@features/analytics/dashboard/containers'`
  - ❌ `import { Dashboard } from '@features/analytics/dashboard/containers/Dashboard/Dashboard'`
- **Shadcn UI** lives flat in `src/common/components/ui/` (shadcn CLI assumption), re-exported via a barrel: `import { Button, Dialog } from '@common/components/ui'`.
- **Server vs Client components**: default to Server Components. Add `'use client'` at the top of any component using hooks, Zustand, browser APIs, or event handlers. Containers are typically client; leaf presentation components should be server when possible.

### Routing

| Pattern                      | File                                                  |
| ---------------------------- | ----------------------------------------------------- |
| Static route                 | `src/app/foo/page.tsx`                                |
| Dynamic route                | `src/app/foo/[id]/page.tsx`                           |
| Layout (root or per-segment) | `src/app/layout.tsx`                                  |
| Error boundary               | `src/app/error.tsx` + `global-error.tsx`              |
| 404                          | `src/app/not-found.tsx`                               |
| Loading state                | `src/app/loading.tsx`                                 |
| API route                    | `src/app/api/<name>/route.ts`                         |
| Middleware                   | `src/middleware.ts` (single root file, matcher-based) |
| Providers                    | `src/app/providers.tsx`                               |

### State & data

- **Zustand** for global + feature state. Global stores in `src/stores/`; feature-scoped stores in `src/features/<feat>/stores/`. Each store exports a `useXStore` hook. All Zustand consumers must be Client Components.
- Data fetching uses Server Components (`fetch` in `page.tsx`/`layout.tsx`) and `src/common/api/` for shared client-side calls.

### Naming

- Dirs/files: **PascalCase** for component modules + `.tsx`, **kebab-case** for feature/page/route dirs.
- App Router special files stay lowercase as Next requires: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`.
- Types: `I*` interfaces, `T*` types, `E*` enums. No string-literal unions (except small UI variants).
- Constants: `SNAKE_CASE_CAPS` in `*.constants.ts` or `*.helpers.ts`, never `types.ts`.

### When adding a new feature

1. Create `src/features/<group?>/<name>/`.
2. Add `components/<Name>/<Name>.tsx` (+ `index.ts`, helpers/types/constants/hooks as needed).
3. Add `containers/<Name>Container/<Name>Container.tsx` (+ `index.ts`).
4. Add `src/app/<route>/page.tsx` importing the container via `@features/...`.
5. Shared components → `src/common/`.
6. Update the relevant barrel `index.ts` files so the new modules are reachable through aliases.

## Coding best practices

### DO's

- Use self-documenting code - code should explain itself without comments
- Prefix new interfaces with I, types with T and enums with E
- Always use rem units as opposed to px units
- Prefer aliased imports over multi-layer relative imports
- Extract magic values to constants
- Keep types, form helpers, constants and components in separate files. E.g.
  - Component.tsx
  - Component.types.ts
  - Component.helpers.ts
  - Component.constants.ts
- index.ts (barrel file for exporting everything)
- Use aliased imports.
- Use barrel files (index.ts) to export from folders.

### DONT's

- DON'T Add useless comments
- DON'T Skip tests when modifying components/hooks/reducers
- DON'T Use inline styles; use TailwindCSS
- DON'T Use absolute paths without configured aliases
- DON'T Use yarn build to verify changes. Use npx tsc --noEmit instead.
- DON'T Use relative imports, fix existing issues in files that are being worked on.
- DON'T Use any type in new functions/files. Use unknown if the structure is actually not known.
- DON'T Use string literal union types. Use enums instead.
- DON'T Use hardcoded color values like text-[#eeeeee]. Always extend Tailwind theme and use the color through variable.
- DON'T Put constants (e.g., initial values) in types files. Keep them in helpers or a separate constants file.
