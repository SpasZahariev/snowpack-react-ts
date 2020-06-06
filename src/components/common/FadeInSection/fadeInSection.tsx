import * as React from 'react'
import "./fadeInSection.css"

type Props = {
    isVisible: boolean;
    handleVisualise: (isIntersecting: boolean) => void;
    children: React.ReactNode;
}
const FadeInSection: React.FC<Props> = ({ isVisible, handleVisualise, children }) => {
    // const [isVisible, setVisible] = React.useState(false);
    const domRef: React.MutableRefObject<any> = React.useRef();

    //observer entries are just the div we have below
    //the entries.forEach calback is called only when the div's "status" changes and it statrts intersecting
    //unobserve function happens on unmount
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => handleVisualise(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.unobserve(domRef.current);
    }, []);
    return (
        <div
            className={isVisible ? 'fade-in-section is-visible' : 'fade-in-section'}
            ref={domRef}
        >
            {/* //this are all the child HTML components */}
            {children}
        </div>
    );
}

export default FadeInSection;