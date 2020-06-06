import * as React from 'react'
import "./navbar.css"


const NavBar = () => {

    const [visible, setVisible] = React.useState(true);
    const [prevScrollPos, setPrevScrollPos] = React.useState(window.pageYOffset);

    //call this every time the scrollbar position changes
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
        <nav className={visible ? "navbar" : "navbar navbar-hidden"}>
            <span>This is Navbar</span>
        </nav>
    );
}



// this guide looks like what I want

export default NavBar;