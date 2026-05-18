import { useState, useRef, useEffect, useCallback, memo } from 'react';
import NavBar from '../../components/navbar/navbar';
import FadeInSection from '../../components/common/FadeInSection/fadeInSection';
import RagPulled from '../../components/RagPulled/RagPulled';
import NqmeProject from '../../components/NqmeProject/NqmeProject';
import BookBeats from '../../components/BookBeats/BookBeats';
import ProjectManagement from '../../components/ProjectManagement/ProjectManagement';
import Doily from '../../components/Doily/Doily';
import OtherProjects from '../../components/OtherProjects/OtherProjects';
import { Button, IconLink, Chip } from '../../components/ui';
import {
  Heart,
  Github,
  Linkedin,
  Mail,
  Phone,
  Briefcase,
  Award,
  Wrench,
  Star,
  MapPin,
  ChevronDown,
  Download,
} from 'lucide-react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  achievements?: string[];
}

const EXPERIENCE_JOBS: ExperienceEntry[] = [
  {
    company: 'EPAM Systems',
    role: 'Software Engineer Lead',
    period: 'Dec 2024 - Present',
    achievements: [
      'Architected and led the team in building a Python workflow to scrape and parse SQL lineage from multiple analytics data warehouses, publishing results daily to Azure Purview so auditors can trace data from its sources through to where it is stored.',
      'Served on internal expert assessment committees, with ongoing mentoring of engineers and responsibility for technical interviews.',
    ],
  },
  {
    company: 'EPAM Systems',
    role: 'Senior Software Engineer',
    period: 'Oct 2021 - Dec 2024',
    achievements: [
      'Led a team of developers to deliver a metadata synchronisation service that connected multiple systems and distributed metadata changes reliably across them, processing around half a million records per day.',
      'Designed and implemented a Java adapter microservice that exposed a mainframe SOAP service as a REST API, enabling clients to integrate with standard HTTP-based tooling.',
    ],
  },
  {
    company: 'JPMorgan Chase',
    role: 'Software Engineer',
    period: 'Sep 2019 - Oct 2021',
    achievements: [
      'Built and launched a regulatory intraday liquidity dashboard with live metric updates (WebSockets, React/Redux) and automated Excel report generation, streamlining workflows for 200+ business analysts.',
      'Optimized a high-volume messaging pipeline to process 150K+ funding messages/hour, cutting publication time from 30 minutes to under 5 minutes using Apache Kafka and async processing.',
    ],
  },
  {
    company: 'JPMorgan Chase',
    role: 'Summer Software Intern',
    period: 'Jun 2018 - Sep 2018',
    achievements: [
      'Used Java Spring Boot and Angular to build a Test Progress Dashboard and search engine to manage thousands of automated tests.',
    ],
  },
  {
    company: 'University of Southampton',
    role: 'First Class Honours BEng',
    period: 'Sep 2016 - May 2019',
    achievements: [
      'Software engineering degree with a focus on cybersecurity and safety-critical systems.',
      'Designed and implemented a lexer and parser end to end for a toy SQL-like query language.',
    ],
  },
  {
    company: 'Sofia High School of Mathematics',
    role: 'Student in an IT focused class',
    period: 'Sep 2011 - May 2016',
    achievements: [
      'Practical C++ and foundational web development.',
      'Strong grounding in core programming principles.',
    ],
  },
];

const EXPERIENCE_VISIBLE_COUNT = 3;

/** Stable reference required: @tsparticles/react reloads the engine whenever `options` identity changes. */
const PARTICLES_OPTIONS = {
  background: { color: { value: '#24273a' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: 'push' as const },
      onHover: { enable: true, mode: 'grab' as const },
    },
    modes: {
      push: { quantity: 4 },
      grab: { distance: 150 },
    },
  },
  particles: {
    color: { value: '#f5bde6' },
    links: {
      color: '#c6a0f6',
      distance: 150,
      enable: true,
      opacity: 0.35,
      width: 1,
    },
    move: { enable: true, speed: 0.08 },
    number: { density: { enable: true }, value: 72 },
    opacity: { value: 0.38 },
    shape: { type: 'circle' as const },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

/**
 * No props — stays memoized when parent fades in so @tsparticles/react does not destroy/recreate the canvas
 * on unrelated App state updates (its useEffect depends on the whole props object).
 */
const StableParticlesLayer = memo(function StableParticlesLayer() {
  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 size-full"
      options={PARTICLES_OPTIONS}
    />
  );
});

function ParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false);
  const [fadedIn, setFadedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setEngineReady(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setFadedIn(true));
        });
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 -z-10 hidden transition-opacity duration-[2000ms] ease-in md:block ${fadedIn ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden
    >
      {engineReady ? <StableParticlesLayer /> : null}
    </div>
  );
}

function ExperienceJobRow({
  job,
  index,
  length,
}: {
  job: ExperienceEntry;
  index: number;
  length: number;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row md:justify-between gap-2 md:gap-4 p-4 -mx-4 rounded-xl hover:bg-surface0/30 hover:-translate-y-1 transition-all duration-300 ${index !== length - 1 ? 'mb-4 border-b border-surface0/50 hover:border-transparent' : ''}`}
    >
      <div className="grid w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <span className="text-mauve font-semibold text-lg">
            {job.company}
          </span>
          <span className="text-left md:text-right text-subtext1 text-sm">
            {job.period}
          </span>
        </div>
        <span className="mt-1 text-pink font-medium">{job.role}</span>
        {job.achievements && (
          <ul className="list-disc ml-5 mt-3 text-subtext0 text-sm space-y-2">
            {job.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function App() {
  const [isExperienceVisible, setIsExperienceVisible] = useState(false);
  const [isCertsVisible, setIsCertsVisible] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isRagPulledVisible, setIsRagPulledVisible] = useState(false);
  const [isNqmeVisible, setIsNqmeVisible] = useState(false);
  const [isBookBeatsVisible, setIsBookBeatsVisible] = useState(false);
  const [isProjectManagementVisible, setIsProjectManagementVisible] =
    useState(false);
  const [isDoilyVisible, setIsDoilyVisible] = useState(false);
  const [isOtherProjectsSectionVisible, setIsOtherProjectsSectionVisible] =
    useState(false);
  const [areMoreProjectsExpanded, setAreMoreProjectsExpanded] = useState(false);
  const [areMoreExperienceExpanded, setAreMoreExperienceExpanded] =
    useState(false);
  const [isWinking, setIsWinking] = useState(false);

  const homeRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Visibility handlers
  const handleVisualizeExperiencePermanently = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) setIsExperienceVisible(true);
    },
    [],
  );

  const handleVisualizeCertsPermanently = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) setIsCertsVisible(true);
    },
    [],
  );

  const handleVisualizeSkillsPermanently = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) setIsSkillsVisible(true);
    },
    [],
  );

  const handleVisualizeRagPulledPermanently = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) setIsRagPulledVisible(true);
    },
    [],
  );

  const handleVisualizeNqmePermanently = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) setIsNqmeVisible(true);
    },
    [],
  );

  const handleVisualizeBookBeatsPermanently = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) setIsBookBeatsVisible(true);
    },
    [],
  );

  const handleVisualizeProjectManagementPermanently = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) setIsProjectManagementVisible(true);
    },
    [],
  );

  const handleVisualizeDoilyPermanently = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) setIsDoilyVisible(true);
    },
    [],
  );

  const handleVisualizeOtherProjectsSectionPermanently = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) setIsOtherProjectsSectionVisible(true);
    },
    [],
  );

  return (
    <div>
      <NavBar />

      <ParticlesBackground />

      <div className="flex justify-center flex-col mx-auto px-2 md:px-32 lg:px-44 xl:px-48">
        <div className="bg-base z-0">
          {/* Skip Link */}
          <a
            href="#about"
            className="absolute top-4 left-4 -translate-y-[150%] focus:translate-y-0 z-[60] bg-pink text-base px-4 py-2 rounded font-bold transition-transform"
          >
            Skip to main content
          </a>

          {/* Introduction */}
          <section id="about" ref={homeRef} className="py-12 px-4">
            <div className="mt-14 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                className="relative shrink-0 select-none"
                onMouseEnter={() => setIsWinking(true)}
                onMouseLeave={() => setIsWinking(false)}
              >
                <img
                  src="images/me/just-head.png"
                  srcSet="images/me/just-head.png 1x, images/me/just-head.png 2x"
                  alt="Spas Zahariev"
                  loading="lazy"
                  decoding="async"
                  className={`w-32 h-32 rounded-full object-cover shadow-lg transition-all duration-300 cursor-pointer ${isWinking ? 'border-[4px] border-pink shadow-[0_0_30px_rgba(245,189,230,0.6)] animate-glitch' : 'border-[3px] border-mauve'}`}
                />

                <svg
                  viewBox="0 0 100 30"
                  className={`absolute -top-0.5 left-1/2 -translate-x-1/2 w-16 pointer-events-none ${isWinking ? 'animate-crown-flash' : 'opacity-0'}`}
                  fill="none"
                >
                  <path
                    d="M15 28 L25 8 L38 20 L50 2 L62 20 L75 8 L85 28"
                    stroke="#f5bde6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="15"
                    y1="28"
                    x2="85"
                    y2="28"
                    stroke="#f5bde6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-subtext0 flex items-center gap-1.5 m-0">
                  <a
                    href="https://www.google.com/maps/place/Pferdestatue+der+ungez%C3%A4hmte+Horizont+von+Yves+Netzhammer/@47.3918595,8.5183743,17z/data=!3m1!4b1!4m6!3m5!1s0x47900b0028ba37e7:0x89639dfad9dff0ce!8m2!3d47.3918595!4d8.5209492!16s%2Fg%2F11xsy4bqsh?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Zurich, Switzerland in Google Maps"
                    title="Open Zurich on Google Maps"
                    className="inline-flex items-center text-pink hover:text-mauve transition-colors duration-200"
                  >
                    <MapPin size={18} />
                  </a>
                  Zurich, Switzerland
                </p>
                <div className="flex items-center gap-4 text-subtext1">
                  <IconLink
                    href="https://github.com/SpasZahariev"
                    target="_blank"
                    title="GitHub"
                  >
                    <Github size={22} />
                  </IconLink>
                  <IconLink
                    href="https://www.linkedin.com/in/spaszahariev/"
                    target="_blank"
                    title="LinkedIn"
                  >
                    <Linkedin size={22} />
                  </IconLink>
                  <IconLink href="mailto:spas.zah@gmail.com" title="Email">
                    <Mail size={22} />
                  </IconLink>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText('+41762120497')
                    }
                    className="text-text hover:text-pink transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
                    title="Copy phone number"
                  >
                    <Phone size={22} />
                  </button>
                </div>
              </div>
            </div>
            <h4 className="mb-2 text-[1rem] text-pink">Hello there, I'm</h4>
            <h2 className="font-sans text-pink text-4xl mt-2 mb-4 font-bold">
              Spas Zahariev
            </h2>
            <p className="text-subtext0 leading-relaxed mb-4 max-w-2xl">
              I'm a Software Engineer Lead with{' '}
              <span
                className={`transition-all duration-500 rounded-sm px-0.5 ${isWinking ? 'bg-pink/25 text-pink' : 'bg-transparent'}`}
              >
                7+ years
              </span>{' '}
              of industry experience, currently at{' '}
              <a
                href="https://www.epam.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mauve hover:bg-pink/25 hover:text-pink transition-all duration-300 rounded-sm"
              >
                EPAM Systems
              </a>{' '}
              in Zurich. I've worked across fintech and large-scale consulting,
              with a focus on{' '}
              <a
                href="https://spring.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mauve hover:bg-pink/25 hover:text-pink transition-all duration-300 rounded-sm"
              >
                Java
              </a>
              /
              <a
                href="https://www.tensorflow.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mauve hover:bg-pink/25 hover:text-pink transition-all duration-300 rounded-sm"
              >
                Python
              </a>{' '}
              systems.
            </p>
            <p className="text-subtext0 leading-relaxed mb-4 max-w-2xl">
              <a
                href="https://grugbrain.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mauve hover:bg-pink/25 hover:text-pink transition-all duration-300 rounded-sm"
              >
                Backend developer
              </a>{' '}
              by day,{' '}
              <span
                className={`transition-all duration-500 rounded-sm px-0.5 ${isWinking ? 'bg-pink/25 text-pink' : 'bg-transparent'}`}
              >
                fullstack
              </span>{' '}
              tinkerer by night. When I'm not working, I'm usually halfway
              through building something I thought of in the shower - a
              RAG-powered AI app one month, a mobile tool the next.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Button
                variant="primary"
                href="resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Download size={18} />
                <span>Resume</span>
              </Button>
              <Button
                variant="outline"
                href="mailto:spas.zah@gmail.com"
                className="w-full sm:w-auto flex justify-center"
              >
                Reach Out
              </Button>
            </div>
          </section>

          {/* Experience & Certifications Grid */}
          <div className="grid gap-8 xl:grid-cols-2 xl:gap-12">
            {/* Experience */}
            <section id="experience" ref={experienceRef} className="py-12 px-4">
              <FadeInSection
                isVisible={isExperienceVisible}
                handleVisualise={handleVisualizeExperiencePermanently}
              >
                <h3 className="text-pink text-2xl font-semibold mb-5 flex items-center gap-2">
                  <Briefcase size={22} />
                  Experience
                </h3>

                {EXPERIENCE_JOBS.slice(0, EXPERIENCE_VISIBLE_COUNT).map(
                  (job, index, arr) => (
                    <ExperienceJobRow
                      key={`${job.company}-${job.role}`}
                      job={job}
                      index={index}
                      length={arr.length}
                    />
                  ),
                )}

                <div className="flex items-center gap-4 py-4">
                  <div className="flex-1 h-px bg-surface1" />
                  <button
                    type="button"
                    onClick={() =>
                      setAreMoreExperienceExpanded((prev) => !prev)
                    }
                    className="flex items-center gap-2 px-5 py-2.5 text-sm text-subtext0 hover:text-pink border border-surface1 hover:border-pink rounded-full transition-colors duration-200 cursor-pointer bg-transparent shrink-0"
                  >
                    {areMoreExperienceExpanded
                      ? 'Show less experience'
                      : 'Show more experience'}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${areMoreExperienceExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div className="flex-1 h-px bg-surface1" />
                </div>

                {areMoreExperienceExpanded &&
                  EXPERIENCE_JOBS.slice(EXPERIENCE_VISIBLE_COUNT).map(
                    (job, index, arr) => (
                      <ExperienceJobRow
                        key={`${job.company}-${job.role}`}
                        job={job}
                        index={index}
                        length={arr.length}
                      />
                    ),
                  )}
              </FadeInSection>
            </section>

            {/* Certifications */}
            <section className="py-12 px-4">
              <FadeInSection
                isVisible={isCertsVisible}
                handleVisualise={handleVisualizeCertsPermanently}
              >
                <h3 className="text-pink text-2xl font-semibold mb-5 flex items-center gap-2">
                  <Award size={22} />
                  Certifications
                </h3>

                {[
                  {
                    name: 'Claude Certified Architect',
                    date: 'Apr 2026',
                    url: 'https://verify.skilljar.com/c/srmo8ajxsct2',
                  },
                  {
                    name: 'Google Professional ML Engineer',
                    date: 'Mar 2026',
                    url: 'https://www.credly.com/badges/368ae43e-f886-4d99-9235-660b9d5d2765/linked_in_profile',
                  },
                  {
                    name: 'Certified Kubernetes Application Developer',
                    date: 'May 2023',
                    url: 'https://www.credly.com/badges/6c5e8fdb-3671-4194-95f6-d7dfa8b70d08/linked_in_profile',
                  },
                  {
                    name: 'Microsoft Azure AZ-204 Cloud Developer Associate',
                    date: 'Apr 2023',
                    url: 'https://www.credly.com/badges/bb59dbf9-72c8-4614-814e-04e8bdc8fc89?source=linked_in_profile',
                  },
                  {
                    name: 'Microsoft Azure AZ-900 Azure Fundamentals',
                    date: 'Sep 2020',
                    url: 'https://www.youracclaim.com/badges/ea3e55cb-5f9d-4c1c-8ef7-d28c8281f5eb?source=linked_in_profile',
                  },
                  {
                    name: 'Oracle Cloud Architect',
                    date: 'Apr 2020',
                    url: 'https://www.youracclaim.com/badges/5b76572c-312b-4428-a370-de3ffa891f2c',
                  },
                  {
                    name: 'Unity GameDev Course',
                    date: 'Feb 2016',
                    url: 'https://softuni.bg/certificates/details/9171/c5d27b52',
                  },
                ].map((cert, index, arr) => (
                  <a
                    key={cert.name}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${cert.name} credential (issued ${cert.date})`}
                    className={`group -mx-4 block rounded-xl border border-surface1/45 bg-surface0/20 p-2 shadow-sm transition-all duration-300 sm:border-transparent sm:bg-transparent sm:p-3 sm:shadow-none hover:border-pink/20 hover:bg-surface0/35 sm:hover:-translate-y-1 sm:hover:border-transparent ${index !== arr.length - 1 ? 'mb-3 sm:mb-2' : ''}`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <div className="hidden min-w-0 flex-1 text-[1rem] font-semibold text-mauve group-hover:text-pink transition-colors duration-300 sm:block sm:pr-2">
                        {cert.name}
                      </div>
                      <div className="flex min-w-0 flex-col gap-1.5 sm:w-auto sm:shrink-0 sm:items-end">
                        <span className="flex w-full items-start justify-between gap-3 py-2.5 pl-3 pr-2 text-left text-[0.9375rem] font-semibold leading-snug sm:w-auto sm:items-center sm:justify-center sm:py-1.5 sm:pl-4 sm:pr-4 sm:text-[1rem]">
                          <span className="line-clamp-4 min-w-0 text-mauve group-hover:text-pink transition-colors duration-300 sm:hidden">
                            {cert.name}
                          </span>
                          <span className="hidden whitespace-nowrap sm:inline text-subtext1">
                            {cert.date}
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </FadeInSection>
            </section>
          </div>

          {/* Skills */}
          <section id="skills" className="py-12 px-4">
            <FadeInSection
              isVisible={isSkillsVisible}
              handleVisualise={handleVisualizeSkillsPermanently}
            >
              <h3 className="text-pink text-2xl font-semibold mb-5 flex items-center gap-2">
                <Wrench size={22} />
                Relevant Skills
              </h3>
              <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(120px,0.5fr))]">
                  <div>
                    <p className="text-xl text-mauve font-semibold mb-1">
                      Languages
                    </p>
                    <ul className="list-none p-0 text-subtext1">
                      {[
                        'Java',
                        'Python',
                        'TypeScript',
                        'JavaScript',
                        'Go',
                        'Kotlin',
                        'Dart',
                        'SQL',
                        'C#',
                        'C++',
                        'Rust',
                        'Bash',
                        'Lua',
                        'Haskell',
                        'CSS/Tailwind',
                      ].map((skill) => (
                        <li key={skill} className="my-2">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xl text-mauve font-semibold mb-1">
                      Frameworks & Tools
                    </p>
                    <ul className="list-none p-0 text-subtext1">
                      {[
                        'Spring Boot',
                        'Docker',
                        'Kubernetes',
                        'Neovim',
                        'Terraform',
                        'React',
                        'Angular',
                        'Node.js',
                        'REST & WebSockets',
                        'GraphQL',
                        'Neo4j',
                        'gRPC/Protobuf',
                        'Flask',
                        'Flutter',
                        'Dioxus',
                      ].map((skill) => (
                        <li key={skill} className="my-2">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(120px,0.5fr))]">
                  <div>
                    <p className="text-xl text-mauve font-semibold mb-1">
                      Cloud & Data
                    </p>
                    <ul className="list-none p-0 text-subtext1">
                      {[
                        'AWS',
                        'Google Cloud Platform',
                        'Microsoft Azure',
                        'Azure Purview',
                        'GCP Vertex AI',
                        'PostgreSQL',
                        'IBM DB2',
                        'Amazon S3',
                        'Apache Kafka',
                        'Apache Spark',
                        'Apache Beam',
                        'BigQuery',
                        'Cloud Functions',
                        'Jenkins CI/CD',
                      ].map((skill) => (
                        <li key={skill} className="my-2">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xl text-mauve font-semibold mb-1">
                      AI & Practices
                    </p>
                    <ul className="list-none p-0 text-subtext1">
                      {[
                        'Machine Learning',
                        'Deep Learning',
                        'LLMs & Gen AI',
                        'RAG',
                        'TensorFlow & Keras',
                        'MLOps & AI metrics',
                        'Microservices',
                        'Event-driven architecture',
                        'Domain-Driven Design',
                        'Clean Code & SOLID',
                        'Agile & Scrum',
                        'Technical mentoring',
                        'DevOps & CI/CD',
                        'Cloud Security',
                      ].map((skill) => (
                        <li key={skill} className="my-2">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </section>

          {/* Projects */}
          <section className="py-12">
            {/* RagPulled Project */}
            <section ref={projectsRef} className="pb-12">
              <FadeInSection
                isVisible={isRagPulledVisible}
                handleVisualise={handleVisualizeRagPulledPermanently}
              >
                <h3 className="text-pink text-2xl font-semibold mb-5 px-4 flex items-center gap-2">
                  <Star size={22} />
                  Featured Projects
                </h3>
                <RagPulled />
              </FadeInSection>
            </section>

            {/* Nqme Project */}
            <section className="py-12">
              <FadeInSection
                isVisible={isNqmeVisible}
                handleVisualise={handleVisualizeNqmePermanently}
              >
                <NqmeProject />
              </FadeInSection>
            </section>

            {/* Expand/Collapse button */}
            <div className="flex items-center gap-4 py-4 px-4">
              <div className="flex-1 h-px bg-surface1" />
              <button
                onClick={() => setAreMoreProjectsExpanded((prev) => !prev)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm text-subtext0 hover:text-pink border border-surface1 hover:border-pink rounded-full transition-colors duration-200 cursor-pointer bg-transparent shrink-0"
              >
                {areMoreProjectsExpanded
                  ? 'Show fewer projects'
                  : 'Show more projects'}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${areMoreProjectsExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              <div className="flex-1 h-px bg-surface1" />
            </div>

            {areMoreProjectsExpanded && (
              <>
                {/* Book Beats */}
                <section className="py-6">
                  <FadeInSection
                    isVisible={isBookBeatsVisible}
                    handleVisualise={handleVisualizeBookBeatsPermanently}
                  >
                    <BookBeats />
                  </FadeInSection>
                </section>

                {/* Project Management */}
                <section className="py-6">
                  <FadeInSection
                    isVisible={isProjectManagementVisible}
                    handleVisualise={
                      handleVisualizeProjectManagementPermanently
                    }
                  >
                    <ProjectManagement />
                  </FadeInSection>
                </section>

                {/* Doily */}
                <section className="py-12">
                  <FadeInSection
                    isVisible={isDoilyVisible}
                    handleVisualise={handleVisualizeDoilyPermanently}
                  >
                    <Doily />
                  </FadeInSection>
                </section>

                {/* Other Projects */}
                <section className="py-12">
                  <FadeInSection
                    isVisible={isOtherProjectsSectionVisible}
                    handleVisualise={
                      handleVisualizeOtherProjectsSectionPermanently
                    }
                  >
                    <OtherProjects />
                  </FadeInSection>
                </section>
              </>
            )}
          </section>

          {/* Contact */}
          <section
            id="contact"
            ref={contactRef}
            className="py-16 px-4 text-center"
          >
            <h3 className="text-pink text-3xl font-bold mb-6">Let's Connect</h3>
            <p className="text-subtext0 max-w-xl mx-auto mb-8">
              I'm currently based in{' '}
              <a
                href="https://www.google.com/maps/place/Pferdestatue+der+ungez%C3%A4hmte+Horizont+von+Yves+Netzhammer/@47.3918595,8.5183743,17z/data=!3m1!4b1!4m6!3m5!1s0x47900b0028ba37e7:0x89639dfad9dff0ce!8m2!3d47.3918595!4d8.5209492!16s%2Fg%2F11xsy4bqsh?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mauve hover:bg-pink/25 hover:text-pink transition-all duration-300 rounded-sm"
              >
                Zurich, Switzerland (CET/CEST)
              </a>
              . Whether you have a question, an opportunity, or just want to say
              hi, my inbox is always open!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                variant="primary"
                href="mailto:spas.zah@gmail.com"
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Mail size={18} />
                <span>Say Hello</span>
              </Button>
              <Button
                variant="outline"
                href="https://www.linkedin.com/in/spaszahariev/"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Linkedin size={18} />
                <span>LinkedIn Profile</span>
              </Button>
            </div>

            <p className="text-sm text-surface2 mt-8">
              Built with{' '}
              <span className="group">
                <a href="2021/index.html" className="inline-block">
                  <Heart
                    size={14}
                    className="inline-block align-middle mx-1 text-pink group-hover:text-mauve group-hover:fill-mauve transition-all duration-300 -translate-y-[2px]"
                  />
                </a>{' '}
                by Spas Zahariev
                {' · '}
                <a
                  href="2021/index.html"
                  className="group-hover:text-mauve transition-colors duration-200"
                >
                  Go back to <span className="font-bold">2021</span> version
                </a>
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
