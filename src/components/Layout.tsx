import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/archivio', label: 'Archivio' },
  { path: '/glossario', label: 'Glossario' },
];

export function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 max-w-4xl flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">Refactory</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  location.pathname === item.path 
                    ? "text-foreground" 
                    : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-1 text-center md:text-left md:items-start">
              <p className="text-sm text-muted-foreground">
                Questo sito è composto con <strong className="font-semibold">VIM</strong>.
              </p>
              <p className="text-xs text-muted-foreground">
                Non ottimizzato per alcun browser specifico. Sei libero di vederlo come preferisci.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/archivio">Archivio</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/glossario">Glossario</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/test">Test</Link>
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-center text-xs text-muted-foreground">
            © 2026 Refactory. I nomi delle variabili sono stati cambiati per proteggere i colpevoli.
          </p>
        </div>
      </footer>
    </div>
  );
}
