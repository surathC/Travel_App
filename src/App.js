import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Destination from "./pages/Destination";
import DestinationDetails from "./pages/DestinationDetails";
import Activity from "./pages/Activities";
import ActivityDetails from "./pages/ActivityDetails";
import Service from "./pages/Services";
import ServiceDetails from "./pages/ServicesDetails";
import FindGuide from "./pages/FindGuide";
import FindGuideDetails from "./pages/FindGuideDetails";
import Event from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Food from "./pages/Food";
import FoodDetails from "./pages/FoodDetails";
import Accomadation from "./pages/Accomadation";
import AccomadationDetails from "./pages/AccomadationDetails";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from './components/features/Auth/authSlice';
import Profile from "./pages/User/Profile";

function App() {
  const dispatch = useDispatch();

  const { token, user, isLogged } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedIsLogged = JSON.parse(localStorage.getItem("isLogged"));
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedToken && storedUser) {
      dispatch(setCredentials({ user: storedUser, token: storedToken, isLogged: storedIsLogged }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar isLogged={isLogged} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/destinationDetails" element={<DestinationDetails />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activityDetails" element={<ActivityDetails />} />
        <Route path="/service" element={<Service />} />
        <Route path="/serviceDetails" element={<ServiceDetails />} />
        <Route path="/findGuide" element={<FindGuide />} />
        <Route path="/findGuideDetails" element={<FindGuideDetails />} />
        <Route path="/event" element={<Event />} />
        <Route path="/eventDetails" element={<EventDetails />} />
        <Route path="/food" element={<Food />} />
        <Route path="/foodDetails" element={<FoodDetails />} />
        <Route path="/accomadation" element={<Accomadation />} />
        <Route path="/accomadationDetails" element={<AccomadationDetails />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;