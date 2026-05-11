import { useState } from 'react';
import { Github, ExternalLink, Info } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function NqmeProject() {
  const [isInfoPinned, setIsInfoPinned] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const showInfo = isInfoPinned || isInfoHovered;

  const description =
    "A real-time shared music playlist web app. Multiple users create a room, add songs from YouTube, and have them play on the host's device. The playlist sorts itself in real time based on user likes. Rooms are joined via a 4-digit code. Built with a Python Flask + GraphQL backend communicating over Socket.IO for two-way real-time updates, and a React + TypeScript frontend hosted on AWS S3 with CloudFront.";

  const technologies = [
    'Python Flask',
    'GraphQL',
    'Docker',
    'React',
    'Typescript',
    'Redux',
    'SocketIO',
    'Heroku',
    'AWS S3',
    'AWS CloudFront',
  ];
  const slides = [
    { src: 'images/nqme/nqme-homepage.jpg', alt: 'nqme-homepage' },
    { src: 'images/nqme/room-with-songs.jpg', alt: 'room-with-songs' },
    { src: 'images/nqme/many-users.jpg', alt: 'many-users' },
  ];

  return (
    <div>
      <section className="px-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg md:text-xl font-bold text-mauve">
            Shared Music Player
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
              href="https://github.com/SpasZahariev/nqme-react"
              target="_blank"
            >
              <Github size={22} />
            </IconLink>
            <IconLink
              href="http://nqme.co.uk.s3-website.eu-west-2.amazonaws.com"
              target="_blank"
            >
              <ExternalLink size={22} />
            </IconLink>
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

export default NqmeProject;
