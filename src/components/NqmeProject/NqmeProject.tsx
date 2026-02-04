import { Github, ExternalLink } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function NqmeProject() {
  const technologies = [
    "Python Flask", "GraphQL", "Docker", "React", "Typescript",
    "Redux", "SocketIO", "Heroku", "AWS S3", "AWS CloudFront"
  ];

  return (
    <div>
      <section className="px-4">
        <h4 className="text-very-blue text-sm font-semibold mb-1">Nqme website</h4>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-dark-blue">Shared Music Player</h3>
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
        <Carousel autoPlay={false} showThumbs={false}>
          <img src="images/nqme/nqme-homepage.jpg" alt="nqme-homepage" />
          <img src="images/nqme/room-with-songs.jpg" alt="room-with-songs" />
          <img src="images/nqme/many-users.jpg" alt="many-users" />
        </Carousel>
      </div>

      <section className="px-4 mt-4">
        <h2 className="text-sm font-semibold text-dark-blue mb-2">Utilised Tools:</h2>
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
