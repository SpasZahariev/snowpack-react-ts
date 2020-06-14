import * as React from 'react'
// import Carousel from 'react-bootstrap/Carousel';
import "./NqmeProject.css"

type Props = {
}
const NqmeProject: React.FC<Props> = (props) => {

    const getProjectHeader = () => (
        <section className="horizontal-padding">
            <div>
                <h4>Nqme website</h4>
                <h2>Shared Music Player</h2>
            </div>
        </section>
    )

    const getCarousel = () => (
        <>
        </>
        // <Carousel>
        //     <Carousel.Item>
        //         <img src="images/nqme/nqme-homepage.png" alt="nqme homepage" />
        //     </Carousel.Item>
        //     <Carousel.Item>
        //         <img src="images/nqme/nqme-homepage.png" alt="nqme homepage" />
        //     </Carousel.Item>
        //     <Carousel.Item>
        //         <img src="images/nqme/nqme-homepage.png" alt="nqme homepage" />
        //     </Carousel.Item>
        //     <Carousel.Item>
        //         <img src="images/nqme/nqme-homepage.png" alt="nqme homepage" />
        //     </Carousel.Item>
        // </Carousel>
    )
    const getUtilisedTools = () => (
        <section className="horizontal-padding">
            <h2>Utilised Tools</h2>
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

export default NqmeProject;