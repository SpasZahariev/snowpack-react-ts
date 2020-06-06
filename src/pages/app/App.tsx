import * as React from 'react'
import ProjectInfo from '../../components/project-info/project-info';
import NavBar from '../../components/navbar/navbar';
import FadeInSection from '../../components/common/FadeInSection/fadeInSection';
import { useState } from 'react';

const App: React.FunctionComponent = () => {
  const [isNqmeVisible, setIsNqmeVisible] = useState<boolean>(false);

  const navigationMenu = () => {
    return <div></div>
  }


  const getIntroduction = () => {
    return <section>
      <h4>Hello, there - I'm</h4>
      <h1>SPAS ZAHARIEV</h1>
      <h1>I like creating things and solving problems</h1>
      <h4>I'm a backend software engineer based in the UK, focusing on scalable and fault tolerant solutions</h4>
      <button>Reach out pdf</button>
      <button>Resume</button>
    </section>
  }

  const getBackgroundParagraph = () => {
    return <section>
      <h1>About Me</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore unde consequuntur ex voluptates ad? Dolore, sapiente ea cum consequuntur eaque adipisci tempora nostrum quaerat ad sequi! Nostrum consectetur maiores libero?
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

  const getProjects = () => {
    return <section>
      <h1>Featured Projects</h1>
      <div>
        <div style={{ paddingTop: "1000px" }}>
          the empty space place
        </div>
        {projectInfo()}
        {projectInfo()}
        {projectInfo()}
      </div>
    </section>
  }

  const projectInfo = () => (
    <FadeInSection isVisible={isNqmeVisible} handleVisualise={handleVisualiseNqmePermenently} >
      <div>
        <img src="https://picsum.photos/500/800"></img>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing </p>
      </div>
    </FadeInSection>
  )

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