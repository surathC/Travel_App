import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  MagnifyingGlassIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import CarouselHome1 from '../assets/videos/Video1.mp4'
import CarouselHome2 from '../assets/videos/Video2.mp4'
import CarouselHome3 from '../assets/videos/Video3.mp4'
import Gallery from "../components/homeGallery/gallery";
import MainCategory from "../components/mainCategory/mainCategory";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../components/features/Auth/authSlice';

const LandingPage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const allResults = [
    {
      image: CarouselHome1,
      topic: "Sigiriya",
      description: "Discover the beauty of Sigiriya.",
      category: "Heritage",
    },
    {
      image: CarouselHome1,
      topic: "Kandy",
      description: "Explore the charm of Kandy.",
      category: "Nature",
    },
    {
      image: CarouselHome1,
      topic: "Galle Fort",
      description: "Dive into the history of Galle Fort.",
      category: "Historical",
    },
    {
      image: CarouselHome1,
      topic: "Ella",
      description: "Enjoy the scenic views of Ella.",
      category: "Nature",
    },
    {
      image: CarouselHome1,
      topic: "Nuwara Eliya",
      description: "Experience the cool climate of Nuwara Eliya.",
      category: "Tourism",
    },
    {
      image: CarouselHome1,
      topic: "Colombo",
      description: "Explore the vibrant city of Colombo.",
      category: "Urban",
    },
  ];

  const handleSearch = () => {
    const filteredResults = allResults.filter((result) =>
      result.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
    setIsPopupOpen(true);
    setCurrentPage(1);
  };

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const travelPlaces = [
    {
      image: CarouselHome1,
      name: "Sigiriya",
      city: "Central Province",
      description: "Sigiriya, an ancient rock fortress, is a UNESCO World Heritage site and one of Sri Lanka's top tourist attractions.",
      rating: 5,
    },
    {
      image: CarouselHome2,
      name: "Kandy",
      city: "Kandy District",
      description: "Kandy, the cultural capital, is home to the Temple of the Tooth and scenic lakes surrounded by lush hills.",
      rating: 4,
    },
    {
      image: CarouselHome3,
      name: "Galle",
      city: "Southern Province",
      description: "Galle is famous for its colonial architecture, sandy beaches, and the historic Galle Fort, a UNESCO site.",
      rating: 3,
    },
  ];


  const carouselItems = [
    {
      video: CarouselHome1,
      title: "Why Sri Lanka Is A Great Place To Visit?",
      description: "Needless to say, this little Sri Lanka is an island in the middle of the Indian Ocean. We think that the beaches around the country as well as the history of more than 2500 years old and the ability to enter any of the world's climatic environments within four hours and the very peaceful atmosphere prevailing in the country today are a very rare opportunity."
    },
    {
      video: CarouselHome2,
      title: "Sri Lanka Tourism Achievementss",
      description: "Sri Lanka is the fourth best country to travel to in 2019, travel publication Conde Nast Traveler. Colombo won the first place as Asia's Leading Emerging Tourism Destination at the World Travel Awards 2019. Sri Lanka included for six best places to visit in Asia for solo female travelers."
    },
    {
      video: CarouselHome3,
      title: "Is Sri Lanka Safe For Tourists?",
      description: "YES! Despite having been through a tumultuous few decades during the bitter civil war, Sri Lanka is an incredibly safe destination to travel to. In fact, we've often commented that both of our trips through the country were probably the safest travels we've ever had."
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(setCredentials({ user, token }));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* Carousel Hero Section */}
        <div className="relative">
          <Carousel
            showArrows={true}
            showStatus={false}
            showIndicators={true}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showThumbs={false}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className="h-[calc(70vh-7rem)] bg-gray-200">
                <video
                  src={item.video}
                  alt={item.name}
                  className="object-cover h-full w-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      {item.title}
                    </h2>
                    <p className="text-white text-sm mb-4 max-w-2xl mx-auto">
                      {item.description}
                    </p>
                    <div className="mt-8">
                      <a
                        href="#"
                        className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                      >
                        Smart Trip Plan
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search destinations, services, or events"
                  />
                  <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="self-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full p-6 relative">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ×
              </button>

              <h2 className="text-xl font-bold mb-4">Search Results</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Topic
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={result.image || CarouselHome1}
                            alt={result.topic}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {result.topic}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {result.category || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {result.description}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => alert(`View details for ${result.topic}`)}
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <button
                    key={pageIndex}
                    onClick={() => setCurrentPage(pageIndex + 1)}
                    className={`px-3 py-1 rounded-md ${pageIndex + 1 === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                      }`}
                  >
                    {pageIndex + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tourism News Section */}
        <div className="relative text-center py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black mb-8">Tourism News</h2>

            <Carousel
              showArrows={false}
              showStatus={false}
              showIndicators={true}
              infiniteLoop={true}
              interval={5000}
              showThumbs={false}
              className="rounded-lg"
              renderIndicator={(onClickHandler, isSelected, index, label) => (
                <button
                  onClick={onClickHandler}
                  className={`${isSelected
                    ? "bg-blue-600 ring-2 ring-blue-300"
                    : "bg-gray-400 opacity-70 hover:bg-gray-600 hover:opacity-100"
                    } w-3 h-3 rounded-full mx-1 my-2 transition-all duration-300`}
                  aria-label={label}
                  key={index}
                ></button>
              )}
            >
              {[
                {
                  image: `${CarouselHome2}`,
                  title: "Sigiriya Reopens for Tourists",
                  date: "Published on Nov 30, 2024",
                  description:
                    "Discover the ancient rock fortress and its rich history as Sigiriya welcomes visitors again after renovations.",
                },
                {
                  image: `${CarouselHome2}`,
                  title: "Kandy's Perahera Festival Highlights",
                  date: "Published on Nov 28, 2024",
                  description:
                    "Experience the grandeur of Kandy’s iconic Perahera Festival with captivating processions and cultural displays.",
                },
                {
                  image: `${CarouselHome2}`,
                  title: "Galle Fort Anniversary Celebrations",
                  date: "Published on Nov 25, 2024",
                  description:
                    "Join the celebrations marking the anniversary of Galle Fort, showcasing its heritage and charm.",
                },
              ].map((news, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-300"
                >
                  <div className="w-full lg:w-1/3">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="object-cover w-full h-64 lg:h-full"
                    />
                  </div>
                  <div className="w-full lg:w-2/3 p-6 text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{news.date}</p>
                    <p className="text-gray-700 text-base">{news.description}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        <MainCategory />
        <br /> <br /> <br /> <br />

        {/* About Sri Lanka Section */}
        <div class="bg-aboutSriLanka-bg bg-fixed bg-cover bg-center text-center p-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            About Sri Lanka
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {["Sigiriya", "Kandy", "Galle", "Polonnaruwa", "Badulla", "Habarana"].map((place) => (
              <div
                key={place}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`${CarouselHome2}`}
                  alt={place}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{place}</h3>
                  <p className="text-gray-600 text-sm">
                    Discover the beauty and history of {place}.
                  </p>
                  <div className="mt-8 mb-4">
                    <a
                      href="#"
                      className="bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition duration-300 rounded-2xl"
                    >
                      Download pdf
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <br />
        {/* Gallery */}
        <Gallery />

        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Guided Tours", icon: MapPinIcon },
              { name: "Accommodation", icon: BriefcaseIcon },
              { name: "Transportation", icon: CalendarIcon },
            ].map((service) => (
              <div
                key={service.name}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <service.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm">
                  Experience the best of Sri Lanka with our{" "}
                  {service.name.toLowerCase()} services.
                </p>
                <a
                  href="#"
                  className="mt-2 inline-block text-blue-600 hover:underline"
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    name: "Kandy Esala Perahera",
                    date: "July 25 - August 4, 2023",
                    location: "Kandy",
                  },
                  {
                    name: "Nallur Festival",
                    date: "August 5 - 29, 2023",
                    location: "Jaffna",
                  },
                  {
                    name: "Galle Literary Festival",
                    date: "January 24 - 28, 2024",
                    location: "Galle",
                  },
                ].map((event) => (
                  <tr key={event.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        <br /> <br />
        {/* Top Places Section */}
        <div className="relative bg-aboutSriLanka-bg bg-fixed bg-cover bg-center text-center py-16 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white text-3xl font-bold mb-8">Top Travel Places</div>

            <Carousel
              showArrows={false}
              showStatus={false}
              showIndicators={true}
              infiniteLoop={true}
              interval={5000}
              showThumbs={false}
              className="rounded-lg"
              renderIndicator={(onClickHandler, isSelected, index, label) => (
                <button
                  onClick={onClickHandler}
                  className={`${isSelected
                    ? "bg-blue-600 ring-2 ring-blue-300"
                    : "bg-gray-400 opacity-70 hover:bg-gray-600 hover:opacity-100"
                    } w-3 h-3 rounded-full mx-1 my-2 transition-all duration-300`}
                  aria-label={label}
                  key={index}
                ></button>
              )}
            >
              {travelPlaces.map((place, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white rounded-2xl p-6 space-y-1 opacity-90 transition-all"
                >
                  <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-white">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{place.name}</h3>
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={index < place.rating ? "yellow" : "none"}
                        stroke="currentColor"
                        className="w-5 h-5 mx-1"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{place.city}</p>
                  <p className="text-center text-gray-700 mt-2 max-w-md">{place.description}</p>


                  <br />
                </div>
              ))}
            </Carousel>
          </div>
        </div>



      </main>
    </div>
  );
};

export default LandingPage;
