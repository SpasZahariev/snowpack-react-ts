import { useState, useRef, useEffect, useCallback } from 'react';
import NavBar from '../../components/navbar/navbar';
import FadeInSection from '../../components/common/FadeInSection/fadeInSection';
import NqmeProject from '../../components/NqmeProject/NqmeProject';
import ProjectManagement from '../../components/ProjectManagement/ProjectManagement';
import Doily from '../../components/Doily/Doily';
import OtherProjects from '../../components/OtherProjects/OtherProjects';
import { Button, IconLink } from '../../components/ui';
import { Info, Heart, Github, Linkedin, Instagram, Briefcase, Award, Wrench, Star } from 'lucide-react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function App() {
  const [isExperienceVisible, setIsExperienceVisible] = useState(false);
  const [isCertsVisible, setIsCertsVisible] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isNqmeVisible, setIsNqmeVisible] = useState(false);
  const [isProjectManagementVisible, setIsProjectManagementVisible] = useState(false);
  const [isDoilyVisible, setIsDoilyVisible] = useState(false);
  const [isOtherProjectsSectionVisible, setIsOtherProjectsSectionVisible] = useState(false);
  const [particlesInit, setParticlesInit] = useState(false);

  const homeRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Initialize particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);

  // Visibility handlers
  const handleVisualizeExperiencePermanently = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) setIsExperienceVisible(true);
  }, []);

  const handleVisualizeCertsPermanently = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) setIsCertsVisible(true);
  }, []);

  const handleVisualizeSkillsPermanently = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) setIsSkillsVisible(true);
  }, []);

  const handleVisualizeNqmePermanently = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) setIsNqmeVisible(true);
  }, []);

  const handleVisualizeProjectManagementPermanently = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) setIsProjectManagementVisible(true);
  }, []);

  const handleVisualizeDoilyPermanently = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) setIsDoilyVisible(true);
  }, []);

  const handleVisualizeOtherProjectsSectionPermanently = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) setIsOtherProjectsSectionVisible(true);
  }, []);

  // Scroll handlers
  const handleScrollToHome = useCallback(() => {
    homeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleScrollToExperience = useCallback(() => {
    experienceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleScrollToProjects = useCallback(() => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleScrollToContact = useCallback(() => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Catppuccin Macchiato particles configuration
  const particlesOptions = {
    background: { color: { value: "#24273a" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" as const },
        onHover: { enable: true, mode: "grab" as const }
      },
      modes: {
        push: { quantity: 4 },
        grab: { distance: 150 }
      }
    },
    particles: {
      color: { value: "#f5bde6" },
      links: { color: "#c6a0f6", distance: 150, enable: true, opacity: 0.5, width: 1 },
      move: { enable: true, speed: 0.1 },
      number: { density: { enable: true }, value: 80 },
      opacity: { value: 0.5 },
      shape: { type: "circle" as const },
      size: { value: { min: 1, max: 4 } }
    },
    detectRetina: true
  };

  return (
    <div>
      <NavBar
        handleHome={handleScrollToHome}
        handleExperience={handleScrollToExperience}
        handleProjects={handleScrollToProjects}
        handleContact={handleScrollToContact}
      />

      {particlesInit && (
        <Particles
          id="tsparticles"
          className="fixed inset-0 -z-10 hidden md:block"
          options={particlesOptions}
        />
      )}

      <div className="flex justify-center flex-col mx-auto px-2 md:px-32 lg:px-44 xl:px-56">
        <div className="bg-base z-0">
          {/* Introduction */}
          <section ref={homeRef} className="py-12 px-4">
            <h4 className="mt-14 mb-2 text-[1rem] text-pink">Hello there, I'm</h4>
            <h2 className="font-sans text-pink text-4xl mt-2 mb-4 font-bold">Spas Zahariev</h2>
            <p className="text-subtext0 leading-relaxed mb-4 max-w-2xl">
              I'm an engineering graduate from the <b className="text-mauve">University of Southampton</b> and my main strength is writing Java backend.
              At the moment I am a fullstack software engineer at <b className="text-mauve">JPMorgan Chase</b> where I've help my team build and maintain applications for tracking account liquidity.
            </p>
            <p className="text-subtext0 leading-relaxed mb-4 max-w-2xl">
              I like building cool things in my free time and coding gives me the freedom to do that without limits.
              I always strive to write clean, efficient code and constantly search for ways to improve my craft.
            </p>
            <Button variant="outline" href="mailto:spas.zah@gmail.com" className="mr-2">
              Reach Out
            </Button>
            <Button variant="outline" href="Spas-Zahariev-CV.pdf" target="_blank">
              My Resume
            </Button>
          </section>

          {/* Experience & Certifications Grid */}
          <div className="grid gap-8 xl:grid-cols-2 xl:gap-24">
            {/* Experience */}
            <section className="py-12 px-4">
              <FadeInSection isVisible={isExperienceVisible} handleVisualise={handleVisualizeExperiencePermanently}>
              <h3 className="text-pink text-2xl font-semibold mb-5 flex items-center gap-2">
                <Briefcase size={22} />
                Experience
              </h3>

                {[
                  { company: 'JPMorgan Chase', role: 'Software Engineer', period: 'Sep 2019 - Present' },
                  { company: 'JPMorgan Chase', role: 'Summer Software Intern', period: 'Jun 2018 - Sep 2018' },
                  { company: 'University of Southampton', role: 'First Class Honours BEng', period: 'Sep 2016 - May 2019' },
                  { company: 'Sofia High School of Mathematics', role: 'Student in an IT focused class', period: 'Sep 2011 - May 2016' }
                ].map((job, index, arr) => (
                  <div key={job.company + job.role} className={`flex justify-between ${index !== arr.length - 1 ? 'mb-8' : ''}`}>
                    <div className="grid">
                      <span className="text-mauve font-semibold">{job.company}</span>
                      <span className="mt-1 text-subtext1 font-light">{job.role}</span>
                    </div>
                    <div className="text-right text-subtext1 min-w-[145px]">
                      <span>{job.period}</span>
                    </div>
                  </div>
                ))}
              </FadeInSection>
            </section>

            {/* Certifications */}
            <section ref={experienceRef} className="py-12 px-4">
              <FadeInSection isVisible={isCertsVisible} handleVisualise={handleVisualizeCertsPermanently}>
              <h3 className="text-pink text-2xl font-semibold mb-5 flex items-center gap-2">
                <Award size={22} />
                Certifications
              </h3>

                {[
                  { name: 'Microsoft Azure AZ-900', date: 'Sep 2020', url: 'https://www.youracclaim.com/badges/ea3e55cb-5f9d-4c1c-8ef7-d28c8281f5eb?source=linked_in_profile' },
                  { name: 'Associate OCI Architect', date: 'Apr 2020', url: 'https://www.youracclaim.com/badges/5b76572c-312b-4428-a370-de3ffa891f2c' },
                  { name: 'Unity GameDev Course', date: 'Feb 2016', url: 'https://softuni.bg/certificates/details/9171/c5d27b52' }
                ].map((cert, index, arr) => (
                  <div key={cert.name} className={`flex justify-between items-center ${index !== arr.length - 1 ? 'mb-5' : ''}`}>
                    <div className="text-mauve font-semibold">{cert.name}</div>
                    <div className="text-right min-w-[145px]">
                      <Button variant="outline" href={cert.url} target="_blank" className="flex items-center gap-2">
                        <span>{cert.date}</span>
                        <Info size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </FadeInSection>
            </section>
          </div>

          {/* Skills */}
          <section className="py-12 px-4">
            <FadeInSection isVisible={isSkillsVisible} handleVisualise={handleVisualizeSkillsPermanently}>
              <h3 className="text-pink text-2xl font-semibold mb-5 flex items-center gap-2">
                <Wrench size={22} />
                Relevant Skills
              </h3>
              <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(120px,0.5fr))]">
                  <div>
                    <p className="text-xl text-mauve font-semibold mb-1">Languages</p>
                    <ul className="list-none p-0 text-subtext1">
                      {['Java', 'Python', 'Haskell', 'C#', 'C++', 'Rust', 'SQL', 'Bash', 'JavaScript', 'TypeScript', 'Css/Scss'].map(skill => (
                        <li key={skill} className="my-2">{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xl text-mauve font-semibold mb-1">Technologies</p>
                    <ul className="list-none p-0 text-subtext1">
                      {['Spring Boot', 'Kafka', 'Protobuf', 'Docker', 'Kubernetes', 'React', 'Angular', 'GraphQL', 'Flask', 'Flutter', 'Git'].map(skill => (
                        <li key={skill} className="my-2">{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(120px,0.5fr))]">
                  <div>
                    <p className="text-xl text-mauve font-semibold mb-1">Services</p>
                    <ul className="list-none p-0 text-subtext1">
                      {['Amazon Web Services', 'Google Cloud Engine', 'Heroku', 'DynamoDB', 'PostgresSQL', 'Oracle SQL Developer', 'Jenkins CI/CD', 'IBM Websphere MQ'].map(skill => (
                        <li key={skill} className="my-2">{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xl text-mauve font-semibold mb-1">Other</p>
                    <ul className="list-none p-0 text-subtext1">
                      {['Web Penetration Testing', 'Data wrangling', 'General Machine Learning', 'Mobile Game Development', 'Agile Methodologies', 'Scrum Master'].map(skill => (
                        <li key={skill} className="my-2">{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </section>

          {/* Projects */}
          <section className="py-12">
            {/* Nqme Project */}
            <section ref={projectsRef} className="pb-12">
              <FadeInSection isVisible={isNqmeVisible} handleVisualise={handleVisualizeNqmePermanently}>
                <h3 className="text-pink text-2xl font-semibold mb-5 px-4 flex items-center gap-2">
                  <Star size={22} />
                  Featured Projects
                </h3>
                <NqmeProject />
              </FadeInSection>
            </section>

            {/* Project Management */}
            <section className="py-12">
              <FadeInSection isVisible={isProjectManagementVisible} handleVisualise={handleVisualizeProjectManagementPermanently}>
                <ProjectManagement />
              </FadeInSection>
            </section>

            {/* Doily */}
            <section className="py-12">
              <FadeInSection isVisible={isDoilyVisible} handleVisualise={handleVisualizeDoilyPermanently}>
                <Doily />
              </FadeInSection>
            </section>

            {/* Other Projects */}
            <section className="py-12">
              <FadeInSection isVisible={isOtherProjectsSectionVisible} handleVisualise={handleVisualizeOtherProjectsSectionPermanently}>
                <OtherProjects />
              </FadeInSection>
            </section>
          </section>

          {/* Contact */}
          <section ref={contactRef} className="py-12 px-4 text-center">
            <span className="text-lg text-text">
              Built with <Heart size={18} className="inline mx-1 text-pink" /> by Spas Zahariev
            </span>
            <p className="mt-4 text-subtext0">
              Feel free to reach out via: <b className="text-mauve">
                <a href="mailto:spas.zah@gmail.com" className="no-underline text-pink hover:text-mauve">
                  spas.zah@gmail.com
                </a>
              </b>
            </p>
            <p className="text-subtext0">UK mobile: <b className="text-mauve">07784239930</b></p>
            <div className="mt-8 flex justify-center gap-5">
              <IconLink href="https://github.com/SpasZahariev" target="_blank">
                <Github size={28} />
              </IconLink>
              <IconLink href="https://www.linkedin.com/in/spaszahariev/" target="_blank">
                <Linkedin size={28} />
              </IconLink>
              <IconLink href="https://www.instagram.com/spas_zah/" target="_blank">
                <Instagram size={28} />
              </IconLink>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
