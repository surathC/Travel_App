import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import img1 from '../../assets/images/Home1.jpg';
import img2 from '../../assets/images/Home2.jpg';
import img3 from '../../assets/images/Home3.jpg';
import img4 from '../../assets/images/Img.jpg';

const MainCategory = () => {
    const cards = [
        {
            id: 1,
            title: "Plan Your Destination",
            image: img1,
        },
        {
            id: 2,
            title: "Plan Your Transport",
            image: img2,
        },
        {
            id: 3,
            title: "Plan Your Accommodation",
            image: img3,
        },
        {
            id: 4,
            title: "Plan Your Services & Activities",
            image: img4,
        },
    ];

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">
                Explore and Plan Your Next Adventure
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="group relative cursor-pointer items-center justify-center overflow-hidden rounded-2xl transition-shadow hover:shadow-xl hover:shadow-black/30"
                    >
                        <div className="h-96 w-72 rounded-lg overflow-hidden">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 rounded-lg"></div>
                        <div className="absolute inset-0 flex translate-y-[45%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 className="font-dmserif text-2xl font-bold text-white">
                                {card.title}
                            </h1>
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                Plan and explore your next adventure with ease.
                            </p>
                            <button className="rounded-full bg-blue-600 py-2 px-3.5 text-sm capitalize text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300">
                                Click
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainCategory;
