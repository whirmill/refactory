import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { loadStory, type Story } from '@/lib/markdown';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronLeft, ChevronRight, Home, Calendar, AlertCircle, ArrowLeft } from 'lucide-react';

export function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);
    
    loadStory(slug)
      .then((data) => {
        if (data) {
          setStory(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-5 w-48" />
        </div>
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/4 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            La storia che cerchi non esiste o è stata cancellata (probabilmente da UL).
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna alla Home
        </Button>
      </div>
    );
  }

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
            <BreadcrumbPage className="max-w-[200px] truncate">
              {story.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Story Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{story.title}</h1>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {story.date}
          </Badge>
          <Badge variant="secondary">Storia 2026</Badge>
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Story Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: story.content }} />
      </article>

      <Separator className="my-8" />

      {/* Navigation */}
      <nav className="flex items-center justify-between gap-4">
        {story.prev ? (
          <Button variant="outline" asChild>
            <Link to={`/storia/${story.prev}`} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Precedente
            </Link>
          </Button>
        ) : (
          <div />
        )}
        
        <Button variant="ghost" asChild>
          <Link to="/">Tutte le storie</Link>
        </Button>
        
        {story.next ? (
          <Button variant="outline" asChild>
            <Link to={`/storia/${story.next}`} className="flex items-center gap-2">
              Successiva
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </nav>

      {/* Back to top */}
      <div className="mt-8 text-center">
        <Button variant="link" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Torna su
        </Button>
      </div>
    </div>
  );
}
