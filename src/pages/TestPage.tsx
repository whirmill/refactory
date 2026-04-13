import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadPage } from '@/lib/markdown';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home, ArrowLeft, ClipboardCheck, AlertTriangle } from 'lucide-react';

export function TestPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPage('test-sistemista')
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
            <BreadcrumbPage>Test del Sistemista</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Il Test del Sistemista</h1>
        </div>
        <p className="text-muted-foreground">
          Scopri se hai quello che serve per sopravvivere nella sala macchine.
        </p>
      </header>

      {/* Warning */}
      <Alert className="mb-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attenzione</AlertTitle>
        <AlertDescription>
          Questo test non ha valore scientifico. O forse sì. Nessuno lo sa.
        </AlertDescription>
      </Alert>

      <Separator className="mb-8" />

      {/* Content */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      )}

      <Separator className="my-8" />

      {/* Score badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="outline" className="text-red-500 border-red-500">0-3: Utente</Badge>
        <Badge variant="outline" className="text-yellow-500 border-yellow-500">4-6: Junior</Badge>
        <Badge variant="outline" className="text-blue-500 border-blue-500">7-9: Senior</Badge>
        <Badge variant="outline" className="text-green-500 border-green-500">10: Esperto/Bob</Badge>
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
