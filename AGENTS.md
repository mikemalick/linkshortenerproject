# Agent Instructions — Link Shortener Project

This file is the entry point for LLM coding agents working in this repository.

## Project Overview

A full-stack URL shortener built with **Next.js App Router**, **Clerk** authentication, **Drizzle ORM**, and a **Neon (PostgreSQL)** database. The UI is built with **shadcn/ui** components and styled with **Tailwind CSS v4**. The application allows users to:

- Create shortened URLs
- Track link analytics
- Manage their links with authentication
- Share links publicly or privately

## Tech Stack

| Layer          | Technology                             |
| -------------- | -------------------------------------- |
| Framework      | Next.js 16 (App Router)                |
| Language       | TypeScript 5 (strict mode)             |
| Styling        | Tailwind CSS v4 + shadcn/ui (new-york) |
| Icons          | lucide-react                           |
| Authentication | Clerk (`@clerk/nextjs`)                |
| ORM            | Drizzle ORM                            |
| Database       | Neon Serverless PostgreSQL             |
| Validation     | (zod — add as needed)                  |

## Key Conventions (Summary)

1. Use the **App Router** exclusively — no `pages/` directory.
2. Prefer **React Server Components** (RSC) by default; add `"use client"` only when needed.
3. All database access goes through `@/db` using Drizzle — never raw SQL strings.
4. Auth is enforced at the middleware level via Clerk; never manually manage sessions.
5. Use `shadcn/ui` for all UI components — install via `npx shadcn add <component>`, never hand-roll primitives that shadcn already provides.
6. Use the `cn()` utility from `@/lib/utils` for all conditional class merging.
7. Environment variables are accessed via `process.env.VARIABLE_NAME` and must be declared in `.env.local`.
8. Run `npm run lint` and resolve all ESLint errors before committing.
