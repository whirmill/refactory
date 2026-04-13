import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadPage } from '@/lib/markdown';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home, ArrowLeft, BookOpen } from 'lucide-react';

export function GlossaryPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPage('glossario')
      .then((html) => setContent(html))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Glossario</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Glossario dei Termini</h1>
        </div>
        <p className="text-muted-foreground">
          Tutti i personaggi e i termini tecnici usati impropriamente nelle storie.
        </p>
      </header>

      <Separator className="mb-8" />

      {/* Content */}
      {loading ? (
        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      ) : (
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      )}

      <Separator className="my-8" />

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="outline">ME</Badge>
        <Badge variant="outline">CL</Badge>
        <Badge variant="outline">UL</Badge>
        <Badge variant="outline">SL</Badge>
        <Badge variant="outline">SUSL</Badge>
        <Badge variant="outline">HR</Badge>
        <Badge variant="outline">Bob</Badge>
      </div>

      {/* Back button */}
      <Button variant="outline" asChild>
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna alla Home
        </Link>
      </Button>
    </div>
  );
}
