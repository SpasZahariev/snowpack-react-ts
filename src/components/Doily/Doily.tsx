import { Github } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Doily() {
  const technologies = ["Java", "Java Swing and AWT"];

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
          </div>
        </div>
      </section>

      <div className="my-4">
        <Carousel autoPlay={false} showThumbs={false}>
          <img src="images/doily/circle.jpg" alt="circle" />
          <img src="images/doily/many-zones.jpg" alt="many-zones" />
          <img src="images/doily/reflection.jpg" alt="reflection" />
        </Carousel>
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
