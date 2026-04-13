import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
});

export interface Story {
  slug: string;
  title: string;
  date: string;
  content: string;
  prev?: string;
  next?: string;
}

export interface StoryIndex {
  year: number;
  stories: StoryMeta[];
}

export interface StoryMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

// Import all markdown files from content/storie/2026/
const storyFiles = import.meta.glob('/content/storie/2026/*.md', { query: '?raw', import: 'default' });

export async function loadStory(slug: string): Promise<Story | null> {
  try {
    const filePath = `/content/storie/2026/${slug}.md`;
    const loadFile = storyFiles[filePath];
    
    if (!loadFile) {
      return null;
    }
    
    const raw = await loadFile() as string;
    const { title, date, content } = parseStory(raw);
    
    // Get prev/next
    const allStories = await getStoriesList();
    const index = allStories.findIndex(s => s.slug === slug);
    
    return {
      slug,
      title,
      date,
      content,
      prev: index > 0 ? allStories[index - 1].slug : undefined,
      next: index < allStories.length - 1 ? allStories[index + 1].slug : undefined,
    };
  } catch (error) {
    console.error('Error loading story:', error);
    return null;
  }
}

export async function getStoriesList(): Promise<StoryMeta[]> {
  const stories: StoryMeta[] = [];
  
  for (const [path, loadFile] of Object.entries(storyFiles)) {
    if (path.includes('/index.md')) continue;
    
    const raw = await loadFile() as string;
    const { title, date } = parseStory(raw);
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    stories.push({
      slug,
      title,
      date,
    });
  }
  
  // Sort by date descending
  stories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return stories;
}

function parseStory(raw: string): { title: string; date: string; content: string } {
  const lines = raw.split('\n');
  
  // Extract title (first # heading)
  let title = '';
  let titleLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('# ')) {
      title = lines[i].replace('# ', '').trim();
      titleLine = i;
      break;
    }
  }
  
  // Extract date (look for **Data**: pattern)
  let date = '';
  for (let i = titleLine; i < Math.min(titleLine + 10, lines.length); i++) {
    if (lines[i].includes('**Data**:')) {
      const match = lines[i].match(/\*\*Data\*\*:\s*(\d{2}\/\d{2}\/\d{4})/);
      if (match) {
        date = match[1];
      }
      break;
    }
  }
  
  // Parse content to HTML
  const content = marked.parse(raw) as string;
  
  return { title, date, content };
}

export async function loadPage(name: string): Promise<string> {
  try {
    const filePath = `/content/${name}.md`;
    const pageFiles = import.meta.glob('/content/*.md', { query: '?raw', import: 'default' });
    const loadFile = pageFiles[filePath];
    
    if (!loadFile) {
      return '';
    }
    
    const raw = await loadFile() as string;
    return marked.parse(raw) as string;
  } catch (error) {
    console.error('Error loading page:', error);
    return '';
  }
}
