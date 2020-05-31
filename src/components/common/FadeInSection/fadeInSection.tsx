import * as React from 'react'


const FadeInSection: React.FC = (props) => {
    const [isVisible, setVisible] = React.useState(true);
    const domRef: React.MutableRefObject<any> = React.useRef();
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
            {props.children}
        </div>
    );
}

export default FadeInSection;