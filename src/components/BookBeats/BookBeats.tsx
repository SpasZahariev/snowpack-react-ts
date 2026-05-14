import { useState } from 'react';
import { Github, ExternalLink, Info } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function BookBeats() {
  const [isInfoPinned, setIsInfoPinned] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const showInfo = isInfoPinned || isInfoHovered;

  const description =
    'A mobile app that turns your vibe, mood, or description into a real Spotify playlist — created directly in your account with AI-curated tracks. Describe any mood, genre blend, or activity, tap generate, and get a new playlist in your Spotify library. Features Spotify OAuth 2.0 authentication with secure token storage, REST API integration with both Spotify Web API and an AI backend, and cross-platform development with Flutter.';

  const technologies = ['Flutter', 'Dart', 'Spotify Web API', 'OAuth 2.0'];
  const slides = [
    { src: 'images/book-beats/book-beats.png', alt: 'book-beats-main' },
    {
      src: 'images/book-beats/generated-playlist.png',
      alt: 'generated-playlist',
    },
  ];

  return (
    <div>
      <section className="px-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg md:text-xl font-bold text-mauve">
            AI Generated Playlists
          </h3>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-text hover:text-pink transition-colors duration-200 cursor-pointer"
              onMouseEnter={() => setIsInfoHovered(true)}
              onMouseLeave={() => setIsInfoHovered(false)}
              onClick={() => setIsInfoPinned((prev) => !prev)}
              aria-label="Show project description"
            >
              <Info size={22} />
            </button>
            <IconLink
              href="https://github.com/SpasZahariev/book-beats-mobile"
              target="_blank"
            >
              <Github size={22} />
            </IconLink>
            <span
              className="text-surface1 cursor-not-allowed opacity-40"
              title="Website not available"
            >
              <ExternalLink size={22} />
            </span>
          </div>
        </div>
      </section>

      <div className="my-4">
        <EmblaCarousel
          slides={slides}
          description={description}
          showDescription={showInfo}
          onOverlayClick={() => setIsInfoPinned(false)}
        />
      </div>

      <section className="px-4 mt-4">
        <div className="flex flex-wrap">
          {technologies.map((tech) => (
            <Chip key={tech} label={tech} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookBeats;
