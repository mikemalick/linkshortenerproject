'use server';

import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { createLink, updateLink, deleteLink } from '@/data/links';

const createLinkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL.'),
  shortCode: z
    .string()
    .min(3, 'Short code must be at least 3 characters.')
    .max(20, 'Short code must be at most 20 characters.')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, hyphens, and underscores are allowed.')
    .optional()
    .or(z.literal('')),
});

export async function createLinkAction(input: { originalUrl: string; shortCode: string }) {
  const { userId } = await auth();
  if (!userId) return { error: 'Unauthorized' };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' };

  const shortCode = parsed.data.shortCode || nanoid(8);

  try {
    await createLink({ userId, originalUrl: parsed.data.originalUrl, shortCode });
  } catch {
    return { error: 'Failed to create link. That short code may already be taken.' };
  }

  return { success: true };
}

const editLinkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL.'),
  shortCode: z
    .string()
    .min(3, 'Short code must be at least 3 characters.')
    .max(20, 'Short code must be at most 20 characters.')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, hyphens, and underscores are allowed.'),
});

export async function updateLinkAction(id: number, input: { originalUrl: string; shortCode: string }) {
  const { userId } = await auth();
  if (!userId) return { error: 'Unauthorized' };

  const parsed = editLinkSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' };

  try {
    await updateLink(id, userId, { originalUrl: parsed.data.originalUrl, shortCode: parsed.data.shortCode });
  } catch {
    return { error: 'Failed to update link. That short code may already be taken.' };
  }

  return { success: true };
}

export async function deleteLinkAction(id: number) {
  const { userId } = await auth();
  if (!userId) return { error: 'Unauthorized' };

  try {
    await deleteLink(id, userId);
  } catch {
    return { error: 'Failed to delete link.' };
  }

  return { success: true };
}
