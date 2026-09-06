import Link from 'next/link';
import { ALL_SERIES } from '../data/series';
import { ALL_EPISODES } from '../data/episodes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SeriesCard from '../components/SeriesCard';
import { Sparkles, BookOpen, Clock, ArrowRight, Compass, ShieldCheck, Palette } from 'lucide-react';

export default function HomePage() {
  const flagship = ALL_SERIES.find(s => s.slug === 'cybo-rex') || ALL_SERIES[0];
  const otherSeries = ALL_SERIES;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      <Header />

      <main className="flex-1">
        {/* ========================================================
            HERO SPOTLIGHT: CYBO-REX FLAGSHIP PREMIERE
            ======================================================== */}
        <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 py-16 sm:py-24">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] rounded-full bg-sky-600/10 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 right-10 h-[350px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Story Pitch */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-400">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                  <span>FLAGSHIP PREMIERE • EPISODIC SCI-FI NOVEL</span>
                </div>

                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-sans">
                  Enter the Temporal Void of{' '}
                  <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    {flagship.title}
                  </span>
                </h1>

                <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl font-sans">
                  In year 3000, Luminar conquered hunger, pollution, and the Sun&apos;s unlimited energy. 
                  Then, half a million square feet of the sacred Eclipsed Wilds vanished without a trace. 
                  Step into original episodic fiction written for the curious and the bold.
                </p>

                {/* Hero CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/series/cybo-rex/episode-1-the-strange-phenomena"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.02] hover:from-sky-400 hover:to-indigo-500"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Start Reading Episode 1</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>

                  <Link
                    href="#story-series-shelf"
                    className="rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    📚 Explore All Story Titles
                  </Link>
                </div>

                {/* Micro Meta */}
                <div className="mt-8 flex items-center gap-6 text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Weekly Episode Releases</span>
                  </div>
                  <span>•</span>
                  <div>Original AI Concept Art</div>
                  <span>•</span>
                  <div>Distraction-Free Reader</div>
                </div>
              </div>

              {/* Right Column: Panoramic Debut Artwork Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/80 p-2 shadow-2xl shadow-black/80 group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <img
                      src={flagship.coverImage}
                      alt="Cybo-Rex Anomaly"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="rounded-md bg-slate-900/90 px-2 py-1 font-semibold text-sky-400 border border-slate-700">
                        The Eclipsed Wilds Incident
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">Episode 01</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            DEDICATED ALL STORY TITLES SHELF SECTION
            ======================================================== */}
        <section id="story-series-shelf" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-800/80 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  📚 ORIGINAL SAGAS &amp; NOVELS
                </span>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl font-sans">
                  All Story Titles
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Each title features multiple episodic chapters. Browse our complete catalog of worlds.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/stories"
                  className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
                >
                  View Full Library →
                </Link>
              </div>
            </div>

            {/* Stories Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherSeries.map(series => (
                <SeriesCard key={series.id} series={series} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            LATEST EPISODE RELEASES STREAM
            ======================================================== */}
        <section className="border-t border-slate-800/80 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  ⚡ FRESH DROPS
                </span>
                <h3 className="text-xl font-bold text-white sm:text-2xl font-sans">
                  Latest Episode Releases
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {ALL_EPISODES.map(ep => (
                <Link
                  key={ep.id}
                  href={`/series/${ep.seriesSlug}/${ep.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 transition-all hover:border-sky-500/40 hover:bg-slate-900 hover:shadow-xl"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 font-bold border border-sky-500/20 group-hover:scale-105 transition-transform">
                      Ep {ep.episodeNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                          Cybo-Rex
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400">{ep.publishedAt}</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                        {ep.title}
                      </h4>
                      <p className="line-clamp-1 text-xs text-slate-400 mt-0.5">
                        {ep.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {ep.estimatedReadTime}m read
                    </span>
                    <span className="flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 group-hover:bg-sky-400 transition-colors">
                      Read Episode ➡
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            WHY READ ON R-STORYTIME PLATFORM
            ======================================================== */}
        <section className="border-t border-slate-800/80 py-16 bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              PURPOSE-BUILT FOR READERS
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl font-sans">
              A Novel Experience Beyond Simple Blogs
            </p>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 mb-4 border border-sky-500/20">
                  <Palette className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">Custom Reading Modes</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Choose between Deep Dark, Pitch Black (OLED), Warm Sepia, and Light modes. Scale text from 15px to 26px.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">True Episodic Sagas</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Never lose your place. Enjoy seamless Next/Previous episode navigation, scroll progress tracking, and chapter drawers.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 mb-4 border border-rose-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">Zero Clutter &amp; Popup Ads</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Designed for literary immersion. No jarring white boxes or intrusive popups—just pure story craft.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
