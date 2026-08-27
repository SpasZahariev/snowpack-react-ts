import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

interface EmblaSlide {
  src: string;
  alt: string;
}

interface EmblaCarouselProps {
  slides: EmblaSlide[];
  className?: string;
  options?: EmblaOptionsType;
  showDots?: boolean;
  showArrows?: boolean;
  description?: string;
  showDescription?: boolean;
  onOverlayClick?: () => void;
}

function EmblaCarousel({
  slides,
  className = '',
  options,
  showDots = true,
  showArrows = false,
  description,
  showDescription,
  onOverlayClick,
}: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const slideRegistry = useRef<number[][]>([]);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  const handleSlideClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!emblaApi) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const isLeftSide = x < rect.width / 2;
      if (isLeftSide) {
        if (emblaApi.canScrollPrev()) {
          emblaApi.scrollPrev();
        } else {
          emblaApi.scrollTo(emblaApi.scrollSnapList().length - 1);
        }
        return;
      }
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
        return;
      }
      emblaApi.scrollTo(0);
    },
    [emblaApi],
  );

  const setSlideRegistry = useCallback((api: NonNullable<typeof emblaApi>) => {
    const registryFn = (api as { slideRegistry?: () => number[][] })
      .slideRegistry;
    if (typeof registryFn === 'function') {
      slideRegistry.current = registryFn();
      return;
    }
    slideRegistry.current = api.scrollSnapList().map((_, index) => [index]);
  }, []);

  const tweenOpacity = useCallback(
    (api: NonNullable<typeof emblaApi>, eventName?: string) => {
      const scrollProgress = api.scrollProgress();
      const slidesInView = api.slidesInView();

      api.scrollSnapList().forEach((snap, snapIndex) => {
        const diffToTarget = snap - scrollProgress;
        const slidesInSnap = slideRegistry.current[snapIndex] ?? [];

        slidesInSnap.forEach((slideIndex) => {
          if (eventName === 'scroll' && !slidesInView.includes(slideIndex))
            return;
          const opacity = Math.min(
            Math.max(1 - Math.abs(diffToTarget), 0.3),
            1,
          );
          api.slideNodes()[slideIndex].style.opacity = `${opacity}`;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    setSlideRegistry(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect(emblaApi);
      setSlideRegistry(emblaApi);
      tweenOpacity(emblaApi);
    });

    emblaApi.on('select', () => onSelect(emblaApi));
    emblaApi.on('scroll', () => {
      tweenOpacity(emblaApi, 'scroll');
    });
  }, [emblaApi, onSelect, setSlideRegistry, tweenOpacity]);

  return (
    <div className={`embla ${className}`.trim()}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <button
              className="embla__slide"
              key={slide.src}
              type="button"
              onClick={handleSlideClick}
              aria-label="Tap left for previous slide, right for next slide"
            >
              <img
                className="embla__slide__img"
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>

        {description && (
          <div
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl p-6 md:p-8 transition-opacity duration-300 ease-in-out cursor-pointer overflow-hidden ${
              showDescription
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            onClick={onOverlayClick}
          >
            <p className="text-white text-center text-[1rem] md:text-lg font-medium leading-relaxed max-w-prose drop-shadow-md overflow-y-auto max-h-[80vh] md:max-h-none">
              {description}
            </p>
          </div>
        )}

        {showDots && (
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`embla__dot ${
                  index === selectedIndex ? 'embla__dot--selected' : ''
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {showArrows && (
        <div className="embla__buttons">
          <button
            className="embla__button"
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={prevBtnDisabled}
            aria-label="Previous slide"
          >
            Prev
          </button>
          <button
            className="embla__button"
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={nextBtnDisabled}
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default EmblaCarousel;
