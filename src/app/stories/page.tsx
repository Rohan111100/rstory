'use client';

import { useState } from 'react';
import { ALL_SERIES } from '../../data/series';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SeriesCard from '../../components/SeriesCard';
import { Library } from 'lucide-react';

export default function StoriesPage() {
  const [activeGenre, setActiveGenre] = useState<string>('All');

  const filteredSeries = activeGenre === 'All'
    ? ALL_SERIES
    : ALL_SERIES.filter(s => s.genre.toLowerCase() === activeGenre.toLowerCase());

  const genres = ['All', 'Sci-Fi'];

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
              Original Stories &amp; Sagas
            </h1>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              High-concept speculative fiction and episodic web novels. Pick a saga and start reading from Episode 1.
            </p>
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

