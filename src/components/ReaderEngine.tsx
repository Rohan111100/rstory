'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoryEpisode, StorySeries, ReaderTheme, ReaderFontFamily } from '../types/story';
import { 
  Type, 
  Sun, 
  Moon, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  AlignLeft, 
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  List
} from 'lucide-react';

interface ReaderEngineProps {
  series: StorySeries;
  episode: StoryEpisode;
  allEpisodes: StoryEpisode[];
  prevEpisode?: StoryEpisode;
  nextEpisode?: StoryEpisode;
}

export default function ReaderEngine({
  series,
  episode,
  allEpisodes,
  prevEpisode,
  nextEpisode
}: ReaderEngineProps) {
  // Reader preferences state
  const [theme, setTheme] = useState<ReaderTheme>('dark');
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<ReaderFontFamily>('serif');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showChaptersDrawer, setShowChaptersDrawer] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  // Restore saved preferences from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('story_reader_theme') as ReaderTheme;
      if (savedTheme) setTheme(savedTheme);

      const savedSize = localStorage.getItem('story_reader_fontsize');
      if (savedSize) setFontSize(Number(savedSize));

      const savedFont = localStorage.getItem('story_reader_font') as ReaderFontFamily;
      if (savedFont) setFontFamily(savedFont);

      const savedBookmark = localStorage.getItem(`bookmark_${episode.id}`);
      if (savedBookmark) setBookmarked(true);
    } catch (e) {
      console.error(e);
    }
  }, [episode.id]);

  // Track scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeTheme = (newTheme: ReaderTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('story_reader_theme', newTheme);
    } catch (e) {}
  };

  const changeFontSize = (delta: number) => {
    setFontSize(prev => {
      const next = Math.min(26, Math.max(15, prev + delta));
      try {
        localStorage.setItem('story_reader_fontsize', String(next));
      } catch (e) {}
      return next;
    });
  };

  const toggleFontFamily = () => {
    setFontFamily(prev => {
      const next = prev === 'serif' ? 'sans' : 'serif';
      try {
        localStorage.setItem('story_reader_font', next);
      } catch (e) {}
      return next;
    });
  };

  const toggleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    try {
      if (next) {
        localStorage.setItem(`bookmark_${episode.id}`, 'true');
      } else {
        localStorage.removeItem(`bookmark_${episode.id}`);
      }
    } catch (e) {}
  };

  // Theme styling definitions
  const themeStyles = {
    dark: {
      pageBg: 'bg-[#0d131f]',
      text: 'text-[#e2e8f0]',
      cardBg: 'bg-[#141d2e]',
      border: 'border-[#1e2c45]',
      metaText: 'text-slate-400',
      divider: 'text-sky-500/60',
      strong: 'text-white font-semibold',
    },
    black: {
      pageBg: 'bg-[#000000]',
      text: 'text-[#d1d5db]',
      cardBg: 'bg-[#0c0c0c]',
      border: 'border-[#222222]',
      metaText: 'text-zinc-400',
      divider: 'text-zinc-600',
      strong: 'text-white font-semibold',
    },
    sepia: {
      pageBg: 'bg-[#f4ebd0]',
      text: 'text-[#2e261f]',
      cardBg: 'bg-[#ebe0c1]',
      border: 'border-[#d8ccaa]',
      metaText: 'text-[#6b5d4f]',
      divider: 'text-[#8b6f4e]',
      strong: 'text-[#1a140f] font-semibold',
    },
    light: {
      pageBg: 'bg-[#ffffff]',
      text: 'text-[#1e293b]',
      cardBg: 'bg-[#f8fafc]',
      border: 'border-[#e2e8f0]',
      metaText: 'text-slate-600',
      divider: 'text-blue-500/60',
      strong: 'text-slate-900 font-semibold',
    },
  }[theme];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeStyles.pageBg}`}>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800/40">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Floating Header Bar */}
      <nav className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${themeStyles.cardBg}/90 ${themeStyles.border}`}>
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          {/* Left: Back to series */}
          <Link
            href={`/series/${series.slug}`}
            className={`flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-80 ${themeStyles.metaText}`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{series.title}</span>
            <span className="sm:hidden">Series</span>
          </Link>

          {/* Center: Current Episode title */}
          <div className="text-center truncate px-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Episode {episode.episodeNumber}
            </span>
            <h2 className={`text-xs font-medium truncate ${themeStyles.text}`}>
              {episode.title}
            </h2>
          </div>

          {/* Right: Reader Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Chapter Drawer Toggle */}
            <button
              onClick={() => setShowChaptersDrawer(!showChaptersDrawer)}
              title="Chapter List"
              className={`rounded-lg p-2 transition hover:bg-slate-700/20 ${themeStyles.metaText}`}
            >
              <List className="h-4 w-4" />
            </button>

            {/* Bookmark button */}
            <button
              onClick={toggleBookmark}
              title={bookmarked ? 'Saved to bookmarks' : 'Bookmark this chapter'}
              className={`rounded-lg p-2 transition hover:bg-slate-700/20 ${
                bookmarked ? 'text-sky-400 fill-sky-400' : themeStyles.metaText
              }`}
            >
              <Bookmark className="h-4 w-4" />
            </button>

            {/* Typography & Theme Settings toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              title="Display & Font Settings"
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition hover:bg-slate-700/20 border ${themeStyles.border} ${themeStyles.text}`}
            >
              <Type className="h-3.5 w-3.5" />
              <span>Aa</span>
            </button>
          </div>
        </div>

        {/* Reader Customization Panel (Dropdown) */}
        {showSettings && (
          <div className={`border-t px-4 py-3 sm:px-6 transition-colors ${themeStyles.cardBg} ${themeStyles.border}`}>
            <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-between gap-4">
              {/* Theme Buttons */}
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-semibold mr-2 ${themeStyles.metaText}`}>Theme:</span>
                <button
                  onClick={() => changeTheme('dark')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium border ${
                    theme === 'dark' ? 'bg-sky-500 text-white border-sky-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => changeTheme('black')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium border ${
                    theme === 'black' ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-black text-zinc-400 border-zinc-800'
                  }`}
                >
                  OLED
                </button>
                <button
                  onClick={() => changeTheme('sepia')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium border ${
                    theme === 'sepia' ? 'bg-[#8b6f4e] text-white border-[#70583b]' : 'bg-[#f4ebd0] text-[#5c4a35] border-[#d8ccaa]'
                  }`}
                >
                  Sepia
                </button>
                <button
                  onClick={() => changeTheme('light')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium border ${
                    theme === 'light' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  Light
                </button>
              </div>

              {/* Font Size & Font Family */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-semibold mr-1 ${themeStyles.metaText}`}>Size:</span>
                  <button
                    onClick={() => changeFontSize(-1)}
                    className={`h-7 w-7 rounded-lg border text-xs font-bold transition hover:opacity-80 flex items-center justify-center ${themeStyles.border} ${themeStyles.text}`}
                  >
                    -
                  </button>
                  <span className={`w-8 text-center text-xs font-mono font-bold ${themeStyles.text}`}>
                    {fontSize}px
                  </span>
                  <button
                    onClick={() => changeFontSize(1)}
                    className={`h-7 w-7 rounded-lg border text-xs font-bold transition hover:opacity-80 flex items-center justify-center ${themeStyles.border} ${themeStyles.text}`}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={toggleFontFamily}
                  className={`rounded-lg border px-3 py-1 text-xs font-medium transition hover:opacity-80 ${themeStyles.border} ${themeStyles.text}`}
                >
                  {fontFamily === 'serif' ? 'Book Serif (Lora)' : 'Modern Sans (Outfit)'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chapters Drawer Modal */}
        {showChaptersDrawer && (
          <div className={`border-t px-4 py-4 sm:px-6 ${themeStyles.cardBg} ${themeStyles.border}`}>
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-bold uppercase tracking-wider ${themeStyles.text}`}>
                  {series.title} — Episode Index
                </h3>
                <button
                  onClick={() => setShowChaptersDrawer(false)}
                  className={`text-xs ${themeStyles.metaText} hover:underline`}
                >
                  Close ✕
                </button>
              </div>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {allEpisodes.map(ep => (
                  <Link
                    key={ep.id}
                    href={`/series/${series.slug}/${ep.slug}`}
                    onClick={() => setShowChaptersDrawer(false)}
                    className={`flex items-center justify-between rounded-lg p-2 text-xs transition ${
                      ep.slug === episode.slug
                        ? 'bg-sky-500/20 text-sky-400 font-bold border border-sky-500/30'
                        : `${themeStyles.text} hover:bg-slate-800/30`
                    }`}
                  >
                    <span>
                      Episode {ep.episodeNumber}: {ep.title}
                    </span>
                    <span className={themeStyles.metaText}>{ep.estimatedReadTime}m read</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Reading Canvas */}
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Episode Header */}
        <header className="mb-10 text-center">
          {/* Series badge */}
          <Link
            href={`/series/${series.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            {series.title.toUpperCase()} • SAGA
          </Link>

          {/* Episode Title */}
          <h1
            className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl ${
              fontFamily === 'serif' ? 'font-serif' : 'font-sans'
            } ${themeStyles.text}`}
          >
            Episode {episode.episodeNumber}: {episode.title}
          </h1>

          {/* Reading Meta Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className={`flex items-center gap-1 rounded-md px-2.5 py-1 ${themeStyles.cardBg} ${themeStyles.border} border ${themeStyles.metaText}`}>
              <Clock className="h-3.5 w-3.5" />
              {episode.estimatedReadTime} min read
            </span>
            <span className={`flex items-center gap-1 rounded-md px-2.5 py-1 ${themeStyles.cardBg} ${themeStyles.border} border ${themeStyles.metaText}`}>
              <AlignLeft className="h-3.5 w-3.5" />
              {episode.wordCount.toLocaleString()} words
            </span>
            <span className={`rounded-md px-2.5 py-1 ${themeStyles.cardBg} ${themeStyles.border} border ${themeStyles.metaText}`}>
              By {series.author.name}
            </span>
          </div>
        </header>

        {/* AI Concept Art / Episode Cover Image */}
        {episode.coverArt && (
          <figure className="mb-10 overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
            <img
              src={episode.coverArt}
              alt={episode.title}
              className="w-full h-auto object-cover max-h-[460px]"
            />
            {episode.coverCaption && (
              <figcaption className={`p-3 text-center text-xs italic ${themeStyles.cardBg} ${themeStyles.metaText} border-t ${themeStyles.border}`}>
                {episode.coverCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Story Body Paragraphs */}
        <article
          className={`space-y-6 leading-relaxed transition-all ${
            fontFamily === 'serif' ? 'font-serif' : 'font-sans'
          } ${themeStyles.text}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
        >
          {episode.paragraphs.map((p, idx) => {
            if (p === '---') {
              return (
                <div key={idx} className={`py-4 text-center text-lg tracking-[0.4em] select-none ${themeStyles.divider}`}>
                  ❖ ❖ ❖
                </div>
              );
            }

            // Inline Story Illustration Image Card
            if (p.startsWith('img:')) {
              const content = p.slice(4);
              const [src, caption, tag] = content.split('|');
              return (
                <figure
                  key={idx}
                  className="my-10 overflow-hidden rounded-2xl border border-slate-800/80 bg-black shadow-2xl transition-all duration-300 hover:border-slate-700"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <img
                      src={src ? src.trim() : ''}
                      alt={caption || 'Scene visual illustration'}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {tag && (
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider backdrop-blur-md border border-white/20">
                          {tag.trim()}
                        </span>
                      </div>
                    )}
                  </div>
                  {caption && (
                    <figcaption className={`px-4 py-3 text-center text-xs font-medium italic ${themeStyles.cardBg} ${themeStyles.metaText} border-t ${themeStyles.border}`}>
                      ✦ {caption.trim()}
                    </figcaption>
                  )}
                </figure>
              );
            }

            // Drop cap on first paragraph
            if (idx === 0) {
              return (
                <p key={idx} className="first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-sky-400 first-letter:leading-none">
                  {p}
                </p>
              );
            }

            return <p key={idx}>{p}</p>;
          })}
        </article>

        {/* Scene Separator */}
        <div className={`my-12 flex items-center justify-center gap-3 text-xs font-semibold tracking-widest uppercase ${themeStyles.divider}`}>
          <span>— END OF EPISODE {episode.episodeNumber} —</span>
        </div>

        {/* Author Note Card */}
        {episode.authorNote && (
          <div className={`mb-12 rounded-2xl border p-6 ${themeStyles.cardBg} ${themeStyles.border}`}>
            <div className="flex items-center gap-3 mb-2">
              <img
                src={series.author.avatar}
                alt={series.author.name}
                className="h-10 w-10 rounded-full object-cover border border-sky-500/40"
              />
              <div>
                <h4 className={`text-sm font-bold ${themeStyles.text}`}>Author&apos;s Note</h4>
                <p className={`text-xs ${themeStyles.metaText}`}>From {series.author.name}</p>
              </div>
            </div>
            <p className={`text-xs leading-relaxed mt-2 ${themeStyles.metaText}`}>
              {episode.authorNote}
            </p>
          </div>
        )}

        {/* Bottom Episode Navigation Buttons */}
        <nav className={`grid grid-cols-1 gap-3 sm:grid-cols-3 pt-6 border-t ${themeStyles.border}`}>
          {/* Previous Episode */}
          {prevEpisode ? (
            <Link
              href={`/series/${series.slug}/${prevEpisode.slug}`}
              className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-xs font-bold transition hover:border-sky-500 ${themeStyles.cardBg} ${themeStyles.border} ${themeStyles.text}`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Ep {prevEpisode.episodeNumber}: {prevEpisode.title}</span>
            </Link>
          ) : (
            <div
              className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-xs font-semibold opacity-40 cursor-not-allowed ${themeStyles.cardBg} ${themeStyles.border} ${themeStyles.metaText}`}
            >
              <span>First Episode</span>
            </div>
          )}

          {/* Series Index */}
          <Link
            href={`/series/${series.slug}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 p-3.5 text-xs font-bold text-slate-200 border border-slate-700 transition hover:bg-slate-800 hover:text-white"
          >
            <BookOpen className="h-4 w-4 text-sky-400" />
            <span>All Episodes</span>
          </Link>

          {/* Next Episode */}
          {nextEpisode ? (
            <Link
              href={`/series/${series.slug}/${nextEpisode.slug}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 p-3.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 transition hover:from-sky-400 hover:to-blue-500"
            >
              <span>Ep {nextEpisode.episodeNumber}: {nextEpisode.title}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <div
              className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-xs font-semibold opacity-70 ${themeStyles.cardBg} ${themeStyles.border} text-sky-400`}
            >
              <span>⚡ Episode 2: Coming Soon</span>
            </div>
          )}
        </nav>
      </main>
    </div>
  );
}
