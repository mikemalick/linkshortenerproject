---
description: This file describes the authentication rules for the project. Read this before implementing or modifying any authentication-related features or handling user sessions.
---

# Authentication — Clerk

All authentication in this application is handled exclusively by **Clerk** (`@clerk/nextjs`). No other auth libraries, custom session management, or manual JWT handling should ever be used.

## Rules

- **Never** implement custom authentication — no NextAuth, next-auth, iron-session, or manual JWT logic.
- Clerk is the single source of truth for user identity. Use `auth()` (server) or `useAuth()` / `useUser()` (client) from `@clerk/nextjs`.
- Do **not** manually set or read session cookies.

## Middleware (Protected Routes)

Protect routes and handle redirects in `middleware.ts` at the project root using Clerk's `clerkMiddleware` and `createRouteMatcher`.

```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isPublicHomeRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect authenticated users away from homepage to dashboard
  if (userId && isPublicHomeRoute(req)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protect dashboard — redirect unauthenticated users to sign-in
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
```

## Sign In / Sign Up — Modal Mode

Sign in and sign up must always open as a **modal**, never as a dedicated page. Use Clerk's `<SignInButton>` and `<SignUpButton>` with `mode="modal"`.

```tsx
import { SignInButton, SignUpButton } from '@clerk/nextjs';

<SignInButton mode="modal">
  <Button>Sign In</Button>
</SignInButton>

<SignUpButton mode="modal">
  <Button>Sign Up</Button>
</SignUpButton>
```

- Never navigate to `/sign-in` or `/sign-up` routes.
- Never embed `<SignIn />` or `<SignUp />` as full-page components.

## Accessing the Current User

**Server Components / Route Handlers / Server Actions:**
```ts
import { auth, currentUser } from '@clerk/nextjs/server';

const { userId } = await auth();          // lightweight — just the ID
const user = await currentUser();         // full user object (extra network call)
```

**Client Components:**
```ts
import { useAuth, useUser } from '@clerk/nextjs';

const { userId, isSignedIn } = useAuth();
const { user } = useUser();
```

## Protected Route Behaviour

| Route | Unauthenticated | Authenticated |
|---|---|---|
| `/` | Show homepage | Redirect to `/dashboard` |
| `/dashboard` | Redirect to `/` | Allow access |
