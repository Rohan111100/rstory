import type { Metadata } from 'next';
import { Outfit, Lora } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RStoryTime | Original Episodic Fiction & Web Novels',
  description: 'Immerse yourself in original speculative fiction, sci-fi sagas like Cybo-Rex, and dark fantasy web novels illustrated with AI art.',
  authors: [{ name: 'Rohan Parmar' }],
  keywords: ['Cybo-Rex', 'Sci-Fi web novel', 'episodic fiction', 'fiction platform', 'web novels'],
  openGraph: {
    title: 'RStoryTime | Original Episodic Fiction & Web Novels',
    description: 'Immerse yourself in original speculative fiction, sci-fi sagas like Cybo-Rex, and dark fantasy web novels illustrated with AI art.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${lora.variable} dark h-full antialiased`}
    >
      <head>
        {/* Google AdSense Verification & Auto Ads */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1478435776297056"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
