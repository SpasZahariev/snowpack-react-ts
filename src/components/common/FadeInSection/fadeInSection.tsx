import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  isVisible: boolean;
  handleVisualise: (isIntersecting: boolean) => void;
  children: ReactNode;
}

function FadeInSection({ isVisible, handleVisualise, children }: Props) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = domRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => handleVisualise(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [handleVisualise]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out will-change-[opacity,transform] ${
        isVisible
          ? 'opacity-100 translate-y-0 visible'
          : 'opacity-0 translate-y-16 invisible'
      }`}
    >
      {children}
    </div>
  );
}

export default FadeInSection;
