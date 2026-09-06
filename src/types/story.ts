export type Genre = 'Sci-Fi' | 'Fantasy' | 'Mystery' | 'Horror' | 'Thriller' | 'Romance' | 'Action';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface StorySeries {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  synopsis: string;
  coverImage: string;
  bannerImage: string;
  genre: Genre;
  tags: string[];
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  author: Author;
  featured: boolean;
  rating: number;
  totalViews: string;
  releaseSchedule: string;
  episodesCount: number;
}

export interface StoryEpisode {
  id: string;
  slug: string;
  seriesSlug: string;
  episodeNumber: number;
  title: string;
  publishedAt: string;
  coverArt?: string;
  coverCaption?: string;
  estimatedReadTime: number;
  wordCount: number;
  summary: string;
  paragraphs: string[];
  authorNote?: string;
}

export type ReaderTheme = 'dark' | 'black' | 'sepia' | 'light';
export type ReaderFontFamily = 'serif' | 'sans';

export interface ReaderPreferences {
  theme: ReaderTheme;
  fontSize: number;
  fontFamily: ReaderFontFamily;
  lineHeight: number;
}
