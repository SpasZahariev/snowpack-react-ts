import * as React from 'react'
import "./App.css";
import NavBar from '../../components/navbar/navbar';
import FadeInSection from '../../components/common/FadeInSection/fadeInSection';
import { useState } from 'react';
import NqmeProject from '../../components/NqmeProject/NqmeProject';
import Button from '@material-ui/core/Button'
import ProjectManagement from '../../components/ProjectManagement/ProjectManagement';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link } from '@material-ui/core';
import Doily from '../../components/Doily/Doily';
import OtherProjects from '../../components/OtherProjects/OtherProjects';
import Particles from 'react-tsparticles';


const App: React.FunctionComponent = () => {
  const [isAboutVisible, setIsAboutVisible] = useState<boolean>(false);
  const [isExperienceVisible, setIsExperienceVisible] = useState<boolean>(false);
  const [isCertsVisible, setIsCertsVisible] = useState<boolean>(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState<boolean>(false);
  const [isNqmeVisible, setIsNqmeVisible] = useState<boolean>(false);
  const [isProjectManagementVisible, setIsProjectManagementVisible] = useState<boolean>(false);
  const [isDoilyVisible, setIsDoilyVisible] = useState<boolean>(false);
  const [isOtherProjectsSectionVisible, setIsOtherProjectsSectionVisible] = useState<boolean>(false);

  const homeRef: React.RefObject<HTMLElement> = React.useRef(null);
  const aboutRef: React.RefObject<HTMLElement> = React.useRef(null);
  const experienceRef: React.RefObject<HTMLElement> = React.useRef(null);
  const projectsRef: React.RefObject<HTMLElement> = React.useRef(null);
  const contactRef: React.RefObject<HTMLElement> = React.useRef(null);

  const navigationMenu = () => {
    return <div></div>
  }


  const getIntroduction = () => {
    return <section ref={homeRef} className="padded-section">
      <h4 className="hello-there">Hello there, I'm</h4>
      <h2 className="my-name">Spas Zahariev</h2>
      {/* <h2 className="under-my-name">&gt;I like creating things and solving problems</h2> */}
      <h2 className="under-my-name">I like creating things and solving problems.</h2>
      <p className="intro-paragraph">I'm a backend software engineer based in the UK, focused on
       designing scalable and fault tolerant solutions.</p>

      <a href="mailto:spas.zah@gmail.com" className="anchor-override">
        <Button variant="outlined" style={{ marginRight: "10px" }}>Reach Out</Button>
      </a>
      <Button variant="outlined">My Resume</Button>
    </section>
  }

  const getBackgroundParagraph = () => {
    return <section ref={aboutRef} className="padded-section">
      <FadeInSection isVisible={isAboutVisible} handleVisualise={handleVisualiseAboutPermenently} >
        <h3>About Me</h3>
        <p className="styled-paragraph">
          I recently graduated from the <b>University of Southampton</b> and started my career as a Java developer.
        At the moment I am a software engineer at <b>JPM Chase</b> where I've helped my departemnt take ownership of new applications
              and expand our existing ones.
        {/* (insert sentance about how much work my SPF saves compared to the previous PPR)
        Automated a system where users needed to send messages throught the day. The average manual user interactions per day were reduced from 1200 to 100
        since a user just needs to activate it. */}
        </p>

        <p className="styled-paragraph">
          I like building cool things in my free time and coding gives me the freedom to do that without limits.
          My goals are to always provide clean, efficient code and never stop searching for ways to improve.
      </p>
      </FadeInSection>
    </section>
  }

  const getExperienceParagraph = () => {
    return <section className="padded-section">
      <FadeInSection isVisible={isExperienceVisible} handleVisualise={handleVisualiseExperiencePermenently} >
        <h3>Experience</h3>

        <div className="job-container">
          <div className="job-details">
            <span>JPMorgan Chase</span>
            <span>Software Engineer</span>
          </div>
          <div className="job-years">
            <span>Sep 2019 - Present</span>
          </div>
        </div>

        <div className="job-container">
          <div className="job-details">
            <span>JPMorgan Chase</span>
            <span>Technical Analyst Intern</span>
          </div>
          <div className="job-years">
            <span>June - Sep 2018</span>
          </div>
        </div>

        <div className="job-container">
          <div className="job-details">
            <span>University of Southampton</span>
            <span>BEng Software Engineering</span>
          </div>
          <div className="job-years">
            <span>Sep 2016 - May 2019</span>
          </div>
        </div>

        <div className="final-job-container">
          <div className="job-details">
            <span>Sofia High School of Mathematics</span>
            <span>Student</span>
          </div>
          <div className="job-years">
            <span>Sep 2011 - May 2016</span>
          </div>
        </div>
      </FadeInSection>
    </section>
  }

  const getCertificationsParagraph = () => {
    return <section ref={experienceRef} className="padded-section">
      <FadeInSection isVisible={isCertsVisible} handleVisualise={handleVisualiseCertsPermenently} >
        <h3>Certifications</h3>

        <div className="certificate-container">
          <div className="certificate-details">
            <span>Microsoft Azure AZ-900</span>
          </div>
          <div className="cert-year">
            <Button variant="outlined" href="https://www.youracclaim.com/badges/ea3e55cb-5f9d-4c1c-8ef7-d28c8281f5eb?source=linked_in_profile" target="_blank" className="info-icon-date-container" >
              <span>Sep 2020</span>
              <InfoOutlinedIcon></InfoOutlinedIcon>
            </Button>
          </div>
        </div>

        <div className="certificate-container">
          <div className="certificate-details">
            <span>Associate Oracle Cloud Infrastructure Architect</span>
          </div>
          <div className="cert-year">
            <Button variant="outlined" href="https://www.youracclaim.com/badges/5b76572c-312b-4428-a370-de3ffa891f2c" target="_blank" className="info-icon-date-container" >
              <span>Apr 2020</span>
              <InfoOutlinedIcon></InfoOutlinedIcon>
            </Button>
          </div>
        </div>

        <div className="final-certificate-container">
          <div className="certificate-details">
            <span>Unity GameDev Course</span>
          </div>
          <div className="cert-year">
            <Button variant="outlined" href="https://softuni.bg/certificates/details/9171/c5d27b52" target="_blank" className="info-icon-date-container" >
              <span className="cert-date-text">Feb 2016</span>
              <InfoOutlinedIcon></InfoOutlinedIcon>
            </Button>
          </div>
        </div>
      </FadeInSection>
    </section>
  }

  const getSkillsTable = () => {
    return <section className="padded-section">
      <FadeInSection isVisible={isSkillsVisible} handleVisualise={handleVisualiseSkillsPermenently} >
        <h3>Relevant Skills</h3>
        <div className="skill-grid-container-wrapper">

          <div className="skill-grid-container">
            <div>
              <p className="list-header">Languages</p>
              <ul>
                <li>Java</li>
                <li>Python</li>
                <li>Haskell</li>
                <li>SQL</li>
                <li>Bash</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>Css/Scss</li>
              </ul>
            </div>

            <div>
              <p className="list-header">Technologies</p>
              <ul>
                <li>Spring Boot</li>
                <li>Kafka</li>
                <li>Protobuf</li>
                <li>Docker</li>
                <li>Kubernetes</li>
                <li>React</li>
                <li>Angular</li>
                <li>GraphQL</li>
              </ul>
            </div>
          </div>

          <div className="skill-grid-container">
            <div>
              <p className="list-header">Platforms</p>
              <ul>
                <li>Amazon Web Services</li>
                <li>Google Cloud Engine</li>
                <li>Heroku</li>
                <li>DynamoDB</li>
                <li>MongoDB</li>
                <li>Oracle SQL Developer</li>
              </ul>
            </div>

            <div>
              <p className="list-header">Familiar with</p>
              <ul>
                <li>Web Penetration Testing</li>
                <li>Data wrangling</li>
                <li>General Machine Learning</li>
                <li>Mobile Game Development</li>
              </ul>
            </div>
          </div>




        </div>
      </FadeInSection>
    </section>
  }

  const getNqme = () => (
    <section ref={projectsRef} className="just-bottom-whitespace">
      <FadeInSection isVisible={isNqmeVisible} handleVisualise={handleVisualiseNqmePermenently} >
        <h3 className="featured-projects-title">Featured Projects</h3>
        <NqmeProject></NqmeProject>
      </FadeInSection>
    </section>
  )


  const getProjectManagement = () => (
    <section className="vertical-whitespace">
      <FadeInSection isVisible={isProjectManagementVisible} handleVisualise={handleVisualiseProjectManagementPermenantly} >
        <ProjectManagement />
      </FadeInSection>
    </section>
  )

  const getDoily = () => (
    <section className="vertical-whitespace">
      <FadeInSection isVisible={isDoilyVisible} handleVisualise={handleVisualiseDoilyPermenantly} >
        <Doily />
      </FadeInSection>
    </section>
  )

  const getOtherProjects = () => (
    <section className="vertical-whitespace">
      <FadeInSection isVisible={isOtherProjectsSectionVisible} handleVisualise={handleVisualiseOtherProjectsSectionPermenantly} >
        <OtherProjects />
      </FadeInSection>
    </section>
  )

  const projectInfo = () => (
    <FadeInSection isVisible={isNqmeVisible} handleVisualise={handleVisualiseNqmePermenently} >
      <div>
        <img src="https://picsum.photos/500/800"></img>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing </p>
      </div>
    </FadeInSection>
  )

  const getProjects = () => {
    return <section className="vertical-padding-container">
      <div>
        {getNqme()}
        {getProjectManagement()}
        {getDoily()}
        {getOtherProjects()}
        {/* {projectInfo()} */}
      </div>
    </section>
  }

  const handleVisualiseAboutPermenently = (isIntersecting: boolean) => {
    isIntersecting ? setIsAboutVisible(true) : "do nothing";
  }
  const handleVisualiseExperiencePermenently = (isIntersecting: boolean) => {
    isIntersecting ? setIsExperienceVisible(true) : "do nothing";
  }
  const handleVisualiseCertsPermenently = (isIntersecting: boolean) => {
    isIntersecting ? setIsCertsVisible(true) : "do nothing";
  }
  const handleVisualiseSkillsPermenently = (isIntersecting: boolean) => {
    isIntersecting ? setIsSkillsVisible(true) : "do nothing";
  }

  const handleVisualiseNqmePermenently = (isIntersecting: boolean) => {
    isIntersecting ? setIsNqmeVisible(true) : "do nothing";
  }

  const handleVisualiseProjectManagementPermenantly = (isIntersecting: boolean) => {
    isIntersecting ? setIsProjectManagementVisible(true) : "do nothing";
  }

  const handleVisualiseDoilyPermenantly = (isIntersecting: boolean) => {
    isIntersecting ? setIsDoilyVisible(true) : "do nothing";
  }

  const handleVisualiseOtherProjectsSectionPermenantly = (isIntersecting: boolean) => {
    isIntersecting ? setIsOtherProjectsSectionVisible(true) : "do nothing";
  }

  const handleScrollToHome = () => {
    homeRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  const handleScrollToExperience = () => {
    experienceRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  const handleScrollToProjects = () => {
    projectsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  const handleScrollToContact = () => {
    contactRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  const getContactInfo = () => {
    return <section ref={contactRef} className="padded-section center-text">
      <span className="built-with-container">
        Built with <FavoriteBorderIcon /> by Spas Zahariev
      </span>
      <p>Feel free to reach out via: <b>
        <a href="mailto:spas.zah@gmail.com" className="anchor-override">spas.zah@gmail.com</a></b></p>
      <p>UK mobile: <b className="dark-text">07784239930</b></p>
      <div className="social-media-container">
        <Link variant="inherit" href="https://github.com/SpasZahariev" target="_blank">
          <GitHubIcon />
        </Link>
        <Link variant="inherit" href="https://www.linkedin.com/in/spaszahariev/" target="_blank">
          <LinkedInIcon />
        </Link>
        <Link variant="inherit" href="https://www.instagram.com/spas_zah/" target="_blank">
          <InstagramIcon />
        </Link>
      </div>
    </section>
  }

  return (
    <div>
      <NavBar handleHome={handleScrollToHome}
        handleAbout={handleScrollToAbout}
        handleExperience={handleScrollToExperience}
        handleProjects={handleScrollToProjects}
        handleContact={handleScrollToContact}></NavBar>
      <Particles className="tsparticles" canvasClassName="tsparticles-canvas" width="100%" height="100%" params={
        {
          background: {
            color: {
              value: "#f9f7f7"
            }
          },
          fpsLimit: 60,
          interactivity: {
            // detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push"
              },
              onHover: {
                enable: true,
                mode: "grab"
              },
              resize: true
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: "#112d4e"
            },
            links: {
              color: "#112d4e",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            collisions: {
              enable: true
            },
            move: {
              // ignore this lint error - it is ok
              // direction: "bottom-left",
              enable: true,
              random: false,
              speed: 1,
              straight: false
            },
            number: {
              density: {
                enable: true,
                value_area: 800
              },
              value: 80
            },
            opacity: {
              value: 0.5
            },
            shape: {
              type: "circle"
            },
            size: {
              random: true,
              value: 4
            }
          },
          detectRetina: true
        }

      } />
      <div id="website-container-id" className="website-container" >
        <div className="whiteish-background-container">
          {navigationMenu()}
          {getIntroduction()}
          {getBackgroundParagraph()}
          {getExperienceParagraph()}
          {getCertificationsParagraph()}
          {getSkillsTable()}
          {getProjects()}
          {getContactInfo()}
        </div>
      </div>
    </div>

  );
}
export default App;