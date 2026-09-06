import { StorySeries } from '../types/story';

export const ALL_SERIES: StorySeries[] = [
  {
    id: 'series-cybo-rex',
    slug: 'cybo-rex',
    title: 'Cybo-Rex',
    tagline: 'When humanity conquered the stars, only time remained beyond control.',
    synopsis: 'In the year 3000, humanity lives in the utopian paradise of Luminar—a Type III civilization powered by the Sun itself. But when a half-million square foot section of the ancient jungle known as The Eclipsed Wilds vanishes without trace or crater, intern John William Hardly is pulled into a clandestine government investigation alongside Dr. Victor Arclight. What lurks beyond the temporal rift will reshape civilization forever.',
    coverImage: '/images/cybo-rex/ep1-cover.jpg',
    bannerImage: '/images/cybo-rex/ep1-cover.jpg',
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
  },
  {
    id: 'series-shadow-realm',
    slug: 'the-shadow-realm',
    title: 'The Shadow Realm',
    tagline: 'Ancient seals fracture beneath the blood eclipse.',
    synopsis: 'Seven centuries of peace shatter when the obsidian monoliths guarding the border of the Netherfall begin to weep black glass. A disgraced rune-knight and an exiled cartographer must traverse forbidden abysses before the eclipse claims the mortal realms.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    genre: 'Fantasy',
    tags: ['Dark Fantasy', 'Magic', 'Knights', 'Monsters'],
    status: 'Upcoming',
    author: {
      name: 'Rohan Parmar',
      role: 'Creator & Lead Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Author of futuristic sagas and dark fantasy epics.'
    },
    featured: true,
    rating: 4.88,
    totalViews: '12.4K',
    releaseSchedule: 'Premiering Soon',
    episodesCount: 0
  },
  {
    id: 'series-cyber-horizon',
    slug: 'cyber-horizon-2099',
    title: 'Cyber Horizon 2099',
    tagline: 'In the neon rain of Neo-Kyoto, memories are the ultimate contraband.',
    synopsis: 'Neural couriers run encrypted wetware across corporate sector lines. When an illicit memory capsule decrypts inside courier Jax’s cortex, he realizes he is carrying the death certificate of the city’s ruling artificial intelligence.',
    coverImage: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=1600&q=80',
    genre: 'Sci-Fi',
    tags: ['Cyberpunk', 'Neo-Noir', 'Hacking', 'AI'],
    status: 'Upcoming',
    author: {
      name: 'Rohan Parmar',
      role: 'Creator & Lead Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Author of futuristic sagas and dark fantasy epics.'
    },
    featured: false,
    rating: 4.91,
    totalViews: '9.1K',
    releaseSchedule: 'Premiering Soon',
    episodesCount: 0
  },
  {
    id: 'series-whispering-hollow',
    slug: 'the-whispering-hollow',
    title: 'The Whispering Hollow',
    tagline: 'The trees remember every name spoken in the fog.',
    synopsis: 'A remote Appalachian mountain village where townspeople never leave their homes after the curfew bells ring at dusk. When a folklorist arrives to investigate the disappearance of an entire family, she discovers the woods themselves are hungry.',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1600&q=80',
    genre: 'Horror',
    tags: ['Supernatural', 'Folk Horror', 'Mystery', 'Atmospheric'],
    status: 'Upcoming',
    author: {
      name: 'Rohan Parmar',
      role: 'Creator & Lead Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Author of futuristic sagas and dark fantasy epics.'
    },
    featured: false,
    rating: 4.82,
    totalViews: '5.6K',
    releaseSchedule: 'Coming This Fall',
    episodesCount: 0
  }
];

export function getSeriesBySlug(slug: string): StorySeries | undefined {
  return ALL_SERIES.find(s => s.slug === slug);
}

export function getSeriesByGenre(genre: string): StorySeries[] {
  if (genre === 'All') return ALL_SERIES;
  return ALL_SERIES.filter(s => s.genre.toLowerCase() === genre.toLowerCase());
}
