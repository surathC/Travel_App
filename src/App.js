import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Destination from "./pages/Destination";
import DestinationDetails from "./pages/DestinationDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/destinationDetails" element={<DestinationDetails />} />

      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
