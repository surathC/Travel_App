import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from '../assets/images/Home1.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaGlobe } from 'react-icons/fa';

const EventDetails = () => {
    const location = useLocation();
    const { event } = location.state || {};

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [comments, setComments] = useState([
        {
            id: 1,
            username: "Uvindu Saranath",
            date: "26 Sep 2024",
            text: "Devil's Staircase is the best place to camp, travel, and take photos. Enjoy your trip!",
            replies: [],
            userImage: Image
        },
        {
            id: 2,
            username: "Supuni Kavindi",
            date: "20 Sep 2024",
            text: "A beautiful place but tough to reach. Worth visiting!",
            replies: [],
            userImage: Image
        }
    ]);

    const [newComment, setNewComment] = useState("");
    const [reply, setReply] = useState({});

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                id: comments.length + 1,
                username: "Guest User",
                date: new Date().toLocaleDateString(),
                text: newComment,
                replies: [],
                userImage: "https://via.placeholder.com/50"
            };
            setComments([...comments, newCommentObj]);
            setNewComment("");
        }
    };

    const handleReplyChange = (id, value) => {
        setReply({ ...reply, [id]: value });
    };

    const handleAddReply = (id) => {
        if (reply[id]?.trim()) {
            const updatedComments = comments.map((comment) =>
                comment.id === id
                    ? {
                        ...comment,
                        replies: [...comment.replies, { text: reply[id], date: new Date().toLocaleDateString(), username: "Guest User" }]
                    }
                    : comment
            );
            setComments(updatedComments);
            setReply({ ...reply, [id]: "" });
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    const [mapUrl, setMapUrl] = useState(() => {
        const [lat, lng] = event.googleMap.split(", ");
        return `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
    });

    const handleMapLoad = () => {
        const [lat, lng] = event.googleMap.split(", ");
        setMapUrl(`https://www.google.com/maps?q=${lat},${lng}&output=embed`);
    };

    const iconMap = {
        webUrl: <FaGlobe />,
        twitter: <FaTwitter />,
        youtube: <FaYoutube />,
        facebook: <FaFacebook />,
        instagram: <FaInstagram />
    };

    return (
        <div className="bg-gray-100">
            <div className="bg-gray-50 py-8">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-5">{event.name}</h1>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center justify-center mx-auto gap-2 hover:bg-red-600">
                            <i className="fas fa-heart"></i> Add to Favorites
                        </button>

                        <div className="flex items-center gap-3 justify-center mt-3">
                            <i className="fas fa-map-marker-alt text-orange-500 text-xl"></i>
                            <p>
                                <span
                                    className="font-bold text-orange-500 cursor-pointer"
                                    onClick={() => {
                                        const [lat, lng] = event.googleMap.split(", ");
                                        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
                                    }}
                                >
                                    {event.name}
                                </span>
                            </p>

                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 text-gray-700">
                        <div className="flex items-center gap-3">
                            <i className="fas fa-ticket-alt text-gray-600 text-xl"></i>
                            <p>Ticket Price - <span className="font-bold">{event.ticketPrice}</span></p>
                        </div>

                        <div className="flex items-center gap-3">
                            <i className="fas fa-star text-yellow-500 text-xl"></i>
                            <p>Ratings <span className="font-bold text-yellow-500">{event.rating}</span></p>
                        </div>


                        <div className="flex items-center gap-3">
                            <i className="fas fa-list-alt text-gray-600 text-xl"></i>
                            <p>
                                Category -{" "}
                                <span className="font-bold">
                                    {event.subCategories
                                        .map(subCategory => `${subCategory.category.name}/${subCategory.name}`)
                                        .join(", ")}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 text-gray-700">
                        <div className="flex items-center gap-3">
                            <i className="fas fa-city text-gray-600 text-xl"></i>
                            <p>District - <span className="font-bold">{event.ticketPrice}</span></p>
                        </div>

                        <div className="flex items-center gap-3">
                            <i className="fas fa-city text-gray-600 text-xl"></i>
                            <p>City - <span className="font-bold">{event.openingHorurs}</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-8 text-gray-700">

                        <div className="flex items-center gap-3">
                            <i className="fas fa-phone text-gray-600 text-xl"></i>
                            <p>
                                Phone Numbers -{" "}
                                <span className="font-bold">
                                    {Object.entries(event.contactNumber)
                                        .map(([name, number]) => `${name}: ${number}`)
                                        .join(", ")}
                                </span>
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white-100">
                <div className="container mx-auto py-10">
                    <h2 className="text-center text-2xl font-bold mb-6">
                        - Some photos from - <br />
                        <span className="text-orange-500">{event.name}</span>
                    </h2>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                    >
                        {event.photos.map((photo) => (
                            <SwiperSlide key={photo.id}>
                                <div
                                    className="relative h-[300px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
                                    onClick={() => openModal(photo.url)}
                                >
                                    <img
                                        src={photo.url}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="relative max-w-3xl w-full p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-2 right-2 text-white bg-red-500 rounded-full px-3 py-1"
                                onClick={closeModal}
                            >
                                X
                            </button>
                            <img
                                src={selectedImage}
                                alt="Enlarged"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white-100">
                <div className="bg-white-50">
                    <div className="container mx-auto py-8">
                        <div className="flex flex-wrap lg:flex-nowrap gap-8">
                            <div className="bg-white-100 w-full lg:w-2/3 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4 text-center"> - Details from  <span className="text-orange-500">{event.name}</span> -</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                            <div className="bg-gray-100 w-full lg:w-1/3 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4 text-center">
                                    - Map Of <span
                                        className="text-orange-500 cursor-pointer"
                                        onClick={() => {
                                            const [lat, lng] = event.googleMap.split(", ");
                                            window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
                                        }}
                                    >
                                        {event.name}
                                    </span> -
                                </h2>
                                <a
                                    href="#"
                                    onClick={() => {
                                        const [lat, lng] = event.googleMap.split(", ");
                                        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
                                    }}
                                    className="block"
                                >
                                    <iframe
                                        src={mapUrl}
                                        title="Map"
                                        className="w-full h-80 lg:h-96 border-0 rounded-lg"
                                    ></iframe>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-white-100">
                <div className="bg-white-50 py-8">
                    <div className="container mx-auto">
                        <h2 className="text-2xl text-center font-bold mb-4">- Weather Report Of  <span className="text-orange-500">{event.name}</span> -</h2>
                        <div className="text-center">
                            <iframe
                                src="https://weather.com/"
                                title="Weather Report"
                                className="w-full h-96 border-0 rounded-lg"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100">
                <div className="bg-gray-50 py-8">
                    <div className="container mx-auto">
                        <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2 mb-2"
                            rows="3"
                            placeholder="Write your comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleAddComment}
                        >
                            Submit
                        </button>

                        <h2 className="text-xl font-bold mt-8 mb-4">Comments</h2>
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="border border-gray-300 rounded-2xl p-4">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={comment.userImage}
                                            alt="User"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <h3 className="font-bold">{comment.username}</h3>
                                            <p className="text-gray-500 text-sm">{comment.date}</p>
                                        </div>
                                    </div>

                                    <p className="mb-4">{comment.text}</p>

                                    {comment.replies.length > 0 && (
                                        <div className="ml-10 mt-4 space-y-2">
                                            {comment.replies.map((reply, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-100 p-2 rounded border border-gray-200"
                                                >
                                                    <h4 className="font-bold text-sm">{reply.username}</h4>
                                                    <p className="text-gray-700 text-sm">{reply.text}</p>
                                                    <p className="text-gray-500 text-xs">{reply.date}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <textarea
                                        className="w-full border border-gray-300 rounded p-2 mt-4"
                                        rows="2"
                                        placeholder="Write your reply..."
                                        value={reply[comment.id] || ""}
                                        onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                                    ></textarea>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
                                        onClick={() => handleAddReply(comment.id)}
                                    >
                                        Reply
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EventDetails;
