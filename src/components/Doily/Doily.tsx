import { Github, ExternalLink } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function Doily() {
  const technologies = ["Java", "Java Swing and AWT"];
  const slides = [
    { src: "images/doily/circle.jpg", alt: "circle" },
    { src: "images/doily/many-zones.jpg", alt: "many-zones" },
    { src: "images/doily/reflection.jpg", alt: "reflection" },
  ];

  return (
    <div>
      <section className="px-4">
        <h4 className="text-pink text-sm font-semibold mb-1">Java Painting Application</h4>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-mauve">Mirrors your drawing in symmetrical sectors</h3>
          <div className="flex items-center gap-4">
            <IconLink href="https://github.com/SpasZahariev/Digital-Doily" target="_blank">
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

export default Doily;
