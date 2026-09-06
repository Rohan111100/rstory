import { StorySeries } from '../types/story';

const prefix = process.env.NODE_ENV === 'production' ? '/rstory' : '';

export const ALL_SERIES: StorySeries[] = [
  {
    id: 'series-cybo-rex',
    slug: 'cybo-rex',
    title: 'Cybo-Rex',
    tagline: 'When humanity conquered the stars, only time remained beyond control.',
    synopsis: 'In the year 3000, humanity lives in the utopian paradise of Luminar—a Type III civilization powered by the Sun itself. But when a half-million square foot section of the ancient jungle known as The Eclipsed Wilds vanishes without trace or crater, intern John William Hardly is pulled into a clandestine government investigation alongside Dr. Victor Arclight. What lurks beyond the temporal rift will reshape civilization forever.',
    coverImage: `${prefix}/images/cybo-rex/ep1-cover.jpg`,
    bannerImage: `${prefix}/images/cybo-rex/ep1-cover.jpg`,
    genre: 'Sci-Fi',
    tags: ['Sci-Fi', 'Time Travel', 'Dystopia', 'AI & Cyborgs', 'Mystery'],
    status: 'Ongoing',
    author: {
      name: 'Rohan Parmar',
      role: 'Creator & Lead Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Author of futuristic sagas, speculative fiction, and rich episodic web novels exploring the boundaries of science and humanity.'
    },
    featured: true,
    rating: 4.95,
    totalViews: '24.8K',
    releaseSchedule: 'New episode every week',
    episodesCount: 1
  }
];

export function getSeriesBySlug(slug: string): StorySeries | undefined {
  return ALL_SERIES.find(s => s.slug === slug);
}

export function getSeriesByGenre(genre: string): StorySeries[] {
  if (genre === 'All') return ALL_SERIES;
  return ALL_SERIES.filter(s => s.genre.toLowerCase() === genre.toLowerCase());
}
