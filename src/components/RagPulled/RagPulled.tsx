import { useState } from 'react';
import { Github, ExternalLink, Info } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function RagPulled() {
  const [isInfoPinned, setIsInfoPinned] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const showInfo = isInfoPinned || isInfoHovered;

  const description = "An end-to-end Retrieval-Augmented Generation platform with document ingestion, semantic search, and AI-driven chat. Features an async worker queue on PostgreSQL for extracting, chunking, and embedding documents (PDF, CSV, TXT). Leverages local LLMs via Ollama for private, offline processing. The chat interface provides precise citations showing which document chunks and vector match percentages informed each answer.";

  const technologies = [
    "React", "TypeScript", "Hono API", "PostgreSQL", "Drizzle ORM",
    "Ollama", "Firebase Auth", "Docker", "Tailwind CSS", "Vite"
  ];
  const slides = [
    { src: "images/rag-pulled/home-page.png", alt: "home-page" },
    { src: "images/rag-pulled/upload-page.png", alt: "upload-page" },
    { src: "images/rag-pulled/chat-page.png", alt: "chat-page" },
  ];

  return (
    <div>
      <section className="px-4">
        <h4 className="text-pink text-sm font-semibold mb-1">RagPull WebApp</h4>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-subtext0">Fullstack RAG platform and AI chat</h3>
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
            <IconLink href="https://github.com/SpasZahariev/rag-pulled" target="_blank">
              <Github size={22} />
            </IconLink>
            <span className="text-surface1 cursor-not-allowed opacity-40" title="Website not available">
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
        <h2 className="text-sm font-semibold text-mauve mb-2">Utilised Tools:</h2>
        <div className="flex flex-wrap">
          {technologies.map((tech) => (
            <Chip key={tech} label={tech} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default RagPulled;
