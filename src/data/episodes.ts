import { StoryEpisode } from '../types/story';

const prefix = process.env.NODE_ENV === 'production' ? '/rstory' : '';

export const ALL_EPISODES: StoryEpisode[] = [
  {
    id: 'cybo-rex-ep-1',
    slug: 'episode-1-the-strange-phenomena',
    seriesSlug: 'cybo-rex',
    episodeNumber: 1,
    title: 'The Strange Phenomena',
    publishedAt: '2026-09-06',
    coverArt: `${prefix}/images/cybo-rex/ep1-cover.png`,
    coverCaption: 'Scientific research teams and scanner drones examine the impossible temporal void inside The Eclipsed Wilds.',
    estimatedReadTime: 5,
    wordCount: 850,
    summary: 'In the year 3000, humanity built a paradise on Luminar by harvesting the Sun. But when a massive section of the sacred Eclipsed Wilds vanishes without trace, intern John William Hardly is pulled into a clandestine presidential meeting.',
    paragraphs: [
      "In the year 3000, humanity had achieved almost everything.",
      "Our world, known as Luminar, had advanced into a Type III civilization. Through incredible technology, we could harness nearly 100% of the energy produced by our Sun and use it to power our cities, industries, and scientific discoveries.",
      "Luminar had become cleaner and more beautiful than ever before. We could remove carbon dioxide from the atmosphere and convert it back into oxygen. Pollution was no longer a threat, and many of the problems that had troubled earlier generations had been solved.",
      "The only thing we still could not fully control was time itself.",
      `img:${prefix}/images/cybo-rex/luminar-city-bw.png|Luminar in the year 3000 — A Type III civilization powered by solar orbital rings and aerotransit networks.|LUMINAR 3000`,
      "---",
      "My name is John William Hardly.",
      "At the time, I was an intern at a secret government facility that developed advanced weapons and technologies. Our director was a brilliant scientist and teacher who inspired everyone around him.",
      "He believed that technology was both humanity's greatest strength and its greatest danger.",
      "While technology had transformed Luminar into a paradise, it had also increased humanity's desire for power. He often warned us that greed could push people to misuse technology. If that ever happened, humanity could become the cause of its own destruction.",
      "His name was Dr. Victor Arclight.",
      `img:${prefix}/images/cybo-rex/secret-lab-bw.png|Dr. Victor Arclight's Classified Facility — Advanced weapons and temporal research deep beneath Luminar.|ARCLIGHT LAB`,
      "---",
      "Life on Luminar was peaceful until a mysterious event changed everything.",
      "One midnight, a massive and unexplained blast occurred in the famous forest known as The Eclipsed Wilds. The forest covered nearly ten million square feet and was one of the most important natural regions on the planet.",
      "When scientists arrived at the scene, they discovered something impossible.",
      "Nearly five hundred thousand square feet of the jungle had vanished completely.",
      "There were no fallen trees, no ashes, no crater, and no signs of destruction.",
      "It was as if that entire section of the forest had never existed.",
      `img:${prefix}/images/cybo-rex/eclipsed-wilds-bw.png|The Eclipsed Wilds Incident — Research drones and scientists scan the impossible temporal void.|THE ANOMALY`,
      "The news spread across Luminar within hours. Scientists, researchers, and experts from all over the planet rushed to The Eclipsed Wilds. Advanced scanners, drones, and research teams were deployed to investigate the area.",
      "No one knew what had happened. Some believed it was a natural phenomenon, while others suspected an experiment had gone wrong. Humanity had suddenly found itself facing one of the greatest mysteries in its history.",
      "---",
      "I still remember that day clearly. It was a Friday, and the President of Luminar was hosting a grand celebration at his residence. Almost every important scientist, military commander, and government official had been invited.",
      "Before I continue, I should introduce another important person.",
      "Dr. Marcus Veyron was Professor Arclight's chief assistant. He was thirty-five years old, brilliant, ambitious, and respected throughout the scientific community. I was twenty-two at the time, while Professor Arclight was fifty-six.",
      "Our entire laboratory team attended the celebration. There were twenty-four of us in total, including Professor Arclight, Dr. Veyron, and me.",
      "The party was magnificent. Music filled the halls, holographic displays illuminated the sky, and guests discussed the mysterious incident in The Eclipsed Wilds. Yet beneath the celebration, there was a sense of unease.",
      "Everyone was thinking about the vanished forest.",
      `img:${prefix}/images/cybo-rex/presidential-gala-bw.png|The Grand Presidential Gala — Officials and scientists gather under holographic displays amidst rising unease.|THE CELEBRATION`,
      "---",
      "Hours later, after most of the guests had left, the President approached our group.",
      "\"Professor Arclight,\" he said quietly, \"I need to speak with you regarding the incident. In private.\"",
      "The Professor nodded. To my surprise, Dr. Marcus Veyron stepped forward as well.",
      "\"I'll accompany you, Professor.\"",
      "The President agreed. Then something unexpected happened.",
      "Professor Arclight turned toward me.",
      "\"John, you're coming too.\"",
      "For a moment, I thought I had misheard him.",
      "\"Me, sir?\" I asked.",
      "\"Yes, John. I want you there.\"",
      "My heart began to race. I was only an intern. Why would the President of Luminar want me present during a confidential meeting?",
      "As we followed the President through a secured corridor deep beneath the residence, I had no idea that the conversation awaiting us would change the future of humanity forever.",
      `img:${prefix}/images/cybo-rex/subterranean-corridor-bw.png|The Classified Descent — The President leads Dr. Arclight, Dr. Veyron, and intern John William Hardly into the subterranean bunker.|CLASSIFIED DESCENT`
    ],
    authorNote: "Thank you for reading Episode 1 of Cybo-Rex! Episode 2 will reveal what lies within the confidential presidential bunker and the truth of the anomaly. Subscribe and follow for new releases every week."
  }
];

export function getEpisodesBySeries(seriesSlug: string): StoryEpisode[] {
  return ALL_EPISODES.filter(e => e.seriesSlug === seriesSlug).sort((a, b) => a.episodeNumber - b.episodeNumber);
}

export function getEpisode(seriesSlug: string, episodeSlug: string): StoryEpisode | undefined {
  return ALL_EPISODES.find(e => e.seriesSlug === seriesSlug && e.slug === episodeSlug);
}

export function getAdjacentEpisodes(seriesSlug: string, currentEpisodeNumber: number) {
  const seriesEpisodes = getEpisodesBySeries(seriesSlug);
  const prev = seriesEpisodes.find(e => e.episodeNumber === currentEpisodeNumber - 1);
  const next = seriesEpisodes.find(e => e.episodeNumber === currentEpisodeNumber + 1);
  return { prev, next, total: seriesEpisodes.length };
}
