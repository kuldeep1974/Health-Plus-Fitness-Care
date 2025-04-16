import React from "react";
import aboutgym from '../Assets/3702291.jpg';
import "../Styles/About.css";
import SolutionStep from "./SolutionStep";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={aboutgym} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to Health + FitCare Solutions—your all-in-one platform for health and fitness.
          We offer expert online personalized workout plans, and specialized wellness services to help you achieve your fitness goals.
          our platform ensures seamless update performance, providing you with the best experience.
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        <SolutionStep
          title="Schedule Your Session"
          description="Our seamless platform ensures hassle-free scheduling, so you can focus on your health and fitness journey."
        />

        <SolutionStep
          title="Achieve Your Health & Fitness Goals"
          description="Receive expert guidance, personalized fitness plans, and specialized healthcare solutions. 
          Our integrated platform combines medical expertise with tailored workout programs to support your overall well-being."
        />
      </div>
    </div>
  );
}

export default About;
