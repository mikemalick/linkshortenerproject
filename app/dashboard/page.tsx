import { auth } from '@clerk/nextjs/server';
import { getLinksByUserId } from '@/data/links';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Link2 } from 'lucide-react';
import { CreateLinkDialog } from '@/app/dashboard/create-link-dialog';
import { EditLinkDialog } from '@/app/dashboard/edit-link-dialog';
import { DeleteLinkDialog } from '@/app/dashboard/delete-link-dialog';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) return null;

  const links = await getLinksByUserId(userId);

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Links</h1>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{links.length} link{links.length !== 1 ? 's' : ''}</Badge>
          <CreateLinkDialog />
        </div>
      </div>

      {links.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
            <Link2 className="size-8" />
            <p>No links yet. Create your first short link!</p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Link2 className="size-4 shrink-0" />
                    <span className="font-mono">{link.shortCode}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-4">
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm text-muted-foreground truncate">{link.originalUrl}</p>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(link.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center size-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      aria-label="Open original URL"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                    <EditLinkDialog id={link.id} originalUrl={link.originalUrl} shortCode={link.shortCode} />
                    <DeleteLinkDialog id={link.id} shortCode={link.shortCode} />
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
