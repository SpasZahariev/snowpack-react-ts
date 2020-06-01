import * as React from 'react'
import "./fadeInSection.css"

const FadeInSection: React.FC = (props) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef: React.MutableRefObject<any> = React.useRef();

    //observer entries are just the div we have below
    //the entries.forEach calback is called only when the div's "status" changes and it statrts intersecting
    //unobserve function happens on unmount
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.unobserve(domRef.current);
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {/* //this are all the child HTML components */}
            {props.children}
        </div>
    );
}

export default FadeInSection;