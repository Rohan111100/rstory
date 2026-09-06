import Link from 'next/link';
import { StorySeries } from '../types/story';
import { BookOpen, Star, Sparkles, ArrowRight } from 'lucide-react';

interface SeriesCardProps {
  series: StorySeries;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const genreColors: Record<string, { bg: string; text: string; border: string }> = {
    'Sci-Fi': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
    'Fantasy': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
    'Horror': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
    'Mystery': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  };

  const badge = genreColors[series.genre] || {
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    border: 'border-slate-500/20',
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 hover:bg-slate-900 hover:shadow-2xl hover:shadow-sky-500/10">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <img
          src={series.coverImage}
          alt={series.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md border ${badge.bg} ${badge.text} ${badge.border}`}
          >
            {series.genre.toUpperCase()}
          </span>
          {series.featured && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-2.5 py-1 text-xs font-semibold text-yellow-300 backdrop-blur-md border border-yellow-500/30">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
          )}
        </div>

        {/* Episode Status Badge */}
        <div className="absolute bottom-3 right-3">
          <span className="rounded-lg bg-slate-900/90 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-md border border-slate-700">
            ⚡ {series.episodesCount > 0 ? `${series.episodesCount} Episode${series.episodesCount > 1 ? 's' : ''}` : 'Premiering Soon'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-sans text-xl font-bold text-white transition-colors group-hover:text-sky-400">
            <Link href={`/series/${series.slug}`}>
              {series.title}
            </Link>
          </h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <span>{series.rating}</span>
          </div>
        </div>

        <p className="mt-2 text-xs font-medium text-sky-400/90 italic">
          &ldquo;{series.tagline}&rdquo;
        </p>

        <p className="mt-2.5 flex-1 line-clamp-3 text-sm leading-relaxed text-slate-400">
          {series.synopsis}
        </p>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-800/80">
          {series.episodesCount > 0 ? (
            <Link
              href={`/series/${series.slug}/episode-1-the-strange-phenomena`}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-sky-500/20 transition-all hover:from-sky-400 hover:to-blue-500"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Read Ep 1
            </Link>
          ) : (
            <span className="flex items-center justify-center rounded-xl bg-slate-800/50 px-3 py-2 text-xs font-semibold text-slate-400">
              Coming Soon
            </span>
          )}

          <Link
            href={`/series/${series.slug}`}
            className="flex items-center justify-center gap-1 rounded-xl border border-slate-700/80 bg-slate-800/40 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
          >
            Series Info
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
