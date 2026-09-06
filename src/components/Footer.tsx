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
              Story Genres
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/stories?genre=Sci-Fi" className="transition hover:text-sky-400">
                  Science Fiction &amp; Dystopia
                </Link>
              </li>
              <li>
                <Link href="/stories?genre=Fantasy" className="transition hover:text-indigo-400">
                  Epic &amp; Dark Fantasy
                </Link>
              </li>
              <li>
                <Link href="/stories?genre=Horror" className="transition hover:text-rose-400">
                  Supernatural &amp; Horror
                </Link>
              </li>
              <li>
                <Link href="/stories?genre=Mystery" className="transition hover:text-amber-400">
                  Mystery &amp; Thriller
                </Link>
              </li>
            </ul>
          </div>

          {/* Flagship Series */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Flagship Series
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/series/cybo-rex" className="text-sky-400 font-medium transition hover:underline">
                  ⚡ Cybo-Rex (Debut Saga)
                </Link>
              </li>
              <li>
                <Link href="/series/the-shadow-realm" className="transition hover:text-slate-200">
                  The Shadow Realm (Coming)
                </Link>
              </li>
              <li>
                <Link href="/series/cyber-horizon-2099" className="transition hover:text-slate-200">
                  Cyber Horizon 2099 (Coming)
                </Link>
              </li>
              <li>
                <Link href="/series/the-whispering-hollow" className="transition hover:text-slate-200">
                  The Whispering Hollow (Coming)
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
