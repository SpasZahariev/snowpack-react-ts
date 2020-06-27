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


const App: React.FunctionComponent = () => {
  const [isNqmeVisible, setIsNqmeVisible] = useState<boolean>(false);
  const [isProjectManagementVisible, setIsProjectManagementVisible] = useState<boolean>(false);

  const navigationMenu = () => {
    return <div></div>
  }


  const getIntroduction = () => {
    return <section className="padded-section">
      <h4 className="hello-there">Hello there, I'm</h4>
      <h2 className="my-name">Spas Zahariev</h2>
      {/* <h2 className="under-my-name">&gt;I like creating things and solving problems</h2> */}
      <h2 className="under-my-name">I like creating things and solving problems.</h2>
      <p className="intro-paragraph">I'm a backend software engineer based in the UK, focused on
       designing scalable and fault tolerant solutions.</p>
      <Button variant="outlined" style={{ marginRight: "10px" }}>Reach Out</Button>
      <Button variant="outlined">My Resume</Button>
    </section>
  }

  const getBackgroundParagraph = () => {
    return <section className="padded-section">
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
    </section>
  }

  const getExperienceParagraph = () => {
    return <section className="padded-section">
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
    </section>
  }

  const getCertificationsParagraph = () => {
    return <section className="padded-section">
      <h3>Certifications</h3>
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

      <div className="certificate-container">
        <div className="certificate-details">
          <span>Microsoft Azure AZ-900</span>
        </div>
        <div className="cert-year">
          <Button variant="outlined" href="https://www.youracclaim.com/badges/5b76572c-312b-4428-a370-de3ffa891f2c" target="_blank" className="info-icon-date-container" >
            <span>Jul 2020</span>
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
            <span>Feb 2016</span>
            <InfoOutlinedIcon></InfoOutlinedIcon>
          </Button>
        </div>
      </div>
    </section>
  }

  const getSkillsTable = () => {
    return <section className="padded-section">
      <h3>Relevant Skills</h3>
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
            <li>Spring</li>
            <li>Spring Boot</li>
            <li>Spring JPA</li>
            <li>Kafka</li>
            <li>Protobuf</li>
            <li>Docker</li>
            <li>Kubernetes</li>
            <li>React</li>
            <li>Angular</li>
            <li>GraphQL</li>
          </ul>
        </div>

        <div>
          <p className="list-header">Platforms</p>
          <ul>
            <li>Amzon Web Services</li>
            <li>Google Cloud Engine</li>
            <li>Heroku</li>
            <li>DynamoDB</li>
            <li>MongoDB</li>
            <li>SQL Developer</li>
          </ul>
        </div>

      </div>
    </section>
  }

  const getNqme = () => (
    <section className="just-bottom-whitespace">
      <FadeInSection isVisible={isNqmeVisible} handleVisualise={handleVisualiseNqmePermenently} >
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
      <h3 className="featured-projects-title">Featured Projects</h3>
      <div>
        {getNqme()}
        {getProjectManagement()}
        {/* {projectInfo()} */}
      </div>
    </section>
  }

  const handleVisualiseNqmePermenently = (isIntersecting: boolean) => {
    isIntersecting ? setIsNqmeVisible(true) : "do nothing";
  }

  const handleVisualiseProjectManagementPermenantly = (isIntersecting: boolean) => {
    isIntersecting ? setIsProjectManagementVisible(true) : "do nothing";
  }

  const getContactInfo = () => {
    return <section className="padded-section center-text">
      <span className="built-with-container">
        Built with <FavoriteBorderIcon /> by Spas Zahariev
      </span>
      <p>Feel free to reach out via: <b className="dark-text">spas.zah@gmail.com</b></p>
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
      <NavBar></NavBar>
      {navigationMenu()}
      {getIntroduction()}
      {getBackgroundParagraph()}
      {getExperienceParagraph()}
      {getCertificationsParagraph()}
      {getSkillsTable()}
      {getProjects()}
      {getContactInfo()}
    </div>

  );
}
export default App;