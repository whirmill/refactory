import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoriesList, type StoryMeta } from '@/lib/markdown';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AlertTriangle, BookOpen, Calendar } from 'lucide-react';

const characters = [
  { name: 'ME', desc: 'Il developer che cerca di sopravvivere', color: 'bg-green-500' },
  { name: 'JN', desc: 'Junior Newbie: il junior che chiede tutto, sbaglia tutto', color: 'bg-yellow-500' },
  { name: 'TL', desc: 'Tech Lead: decide l\'architettura senza consultare', color: 'bg-orange-500' },
  { name: 'CTO', desc: 'Parla di AI, cloud, blockchain senza capire', color: 'bg-red-500' },
  { name: 'PM', desc: 'Project Manager: promette feature impossibili', color: 'bg-purple-500' },
  { name: 'CR', desc: 'Code Reviewer: trova sempre qualcosa da criticare', color: 'bg-blue-500' },
];

export function HomePage() {
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
      {/* Hero Section */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Refactory
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Tutte le storie qui raccontate sono vere. I nomi delle variabili sono stati cambiati 
          per proteggere i colpevoli. E gli innocenti. E soprattutto me.
        </p>
      </header>

      {/* Warning Alert */}
      <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">Attenzione</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          La lettura di queste storie può causare: voglia di fare refactoring, 
          flash di PR infinite, e la compulsione di dire "funzionava sul mio computer".
        </AlertDescription>
      </Alert>

      {/* Characters Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Personaggi abituali</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {characters.map((char) => (
            <div 
              key={char.name}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className={char.color + ' text-white font-bold'}>
                  {char.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{char.name}</p>
                <p className="text-sm text-muted-foreground">{char.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Stories Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">Ultime storie</h2>
          </div>
          <Badge variant="secondary" className="text-sm">
            {stories.length} storie
          </Badge>
        </div>
        
        {loading ? (
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-3">
            {stories.map((story, index) => (
              <Link key={story.slug} to={`/storia/${story.slug}`}>
                <Card className="hover:bg-accent/50 transition-all hover:shadow-md group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {story.title}
                          </CardTitle>
                        </div>
                        <CardDescription className="flex items-center gap-1">
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

      {/* Footer Links */}
      <Separator className="my-8" />
      <footer className="text-center">
        <p className="text-muted-foreground mb-4">
          Questo sito è fatto con caffè, imprecazioni, e console.log().
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="secondary" asChild>
            <Link to="/archivio">Archivio completo</Link>
          </Badge>
          <Badge variant="secondary" asChild>
            <Link to="/glossario">Glossario</Link>
          </Badge>
          <Badge variant="secondary" asChild>
            <Link to="/test">Test del Sistemista</Link>
          </Badge>
        </div>
      </footer>
    </div>
  );
}
