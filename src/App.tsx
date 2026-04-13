import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { StoryPage } from '@/pages/StoryPage';
import { ArchivePage } from '@/pages/ArchivePage';
import { GlossaryPage } from '@/pages/GlossaryPage';
import { TestPage } from '@/pages/TestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="storia/:slug" element={<StoryPage />} />
          <Route path="archivio" element={<ArchivePage />} />
          <Route path="glossario" element={<GlossaryPage />} />
          <Route path="test" element={<TestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
