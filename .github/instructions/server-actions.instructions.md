---
description: Rules for implementing data mutations via server actions in this project. Read this before creating or modifying any server actions.
---

# Server Actions

## Rules

1. **All data mutations must use server actions.** Never mutate data directly from a Server Component or via an API route.
2. **Server actions must be called from Client Components** — add `"use client"` to the component that invokes the action.
3. **File naming & location:** Server action files must be named `actions.ts` and colocated in the same directory as the component that calls them.
4. **TypeScript types:** All data passed to server actions must have explicit TypeScript types. Never use `FormData` as a parameter type.
5. **Validation:** All inputs must be validated with **Zod** before any processing.
6. **Auth check:** Every server action must verify a logged-in user via Clerk before performing any database operations.

```ts
const { userId } = await auth();
if (!userId) throw new Error("Unauthorized");
```

7. **Database access:** Use helper functions from the `/data` directory. Never call Drizzle queries directly inside a server action.
8. **Return shape:** Never throw errors from a server action. Always return an object with either a `success` or `error` property.

```ts
// success
return { success: true };

// failure
return { error: "Something went wrong." };
```

## Example Structure

```ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const schema = z.object({
  originalUrl: z.string().url(),
});

export async function createLinkAction(input: { originalUrl: string }) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  await createLink({ userId, originalUrl: parsed.data.originalUrl });
  return { success: true };
}
```
