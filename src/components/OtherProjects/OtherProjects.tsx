import * as React from 'react'
import "./OtherProjects.css"
import Carousel from 'react-material-ui-carousel'
import GitHubIcon from '@material-ui/icons/GitHub';
import LaunchIcon from '@material-ui/icons/Launch';
import Chip from '@material-ui/core/Chip';


type Props = {
}
const OtherProjects: React.FC<Props> = (props) => {

    const getProjectHeader = () => (
        <section className="horizontal-padding">
            <div className="flex-header">
                <h3 className="big-title">Check out more</h3>
                {/* <div className="icon-container">
                    <a href="https://github.com/SpasZahariev/CAD-SpasZahariev" target="_blank" className="github">
                        <GitHubIcon></GitHubIcon>
                    </a>
                    <a href="http://spas-zahariev.cad.s3-website.eu-west-1.amazonaws.com/" target="_blank" className="launch-icon">
                        <LaunchIcon></LaunchIcon>
                    </a>
                </div> */}
            </div>
        </section>
    )

    const getCarousel = () => {
        return (
            <div>
                <Carousel autoPlay={false} indicators={true} navButtonsAlwaysVisible={true}>
                    <img src="images/other/new-york.png" alt="new-york" />
                    <img src="images/other/board-with-obstacles.png" alt="board-with-obstacles" />
                    <img src="images/other/score-0.png" alt="tetris" />
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

export default OtherProjects;