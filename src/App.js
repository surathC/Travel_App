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

function App() {
  return (
    <BrowserRouter>
      <Navbar />

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

      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
