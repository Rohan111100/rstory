import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_SERIES, getSeriesBySlug } from '../../../data/series';
import { getEpisodesBySeries } from '../../../data/episodes';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { BookOpen, Star, Clock, Calendar, Sparkles, ArrowRight, User } from 'lucide-react';

export function generateStaticParams() {
  return ALL_SERIES.map(series => ({
    slug: series.slug,
  }));
}

interface SeriesPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  const episodes = getEpisodesBySeries(slug);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pb-16">
        {/* Banner Section */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b border-slate-800/80 bg-slate-900">
          <img
            src={series.bannerImage}
            alt={series.title}
            className="h-full w-full object-cover opacity-35 filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        {/* Series Info Container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Left Col: Cover Image & Stats */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
                <img
                  src={series.coverImage}
                  alt={series.title}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>

              {/* Status & Views Card */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Status</span>
                  <span className="font-semibold text-emerald-400">{series.status}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Genre</span>
                  <span className="font-semibold text-sky-400">{series.genre}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Rating</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    {series.rating} / 5.0
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Schedule</span>
                  <span className="font-semibold text-slate-300">{series.releaseSchedule}</span>
                </div>
              </div>
            </div>

            {/* Right Col: Details & Episode List */}
            <div className="md:col-span-8 lg:col-span-9 pt-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400 border border-sky-500/20">
                  {series.genre.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {series.episodesCount} Episode{series.episodesCount === 1 ? '' : 's'} Published
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl font-sans">
                {series.title}
              </h1>

              <p className="mt-2 text-sm sm:text-base font-medium italic text-sky-400">
                &ldquo;{series.tagline}&rdquo;
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                {series.synopsis}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {series.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs text-slate-400 border border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Bio Snippet */}
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-3">
                <img
                  src={series.author.avatar}
                  alt={series.author.name}
                  className="h-10 w-10 rounded-full object-cover border border-sky-500/30"
                />
                <div>
                  <div className="text-xs font-bold text-white">{series.author.name}</div>
                  <div className="text-[11px] text-slate-400">{series.author.role}</div>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="mt-8 flex items-center gap-4">
                {episodes.length > 0 ? (
                  <Link
                    href={`/series/${series.slug}/${episodes[0].slug}`}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] hover:from-sky-400 hover:to-blue-500"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Start Reading Episode 1</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-400">
                    ⚡ Episodes Currently in Production
                  </div>
                )}
              </div>

              {/* Episode Table of Contents */}
              <div className="mt-12">
                <h3 className="text-lg font-bold text-white font-sans border-b border-slate-800 pb-3">
                  Episodes &amp; Chapters ({episodes.length})
                </h3>

                {episodes.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {episodes.map(ep => (
                      <Link
                        key={ep.id}
                        href={`/series/${series.slug}/${ep.slug}`}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 transition-all hover:border-sky-500/40 hover:bg-slate-900"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-xs font-bold text-sky-400 border border-sky-500/20">
                            {ep.episodeNumber}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                              {ep.title}
                            </h4>
                            <p className="line-clamp-1 text-xs text-slate-400 mt-0.5">
                              {ep.summary}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {ep.estimatedReadTime}m
                          </span>
                          <span className="rounded-lg bg-sky-500/20 px-2.5 py-1 text-sky-300 font-bold group-hover:bg-sky-500 group-hover:text-white transition-colors">
                            Read ➡
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center text-xs text-slate-400">
                    Episode 1 is currently in drafting. Follow our releases on the homepage to be notified upon launch!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
