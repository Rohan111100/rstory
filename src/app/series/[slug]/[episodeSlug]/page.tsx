import { notFound } from 'next/navigation';
import { getSeriesBySlug } from '../../../../data/series';
import { ALL_EPISODES, getEpisode, getEpisodesBySeries, getAdjacentEpisodes } from '../../../../data/episodes';
import ReaderEngine from '../../../../components/ReaderEngine';

export function generateStaticParams() {
  return ALL_EPISODES.map(ep => ({
    slug: ep.seriesSlug,
    episodeSlug: ep.slug,
  }));
}

interface EpisodePageProps {
  params: Promise<{
    slug: string;
    episodeSlug: string;
  }>;
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug, episodeSlug } = await params;
  const series = getSeriesBySlug(slug);
  const episode = getEpisode(slug, episodeSlug);

  if (!series || !episode) {
    notFound();
  }

  const allEpisodes = getEpisodesBySeries(slug);
  const { prev, next } = getAdjacentEpisodes(slug, episode.episodeNumber);

  return (
    <ReaderEngine
      series={series}
      episode={episode}
      allEpisodes={allEpisodes}
      prevEpisode={prev}
      nextEpisode={next}
    />
  );
}
