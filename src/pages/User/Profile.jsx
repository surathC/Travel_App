import React, { useState, useEffect } from 'react';
import Image from '../../assets/images/Logo.png';

const Profile = ({ user }) => {
    console.log(user)
    const [user1, setUser] = useState(); // Initialize state with the prop
    const [activeMenu, setActiveMenu] = useState('Profile');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (activeMenu !== 'Profile') {
            fetch(`/api/${activeMenu.toLowerCase()}`)
                .then(response => response.json())
                .then(data => setFavorites(data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [activeMenu]);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        console.log("Updated user details:", user);
        // Here you would typically make an API call to update the user's profile on the server
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="w-1/4 bg-white p-6 shadow-lg">
                <div className="flex flex-col items-center">
                    <img 
                        src={Image}
                        alt="Profile" 
                        className="w-32 h-32 rounded-full"
                    />
                    <h2 className="mt-4 text-xl font-semibold">{user.firstName} {user.lastName}</h2>
                </div>
                <nav className="mt-8">
                    {['Profile', 'Destinations', 'Activities', 'Services', 'Events', 'Find Guide', 'Food', 'Accomadations'].map((menu) => (
                        <button
                            key={menu}
                            onClick={() => handleMenuClick(menu)}
                            className={`w-full text-left p-2 my-2 rounded-lg ${
                                activeMenu === menu ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {menu}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Right Content */}
            <div className="w-3/4 flex justify-center items-center">
                {activeMenu === 'Profile' ? (
                    <div className="bg-white p-12 rounded-lg shadow-lg w-2/3">
                        <h1 className="text-2xl font-bold mb-4 text-center">Profile Details</h1>
                        <form className="space-y-4">
                            <div>
                                <label className="block font-semibold">Email:</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={user.email} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border rounded-lg" 
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">First Name:</label>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    value={user.firstName} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border rounded-lg" 
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Last Name:</label>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    value={user.lastName} 
                                    onChange={handleChange} 
                                    className="w-full p-2 border rounded-lg" 
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">ID:</label>
                                <input 
                                    type="text" 
                                    name="id" 
                                    value={user.id} 
                                    disabled 
                                    className="w-full p-2 border rounded-lg bg-gray-200" 
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Role ID:</label>
                                <input 
                                    type="text" 
                                    name="roleId" 
                                    value={user.roleId} 
                                    disabled 
                                    className="w-full p-2 border rounded-lg bg-gray-200" 
                                />
                            </div>
                            <button 
                                type="button" 
                                onClick={handleUpdate} 
                                className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{activeMenu}</h1>
                        <ul>
                            {favorites.map((item, index) => (
                                <li key={index} className="p-2 border-b border-gray-200">
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;