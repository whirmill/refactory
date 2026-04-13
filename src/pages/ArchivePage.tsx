import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoriesList, type StoryMeta } from '@/lib/markdown';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home, Calendar, BookOpen, Server, Brain, ArrowLeft } from 'lucide-react';

export function ArchivePage() {
  const [stories, setStories] = useState<StoryMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStoriesList().then((data) => {
      setStories(data);
      setLoading(false);
    });
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
            <BreadcrumbPage>Archivio</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Archivio</h1>
        <p className="text-muted-foreground">
          Tutte le storie della sala macchine, in ordine cronologico inverso.
        </p>
      </header>

      {/* Year Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="default" className="text-lg px-3 py-1">
            2026
          </Badge>
          <span className="text-muted-foreground text-sm">
            {stories.length} storie pubblicate
          </span>
        </div>

        {loading ? (
          <div className="grid gap-3">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-8" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/4 mt-2" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-2">
            {stories.map((story, index) => (
              <Link key={story.slug} to={`/storia/${story.slug}`}>
                <Card className="hover:bg-accent/50 transition-all hover:shadow-sm group">
                  <CardHeader className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="font-mono text-xs shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base group-hover:text-primary transition-colors truncate">
                          {story.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3" />
                          {story.date}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Separator className="my-8" />

      {/* Stats Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Statistiche (inventate)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-primary">{stories.length}</div>
            <div className="text-sm text-muted-foreground">Totale storie</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-primary">2026</div>
            <div className="text-sm text-muted-foreground">Anno corrente</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-destructive flex items-center justify-center gap-1">
              <Server className="h-6 w-6" />
              4
            </div>
            <div className="text-sm text-muted-foreground">Server morti</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-destructive flex items-center justify-center gap-1">
              <Brain className="h-6 w-6" />
              ∞
            </div>
            <div className="text-sm text-muted-foreground">Nervi a pezzi</div>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Back button */}
      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alla Home
          </Link>
        </Button>
        <Badge variant="secondary">
          Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
        </Badge>
      </div>
    </div>
  );
}
