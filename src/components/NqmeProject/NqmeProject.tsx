import { Github, ExternalLink } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function NqmeProject() {
  const technologies = [
    "Python Flask", "GraphQL", "Docker", "React", "Typescript",
    "Redux", "SocketIO", "Heroku", "AWS S3", "AWS CloudFront"
  ];
  const slides = [
    { src: "images/nqme/nqme-homepage.jpg", alt: "nqme-homepage" },
    { src: "images/nqme/room-with-songs.jpg", alt: "room-with-songs" },
    { src: "images/nqme/many-users.jpg", alt: "many-users" },
  ];

  return (
    <div>
      <section className="px-4">
        <h4 className="text-pink text-sm font-semibold mb-1">Nqme website</h4>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-mauve">Shared Music Player</h3>
          <div className="flex items-center gap-4">
            <IconLink href="https://github.com/SpasZahariev/nqme-react" target="_blank">
              <Github size={22} />
            </IconLink>
            <IconLink href="http://nqme.co.uk.s3-website.eu-west-2.amazonaws.com" target="_blank">
              <ExternalLink size={22} />
            </IconLink>
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

export default NqmeProject;
