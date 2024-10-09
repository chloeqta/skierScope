"use client"
import React, { useEffect, useState } from 'react';

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: Image[];
}

export const images = [
  { src: '/images/processed-four-skiers.jpg', alt: 'Image 1' },
  { src: '/images/processed-gondola.jpg', alt: 'Image 2' },
  { src: '/images/processed-skikids.jpg', alt: 'Image 3' },
  { src: '/images/processed-solo-skier.jpg', alt: 'Image 4' },
];

export const Carousel: React.FC<CarouselProps> = ({ images }) => {console.log(images);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  // Function to show the current slide
  const showSlide = (index: number) => {
    setCurrentSlide((index + totalSlides) % totalSlides); // Wrap around using modulus
  };

  // Function to go to the next slide
  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    showSlide(currentSlide - 1);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const autoSlideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(autoSlideInterval); // Cleanup interval on unmount
  }, [currentSlide]);

  return (
    <div id="indicators-carousel" className="relative w-full" data-carousel="static">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hidden duration-700 ease-in-out ${index === currentSlide ? 'block' : ''}`}
            data-carousel-item={index === currentSlide ? 'active' : ''}
          >
            <img
              src={image.src}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={image.alt}
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-300'}`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => showSlide(index)}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
