'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  Plus, 
  Image as ImageIcon, 
  BookOpen, 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  Eye, 
  FileText, 
  FolderPlus,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function StoryEditorPage() {
  const [activeTab, setActiveTab] = useState<'episode' | 'series'>('episode');
  const [copied, setCopied] = useState<boolean>(false);

  // Episode Form State
  const [seriesSlug, setSeriesSlug] = useState('cybo-rex');
  const [episodeNumber, setEpisodeNumber] = useState(2);
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [coverArt, setCoverArt] = useState('');
  const [coverCaption, setCoverCaption] = useState('');
  const [paragraphsText, setParagraphsText] = useState('');
  const [authorNote, setAuthorNote] = useState('Thank you for reading this episode! Subscribe and follow for new releases every week.');

  // Image Helper state inside paragraph builder
  const [imgSrc, setImgSrc] = useState('');
  const [imgCaption, setImgCaption] = useState('');
  const [imgTag, setImgTag] = useState('');

  // Series Form State
  const [newSeriesTitle, setNewSeriesTitle] = useState('');
  const [newSeriesSlug, setNewSeriesSlug] = useState('');
  const [newSeriesTagline, setNewSeriesTagline] = useState('');
  const [newSeriesSynopsis, setNewSeriesSynopsis] = useState('');
  const [newSeriesCover, setNewSeriesCover] = useState('');
  const [newSeriesGenre, setNewSeriesGenre] = useState('Sci-Fi');

  // Insert image shortcut into paragraphs text
  const insertImageTag = () => {
    if (!imgSrc) return;
    const formattedTag = `\n\nimg:${imgSrc}|${imgCaption || 'Scene Illustration'}|${imgTag || 'SCENE'}\n\n`;
    setParagraphsText(prev => prev + formattedTag);
    setImgSrc('');
    setImgCaption('');
    setImgTag('');
  };

  // Generate clean slug from title
  const generateSlug = (title: string, epNum: number) => {
    const clean = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `episode-${epNum}-${clean || 'chapter'}`;
  };

  // Build the code export
  const buildEpisodeCode = () => {
    const slug = generateSlug(episodeTitle, episodeNumber);
    const paragraphs = paragraphsText
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const codeObj = {
      id: `${seriesSlug}-ep-${episodeNumber}`,
      slug: slug,
      seriesSlug: seriesSlug,
      episodeNumber: Number(episodeNumber),
      title: episodeTitle || 'Untitled Episode',
      publishedAt: new Date().toISOString().split('T')[0],
      coverArt: coverArt ? `\${prefix}${coverArt}` : undefined,
      coverCaption: coverCaption || undefined,
      estimatedReadTime: Math.max(1, Math.ceil(paragraphs.join(' ').split(/\s+/).length / 200)),
      wordCount: paragraphs.join(' ').split(/\s+/).length,
      summary: summary || 'Episode synopsis...',
      paragraphs: paragraphs,
      authorNote: authorNote || undefined
    };

    return JSON.stringify(codeObj, null, 2);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Editor Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              <span>CREATOR STUDIO &amp; CMS</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl font-sans">
              Author Story Studio
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Create new episodes, attach scene illustrations, write author notes, and preview before publishing.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('episode')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'episode'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>New Episode</span>
            </button>
            <button
              onClick={() => setActiveTab('series')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'series'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderPlus className="h-4 w-4" />
              <span>New Saga / Series</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB 1: EPISODE EDITOR
            ======================================================== */}
        {activeTab === 'episode' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Input Form */}
            <div className="lg:col-span-7 space-y-6">
              {/* Basic Details Card */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-sky-400" />
                  <span>Episode Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Series Slug</label>
                    <input
                      type="text"
                      value={seriesSlug}
                      onChange={e => setSeriesSlug(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Episode #</label>
                    <input
                      type="number"
                      value={episodeNumber}
                      onChange={e => setEpisodeNumber(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Episode Title</label>
                    <input
                      type="text"
                      placeholder="e.g. The Quantum Breach"
                      value={episodeTitle}
                      onChange={e => setEpisodeTitle(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Summary (1-2 sentences)</label>
                  <textarea
                    rows={2}
                    placeholder="Brief logline explaining what happens in this episode..."
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Episode Cover Artwork */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-emerald-400" />
                  <span>Episode Header Cover (Optional)</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Image Relative Path</label>
                    <input
                      type="text"
                      placeholder="/images/cybo-rex/ep2-cover.jpg"
                      value={coverArt}
                      onChange={e => setCoverArt(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white font-mono focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Image Caption</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Victor Arclight inspects the temporal fissure."
                      value={coverCaption}
                      onChange={e => setCoverCaption(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Story Body & Image Inserter Tool */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-sky-400" />
                    <span>Story Content &amp; In-Between Illustrations</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {paragraphsText.split('\n').filter(p => p.trim()).length} blocks
                  </span>
                </div>

                {/* Quick Scene Image Insert Helper */}
                <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-sky-300">
                    <span>🖼️ Quick Attach Scene Illustration</span>
                    <span className="text-[11px] font-normal text-slate-400">Inserts formatted tag between paragraphs</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Image Path: /images/cybo-rex/scene-1.jpg"
                      value={imgSrc}
                      onChange={e => setImgSrc(e.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Scene Caption..."
                      value={imgCaption}
                      onChange={e => setImgCaption(e.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Tag (e.g. SCENE 01)"
                        value={imgTag}
                        onChange={e => setImgTag(e.target.value)}
                        className="w-28 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={insertImageTag}
                        className="flex-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-sky-400"
                      >
                        Insert ✦
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Paragraphs Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Story Paragraphs (Separate each paragraph with an Enter key. Use &quot;---&quot; for scene divider):
                  </label>
                  <textarea
                    rows={14}
                    placeholder="In the year 3000, humanity had achieved almost everything...&#10;&#10;img:/images/cybo-rex/luminar-city-bw.jpg|Luminar in 3000|LUMINAR 3000&#10;&#10;---&#10;&#10;My name is John William Hardly..."
                    value={paragraphsText}
                    onChange={e => setParagraphsText(e.target.value)}
                    className="w-full font-serif rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-relaxed text-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                {/* Author Note */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Author&apos;s Note (End of chapter):</label>
                  <input
                    type="text"
                    value={authorNote}
                    onChange={e => setAuthorNote(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right: Live Preview & Ready-To-Publish Code Box */}
            <div className="lg:col-span-5 space-y-6">
              {/* Ready to Publish Code Box */}
              <div className="sticky top-20 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h3 className="text-sm font-bold text-white">Generated Episode Object</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(buildEpisodeCode())}
                    className="flex items-center gap-1.5 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-bold text-white shadow transition hover:bg-sky-400"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Simply copy this object and paste it into <code className="text-sky-300 font-mono">src/data/episodes.ts</code> or share it with the assistant to publish instantly!
                </p>

                <pre className="mt-4 max-h-[460px] overflow-y-auto rounded-xl bg-slate-950 p-4 text-[11px] font-mono text-sky-200 leading-relaxed border border-slate-800">
                  {buildEpisodeCode()}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: NEW SERIES BUILDER
            ======================================================== */}
        {activeTab === 'series' && (
          <div className="mt-8 max-w-2xl mx-auto rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderPlus className="h-4 w-4 text-indigo-400" />
              <span>Launch a New Saga or Series</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Series Title</label>
              <input
                type="text"
                placeholder="e.g. Cyber Horizon 3000"
                value={newSeriesTitle}
                onChange={e => {
                  setNewSeriesTitle(e.target.value);
                  setNewSeriesSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Slug URL</label>
                <input
                  type="text"
                  value={newSeriesSlug}
                  onChange={e => setNewSeriesSlug(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white font-mono focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Genre</label>
                <select
                  value={newSeriesGenre}
                  onChange={e => setNewSeriesGenre(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Catchy Tagline</label>
              <input
                type="text"
                placeholder="e.g. When humanity conquered the stars..."
                value={newSeriesTagline}
                onChange={e => setNewSeriesTagline(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Synopsis</label>
              <textarea
                rows={4}
                placeholder="Full series premise and world synopsis..."
                value={newSeriesSynopsis}
                onChange={e => setNewSeriesSynopsis(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const seriesObj = {
                    id: `series-${newSeriesSlug}`,
                    slug: newSeriesSlug,
                    title: newSeriesTitle,
                    tagline: newSeriesTagline,
                    synopsis: newSeriesSynopsis,
                    coverImage: `\${prefix}/images/${newSeriesSlug}/cover.jpg`,
                    bannerImage: `\${prefix}/images/${newSeriesSlug}/cover.jpg`,
                    genre: newSeriesGenre,
                    tags: [newSeriesGenre, 'Fiction'],
                    status: 'Ongoing',
                    author: {
                      name: 'Rohan Parmar',
                      role: 'Creator & Lead Writer',
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                      bio: 'Author of futuristic sagas, speculative fiction, and rich episodic web novels.'
                    },
                    featured: true,
                    rating: 5.0,
                    totalViews: '1.2K',
                    releaseSchedule: 'New episode every week',
                    episodesCount: 0
                  };
                  copyToClipboard(JSON.stringify(seriesObj, null, 2));
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg transition hover:from-sky-400 hover:to-indigo-500"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied Series Object!' : 'Generate & Copy Series Template'}</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
