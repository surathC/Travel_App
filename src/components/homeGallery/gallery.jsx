import React from "react";
import Image from '../../assets/images/Home1.jpg';

const Gallery = () => {
  const images = Array.from({ length: 9 }, (_, index) => ({
    src: Image,
    title: `Image ${index + 1}`,
  }));

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Gallery</h2>

        <div className="grid grid-cols-3 gap-6 auto-rows-[200px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden shadow-md ${
                (index === 0 || index === 1 || index === 5)
                  ? 'col-span-1 row-span-1'
                  : 'col-span-1 row-span-2'
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 text-sm">
                {image.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
