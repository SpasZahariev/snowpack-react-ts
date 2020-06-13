import * as React from 'react'
// import "./NqmeProject.css"

type Props = {
}
const NqmeProject: React.FC<Props> = (props) => {

    const getProjectTitle = () => (
        <h1>Nqme</h1>
    )

    const getCarousel = () => (
        <div>carousel</div>
    )
    const getUtilisedTools = () => (
        <div>utilisedTools</div>
    )

    return (
        <div>
            {getProjectTitle()}
            {getCarousel()}
            {getUtilisedTools()}
        </div>
    );
}

export default NqmeProject;