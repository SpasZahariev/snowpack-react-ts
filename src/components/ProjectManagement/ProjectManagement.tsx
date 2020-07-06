import * as React from 'react'
import "./ProjectManagement.css"
import Carousel from 'react-material-ui-carousel'
import GitHubIcon from '@material-ui/icons/GitHub';
import LaunchIcon from '@material-ui/icons/Launch';
import Chip from '@material-ui/core/Chip';


type Props = {
}
const ProjectManagement: React.FC<Props> = (props) => {

    const getProjectHeader = () => (
        <section className="horizontal-padding">
            <h4 className="project-name">Project Tracking Website</h4>
            <div className="flex-header">
                <h3 className="big-title">Assign tasks to users</h3>
                <div className="icon-container">
                    <a href="https://github.com/SpasZahariev/CAD-SpasZahariev" target="_blank" className="github">
                        <GitHubIcon></GitHubIcon>
                    </a>
                    <a href="http://spas-zahariev.cad.s3-website.eu-west-1.amazonaws.com/" target="_blank" className="launch-icon">
                        <LaunchIcon></LaunchIcon>
                    </a>
                </div>
            </div>
        </section>
    )

    const getCarousel = () => {
        return (
            <div>
                <Carousel autoPlay={false} indicators={true} navButtonsAlwaysVisible={true}>
                    <img src="images/cloud-app-dev/user-info.jpg" alt="user-info" />
                    <img src="images/cloud-app-dev/project-dashboard.jpg" alt="project-dashboard" />
                    <img src="images/cloud-app-dev/compose-email.jpg" alt="compose-email" />
                    <img src="images/cloud-app-dev/login-screen.jpg" alt="login-screen" />
                </Carousel>
            </div>
        );

    }
    const getUtilisedTools = () => (
        <section className="horizontal-padding utilised-tools-margin">
            <span>
                <h2 className="utilised-tools-text">Utilised Tools: </h2>
                <Chip variant="outlined" size="small" label="AWS DynamoDB" />
                <Chip variant="outlined" size="small" label="AWS S3" />
                <Chip variant="outlined" size="small" label="AWS Lambda" />
                <Chip variant="outlined" size="small" label="AWS Cognito" />
                <Chip variant="outlined" size="small" label="Angular" />
                <Chip variant="outlined" size="small" label="SendGrid" />
                <Chip variant="outlined" size="small" label="Typescript" />
            </span>
        </section>
    )

    return (
        <div>
            {getProjectHeader()}
            {getCarousel()}
            {getUtilisedTools()}
        </div>
    );
}

export default ProjectManagement;