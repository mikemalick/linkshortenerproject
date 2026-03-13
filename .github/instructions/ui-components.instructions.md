---
description: This file describes the UI component rules for the project. Read this before implementing or modifying any UI components in the project.
---

# UI Standards — shadcn/ui

## Rules

1. **Never hand-roll UI primitives.** Always use `shadcn/ui` components. If a component doesn't exist yet, install it first.
2. **Install components** via the CLI — never copy/paste or create manually:
   ```bash
   npx shadcn add <component>
   ```
3. **Import** from the `@/components/ui` alias:
   ```ts
   import { Button } from "@/components/ui/button";
   ```
4. **Use `cn()`** from `@/lib/utils` for all conditional class merging — never string concatenation.
   ```ts
   import { cn } from "@/lib/utils";
   <div className={cn("base-class", isActive && "active-class")} />
   ```
5. **Icons** use `lucide-react` exclusively — do not import from other icon libraries.
6. **Style** is `new-york`, base color `neutral`, with CSS variables enabled. Do not override the theme mechanism.
7. **Tailwind CSS v4** is used — utility classes only, no arbitrary CSS files outside `app/globals.css`.

## Component Location

| Type                              | Path               |
| --------------------------------- | ------------------ |
| shadcn/ui primitives              | `@/components/ui/` |
| Composite / page-level components | `@/components/`    |

## What NOT to Do

- Do not create custom replacements for components shadcn already provides (buttons, inputs, dialogs, cards, badges, tables, etc.).
- Do not install alternative component libraries (e.g., Chakra, MUI, Radix directly).
- Do not write inline `style={{}}` props — use Tailwind utilities instead.
