import { useState } from 'react';
import { Github, ExternalLink, Info } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function YearlySpend() {
  const [isInfoPinned, setIsInfoPinned] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const showInfo = isInfoPinned || isInfoHovered;

  const description =
    'A personal finance dashboard I built to track my own spending. It ingests raw CSV exports from Neon, Revolut, and Swisscard and normalizes every amount to CHF using monthly FX rates from Frankfurter, and categorizes each transaction with an LLM into a fixed 18-category taxonomy.';

  const technologies = [
    'Rust',
    'DuckDB',
    'Axum',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Recharts',
    'Vite',
    'Ollama / Gemini',
    'Frankfurter FX',
  ];
  const slides = [
    { src: 'images/yearly-spend/chat.png', alt: 'chat inspector' },
    { src: 'images/yearly-spend/dashboard.png', alt: 'yearly dashboard' },
    {
      src: 'images/yearly-spend/dashboard-month.png',
      alt: 'monthly dashboard',
    },
    { src: 'images/yearly-spend/transactions.png', alt: 'transactions table' },
    {
      src: 'images/yearly-spend/dashboard-ai.png',
      alt: 'AI-generated dashboard overlay',
    },
  ];

  return (
    <div>
      <section className="px-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg md:text-xl font-bold text-mauve">
            LLM Assisted Personal Finance
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
              href="https://github.com/SpasZahariev/yearly-spend"
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

export default YearlySpend;
