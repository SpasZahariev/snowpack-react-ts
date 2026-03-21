import { useState } from 'react';
import { Github, ExternalLink, Info } from 'lucide-react';
import { Chip, IconLink } from '../ui';
import EmblaCarousel from '../common/EmblaCarousel/EmblaCarousel';

function ProjectManagement() {
  const [isInfoPinned, setIsInfoPinned] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const showInfo = isInfoPinned || isInfoHovered;

  const description = "A serverless project management platform for organising developers and projects. Users register and confirm via verification email, then receive role-based access (Developer, Manager, Admin). Managers create projects and assign team members. Features include a dashboard with filtering, user profiles showing project involvement, and in-app email composition via SendGrid. Fully serverless on AWS using Lambda, DynamoDB, Cognito, and S3.";

  const technologies = [
    "AWS DynamoDB", "AWS S3", "AWS Lambda", "AWS Cognito",
    "Angular", "SendGrid", "Typescript"
  ];
  const slides = [
    { src: "images/cloud-app-dev/user-info.jpg", alt: "user-info" },
    { src: "images/cloud-app-dev/project-dashboard.jpg", alt: "project-dashboard" },
    { src: "images/cloud-app-dev/compose-email.jpg", alt: "compose-email" },
    { src: "images/cloud-app-dev/login-screen.jpg", alt: "login-screen" },
  ];

  return (
    <div>
      <section className="px-4">
        <h4 className="text-pink text-sm font-semibold mb-1">Project Tracking Website</h4>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-subtext0">Assign tasks to users</h3>
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
            <IconLink href="https://github.com/SpasZahariev/CAD-SpasZahariev" target="_blank">
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

export default ProjectManagement;
