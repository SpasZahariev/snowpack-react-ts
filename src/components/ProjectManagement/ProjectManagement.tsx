import { Github, ExternalLink } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ProjectManagement() {
  const technologies = [
    "AWS DynamoDB", "AWS S3", "AWS Lambda", "AWS Cognito",
    "Angular", "SendGrid", "Typescript"
  ];

  return (
    <div>
      <section className="px-4">
        <h4 className="text-pink text-sm font-semibold mb-1">Project Tracking Website</h4>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-mauve">Assign tasks to users</h3>
          <div className="flex items-center gap-4">
            <IconLink href="https://github.com/SpasZahariev/CAD-SpasZahariev" target="_blank">
              <Github size={22} />
            </IconLink>
            <IconLink href="http://spas-zahariev.cad.s3-website.eu-west-1.amazonaws.com/" target="_blank">
              <ExternalLink size={22} />
            </IconLink>
          </div>
        </div>
      </section>

      <div className="my-4">
        <Carousel autoPlay={false} showThumbs={false}>
          <img src="images/cloud-app-dev/user-info.jpg" alt="user-info" />
          <img src="images/cloud-app-dev/project-dashboard.jpg" alt="project-dashboard" />
          <img src="images/cloud-app-dev/compose-email.jpg" alt="compose-email" />
          <img src="images/cloud-app-dev/login-screen.jpg" alt="login-screen" />
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

export default ProjectManagement;
