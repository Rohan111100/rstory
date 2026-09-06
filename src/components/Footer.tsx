import Link from 'next/link';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-sans text-lg font-bold text-white">
                RStoryTime
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              An independent home for original web novels, speculative science fiction, dark fantasy sagas, and illustrated episodic literature. Built for readers who love immersive storytelling.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span>Monetized with Google AdSense</span>
              <span>•</span>
              <span className="font-mono text-[11px] text-slate-400">pub-1478435776297056</span>
            </div>
          </div>

          {/* Stories Directory */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="transition hover:text-sky-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/stories" className="transition hover:text-sky-400">
                  Story Directory
                </Link>
              </li>
              <li>
                <Link href="/series/cybo-rex" className="transition hover:text-sky-400">
                  Cybo-Rex Sagas
                </Link>
              </li>
            </ul>
          </div>

          {/* Flagship Series */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Original Sagas
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/series/cybo-rex" className="text-sky-400 font-medium transition hover:underline">
                  ⚡ Cybo-Rex (Episode 1 Live)
                </Link>
              </li>
              <li>
                <Link href="/series/cybo-rex/episode-1-the-strange-phenomena" className="transition hover:text-slate-200">
                  Episode 1: The Strange Phenomena
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 sm:flex-row text-xs text-slate-400">
          <p>© {new Date().getFullYear()} RStoryTime. All rights reserved. Original fiction.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for true readers</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500 mx-1" />
            <span>by Rohan Parmar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
