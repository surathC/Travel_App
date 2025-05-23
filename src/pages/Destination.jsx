import React, { useEffect, useState, useRef } from "react";
import {
    HeartIcon,
    AdjustmentsHorizontalIcon,
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";

const Destination = () => {
    const [isVerticalLayout, setIsVerticalLayout] = useState(false);
    const [isMaxLayout, setIsMaxLayout] = useState(true);

    const [destinations, setDestinations] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

    const mainFilters = [
        "District",
        "City",
        "Popular Area",
        "Main Category",
        "Sub Category",
        "Transport Method",
        "Estimated Explore Time",
        "Traveler Type",
    ];

    const [filterData, setFilterData] = useState({
        District: [],
        City: [],
        "Popular Area": [],
        "Main Category": [],
        "Sub Category": [],
        "Transport Method": [],
        "Estimated Explore Time": [],
        "Traveler Type": [],
    });
    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQueries, setSearchQueries] = useState({});
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [cities, setCities] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [modalSelectedOptions, setModalSelectedOptions] = useState({});
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const menuRef = useRef(null);

    useEffect(() => {
        setIsVerticalLayout(false);
    }, []);

    const handleLayoutToggle = (isMax) => {
        setIsMaxLayout(isMax);
    };

    const handleVerticalLayoutToggle = () => {
        setIsVerticalLayout(!isVerticalLayout);
    };

    const [categories, setCategories] = useState([
        {
            label: "Collection Sri Lanka Trips",
            items: [],
        },
        {
            label: "Target a Specific Area",
            items: [],
        },
        {
            label: "Category Wise",
            items: [],
        },
        {
            label: "Smart Trip Plan",
            items: [],
        },
    ]);


    const handleOutsideClick = (e) => {
        if (!e.target.closest(".dropdown")) {
            setActiveIndex(null);
            setSelectedMainCategory(null);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    const handleCategoryClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);

        if (categories[index].label === "Category Wise") {
            setSelectedMainCategory(0);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveFilter(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await axios.get(`${API_URL}districts`, {
                    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                });
                setFilterData((prevData) => ({
                    ...prevData,
                    District: response.data,
                }));
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        };

        fetchDistricts();
    }, [API_URL, ACCESS_TOKEN]);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedDistrict) {
                try {
                    const response = await axios.get(
                        `${API_URL}districts/${selectedDistrict}/cities`,
                        {
                            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                        }
                    );
                    setCities(response.data.cities);
                } catch (error) {
                    console.error("Error fetching cities:", error);
                }
            } else {
                try {
                    const response = await axios.get(`${API_URL}cities`, {
                        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                    });
                    setCities(response.data);
                } catch (error) {
                    console.error("Error fetching all cities:", error);
                }
            }
        };

        fetchCities();
    }, [selectedDistrict, API_URL, ACCESS_TOKEN]);


    const handleCheckboxChange = (filter, option) => {
        setSelectedOptions((prev) => {
            const current = prev[filter] || [];
            const updated = current.includes(option)
                ? current.filter((item) => item !== option)
                : [...current, option];
            return { ...prev, [filter]: updated };
        });
    };

    const handleModalCheckboxChange = (filter, option) => {
        setModalSelectedOptions((prev) => {
            const current = prev[filter] || [];
            const updated = current.includes(option)
                ? current.filter((item) => item !== option)
                : [...current, option];
            return { ...prev, [filter]: updated };
        });
    };
    const handleDistrictChange = (districtId) => {
        setSelectedDistrict(districtId);
        setSelectedOptions((prev) => {
            const updated = { ...prev, City: [] };
            return updated;
        });
    };

    const handleSearchChange = (filter, event) => {
        setSearchQueries((prev) => ({
            ...prev,
            [filter]: event.target.value,
        }));
    };

    const filterOptions = (filter, options) => {
        const searchQuery = searchQueries[filter] || "";
        return options.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleResetAll = () => {
        setSelectedOptions({});
        setSearchQueries({});
        setSelectedDistrict(null);
        setModalSelectedOptions({});
    };

    const handleApplyFilters = () => {
        setSelectedOptions(modalSelectedOptions); // Apply modal filters to main state
        setIsModalOpen(false); // Close the modal
    };


    const handleShowResults = () => {
        loadDataWithFilters(selectedOptions);
        setIsModalOpen(false);
    };

    const loadDataWithFilters = (selectedOptions) => {
        console.log('Loading data with selected filters:', selectedOptions);
    };

    // const handleShowResults = () => {
    //     console.log("Selected Options:", selectedOptions);
    //     setIsModalOpen(false);
    // };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}destinations-categories`,
                    {
                        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                    }
                );
                const mainCategories = response.data.map((category) => ({
                    id: category.id,
                    name: category.name,
                }));

                const subCategories = response.data.flatMap((category) =>
                    category.destinationSubCategories.map((sub) => ({
                        id: sub.id,
                        name: sub.name,
                    }))
                );

                setFilterData((prevData) => ({
                    ...prevData,
                    "Main Category": mainCategories,
                    "Sub Category": subCategories,
                }));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [API_URL, ACCESS_TOKEN]);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true); // Set loading to true when fetching starts
            try {
                const response = await axios.get(
                    `${API_URL}destinations-categories`,
                    {
                        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                    }
                );

                const transformedCategories = response.data.map((category) => ({
                    main: category.name,
                    sub: category.destinationSubCategories.map((sub) => ({
                        label: sub.name,
                        photoUrl: sub.photoUrl, // Assuming photoUrl is available in the response
                    })),
                }));

                setCategories((prevCategories) => {
                    const updatedCategories = [...prevCategories];

                    const categoryWiseIndex = updatedCategories.findIndex(
                        (cat) => cat.label === "Category Wise"
                    );
                    if (categoryWiseIndex !== -1) {
                        updatedCategories[categoryWiseIndex].items = transformedCategories;
                    }

                    return updatedCategories;
                });
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [API_URL, ACCESS_TOKEN]);


    useEffect(() => {
        const fetchTravelTypes = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}destinations-travel-types`,
                    {
                        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                    }
                );

                setFilterData((prevData) => ({
                    ...prevData,
                    "Traveler Type": response.data.map((type) => ({
                        id: type.id,
                        name: type.name,
                    })),
                }));
            } catch (error) {
                console.error("Error fetching travel types:", error);
            }
        };

        fetchTravelTypes();
    }, [API_URL, ACCESS_TOKEN]);

    useEffect(() => {
        const fetchTravelTypes = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}destinations-transport-methods`,
                    {
                        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                    }
                );

                setFilterData((prevData) => ({
                    ...prevData,
                    "Transport Method": response.data.map((type) => ({
                        id: type.id,
                        name: type.name,
                    })),
                }));
            } catch (error) {
                console.error("Error fetching travel types:", error);
            }
        };

        fetchTravelTypes();
    }, [API_URL, ACCESS_TOKEN]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;


    const paginatedDestinations = filteredDestinations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const fetchDestinations = async (page) => {
            try {
                const response = await axios.get(`${API_URL}destinations/web/?page=${page}&pageSize=${itemsPerPage}`, {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                });
                if (response.data && response.data.items) {
                    setDestinations(response.data.items);
                    setTotalPages(response.data.totalPages);
                } else {
                    console.error("Unexpected response structure:", response.data);
                }
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        };

        fetchDestinations(currentPage);
    }, [currentPage, API_URL, ACCESS_TOKEN, itemsPerPage]);

    useEffect(() => {
        const applyFilters = () => {
            if (!destinations.length) return;

            const filtered = destinations.filter((destination) => {
                return mainFilters.every((filter) => {
                    if (!selectedOptions[filter] || !selectedOptions[filter].length) {
                        return true;
                    }
                    if (filter === "District") {
                        return selectedOptions[filter].includes(destination.district?.name);
                    }
                    if (filter === "City") {
                        return selectedOptions[filter].includes(destination.city?.id);
                    }
                    if (filter === "Duration") {
                        return selectedOptions[filter].includes(destination.duration);
                    }
                    if (filter === "Main Category") {
                        const mainCategoryName = destination.subCategories?.[0]?.category?.name;
                        return selectedOptions[filter].includes(mainCategoryName);
                    }
                    if (filter === "Sub Category") {
                        return destination.subCategories?.some((subCategory) =>
                            selectedOptions[filter].includes(subCategory.name)
                        );
                    }
                    if (filter === "Transport Method") {
                        return destination.bestTransportMethodDestinations?.some((method) =>
                            selectedOptions[filter].includes(method.description)
                        );
                    }
                    if (filter === "Estimated Explore Time") {
                        return selectedOptions[filter].includes(destination.exploreTime);
                    }
                    if (filter === "Traveler Type") {
                        return destination.travelTypes?.some((type) =>
                            selectedOptions[filter].includes(type.name)
                        );
                    }
                    return true;
                });
            });

            setFilteredDestinations(filtered);
        };

        applyFilters();
    }, [destinations, selectedOptions]);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredDestinations(destinations);
        } else {
            const filtered = destinations.filter((destination) => {
                const searchLower = searchTerm.toLowerCase();

                return (
                    destination.name.toLowerCase().includes(searchLower) ||
                    destination.desCode.toLowerCase().includes(searchLower) ||
                    destination.description.toLowerCase().includes(searchLower) ||
                    destination.district?.name.toLowerCase().includes(searchLower) ||
                    destination.travelTypes.some((type) => type.name.toLowerCase().includes(searchLower)) ||
                    destination.subCategories.some(
                        (sub) =>
                            sub.name.toLowerCase().includes(searchLower) ||
                            sub.category?.name.toLowerCase().includes(searchLower)
                    ) ||
                    destination.bestTransportMethodDestinations.some((method) =>
                        method.description.toLowerCase().includes(searchLower)
                    )
                );
            });

            setFilteredDestinations(filtered);
        }
    }, [searchTerm, destinations]);


    return (
        <>
            <div className="bg-gray-100 py-8">
                <div className="w-full flex justify-center items-center mb-6 px-4">
                    <div className="flex-grow max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search your destination..."
                            className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div
                        onClick={handleResetAll}
                        className="ml-4 px-6 py-2 border rounded-md text-black-700 hover:bg-blue-700 hover:text-white cursor-pointer whitespace-nowrap"
                    >
                        Clear All Filter
                    </div>
                </div>

                <div className="flex flex-wrap items-start justify-center gap-8 text-center text-black">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <span className="ml-2">Loading...</span>
                        </div>
                    ) : (
                        categories.map((category, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center dropdown w-full sm:w-auto"
                            >
                                <div
                                    onClick={() => handleCategoryClick(index)}
                                    className="font-semibold text-black text-lg cursor-pointer hover:text-gray-700 relative group"
                                >
                                    <span>{category.label}</span>
                                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>

                                    {/* Tooltip for Smart Trip Plan */}
                                    {category.label === "Smart Trip Plan" && (
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:flex items-center justify-center bg-blue-900 text-white text-xs rounded-md px-4 py-1.5 w-48 h-10 shadow-md">
                                            This feature is coming soon!
                                        </div>
                                    )}
                                </div>

                                {activeIndex === index && category.label !== "Category Wise" && category.label !== "Smart Trip Plan" && (
                                    <div className="absolute top-full mt-2 w-full sm:w-[32rem] rounded-1xl bg-white shadow-md flex flex-col z-50">
                                        {category.items.map((item, subIndex) => (
                                            <div
                                                key={subIndex}
                                                className="px-6 py-2 text-left hover:bg-gray-200 cursor-pointer flex items-center"
                                                onClick={() => alert(`Selected: ${item}`)}
                                            >
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeIndex === index && category.label === "Category Wise" && (
                                    <div className="absolute top-full mt-2 rounded-1xl w-full sm:w-[32rem] bg-white shadow-md flex flex-col sm:flex-row z-50">
                                        <div className="w-full sm:w-1/2 border-b sm:border-r border-gray-300">
                                            {category.items.map((mainCategory, mainIndex) => (
                                                <div
                                                    key={mainIndex}
                                                    className={`flex items-center px-6 py-2 text-left cursor-pointer transition-all duration-200 
                                  ${selectedMainCategory === mainIndex ? "bg-gray-200 font-bold" : ""}`}
                                                    onClick={() => setSelectedMainCategory(mainIndex)}
                                                >
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                    {mainCategory.main}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            {selectedMainCategory !== null &&
                                                category.items[selectedMainCategory].sub.map(
                                                    (subCategory, subIndex) => (
                                                        <div
                                                            key={subIndex}
                                                            className="flex items-center px-6 py-3 text-left hover:bg-gray-200 cursor-pointer"
                                                            onClick={() => {
                                                                setSelectedOptions((prevOptions) => ({
                                                                    ...prevOptions,
                                                                    "Sub Category": [subCategory.label],
                                                                }));
                                                            }}
                                                        >
                                                            <img
                                                                src={subCategory.photoUrl}
                                                                alt={subCategory.label}
                                                                className="w-6 h-6 rounded-full object-cover mr-3"
                                                            />
                                                            {subCategory.label}
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>


                <div className="my-10 h-[1px] bg-gray-300"></div>

                <div className="bg-gray-100 py-8">
                    <div className="flex flex-wrap items-center">
                        {mainFilters.map((filter, index) => (
                            <div key={index} className="relative flex-shrink-0">
                                <div
                                    onClick={() => {
                                        setActiveFilter(activeFilter === filter ? null : filter);
                                    }}
                                    className="px-6 py-2 ml-2 border rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer"
                                >
                                    {filter}
                                </div>

                                {activeFilter === filter && (
                                    <div
                                        ref={menuRef}
                                        className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border rounded-md z-50"
                                    >
                                        <div className="p-4">
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                value={searchQueries[filter] || ""}
                                                onChange={(e) => handleSearchChange(filter, e)}
                                                className="w-full px-3 py-2 border rounded-md mb-2"
                                            />
                                            <div className="max-h-64 overflow-y-auto">
                                                <div className="flex flex-col space-y-2">
                                                    {loading ? (
                                                        <div>Loading...</div>
                                                    ) : (
                                                        filterOptions(
                                                            filter,
                                                            filter === "City" ? cities : filterData[filter] || []
                                                        ).map((item, idx) => (
                                                            <div key={idx} className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`${filter}-${item.name}`}
                                                                    checked={
                                                                        selectedOptions[filter]?.includes(item.name) || false
                                                                    }
                                                                    onChange={() => handleCheckboxChange(filter, item.name)}
                                                                    className="mr-2"
                                                                />
                                                                <label
                                                                    htmlFor={`${filter}-${item.name}`}
                                                                    className="text-gray-700"
                                                                >
                                                                    {item.name}
                                                                </label>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="ml-auto">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-2 text-black rounded-md hover:bg-blue-700 border mr-5 hover:text-white flex items-center"
                            >
                                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                                Filters
                            </button>
                        </div>

                        {isModalOpen && (
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-2/6 max-h-[80vh] overflow-y-auto p-6 relative">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>

                                    <div className="text-xl font-semibold mb-4">Filter Options</div>
                                    <div className="space-y-4">
                                        {mainFilters.map((filter, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="font-medium">{filter}</div>
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    value={searchQueries[filter] || ""}
                                                    onChange={(e) => handleSearchChange(filter, e)}
                                                    className="w-full px-3 py-2 border rounded-md mb-2"
                                                />
                                                <div className="max-h-64 overflow-y-auto">
                                                    {loading ? (
                                                        <div>Loading...</div>
                                                    ) : (
                                                        filterOptions(
                                                            filter,
                                                            filter === "City" ? cities : filterData[filter] || []
                                                        ).map((item, idx) => (
                                                            <div key={idx} className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`${filter}-${item.name}`}
                                                                    checked={
                                                                        modalSelectedOptions[filter]?.includes(item.name) || false
                                                                    }
                                                                    onChange={() =>
                                                                        handleModalCheckboxChange(filter, item.name)
                                                                    }
                                                                    className="mr-2"
                                                                />
                                                                <label
                                                                    htmlFor={`${filter}-${item.name}`}
                                                                    className="text-gray-700"
                                                                >
                                                                    {item.name}
                                                                </label>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={handleResetAll}
                                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                                        >
                                            Reset All
                                        </button>
                                        <button
                                            onClick={handleApplyFilters}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >

            <div className="p-8 mx-auto">

                <div className="flex justify-end gap-4 mb-4 hidden sm:flex">
                    <button onClick={() => { setIsVerticalLayout(false); handleLayoutToggle(true); }} className="p-2 border rounded-full">
                        <ArrowsPointingOutIcon className="h-6 w-6 text-gray-800" />
                    </button>
                    <button onClick={() => { setIsVerticalLayout(true); handleLayoutToggle(false); }} className="p-2 border rounded-full">
                        <ArrowsPointingInIcon className="h-6 w-6 text-gray-800" />
                    </button>
                </div>

                <div className={`grid ${isMaxLayout ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                    {paginatedDestinations.map((destination, index) => (
                        <div
                            key={index}
                            className={`bg-white shadow-lg rounded-lg overflow-hidden flex ${isVerticalLayout ? 'flex-col' : 'flex-col sm:flex-row'} items-center p-4 hover:shadow-2xl transition-shadow duration-300`}
                        >
                            <div className={`w-full ${isVerticalLayout ? 'mb-4' : 'sm:w-1/3'}`}>
                                <img
                                    src={destination.photos && destination.photos.length > 0 ? destination.photos[0].url : 'default-image-url.jpg'}
                                    className="w-full h-60 object-cover rounded-lg"
                                />
                            </div>

                            <div className={`w-full ${isVerticalLayout ? 'p-4' : 'sm:w-2/3 sm:p-4 md:p-8'}`}>
                                <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">{destination.name}</h3>

                                <p className="text-xs md:text-sm text-blue-600">
                                    <span className="font-semibold">Category:</span>{" "}
                                    {[...new Set(destination.subCategories.map(sub => sub.category.name))].join(", ")}{" "}
                                    | <span className="font-semibold">Sub Category:</span>{" "}
                                    {destination.subCategories.map(sub => sub.name).join(", ")}
                                </p>

                                <p className="text-xs md:text-sm text-blue-600 mb-2">
                                    <span className="font-semibold">Disctrict:</span>{" "}
                                    Ambuluwawa
                                    | <span className="font-semibold">City:</span>{" "}
                                    Ambuluwawa
                                </p>

                                <div className="flex items-center text-xs md:text-sm text-gray-600 mb-2">
                                    <span className="mr-2">
                                        <span className="font-semibold">Suggestion Time:</span>{" "}
                                        <i className="far fa-clock"></i> {destination.suggestionTime}
                                    </span>
                                </div>
                                <p className="text-gray-700 text-sm mb-4">
                                    {destination.description}
                                </p>

                                <div className="mb-4">
                                    <p className="text-gray-800 font-bold text-sm">Ratings</p>
                                    <div className="flex mt-2">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill={index < destination.rating ? "yellow" : "none"}
                                                stroke="currentColor"
                                                className="w-4 h-4 sm:w-5 sm:h-5 mx-1"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <button className="bg-red-500 text-white px-4 py-2 text-sm rounded-full flex items-center gap-2 hover:bg-red-600">
                                        <HeartIcon className="w-5 h-5" /> Add to Favorites
                                    </button>
                                    <Link to='/destinationDetails' state={{ destination }}>
                                        <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-full hover:bg-blue-600">
                                            More details
                                        </button>
                                    </Link>
                                </div>
                                <p className="text-gray-500 mt-5 text-xs sm:text-sm">{destination.updatedOn}</p>
                            </div>
                        </div>
                    ))}
                </div>



                {paginatedDestinations.map(destination => (
                    <div key={destination.id}>
                        {/* Render destination details here */}
                    </div>
                ))}

                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setCurrentPage(i + 1);
                                    window.scrollTo(0, 0);
                                }}
                                className={`mx-1 px-4 py-2 rounded-full ${currentPage === i + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}

                {destinations.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">Loarding....</p>
                )}
            </div>
        </>
    );
};

export default Destination;