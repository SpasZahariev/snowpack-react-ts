import { Github } from 'lucide-react';
import { IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function OtherProjects() {
  const slides = [
    { src: "images/other/new-york.jpg", alt: "new-york" },
    { src: "images/other/board-with-obstacles.png", alt: "board-with-obstacles" },
    { src: "images/other/score-0.png", alt: "tetris" },
  ];
  return (
    <div>
      <section className="px-4">
        <h4 className="text-pink text-sm font-semibold mb-1">Github Projects</h4>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-mauve">Check out more</h3>
          <div className="flex items-center gap-4">
            <IconLink href="https://github.com/SpasZahariev/" target="_blank">
              <Github size={22} />
            </IconLink>
          </div>
        </div>
      </section>

      <div className="my-4">
        <EmblaCarousel slides={slides} />
      </div>
    </div>
  );
}

export default OtherProjects;
