'use client';

import { useState, useEffect } from 'react';
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
  Rocket,
  RefreshCw,
  Server,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AvailableImage {
  name: string;
  path: string;
}

export default function StoryEditorPage() {
  const [activeTab, setActiveTab] = useState<'episode' | 'series'>('episode');
  const [copied, setCopied] = useState<boolean>(false);

  // Local Backend status
  const [serverOnline, setServerOnline] = useState<boolean>(false);
  const [availableImages, setAvailableImages] = useState<AvailableImage[]>([]);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

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
  const [selectedImg, setSelectedImg] = useState('');
  const [imgCaption, setImgCaption] = useState('');
  const [imgTag, setImgTag] = useState('');

  // Series Form State
  const [newSeriesTitle, setNewSeriesTitle] = useState('');
  const [newSeriesSlug, setNewSeriesSlug] = useState('');
  const [newSeriesTagline, setNewSeriesTagline] = useState('');
  const [newSeriesSynopsis, setNewSeriesSynopsis] = useState('');
  const [newSeriesCover, setNewSeriesCover] = useState('');
  const [newSeriesGenre, setNewSeriesGenre] = useState('Sci-Fi');

  // Check local backend status & fetch images on mount
  useEffect(() => {
    checkServerAndFetchImages();
  }, []);

  const checkServerAndFetchImages = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/status');
      if (res.ok) {
        setServerOnline(true);
        const imgRes = await fetch('http://localhost:4000/api/images');
        if (imgRes.ok) {
          const data = await imgRes.json();
          setAvailableImages(data.images || []);
        }
      } else {
        setServerOnline(false);
      }
    } catch (e) {
      setServerOnline(false);
    }
  };

  // Insert image shortcut into paragraphs text
  const insertImageTag = () => {
    if (!selectedImg) return;
    const formattedTag = `\n\nimg:${selectedImg}|${imgCaption || 'Scene Illustration'}|${imgTag || 'SCENE'}\n\n`;
    setParagraphsText(prev => prev + formattedTag);
    setSelectedImg('');
    setImgCaption('');
    setImgTag('');
  };

  // Generate clean slug from title
  const generateSlug = (title: string, epNum: number) => {
    const clean = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `episode-${epNum}-${clean || 'chapter'}`;
  };

  // Build the code export
  const buildEpisodeObject = () => {
    const slug = generateSlug(episodeTitle, episodeNumber);
    const paragraphs = paragraphsText
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    return {
      id: `${seriesSlug}-ep-${episodeNumber}`,
      slug: slug,
      seriesSlug: seriesSlug,
      episodeNumber: Number(episodeNumber),
      title: episodeTitle || 'Untitled Episode',
      publishedAt: new Date().toISOString().split('T')[0],
      coverArt: coverArt || undefined,
      coverCaption: coverCaption || undefined,
      estimatedReadTime: Math.max(1, Math.ceil(paragraphs.join(' ').split(/\s+/).length / 200)),
      wordCount: paragraphs.join(' ').split(/\s+/).length,
      summary: summary || 'Episode synopsis...',
      paragraphs: paragraphs,
      authorNote: authorNote || undefined
    };
  };

  // Save Episode to data file locally via server
  const handleSaveEpisode = async () => {
    if (!episodeTitle) {
      setStatusMessage({ type: 'error', text: 'Please enter an Episode Title first!' });
      return;
    }

    setIsSaving(true);
    setStatusMessage({ type: 'info', text: 'Saving episode to data files...' });

    try {
      const episodeData = buildEpisodeObject();
      const res = await fetch('http://localhost:4000/api/save-episode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(episodeData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      setStatusMessage({ 
        type: 'success', 
        text: `Episode saved locally! Now click the "Deploy to Git" button to push it live to the web.` 
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Save error: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  // Save Series to data file locally
  const handleSaveSeries = async () => {
    if (!newSeriesTitle || !newSeriesSlug) {
      setStatusMessage({ type: 'error', text: 'Please enter a Series Title and Slug!' });
      return;
    }

    setIsSaving(true);
    setStatusMessage({ type: 'info', text: 'Saving new series...' });

    try {
      const seriesObj = {
        id: `series-${newSeriesSlug}`,
        slug: newSeriesSlug,
        title: newSeriesTitle,
        tagline: newSeriesTagline,
        synopsis: newSeriesSynopsis,
        coverImage: newSeriesCover || `/images/cybo-rex/ep1-cover.jpg`,
        genre: newSeriesGenre,
        tags: [newSeriesGenre, 'Fiction']
      };

      const res = await fetch('http://localhost:4000/api/save-series', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seriesObj)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save series');

      setStatusMessage({ 
        type: 'success', 
        text: `Series saved! Click "Deploy to Git" to publish it live.` 
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Save error: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  // Deploy to Git & GitHub Pages
  const handleDeployToGit = async () => {
    setIsDeploying(true);
    setStatusMessage({ type: 'info', text: 'Pushing changes to GitHub repository... This will trigger GitHub Pages build.' });

    try {
      const commitMsg = activeTab === 'episode' 
        ? `Publish Episode ${episodeNumber}: ${episodeTitle || 'New Chapter'} via Studio`
        : `Publish Series ${newSeriesTitle || 'New Saga'} via Studio`;

      const res = await fetch('http://localhost:4000/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: commitMsg })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || 'Deploy failed');

      setStatusMessage({ 
        type: 'success', 
        text: `🎉 Successfully pushed to GitHub! GitHub Pages is building now. Your changes will be live in 1-2 minutes!` 
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Deploy failed: ${err.message}` });
    } finally {
      setIsDeploying(false);
    }
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
        {/* Top Server & Deploy Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className={`flex h-3.5 w-3.5 rounded-full ${serverOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Local Studio Engine:</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${serverOnline ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400'}`}>
                  {serverOnline ? 'ONLINE (Port 4000)' : 'OFFLINE HELPER'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {serverOnline 
                  ? 'Connected to local Git repo. You can Save and Deploy with 1 click without touching code.' 
                  : 'Run "node studio-server.js" to enable 1-Click Save & Git Deploy.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={checkServerAndFetchImages}
              className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition"
              title="Refresh connection & images"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            {/* ONE-CLICK DEPLOY BUTTON */}
            <button
              onClick={handleDeployToGit}
              disabled={isDeploying || !serverOnline}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shadow-lg transition-all ${
                serverOnline 
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white hover:scale-105 hover:shadow-emerald-500/30 cursor-pointer' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Rocket className={`h-4 w-4 ${isDeploying ? 'animate-spin' : ''}`} />
              <span>{isDeploying ? 'Deploying to Git...' : '🚀 DEPLOY TO GIT'}</span>
            </button>
          </div>
        </div>

        {/* Status Message Banner */}
        {statusMessage && (
          <div className={`mb-6 flex items-center gap-3 p-4 rounded-xl border text-xs font-medium ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
              : statusMessage.type === 'error'
              ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
              : 'bg-sky-950/60 border-sky-500/40 text-sky-300'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
            <span className="flex-1">{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white ml-2">✕</button>
          </div>
        )}

        {/* Editor Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              <span>OFFLINE CREATOR STUDIO</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl font-sans">
              Author Control Center
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Create episodes, attach scenes from your images folder, and publish straight to GitHub Pages.
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
                      placeholder="e.g. The Classified Descent"
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Choose from Scanned Images:</label>
                    <div className="flex gap-2">
                      <select
                        value={coverArt}
                        onChange={e => setCoverArt(e.target.value)}
                        className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                      >
                        <option value="">-- Select an Image from /public/images/ --</option>
                        {availableImages.map(img => (
                          <option key={img.path} value={img.path}>{img.name} ({img.path})</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Or custom: /images/cybo-rex/..."
                        value={coverArt}
                        onChange={e => setCoverArt(e.target.value)}
                        className="w-1/2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white font-mono focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Caption</label>
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

              {/* Story Body & Visual Image Inserter Tool */}
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

                {/* Visual Image Inserter Box */}
                <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-sky-300">
                    <span>🖼️ Attach Picture-Book Scene Illustration</span>
                    <span className="text-[11px] font-normal text-slate-400">Inserts between text paragraphs</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Select Image:</label>
                      <select
                        value={selectedImg}
                        onChange={e => setSelectedImg(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
                      >
                        <option value="">-- Choose Image from Folder --</option>
                        {availableImages.map(img => (
                          <option key={img.path} value={img.path}>{img.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Or Type Custom Path:</label>
                      <input
                        type="text"
                        placeholder="/images/cybo-rex/..."
                        value={selectedImg}
                        onChange={e => setSelectedImg(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Scene Caption..."
                      value={imgCaption}
                      onChange={e => setImgCaption(e.target.value)}
                      className="sm:col-span-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Tag (e.g. SCENE 01)"
                        value={imgTag}
                        onChange={e => setImgTag(e.target.value)}
                        className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-white focus:outline-none"
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
                    Story Paragraphs (Press Enter between paragraphs. Use &quot;---&quot; for dramatic scene break):
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

                {/* Save & Deploy Actions Card */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveEpisode}
                    disabled={isSaving || !serverOnline}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow-lg transition ${
                      serverOnline 
                        ? 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>{isSaving ? 'Saving Episode...' : '1. Save Episode to Site'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDeployToGit}
                    disabled={isDeploying || !serverOnline}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow-lg transition ${
                      serverOnline 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white cursor-pointer' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Rocket className={`h-4 w-4 ${isDeploying ? 'animate-spin' : ''}`} />
                    <span>{isDeploying ? 'Deploying to Git...' : '2. Deploy to Git (Live)'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Code Object & Direct Clipboard fallback */}
            <div className="lg:col-span-5 space-y-6">
              <div className="sticky top-20 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h3 className="text-sm font-bold text-white">Generated Episode Object</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(buildEpisodeObject(), null, 2))}
                    className="flex items-center gap-1.5 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-bold text-white shadow transition hover:bg-sky-400"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  {serverOnline 
                    ? 'Using the buttons on the left will automatically save and push this object to GitHub for you!' 
                    : 'You can copy this JSON object directly if working completely offline.'}
                </p>

                <pre className="mt-4 max-h-[460px] overflow-y-auto rounded-xl bg-slate-950 p-4 text-[11px] font-mono text-sky-200 leading-relaxed border border-slate-800">
                  {JSON.stringify(buildEpisodeObject(), null, 2)}
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

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Image Path (Optional)</label>
              <select
                value={newSeriesCover}
                onChange={e => setNewSeriesCover(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
              >
                <option value="">-- Choose from scanned images --</option>
                {availableImages.map(img => (
                  <option key={img.path} value={img.path}>{img.name}</option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveSeries}
                disabled={isSaving || !serverOnline}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow-lg transition ${
                  serverOnline 
                    ? 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                <span>{isSaving ? 'Saving...' : '1. Save Series'}</span>
              </button>

              <button
                type="button"
                onClick={handleDeployToGit}
                disabled={isDeploying || !serverOnline}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow-lg transition ${
                  serverOnline 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white cursor-pointer' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Rocket className="h-4 w-4" />
                <span>2. Deploy to Git</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
