import * as React from 'react'
import "./Doily.css"
import Carousel from 'react-material-ui-carousel'
import GitHubIcon from '@material-ui/icons/GitHub';
import Chip from '@material-ui/core/Chip';


type Props = {
}
const Doily: React.FC<Props> = (props) => {

    const getProjectHeader = () => (
        <section className="horizontal-padding">
            <h4 className="project-name">Java Painting Application</h4>
            <div className="flex-header">
                <h3 className="big-title">Mirrors your drawing in symmetrical sectors </h3>
                <div className="icon-container">
                    <a href="https://github.com/SpasZahariev/Digital-Doily" target="_blank" className="github">
                        <GitHubIcon></GitHubIcon>
                    </a>
                </div>
            </div>
        </section>
    )

    const getCarousel = () => {
        return (
            <div>
                <Carousel autoPlay={false} indicators={true} navButtonsAlwaysVisible={true}>
                    <img src="images/doily/circle.jpg" alt="circle" />
                    <img src="images/doily/many-zones.jpg" alt="many-zones" />
                    <img src="images/doily/reflection.jpg" alt="reflection" />
                </Carousel>
            </div>
        );

    }
    const getUtilisedTools = () => (
        <section className="horizontal-padding utilised-tools-margin">
            <span>
                <h2 className="utilised-tools-text">Utilised Tools: </h2>
                <Chip variant="outlined" size="small" label="Java" />
                <Chip variant="outlined" size="small" label="Java Swing and AWT" />
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

export default Doily;