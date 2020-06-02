import * as React from 'react'
import "./navbar.css"


const NavBar = () => {

    const [visible, setVisible] = React.useState(true);
    const [prevScrollPos, setPrevScrollPos] = React.useState(window.pageYOffset);

    const handleScroll = () => {

        const currentScrollPos = window.pageYOffset;
        const isVisibleNow = prevScrollPos > currentScrollPos;

        setPrevScrollPos(currentScrollPos);
        setVisible(isVisibleNow);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [prevScrollPos]);

    return (
        <nav className={!visible ? "navbar navbar-hidden" : "navbar"}>
            <span>This is Navbar</span>
        </nav>
    );
}



// this guide looks like what I want

export default NavBar;