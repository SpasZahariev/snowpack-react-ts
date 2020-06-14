import * as React from 'react'
import "./App.css";
import NavBar from '../../components/navbar/navbar';
import FadeInSection from '../../components/common/FadeInSection/fadeInSection';
import { useState } from 'react';
import NqmeProject from '../../components/NqmeProject/NqmeProject';
import Button from '@material-ui/core/Button'

const App: React.FunctionComponent = () => {
  const [isNqmeVisible, setIsNqmeVisible] = useState<boolean>(false);

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
    return <section>
      <h1>experience timeline</h1>
    </section>
  }

  const getSkillsTable = () => {
    return <section>
      <h1>Skills</h1>
      <h1>Look at some skills</h1>
    </section>
  }

  const getNqme = () => (
    <section className="just-bottom-whitespace">
      <FadeInSection isVisible={isNqmeVisible} handleVisualise={handleVisualiseNqmePermenently} >
        <NqmeProject></NqmeProject>
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
    return <section>
      <h3 className="featured-projects-title">Featured Projects</h3>
      <div>
        {/* <div style={{ paddingTop: "1000px" }}>
          the empty space place
        </div> */}
        {getNqme()}
        {projectInfo()}
        {projectInfo()}
      </div>
    </section>
  }

  const handleVisualiseNqmePermenently = (isIntersecting: boolean) => {
    isIntersecting ? setIsNqmeVisible(true) : "do nothing";
  }

  const getContactInfo = () => {
    return <section>
      <h1>Contact Info</h1>
    </section>
  }

  return (
    <div>
      <NavBar></NavBar>
      {navigationMenu()}
      {getIntroduction()}
      {getBackgroundParagraph()}
      {getExperienceParagraph()}
      {getSkillsTable()}
      {getProjects()}
      {getContactInfo()}
    </div>

  );
}
export default App;