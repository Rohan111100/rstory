import { ALL_SERIES } from '../../data/series';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SeriesCard from '../../components/SeriesCard';
import Link from 'next/link';
import { Library, Sparkles } from 'lucide-react';

interface StoriesPageProps {
  searchParams: Promise<{ genre?: string }>;
}

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const { genre } = await searchParams;
  const activeGenre = genre || 'All';

  const filteredSeries = activeGenre === 'All'
    ? ALL_SERIES
    : ALL_SERIES.filter(s => s.genre.toLowerCase() === activeGenre.toLowerCase());

  const genres = ['All', 'Sci-Fi', 'Fantasy', 'Horror', 'Mystery'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400">
              <Library className="h-3.5 w-3.5" />
              <span>STORY DIRECTORY</span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl font-sans">
              Explore All Stories &amp; Series
            </h1>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              From high-concept speculative sci-fi to blood-moon dark fantasy. Pick a saga and start reading from Episode 1.
            </p>

            {/* Genre Filter Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {genres.map(g => {
                const isActive = activeGenre.toLowerCase() === g.toLowerCase();
                return (
                  <Link
                    key={g}
                    href={g === 'All' ? '/stories' : `/stories?genre=${g}`}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                        : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {g === 'All' ? '✨ All Genres' : g}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Series Grid */}
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <span>Showing {filteredSeries.length} story series</span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSeries.map(series => (
                <SeriesCard key={series.id} series={series} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
