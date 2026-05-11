import { useState } from 'react';
import { Github, ExternalLink, Info } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function Doily() {
  const [isInfoPinned, setIsInfoPinned] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const showInfo = isInfoPinned || isInfoHovered;

  const description =
    'A desktop painting application that mirrors brush strokes across up to 360 symmetrical sectors on the canvas. Users can adjust colours, brush widths, and the number of duplication sectors. Paintings can be saved as JPEG files and browsed in a built-in gallery. A "Crazy Colours" mode randomises the brush colour in a separate thread every 50ms for generative art effects.';

  const technologies = ['Java', 'Java Swing and AWT'];
  const slides = [
    { src: 'images/doily/circle.jpg', alt: 'circle' },
    { src: 'images/doily/many-zones.jpg', alt: 'many-zones' },
    { src: 'images/doily/reflection.jpg', alt: 'reflection' },
  ];

  return (
    <div>
      <section className="px-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg md:text-xl font-bold text-mauve">
            Draw/Export Doily Patterns
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
              href="https://github.com/SpasZahariev/Digital-Doily"
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

export default Doily;
