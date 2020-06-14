import * as React from 'react'
import "./NqmeProject.css"
import Carousel from 'react-material-ui-carousel'
import { useState } from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LaunchIcon from '@material-ui/icons/Launch';
import Chip from '@material-ui/core/Chip';


type Props = {
}
const NqmeProject: React.FC<Props> = (props) => {

    const getProjectHeader = () => (
        <section className="horizontal-padding">
            <h4>Nqme website</h4>
            <div className="flex-header">
                <h3 className="big-title">Shared Music Player</h3>
                <div className="icon-container">
                    <a href="https://github.com/SpasZahariev/nqme-react" target="_blank" className="github">
                        <GitHubIcon></GitHubIcon>
                    </a>
                    <a href="https://nqme.co.uk" target="_blank" className="launch-icon">
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
                    <img src="images/nqme/nqme-homepage.png" alt="nqme-homepage" />
                    <img src="images/nqme/room-with-songs.png" alt="room-with-songs" />
                    <img src="images/nqme/many-users.png" alt="many-users" />
                </Carousel>
            </div>
        );

    }
    const getUtilisedTools = () => (
        <section className="horizontal-padding">
            {/* <div className="utilised-tools"> */}
            <span>

                <h2 className="utilised-tools-text">Utilised Tools:</h2>
                <Chip variant="outlined" size="small" label="Flask" />
                <Chip variant="outlined" size="small" label="React" />
                <Chip variant="outlined" size="small" label="Redux" />
                <Chip variant="outlined" size="small" label="Docker" />
                <Chip variant="outlined" size="small" label="GraphQL" />
                <Chip variant="outlined" size="small" label="SocketIO" />
                <Chip variant="outlined" size="small" label="Heroku" />
                <Chip variant="outlined" size="small" label="AWS S3" />
                <Chip variant="outlined" size="small" label="AWS CloudFront" />
            </span>
            {/* </div> */}
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

// function Item(props: any) {
//     return (
//         <div>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>

//             {/* <Button className="CheckButton">
//                 Check it out!
//             </Button> */}
//         </div>
//     )
// }

export default NqmeProject;