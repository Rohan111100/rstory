'use client';

interface AdSenseBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export default function AdSenseBanner({
  slot = '1234567890',
  format = 'auto',
  className = ''
}: AdSenseBannerProps) {
  return (
    <div className={`my-8 w-full overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 text-center ${className}`}>
      <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
        Advertisement
      </span>
      {/* Real AdSense Ins tag */}
      <div className="flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-slate-800 bg-slate-950/60 p-4">
        <div className="flex flex-col items-center gap-1 text-xs text-slate-400">
          <span className="font-semibold text-slate-400">Google AdSense Partner Unit</span>
          <span className="font-mono text-[10px] text-slate-400">ca-pub-1478435776297056</span>
        </div>
      </div>
    </div>
  );
}
