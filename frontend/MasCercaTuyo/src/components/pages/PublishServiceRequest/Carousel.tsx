import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC = () => {

    
  const images = [
    'https://plus.unsplash.com/premium_photo-1664298059861-1560b39fb890?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1663045495725-89f23b57cfc5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661884973994-d7625e52631a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1664299069577-11579b487e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661342406124-740ae7a0dd0e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = (event: React.MouseEvent<HTMLButtonElement>,) => { event.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = (event: React.MouseEvent<HTMLButtonElement>,) => { event.preventDefault();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

    const goToSlide = (event: React.MouseEvent<HTMLButtonElement>,index: number) => 
    {
        event.preventDefault();


    setCurrentIndex(index);
  };

  return (
    <div className="relative sm:max-w-lg sm:mx-auto overflow-hidden rounded-lg shadow-lg">
      
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="sm:min-w-full w-full h-80 rounded-lg flex-shrink-0 border-2">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="sm:w-full w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 p-2 bg-white rounded-xl">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-500 ${
              index === currentIndex ? 'bg-orange-500 h-3.5 w-3.5 ' : 'bg-orange-400 opacity-65'
            }`}
            onClick={(event) => goToSlide(event, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;