import { Github, ExternalLink } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function RagPulled() {
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
          <h3 className="text-xl md:text-2xl font-bold text-mauve">Fullstack RAG platform and AI chat</h3>
          <div className="flex items-center gap-4">
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
        <EmblaCarousel slides={slides} />
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
