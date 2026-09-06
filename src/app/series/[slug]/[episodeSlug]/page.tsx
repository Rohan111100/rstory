import { notFound } from 'next/navigation';
import { getSeriesBySlug } from '../../../../data/series';
import { getEpisode, getEpisodesBySeries, getAdjacentEpisodes } from '../../../../data/episodes';
import ReaderEngine from '../../../../components/ReaderEngine';

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
