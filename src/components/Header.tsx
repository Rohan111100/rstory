'use client';

import Link from 'next/link';
import { BookOpen, Sparkles, Compass, Library, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-md shadow-sky-500/20 transition-transform group-hover:scale-105">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              RStoryTime
              <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-400 border border-sky-500/20">
                ORIGINALS
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium -mt-1">
              Episodic Fiction &amp; Web Novels
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800/60 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/stories"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800/60 hover:text-white"
          >
            <Library className="h-4 w-4 text-sky-400" />
            All Stories
          </Link>
          <Link
            href="/stories?genre=Sci-Fi"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-sky-300"
          >
            🚀 Sci-Fi
          </Link>
          <Link
            href="/stories?genre=Fantasy"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-indigo-300"
          >
            ⚔️ Fantasy
          </Link>
          <Link
            href="/stories?genre=Horror"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-rose-300"
          >
            👁️ Horror
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/series/cybo-rex/episode-1-the-strange-phenomena"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-sky-500/25 transition-all hover:from-sky-400 hover:to-blue-500 hover:shadow-lg hover:shadow-sky-500/35"
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
            <span>Read Cybo-Rex</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
