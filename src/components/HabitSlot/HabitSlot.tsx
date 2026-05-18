import { useState } from 'react';
import { Github, ExternalLink, Info } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function HabitSlot() {
  const [isInfoPinned, setIsInfoPinned] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const showInfo = isInfoPinned || isInfoHovered;

  const description =
    'A gamified habit tracker that turns daily consistency into a slot-machine experience. Build streaks, spin the slots, and watch your habits multiply with visual rewards. Features a mobile-first design with smooth animations, local storage persistence for tracking progress, and an engaging UI that makes building good habits feel addictive.';

  const technologies = [
    'Rust',
    'Dioxus',
    'JavaScript',
    'Tailwind CSS',
    'SQLite',
    'Mobile Dev',
  ];
  const slides = [
    { src: 'images/habit-slot/home-page.png', alt: 'habit-tracker-home' },
    {
      src: 'images/habit-slot/slot-machine-page.png',
      alt: 'slot-machine-page',
    },
    { src: 'images/habit-slot/habit-details.png', alt: 'habit-details' },
    {
      src: 'images/habit-slot/three-remaining-pages.png',
      alt: 'additional-pages',
    },
  ];

  return (
    <div>
      <section className="px-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg md:text-xl font-bold text-mauve">
            Addictive Habit Tracker
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
              href="https://github.com/SpasZahariev/habit-slot"
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
          className="habit-slot-carousel"
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

export default HabitSlot;
