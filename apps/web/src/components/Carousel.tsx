import { useEffect, useState, ReactNode } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CarouselProps {
  children: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="overflow-hidden relative">
      <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="rounded-full p-1 bg-white text-gray-800 hover:bg-white"
        >
          <FiChevronLeft size={30} />
        </button>
        <button
          onClick={next}
          className="rounded-full p-1 bg-white text-gray-800 hover:bg-white"
        >
          <FiChevronRight size={30} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
