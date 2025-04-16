import React from "react";
import { useLocation } from "react-router-dom";
import About from "../Components/About";
import Calculators from "../Components/Calculators";
import Doctors from "../Components/Doctors";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import HealthCalculator from "../Components/HealthCalculator";

function Home() {
  const location = useLocation();

  return (
    <div
      key={location.pathname} // This forces the component to remount on route change
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        width: "100%",
      }}
      className="home-section"
    >
      <Hero />
      <Info />
      <HealthCalculator />
      <About />
      <Doctors />
      <Footer />
    </div>
  );
}

export default Home;
